'use client';

import React from 'react';
import {
  ShieldAlert,
  Hash,
  Clock,
  UserCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function AuditPage() {
  const auditEvents = [
    {
      id: 'EVT-90412',
      action: 'Document Ingested & Quarantined',
      target: 'Clinical_Trial_Protocol_v3.pdf',
      actor: 'Dr. A. Vance (Lead Analyst)',
      timestamp: '2026-10-02 16:20:11 UTC',
      hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      status: 'Verified',
    },
    {
      id: 'EVT-90413',
      action: 'OCR Confidence Scan Completed',
      target: 'Physician_Handwritten_Notes_Batch2.pdf',
      actor: 'DocuEngine v2.4 (Worker #3)',
      timestamp: '2026-10-02 16:21:40 UTC',
      hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      status: '4 Flags Logged',
    },
    {
      id: 'EVT-90414',
      action: 'M:N Similarity Matrix Executed',
      target: 'Corpus Batch PROJ-MED-2026-08',
      actor: 'Dr. A. Vance (Lead Analyst)',
      timestamp: '2026-10-02 16:24:02 UTC',
      hash: '7c6a992a6c1167440409a6567f8eb219dfa43ce2f67ceac5d8e7892b15fb8625',
      status: 'Indexed',
    },
    {
      id: 'EVT-90415',
      action: 'Translation Glossary Matched',
      target: 'European_Regulatory_Filing_DE.docx',
      actor: 'DocuEngine v2.4 (Worker #1)',
      timestamp: '2026-10-02 16:25:30 UTC',
      hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
      status: 'Glossary Locked',
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Header */}
      <div className="bg-surface border-b border-border-default px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-text-main tracking-tight">
              Cryptographic Audit Log & Provenance
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-soft text-primary font-medium border border-primary/20">
              Append-Only Ledger
            </span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            Immutable SHA-256 evidence verification. Zero raw sensitive document text logged per security policy.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-success/10 text-success border border-success/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ledger Integrity Intact</span>
          </span>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 p-6 space-y-6 max-w-7xl w-full mx-auto">
        <div className="bg-surface rounded-md border border-border-default shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border-subtle bg-surface-subtle/50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-primary" />
              <span className="font-semibold text-text-main uppercase tracking-wider">
                Verifiable Event Ledger
              </span>
            </div>
            <span className="text-text-muted">{auditEvents.length} Recorded Transactions</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-text-main">
              <thead className="bg-surface-subtle border-b border-border-subtle text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4">Event ID</th>
                  <th className="py-2.5 px-4">Action</th>
                  <th className="py-2.5 px-4">Target Artifact</th>
                  <th className="py-2.5 px-4">Actor</th>
                  <th className="py-2.5 px-4">Timestamp (UTC)</th>
                  <th className="py-2.5 px-4">SHA-256 Digest</th>
                  <th className="py-2.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {auditEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-surface-subtle/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-primary">{evt.id}</td>
                    <td className="py-3 px-4 font-medium text-text-main">{evt.action}</td>
                    <td className="py-3 px-4 text-text-muted max-w-xs truncate">{evt.target}</td>
                    <td className="py-3 px-4 text-text-muted">{evt.actor}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-text-muted">{evt.timestamp}</td>
                    <td className="py-3 px-4 font-mono text-[10px] text-text-muted truncate max-w-[120px]" title={evt.hash}>
                      {evt.hash}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-surface-subtle border border-border-subtle text-text-main">
                        {evt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
