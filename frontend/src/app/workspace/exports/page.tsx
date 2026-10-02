'use client';

import React from 'react';
import {
  FileDown,
  FileCheck2,
  Layers,
  Shield,
  Download,
  CheckCircle2,
} from 'lucide-react';

export default function ExportsPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Top Header */}
      <div className="bg-surface border-b border-border-default px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-text-main tracking-tight">
              Export Center & Multi-Layer Reports
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-soft text-primary font-medium border border-primary/20">
              PDF / DOCX / CSV
            </span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            Generate forensic reports with passage heatmaps, translation mappings, and formula-injection neutralization.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-white hover:bg-primary-hover text-xs font-semibold rounded-md shadow-xs transition-colors">
            <Download className="w-3.5 h-3.5" />
            <span>Generate PDF Bundle</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 p-6 space-y-6 max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Layer Selection Card */}
          <div className="bg-surface p-5 rounded-md border border-border-default shadow-xs space-y-4 md:col-span-2">
            <h2 className="text-xs font-semibold text-text-main uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <span>Select PDF Report Layers</span>
            </h2>
            <div className="space-y-2.5 text-xs">
              {[
                { title: 'Executive Forensic Summary', desc: 'Corpus telemetry, aggregate overlap percentages, and verified findings', checked: true },
                { title: 'Side-by-Side Match Matrix', desc: 'Exact and near-exact passage spans aligned with original source offsets', checked: true },
                { title: 'Human-in-the-Loop OCR Verification Audit', desc: 'Bounding box logs, raw confidence scores, and user correction history', checked: true },
                { title: 'Multilingual Alignment Layer', desc: 'German-to-English translation mappings with glossary compliance badges', checked: false },
                { title: 'Cryptographic Provenance Manifest', desc: 'Document SHA-256 signatures, engine version strings, and reviewer timestamp', checked: true },
              ].map((layer, idx) => (
                <label key={idx} className="flex items-start gap-3 p-3 bg-surface-subtle border border-border-subtle rounded-md cursor-pointer hover:bg-surface transition-colors">
                  <input
                    type="checkbox"
                    defaultChecked={layer.checked}
                    className="rounded text-primary focus:ring-primary w-4 h-4 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <div className="font-semibold text-text-main">{layer.title}</div>
                    <div className="text-[11px] text-text-muted mt-0.5">{layer.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Security & Sanitization Card */}
          <div className="bg-surface p-5 rounded-md border border-border-default shadow-xs space-y-4">
            <h2 className="text-xs font-semibold text-text-main uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-success" />
              <span>Export Sanitization</span>
            </h2>
            <div className="space-y-3 text-xs text-text-muted">
              <div className="p-3 bg-success/10 border border-success/30 rounded text-success text-[11px] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>CSV Formula Injection Guard Active</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All spreadsheet cells beginning with <code>=</code>, <code>+</code>, <code>-</code>, or <code>@</code> are automatically escaped to prevent code execution when opened in Excel or Google Sheets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
