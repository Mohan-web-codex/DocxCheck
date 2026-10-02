'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GitCompareArrows,
  Sliders,
  FileText,
  AlertCircle,
  ArrowRight,
  Eye,
  CheckCircle2,
  Layers,
  ChevronDown,
} from 'lucide-react';

export default function ComparePage() {
  const [compareMode, setCompareMode] = useState<'1:1' | '1:N' | 'M:N'>('M:N');

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Header */}
      <div className="bg-surface border-b border-border-default px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-text-main tracking-tight">
              M-to-N Similarity & Forensic Analysis
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-soft text-primary font-medium border border-primary/20">
              Mode: {compareMode} Active
            </span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            Pairwise lexical shingling, semantic embedding alignment, and citation verification.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 bg-surface-subtle p-1 rounded-md border border-border-subtle">
          {(['1:1', '1:N', 'M:N'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setCompareMode(mode)}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                compareMode === mode
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              {mode} Compare
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 p-6 space-y-6 max-w-7xl w-full mx-auto">
        {/* Guardrail Disclaimer */}
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-md flex items-start gap-2.5 text-xs text-amber-950">
          <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold">Forensic Methodology & Ethical Notice:</strong>
            {' '}A similarity score represents algorithmic text and semantic overlap; it is <em>not</em> an automated plagiarism accusation or legal misconduct conclusion.
          </div>
        </div>

        {/* Match Highlight Legend Strip (Tokens from MASTER.md) */}
        <div className="bg-surface p-4 rounded-md border border-border-default shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-text-main text-[11px] uppercase tracking-wider">
            Match Categories:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge-exact px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              Exact Overlap (100% Verbatim)
            </span>
            <span className="badge-near px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              Near-Exact / Lexical
            </span>
            <span className="badge-semantic px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
              Semantic Candidate
            </span>
            <span className="badge-citation px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#475569]" />
              Citation / Quotation
            </span>
            <span className="badge-ocr px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              OCR Low Confidence
            </span>
          </div>
        </div>

        {/* Split-Pane Comparison Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[440px]">
          {/* Left Pane: Target Reference Document */}
          <div className="bg-surface rounded-md border border-border-default shadow-xs flex flex-col overflow-hidden">
            <div className="px-4 py-3 bg-surface-subtle border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs font-semibold text-text-main truncate">
                  Clinical_Trial_Protocol_v3.pdf
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-soft text-primary font-mono font-medium">
                  Reference
                </span>
              </div>
              <span className="text-[11px] text-text-muted font-mono">Page 4 of 42</span>
            </div>
            <div className="p-4 flex-1 overflow-y-auto text-xs leading-relaxed space-y-3 font-serif text-text-main/90 bg-white">
              <p>
                Section 4.2. Inclusion Criteria for Patient Cohorts:
              </p>
              <p className="p-2 rounded bg-[#EFF6FF] border border-[#BFDBFE] text-text-main">
                <span className="text-[10px] font-mono text-[#2563EB] font-bold block mb-1 uppercase tracking-wider">[Exact Match #1 • Span 142-208]</span>
                Patients must exhibit documented progression of metastatic renal cell carcinoma refractory to at least one prior anti-angiogenic therapy regimen.
              </p>
              <p>
                Laboratory values within 14 days prior to initial administration must confirm adequate renal and hepatic reserve (serum creatinine &le; 1.5 &times; ULN).
              </p>
              <p className="p-2 rounded bg-[#F0FDFA] border border-[#99F6E4] text-text-main">
                <span className="text-[10px] font-mono text-[#0D9488] font-bold block mb-1 uppercase tracking-wider">[Semantic Alignment #4 • Paraphrased]</span>
                Dose adjustments are required when concurrent CYP3A4 inhibitors are co-administered.
              </p>
            </div>
          </div>

          {/* Right Pane: Comparison Source Document */}
          <div className="bg-surface rounded-md border border-border-default shadow-xs flex flex-col overflow-hidden">
            <div className="px-4 py-3 bg-surface-subtle border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span className="text-xs font-semibold text-text-main truncate">
                  European_Regulatory_Filing_DE.docx
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F5F3FF] text-[#7C3AED] font-mono font-medium">
                  Source Set
                </span>
              </div>
              <span className="text-[11px] text-text-muted font-mono">Paragraph 19</span>
            </div>
            <div className="p-4 flex-1 overflow-y-auto text-xs leading-relaxed space-y-3 font-serif text-text-main/90 bg-white">
              <p>
                Abschnitt 4.2. Einschlusskriterien für Studienkohorten:
              </p>
              <p className="p-2 rounded bg-[#EFF6FF] border border-[#BFDBFE] text-text-main">
                <span className="text-[10px] font-mono text-[#2563EB] font-bold block mb-1 uppercase tracking-wider">[Aligned Passage]</span>
                Patients must exhibit documented progression of metastatic renal cell carcinoma refractory to at least one prior anti-angiogenic therapy regimen.
              </p>
              <p>
                Serumkreatininwerte müssen innerhalb von 14 Tagen vor Beginn der Therapie überprüft werden.
              </p>
              <p className="p-2 rounded bg-[#F0FDFA] border border-[#99F6E4] text-text-main">
                <span className="text-[10px] font-mono text-[#0D9488] font-bold block mb-1 uppercase tracking-wider">[Aligned Semantic Candidate]</span>
                Concomitant usage of strong metabolic enzyme suppressors necessitates a secondary tier dose titration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
