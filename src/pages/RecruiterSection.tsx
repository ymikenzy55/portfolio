import React, { useState, useEffect } from 'react';
import { LiquidGlassCard, PixelPerfectButton, DotMatrix, SectionDivider } from '../components/ui';
import './RecruiterSection.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

/**
 * RecruiterSection with creative visual layout
 */
export const RecruiterSection: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<Array<{
    _id: string;
    name: string;
    role: string;
    description: string;
    skills: string[];
    photoUrl: string;
    category: string;
  }>>([]);
  
  const [skills, setSkills] = useState<Array<{
    _id: string;
    name: string;
    level: number;
    category: string;
  }>>([]);
  
  const resumeLink = '#'; // TODO: Add resume link in admin panel

  useEffect(() => {
    // Initial fetch
    fetchTeamMembers();
    fetchSkills();

    // Set up polling to refetch data every 30 seconds
    const interval = setInterval(() => {
      fetchTeamMembers();
      fetchSkills();
    }, 30000); // 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(`${API_URL}/team?audience=recruiter`);
      const data = await response.json();
      setTeamMembers(data.members || []);
    } catch (error) {
      console.error('Failed to fetch team members:', error);
    }
  };
  
  const fetchSkills = async () => {
    try {
      const response = await fetch(`${API_URL}/skills?audience=recruiter`);
      const data = await response.json();
      setSkills(data.data || []);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    }
  };
  
  // Categorized tech stack from API or default
  const defaultTechStackCategories = [
    {
      category: 'Frontend',
      techs: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript']
    },
    {
      category: 'Backend',
      techs: ['Node.js', 'Express', 'Python', 'RESTful APIs']
    },
    {
      category: 'Database',
      techs: ['MongoDB', 'PostgreSQL', 'SQL']
    },
    {
      category: 'Data & Analytics',
      techs: ['Python', 'R', 'Pandas', 'Data Visualization']
    },
    {
      category: 'Cloud & DevOps',
      techs: ['AWS', 'Docker', 'Git', 'CI/CD']
    }
  ];
  
  // Group skills by category from API
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);
  
  const techStackCategories = Object.keys(groupedSkills).length > 0
    ? Object.entries(groupedSkills).map(([category, techs]) => ({ category, techs }))
    : defaultTechStackCategories;

  return (
    <div className="recruiter-section">
      {/* Dark Hero Section */}
      <div className="recruiter-hero-dark">
        <div className="section-header-recruiter">
          <h1>Technical Excellence</h1>
          <p>World-class engineering capabilities. Proven methodologies. Enterprise-grade solutions.</p>
        </div>
      </div>

      {/* Notched Divider */}
      <SectionDivider 
        direction="center"
        fromColor="#0a0a0a"
        toColor="#f5f5f5"
        height={80}
      />

      {/* Light Content Section */}
      <div className="recruiter-content-light light-section">
        <DotMatrix density={9} interactive={true} color="rgba(0, 0, 0, 0.04)" />

        {/* Tech Stack by Category */}
        <div className="tech-stack-categorized">
          <h2>Core Technologies</h2>
          <div className="tech-categories-grid">
            {techStackCategories.map((category) => (
              <LiquidGlassCard key={category.category} className="tech-category-card" hoverEffect>
                <h3 className="tech-category-title">{category.category}</h3>
                <div className="tech-category-items">
                  {category.techs.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </div>

        {/* Approach & Philosophy */}
        <div className="approach-section">
          <h2>Development Philosophy</h2>
          <div className="approach-cards">
            <LiquidGlassCard className="approach-card" hoverEffect>
              <div className="approach-number">01</div>
              <h3>Full-Stack Mindset</h3>
              <p>Every project is approached with both frontend elegance and backend robustness in mind, ensuring seamless integration.</p>
            </LiquidGlassCard>

            <LiquidGlassCard className="approach-card" hoverEffect>
              <div className="approach-number">02</div>
              <h3>Data-Driven Decisions</h3>
              <p>Analytics and insights guide development choices, ensuring solutions are backed by real user behavior and metrics.</p>
            </LiquidGlassCard>

            <LiquidGlassCard className="approach-card" hoverEffect>
              <div className="approach-number">03</div>
              <h3>AI-Enhanced Workflow</h3>
              <p>Leveraging AI tools to accelerate development while maintaining human creativity, judgment, and quality standards.</p>
            </LiquidGlassCard>

            <LiquidGlassCard className="approach-card" hoverEffect>
              <div className="approach-number">04</div>
              <h3>User-Centered Focus</h3>
              <p>Technical decisions are always made with the end user in mind, balancing functionality, performance, and accessibility.</p>
            </LiquidGlassCard>
          </div>
        </div>

        {/* Team Members */}
        {teamMembers.length > 0 && (
          <div className="team-section-recruiter">
            <h2>Meet the Team</h2>
            <div className="team-grid-recruiter">
              {teamMembers.map((member, index) => (
                <LiquidGlassCard key={index} className="team-card-recruiter" hoverEffect>
                  {member.photoUrl && (
                    <div className="team-photo">
                      <img src={member.photoUrl} alt={member.name} />
                    </div>
                  )}
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-description">{member.description}</p>
                </LiquidGlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Resume CTA */}
        <div className="resume-cta">
          <LiquidGlassCard className="resume-cta-card">
            <div className="resume-cta-content">
              <h2>Want the Full Picture?</h2>
              <p>Download my resume for a detailed overview of experience, education, and technical background.</p>
              <PixelPerfectButton 
                variant="primary" 
                size="large"
                onClick={() => resumeLink !== "#" && window.open(resumeLink, '_blank')}
              >
                Download Resume
              </PixelPerfectButton>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </div>
  );
};

export default RecruiterSection;