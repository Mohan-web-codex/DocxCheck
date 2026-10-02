'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Files,
  GitCompareArrows,
  Languages,
  FileDown,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
import { ShieldCheck, Settings } from 'lucide-react';
import { NavSection, ProjectContext } from '@/types/navigation';
import { useWorkspace } from '@/context/WorkspaceContext';

interface SidebarNavProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  currentProject: ProjectContext;
}

interface NavItemConfig {
  id: NavSection;
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description: string;
  requiresFiles?: boolean;
}

const NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'workspace',
    href: '/workspace',
    label: 'Workspace',
    icon: LayoutGrid,
    description: 'Active project overview & metrics',
  },
  {
    id: 'library',
    href: '/workspace/library',
    label: 'Library',
    icon: Files,
    badge: '12',
    description: 'Validated document repository',
  },
  {
    id: 'compare',
    href: '/workspace/compare',
    label: 'Compare',
    icon: GitCompareArrows,
    badge: 'M:N',
    description: 'Multi-document forensic alignment',
    requiresFiles: true,
  },
  {
    id: 'translate',
    href: '/workspace/translate',
    label: 'Translate',
    icon: Languages,
    description: 'Structure-preserving localized review',
    requiresFiles: true,
  },
  {
    id: 'exports',
    href: '/workspace/exports',
    label: 'Exports',
    icon: FileDown,
    description: 'Multi-layer PDF & audit summaries',
    requiresFiles: true,
  },
  {
    id: 'audit',
    href: '/workspace/audit',
    label: 'Audit Log',
    icon: ShieldAlert,
    description: 'Cryptographic provenance trail',
    requiresFiles: true,
  },
  {
    id: 'settings',
    href: '/workspace/settings',
    label: 'Settings',
    icon: Settings,
    description: 'Tenancy policies and engine bounds',
  },
];

export const SidebarNav: React.FC<SidebarNavProps> = ({
  isCollapsed,
  onToggleCollapse,
  currentProject,
}) => {
  const pathname = usePathname();
  const { isReady } = useWorkspace();

  return (
    <aside
      className={`relative flex flex-col bg-surface border-r border-border-default transition-all duration-200 select-none z-20 ${
        isCollapsed ? 'w-[68px]' : 'w-[248px]'
      }`}
      aria-label="Primary Navigation"
    >
      {/* Brand & Project Selector */}
      <div className="flex flex-col border-b border-border-subtle p-3 h-[68px] justify-center">
        {isCollapsed ? (
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="w-10 h-10 rounded-md bg-primary-soft text-primary flex items-center justify-center font-bold text-base tracking-wider hover:bg-primary hover:text-white transition-colors"
              title="Antigravity Workspace (Return to Home)"
            >
              AG
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 min-w-0 group">
              <div className="w-8 h-8 rounded-md bg-primary text-white flex items-center justify-center font-bold text-sm tracking-wider shrink-0 shadow-xs group-hover:bg-primary-hover transition-colors">
                AG
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold tracking-wider uppercase text-primary flex items-center gap-1">
                  <span>Antigravity</span>
                  <span className="text-[10px] px-1 py-0.2 bg-primary-soft text-primary rounded font-mono font-medium">v1.0</span>
                </div>
                <div className="text-xs font-medium text-text-muted truncate mt-0.5" title={currentProject.name}>
                  {currentProject.name}
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Navigation Items with Persistent Links */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto" aria-label="Main Navigation">
        {!isCollapsed && (
          <div className="px-2 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Workspace Modules
          </div>
        )}

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/workspace'
              ? pathname === '/workspace'
              : pathname.startsWith(item.href);

          const isDisabled = item.requiresFiles && !isReady;

          return (
            <Link
              key={item.id}
              href={isDisabled ? '#' : item.href}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left relative group ${
                isDisabled
                  ? 'opacity-50 cursor-not-allowed text-text-muted'
                  : isActive
                  ? 'bg-primary-soft text-primary font-semibold'
                  : 'text-text-muted hover:text-text-main hover:bg-surface-subtle'
              }`}
              onClick={(e) => {
                if (isDisabled) e.preventDefault();
              }}
              aria-current={isActive && !isDisabled ? 'page' : undefined}
              title={isCollapsed ? `${item.label} — ${item.description}` : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-primary rounded-r" />
              )}
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-primary' : 'text-text-muted group-hover:text-text-main'
                }`}
              />

              {!isCollapsed && (
                <div className="flex items-center justify-between flex-1 min-w-0">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded font-mono font-semibold tabular-nums ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'bg-surface-subtle text-text-muted border border-border-subtle'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Security & Workspace Tenancy Notice */}
      {!isCollapsed && (
        <div className="p-3 mx-2 mb-2 bg-surface-subtle border border-border-subtle rounded-md text-[11px] text-text-muted">
          <div className="flex items-center gap-1.5 font-semibold text-text-main text-[11px] mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0" />
            <span>Isolated Tenancy</span>
          </div>
          <p className="line-clamp-2 leading-relaxed">
            E2E zero-knowledge boundary. Documents quarantined to private memory.
          </p>
          <div className="mt-1.5 flex items-center gap-1 font-mono text-[10px] text-primary">
            <span>Scope:</span>
            <span className="font-semibold truncate">{currentProject.id}</span>
          </div>
        </div>
      )}

      {/* Collapse Toggle Footer */}
      <div className="p-2 border-t border-border-subtle flex items-center justify-between">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 px-2.5 py-2 text-xs font-medium text-text-muted hover:text-text-main hover:bg-surface-subtle rounded-md transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar (Shortcut: [)' : 'Collapse sidebar (Shortcut: [)'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="flex-1 text-left">Collapse Panel</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-surface border border-border-subtle rounded text-text-muted">
                [
              </kbd>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
