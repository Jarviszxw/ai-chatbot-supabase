'use server';

import { CoreMessage, CoreUserMessage, generateText } from 'ai';
import { cookies } from 'next/headers';

// Import DeepSeek setup to configure the API
import '@/lib/deepseek-setup';

import { customModel } from '@/ai';
import { DEFAULT_MODEL_NAME } from '@/ai/models';

export async function saveModelId(model: string) {
  const cookieStore = await cookies();
  cookieStore.set('model-id', model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: CoreUserMessage;
}) {
  try {
    console.log('Generating title with DeepSeek model:', DEFAULT_MODEL_NAME);
    
    const { text: title } = await generateText({
      model: customModel(DEFAULT_MODEL_NAME),
      system: `
      - You will generate a short title based on the first message a user begins a conversation with
      - Ensure it is not more than 80 characters long
      - The title should be a summary of the user's message
      - Do not use quotes or colons`,
      prompt: JSON.stringify(message),
      maxRetries: 3,
      temperature: 0.7, // Add a bit of randomness to avoid repetitive responses
    });

    return title || 'New Conversation';
  } catch (error) {
    console.error('Error generating title:', error);
    return 'New Conversation'; // Fallback title
  }
}
