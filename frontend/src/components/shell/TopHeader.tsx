'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronRight,
  Search,
  PanelRight,
  Shield,
  Command,
} from 'lucide-react';
import { ProjectContext } from '@/types/navigation';

interface TopHeaderProps {
  currentProject: ProjectContext;
  isInspectorOpen: boolean;
  onToggleInspector: () => void;
  onSearchClick?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentProject,
  isInspectorOpen,
  onToggleInspector,
}) => {
  const pathname = usePathname();

  // Derive section from pathname (e.g. /workspace/compare -> Compare)
  const segments = pathname.split('/').filter(Boolean);
  const activeSubSection =
    segments.length > 1
      ? segments[1].charAt(0).toUpperCase() + segments[1].slice(1)
      : 'Overview';

  return (
    <header className="h-[68px] bg-surface border-b border-border-default px-6 flex items-center justify-between shrink-0 z-10">
      {/* Left: Breadcrumbs & Project Context */}
      <div className="flex items-center gap-3 min-w-0">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-text-muted">
          <Link
            href="/"
            className="font-semibold text-text-main flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span>DocuScope</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-border-default shrink-0" />
          <Link
            href="/workspace"
            className="truncate max-w-[160px] font-medium hover:text-text-main transition-colors"
            title={currentProject.name}
          >
            {currentProject.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-border-default shrink-0" />
          <span className="font-semibold text-primary">{activeSubSection}</span>
        </nav>

        {/* Security Classification Badge */}
        <div className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded bg-surface-subtle border border-border-subtle text-[11px] font-medium text-text-muted">
          <Shield className="w-3 h-3 text-warning shrink-0" />
          <span>{currentProject.classification}</span>
        </div>
      </div>

      {/* Center: Search & Quick Jump */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="w-full relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search documents, passages, or forensic tags..."
            className="w-full pl-9 pr-14 py-1.5 bg-surface-subtle border border-border-subtle rounded-md text-xs text-text-main placeholder:text-text-muted focus:bg-surface focus:border-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Search documents and forensic tags"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-surface border border-border-subtle rounded text-text-muted shadow-xs pointer-events-none">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </kbd>
        </div>
      </div>

      {/* Right: Engine Status, Inspector Toggle & User Context */}
      <div className="flex items-center gap-3">
        {/* Pipeline Engine Status Indicator */}
        <div
          className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-surface-subtle border border-border-subtle rounded-md text-xs"
          title="Asynchronous Processing Engine: Ready"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          <span className="font-medium text-text-muted text-[11px]">
            Engine: <span className="font-semibold text-text-main">Idle / Ready</span>
          </span>
        </div>

        {/* Toggle Right Inspector */}
        <button
          onClick={onToggleInspector}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors ${
            isInspectorOpen
              ? 'bg-primary-soft text-primary border-primary/30'
              : 'bg-surface text-text-muted hover:text-text-main border-border-subtle hover:bg-surface-subtle'
          }`}
          aria-label={isInspectorOpen ? 'Close Inspector aside' : 'Open Inspector aside'}
          aria-expanded={isInspectorOpen}
          title="Toggle Contextual Inspector (Shortcut: ])"
        >
          <PanelRight className="w-4 h-4" />
          <span className="hidden xl:inline">Inspector</span>
          <kbd className="hidden xl:inline px-1 py-0.2 text-[9px] font-mono bg-surface border border-border-subtle rounded text-text-muted">
            ]
          </kbd>
        </button>

        {/* User Identity Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-border-subtle">
          <div className="w-8 h-8 rounded-full bg-primary-soft text-primary border border-primary/20 flex items-center justify-center font-semibold text-xs shrink-0">
            AV
          </div>
          <div className="hidden 2xl:flex flex-col text-left">
            <span className="text-xs font-semibold text-text-main leading-tight">Dr. A. Vance</span>
            <span className="text-[10px] text-text-muted leading-tight">Chief Legal Analyst</span>
          </div>
        </div>
      </div>
    </header>
  );
};
