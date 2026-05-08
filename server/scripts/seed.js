import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Article from '../models/Article.js';
import TeamMember from '../models/TeamMember.js';
import Skill from '../models/Skill.js';
import SiteContent from '../models/SiteContent.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Article.deleteMany();
    await TeamMember.deleteMany();
    await Skill.deleteMany();
    await SiteContent.deleteMany();

    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });

    console.log('Admin user created');

    // Create sample projects
    const projects = await Project.insertMany([
      {
        title: 'E-Commerce Platform',
        description: 'Modern e-commerce solution with AI-powered recommendations',
        problem: 'Traditional shopping experiences lack personalization and often overwhelm users with too many choices',
        solution: 'Built an AI-powered recommendation engine that learns from user behavior and provides personalized product suggestions',
        outcome: '40% increase in conversion rates and 60% improvement in user engagement',
        technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow', 'Redis'],
        category: 'web',
        aiWorkflow: 'Used AI for product recommendations, image recognition, and customer support chatbot',
        featured: true,
        status: 'active',
        previewImage: '/images/projects/ecommerce.jpg'
      },
      {
        title: 'Task Management App',
        description: 'Collaborative task management with real-time updates',
        problem: 'Teams struggle with coordination and task tracking across different time zones',
        solution: 'Created a real-time collaborative platform with WebSocket integration',
        outcome: 'Improved team productivity by 35% and reduced missed deadlines by 50%',
        technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
        category: 'web',
        status: 'active',
        previewImage: '/images/projects/taskmanager.jpg'
      },
      {
        title: 'AI Content Generator',
        description: 'Generate high-quality content using advanced AI models',
        problem: 'Content creators spend hours writing and editing content',
        solution: 'Integrated GPT-4 API with custom fine-tuning for brand-specific content',
        outcome: 'Reduced content creation time by 70% while maintaining quality',
        technologies: ['Python', 'FastAPI', 'OpenAI API', 'React'],
        category: 'ai',
        aiWorkflow: 'Fine-tuned GPT-4 on brand guidelines and integrated with content management system',
        featured: true,
        status: 'active',
        previewImage: '/images/projects/ai-content.jpg'
      }
    ]);

    console.log('Sample projects created');

    // Create sample articles
    const articles = await Article.insertMany([
      {
        title: 'Getting Started with React Hooks',
        excerpt: 'Learn how to use React Hooks to manage state and side effects in functional components',
        content: `React Hooks revolutionized how we write React components. In this article, we'll explore the most commonly used hooks and best practices.

## useState Hook
The useState hook allows you to add state to functional components...

## useEffect Hook
The useEffect hook lets you perform side effects in functional components...

## Custom Hooks
Creating custom hooks allows you to extract component logic into reusable functions...`,
        tags: ['React', 'JavaScript', 'Web Development', 'Hooks'],
        readTime: '8 min',
        featured: true,
        published: true,
        author: admin._id
      },
      {
        title: 'Building Scalable APIs with Node.js',
        excerpt: 'Best practices for designing and implementing scalable RESTful APIs',
        content: `Building scalable APIs requires careful planning and implementation. Here are the key principles...

## API Design Principles
- RESTful conventions
- Proper HTTP methods
- Status codes
- Versioning

## Performance Optimization
- Caching strategies
- Database indexing
- Load balancing...`,
        tags: ['Node.js', 'API', 'Backend', 'Performance'],
        readTime: '10 min',
        published: true,
        author: admin._id
      },
      {
        title: 'AI in Modern Web Development',
        excerpt: 'How artificial intelligence is transforming the way we build web applications',
        content: `AI is no longer just a buzzword - it's becoming an integral part of modern web development...

## AI-Powered Features
- Intelligent search
- Personalization
- Chatbots
- Content generation

## Integration Strategies
Learn how to integrate AI services into your applications...`,
        tags: ['AI', 'Web Development', 'Machine Learning'],
        readTime: '12 min',
        featured: true,
        published: true,
        author: admin._id
      }
    ]);

    console.log('Sample articles created');

    // Create team members
    const teamMembers = await TeamMember.insertMany([
      {
        name: 'John Doe',
        role: 'Full Stack Developer',
        description: 'Passionate about creating amazing web experiences with modern technologies',
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
        photoUrl: '/images/team-member-1.jpeg',
        category: 'core',
        order: 1
      },
      {
        name: 'Jane Smith',
        role: 'UI/UX Designer',
        description: 'Crafting beautiful and intuitive user interfaces',
        skills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping'],
        photoUrl: '/images/team-member-2.jpeg',
        category: 'core',
        order: 2
      }
    ]);

    console.log('Team members created');

    // Create skills
    const skills = await Skill.insertMany([
      { name: 'React', level: 95, category: 'Frontend', order: 1 },
      { name: 'TypeScript', level: 90, category: 'Frontend', order: 2 },
      { name: 'Node.js', level: 90, category: 'Backend', order: 1 },
      { name: 'Express', level: 85, category: 'Backend', order: 2 },
      { name: 'MongoDB', level: 85, category: 'Database', order: 1 },
      { name: 'PostgreSQL', level: 80, category: 'Database', order: 2 },
      { name: 'Figma', level: 85, category: 'UI/UX', order: 1 },
      { name: 'Adobe XD', level: 80, category: 'UI/UX', order: 2 },
      { name: 'TensorFlow', level: 75, category: 'AI', order: 1 },
      { name: 'OpenAI API', level: 85, category: 'AI', order: 2 },
      { name: 'Git', level: 95, category: 'Tools', order: 1 },
      { name: 'Docker', level: 80, category: 'Tools', order: 2 }
    ]);

    console.log('Skills created');

    // Create site content
    await SiteContent.insertMany([
      {
        key: 'hero',
        content: {
          headline: 'design.code.deploy',
          tagline: 'Creating complete digital experiences with clean UX, reliable backend, and AI-enhanced workflows',
          aiMention: 'Leveraging AI tools to enhance human creativity and efficiency'
        }
      },
      {
        key: 'process',
        content: {
          title: 'Development Process',
          subtitle: 'How we build exceptional digital products',
          steps: [
            {
              number: '01',
              title: 'Discovery',
              description: 'Understanding your needs and defining project scope'
            },
            {
              number: '02',
              title: 'Design',
              description: 'Creating intuitive and beautiful user interfaces'
            },
            {
              number: '03',
              title: 'Development',
              description: 'Building robust and scalable solutions'
            },
            {
              number: '04',
              title: 'Deployment',
              description: 'Launching and maintaining your product'
            }
          ]
        }
      },
      {
        key: 'about',
        content: {
          title: 'Full Stack Developer',
          bio: 'Passionate about creating exceptional digital experiences',
          experience: '5+ years',
          education: 'Computer Science Degree',
          social: {
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com'
          }
        }
      }
    ]);

    console.log('Site content created');

    console.log('\n✅ Database seeded successfully!');
    console.log(`\nAdmin Credentials:`);
    console.log(`Email: ${process.env.ADMIN_EMAIL || 'admin@portfolio.com'}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
