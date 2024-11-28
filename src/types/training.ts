export interface Module {
  id: string;
  title: string;
  description: string;
  type: ModuleType;
  duration: number; // in minutes
  status: ModuleStatus;
  progress: number; // 0-100
  content?: ModuleContent;
}

export interface ModuleContent {
  videoUrl?: string;
  documentUrl?: string;
  interactiveUrl?: string;
  meetingUrl?: string;
  questions?: AssessmentQuestion[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export enum ModuleType {
  VIDEO = 'VIDEO',
  INTERACTIVE = 'INTERACTIVE',
  DOCUMENT = 'DOCUMENT',
  ASSESSMENT = 'ASSESSMENT',
  VIRTUAL_CLASS = 'VIRTUAL_CLASS'
}

export enum ModuleStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface TrainingProgress {
  userId: string;
  moduleId: string;
  completedAt?: Date;
  score?: number;
  timeSpent: number;
}