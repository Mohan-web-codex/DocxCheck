'use client';

import React, { createContext, useContext, useState } from 'react';

interface WorkspaceContextType {
  sourceFiles: File[];
  targetFiles: File[];
  setSourceFiles: (files: File[]) => void;
  setTargetFiles: (files: File[]) => void;
  isReady: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [sourceFiles, setSourceFiles] = useState<File[]>([]);
  const [targetFiles, setTargetFiles] = useState<File[]>([]);

  // The workspace is considered "ready" if there is at least one source file and one target file
  const isReady = sourceFiles.length > 0 && targetFiles.length > 0;

  return (
    <WorkspaceContext.Provider
      value={{
        sourceFiles,
        targetFiles,
        setSourceFiles,
        setTargetFiles,
        isReady,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
