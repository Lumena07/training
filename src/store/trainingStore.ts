import { create } from 'zustand';
import { Module, ModuleStatus, ModuleType } from '../types/training';

interface TrainingState {
  modules: Module[];
  selectedModule: Module | null;
  setSelectedModule: (module: Module | null) => void;
  updateModuleProgress: (moduleId: string, progress: number) => void;
}

export const useTrainingStore = create<TrainingState>((set) => ({
  modules: [
   /* {
      id: '1',
      title: 'Company Policies & Procedures',
      description: 'Essential company policies and standard operating procedures.',
      type: ModuleType.DOCUMENT,
      duration: 120,
      status: ModuleStatus.NOT_STARTED,
      progress: 0,
      content: {
        documentUrl: 'https://example.com/policies.pdf',
      },
    },*/
    {
      id: '2',
      title: 'Aircraft Systems Training',
      description: 'Comprehensive overview of aircraft systems and operations.',
      type: ModuleType.VIDEO,
      duration: 180,
      status: ModuleStatus.NOT_STARTED,
      progress: 0,
      content: {
        videoUrl: 'https://youtu.be/br-Dy3puDoc?si=M_Q2EXtydr6TEb_R',
      },
    },
    {
      id: '3',
      title: 'CRM Fundamentals',
      description: 'Crew Resource Management principles and practices.',
      type: ModuleType.INTERACTIVE,
      duration: 150,
      status: ModuleStatus.NOT_STARTED,
      progress: 0,
      content: {
        interactiveUrl: 'https://youtu.be/br-Dy3puDoc?si=M_Q2EXtydr6TEb_R',
      },
    },
    {
      id: '4',
      title: 'Virtual Classroom Session',
      description: 'Live training session with instructor.',
      type: ModuleType.VIRTUAL_CLASS,
      duration: 90,
      status: ModuleStatus.NOT_STARTED,
      progress: 0,
      content: {
        meetingUrl: 'https://youtu.be/br-Dy3puDoc?si=M_Q2EXtydr6TEb_R',
      },
    },
  ],
  selectedModule: null,
  setSelectedModule: (module) => set({ selectedModule: module }),
  updateModuleProgress: (moduleId, progress) =>
    set((state) => ({
      modules: state.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              progress,
              status:
                progress === 100
                  ? ModuleStatus.COMPLETED
                  : progress > 0
                  ? ModuleStatus.IN_PROGRESS
                  : ModuleStatus.NOT_STARTED,
            }
          : module
      ),
    })),
}));