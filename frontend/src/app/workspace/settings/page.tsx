'use client';

import React from 'react';
import {
  Settings,
  Shield,
  Clock,
  HardDrive,
  Cpu,
  Save,
  CheckCircle2,
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Top Header */}
      <div className="bg-surface border-b border-border-default px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-text-main tracking-tight">
              Workspace Settings & Tenancy Policy
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-soft text-primary font-medium border border-primary/20">
              PROJ-MED-2026-08
            </span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            Configure legal hold retention rules, isolated memory boundaries, and OCR thresholds.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-white hover:bg-primary-hover text-xs font-semibold rounded-md shadow-xs transition-colors">
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full">
        {/* Retention & Legal Hold Policy */}
        <div className="bg-surface p-5 rounded-md border border-border-default shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <h2 className="text-xs font-semibold text-text-main uppercase tracking-wider">
              Document Retention & Legal Hold
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-medium text-text-main block mb-1">
                Mandatory Retention Duration
              </label>
              <select className="w-full bg-surface-subtle border border-border-subtle rounded-md px-3 py-1.5 text-text-main font-medium focus:bg-surface focus:border-primary">
                <option value="30">30-Day Legal Hold (Standard Regulatory)</option>
                <option value="90">90-Day Trial Audit Window</option>
                <option value="365">1-Year Extended Litigation Hold</option>
                <option value="0">Ephemerality (Purge Immediately on Session Close)</option>
              </select>
            </div>
            <div>
              <label className="font-medium text-text-main block mb-1">
                Data Classification
              </label>
              <input
                type="text"
                readOnly
                value="PHI / Medical Data (HIPAA Safeguarded)"
                className="w-full bg-surface-subtle border border-border-subtle rounded-md px-3 py-1.5 text-warning font-semibold text-xs cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Processing Resource Limits */}
        <div className="bg-surface p-5 rounded-md border border-border-default shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-primary" />
            <h2 className="text-xs font-semibold text-text-main uppercase tracking-wider">
              Memory & Quarantine Sandboxing
            </h2>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-surface-subtle border border-border-subtle rounded-md">
              <div>
                <div className="font-medium text-text-main">Strict Magic-Byte Signature Verification</div>
                <div className="text-[11px] text-text-muted mt-0.5">Disallow file uploads where MIME type does not match true binary signature.</div>
              </div>
              <span className="text-success font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Enabled
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-surface-subtle border border-border-subtle rounded-md">
              <div>
                <div className="font-medium text-text-main">Prompt Injection Isolation Guard</div>
                <div className="text-[11px] text-text-muted mt-0.5">Untrusted document content is passed in passive schema bags, never system instruction blocks.</div>
              </div>
              <span className="text-success font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Enforced
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
