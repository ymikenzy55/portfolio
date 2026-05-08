/**
 * Typography utilities for the Urbanist font system
 * Provides consistent font weights and sizes across the application
 */

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem', // 60px
} as const;

export const lineHeights = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
} as const;

/**
 * Typography presets following the design system
 * Headlines use Bold/SemiBold weights, Body text uses Regular/Medium
 */
export const typographyPresets = {
  // Headlines - Bold/SemiBold for impact
  headline1: {
    fontSize: fontSizes['6xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: '-0.02em',
  },
  headline2: {
    fontSize: fontSizes['5xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: '-0.01em',
  },
  headline3: {
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
  },
  headline4: {
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
  },
  headline5: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
  },
  headline6: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.normal,
  },
  
  // Body text - Regular/Medium for readability
  bodyLarge: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.relaxed,
  },
  body: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
  },
  bodyMedium: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
  },
  bodySmall: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
  },
  caption: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
} as const;

/**
 * Font family with proper fallbacks
 */
export const fontFamily = "'Urbanist', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif";

/**
 * Helper function to get typography styles as CSS-in-JS object
 */
export const getTypographyStyles = (preset: keyof typeof typographyPresets) => {
  return {
    fontFamily,
    ...typographyPresets[preset],
  };
};

/**
 * CSS class names for typography utilities
 */
export const typographyClasses = {
  headline1: 'text-headline-1',
  headline2: 'text-headline-2',
  headline3: 'text-headline-3',
  headline4: 'text-headline-4',
  headline5: 'text-headline-5',
  headline6: 'text-headline-6',
  bodyLarge: 'text-body-large',
  body: 'text-body',
  bodyMedium: 'text-body-medium',
  bodySmall: 'text-body-small',
  caption: 'text-caption',
  fontRegular: 'font-regular',
  fontMedium: 'font-medium',
  fontSemibold: 'font-semibold',
  fontBold: 'font-bold',
} as const;