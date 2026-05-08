/**
 * Mock Data Service - Frontend-only data management
 * Simulates backend functionality using localStorage
 */

// Initialize default data if not exists
const initializeData = () => {
  if (!localStorage.getItem('portfolio_initialized')) {
    // Default projects
    const defaultProjects = [
      {
        _id: '1',
        title: 'E-Commerce Platform',
        description: 'Modern e-commerce solution with AI recommendations',
        problem: 'Traditional shopping experiences lack personalization',
        solution: 'Built AI-powered recommendation engine',
        outcome: '40% increase in conversion rates',
        technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow'],
        category: 'web',
        featured: true,
        status: 'active',
        updatedAt: new Date().toISOString()
      }
    ];

    // Default articles
    const defaultArticles = [
      {
        _id: '1',
        title: 'Getting Started with React',
        excerpt: 'Learn the fundamentals of React development',
        content: 'React is a powerful library...',
        tags: ['React', 'JavaScript', 'Web Development'],
        date: new Date().toISOString(),
        readTime: '5 min',
        featured: true,
        published: true,
        updatedAt: new Date().toISOString()
      }
    ];

    // Default contacts
    const defaultContacts: any[] = [];

    // Default team members
    const defaultTeam = [
      {
        _id: '1',
        name: 'John Doe',
        role: 'Full Stack Developer',
        bio: 'Passionate about creating amazing web experiences',
        image: '/images/team-member-1.jpeg',
        skills: ['React', 'Node.js', 'TypeScript']
      }
    ];

    // Default site content
    const defaultContent = {
      hero: {
        headline: 'design.code.deploy',
        tagline: 'Creating complete digital experiences with clean UX, reliable backend, and AI-enhanced workflows',
        aiMention: 'Leveraging AI tools to enhance human creativity and efficiency'
      },
      process: {
        steps: []
      }
    };

    // Default gallery
    const defaultGallery: any[] = [];

    localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    localStorage.setItem('portfolio_articles', JSON.stringify(defaultArticles));
    localStorage.setItem('portfolio_contacts', JSON.stringify(defaultContacts));
    localStorage.setItem('portfolio_team', JSON.stringify(defaultTeam));
    localStorage.setItem('portfolio_content', JSON.stringify(defaultContent));
    localStorage.setItem('portfolio_gallery', JSON.stringify(defaultGallery));
    localStorage.setItem('portfolio_initialized', 'true');
  }
};

// Initialize on load
initializeData();

// Helper to generate IDs
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

// Projects API
export const projectsAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
    return { data: projects };
  },

  create: async (project: any) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
    const newProject = {
      ...project,
      _id: generateId(),
      updatedAt: new Date().toISOString()
    };
    projects.push(newProject);
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    return { data: newProject };
  },

  update: async (id: string, updates: any) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
    const index = projects.findIndex((p: any) => p._id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem('portfolio_projects', JSON.stringify(projects));
      return { data: projects[index] };
    }
    throw new Error('Project not found');
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
    const filtered = projects.filter((p: any) => p._id !== id);
    localStorage.setItem('portfolio_projects', JSON.stringify(filtered));
    return { success: true };
  }
};

// Articles API
export const articlesAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const articles = JSON.parse(localStorage.getItem('portfolio_articles') || '[]');
    return { data: articles };
  },

  create: async (article: any) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const articles = JSON.parse(localStorage.getItem('portfolio_articles') || '[]');
    const newArticle = {
      ...article,
      _id: generateId(),
      date: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    articles.push(newArticle);
    localStorage.setItem('portfolio_articles', JSON.stringify(articles));
    return { data: newArticle };
  },

  update: async (id: string, updates: any) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const articles = JSON.parse(localStorage.getItem('portfolio_articles') || '[]');
    const index = articles.findIndex((a: any) => a._id === id);
    if (index !== -1) {
      articles[index] = { ...articles[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem('portfolio_articles', JSON.stringify(articles));
      return { data: articles[index] };
    }
    throw new Error('Article not found');
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const articles = JSON.parse(localStorage.getItem('portfolio_articles') || '[]');
    const filtered = articles.filter((a: any) => a._id !== id);
    localStorage.setItem('portfolio_articles', JSON.stringify(filtered));
    return { success: true };
  }
};

// Contacts API
export const contactsAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const contacts = JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
    return { data: contacts };
  },

  create: async (contact: any) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const contacts = JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
    const newContact = {
      ...contact,
      _id: generateId(),
      createdAt: new Date().toISOString()
    };
    contacts.push(newContact);
    localStorage.setItem('portfolio_contacts', JSON.stringify(contacts));
    return { data: newContact };
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const contacts = JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
    const filtered = contacts.filter((c: any) => c._id !== id);
    localStorage.setItem('portfolio_contacts', JSON.stringify(filtered));
    return { success: true };
  }
};

// Team API
export const teamAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const team = JSON.parse(localStorage.getItem('portfolio_team') || '[]');
    return { members: team };
  },

  create: async (member: any) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const team = JSON.parse(localStorage.getItem('portfolio_team') || '[]');
    const newMember = {
      ...member,
      _id: generateId()
    };
    team.push(newMember);
    localStorage.setItem('portfolio_team', JSON.stringify(team));
    return { data: newMember };
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const team = JSON.parse(localStorage.getItem('portfolio_team') || '[]');
    const filtered = team.filter((m: any) => m._id !== id);
    localStorage.setItem('portfolio_team', JSON.stringify(filtered));
    return { success: true };
  }
};

// Site Content API
export const contentAPI = {
  get: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const content = JSON.parse(localStorage.getItem('portfolio_content') || '{}');
    return { content };
  },

  update: async (updates: any) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const content = JSON.parse(localStorage.getItem('portfolio_content') || '{}');
    const updated = { ...content, ...updates };
    localStorage.setItem('portfolio_content', JSON.stringify(updated));
    return { content: updated };
  }
};

// Gallery API
export const galleryAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const gallery = JSON.parse(localStorage.getItem('portfolio_gallery') || '[]');
    return { items: gallery };
  },

  create: async (item: any) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const gallery = JSON.parse(localStorage.getItem('portfolio_gallery') || '[]');
    const newItem = {
      ...item,
      _id: generateId()
    };
    gallery.push(newItem);
    localStorage.setItem('portfolio_gallery', JSON.stringify(gallery));
    return { data: newItem };
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const gallery = JSON.parse(localStorage.getItem('portfolio_gallery') || '[]');
    const filtered = gallery.filter((i: any) => i._id !== id);
    localStorage.setItem('portfolio_gallery', JSON.stringify(filtered));
    return { success: true };
  }
};
