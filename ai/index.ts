import { openai } from '@ai-sdk/openai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';

import { customMiddleware } from './custom-middleware';

// Create a function to initialize DeepSeek API client using OpenAI-compatible interface
export const customModel = (apiIdentifier: string) => {
  // The SDK will automatically use process.env.OPENAI_API_KEY and process.env.OPENAI_BASE_URL
  // which are set to use DeepSeek in our .env file
  return wrapLanguageModel({
    model: openai(apiIdentifier as any), // Type cast to avoid strict type checking
    middleware: customMiddleware,
  });
};
