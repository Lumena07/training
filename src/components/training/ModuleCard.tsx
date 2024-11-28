import React from 'react';
import { Module, ModuleType } from '../../types/training';
import { BookOpen, Video, Users, FileCheck, Monitor } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  onClick: (module: Module) => void;
}

const moduleTypeIcons = {
  [ModuleType.DOCUMENT]: BookOpen,
  [ModuleType.VIDEO]: Video,
  [ModuleType.INTERACTIVE]: Users,
  [ModuleType.ASSESSMENT]: FileCheck,
  [ModuleType.VIRTUAL_CLASS]: Monitor,
};

export function ModuleCard({ module, onClick }: ModuleCardProps) {
  const Icon = moduleTypeIcons[module.type];

  return (
    <div
      onClick={() => onClick(module)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{module.description}</p>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium">{module.progress}%</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${module.progress}%` }}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Duration: {module.duration} minutes
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                module.status === 'COMPLETED'
                  ? 'bg-green-100 text-green-800'
                  : module.status === 'IN_PROGRESS'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {module.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}