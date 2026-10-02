/**
 * Antigravity Frontend API Client
 * Connects directly to the Node.js Express backend (server.js).
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface SimilarityAnalysisResult {
  similarity_score: number;
  matched_words: number;
  total_words: number;
  common_phrases: string[];
  exact_match_pct: number;
  paraphrase_pct: number;
  structural_pct: number;
  ref_lang: string;
  tgt_lang: string;
}

export interface WebScanSource {
  name: string;
  score: number;
}

export interface WebScanResult {
  sources: WebScanSource[];
}

export interface SummarizeResult {
  overview: string;
  key_points: string[];
  conclusion: string;
}

export interface HistoryItem {
  _id: string;
  userId: string;
  type: 'Similarity Check' | 'Web Scan' | 'AI Summary';
  docs: string;
  score: string;
  details?: string;
  verdict?: string;
  createdAt: string;
}

export interface AuthSendOtpResponse {
  message: string;
}

export interface AuthVerifyOtpResponse {
  message: string;
  token: string;
}

class ApiError extends Error {
  statusCode?: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

/**
 * Helper to get the saved JWT token from storage
 */
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('antigravity_jwt_token');
};

/**
 * Helper to save the JWT token
 */
export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('antigravity_jwt_token', token);
};

/**
 * Helper to clear the JWT token
 */
export const clearAuthToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('antigravity_jwt_token');
};

/**
 * Generic request helper with timeout and auth headers
 */
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs: number = 30000
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const token = getAuthToken();
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `HTTP error ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson && errJson.error) {
          errorMessage = errJson.error;
        }
      } catch {
        // Response was not JSON
      }
      throw new ApiError(errorMessage, response.status);
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timed out after 30 seconds', 408);
      }
      throw new ApiError(error.message);
    }
    throw new ApiError('An unknown network error occurred');
  }
}

export const api = {
  auth: {
    sendOtp: async (phone: string): Promise<AuthSendOtpResponse> => {
      return request<AuthSendOtpResponse>('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
    },

    verifyOtp: async (
      phone: string,
      otp: string
    ): Promise<AuthVerifyOtpResponse> => {
      const res = await request<AuthVerifyOtpResponse>(
        '/api/auth/verify-otp',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, otp }),
        }
      );
      if (res.token) {
        setAuthToken(res.token);
      }
      return res;
    },
  },

  analysis: {
    compare: async (params: {
      refFile?: File;
      tgtFile?: File;
      refText?: string;
      tgtText?: string;
    }): Promise<SimilarityAnalysisResult> => {
      const formData = new FormData();
      if (params.refFile) formData.append('refFile', params.refFile);
      if (params.tgtFile) formData.append('tgtFile', params.tgtFile);
      if (params.refText) formData.append('refText', params.refText);
      if (params.tgtText) formData.append('tgtText', params.tgtText);

      return request<SimilarityAnalysisResult>('/api/analyze', {
        method: 'POST',
        body: formData,
      });
    },

    webScan: async (document: File): Promise<WebScanResult> => {
      const formData = new FormData();
      formData.append('document', document);

      return request<WebScanResult>('/api/webscan', {
        method: 'POST',
        body: formData,
      });
    },

    summarize: async (document: File): Promise<SummarizeResult> => {
      const formData = new FormData();
      formData.append('document', document);

      return request<SummarizeResult>('/api/summarize', {
        method: 'POST',
        body: formData,
      });
    },
  },

  history: {
    getHistory: async (): Promise<HistoryItem[]> => {
      return request<HistoryItem[]>('/api/history', {
        method: 'GET',
      });
    },
  },
};
