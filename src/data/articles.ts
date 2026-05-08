export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: "ai-workflow-integration",
    title: "How AI Tools Actually Improve My Development Workflow",
    excerpt: "Real talk about using AI in development - what works, what doesn't, and how to avoid the hype trap.",
    content: `AI tools are everywhere now, but most developers either worship them or dismiss them entirely. The truth is somewhere in the middle.

Here's what actually works in my workflow:

**Code Generation (The Good Parts)**
AI excels at boilerplate. Need a React component structure? API endpoint template? Form validation? AI can scaffold it in seconds. But here's the key: I always review and refactor. The AI gives me a starting point, not a finished product.

**Problem Solving**
When I'm stuck on a bug, explaining it to an AI often helps me think through the problem differently. It's like rubber duck debugging, but the duck talks back with suggestions.

**Documentation**
AI is surprisingly good at writing clear documentation from code. It catches edge cases I might miss and explains complex logic in plain English.

**What Doesn't Work**
- Complex architecture decisions (AI doesn't understand your specific constraints)
- Performance optimization (requires deep understanding of your system)
- Security-critical code (never trust AI blindly here)

The bottom line: AI is a tool, not a replacement. Use it to handle the tedious stuff so you can focus on the interesting problems.`,
    date: "2024-02-01",
    readTime: "5 min read",
    tags: ["AI", "Workflow", "Development"],
    featured: true
  },
  {
    id: "liquid-glass-ui",
    title: "Building a Liquid Glass UI Design System",
    excerpt: "The design decisions and CSS techniques behind creating a modern glassmorphism design system.",
    content: `Glassmorphism is trendy, but building a cohesive design system around it requires careful thought.

**The Core Principles**
1. Backdrop blur for depth
2. Subtle transparency for layering
3. Consistent shadow hierarchy
4. Careful color contrast for accessibility

**Technical Implementation**
The key is backdrop-filter: blur() combined with rgba backgrounds. But here's what most tutorials don't tell you: performance matters.

Blur is expensive. Too many blurred elements = janky scrolling. My solution:
- Limit blur to key UI elements
- Use will-change: transform for animated elements
- Test on lower-end devices

**Accessibility Challenges**
Transparent elements can murder contrast ratios. I solve this by:
- Always testing with WCAG contrast checkers
- Using darker/lighter overlays when needed
- Providing high-contrast mode option

The result: a design system that looks modern but performs well and stays accessible.`,
    date: "2024-01-15",
    readTime: "7 min read",
    tags: ["Design", "CSS", "UI/UX"]
  },
  {
    id: "typescript-strict-mode",
    title: "Why I Always Enable TypeScript Strict Mode",
    excerpt: "Strict mode is annoying until it saves you from a production bug at 2 AM.",
    content: `TypeScript's strict mode feels like overkill when you're starting a project. All those red squiggles, all those type assertions...

Then you ship to production and realize strict mode would have caught that null reference error that's now crashing for users.

**What Strict Mode Actually Does**
- noImplicitAny: Forces you to type everything
- strictNullChecks: Makes you handle null/undefined explicitly
- strictFunctionTypes: Catches function parameter issues
- noImplicitThis: Prevents 'this' confusion

**The Real Benefits**
1. Catches bugs at compile time, not runtime
2. Makes refactoring safer
3. Improves code documentation
4. Forces you to think about edge cases

**The Tradeoff**
Yes, it slows you down initially. You'll spend more time satisfying the type checker. But that time is nothing compared to debugging production issues.

My rule: If it's going to production, it's in strict mode. No exceptions.`,
    date: "2024-01-05",
    readTime: "4 min read",
    tags: ["TypeScript", "Best Practices", "Development"]
  },
  {
    id: "responsive-design-2024",
    title: "Responsive Design in 2024: Beyond Breakpoints",
    excerpt: "Modern responsive design is about more than just media queries. Here's what actually matters.",
    content: `Everyone knows about mobile-first design and breakpoints. But responsive design in 2024 goes deeper.

**Container Queries Are Here**
Forget viewport-based breakpoints. Container queries let components respond to their container size, not the screen size. Game changer for reusable components.

**Fluid Typography**
clamp() is your friend. No more managing font sizes across breakpoints:
font-size: clamp(1rem, 2vw + 0.5rem, 2rem);

**Responsive Images Done Right**
- Use srcset for different resolutions
- Use picture element for art direction
- Lazy load everything below the fold
- Optimize with modern formats (WebP, AVIF)

**The Forgotten Aspect: Touch Targets**
Mobile isn't just about smaller screens. It's about fingers, not mouse cursors. Minimum 44x44px touch targets. Always.

**Testing Reality**
Don't just resize your browser. Test on real devices. That iPhone 13 Pro Max in your hand behaves differently than Chrome DevTools.`,
    date: "2023-12-20",
    readTime: "6 min read",
    tags: ["CSS", "Responsive Design", "Web Development"]
  }
];
