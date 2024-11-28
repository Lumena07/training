import { useEffect, useState } from 'react';
import { useTrainingStore } from '../store/trainingStore';

export function useDocumentProgress(moduleId: string, currentPage: number, totalPages: number) {
  const updateModuleProgress = useTrainingStore((state) => state.updateModuleProgress);
  const [lastTrackedProgress, setLastTrackedProgress] = useState(0);

  useEffect(() => {
    const progress = Math.round((currentPage / totalPages) * 100);
    
    // Only update if progress has changed significantly (5% or more)
    if (Math.abs(progress - lastTrackedProgress) >= 5) {
      updateModuleProgress(moduleId, progress);
      setLastTrackedProgress(progress);
    }
  }, [currentPage, totalPages, moduleId, updateModuleProgress, lastTrackedProgress]);

  return lastTrackedProgress;
}