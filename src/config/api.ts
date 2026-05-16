/**
 * API Configuration
 * Automatically switches between development and production API URLs
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://your-backend-domain.vercel.app/api'
    : 'http://localhost:5001/api');

export { API_BASE_URL };

// Helper function to build API endpoints
export const buildApiUrl = (endpoint: string): string => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  VERIFY: `${API_BASE_URL}/auth/verify`,
  
  // Projects
  PROJECTS: `${API_BASE_URL}/projects`,
  PROJECT_BY_ID: (id: string) => `${API_BASE_URL}/projects/${id}`,
  
  // Gallery
  GALLERY: `${API_BASE_URL}/gallery`,
  GALLERY_BY_ID: (id: string) => `${API_BASE_URL}/gallery/${id}`,
  
  // Articles
  ARTICLES: `${API_BASE_URL}/articles`,
  ARTICLE_BY_ID: (id: string) => `${API_BASE_URL}/articles/${id}`,
  
  // Skills
  SKILLS: `${API_BASE_URL}/skills`,
  SKILL_BY_ID: (id: string) => `${API_BASE_URL}/skills/${id}`,
  
  // Team
  TEAM: `${API_BASE_URL}/team`,
  TEAM_BY_ID: (id: string) => `${API_BASE_URL}/team/${id}`,
  
  // Content
  CONTENT: `${API_BASE_URL}/content`,
  CONTENT_BY_KEY: (key: string) => `${API_BASE_URL}/content/${key}`,
  
  // Contact
  CONTACT: `${API_BASE_URL}/contact`,
  CONTACT_MESSAGES: `${API_BASE_URL}/contact/messages`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/health`,
};

export default API_BASE_URL;
