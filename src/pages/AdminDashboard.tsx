import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LiquidGlassCard, PixelPerfectButton, Toast } from '../components/ui';
import { ImageUpload } from '../components/ImageUpload';
import './AdminDashboard.css';

const API_URL = import.meta.env['VITE_API_URL'] || 'http://localhost:5001/api';

interface DashboardStats {
  totalProjects: number;
  totalArticles: number;
  totalViews: number;
  totalContacts: number;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  client?: string;
  industry?: string;
  problem: string;
  solution: string;
  outcome: string;
  results?: string;
  technologies: string[];
  category: string;
  projectType?: string;
  audience?: string;
  completedDate?: string;
  aiWorkflow?: string;
  previewImage?: string;
  liveLink?: string;
  repoLink?: string;
  featured: boolean;
  status: string;
  updatedAt: string;
}

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  content?: string;
  tags: string[];
  date: string;
  readTime: string;
  featured?: boolean;
  published: boolean;
  updatedAt: string;
}

/**
 * Admin Dashboard with extraordinary design
 * Features: Glassmorphic cards, animated stats, hover effects
 */
export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'articles' | 'skills' | 'contacts' | 'analytics' | 'settings' | 'hero' | 'team' | 'gallery' | 'process' | 'admins'>('overview');
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState<'all' | 'featured' | 'active'>('all');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [showProjectMenu, setShowProjectMenu] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };
  
  // Modal states
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  
  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    client: '',
    industry: '',
    problem: '',
    solution: '',
    outcome: '',
    results: '',
    technologies: '',
    category: 'web',
    projectType: 'web',
    audience: 'all',
    completedDate: new Date().toISOString().split('T')[0],
    aiWorkflow: '',
    featured: false,
    status: 'active',
    liveUrl: '',
    githubUrl: '',
    imageUrl: ''
  });
  
  const [articleForm, setArticleForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    published: false
  });

  // About form state
  const [aboutForm, setAboutForm] = useState({
    bio: '',
    title: '',
    experience: '',
    education: '',
    skills: [] as string[],
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      website: ''
    }
  });
  const [aboutLoading, setAboutLoading] = useState(false);

  // Skills state
  const [skills, setSkills] = useState<Array<{ _id?: string; name: string; level: number; category: string }>>([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<{ _id?: string; name: string; level: number; category: string } | null>(null);
  const [skillForm, setSkillForm] = useState({
    name: '',
    level: 50,
    category: 'Frontend',
    audience: 'all'
  });

  // Contacts state
  const [contacts, setContacts] = useState<Array<{
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
    reply?: {
      message: string;
      sentAt: string;
    };
  }>>([]);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyingToContact, setReplyingToContact] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  // Admins state
  const [admins, setAdmins] = useState<Array<{
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  }>>([]);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '', color: '' });

  // Hero content state
  const [heroForm, setHeroForm] = useState({
    headline: 'design.code.deploy',
    tagline: 'Creating complete digital experiences with clean UX, reliable backend, and AI-enhanced workflows',
    aiMention: 'Leveraging AI tools to enhance human creativity and efficiency'
  });

  // Team members state
  const [teamMembers, setTeamMembers] = useState<Array<{
    _id?: string;
    name: string;
    role: string;
    description: string;
    skills: string[];
    photoUrl: string;
    category: string;
  }>>([]);

  // Gallery state
  const [galleryItems, setGalleryItems] = useState<Array<{
    _id?: string;
    imageUrl: string;
    caption: string;
  }>>([]);

  // Process state
  const [processForm, setProcessForm] = useState({
    title: 'Our Process',
    subtitle: 'From concept to deployment, powered by AI and human expertise',
    steps: [
      { step: 1, title: "Discovery", description: "Understanding your needs" },
      { step: 2, title: "Design", description: "Creating the blueprint" },
      { step: 3, title: "Development", description: "Building the solution" },
      { step: 4, title: "Deployment", description: "Launching your project" }
    ]
  });

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/contacts`, {
        credentials: 'include',
        headers
      });
      const data = await response.json();
      setContacts(data.data || data.contacts || []);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      await fetch(`${API_URL}/contacts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers
      });
      fetchContacts();
      showToast('Contact deleted successfully');
    } catch (error) {
      console.error('Failed to delete contact:', error);
      showToast('Failed to delete contact', 'error');
    }
  };

  const handleReplyToContact = async () => {
    if (!replyingToContact || !replyMessage.trim()) {
      showToast('Please enter a reply message', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/contacts/${replyingToContact}/reply`, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify({ replyMessage })
      });

      if (response.ok) {
        showToast('Reply sent successfully!', 'success');
        setShowReplyModal(false);
        setReplyingToContact(null);
        setReplyMessage('');
        fetchContacts();
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to send reply', 'error');
      }
    } catch (error) {
      console.error('Failed to send reply:', error);
      showToast('Failed to send reply', 'error');
    }
  };

  const openReplyModal = (contactId: string) => {
    setReplyingToContact(contactId);
    setShowReplyModal(true);
    setReplyMessage('');
  };

  // Admin management functions
  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (!password) return { score: 0, text: '', color: '' };

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Character variety checks
    if (/[a-z]/.test(password)) score += 1; // lowercase
    if (/[A-Z]/.test(password)) score += 1; // uppercase
    if (/[0-9]/.test(password)) score += 1; // numbers
    if (/[^a-zA-Z0-9]/.test(password)) score += 1; // special chars

    // Determine strength
    if (score <= 2) return { score, text: 'Weak', color: '#ef4444' };
    if (score <= 4) return { score, text: 'Medium', color: '#f59e0b' };
    return { score, text: 'Strong', color: '#10b981' };
  };

  const validatePassword = (password: string): { valid: boolean; message: string } => {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters' };
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain lowercase letters' };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain uppercase letters' };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain numbers' };
    }
    return { valid: true, message: '' };
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/auth/admins`, {
        credentials: 'include',
        headers
      });
      const data = await response.json();
      setAdmins(data.data || data.admins || []);
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    }
  };

  const handleCreateAdmin = async () => {
    // Validate name
    if (!adminForm.name.trim()) {
      showToast('Please enter admin name', 'error');
      return;
    }

    // Validate email
    if (!adminForm.email.trim()) {
      showToast('Please enter email address', 'error');
      return;
    }

    if (!validateEmail(adminForm.email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(adminForm.password);
    if (!passwordValidation.valid) {
      showToast(passwordValidation.message, 'error');
      return;
    }

    // Check password strength
    const strength = calculatePasswordStrength(adminForm.password);
    if (strength.score < 3) {
      showToast('Password is too weak. Please use a stronger password.', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/auth/create-admin`, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify(adminForm)
      });

      const data = await response.json();

      if (response.ok) {
        showToast('Admin created successfully!', 'success');
        setShowAdminModal(false);
        setAdminForm({ name: '', email: '', password: '' });
        setPasswordStrength({ score: 0, text: '', color: '' });
        setShowAdminPassword(false);
        fetchAdmins();
      } else {
        showToast(data.message || 'Failed to create admin', 'error');
      }
    } catch (error) {
      console.error('Failed to create admin:', error);
      showToast('Failed to create admin', 'error');
    }
  };

  // Hero content management (API)
  useEffect(() => {
    console.log('useEffect triggered, activeTab:', activeTab);
    if (activeTab === 'hero') {
      console.log('Hero tab activated, fetching content...');
      fetchSiteContent();
    }
  }, [activeTab]);

  const fetchSiteContent = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/site-content`, {
        credentials: 'include',
        headers
      });
      const data = await response.json();
      
      console.log('Fetched site content:', data);
      
      if (data.content && data.content.hero) {
        console.log('Setting hero form to:', data.content.hero);
        setHeroForm({
          headline: data.content.hero.headline || 'design.code.deploy',
          tagline: data.content.hero.tagline || 'Creating complete digital experiences with clean UX, reliable backend, and AI-enhanced workflows',
          aiMention: data.content.hero.aiMention || 'Leveraging AI tools to enhance human creativity and efficiency'
        });
      }
      
      if (data.content && data.content.process) {
        setProcessForm(data.content.process);
      }
    } catch (error) {
      console.error('Failed to fetch site content:', error);
    }
  };

  const handleSaveHero = async () => {
    try {
      console.log('Saving hero content:', heroForm);
      
      // Get token from localStorage as fallback
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/site-content`, {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify({ hero: heroForm })
      });
      
      const data = await response.json();
      console.log('Save response:', data);
      
      if (response.ok) {
        showToast('Hero content saved successfully!', 'success');
        fetchSiteContent(); // Refresh the data
      } else {
        console.error('Save failed:', data);
        showToast(data.message || 'Failed to save hero content', 'error');
      }
    } catch (error) {
      console.error('Failed to save hero:', error);
      showToast('Failed to save hero content. Check console for details.', 'error');
    }
  };

  // Team management (API)
  useEffect(() => {
    if (activeTab === 'team') {
      fetchTeamMembers();
    }
  }, [activeTab]);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(`${API_URL}/team`);
      const data = await response.json();
      setTeamMembers(data.members || []);
    } catch (error) {
      console.error('Failed to fetch team:', error);
    }
  };

  const handleAddTeamMember = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/team`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          name: 'New Team Member',
          role: 'Role Title',
          description: '',
          skills: [],
          photoUrl: '',
          category: 'core'
        })
      });
      
      if (response.ok) {
        showToast('Team member added! Fill in the details.', 'success');
        fetchTeamMembers();
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to add team member', 'error');
      }
    } catch (error) {
      console.error('Failed to add team member:', error);
      showToast('Failed to add team member', 'error');
    }
  };

  const handleUpdateTeamMember = async (id: string, updates: any) => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      await fetch(`${API_URL}/team/${id}`, {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify(updates)
      });
    } catch (error) {
      console.error('Failed to update team member:', error);
      showToast('Failed to update team member', 'error');
    }
  };

  const handleDeleteTeamMember = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      await fetch(`${API_URL}/team/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include'
      });
      showToast('Team member deleted', 'success');
      fetchTeamMembers();
    } catch (error) {
      console.error('Failed to delete team member:', error);
      showToast('Failed to delete team member', 'error');
    }
  };

  // Gallery management (API)
  useEffect(() => {
    if (activeTab === 'gallery') {
      fetchGallery();
    }
  }, [activeTab]);

  const fetchGallery = async () => {
    try {
      const response = await fetch(`${API_URL}/gallery`);
      const data = await response.json();
      setGalleryItems(data.items || []);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    }
  };

  const handleAddGalleryItem = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/gallery`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ 
          imageUrl: '/placeholder.jpg',
          caption: 'New gallery item' 
        })
      });
      
      if (response.ok) {
        showToast('Gallery item added! Upload an image.', 'success');
        fetchGallery();
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to add gallery item', 'error');
      }
    } catch (error) {
      console.error('Failed to add gallery item:', error);
      showToast('Failed to add gallery item', 'error');
    }
  };

  const handleUpdateGalleryItem = async (id: string, updates: any) => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/gallery/${id}`, {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify(updates)
      });
      
      if (response.ok) {
        showToast('Gallery item updated!', 'success');
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to update gallery item', 'error');
      }
    } catch (error) {
      console.error('Failed to update gallery item:', error);
      showToast('Failed to update gallery item', 'error');
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/gallery/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include'
      });
      
      if (response.ok) {
        showToast('Gallery item deleted!', 'success');
        fetchGallery();
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to delete gallery item', 'error');
      }
    } catch (error) {
      console.error('Failed to delete gallery item:', error);
      showToast('Failed to delete gallery item', 'error');
    }
  };

  // Process management (API)
  useEffect(() => {
    if (activeTab === 'process') {
      fetchSiteContent();
    }
  }, [activeTab]);

  const handleSaveProcess = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/site-content`, {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify({ process: processForm })
      });
      
      if (response.ok) {
        showToast('Process content saved successfully!', 'success');
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to save process content', 'error');
      }
    } catch (error) {
      console.error('Failed to save process:', error);
      showToast('Failed to save process content', 'error');
    }
  };
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalArticles: 0,
    totalViews: 0,
    totalContacts: 0,
  });
  const [animatedStats, setAnimatedStats] = useState({
    totalProjects: 0,
    totalArticles: 0,
    totalViews: 0,
    totalContacts: 0,
  });

  // Fetch data from API
  useEffect(() => {
    fetchDashboardData();
    
    // Set up polling to refetch data every 30 seconds
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000); // 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Fetch projects
      const projectsRes = await fetch(`${API_URL}/projects`, {
        credentials: 'include',
        headers
      });
      const projectsData = await projectsRes.json();
      setProjects(projectsData.data || projectsData.projects || []);

      // Fetch articles - need to use /all to get unpublished articles too
      const articlesRes = await fetch(`${API_URL}/articles/all`, {
        credentials: 'include',
        headers
      });
      const articlesData = await articlesRes.json();
      setArticles(articlesData.data || articlesData.articles || []);

      // Fetch contacts
      const contactsRes = await fetch(`${API_URL}/contacts`, {
        credentials: 'include',
        headers
      });
      const contactsData = await contactsRes.json();
      const contactsList = contactsData.data || contactsData.contacts || [];

      // Update stats with real data
      setStats({
        totalProjects: (projectsData.data || projectsData.projects || []).length,
        totalArticles: (articlesData.data || articlesData.articles || []).length,
        totalViews: 1247, // This would need analytics integration
        totalContacts: contactsList.length,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Project CRUD operations
  const handleCreateProject = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          title: projectForm.title,
          description: projectForm.description,
          problem: projectForm.problem,
          solution: projectForm.solution,
          outcome: projectForm.outcome,
          technologies: projectForm.technologies.split(',').map(t => t.trim()),
          category: projectForm.category,
          aiWorkflow: projectForm.aiWorkflow,
          featured: projectForm.featured,
          previewImage: projectForm.imageUrl,
          liveLink: projectForm.liveUrl,
          repoLink: projectForm.githubUrl
        })
      });
      
      if (response.ok) {
        showToast('Project created successfully!', 'success');
        setShowProjectModal(false);
        resetProjectForm();
        fetchDashboardData();
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to create project', 'error');
      }
    } catch (error) {
      console.error('Failed to create project:', error);
      showToast('Failed to create project', 'error');
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject) return;
    
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/projects/${editingProject._id}`, {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          title: projectForm.title,
          description: projectForm.description,
          problem: projectForm.problem,
          solution: projectForm.solution,
          outcome: projectForm.outcome,
          technologies: projectForm.technologies.split(',').map(t => t.trim()),
          category: projectForm.category,
          aiWorkflow: projectForm.aiWorkflow,
          featured: projectForm.featured,
          previewImage: projectForm.imageUrl,
          liveLink: projectForm.liveUrl,
          repoLink: projectForm.githubUrl
        })
      });
      
      if (response.ok) {
        showToast('Project updated successfully!', 'success');
        setShowProjectModal(false);
        setEditingProject(null);
        resetProjectForm();
        fetchDashboardData();
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to update project', 'error');
      }
    } catch (error) {
      console.error('Failed to update project:', error);
      showToast('Failed to update project', 'error');
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include'
      });
      
      if (response.ok) {
        showToast('Project deleted successfully!', 'success');
        fetchDashboardData();
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to delete project', 'error');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      showToast('Failed to delete project', 'error');
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/projects/${project._id}`, {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          ...project,
          featured: !project.featured
        })
      });
      
      if (response.ok) {
        showToast(`Project ${!project.featured ? 'featured' : 'unfeatured'}!`, 'success');
        fetchDashboardData();
        setShowProjectMenu(null);
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to update project', 'error');
      }
    } catch (error) {
      console.error('Failed to toggle featured:', error);
      showToast('Failed to update project', 'error');
    }
  };

  // Article CRUD operations
  const handleCreateArticle = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/articles`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          ...articleForm,
          tags: articleForm.tags.split(',').map(t => t.trim())
        })
      });
      
      if (response.ok) {
        showToast('Article created successfully!', 'success');
        setShowArticleModal(false);
        resetArticleForm();
        fetchDashboardData();
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to create article', 'error');
      }
    } catch (error) {
      console.error('Failed to create article:', error);
      showToast('Failed to create article', 'error');
    }
  };

  const handleUpdateArticle = async () => {
    if (!editingArticle) return;
    
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/articles/${editingArticle._id}`, {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          ...articleForm,
          tags: articleForm.tags.split(',').map(t => t.trim())
        })
      });
      
      if (response.ok) {
        showToast('Article updated successfully!', 'success');
        setShowArticleModal(false);
        setEditingArticle(null);
        resetArticleForm();
        fetchDashboardData();
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to update article', 'error');
      }
    } catch (error) {
      console.error('Failed to update article:', error);
      showToast('Failed to update article', 'error');
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/articles/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include'
      });
      
      if (response.ok) {
        showToast('Article deleted successfully!', 'success');
        fetchDashboardData();
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to delete article', 'error');
      }
    } catch (error) {
      console.error('Failed to delete article:', error);
      showToast('Failed to delete article', 'error');
    }
  };

  // Form helpers
  const openProjectModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        title: project.title,
        description: project.description,
        client: project.client || '',
        industry: project.industry || '',
        problem: project.problem || '',
        solution: project.solution || '',
        outcome: project.outcome || '',
        results: project.results || '',
        technologies: project.technologies.join(', '),
        category: project.category || 'web',
        projectType: project.projectType || 'web',
        audience: project.audience || 'all',
        completedDate: project.completedDate ? new Date(project.completedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        aiWorkflow: project.aiWorkflow || '',
        featured: project.featured,
        status: project.status,
        liveUrl: project.liveLink || '',
        githubUrl: project.repoLink || '',
        imageUrl: project.previewImage || ''
      });
    }
    setShowProjectModal(true);
  };

  const openArticleModal = (article?: Article) => {
    if (article) {
      setEditingArticle(article);
      setArticleForm({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content || '',
        tags: article.tags.join(', '),
        date: article.date,
        readTime: article.readTime,
        published: article.published
      });
    }
    setShowArticleModal(true);
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      client: '',
      industry: '',
      problem: '',
      solution: '',
      outcome: '',
      results: '',
      technologies: '',
      category: 'web',
      projectType: 'web',
      audience: 'all',
      completedDate: new Date().toISOString().split('T')[0],
      aiWorkflow: '',
      featured: false,
      status: 'active',
      liveUrl: '',
      githubUrl: '',
      imageUrl: ''
    });
    setEditingProject(null);
  };

  const resetArticleForm = () => {
    setArticleForm({
      title: '',
      excerpt: '',
      content: '',
      tags: '',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      published: false
    });
    setEditingArticle(null);
  };

  // About section operations
  const fetchAbout = async () => {
    try {
      const response = await fetch(`${API_URL}/about/me`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        if (data.about) {
          setAboutForm({
            bio: data.about.bio || '',
            title: data.about.title || '',
            experience: data.about.experience || '',
            education: data.about.education || '',
            skills: data.about.skills || [],
            socialLinks: data.about.socialLinks || {
              github: '',
              linkedin: '',
              twitter: '',
              website: ''
            }
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch about:', error);
    }
  };

  const handleSaveAbout = async () => {
    setAboutLoading(true);
    try {
      const response = await fetch(`${API_URL}/about`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(aboutForm)
      });
      
      if (response.ok) {
        showToast('About section updated successfully!', 'success');
      }
    } catch (error) {
      console.error('Failed to update about:', error);
      showToast('Failed to update about section', 'error');
    } finally {
      setAboutLoading(false);
    }
  };

  // Fetch about data when settings tab is opened
  useEffect(() => {
    if (activeTab === 'settings') {
      fetchAbout();
    }
  }, [activeTab]);

  // Skills management (stored in localStorage for now)
  useEffect(() => {
    if (activeTab === 'skills') {
      fetchSkills();
    }
    if (activeTab === 'contacts') {
      fetchContacts();
    }
    if (activeTab === 'overview') {
      fetchDashboardData();
    }
    if (activeTab === 'admins') {
      fetchAdmins();
    }
  }, [activeTab]);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${API_URL}/skills`);
      const data = await response.json();
      setSkills(data.data || data.skills || []);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    }
  };

  const handleAddSkill = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/skills`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(skillForm)
      });
      
      if (response.ok) {
        showToast('Skill added successfully!', 'success');
        setShowSkillModal(false);
        setSkillForm({ name: '', level: 50, category: 'Frontend' });
        fetchSkills();
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to add skill', 'error');
      }
    } catch (error) {
      console.error('Failed to add skill:', error);
      showToast('Failed to add skill', 'error');
    }
  };

  const handleUpdateSkill = async () => {
    if (!editingSkill?._id) return;
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/skills/${editingSkill._id}`, {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify(skillForm)
      });
      
      if (response.ok) {
        showToast('Skill updated successfully!', 'success');
        setShowSkillModal(false);
        setEditingSkill(null);
        setSkillForm({ name: '', level: 50, category: 'Frontend' });
        fetchSkills();
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to update skill', 'error');
      }
    } catch (error) {
      console.error('Failed to update skill:', error);
      showToast('Failed to update skill', 'error');
    }
  };

  const openSkillModal = (skill?: { _id?: string; name: string; level: number; category: string }) => {
    if (skill) {
      setEditingSkill(skill);
      setSkillForm({
        name: skill.name,
        level: skill.level,
        category: skill.category
      });
    } else {
      setEditingSkill(null);
      setSkillForm({ name: '', level: 50, category: 'Frontend' });
    }
    setShowSkillModal(true);
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/skills/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include'
      });
      
      if (response.ok) {
        showToast('Skill deleted successfully!', 'success');
        fetchSkills();
      } else {
        const data = await response.json();
        showToast(data.message || 'Failed to delete skill', 'error');
      }
    } catch (error) {
      console.error('Failed to delete skill:', error);
      showToast('Failed to delete skill', 'error');
    }
  };

  // Animate stats when data changes
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        totalProjects: Math.floor(stats.totalProjects * progress),
        totalArticles: Math.floor(stats.totalArticles * progress),
        totalViews: Math.floor(stats.totalViews * progress),
        totalContacts: Math.floor(stats.totalContacts * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(stats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [stats, activeTab]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.join(', ').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = projectFilter === 'all' || 
                         (projectFilter === 'featured' && project.featured) ||
                         (projectFilter === 'active' && project.status === 'active');
    return matchesSearch && matchesFilter;
  });

  const dockItems = [
    { 
      id: 'overview', 
      label: 'Overview',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    },
    { 
      id: 'hero', 
      label: 'Hero',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
    },
    { 
      id: 'team', 
      label: 'Team',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    },
    { 
      id: 'projects', 
      label: 'Projects',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
    },
    { 
      id: 'gallery', 
      label: 'Gallery',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
    },
    { 
      id: 'articles', 
      label: 'Articles',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
    },
    { 
      id: 'process', 
      label: 'Process',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6"/><path d="M17.66 4.34l-4.24 4.24m0 6.84l4.24 4.24M23 12h-6m-6 0H1m18.66 7.66l-4.24-4.24m-6.84 0l-4.24 4.24"/></svg>
    },
    { 
      id: 'skills', 
      label: 'Skills',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    },
    { 
      id: 'contacts', 
      label: 'Contacts',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    },
    { 
      id: 'admins', 
      label: 'Admins',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5z"/><path d="M12 14a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9z"/><path d="M12 14v-2"/><path d="M15.5 7.5l1.5-1.5"/><path d="M7 7.5L5.5 6"/></svg>
    },
    { 
      id: 'analytics', 
      label: 'Analytics',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
    },
    { 
      id: 'settings', 
      label: 'Settings',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m-6 0l-4.2 4.2"/></svg>
    },
  ];

  const handleDockItemClick = (id: string) => {
    setIsLoading(true);
    setActiveTab(id as typeof activeTab);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Navigate anyway
      navigate('/login');
    }
  };

  const [mouseY, setMouseY] = useState<number | null>(null);
  const [isDockVisible, setIsDockVisible] = useState(false);
  const dockRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMouseY(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    setMouseY(null);
  };

  // Show dock when mouse is near left edge
  React.useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Desktop: show when near left edge
      if (window.innerWidth > 768) {
        if (e.clientX < 80) {
          setIsDockVisible(true);
        } else if (e.clientX > 150) {
          setIsDockVisible(false);
        }
      } else {
        // Mobile: show when near bottom edge
        if (e.clientY > window.innerHeight - 80) {
          setIsDockVisible(true);
        } else if (e.clientY < window.innerHeight - 150) {
          setIsDockVisible(false);
        }
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.admin-user-wrapper')) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  const getScale = (index: number) => {
    if (mouseY === null) return 1;
    
    const itemHeight = 48;
    const gap = 4;
    const itemCenter = index * (itemHeight + gap) + itemHeight / 2;
    const distance = Math.abs(mouseY - itemCenter);
    
    // Reduced scaling: closer = bigger (but not too big)
    const maxScale = 1.4;
    const minScale = 1;
    const effectRadius = 100;
    
    if (distance > effectRadius) return minScale;
    
    const scale = maxScale - ((maxScale - minScale) * (distance / effectRadius));
    return scale;
  };

  const getTranslateX = (index: number) => {
    if (mouseY === null) return 0;
    
    const scale = getScale(index);
    // Reduced push effect
    return (scale - 1) * 8;
  };

  return (
    <div className="admin-dashboard">
      {/* Loading Bar */}
      <div className={`loading-bar ${isLoading ? 'loading' : ''}`} />

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          
          {/* Global Search Bar */}
          <div className="global-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              id="global-search"
              type="text"
              placeholder="Search... (Press / to focus)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

          <div className="admin-user-wrapper">
            <div 
              className="admin-user"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <span>Welcome, {user?.name || 'Admin'}</span>
              <div className="admin-avatar">{user?.name?.charAt(0) || 'A'}</div>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{ 
                  transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
            
            {isUserMenuOpen && (
              <div className="user-dropdown">
                <button className="dropdown-item" onClick={handleSignOut}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="admin-content">
          {activeTab === 'overview' && (
            <div className="overview-section">
              {/* Stats Grid with Hover Effects */}
              <div className="stats-grid">
                <div 
                  className={`stat-card-wrapper ${hoveredStat === 0 ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredStat(0)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <LiquidGlassCard className="stat-card">
                    <div className="stat-icon-wrapper">
                      <div className="stat-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <path d="M3 9h18"/>
                          <path d="M9 21V9"/>
                        </svg>
                      </div>
                      <div className="stat-glow"></div>
                    </div>
                    <div className="stat-info">
                      <h3 className="stat-number">{animatedStats.totalProjects}</h3>
                      <p>Total Projects</p>
                      <div className="stat-trend">
                        <span className="trend-up">↑ 12%</span>
                        <span className="trend-label">vs last month</span>
                      </div>
                    </div>
                    {/* Mini Sparkline */}
                    <svg className="stat-sparkline" width="100" height="30" viewBox="0 0 100 30">
                      <polyline
                        points="0,25 20,20 40,22 60,15 80,18 100,10"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                      />
                    </svg>
                  </LiquidGlassCard>
                </div>

                <div 
                  className={`stat-card-wrapper ${hoveredStat === 1 ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredStat(1)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <LiquidGlassCard className="stat-card">
                    <div className="stat-icon-wrapper">
                      <div className="stat-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <path d="M14 2v6h6"/>
                          <path d="M16 13H8"/>
                          <path d="M16 17H8"/>
                        </svg>
                      </div>
                      <div className="stat-glow"></div>
                    </div>
                    <div className="stat-info">
                      <h3 className="stat-number">{animatedStats.totalArticles}</h3>
                      <p>Published Articles</p>
                      <div className="stat-trend">
                        <span className="trend-up">↑ 8%</span>
                        <span className="trend-label">vs last month</span>
                      </div>
                    </div>
                    <svg className="stat-sparkline" width="100" height="30" viewBox="0 0 100 30">
                      <polyline
                        points="0,20 20,18 40,15 60,12 80,14 100,8"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                      />
                    </svg>
                  </LiquidGlassCard>
                </div>

                <div 
                  className={`stat-card-wrapper ${hoveredStat === 2 ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredStat(2)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <LiquidGlassCard className="stat-card">
                    <div className="stat-icon-wrapper">
                      <div className="stat-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </div>
                      <div className="stat-glow"></div>
                    </div>
                    <div className="stat-info">
                      <h3 className="stat-number">{animatedStats.totalViews}</h3>
                      <p>Total Views</p>
                      <div className="stat-trend">
                        <span className="trend-up">↑ 24%</span>
                        <span className="trend-label">vs last month</span>
                      </div>
                    </div>
                    <svg className="stat-sparkline" width="100" height="30" viewBox="0 0 100 30">
                      <polyline
                        points="0,28 20,25 40,20 60,18 80,12 100,5"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                      />
                    </svg>
                  </LiquidGlassCard>
                </div>

                <div 
                  className={`stat-card-wrapper ${hoveredStat === 3 ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredStat(3)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <LiquidGlassCard className="stat-card">
                    <div className="stat-icon-wrapper">
                      <div className="stat-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </div>
                      <div className="stat-glow"></div>
                    </div>
                    <div className="stat-info">
                      <h3 className="stat-number">{animatedStats.totalContacts}</h3>
                      <p>Contact Messages</p>
                      <div className="stat-trend">
                        <span className="trend-up">↑ 16%</span>
                        <span className="trend-label">vs last month</span>
                      </div>
                    </div>
                    <svg className="stat-sparkline" width="100" height="30" viewBox="0 0 100 30">
                      <polyline
                        points="0,22 20,24 40,19 60,16 80,20 100,14"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                      />
                    </svg>
                  </LiquidGlassCard>
                </div>
              </div>

              {/* Recent Activity */}
              <LiquidGlassCard className="activity-card">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <path d="M14 2v6h6"/>
                      </svg>
                    </span>
                    <div className="activity-details">
                      <p className="activity-title">New article published</p>
                      <p className="activity-time">2 hours ago</p>
                    </div>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M3 9h18"/>
                      </svg>
                    </span>
                    <div className="activity-details">
                      <p className="activity-title">Project updated: E-Commerce Platform</p>
                      <p className="activity-time">5 hours ago</p>
                    </div>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </span>
                    <div className="activity-details">
                      <p className="activity-title">New contact message received</p>
                      <p className="activity-time">1 day ago</p>
                    </div>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="projects-section">
              <div className="section-header">
                <h2>Manage Projects</h2>
                
                {/* Filter Dropdown */}
                <div className="filter-controls">
                  <select 
                    className="filter-select"
                    value={projectFilter}
                    onChange={(e) => setProjectFilter(e.target.value as typeof projectFilter)}
                  >
                    <option value="all">All Projects</option>
                    <option value="featured">Featured</option>
                    <option value="active">Active</option>
                  </select>
                </div>

                <PixelPerfectButton 
                  variant="primary" 
                  size="medium"
                  onClick={() => openProjectModal()}
                >
                  + Add New Project
                </PixelPerfectButton>
              </div>

              <div className="projects-table">
                <LiquidGlassCard className="table-card">
                  <table>
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Status</th>
                        <th>Progress</th>
                        <th>Technologies</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.length === 0 ? (
                        <tr>
                          <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.5)' }}>
                            {isLoading ? 'Loading projects...' : 'No projects found'}
                          </td>
                        </tr>
                      ) : (
                        filteredProjects.map((project, index) => (
                          <tr 
                            key={project._id}
                            onMouseEnter={() => setHoveredRow(index)}
                            onMouseLeave={() => setHoveredRow(null)}
                            style={{
                              animation: `fadeInRow 0.4s ease ${index * 0.1}s both`
                            }}
                          >
                            <td>{project.title}</td>
                            <td>
                              <span className={`status-badge ${project.featured ? 'featured' : project.status}`}>
                                {project.featured ? 'featured' : project.status}
                              </span>
                            </td>
                            <td>
                              <div className="progress-bar-container">
                                <div 
                                  className="progress-bar-fill" 
                                  style={{ width: `${project.featured ? 100 : 50}%` }}
                                />
                                <span className="progress-text">{project.featured ? 100 : 50}%</span>
                              </div>
                            </td>
                            <td>{project.technologies.join(', ')}</td>
                            <td>{new Date(project.updatedAt).toLocaleDateString()}</td>
                            <td>
                              <div className="action-buttons" style={{ position: 'relative' }}>
                                <button 
                                  className="action-btn edit"
                                  onClick={() => openProjectModal(project)}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="action-btn delete"
                                  onClick={() => handleDeleteProject(project._id)}
                                >
                                  Delete
                                </button>
                                {hoveredRow === index && (
                                  <div style={{ position: 'static', display: 'inline-block' }}>
                                    <button 
                                      className="action-btn quick-action"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowProjectMenu(showProjectMenu === project._id ? null : project._id);
                                      }}
                                    >
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="1"/>
                                        <circle cx="12" cy="5" r="1"/>
                                        <circle cx="12" cy="19" r="1"/>
                                      </svg>
                                    </button>
                                    {showProjectMenu === project._id && (
                                      <div 
                                        className="quick-menu"
                                        style={{
                                          position: 'fixed',
                                          transform: 'translateX(-100%)',
                                          marginLeft: '-0.5rem',
                                          marginTop: '2rem',
                                          background: 'rgba(20, 20, 30, 0.95)',
                                          border: '1px solid rgba(255, 255, 255, 0.1)',
                                          borderRadius: '8px',
                                          padding: '0.5rem',
                                          minWidth: '150px',
                                          zIndex: 9999,
                                          backdropFilter: 'blur(10px)',
                                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                                        }}
                                      >
                                        <button
                                          onClick={() => handleToggleFeatured(project)}
                                          style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'white',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            borderRadius: '4px',
                                            fontSize: '0.875rem'
                                          }}
                                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                          {project.featured ? '★ Unfeature' : '☆ Feature'}
                                        </button>
                                        <button
                                          onClick={() => {
                                            openProjectModal(project);
                                            setShowProjectMenu(null);
                                          }}
                                          style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'white',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            borderRadius: '4px',
                                            fontSize: '0.875rem'
                                          }}
                                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                          ✎ Edit
                                        </button>
                                        <button
                                          onClick={() => {
                                            handleDeleteProject(project._id);
                                            setShowProjectMenu(null);
                                          }}
                                          style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#ff4444',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            borderRadius: '4px',
                                            fontSize: '0.875rem'
                                          }}
                                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 68, 68, 0.1)'}
                                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                          🗑 Delete
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </LiquidGlassCard>
              </div>
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="articles-section">
              <div className="section-header">
                <h2>Manage Articles</h2>
                <PixelPerfectButton 
                  variant="primary" 
                  size="medium"
                  onClick={() => openArticleModal()}
                >
                  + Write New Article
                </PixelPerfectButton>
              </div>

              <div className="articles-grid">
                {isLoading ? (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.5)' }}>
                    Loading articles...
                  </div>
                ) : articles.length === 0 ? (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.5)' }}>
                    No articles found. Create your first article!
                  </div>
                ) : (
                  articles.map((article) => (
                    <LiquidGlassCard key={article._id} className="article-card-admin">
                      <div className="article-header">
                        <span className={`article-status ${article.published ? 'published' : 'draft'}`}>
                          {article.published ? 'Published' : 'Draft'}
                        </span>
                        <span className="article-date">{new Date(article.updatedAt).toLocaleDateString()}</span>
                      </div>
                      <h3>{article.title}</h3>
                      <p className="article-excerpt">{article.excerpt}</p>
                      <div className="article-tags">
                        {article.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="tag">{tag}</span>
                        ))}
                      </div>
                      <div className="article-actions">
                        <button 
                          className="action-btn edit"
                          onClick={() => openArticleModal(article)}
                        >
                          Edit
                        </button>
                        {article.published ? (
                          <button className="action-btn view">View</button>
                        ) : (
                          <button className="action-btn publish">Publish</button>
                        )}
                        <button 
                          className="action-btn delete"
                          onClick={() => handleDeleteArticle(article._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </LiquidGlassCard>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="hero-section">
              <div className="section-header">
                <h2>Hero Content</h2>
              </div>
              <LiquidGlassCard className="settings-card">
                <div className="settings-group">
                  <label>Headline</label>
                  <input 
                    type="text" 
                    value={heroForm.headline}
                    onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                    className="settings-input" 
                    placeholder="design.code.deploy"
                  />
                </div>

                <div className="settings-group">
                  <label>Tagline</label>
                  <textarea 
                    className="settings-textarea" 
                    rows={3}
                    value={heroForm.tagline}
                    onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                    placeholder="Creating complete digital experiences..."
                  />
                </div>

                <div className="settings-group">
                  <label>AI Workflow Mention</label>
                  <input 
                    type="text" 
                    value={heroForm.aiMention}
                    onChange={(e) => setHeroForm({ ...heroForm, aiMention: e.target.value })}
                    className="settings-input" 
                    placeholder="Leveraging AI tools..."
                  />
                </div>

                <div className="settings-actions">
                  <PixelPerfectButton variant="primary" size="medium" onClick={handleSaveHero}>
                    Save Changes
                  </PixelPerfectButton>
                </div>
              </LiquidGlassCard>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="team-section">
              <div className="section-header">
                <h2>Team Members</h2>
                <PixelPerfectButton variant="primary" size="medium" onClick={handleAddTeamMember}>
                  + Add Team Member
                </PixelPerfectButton>
              </div>

              {teamMembers.length === 0 ? (
                <LiquidGlassCard className="placeholder-card">
                  <p>No team members yet. Click "Add Team Member" to get started!</p>
                </LiquidGlassCard>
              ) : (
                <div className="team-grid-admin">
                  {teamMembers.map((member, index) => (
                    <LiquidGlassCard key={member._id || index} className="team-member-card">
                      <div className="team-member-header">
                        <h3>Team Member {index + 1}</h3>
                        <button 
                          className="action-btn delete"
                          onClick={() => member._id && handleDeleteTeamMember(member._id)}
                        >
                          Delete
                        </button>
                      </div>
                      
                      <div className="settings-group">
                        <label>Name</label>
                        <input 
                          type="text" 
                          defaultValue={member.name}
                          onBlur={(e) => member._id && handleUpdateTeamMember(member._id, { name: e.target.value })}
                          placeholder="Your Name" 
                          className="settings-input" 
                        />
                      </div>

                      <div className="settings-group">
                        <label>Role Title</label>
                        <input 
                          type="text" 
                          defaultValue={member.role}
                          onBlur={(e) => member._id && handleUpdateTeamMember(member._id, { role: e.target.value })}
                          placeholder="The Pixel Perfectionist" 
                          className="settings-input" 
                        />
                      </div>

                      <div className="settings-group">
                        <label>Category</label>
                        <input 
                          type="text" 
                          defaultValue={member.category}
                          onBlur={(e) => member._id && handleUpdateTeamMember(member._id, { category: e.target.value })}
                          placeholder="Design & Frontend" 
                          className="settings-input" 
                        />
                      </div>

                      <div className="settings-group">
                        <label>Audience</label>
                        <select 
                          defaultValue={member.audience || 'all'}
                          onChange={(e) => member._id && handleUpdateTeamMember(member._id, { audience: e.target.value })}
                          className="settings-input"
                        >
                          <option value="all">All (Visible to everyone)</option>
                          <option value="client">Clients Only</option>
                          <option value="recruiter">Recruiters Only</option>
                        </select>
                      </div>

                      <div className="settings-group">
                        <label>Description</label>
                        <textarea 
                          className="settings-textarea" 
                          rows={4}
                          defaultValue={member.description}
                          onBlur={(e) => member._id && handleUpdateTeamMember(member._id, { description: e.target.value })}
                          placeholder="Describe this team member..."
                        />
                      </div>

                      <div className="settings-group">
                        <label>Skills (comma-separated)</label>
                        <input 
                          type="text" 
                          defaultValue={member.skills?.join(', ')}
                          onBlur={(e) => member._id && handleUpdateTeamMember(member._id, { 
                            skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                          })}
                          placeholder="React, Node.js, MongoDB" 
                          className="settings-input" 
                        />
                      </div>

                      <ImageUpload
                        label="Team Member Photo"
                        currentImage={member.photoUrl}
                        onImageUpload={(url) => member._id && handleUpdateTeamMember(member._id, { photoUrl: url })}
                      />
                    </LiquidGlassCard>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="gallery-section-admin">
              <div className="section-header">
                <h2>Personal Gallery</h2>
                <PixelPerfectButton variant="primary" size="medium" onClick={handleAddGalleryItem}>
                  + Add Image
                </PixelPerfectButton>
              </div>

              {galleryItems.length === 0 ? (
                <LiquidGlassCard className="placeholder-card">
                  <p>No gallery items yet. Click "Add Image" to get started!</p>
                </LiquidGlassCard>
              ) : (
                <div className="gallery-grid-admin">
                  {galleryItems.map((item, index) => (
                    <LiquidGlassCard key={item._id || index} className="gallery-item-admin">
                      <ImageUpload
                        label={`Gallery Image ${index + 1}`}
                        currentImage={item.imageUrl}
                        onImageUpload={(url) => item._id && handleUpdateGalleryItem(item._id, { imageUrl: url })}
                      />
                      <div className="settings-group">
                        <label>Caption</label>
                        <input 
                          type="text" 
                          defaultValue={item.caption}
                          onBlur={(e) => item._id && handleUpdateGalleryItem(item._id, { caption: e.target.value })}
                          placeholder="Your caption here" 
                          className="settings-input" 
                        />
                      </div>
                      <div className="article-actions">
                        <button 
                          className="action-btn delete"
                          onClick={() => item._id && handleDeleteGalleryItem(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </LiquidGlassCard>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'process' && (
            <div className="process-section-admin">
              <div className="section-header">
                <h2>Process/Workflow</h2>
              </div>
              <LiquidGlassCard className="settings-card">
                <div className="settings-group">
                  <label>Page Title</label>
                  <input 
                    type="text" 
                    value={processForm.title}
                    onChange={(e) => setProcessForm({ ...processForm, title: e.target.value })}
                    className="settings-input" 
                  />
                </div>

                <div className="settings-group">
                  <label>Subtitle</label>
                  <input 
                    type="text" 
                    value={processForm.subtitle}
                    onChange={(e) => setProcessForm({ ...processForm, subtitle: e.target.value })}
                    className="settings-input" 
                  />
                </div>

                <div className="settings-group">
                  <label>Process Steps (JSON format)</label>
                  <textarea 
                    className="settings-textarea" 
                    rows={10}
                    value={JSON.stringify(processForm.steps, null, 2)}
                    onChange={(e) => {
                      try {
                        const steps = JSON.parse(e.target.value);
                        setProcessForm({ ...processForm, steps });
                      } catch (err) {
                        // Invalid JSON, ignore
                      }
                    }}
                  />
                </div>

                <div className="settings-actions">
                  <PixelPerfectButton variant="primary" size="medium" onClick={handleSaveProcess}>
                    Save Changes
                  </PixelPerfectButton>
                </div>
              </LiquidGlassCard>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <LiquidGlassCard className="settings-card">
                <h2>About Section</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>
                  Edit your personal information (only you can edit your own About section)
                </p>
                
                <div className="settings-group">
                  <label>Professional Title</label>
                  <input 
                    type="text" 
                    value={aboutForm.title}
                    onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                    placeholder="Full-stack Developer"
                    className="settings-input" 
                  />
                </div>

                <div className="settings-group">
                  <label>Bio / About</label>
                  <textarea 
                    className="settings-textarea" 
                    rows={6}
                    value={aboutForm.bio}
                    onChange={(e) => setAboutForm({ ...aboutForm, bio: e.target.value })}
                    placeholder="Tell your story..."
                  />
                </div>

                <div className="settings-group">
                  <label>Experience</label>
                  <textarea 
                    className="settings-textarea" 
                    rows={4}
                    value={aboutForm.experience}
                    onChange={(e) => setAboutForm({ ...aboutForm, experience: e.target.value })}
                    placeholder="Your work experience..."
                  />
                </div>

                <div className="settings-group">
                  <label>Education</label>
                  <textarea 
                    className="settings-textarea" 
                    rows={3}
                    value={aboutForm.education}
                    onChange={(e) => setAboutForm({ ...aboutForm, education: e.target.value })}
                    placeholder="Your educational background..."
                  />
                </div>

                <div className="settings-group">
                  <label>Social Links</label>
                  <input 
                    type="url" 
                    placeholder="GitHub URL" 
                    className="settings-input"
                    value={aboutForm.socialLinks.github}
                    onChange={(e) => setAboutForm({ 
                      ...aboutForm, 
                      socialLinks: { ...aboutForm.socialLinks, github: e.target.value }
                    })}
                  />
                  <input 
                    type="url" 
                    placeholder="LinkedIn URL" 
                    className="settings-input"
                    value={aboutForm.socialLinks.linkedin}
                    onChange={(e) => setAboutForm({ 
                      ...aboutForm, 
                      socialLinks: { ...aboutForm.socialLinks, linkedin: e.target.value }
                    })}
                  />
                  <input 
                    type="url" 
                    placeholder="Twitter URL" 
                    className="settings-input"
                    value={aboutForm.socialLinks.twitter}
                    onChange={(e) => setAboutForm({ 
                      ...aboutForm, 
                      socialLinks: { ...aboutForm.socialLinks, twitter: e.target.value }
                    })}
                  />
                  <input 
                    type="url" 
                    placeholder="Website URL" 
                    className="settings-input"
                    value={aboutForm.socialLinks.website}
                    onChange={(e) => setAboutForm({ 
                      ...aboutForm, 
                      socialLinks: { ...aboutForm.socialLinks, website: e.target.value }
                    })}
                  />
                </div>

                <div className="settings-actions">
                  <PixelPerfectButton 
                    variant="primary" 
                    size="medium"
                    onClick={handleSaveAbout}
                    disabled={aboutLoading}
                  >
                    {aboutLoading ? 'Saving...' : 'Save Changes'}
                  </PixelPerfectButton>
                  <PixelPerfectButton 
                    variant="secondary" 
                    size="medium"
                    onClick={fetchAbout}
                  >
                    Reset
                  </PixelPerfectButton>
                </div>
              </LiquidGlassCard>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="skills-section">
              <div className="section-header">
                <h2>Manage Skills</h2>
                <PixelPerfectButton 
                  variant="primary" 
                  size="medium"
                  onClick={() => openSkillModal()}
                >
                  + Add New Skill
                </PixelPerfectButton>
              </div>

              <div className="skills-grid">
                {skills.length === 0 ? (
                  <LiquidGlassCard className="placeholder-card">
                    <p>No skills added yet. Click "Add New Skill" to get started!</p>
                  </LiquidGlassCard>
                ) : (
                  skills.map((skill, index) => (
                    <LiquidGlassCard key={skill._id || index} className="skill-card">
                      <div className="skill-header">
                        <h3>{skill.name}</h3>
                        <div className="action-buttons">
                          <button 
                            className="action-btn edit"
                            onClick={() => openSkillModal(skill)}
                          >
                            Edit
                          </button>
                          <button 
                            className="action-btn delete"
                            onClick={() => skill._id && handleDeleteSkill(skill._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="skill-category">{skill.category}</div>
                      <div className="skill-level-bar">
                        <div 
                          className="skill-level-fill" 
                          style={{ width: `${skill.level}%` }}
                        />
                        <span className="skill-level-text">{skill.level}%</span>
                      </div>
                    </LiquidGlassCard>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="contacts-section">
              <div className="section-header">
                <h2>Contact Messages</h2>
              </div>
              
              {contacts.length === 0 ? (
                <LiquidGlassCard className="placeholder-card">
                  <p>No contact messages yet</p>
                </LiquidGlassCard>
              ) : (
                <div className="contacts-list">
                  {contacts.map((contact) => (
                    <LiquidGlassCard key={contact._id} className="contact-card">
                      <div className="contact-header">
                        <div>
                          <h3>{contact.name}</h3>
                          <p className="contact-email">{contact.email}</p>
                        </div>
                        <div className="contact-actions">
                          <span className={`status-badge ${contact.status}`}>
                            {contact.status}
                          </span>
                          <button 
                            className="action-btn reply"
                            onClick={() => openReplyModal(contact._id)}
                          >
                            Reply
                          </button>
                          <button 
                            className="action-btn delete"
                            onClick={() => handleDeleteContact(contact._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="contact-subject">{contact.subject}</div>
                      <div className="contact-message">{contact.message}</div>
                      {contact.reply && (
                        <div className="contact-reply">
                          <div className="reply-header">
                            <strong>Your Reply:</strong>
                            <span className="reply-date">
                              {new Date(contact.reply.sentAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="reply-message">{contact.reply.message}</div>
                        </div>
                      )}
                      <div className="contact-date">
                        Received: {new Date(contact.createdAt).toLocaleString()}
                      </div>
                    </LiquidGlassCard>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'admins' && (
            <div className="admins-section">
              <div className="section-header">
                <h2>Admin Users</h2>
                <PixelPerfectButton
                  variant="primary"
                  onClick={() => setShowAdminModal(true)}
                >
                  + Add Admin
                </PixelPerfectButton>
              </div>
              
              {admins.length === 0 ? (
                <LiquidGlassCard className="placeholder-card">
                  <p>No admin users found</p>
                </LiquidGlassCard>
              ) : (
                <div className="admins-list">
                  {admins.map((admin) => (
                    <LiquidGlassCard key={admin._id} className="admin-card">
                      <div className="admin-info">
                        <div className="admin-avatar">
                          {admin.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="admin-details">
                          <h3>{admin.name}</h3>
                          <p className="admin-email">{admin.email}</p>
                          <span className="admin-role-badge">{admin.role}</span>
                        </div>
                      </div>
                      <div className="admin-meta">
                        <span className="admin-date">
                          Joined: {new Date(admin.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </LiquidGlassCard>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics-section">
              <div className="section-header">
                <h2>Analytics Dashboard</h2>
              </div>
              <LiquidGlassCard className="placeholder-card">
                <p>View detailed analytics: page views, visitor stats, popular content, and more</p>
              </LiquidGlassCard>
            </div>
          )}
        </div>
      </main>

      {/* Vertical Dock */}
      <div 
        className={`vertical-dock ${isDockVisible ? 'visible' : ''}`}
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {dockItems.map((item, index) => {
          const scale = getScale(index);
          const translateX = getTranslateX(index);
          const isHovered = scale > 1.1;
          
          return (
            <button
              key={item.id}
              className={`vertical-dock-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleDockItemClick(item.id)}
              style={{
                transform: `scale(${scale}) translateX(${translateX}px)`,
              }}
            >
              <div className="vertical-dock-icon">
                {item.icon}
              </div>
              {isHovered && <span className="vertical-dock-label">{item.label}</span>}
              {activeTab === item.id && <div className="vertical-dock-indicator" />}
            </button>
          );
        })}
      </div>

      {/* Project Modal */}
      {showProjectModal && (
        <div className="modal-overlay" onClick={() => { setShowProjectModal(false); resetProjectForm(); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProject ? 'Edit Project' : 'Create New Project'}</h2>
              <button className="modal-close" onClick={() => { setShowProjectModal(false); resetProjectForm(); }}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Brief project description"
                  rows={3}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Client Name</label>
                  <input
                    type="text"
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                    placeholder="Big Tech Corp"
                  />
                </div>
                <div className="form-group">
                  <label>Industry</label>
                  <input
                    type="text"
                    value={projectForm.industry}
                    onChange={(e) => setProjectForm({ ...projectForm, industry: e.target.value })}
                    placeholder="Technology, Healthcare, Finance"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Completed Date</label>
                <input
                  type="date"
                  value={projectForm.completedDate}
                  onChange={(e) => setProjectForm({ ...projectForm, completedDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Problem</label>
                <textarea
                  value={projectForm.problem}
                  onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                  placeholder="What problem does this project solve?"
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Solution</label>
                <textarea
                  value={projectForm.solution}
                  onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                  placeholder="How did you solve it?"
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Outcome</label>
                <textarea
                  value={projectForm.outcome}
                  onChange={(e) => setProjectForm({ ...projectForm, outcome: e.target.value })}
                  placeholder="What was the result?"
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Results Achieved</label>
                <textarea
                  value={projectForm.results}
                  onChange={(e) => setProjectForm({ ...projectForm, results: e.target.value })}
                  placeholder="Quantifiable results and business impact"
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  >
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile Solution</option>
                    <option value="ai">AI & Machine Learning</option>
                    <option value="design">Design System</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Project Type</label>
                  <select
                    value={projectForm.projectType}
                    onChange={(e) => setProjectForm({ ...projectForm, projectType: e.target.value })}
                  >
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile Solution</option>
                    <option value="ai">AI & Machine Learning</option>
                    <option value="design">Design System</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Audience</label>
                <select
                  value={projectForm.audience || 'all'}
                  onChange={(e) => setProjectForm({ ...projectForm, audience: e.target.value })}
                >
                  <option value="all">All (Visible to everyone)</option>
                  <option value="client">Clients Only</option>
                  <option value="recruiter">Recruiters Only</option>
                </select>
              </div>
              <div className="form-group">
                <label>AI Workflow (optional)</label>
                <textarea
                  value={projectForm.aiWorkflow}
                  onChange={(e) => setProjectForm({ ...projectForm, aiWorkflow: e.target.value })}
                  placeholder="How did AI tools enhance this project?"
                  rows={2}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Live URL</label>
                  <input
                    type="url"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="form-group">
                  <label>GitHub URL</label>
                  <input
                    type="url"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>
              <ImageUpload
                label="Project Image"
                currentImage={projectForm.imageUrl}
                onImageUpload={(url) => setProjectForm({ ...projectForm, imageUrl: url })}
              />
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    />
                    Featured Project
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => { setShowProjectModal(false); resetProjectForm(); }}>
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={editingProject ? handleUpdateProject : handleCreateProject}
              >
                {editingProject ? 'Update' : 'Create'} Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {showArticleModal && (
        <div className="modal-overlay" onClick={() => { setShowArticleModal(false); resetArticleForm(); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingArticle ? 'Edit Article' : 'Write New Article'}</h2>
              <button className="modal-close" onClick={() => { setShowArticleModal(false); resetArticleForm(); }}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  placeholder="Article title"
                />
              </div>
              <div className="form-group">
                <label>Excerpt</label>
                <textarea
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                  placeholder="Brief description"
                  rows={2}
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  placeholder="Article content (Markdown supported)"
                  rows={10}
                />
              </div>
              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input
                  type="text"
                  value={articleForm.tags}
                  onChange={(e) => setArticleForm({ ...articleForm, tags: e.target.value })}
                  placeholder="React, JavaScript, Tutorial"
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={articleForm.published}
                    onChange={(e) => setArticleForm({ ...articleForm, published: e.target.checked })}
                  />
                  Publish Article
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => { setShowArticleModal(false); resetArticleForm(); }}>
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={editingArticle ? handleUpdateArticle : handleCreateArticle}
              >
                {editingArticle ? 'Update' : 'Create'} Article
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Skill Modal */}
      {showSkillModal && (
        <div className="modal-overlay" onClick={() => { setShowSkillModal(false); setEditingSkill(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h2>
              <button className="modal-close" onClick={() => { setShowSkillModal(false); setEditingSkill(null); }}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Skill Name</label>
                <input
                  type="text"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="React, Node.js, Python..."
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                >
                  <option value="UI/UX">UI/UX</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="AI">AI</option>
                  <option value="Tools">Tools</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Audience</label>
                <select
                  value={skillForm.audience || 'all'}
                  onChange={(e) => setSkillForm({ ...skillForm, audience: e.target.value })}
                >
                  <option value="all">All (Visible to everyone)</option>
                  <option value="client">Clients Only</option>
                  <option value="recruiter">Recruiters Only</option>
                </select>
              </div>
              <div className="form-group">
                <label>Proficiency Level: {skillForm.level}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: parseInt(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => { setShowSkillModal(false); setEditingSkill(null); }}>
                Cancel
              </button>
              <button className="btn-primary" onClick={editingSkill ? handleUpdateSkill : handleAddSkill}>
                {editingSkill ? 'Update' : 'Add'} Skill
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Admin Modal */}
      {showAdminModal && (
        <div className="modal-overlay" onClick={() => setShowAdminModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Admin</h2>
              <button className="modal-close" onClick={() => setShowAdminModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={adminForm.name}
                  onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                  placeholder="Admin name"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  placeholder="admin@example.com"
                />
              </div>
              <div className="form-group">
                <label>Password *</label>
                <div className="password-input-wrapper">
                  <input
                    type={showAdminPassword ? 'text' : 'password'}
                    value={adminForm.password}
                    onChange={(e) => {
                      setAdminForm({ ...adminForm, password: e.target.value });
                      setPasswordStrength(calculatePasswordStrength(e.target.value));
                    }}
                    placeholder="Minimum 8 characters"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                  >
                    {showAdminPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
                {adminForm.password && (
                  <div className="password-strength-container">
                    <div className="password-strength-bar-wrapper">
                      <div className="password-strength-bar">
                        <div 
                          className="password-strength-fill"
                          style={{
                            width: `${(passwordStrength.score / 6) * 100}%`,
                            background: passwordStrength.color
                          }}
                        />
                      </div>
                      <span 
                        className="password-strength-text"
                        style={{ color: passwordStrength.color }}
                      >
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="password-requirements">
                      Must contain: 8+ chars, uppercase, lowercase, number
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => {
                setShowAdminModal(false);
                setAdminForm({ name: '', email: '', password: '' });
                setPasswordStrength({ score: 0, text: '', color: '' });
                setShowAdminPassword(false);
              }}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleCreateAdmin}>
                Create Admin
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Reply Modal */}
      {showReplyModal && (
        <div className="modal-overlay" onClick={() => setShowReplyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Reply to Contact</h2>
              <button className="modal-close" onClick={() => setShowReplyModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Your Reply</label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply message here..."
                  rows={8}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid rgba(255,255,255,0.2)' }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowReplyModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleReplyToContact}>
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
