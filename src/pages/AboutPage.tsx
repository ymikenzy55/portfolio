import React, { useState, useEffect } from 'react';
import { LiquidGlassCard, TypewriterScroll, SectionDivider } from '../components/ui';
import './AboutPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  description: string;
  skills: string[];
  photoUrl: string;
  category: string;
}

/**
 * About page showing team members and company philosophy
 */
export const AboutPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    fetchTeamMembers();

    // Set up polling to refetch data every 30 seconds
    const interval = setInterval(() => {
      fetchTeamMembers();
    }, 30000); // 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(`${API_URL}/team`);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setTeamMembers(data.members || []);
    } catch (error) {
      console.error('Failed to fetch team members:', error);
      
      // Provide user-friendly error message
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.warn('Cannot connect to server. Please check if the backend is running on port 5001.');
      } else if (error instanceof Error) {
        console.warn(`Error loading team members: ${error.message}`);
      } else {
        console.warn('An unexpected error occurred while loading team members.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="about-page">
        <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.5)' }}>
          Loading team...
        </div>
      </div>
    );
  }

  return (
    <div className="about-page">
      {/* Dark Hero Section */}
      <div className="about-hero-dark">
        <div className="section-header-about">
          <h1>About Us</h1>
          <p>Meet the team behind the digital experiences</p>
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
      <div className="about-content-light light-section">
        <TypewriterScroll 
          text="Meet The Team"
          speed={80}
          as="h2"
          className="about-title"
          bidirectional={true}
        />
        
        <div className="team-grid">
          {teamMembers.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'rgba(0,0,0,0.5)' }}>
              No team members yet. Add them in the admin panel!
            </div>
          ) : (
            teamMembers.map((member, index) => (
              <div key={member._id} className={`team-member ${index % 2 === 0 ? 'member-left' : 'member-right'}`}>
                {index % 2 === 0 ? (
                  <>
                    <LiquidGlassCard className="member-image-card" hoverEffect>
                      {member.photoUrl ? (
                        <img 
                          src={member.photoUrl} 
                          alt={member.name} 
                          className="member-image"
                        />
                      ) : (
                        <div className="member-image-placeholder">
                          <span>Add photo in admin panel</span>
                        </div>
                      )}
                      <div className="member-image-overlay">
                        <h4>{member.name || 'Your Name'}</h4>
                        <p>{member.role || 'Your Role'}</p>
                      </div>
                    </LiquidGlassCard>
                    
                    <LiquidGlassCard className="member-info-card offset-right">
                      <div className="role-badge">{member.category || 'Team Member'}</div>
                      <h3>{member.role || 'Your Role'}</h3>
                      <p className="member-description">
                        {member.description || 'Add your description in the admin panel'}
                      </p>
                      <div className="skills-tags">
                        {member.skills && member.skills.length > 0 ? (
                          member.skills.map((skill, i) => <span key={i}>{skill}</span>)
                        ) : (
                          <span>Add skills in admin panel</span>
                        )}
                      </div>
                    </LiquidGlassCard>
                  </>
                ) : (
                  <>
                    <LiquidGlassCard className="member-info-card offset-left">
                      <div className="role-badge">{member.category || 'Team Member'}</div>
                      <h3>{member.role || 'Your Role'}</h3>
                      <p className="member-description">
                        {member.description || 'Add your description in the admin panel'}
                      </p>
                      <div className="skills-tags">
                        {member.skills && member.skills.length > 0 ? (
                          member.skills.map((skill, i) => <span key={i}>{skill}</span>)
                        ) : (
                          <span>Add skills in admin panel</span>
                        )}
                      </div>
                    </LiquidGlassCard>

                    <LiquidGlassCard className="member-image-card" hoverEffect>
                      {member.photoUrl ? (
                        <img 
                          src={member.photoUrl} 
                          alt={member.name} 
                          className="member-image"
                        />
                      ) : (
                        <div className="member-image-placeholder">
                          <span>Add photo in admin panel</span>
                        </div>
                      )}
                      <div className="member-image-overlay">
                        <h4>{member.name || 'Your Name'}</h4>
                        <p>{member.role || 'Your Role'}</p>
                      </div>
                    </LiquidGlassCard>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {/* Team Philosophy */}
        <LiquidGlassCard className="team-philosophy-card">
          <h3>Our Philosophy</h3>
          <p className="philosophy-text">
            Together, we bridge the gap between beautiful design and powerful functionality. 
            One crafts the experience users see, the other builds the engine that makes it work. 
            The result? Products that look great and perform even better.
          </p>
        </LiquidGlassCard>
      </div>
    </div>
  );
};

export default AboutPage;