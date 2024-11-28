import React from 'react';
import { Module } from '../../types/training';
import { VideoPlayer } from './content/VideoPlayer';
import { DocumentViewer } from './content/DocumentViewer';
import { InteractiveModule } from './content/InteractiveModule';
import { VirtualClassroom } from './content/VirtualClassroom';
import { Assessment } from './content/Assessment';
import { ArrowLeft } from 'lucide-react';

interface ModuleDetailProps {
  module: Module;
  onBack: () => void;
}

export function ModuleDetail({ module, onBack }: ModuleDetailProps) {
  const renderContent = () => {
    if (!module.content) return null;

    switch (module.type) {
      case 'VIDEO':
        return <VideoPlayer url={module.content.videoUrl || ''} />;
      case 'DOCUMENT':
        return <DocumentViewer url={module.content.documentUrl || ''} />;
      case 'INTERACTIVE':
        return <InteractiveModule url={module.content.interactiveUrl || ''} />;
      case 'VIRTUAL_CLASS':
        return <VirtualClassroom url={module.content.meetingUrl || ''} />;
      case 'ASSESSMENT':
        return <Assessment questions={module.content.questions || []} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Modules
        </button>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">{module.title}</h2>
        <p className="mt-2 text-sm text-gray-500">{module.description}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        {renderContent()}
      </div>
    </div>
  );
}