// Data exports for static JSON files
export { default as projectsData } from './projects.json';
export { default as skillsData } from './skills.json';
export { default as contentData } from './content.json';
export { default as workflowData } from './workflow.json';

// Export TypeScript data
export { projects, getProjectsByCategory, getFeaturedProjects, type Project } from './projects';
export { articles, type Article } from './articles';

// Type definitions for data structures
export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  technologies: string[];
  aiWorkflow?: string;
  previewImage: string;
  liveLink?: string;
  repoLink?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface WorkflowStep {
  name: string;
  description: string;
  aiAssisted: boolean;
}

export interface HeroContent {
  headline: string;
  tagline: string;
  aiWorkflowMention: string;
}

export interface SocialLinks {
  email: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}