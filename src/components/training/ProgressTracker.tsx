import React from 'react';
import { useTrainingStore } from '../../store/trainingStore';
import { ModuleType, ModuleStatus } from '../../types/training';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

export function ProgressTracker() {
  const { modules } = useTrainingStore();

  const totalModules = modules.length;
  const completedModules = modules.filter(
    (m) => m.status === ModuleStatus.COMPLETED
  ).length;
  const inProgressModules = modules.filter(
    (m) => m.status === ModuleStatus.IN_PROGRESS
  ).length;

  const overallProgress = Math.round((completedModules / totalModules) * 100);

  const modulesByType = modules.reduce((acc, module) => {
    acc[module.type] = (acc[module.type] || 0) + 1;
    return acc;
  }, {} as Record<ModuleType, number>);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium mb-6">Training Progress</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm text-green-700">Completed</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-2">
            {completedModules} modules
          </p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-sm text-yellow-700">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900 mt-2">
            {inProgressModules} modules
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <XCircle className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">Not Started</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {totalModules - completedModules - inProgressModules} modules
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm font-medium text-gray-700">{overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Modules by Type</h4>
        {Object.entries(modulesByType).map(([type, count]) => (
          <div key={type} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{type}</span>
            <span className="text-sm font-medium">{count} modules</span>
          </div>
        ))}
      </div>
    </div>
  );
}