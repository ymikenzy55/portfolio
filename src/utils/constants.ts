import type { DesignTokens } from '@/types';

/**
 * Design tokens for the portfolio website
 * Following the liquid glass UI design system
 */
export const DESIGN_TOKENS: DesignTokens = {
  colors: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    accent: '#6366f1', // Indigo accent color
    background: '#0a0a0a',
    surface: '#1a1a1a',
    text: {
      primary: '#ffffff',
      secondary: '#e5e7eb',
      muted: '#9ca3af',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
  },
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },
  typography: {
    fontFamily: {
      primary: '"Urbanist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  borderRadius: {
    sm: '0.25rem', // 4px
    md: '0.5rem',  // 8px
    lg: '0.75rem', // 12px
  },
  blur: {
    sm: '4px',
    md: '10px',
    lg: '20px',
  },
};

/**
 * Responsive breakpoints
 */
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
} as const;

/**
 * Animation durations and easings
 */
export const ANIMATIONS = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

/**
 * Z-index layers for consistent stacking
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  modal: 30,
  popover: 40,
  tooltip: 50,
} as const;

/**
 * Common component sizes
 */
export const COMPONENT_SIZES = {
  button: {
    small: {
      height: 32,
      padding: 12,
      fontSize: DESIGN_TOKENS.typography.fontSize.sm,
    },
    medium: {
      height: 40,
      padding: 16,
      fontSize: DESIGN_TOKENS.typography.fontSize.base,
    },
    large: {
      height: 48,
      padding: 24,
      fontSize: DESIGN_TOKENS.typography.fontSize.lg,
    },
  },
  card: {
    padding: DESIGN_TOKENS.spacing.md,
    borderRadius: DESIGN_TOKENS.borderRadius.md,
    shadow: `0 8px 32px ${DESIGN_TOKENS.colors.glass.shadow}`,
  },
} as const;

/**
 * Navigation routes
 */
export const ROUTES = {
  home: '/',
  clients: '/clients',
  recruiters: '/recruiters',
  contact: '/contact',
  process: '/process',
  admin: '/padmin',
} as const;

/**
 * External links
 */
export const EXTERNAL_LINKS = {
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
} as const;

/**
 * Form validation patterns
 */
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-()]+$/,
  url: /^https?:\/\/.+/,
} as const;

/**
 * Performance thresholds
 */
export const PERFORMANCE = {
  debounceDelay: 300,
  throttleDelay: 100,
  lazyLoadOffset: 100,
  maxImageSize: 1920,
} as const;

/**
 * Accessibility constants
 */
export const A11Y = {
  focusRingColor: DESIGN_TOKENS.colors.accent,
  minContrastRatio: 4.5,
  animationDuration: ANIMATIONS.duration.normal,
} as const;