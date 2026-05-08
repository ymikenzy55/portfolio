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
  featured?: boolean;
  category: 'web' | 'mobile' | 'data' | 'ai' | 'fullstack';
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack shopping experience with real-time inventory management and seamless checkout flow',
    problem: 'Client needed a scalable e-commerce solution that could handle high traffic during sales events while maintaining fast load times',
    solution: 'Built with React for dynamic UI, Node.js backend with Redis caching, MongoDB for flexible product data, and Stripe for secure payments',
    outcome: '40% increase in conversion rate, 60% faster page loads, and 99.9% uptime during Black Friday sales',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'Stripe', 'AWS'],
    aiWorkflow: 'Used AI to generate product descriptions, optimize SEO metadata, and create personalized product recommendations',
    previewImage: '/images/projects/ecommerce.jpg',
    liveLink: 'https://example.com',
    repoLink: 'https://github.com/example',
    featured: true,
    category: 'fullstack'
  },
  {
    id: '2',
    title: 'Analytics Dashboard',
    description: 'Data visualization platform for business insights with real-time metrics and custom reporting',
    problem: 'Complex business data needed clear visualization and the ability to drill down into specific metrics',
    solution: 'Interactive charts with D3.js, real-time WebSocket updates, Python backend for data processing, and PostgreSQL for analytics',
    outcome: 'Reduced decision-making time by 60%, enabled data-driven strategies, and improved team collaboration',
    technologies: ['React', 'D3.js', 'Python', 'PostgreSQL', 'WebSocket', 'Docker'],
    aiWorkflow: 'AI-powered anomaly detection alerts stakeholders to unusual patterns in real-time',
    previewImage: '/images/projects/analytics.jpg',
    liveLink: 'https://example.com',
    category: 'data'
  },
  {
    id: '3',
    title: 'Social Media App',
    description: 'Community platform with real-time messaging, media sharing, and engagement features',
    problem: 'Users needed instant communication with rich media support and seamless mobile experience',
    solution: 'WebSocket-based chat, image/video upload with compression, Redis for session management, and responsive PWA design',
    outcome: '10k+ active users in first month, 85% daily active user rate, and 4.8-star app store rating',
    technologies: ['React', 'Socket.io', 'Express', 'Redis', 'AWS S3', 'PWA'],
    previewImage: '/images/projects/social.jpg',
    repoLink: 'https://github.com/example',
    category: 'fullstack'
  },
  {
    id: '4',
    title: 'Portfolio CMS',
    description: 'Content management system for creative professionals with drag-and-drop interface',
    problem: 'Artists and designers needed an easy way to update portfolios without technical knowledge',
    solution: 'Drag-and-drop builder, customizable templates, image optimization, and one-click publishing',
    outcome: '95% user satisfaction score, 500+ portfolios created, and 70% reduction in update time',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'Cloudinary'],
    previewImage: '/images/projects/cms.jpg',
    liveLink: 'https://example.com',
    category: 'web'
  },
  {
    id: '5',
    title: 'AI Content Generator',
    description: 'AI-powered tool for generating marketing copy, blog posts, and social media content',
    problem: 'Marketing teams spent hours creating content variations for different platforms',
    solution: 'OpenAI API integration, custom prompt engineering, content templates, and brand voice training',
    outcome: '80% time savings on content creation, consistent brand voice, and 3x content output',
    technologies: ['React', 'Python', 'OpenAI API', 'FastAPI', 'PostgreSQL'],
    aiWorkflow: 'Core product leveraging GPT-4 for content generation with custom fine-tuning',
    previewImage: '/images/projects/ai-content.jpg',
    liveLink: 'https://example.com',
    category: 'ai'
  },
  {
    id: '6',
    title: 'Fitness Tracking App',
    description: 'Mobile-first fitness tracker with workout plans, progress tracking, and social features',
    problem: 'Users wanted a simple way to track workouts and stay motivated with community support',
    solution: 'React Native app, offline-first architecture, workout library, progress charts, and social challenges',
    outcome: '50k+ downloads, 4.7-star rating, and 65% monthly retention rate',
    technologies: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
    previewImage: '/images/projects/fitness.jpg',
    liveLink: 'https://example.com',
    category: 'mobile'
  }
];

export const getProjectsByCategory = (category: Project['category']) => {
  return projects.filter(p => p.category === category);
};

export const getFeaturedProjects = () => {
  return projects.filter(p => p.featured);
};
