'use client';

import React, { useState } from 'react';
import {
  Languages,
  BookOpen,
  ArrowRightLeft,
  CheckCircle2,
  FileText,
  Sparkles,
  Lock,
} from 'lucide-react';

export default function TranslatePage() {
  const [sourceLang, setSourceLang] = useState('de');
  const [targetLang, setTargetLang] = useState('en');

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Header */}
      <div className="bg-surface border-b border-border-default px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-text-main tracking-tight">
              Multilingual Analysis & Glossary Engine
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#0D9488]/10 text-[#0D9488] font-medium border border-[#0D9488]/30">
              Glossary Lock: Active
            </span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            Structure-preserving translation with domain terminology enforcement for legal and clinical dossiers.
          </p>
        </div>

        {/* Language Pair Selector */}
        <div className="flex items-center gap-3 bg-surface-subtle p-1.5 rounded-md border border-border-subtle text-xs">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="bg-surface border border-border-subtle rounded px-2.5 py-1 text-text-main font-medium focus:ring-primary"
          >
            <option value="de">German (Deutsch - DE)</option>
            <option value="fr">French (Français - FR)</option>
            <option value="es">Spanish (Español - ES)</option>
            <option value="ja">Japanese (日本語 - JA)</option>
          </select>
          <ArrowRightLeft className="w-3.5 h-3.5 text-text-muted" />
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="bg-surface border border-border-subtle rounded px-2.5 py-1 text-text-main font-medium focus:ring-primary"
          >
            <option value="en">English (US)</option>
            <option value="en-gb">English (UK)</option>
          </select>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 p-6 space-y-6 max-w-7xl w-full mx-auto">
        {/* Terminology Glossary Strip */}
        <div className="bg-surface p-4 rounded-md border border-border-default shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0D9488]" />
              <h2 className="text-xs font-semibold text-text-main uppercase tracking-wider">
                Clinical & Regulatory Terminology Glossary
              </h2>
            </div>
            <span className="text-[11px] font-mono text-text-muted">4 Enforced Rules</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs font-mono">
            {[
              { src: 'Einschlusskriterien', tgt: 'Inclusion Criteria' },
              { src: 'Studiendossier', tgt: 'Trial Dossier' },
              { src: 'Zulassungsantrag', tgt: 'Marketing Authorization Application' },
              { src: 'Nebenwirkungsprofil', tgt: 'Adverse Event Profile' },
            ].map((rule, idx) => (
              <div key={idx} className="p-2 bg-surface-subtle border border-border-subtle rounded flex items-center justify-between">
                <span className="text-text-muted">{rule.src}</span>
                <span className="text-text-main font-semibold">&rarr; {rule.tgt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Translation Side-by-Side Review */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[400px]">
          <div className="bg-surface rounded-md border border-border-default shadow-xs flex flex-col overflow-hidden">
            <div className="px-4 py-3 bg-surface-subtle border-b border-border-subtle flex items-center justify-between text-xs">
              <span className="font-semibold text-text-main">Original Document (German)</span>
              <span className="font-mono text-text-muted">Paragraphs 1-8</span>
            </div>
            <div className="p-4 flex-1 overflow-y-auto text-xs leading-relaxed font-serif text-text-main/90 space-y-3 bg-white">
              <p>
                1. Die vorliegenden Studiendossiers entsprechen den Anforderungen der Richtlinie 2001/83/EG.
              </p>
              <p>
                2. Alle Patienten wurden vor der Aufnahme über das Nebenwirkungsprofil und die Risiken aufgeklärt.
              </p>
            </div>
          </div>

          <div className="bg-surface rounded-md border border-border-default shadow-xs flex flex-col overflow-hidden">
            <div className="px-4 py-3 bg-surface-subtle border-b border-border-subtle flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
                <span className="font-semibold text-text-main">Verified Translation (English US)</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/10 text-success font-medium">Glossary Matched</span>
            </div>
            <div className="p-4 flex-1 overflow-y-auto text-xs leading-relaxed font-serif text-text-main/90 space-y-3 bg-white">
              <p>
                1. The present <span className="underline decoration-[#0D9488] decoration-2 font-semibold">trial dossiers</span> comply with the requirements of Directive 2001/83/EC.
              </p>
              <p>
                2. Prior to enrollment, all patients were informed regarding the <span className="underline decoration-[#0D9488] decoration-2 font-semibold">adverse event profile</span> and associated risks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
