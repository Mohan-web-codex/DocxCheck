'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkspace } from '@/context/WorkspaceContext';
import { api } from '@/lib/api';
import {
  UploadCloud,
  FileText,
  X,
  ChevronRight,
  ShieldCheck,
  GitCompareArrows,
} from 'lucide-react';

export default function WorkspaceDashboard() {
  const router = useRouter();
  const { sourceFiles, targetFiles, setSourceFiles, setTargetFiles, isReady } = useWorkspace();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sourceInputRef = useRef<HTMLInputElement>(null);
  const targetInputRef = useRef<HTMLInputElement>(null);

  const handleSourceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSourceFiles(Array.from(e.target.files));
    }
  };

  const handleTargetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTargetFiles(Array.from(e.target.files));
    }
  };

  const removeSourceFile = (index: number) => {
    setSourceFiles(sourceFiles.filter((_, i) => i !== index));
  };

  const removeTargetFile = (index: number) => {
    setTargetFiles(targetFiles.filter((_, i) => i !== index));
  };

  const handleLaunchCompare = async () => {
    if (!isReady) return;

    setIsProcessing(true);
    setError(null);

    try {
      // In a real application, you might loop through multiple files
      // Here we assume taking the first file of each as per initial requirements
      await api.analysis.compare({
        refFile: sourceFiles[0],
        tgtFile: targetFiles[0],
      });

      // Navigate to the compare viewer on success
      router.push('/workspace/compare');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to analyze documents. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Canvas Top Bar */}
      <div className="bg-surface border-b border-border-default px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-text-main tracking-tight">
              Ingestion Hub
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-soft text-primary font-medium border border-primary/20">
              Active Project
            </span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            Stage source references and target documents to begin M:N similarity analysis.
          </p>
        </div>

        {/* Action Button Bar */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleLaunchCompare}
            disabled={!isReady || isProcessing}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-md shadow-xs transition-colors ${
              isReady && !isProcessing
                ? 'bg-primary text-white hover:bg-primary-hover'
                : 'bg-surface-subtle text-text-muted cursor-not-allowed border border-border-subtle'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full" />
                Processing...
              </span>
            ) : (
              <>
                <GitCompareArrows className="w-4 h-4" />
                <span>Launch Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 p-6 flex flex-col md:flex-row gap-6 max-w-7xl w-full mx-auto">
        
        {/* Source Documents Zone */}
        <div className="flex-1 flex flex-col bg-surface border border-border-default rounded-lg shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-border-subtle bg-surface-subtle">
            <h2 className="text-sm font-bold text-text-main flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Upload Source Document(s)
            </h2>
            <p className="text-[11px] text-text-muted mt-1">
              Primary reference files for baseline comparison.
            </p>
          </div>
          
          <div className="flex-1 p-6 flex flex-col justify-center items-center">
            {sourceFiles.length === 0 ? (
              <div 
                className="w-full flex flex-col items-center justify-center border-2 border-dashed border-border-subtle rounded-lg p-10 cursor-pointer hover:border-primary transition-colors hover:bg-primary-soft/10"
                onClick={() => sourceInputRef.current?.click()}
              >
                <div className="w-12 h-12 bg-surface-subtle rounded-full flex items-center justify-center mb-3">
                  <UploadCloud className="w-6 h-6 text-text-muted" />
                </div>
                <p className="text-sm font-medium text-text-main mb-1">Select files to upload</p>
                <p className="text-xs text-text-muted">or drag and drop here</p>
                <input
                  type="file"
                  className="hidden"
                  ref={sourceInputRef}
                  multiple
                  onChange={handleSourceUpload}
                />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-text-main">
                    {sourceFiles.length} file(s) staged
                  </span>
                  <button 
                    onClick={() => sourceInputRef.current?.click()}
                    className="text-xs text-primary hover:underline"
                  >
                    + Add More
                  </button>
                  <input
                    type="file"
                    className="hidden"
                    ref={sourceInputRef}
                    multiple
                    onChange={handleSourceUpload}
                  />
                </div>
                <div className="space-y-2 overflow-y-auto max-h-[300px] pr-2">
                  {sourceFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-border-subtle rounded-md bg-canvas">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileText className="w-5 h-5 text-primary shrink-0" />
                        <div className="truncate">
                          <p className="text-xs font-medium text-text-main truncate">{file.name}</p>
                          <p className="text-[10px] text-text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button onClick={() => removeSourceFile(idx)} className="p-1 hover:bg-surface-subtle rounded text-text-muted hover:text-text-main transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Destination Documents Zone */}
        <div className="flex-1 flex flex-col bg-surface border border-border-default rounded-lg shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-border-subtle bg-surface-subtle">
            <h2 className="text-sm font-bold text-text-main flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0D9488]" />
              Upload Target Document(s)
            </h2>
            <p className="text-[11px] text-text-muted mt-1">
              Destination files being checked against the source.
            </p>
          </div>
          
          <div className="flex-1 p-6 flex flex-col justify-center items-center">
            {targetFiles.length === 0 ? (
              <div 
                className="w-full flex flex-col items-center justify-center border-2 border-dashed border-border-subtle rounded-lg p-10 cursor-pointer hover:border-[#0D9488] transition-colors hover:bg-[#0D9488]/5"
                onClick={() => targetInputRef.current?.click()}
              >
                <div className="w-12 h-12 bg-surface-subtle rounded-full flex items-center justify-center mb-3">
                  <UploadCloud className="w-6 h-6 text-text-muted" />
                </div>
                <p className="text-sm font-medium text-text-main mb-1">Select files to upload</p>
                <p className="text-xs text-text-muted">or drag and drop here</p>
                <input
                  type="file"
                  className="hidden"
                  ref={targetInputRef}
                  multiple
                  onChange={handleTargetUpload}
                />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-text-main">
                    {targetFiles.length} file(s) staged
                  </span>
                  <button 
                    onClick={() => targetInputRef.current?.click()}
                    className="text-xs text-[#0D9488] hover:underline"
                  >
                    + Add More
                  </button>
                  <input
                    type="file"
                    className="hidden"
                    ref={targetInputRef}
                    multiple
                    onChange={handleTargetUpload}
                  />
                </div>
                <div className="space-y-2 overflow-y-auto max-h-[300px] pr-2">
                  {targetFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-border-subtle rounded-md bg-canvas">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileText className="w-5 h-5 text-[#0D9488] shrink-0" />
                        <div className="truncate">
                          <p className="text-xs font-medium text-text-main truncate">{file.name}</p>
                          <p className="text-[10px] text-text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button onClick={() => removeTargetFile(idx)} className="p-1 hover:bg-surface-subtle rounded text-text-muted hover:text-text-main transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {error && (
        <div className="mx-6 mb-6 p-4 rounded-md bg-warning/10 border border-warning/30 text-warning text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
