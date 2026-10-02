'use client';

import React from 'react';
import Link from 'next/link';
import {
  UploadCloud,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  Filter,
} from 'lucide-react';

export default function LibraryPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Top Header */}
      <div className="bg-surface border-b border-border-default px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-text-main tracking-tight">
              Document Library & Quarantine
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium border border-success/30">
              12 Quarantined
            </span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            Cryptographically sealed document ingestion with format validation and immutable versioning.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/workspace/compare"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-white hover:bg-primary-hover text-xs font-semibold rounded-md shadow-xs transition-colors"
          >
            <span>Proceed to Compare</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 p-6 space-y-6 max-w-7xl w-full mx-auto">
        {/* Upload Dropzone Preview (Phase 2 Ingestion Target) */}
        <div className="bg-surface border-2 border-dashed border-border-default hover:border-primary/50 transition-colors rounded-lg p-8 text-center space-y-3 cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-primary-soft text-primary flex items-center justify-center mx-auto">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-text-main">
              Drag & Drop PDF, DOCX, TXT, or High-Resolution Scans
            </h3>
            <p className="text-xs text-text-muted max-w-md mx-auto">
              Files are immediately verified against magic signatures, checked for archive bombs, and quarantined in isolated workspace memory.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 text-[11px] text-text-muted pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-success" /> Max 50 MB / File
            </span>
            <span>•</span>
            <span>Zero-Knowledge Encryption</span>
            <span>•</span>
            <span>Multi-Page PDF Chunking</span>
          </div>
        </div>

        {/* Quarantine Telemetry Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface p-4 rounded-md border border-border-default shadow-xs flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-success shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-text-main">Immutable Evidence Retention</div>
              <div className="text-[11px] text-text-muted mt-0.5">Original byte streams are write-once and preserved. Human OCR corrections are saved as versioned artifacts.</div>
            </div>
          </div>
          <div className="bg-surface p-4 rounded-md border border-border-default shadow-xs flex items-start gap-3">
            <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-text-main">Private Quarantine Sandbox</div>
              <div className="text-[11px] text-text-muted mt-0.5">Tenant boundary isolation active. No cross-workspace leakage or unauthorized indexed retrieval.</div>
            </div>
          </div>
          <div className="bg-surface p-4 rounded-md border border-border-default shadow-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-text-main">4 Fallback Flags Staged</div>
              <div className="text-[11px] text-text-muted mt-0.5">Low-confidence handwriting detected in physician notes ready for side-by-side snippet verification.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
