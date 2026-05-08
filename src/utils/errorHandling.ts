/**
 * Utility functions for better error handling across the application
 */

export interface ApiError {
  message: string;
  status?: number;
  details?: string;
}

/**
 * Parse and format API errors with user-friendly messages
 */
export const parseApiError = (error: unknown): ApiError => {
  // Network/Connection errors
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return {
      message: 'Cannot connect to server',
      details: 'Please check if the backend server is running on port 5001. If the problem persists, contact support.',
      status: 0
    };
  }

  // HTTP Response errors
  if (error instanceof Response) {
    return {
      message: `Server error (${error.status})`,
      details: error.statusText || 'The server returned an error',
      status: error.status
    };
  }

  // Standard Error objects
  if (error instanceof Error) {
    return {
      message: error.message,
      details: 'An error occurred while processing your request'
    };
  }

  // Unknown errors
  return {
    message: 'An unexpected error occurred',
    details: 'Please try again. If the problem persists, contact support.'
  };
};

/**
 * Handle fetch responses with proper error parsing
 */
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }
    
    throw new Error(errorMessage);
  }
  
  return response.json();
};

/**
 * Wrapper for fetch with better error handling
 */
export const apiRequest = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      ...options
    });
    
    return await handleApiResponse(response);
  } catch (error) {
    const apiError = parseApiError(error);
    throw new Error(apiError.message);
  }
};

/**
 * Log errors with context for debugging
 */
export const logError = (context: string, error: unknown, additionalInfo?: any) => {
  const apiError = parseApiError(error);
  
  console.group(`🚨 Error in ${context}`);
  console.error('Message:', apiError.message);
  if (apiError.status) console.error('Status:', apiError.status);
  if (apiError.details) console.error('Details:', apiError.details);
  if (additionalInfo) console.error('Additional Info:', additionalInfo);
  console.error('Original Error:', error);
  console.groupEnd();
};

/**
 * Common error messages for different scenarios
 */
export const ERROR_MESSAGES = {
  NETWORK: 'Cannot connect to server. Please check your internet connection.',
  SERVER: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  GENERIC: 'Something went wrong. Please try again.'
} as const;