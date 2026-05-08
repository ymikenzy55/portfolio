// Core data types for the portfolio website

export interface Project {
  id: string;
  title: string;
  description: string; // brief description for card
  problem: string; // detailed problem statement
  solution: string; // how it was solved
  outcome: string; // results and impact
  technologies: string[];
  aiWorkflow?: string; // AI-assisted workflow description
  previewImage: string;
  liveLink?: string;
  repoLink?: string;
  featured?: boolean; // for highlighting key projects
}

export interface Skill {
  category: 'UI/UX' | 'Frontend' | 'Backend' | 'AI' | 'Tools';
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

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Component prop types
export interface HomePageProps {
  heroContent: HeroContent;
}

export interface ClientSectionProps {
  projects: Project[];
}

export interface RecruiterSectionProps {
  skills: Skill[];
  techStack: string[];
  resumeLink: string;
}

export interface ContactPageProps {
  socialLinks: SocialLinks;
}

export interface ProcessPageProps {
  workflow: WorkflowStep[];
}

// Design system component types
export interface LiquidGlassCardProps {
  children: React.ReactNode;
  blur?: number; // default: 10px
  opacity?: number; // default: 0.1
  shadow?: string; // default: "0 8px 32px rgba(0,0,0,0.1)"
  hoverEffect?: boolean; // enables glass morphing on hover
  className?: string;
}

export interface PixelPerfectButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface AnimatedTextProps {
  text: string;
  animation: 'clip-path-reveal' | 'fade-in' | 'slide-up';
  delay?: number;
  className?: string;
}

export interface ParallaxCardProps {
  children: React.ReactNode;
  intensity?: number; // 0-1, controls parallax strength
  cursorSheen?: boolean; // enables cursor-linked sheen effect
  className?: string;
}

export interface ResponsiveGridProps {
  children: React.ReactNode;
  columns: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap: 8 | 16 | 24; // matches spacing grid
  className?: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface NavigationProps {
  items: NavItem[];
  currentPath: string;
}

// Animation and interaction types
export type AnimationType = 'clip-path-reveal' | 'fade-in' | 'slide-up' | 'parallax' | 'sheen';

export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
}

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

// Color palette and design tokens
export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    glass: {
      background: string;
      border: string;
      shadow: string;
    };
  };
  spacing: {
    xs: number; // 8px
    sm: number; // 16px
    md: number; // 24px
    lg: number; // 32px
    xl: number; // 48px
  };
  typography: {
    fontFamily: {
      primary: string; // Urbanist
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    fontWeight: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  blur: {
    sm: string;
    md: string;
    lg: string;
  };
}