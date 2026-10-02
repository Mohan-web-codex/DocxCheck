'use client';

import React, { useState, useEffect } from 'react';
import { SidebarNav } from './SidebarNav';
import { TopHeader } from './TopHeader';
import { CentralCanvas } from './CentralCanvas';
import { ContextualInspector } from './ContextualInspector';
import { NavSection, ProjectContext } from '@/types/navigation';

const DEFAULT_PROJECT: ProjectContext = {
  id: 'PROJ-MED-2026-08',
  name: 'Pfizer Clinical Protocol & Trial Dossier',
  clientOrOrg: 'Pfizer Bio-Pharma Legal Affairs',
  classification: 'PHI / Medical Data',
  documentCount: 12,
  lastUpdated: '2026-10-02 16:30',
  status: 'active',
};

export const WorkspaceShell: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>('workspace');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(true);
  const [currentProject, setCurrentProject] = useState<ProjectContext>(DEFAULT_PROJECT);

  // Global Keyboard Shortcuts for Pro Productivity
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is typing in inputs or textareas
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
    <div className="flex h-screen w-screen overflow-hidden bg-canvas text-text-main select-none antialiased">
      {/* Zone 1: Left Navigation (Collapsible) */}
      <SidebarNav
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        currentProject={currentProject}
      />

      {/* Main Column (Top Header + Center Canvas) */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Zone 2: Top Header */}
        <TopHeader
          currentProject={currentProject}
          isInspectorOpen={isInspectorOpen}
          onToggleInspector={() => setIsInspectorOpen((prev) => !prev)}
        />

        {/* Central Layout containing Work Canvas & Aside Inspector */}
        <div className="flex-1 flex min-h-0 overflow-hidden relative">
          {/* Zone 3: Central Work Canvas */}
          <CentralCanvas
            activeSection={activeSection}
            currentProject={currentProject}
            onNavigateSection={setActiveSection}
          />

          {/* Zone 4: Right Contextual Inspector (Collapsible) */}
          <ContextualInspector
            isOpen={isInspectorOpen}
            onClose={() => setIsInspectorOpen(false)}
            currentProject={currentProject}
          />
        </div>
      </div>
    </div>
  );
};
