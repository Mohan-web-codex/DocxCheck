export type NavSection =
  | 'workspace'
  | 'library'
  | 'compare'
  | 'translate'
  | 'exports'
  | 'audit'
  | 'settings';


export type InspectorTab = 'properties' | 'filters' | 'summary' | 'audit';

export interface ProjectContext {
  id: string;
  name: string;
  clientOrOrg: string;
  classification: 'Confidential' | 'Privileged Legal' | 'PHI / Medical Data' | 'Internal Research';
  documentCount: number;
  lastUpdated: string;
  status: 'active' | 'archived' | 'review_required';
}

export interface MetricSummary {
  totalDocuments: number;
  verifiedArtifacts: number;
  flaggedOcrRegions: number;
  comparisonRuns: number;
  avgSimilarityScore: number;
}
