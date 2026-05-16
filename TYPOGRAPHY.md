# Typography System - Urbanist Font Configuration

## Overview

The portfolio uses the **Urbanist** font family from Google Fonts, optimized for performance and configured with a comprehensive typography system that follows the design requirements.

## Font Configuration

### Font Weights Available
- **Regular (400)**: For body text and general content
- **Medium (500)**: For emphasized body text and UI elements
- **SemiBold (600)**: For subheadings and important text
- **Bold (700)**: For main headlines and high-impact text

### Design System Rules
- **Headlines**: Use Bold (700) or SemiBold (600) weights for impact
- **Body Text**: Use Regular (400) or Medium (500) weights for readability
- **Fallbacks**: Includes system fonts for reliability

## Performance Optimizations

### Font Loading Strategy
1. **Preconnect**: Establishes early connection to Google Fonts
2. **Preload**: Critical font weights are preloaded for faster rendering
3. **Display Swap**: Uses `font-display: swap` for better perceived performance
4. **Fallback Fonts**: Comprehensive fallback stack ensures text is always readable

### HTML Configuration
```html
<!-- Preconnect for faster font loading -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload critical font weights -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,400;0,500;0,600;0,700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

## Usage

### CSS Classes
Use predefined CSS classes for consistent typography:

```css
/* Headlines - Bold/SemiBold weights */
.text-headline-1  /* 60px, Bold, Tight line-height */
.text-headline-2  /* 48px, Bold, Tight line-height */
.text-headline-3  /* 36px, SemiBold, Tight line-height */
.text-headline-4  /* 30px, SemiBold, Normal line-height */
.text-headline-5  /* 24px, SemiBold, Normal line-height */
.text-headline-6  /* 20px, SemiBold, Normal line-height */

/* Body Text - Regular/Medium weights */
.text-body-large  /* 18px, Regular, Relaxed line-height */
.text-body        /* 16px, Regular, Normal line-height */
.text-body-medium /* 16px, Medium, Normal line-height */
.text-body-small  /* 14px, Regular, Normal line-height */
.text-caption     /* 12px, Medium, Uppercase, Letter-spacing */

/* Font Weight Utilities */
.font-regular     /* 400 */
.font-medium      /* 500 */
.font-semibold    /* 600 */
.font-bold        /* 700 */
```

### TypeScript/React Usage
Import typography utilities for programmatic use:

```typescript
import { getTypographyStyles, typographyClasses, fontWeights } from '@/utils/typography';

// Use CSS-in-JS styles
const headlineStyles = getTypographyStyles('headline1');

// Use CSS classes
<h1 className={typographyClasses.headline1}>Main Headline</h1>

// Use individual font weights
const customStyles = {
  fontWeight: fontWeights.semibold,
  fontSize: '24px',
};
```

### CSS Variables
All typography values are available as CSS custom properties:

```css
/* Font Family */
--font-family: 'Urbanist', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;

/* Font Weights */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Font Sizes */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
--font-size-6xl: 3.75rem;   /* 60px */

/* Line Heights */
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

## Examples

### Hero Section
```jsx
<div className="hero">
  <h1 className="text-headline-1">Full-Stack Developer</h1>
  <p className="text-body-large">Creating exceptional digital experiences with AI-enhanced workflows</p>
</div>
```

### Project Card
```jsx
<div className="project-card">
  <h3 className="text-headline-4">Project Title</h3>
  <p className="text-body">Project description with regular weight for readability.</p>
  <span className="text-caption">React • Node.js • MongoDB</span>
</div>
```

### Navigation
```jsx
<nav>
  <a href="/" className="text-body-medium">Home</a>
  <a href="/projects" className="text-body-medium">Projects</a>
  <a href="/contact" className="text-body-medium">Contact</a>
</nav>
```

## Accessibility

- **Contrast**: All text meets WCAG AA contrast requirements
- **Fallbacks**: System fonts ensure text is readable even if Urbanist fails to load
- **Performance**: Optimized loading prevents layout shifts and improves user experience
- **Semantic HTML**: Typography classes complement proper HTML structure

## Browser Support

- **Modern Browsers**: Full support for Urbanist font
- **Fallback Support**: System fonts provide consistent experience across all browsers
- **Performance**: Font loading optimizations work in all modern browsers