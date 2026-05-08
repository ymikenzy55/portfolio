import React, { useState, useEffect } from 'react';
import { LiquidGlassCard, PixelPerfectButton, DotMatrix, SectionDivider, TypewriterScroll } from '../components/ui';
import './RecentWorksPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface RecentWork {
  _id: string;
  title: string;
  description: string;
  client: string;
  industry: string;
  technologies: string[];
  completedDate: string;
  projectType: string;
  results: string;
  imageUrl?: string;
  featured: boolean;
  status: string;
}

/**
 * Recent Works page showing latest company projects and achievements
 */
export const RecentWorksPage: React.FC = () => {
  const [recentWorks, setRecentWorks] = useState<RecentWork[]>([]);
  const [selectedWork, setSelectedWork] = useState<RecentWork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'ai' | 'design'>('all');

  useEffect(() => {
    // Initial fetch
    fetchRecentWorks();

    // Set up polling to refetch data every 30 seconds
    const interval = setInterval(() => {
      fetchRecentWorks();
    }, 30000); // 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const fetchRecentWorks = async () => {
    try {
      const response = await fetch(`${API_URL}/projects?status=active`);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setRecentWorks(data.data || []);
    } catch (error) {
      console.error('Failed to fetch recent works:', error);
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.warn('Cannot connect to server. Please check if the backend is running on port 5001.');
      } else if (error instanceof Error) {
        console.warn(`Error loading recent works: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredWorks = filter === 'all' 
    ? recentWorks 
    : recentWorks.filter(work => work.projectType === filter);

  const featuredWork = recentWorks.find(work => work.featured);

  if (isLoading) {
    return (
      <div className="recent-works-page">
        <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.5)' }}>
          Loading recent works...
        </div>
      </div>
    );
  }

  return (
    <div className="recent-works-page">
      {/* Dark Hero Section */}
      <div className="works-hero-dark">
        <DotMatrix density={8} interactive={true} color="rgba(255, 255, 255, 0.06)" />
        <div className="section-header-works">
          <h1>Recent Works</h1>
          <p>Showcasing our latest enterprise solutions and successful project deliveries</p>
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
      <div className="works-content-light light-section">
        <DotMatrix density={10} interactive={true} color="rgba(0, 0, 0, 0.04)" />

        {/* Filter Tabs */}
        <div className="works-filters">
          <div className="filter-tabs">
            {[
              { key: 'all', label: 'All Projects' },
              { key: 'web', label: 'Web Applications' },
              { key: 'mobile', label: 'Mobile Solutions' },
              { key: 'ai', label: 'AI & Machine Learning' },
              { key: 'design', label: 'Design Systems' }
            ].map(tab => (
              <button
                key={tab.key}
                className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
                onClick={() => setFilter(tab.key as typeof filter)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Work */}
        {featuredWork && (
          <div className="featured-work-section">
            <TypewriterScroll 
              text="Featured Project"
              speed={80}
              as="h2"
              className="section-title"
              bidirectional={true}
            />
            
            <LiquidGlassCard className="featured-work-card" hoverEffect>
              <div className="featured-badge">Featured</div>
              <div className="featured-work-content">
                {featuredWork.imageUrl ? (
                  <img src={featuredWork.imageUrl} alt={featuredWork.title} className="featured-work-image" />
                ) : (
                  <div className="featured-work-placeholder">
                    <span>{featuredWork.title}</span>
                  </div>
                )}
                <div className="featured-work-info">
                  <div className="work-meta">
                    <span className="client-name">{featuredWork.client}</span>
                    <span className="industry-tag">{featuredWork.industry}</span>
                  </div>
                  <h2>{featuredWork.title}</h2>
                  <p className="work-description">{featuredWork.description}</p>
                  <div className="work-technologies">
                    {featuredWork.technologies.map(tech => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                  <div className="work-results">
                    <h4>Results Achieved</h4>
                    <p>{featuredWork.results}</p>
                  </div>
                  <PixelPerfectButton 
                    variant="primary" 
                    size="medium"
                    onClick={() => setSelectedWork(featuredWork)}
                  >
                    View Case Study
                  </PixelPerfectButton>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        )}

        {/* Recent Works Grid */}
        <div className="recent-works-section">
          <TypewriterScroll 
            text="Latest Deliveries"
            speed={80}
            as="h2"
            className="section-title"
            bidirectional={true}
          />

          <div className="works-grid">
            {filteredWorks.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'rgba(0,0,0,0.5)' }}>
                No recent works found. Add them in the admin panel!
              </div>
            ) : (
              filteredWorks
                .filter(work => work._id !== featuredWork?._id)
                .map((work) => (
                  <LiquidGlassCard 
                    key={work._id} 
                    className="work-card" 
                    hoverEffect
                    onClick={() => setSelectedWork(work)}
                  >
                    {work.imageUrl ? (
                      <img src={work.imageUrl} alt={work.title} className="work-image" />
                    ) : (
                      <div className="work-image-placeholder">
                        <span>{work.title}</span>
                      </div>
                    )}
                    <div className="work-card-content">
                      <div className="work-meta">
                        <span className="client-name">{work.client}</span>
                        <span className="completion-date">
                          {new Date(work.completedDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                          })}
                        </span>
                      </div>
                      <h3>{work.title}</h3>
                      <p className="work-description">{work.description}</p>
                      <div className="work-tech-tags">
                        {work.technologies.slice(0, 3).map(tech => (
                          <span key={tech}>{tech}</span>
                        ))}
                        {work.technologies.length > 3 && (
                          <span className="more">+{work.technologies.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </LiquidGlassCard>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Work Detail Modal */}
      {selectedWork && (
        <div className="work-modal-overlay" onClick={() => setSelectedWork(null)}>
          <LiquidGlassCard className="work-modal-content" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedWork(null)}>×</button>
            
            <div className="modal-header">
              <div className="work-meta">
                <span className="client-name">{selectedWork.client}</span>
                <span className="industry-tag">{selectedWork.industry}</span>
              </div>
              <h2>{selectedWork.title}</h2>
            </div>
            
            <div className="modal-sections">
              <div className="modal-section">
                <h4>Project Overview</h4>
                <p>{selectedWork.description}</p>
              </div>
              
              <div className="modal-section">
                <h4>Results Achieved</h4>
                <p>{selectedWork.results}</p>
              </div>

              <div className="modal-section">
                <h4>Technologies Used</h4>
                <div className="modal-tech-list">
                  {selectedWork.technologies.map(tech => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h4>Project Details</h4>
                <div className="project-details">
                  <div className="detail-item">
                    <strong>Industry:</strong> {selectedWork.industry}
                  </div>
                  <div className="detail-item">
                    <strong>Project Type:</strong> {selectedWork.projectType}
                  </div>
                  <div className="detail-item">
                    <strong>Completed:</strong> {new Date(selectedWork.completedDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </LiquidGlassCard>
        </div>
      )}
    </div>
  );
};

export default RecentWorksPage;