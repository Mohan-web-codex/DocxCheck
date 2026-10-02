'use client';

import React, { useState, useEffect } from 'react';
import { SidebarNav } from '@/components/shell/SidebarNav';
import { TopHeader } from '@/components/shell/TopHeader';
import { ContextualInspector } from '@/components/shell/ContextualInspector';
import { ProjectContext } from '@/types/navigation';
import { WorkspaceProvider } from '@/context/WorkspaceContext';

const DEFAULT_PROJECT: ProjectContext = {
  id: 'PROJ-MED-2026-08',
  name: 'Pfizer Clinical Protocol & Trial Dossier',
  clientOrOrg: 'Pfizer Bio-Pharma Legal Affairs',
  classification: 'PHI / Medical Data',
  documentCount: 12,
  lastUpdated: '2026-10-02 16:30',
  status: 'active',
};

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(true);
  const [currentProject] = useState<ProjectContext>(DEFAULT_PROJECT);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === '[') {
        e.preventDefault();
        setIsSidebarCollapsed((prev) => !prev);
      } else if (e.key === ']') {
        e.preventDefault();
        setIsInspectorOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <WorkspaceProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-canvas text-text-main select-none antialiased">
        {/* Zone 1: Persistent Left Navigation */}
        <SidebarNav
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          currentProject={currentProject}
        />

        {/* Main Column */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Zone 2: Top Header */}
          <TopHeader
            currentProject={currentProject}
            isInspectorOpen={isInspectorOpen}
            onToggleInspector={() => setIsInspectorOpen((prev) => !prev)}
          />

          {/* Central Work Area + Aside Inspector */}
          <div className="flex-1 flex min-h-0 overflow-hidden relative">
            {/* Dynamic Central Work Canvas */}
            <main
              id="main-content"
              className="flex-1 flex flex-col bg-canvas overflow-y-auto overflow-x-hidden min-w-0 focus:outline-none"
              tabIndex={-1}
              aria-label="Main Work Canvas"
            >
              {children}
            </main>

            {/* Zone 4: Right Contextual Inspector */}
            <ContextualInspector
              isOpen={isInspectorOpen}
              onClose={() => setIsInspectorOpen(false)}
              currentProject={currentProject}
            />
          </div>
        </div>
      </div>
    </WorkspaceProvider>
  );
}
