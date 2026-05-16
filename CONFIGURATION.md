# Portfolio Website Configuration

This document outlines the TypeScript and ESLint configuration for the portfolio website project.

## TypeScript Configuration

### Main Configuration (`tsconfig.app.json`)

The TypeScript configuration includes:

- **Strict Mode**: Enabled with additional strict checks for better type safety
- **Path Aliases**: Configured for clean imports using `@/` prefix
- **React JSX**: Configured for React 18+ with automatic JSX runtime
- **Modern Target**: ES2022 for modern JavaScript features

#### Path Aliases

```typescript
"@/*": ["src/*"]
"@/components/*": ["src/components/*"]
"@/pages/*": ["src/pages/*"]
"@/types/*": ["src/types/*"]
"@/utils/*": ["src/utils/*"]
"@/data/*": ["src/data/*"]
"@/hooks/*": ["src/hooks/*"]
```

#### Additional Strict Checks

- `exactOptionalPropertyTypes`: Ensures optional properties are handled correctly
- `noImplicitReturns`: Requires explicit return statements
- `noPropertyAccessFromIndexSignature`: Prevents unsafe property access
- `noUncheckedIndexedAccess`: Adds undefined to index signature results

## ESLint Configuration

### Rules Overview

The ESLint configuration includes:

- **TypeScript ESLint**: Recommended rules for TypeScript
- **React Hooks**: Rules for proper hook usage
- **React Refresh**: Rules for Vite's React refresh
- **Code Quality**: Additional rules for consistent code style

#### Key Rules

- **No unused variables**: With ignore patterns for underscore-prefixed variables
- **Prefer const**: Enforces immutability where possible
- **No console/debugger**: Warns about console statements, errors on debugger
- **Curly braces**: Requires braces for all control statements
- **Strict equality**: Requires `===` instead of `==`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── types/         # TypeScript type definitions
├── utils/         # Utility functions and constants
├── data/          # Static data files
└── hooks/         # Custom React hooks
```

## Type Definitions

### Core Types (`src/types/index.ts`)

- **Project**: Portfolio project data structure
- **Skill**: Technical skills categorization
- **Component Props**: Props for design system components
- **Design Tokens**: Type-safe design system tokens

### Design System Types

- **LiquidGlassCardProps**: Props for glass morphism cards
- **PixelPerfectButtonProps**: Props for consistent buttons
- **AnimatedTextProps**: Props for text animations
- **ResponsiveGridProps**: Props for responsive layouts

## Utility Functions

### Core Utilities (`src/utils/index.ts`)

- **cn()**: Class name utility using clsx
- **debounce/throttle**: Performance optimization functions
- **Responsive helpers**: Device detection functions
- **Validation**: Email and form validation
- **DOM utilities**: Scroll and viewport detection

### Constants (`src/utils/constants.ts`)

- **Design tokens**: Colors, typography, spacing
- **Breakpoints**: Responsive design breakpoints
- **Animations**: Duration and easing configurations
- **Routes**: Application route constants

## Custom Hooks

### useResponsive

Provides responsive design utilities:
- Current breakpoint detection
- Device type booleans
- Screen dimensions

### useIntersectionObserver

Provides intersection observer functionality:
- Element visibility detection
- Animation triggering
- Performance optimization

## Development Commands

```bash
# Type checking
npm run build          # Full build with type checking
npx tsc --noEmit      # Type check only

# Linting
npm run lint          # Run ESLint
npm run lint --fix    # Auto-fix ESLint issues

# Development
npm run dev           # Start development server
```

## Configuration Benefits

1. **Type Safety**: Strict TypeScript configuration catches errors early
2. **Code Quality**: ESLint rules ensure consistent, maintainable code
3. **Developer Experience**: Path aliases and utilities improve productivity
4. **Performance**: Optimized build configuration for production
5. **Maintainability**: Clear project structure and type definitions

## Next Steps

With TypeScript and ESLint configured, the project is ready for:

1. Design system component implementation
2. Page component development
3. Static data layer setup
4. Animation and interaction implementation
5. Responsive design implementation

The configuration provides a solid foundation for building a professional, type-safe React application with excellent developer experience and code quality.