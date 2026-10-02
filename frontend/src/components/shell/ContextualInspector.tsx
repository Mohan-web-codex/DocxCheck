'use client';

import React, { useState } from 'react';
import {
  X,
  SlidersHorizontal,
  Info,
  FileText,
  FileCheck2,
  Lock,
  Hash,
  Layers,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { InspectorTab, ProjectContext } from '@/types/navigation';

interface ContextualInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentProject: ProjectContext;
}

export const ContextualInspector: React.FC<ContextualInspectorProps> = ({
  isOpen,
  onClose,
  currentProject,
}) => {
  const [activeTab, setActiveTab] = useState<InspectorTab>('properties');
  const [ocrConfidenceThreshold, setOcrConfidenceThreshold] = useState<number>(80);

  // Filter toggles state
  const [filterExact, setFilterExact] = useState(true);
  const [filterNear, setFilterNear] = useState(true);
  const [filterSemantic, setFilterSemantic] = useState(true);
  const [filterCitations, setFilterCitations] = useState(true);
  const [filterOcrUncertain, setFilterOcrUncertain] = useState(true);

  if (!isOpen) return null;

  return (
    <aside
      className="w-[340px] bg-surface border-l border-border-default flex flex-col shrink-0 z-10 transition-all duration-200"
      aria-label="Contextual Inspector Panel"
    >
      {/* Header with Tabs and Close Button */}
      <div className="border-b border-border-subtle p-3 h-[68px] flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-primary shrink-0" />
            <h2 className="text-xs font-semibold text-text-main tracking-wider uppercase">
              Inspector
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-text-muted hover:text-text-main hover:bg-surface-subtle rounded transition-colors"
            aria-label="Close Inspector Panel"
            title="Close Panel (Shortcut: ])"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inspector Navigation Tabs */}
        <div className="flex items-center gap-1 border-t border-border-subtle/50 pt-2 -mx-1 px-1">
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
              activeTab === 'properties'
                ? 'bg-primary-soft text-primary font-semibold'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            Metadata
          </button>
          <button
            onClick={() => setActiveTab('filters')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
              activeTab === 'filters'
                ? 'bg-primary-soft text-primary font-semibold'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            Filters
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
              activeTab === 'summary'
                ? 'bg-primary-soft text-primary font-semibold'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            AI Notes
          </button>
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs text-text-muted">
        {activeTab === 'properties' && (
          <div className="space-y-4">
            <div>
              <div className="text-[11px] font-semibold text-text-main uppercase tracking-wider mb-2">
                Active Corpus Context
              </div>
              <div className="bg-surface-subtle p-3 rounded-md border border-border-subtle space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Workspace ID:</span>
                  <span className="font-mono text-text-main text-[11px]">{currentProject.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Security Class:</span>
                  <span className="font-medium text-warning text-[11px]">{currentProject.classification}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Documents Staged:</span>
                  <span className="font-mono font-medium text-text-main tabular-nums">
                    {currentProject.documentCount} Files
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Retention Policy:</span>
                  <span className="font-medium text-text-main text-[11px]">30-Day Legal Hold</span>
                </div>
              </div>
            </div>

            {/* OCR Fallback Configuration */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] font-semibold text-text-main uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-warning shrink-0" />
                  <span>OCR Review Threshold</span>
                </div>
                <span className="font-mono font-semibold text-primary tabular-nums">
                  {ocrConfidenceThreshold}%
                </span>
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed mb-2">
                Snippets with machine confidence below this value trigger human-in-the-loop side-by-side verification.
              </p>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={ocrConfidenceThreshold}
                onChange={(e) => setOcrConfidenceThreshold(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
                aria-label="OCR Confidence Threshold"
              />
              <div className="flex justify-between text-[10px] font-mono text-text-muted mt-1">
                <span>50% (Permissive)</span>
                <span>80% (Standard)</span>
                <span>95% (Forensic)</span>
              </div>
            </div>

            {/* Cryptographic Provenance */}
            <div>
              <div className="text-[11px] font-semibold text-text-main uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Engine Provenance</span>
              </div>
              <div className="p-3 bg-surface-subtle border border-border-subtle rounded-md space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between text-text-muted">
                  <span>Engine:</span>
                  <span className="text-text-main font-semibold">DocuEngine v2.4</span>
                </div>
                <div className="flex items-center justify-between text-text-muted">
                  <span>MinHash Shingles:</span>
                  <span className="text-text-main">k=5, n=100</span>
                </div>
                <div className="flex items-center justify-between text-text-muted">
                  <span>Vector Embedding:</span>
                  <span className="text-text-main">text-embedding-004</span>
                </div>
                <div className="flex items-center justify-between text-text-muted">
                  <span>Isolated Sandbox:</span>
                  <span className="text-success font-semibold flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Enforced
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'filters' && (
          <div className="space-y-4">
            <div className="text-[11px] font-semibold text-text-main uppercase tracking-wider mb-2">
              Match Category Visibility
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Toggle specific match bands in the central split-pane and matrix comparisons:
            </p>

            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-2.5 bg-surface-subtle border border-border-subtle rounded-md cursor-pointer hover:bg-surface transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#2563EB] shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-text-main">Exact Overlap</div>
                    <div className="text-[10px] text-text-muted">Identical verbatim text strings</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={filterExact}
                  onChange={(e) => setFilterExact(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-surface-subtle border border-border-subtle rounded-md cursor-pointer hover:bg-surface transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#7C3AED] shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-text-main">Near-Exact / Lexical</div>
                    <div className="text-[10px] text-text-muted">Light edits, punctuation variations</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={filterNear}
                  onChange={(e) => setFilterNear(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-surface-subtle border border-border-subtle rounded-md cursor-pointer hover:bg-surface transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#0D9488] shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-text-main">Semantic Candidate</div>
                    <div className="text-[10px] text-text-muted">Paraphrased structural meaning</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={filterSemantic}
                  onChange={(e) => setFilterSemantic(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-surface-subtle border border-border-subtle rounded-md cursor-pointer hover:bg-surface transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#475569] shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-text-main">Citation / Quotation</div>
                    <div className="text-[10px] text-text-muted">Formal cited passages & references</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={filterCitations}
                  onChange={(e) => setFilterCitations(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-surface-subtle border border-border-subtle rounded-md cursor-pointer hover:bg-surface transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#D97706] shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-text-main">OCR Low Confidence</div>
                    <div className="text-[10px] text-text-muted">Requires human snippet review</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={filterOcrUncertain}
                  onChange={(e) => setFilterOcrUncertain(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div className="text-[11px] font-semibold text-text-main uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Forensic Guardrails</span>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-md text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block mb-0.5">Ethical AI Protocol</span>
                Similarity percentage is an algorithmic overlap signal, not a plagiarism or fraud conclusion. All findings require qualified human verification.
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-text-main uppercase tracking-wider mb-2">
                Active Review Notes
              </div>
              <textarea
                placeholder="Add contextual reviewer notes for the forensic audit log..."
                className="w-full h-24 p-2.5 bg-surface-subtle border border-border-subtle rounded-md text-xs text-text-main placeholder:text-text-muted focus:bg-surface focus:border-primary transition-colors resize-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Panel Footer */}
      <div className="p-3 border-t border-border-subtle bg-surface-subtle/50 text-[11px] text-text-muted flex items-center justify-between">
        <span>WCAG 2.2 AA Verified</span>
        <span className="font-mono text-[10px] text-primary">Status: Enforced</span>
      </div>
    </aside>
  );
};
