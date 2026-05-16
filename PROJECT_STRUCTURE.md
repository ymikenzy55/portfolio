# Portfolio Website - Project Structure

This document outlines the organized folder structure created for the dual-audience portfolio website.

## 📁 Project Structure

```
portfolio-website/
├── public/
│   ├── images/
│   │   └── projects/          # Project preview images
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ui/                # Design System Components
│   │   │   ├── LiquidGlassCard.tsx
│   │   │   ├── LiquidGlassCard.css
│   │   │   ├── PixelPerfectButton.tsx
│   │   │   ├── PixelPerfectButton.css
│   │   │   ├── AnimatedText.tsx
│   │   │   ├── AnimatedText.css
│   │   │   ├── ParallaxCard.tsx
│   │   │   ├── ParallaxCard.css
│   │   │   ├── ResponsiveGrid.tsx
│   │   │   ├── ResponsiveGrid.css
│   │   │   └── index.ts
│   │   ├── layout/            # Layout Components
│   │   │   ├── Navigation.tsx
│   │   │   ├── Navigation.css
│   │   │   ├── MainLayout.tsx
│   │   │   ├── MainLayout.css
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── pages/                 # Page Components
│   │   ├── HomePage.tsx
│   │   ├── HomePage.css
│   │   ├── ClientSection.tsx
│   │   ├── ClientSection.css
│   │   ├── RecruiterSection.tsx
│   │   ├── RecruiterSection.css
│   │   ├── ContactPage.tsx
│   │   ├── ContactPage.css
│   │   ├── ProcessPage.tsx
│   │   ├── ProcessPage.css
│   │   └── index.ts
│   ├── data/                  # Static JSON Files
│   │   ├── projects.json
│   │   ├── skills.json
│   │   ├── content.json
│   │   ├── workflow.json
│   │   └── index.ts
│   ├── hooks/                 # Custom React Hooks
│   │   ├── useIntersectionObserver.ts
│   │   ├── useResponsive.ts
│   │   └── index.ts
│   ├── types/                 # TypeScript Type Definitions
│   │   └── index.ts
│   ├── utils/                 # Utility Functions
│   │   ├── constants.ts
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Design System Components (`src/components/ui/`)

### LiquidGlassCard
- Base component for all card-style elements
- Applies backdrop-filter blur and transparency effects
- Configurable blur, opacity, shadow, and hover effects

### PixelPerfectButton
- Consistent button component with three variants (primary, secondary, ghost)
- Three sizes (small: 32px, medium: 40px, large: 48px)
- Hover and press state animations

### AnimatedText
- Text animation component with multiple animation types
- Supports clip-path-reveal, fade-in, and slide-up animations
- Configurable delay for staggered animations

### ParallaxCard
- 3D hover effects based on cursor position
- Optional cursor-linked sheen effect
- Configurable parallax intensity

### ResponsiveGrid
- CSS Grid component with responsive breakpoints
- Mobile (<768px), Tablet (768px-1024px), Desktop (>1024px)
- Configurable columns and gap spacing

## 🏗️ Layout Components (`src/components/layout/`)

### Navigation
- Fixed navigation with liquid glass styling
- Responsive hamburger menu for mobile
- Active route highlighting

### MainLayout
- Main wrapper component with consistent spacing
- Includes navigation and provides structure for all pages

## 📄 Page Components (`src/pages/`)

### HomePage
- Hero section with dual CTA buttons
- Routes to client and recruiter focused content
- Animated text reveals

### ClientSection
- Project showcase with grid layout
- Detailed project modal with problem/solution/outcome
- Liquid glass project cards with parallax effects

### RecruiterSection
- Skills organized by category
- Tech stack highlight section
- Resume download functionality
- Development approach explanation

### ContactPage
- Contact form with validation (Phase 1: validation only)
- Social links and contact methods
- Response time information

### ProcessPage
- AI workflow diagram visualization
- Philosophy and benefits of AI integration
- Tools and technologies overview

## 📊 Data Layer (`src/data/`)

### projects.json
- Sample project data with all required fields
- Includes problem, solution, outcome, technologies
- AI workflow integration examples

### skills.json
- Skills organized by categories (UI/UX, Frontend, Backend, AI, Tools)
- Tech stack array for prominent display

### content.json
- Hero content, social links, about information
- Contact information and availability status

### workflow.json
- Development process steps with AI integration flags
- Philosophy, benefits, and tools information

## 🎯 Key Features Implemented

### Dual-Audience Architecture
- Separate content paths for clients vs recruiters
- Targeted experiences based on visitor type

### Liquid Glass UI Design System
- Consistent blur, transparency, and shadow effects
- Pixel-perfect components with proper sizing
- Professional animations and hover states

### Responsive Design
- Mobile-first approach with breakpoints at 768px and 1024px
- Adaptive layouts and navigation patterns

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Focus indicators and ARIA labels
- Color contrast compliance

### Performance Considerations
- Component-based architecture for code splitting
- CSS Modules for scoped styling
- Optimized animations with CSS transforms

## 🚀 Next Steps (Phase 2)

1. **Backend Integration**
   - Replace static JSON with API calls
   - Implement contact form submission
   - Add admin dashboard for content management

2. **Enhanced Features**
   - Image optimization and lazy loading
   - Advanced animations with Framer Motion
   - SEO optimization and meta tags

3. **Testing & Deployment**
   - Unit tests for components
   - E2E testing for user flows
   - Production deployment setup

## 📝 Development Guidelines

- Follow the established folder structure
- Use TypeScript for type safety
- Maintain consistent naming conventions
- Keep components focused and reusable
- Document complex logic and interfaces
- Test responsive behavior across devices

This structure provides a solid foundation for the portfolio website while maintaining scalability and maintainability for future enhancements.