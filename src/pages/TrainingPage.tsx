//import React from 'react';
import { ModuleList } from '../components/training/ModuleList';
import { ModuleDetail } from '../components/training/ModuleDetail';
import { useTrainingStore } from '../store/trainingStore';

export function TrainingPage() {
  const { selectedModule, setSelectedModule } = useTrainingStore();

  if (selectedModule) {
    return <ModuleDetail module={selectedModule} onBack={() => setSelectedModule(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Training Modules
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Complete all required training modules to progress through your pilot training program.
        </p>
      </div>
      <ModuleList />
    </div>
  );
}