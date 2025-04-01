// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'deepseek-chat',
    label: 'DeepSeek Chat',
    apiIdentifier: 'deepseek-chat',
    description: 'High-quality general-purpose AI model',
  },
  {
    id: 'deepseek-coder',
    label: 'DeepSeek Coder',
    apiIdentifier: 'deepseek-coder',
    description: 'Specialized model for programming tasks',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'deepseek-chat';
