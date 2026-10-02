'use client';

import React from 'react';
import {
  FileText,
  UploadCloud,
  GitCompareArrows,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Filter,
  FileCheck,
  Languages,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { NavSection, ProjectContext } from '@/types/navigation';

interface CentralCanvasProps {
  activeSection: NavSection;
  currentProject: ProjectContext;
  onNavigateSection: (section: NavSection) => void;
}

export const CentralCanvas: React.FC<CentralCanvasProps> = ({
  activeSection,
  currentProject,
  onNavigateSection,
}) => {
  return (
    <main
      id="main-content"
      className="flex-1 flex flex-col bg-canvas overflow-y-auto overflow-x-hidden min-w-0 focus:outline-none"
      tabIndex={-1}
      aria-label="Main Work Canvas"
    >
      {/* Canvas Top Bar */}
      <div className="bg-surface border-b border-border-default px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-text-main tracking-tight capitalize">
              {activeSection === 'workspace' && 'Workspace Oversight'}
              {activeSection === 'library' && 'Document Library & Quarantine'}
              {activeSection === 'compare' && 'Forensic Similarity & Plagiarism Matrix'}
              {activeSection === 'translate' && 'Multilingual Analysis & Glossary'}
              {activeSection === 'exports' && 'Multi-Layered Report Generation'}
              {activeSection === 'audit' && 'Forensic Provenance & Audit Trail'}
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-soft text-primary font-medium border border-primary/20">
              Active Project
            </span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            {activeSection === 'workspace' && 'Comprehensive corpus telemetry, active batch status, and quick forensic actions.'}
            {activeSection === 'library' && 'Verified file ingestion pipeline with immutable evidence staging.'}
            {activeSection === 'compare' && 'Inspect exact, lexical, semantic, and citation overlaps across 1:1, 1:N, or M:N sets.'}
            {activeSection === 'translate' && 'Side-by-side terminology preservation with verified target outputs.'}
            {activeSection === 'exports' && 'Localized multi-layered PDF reporting with heatmaps and audit metadata.'}
            {activeSection === 'audit' && 'Immutable cryptographic hashes (SHA-256) and complete action history.'}
          </p>
        </div>

        {/* Action Button Bar */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigateSection('library')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface text-text-main border border-border-default hover:bg-surface-subtle text-xs font-semibold rounded-md shadow-xs transition-colors"
          >
            <UploadCloud className="w-3.5 h-3.5 text-text-muted" />
            <span>Stage Documents</span>
          </button>
          <button
            onClick={() => onNavigateSection('compare')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-white hover:bg-primary-hover text-xs font-semibold rounded-md shadow-xs transition-colors"
          >
            <GitCompareArrows className="w-3.5 h-3.5 text-white" />
            <span>Launch M:N Run</span>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 p-6 space-y-6 max-w-7xl w-full mx-auto">
        {/* Metric Overview Strip (Tabular Numerals) */}
        <section aria-label="Executive Metrics" className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface p-4 rounded-md border border-border-default shadow-xs">
            <div className="flex items-center justify-between text-xs text-text-muted mb-1">
              <span>Staged Documents</span>
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-text-main tabular-nums font-mono">12</div>
            <div className="text-[11px] text-text-muted mt-1 flex items-center gap-1">
              <span className="text-success font-medium">100% verified</span>
              <span>• 4 formats (PDF, DOCX, TXT, PNG)</span>
            </div>
          </div>

          <div className="bg-surface p-4 rounded-md border border-border-default shadow-xs">
            <div className="flex items-center justify-between text-xs text-text-muted mb-1">
              <span>Matched Passages</span>
              <GitCompareArrows className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div className="text-2xl font-bold text-text-main tabular-nums font-mono">142</div>
            <div className="text-[11px] text-text-muted mt-1 flex items-center gap-1">
              <span className="text-[#2563EB] font-medium">38 exact</span>
              <span>• 64 near • 40 semantic</span>
            </div>
          </div>

          <div className="bg-surface p-4 rounded-md border border-border-default shadow-xs">
            <div className="flex items-center justify-between text-xs text-text-muted mb-1">
              <span>OCR Snippet Fallbacks</span>
              <Sparkles className="w-4 h-4 text-warning" />
            </div>
            <div className="text-2xl font-bold text-warning tabular-nums font-mono">4</div>
            <div className="text-[11px] text-text-muted mt-1 flex items-center gap-1">
              <span className="text-warning font-medium">Human review</span>
              <span>• Hand-annotated regions</span>
            </div>
          </div>

          <div className="bg-surface p-4 rounded-md border border-border-default shadow-xs">
            <div className="flex items-center justify-between text-xs text-text-muted mb-1">
              <span>Multilingual Segments</span>
              <Languages className="w-4 h-4 text-[#0D9488]" />
            </div>
            <div className="text-2xl font-bold text-text-main tabular-nums font-mono">29</div>
            <div className="text-[11px] text-text-muted mt-1 flex items-center gap-1">
              <span className="text-[#0D9488] font-medium">EN-US ↔ DE-DE</span>
              <span>• Glossary locked</span>
            </div>
          </div>
        </section>

        {/* Dynamic Section Presentation */}
        {activeSection === 'workspace' && (
          <div className="space-y-6">
            {/* Active Pipeline Status Strip */}
            <div className="bg-surface p-5 rounded-md border border-border-default shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <h2 className="text-xs font-semibold text-text-main tracking-wider uppercase">
                    Asynchronous Pipeline State Machine
                  </h2>
                </div>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-success/10 text-success border border-success/30">
                  Ready • Low Latency
                </span>
              </div>

              {/* Pipeline Stage Breadcrumbs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1 text-xs">
                {[
                  { name: '1. Quarantine', status: 'done', desc: 'SHA-256 + Magic ID' },
                  { name: '2. Extraction', status: 'done', desc: 'Selectable Text' },
                  { name: '3. OCR Engine', status: 'review', desc: '4 Low Confidence' },
                  { name: '4. Normalize', status: 'done', desc: 'Unicode + Offsets' },
                  { name: '5. Chunking', status: 'done', desc: 'MinHash Shingles' },
                  { name: '6. Alignment', status: 'done', desc: 'M:N Pair Matrix' },
                  { name: '7. Finalize', status: 'ready', desc: 'Audit Staged' },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded border ${
                      step.status === 'done'
                        ? 'bg-surface-subtle border-border-subtle text-text-main'
                        : step.status === 'review'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-900'
                        : 'bg-surface border-border-subtle text-text-muted'
                    }`}
                  >
                    <div className="font-semibold text-[11px] truncate flex items-center justify-between">
                      <span>{step.name}</span>
                      {step.status === 'done' && <CheckCircle2 className="w-3 h-3 text-success shrink-0" />}
                      {step.status === 'review' && <AlertTriangle className="w-3 h-3 text-warning shrink-0" />}
                    </div>
                    <div className="text-[10px] text-text-muted mt-0.5 truncate">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Inventory Table Preview */}
            <div className="bg-surface rounded-md border border-border-default shadow-xs overflow-hidden">
              <div className="px-5 py-3.5 border-b border-border-subtle flex items-center justify-between bg-surface-subtle/50">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-semibold text-text-main tracking-wider uppercase">
                    Staged Document Corpus
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-muted">Showing 4 of 12 documents</span>
                  <button
                    onClick={() => onNavigateSection('library')}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-text-main">
                  <thead className="bg-surface-subtle border-b border-border-subtle text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-4">Document Title</th>
                      <th className="py-2.5 px-4">Format / Size</th>
                      <th className="py-2.5 px-4">SHA-256 Checksum</th>
                      <th className="py-2.5 px-4">OCR Status</th>
                      <th className="py-2.5 px-4">Languages</th>
                      <th className="py-2.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {[
                      {
                        title: 'Clinical_Trial_Protocol_v3.pdf',
                        format: 'PDF • 4.2 MB',
                        hash: '9f86d081884c7d659a2f...',
                        ocr: 'Selectable Text (99%)',
                        ocrType: 'success',
                        lang: 'EN-US (Primary)',
                      },
                      {
                        title: 'Physician_Handwritten_Notes_Batch2.pdf',
                        format: 'Scanned PDF • 18.1 MB',
                        hash: '5e884898da28047151d0...',
                        ocr: '4 Snippets Low Confidence',
                        ocrType: 'warning',
                        lang: 'EN-US (Handwritten)',
                      },
                      {
                        title: 'European_Regulatory_Filing_DE.docx',
                        format: 'DOCX • 1.1 MB',
                        hash: '4b227777d4dd1fc61c6f...',
                        ocr: 'Extracted Clean (100%)',
                        ocrType: 'success',
                        lang: 'DE-DE • EN-US',
                      },
                      {
                        title: 'Lab_Spectrometry_Results_ExhibitA.png',
                        format: 'Image (PNG) • 6.8 MB',
                        hash: 'ef2d127de37b942baad0...',
                        ocr: 'OCR Processed (94%)',
                        ocrType: 'success',
                        lang: 'EN-US',
                      },
                    ].map((doc, idx) => (
                      <tr key={idx} className="hover:bg-surface-subtle/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-text-main flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary shrink-0" />
                          <span className="truncate max-w-xs">{doc.title}</span>
                        </td>
                        <td className="py-3 px-4 text-text-muted font-mono">{doc.format}</td>
                        <td className="py-3 px-4 font-mono text-[11px] text-text-muted">{doc.hash}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                              doc.ocrType === 'warning'
                                ? 'bg-amber-500/10 text-amber-900 border border-amber-500/30'
                                : 'bg-success/10 text-success border border-success/30'
                            }`}
                          >
                            {doc.ocrType === 'warning' && <AlertTriangle className="w-3 h-3 text-warning" />}
                            {doc.ocrType === 'success' && <CheckCircle2 className="w-3 h-3 text-success" />}
                            <span>{doc.ocr}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-text-muted">{doc.lang}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => onNavigateSection('compare')}
                            className="text-xs font-semibold text-primary hover:underline"
                          >
                            Compare
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Clean Placeholder States for Sub-Modules */}
        {activeSection !== 'workspace' && (
          <div className="bg-surface rounded-md border border-border-default shadow-xs p-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary-soft text-primary flex items-center justify-center mx-auto">
              {activeSection === 'library' && <UploadCloud className="w-6 h-6" />}
              {activeSection === 'compare' && <GitCompareArrows className="w-6 h-6" />}
              {activeSection === 'translate' && <Languages className="w-6 h-6" />}
              {activeSection === 'exports' && <FileText className="w-6 h-6" />}
              {activeSection === 'audit' && <ShieldCheck className="w-6 h-6" />}
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-base font-bold text-text-main capitalize">
                {activeSection} Engine Scaffolded
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                The UI container, navigation state, and design tokens for {activeSection} are active and verified. Ready to receive Phase 2/3 functional components.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => onNavigateSection('workspace')}
                className="px-3.5 py-1.5 bg-surface text-text-main border border-border-default hover:bg-surface-subtle text-xs font-semibold rounded-md shadow-xs transition-colors"
              >
                Back to Workspace
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
