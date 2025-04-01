// Server-side only setup for DeepSeek API
// This file should be imported from server components or API routes

import { configureDeepSeekAPI } from './utils';

// Configure DeepSeek API
configureDeepSeekAPI();

// Set global fetch options to help with connection issues
if (typeof global !== 'undefined') {
  // Increase default timeout
  const originalFetch = global.fetch;
  global.fetch = (url, options) => {
    const timeout = 60000; // 60 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const fetchOptions = {
      ...options,
      signal: controller.signal,
    };
    
    return originalFetch(url, fetchOptions).finally(() => {
      clearTimeout(timeoutId);
    });
  };
}

export const deepseekSetup = {
  isConfigured: true,
}; 