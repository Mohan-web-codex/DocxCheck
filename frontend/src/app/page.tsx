'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  GitCompareArrows,
  Languages,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  Scale,
  Stethoscope,
  Microscope,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas text-text-main flex flex-col antialiased">
      {/* Top Navigation Bar */}
      <header className="h-[68px] bg-surface border-b border-border-default px-6 lg:px-12 flex items-center justify-between shrink-0 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-xs">
            AG
          </div>
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-primary flex items-center gap-1.5">
              <span>Antigravity</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-primary-soft text-primary rounded font-mono font-medium">v1.0</span>
            </div>
            <div className="text-[11px] text-text-muted">Document Intelligence Workspace</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-text-muted">
          <a href="#capabilities" className="hover:text-text-main transition-colors">Core Engine</a>
          <a href="#architecture" className="hover:text-text-main transition-colors">Security & Tenancy</a>
          <a href="#audiences" className="hover:text-text-main transition-colors">Specialized Domains</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/workspace"
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white hover:bg-primary-hover text-xs font-semibold rounded-md shadow-xs transition-colors"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="py-20 px-6 lg:px-12 max-w-6xl mx-auto w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft border border-primary/20 text-xs font-medium text-primary mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-success" />
            <span>Forensic-Grade Evidence Analysis for High-Stakes Professions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-main max-w-4xl mx-auto leading-tight">
            High-precision document intelligence with verifiable source provenance.
          </h1>

          <p className="text-sm sm:text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
            Antigravity empowers attorneys, medical researchers, and scientists to ingest complex document sets, execute M-to-N similarity analysis, conduct structure-preserving translation, and review low-confidence OCR with human-in-the-loop fallback.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/workspace"
              className="w-full sm:w-auto px-6 py-3 bg-primary text-white hover:bg-primary-hover text-sm font-semibold rounded-md shadow-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Enter Workspace Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/workspace/compare"
              className="w-full sm:w-auto px-6 py-3 bg-surface text-text-main border border-border-default hover:bg-surface-subtle text-sm font-semibold rounded-md shadow-xs flex items-center justify-center gap-2 transition-colors"
            >
              <GitCompareArrows className="w-4 h-4 text-primary" />
              <span>Explore M:N Similarity Matrix</span>
            </Link>
          </div>

          {/* Trust & Tenancy Indicators */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-3 bg-surface border border-border-subtle rounded-md">
              <div className="text-xs font-semibold text-text-main">M:N Matrix Engine</div>
              <div className="text-[11px] text-text-muted mt-0.5">1:1, 1:N, and pairwise cross-corpus analysis</div>
            </div>
            <div className="p-3 bg-surface border border-border-subtle rounded-md">
              <div className="text-xs font-semibold text-text-main">Human-in-the-Loop OCR</div>
              <div className="text-[11px] text-text-muted mt-0.5">Micro-state verification for degraded text</div>
            </div>
            <div className="p-3 bg-surface border border-border-subtle rounded-md">
              <div className="text-xs font-semibold text-text-main">Preserved Translation</div>
              <div className="text-[11px] text-text-muted mt-0.5">Structure-preserving with glossary locking</div>
            </div>
            <div className="p-3 bg-surface border border-border-subtle rounded-md">
              <div className="text-xs font-semibold text-text-main">Zero-Knowledge Sandbox</div>
              <div className="text-[11px] text-text-muted mt-0.5">Tenant isolation & cryptographic SHA-256 logs</div>
            </div>
          </div>
        </section>

        {/* Specialized Target Audiences */}
        <section id="audiences" className="py-16 bg-surface border-y border-border-default px-6 lg:px-12">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-xs font-semibold text-primary uppercase tracking-wider">
                Tailored for Rigorous Workflows
              </h2>
              <p className="text-2xl font-bold text-text-main">
                Engineered for professions where accuracy cannot be compromised
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-canvas border border-border-default rounded-md space-y-3">
                <div className="w-9 h-9 rounded-md bg-primary-soft text-primary flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-text-main">Litigation & Legal Operations</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Verify contract drafting provenance, detect verbatim or paraphrased clause overlap across discovery bundles, and preserve chain of custody with tamper-evident audit logs.
                </p>
              </div>

              <div className="p-6 bg-canvas border border-border-default rounded-md space-y-3">
                <div className="w-9 h-9 rounded-md bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-text-main">Clinical Research & Medicine</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Ingest clinical protocol filings, verify physician handwritten notes via confidence-bounded OCR fallbacks, and safeguard patient confidentiality within HIPAA-ready isolated tenancy.
                </p>
              </div>

              <div className="p-6 bg-canvas border border-border-default rounded-md space-y-3">
                <div className="w-9 h-9 rounded-md bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center">
                  <Microscope className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-text-main">Scientific Peer Review</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Analyze preprint manuscripts against research corpuses using hybrid lexical shingling and semantic embedding alignment without fabricating citations or hallucinating data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Footer */}
        <section className="py-16 px-6 lg:px-12 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-text-main">Ready to stage and analyze your document corpus?</h2>
          <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
            Launch the workspace now to explore the persistent 4-zone UI shell, staged document inventory, and forensic comparison matrix.
          </p>
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary-hover text-sm font-semibold rounded-md shadow-xs transition-colors"
          >
            <span>Launch Workspace</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border-default bg-surface px-6 lg:px-12 text-center text-xs text-text-muted">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Antigravity Document Intelligence Platform • All data quarantined locally</span>
          <span>WCAG 2.2 AA Baseline • Strict Isolated Tenancy</span>
        </div>
      </footer>
    </div>
  );
}
