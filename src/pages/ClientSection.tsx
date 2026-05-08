import React, { useState, useEffect } from 'react';
import { LiquidGlassCard, PixelPerfectButton, DotMatrix, SectionDivider } from '../components/ui';
import './ClientSection.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface Project {
  _id: string;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  outcome?: string;
  technologies: string[];
  category?: string;
  aiWorkflow?: string;
  featured?: boolean;
  previewImage?: string;
  liveLink?: string;
  repoLink?: string;
}

/**
 * ClientSection component with creative masonry layout
 */
export const ClientSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    fetchProjects();

    // Set up polling to refetch data every 30 seconds
    const interval = setInterval(() => {
      fetchProjects();
    }, 30000); // 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/projects?audience=client`);
      const data = await response.json();
      setProjects(data.data || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const featuredProject = projects.find(p => p.featured) || projects[0];
  const regularProjects = projects.filter(p => p._id !== featuredProject?._id);

  if (isLoading) {
    return (
      <div className="client-section">
        <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.5)' }}>
          Loading projects...
        </div>
      </div>
    );
  }

  return (
    <div className="client-section">
      {/* Dark Hero Section */}
      <div className="client-hero-dark">
        <div className="section-header-creative">
          <h1>Enterprise Solutions</h1>
          <p>Delivering scalable, secure, and innovative technology solutions for Fortune 500 companies.</p>
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
      <div className="client-content-light light-section">
        <DotMatrix density={10} interactive={true} color="rgba(0, 0, 0, 0.04)" />

        {/* Featured Project - Large Spotlight */}
        {featuredProject && (
        <div className="featured-project-container">
          <LiquidGlassCard className="featured-project-card" hoverEffect>
            <div className="featured-badge">Featured</div>
            <div className="featured-content">
              {featuredProject.previewImage ? (
                <img src={featuredProject.previewImage} alt={featuredProject.title} className="featured-image" />
              ) : (
                <div className="featured-image-placeholder">
                  <span>{featuredProject.title}</span>
                </div>
              )}
              <div className="featured-info">
                <h2>{featuredProject.title}</h2>
                <p className="featured-description">{featuredProject.description}</p>
                <div className="featured-tech">
                  {featuredProject.technologies.map(tech => (
                    <span key={tech} className="tech-pill">{tech}</span>
                  ))}
                </div>
                <div className="featured-links">
                  {featuredProject.liveLink && (
                    <PixelPerfectButton 
                      variant="primary" 
                      size="medium"
                      onClick={() => window.open(featuredProject.liveLink, '_blank')}
                    >
                      View Live
                    </PixelPerfectButton>
                  )}
                  {featuredProject.repoLink && (
                    <PixelPerfectButton 
                      variant="secondary" 
                      size="medium"
                      onClick={() => window.open(featuredProject.repoLink, '_blank')}
                    >
                      View Code
                    </PixelPerfectButton>
                  )}
                </div>
              </div>
            </div>
          </LiquidGlassCard>
        </div>
        )}

        {/* Other Projects - Masonry Grid */}
        <div className="projects-masonry">
          {regularProjects.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.5)' }}>
              No projects yet. Create some in the admin panel!
            </div>
          ) : (
            regularProjects.map((project, index) => (
              <LiquidGlassCard 
                key={project._id}
                className={`project-card-masonry ${index % 3 === 0 ? 'tall' : ''}`}
                hoverEffect
                onClick={() => setSelectedProject(project)}
              >
                {project.previewImage ? (
                  <img src={project.previewImage} alt={project.title} className="project-image" />
                ) : (
                  <div className="project-image-placeholder">
                    <span>{project.title}</span>
                  </div>
                )}
                <div className="project-card-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech-tags">
                    {project.technologies.slice(0, 2).map(tech => (
                      <span key={tech}>{tech}</span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span className="more">+{project.technologies.length - 2}</span>
                    )}
                  </div>
                </div>
              </LiquidGlassCard>
            ))
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <LiquidGlassCard className="project-modal-content" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
            
            <h2>{selectedProject.title}</h2>
            
            <div className="modal-sections">
              <div className="modal-section">
                <h4>The Challenge</h4>
                <p>{selectedProject.problem}</p>
              </div>
              
              <div className="modal-section">
                <h4>The Solution</h4>
                <p>{selectedProject.solution}</p>
              </div>
              
              <div className="modal-section">
                <h4>The Impact</h4>
                <p>{selectedProject.outcome}</p>
              </div>

              {selectedProject.aiWorkflow && (
                <div className="modal-section ai-section">
                  <h4>AI-Enhanced Workflow</h4>
                  <p>{selectedProject.aiWorkflow}</p>
                </div>
              )}
            </div>

            <div className="modal-tech">
              <h4>Technologies</h4>
              <div className="modal-tech-list">
                {selectedProject.technologies.map(tech => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>

            {(selectedProject.liveLink || selectedProject.repoLink) && (
              <div className="modal-actions">
                {selectedProject.liveLink && (
                  <PixelPerfectButton 
                    variant="primary" 
                    size="medium"
                    onClick={() => window.open(selectedProject.liveLink, '_blank')}
                  >
                    Live Demo
                  </PixelPerfectButton>
                )}
                {selectedProject.repoLink && (
                  <PixelPerfectButton 
                    variant="secondary" 
                    size="medium"
                    onClick={() => window.open(selectedProject.repoLink, '_blank')}
                  >
                    Source Code
                  </PixelPerfectButton>
                )}
              </div>
            )}
          </LiquidGlassCard>
        </div>
      )}
    </div>
  );
};

export default ClientSection;