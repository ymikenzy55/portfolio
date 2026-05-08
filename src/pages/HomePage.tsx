import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedText, PixelPerfectButton, LiquidGlassCard, DotMatrix } from '../components/ui';
import './HomePage.css';

/**
 * HomePage component - Landing page with audience choice
 * Users choose between Client or Recruiter view
 */
export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleClientClick = () => {
    navigate('/recent-works');
  };

  const handleRecruiterClick = () => {
    navigate('/recruiters');
  };

  return (
    <div className="home-page">
      {/* Hero Section - Dark */}
      <section className="hero-section-dark">
        <DotMatrix density={12} interactive={true} color="rgba(255, 255, 255, 0.08)" />
        <div className="hero-content">
          <AnimatedText 
            text="Big Tech Company"
            animation="clip-path-reveal"
            className="hero-headline"
          />
          
          <AnimatedText 
            text="Delivering enterprise-grade digital solutions with cutting-edge technology and innovative design"
            animation="fade-in"
            delay={500}
            className="hero-tagline"
          />

          <AnimatedText 
            text="Trusted by Fortune 500 companies worldwide"
            animation="slide-up"
            delay={1000}
            className="hero-ai-mention"
          />

          <div className="dual-cta">
            <LiquidGlassCard className="cta-card" hoverEffect>
              <div className="cta-content">
                <h3>For Clients</h3>
                <p>Explore our enterprise solutions and successful project implementations</p>
                <PixelPerfectButton 
                  variant="primary" 
                  size="large"
                  onClick={handleClientClick}
                >
                  View Our Works
                </PixelPerfectButton>
              </div>
            </LiquidGlassCard>

            <LiquidGlassCard className="cta-card" hoverEffect>
              <div className="cta-content">
                <h3>For Recruiters</h3>
                <p>Discover our technical expertise, team capabilities, and development methodologies</p>
                <PixelPerfectButton 
                  variant="secondary" 
                  size="large"
                  onClick={handleRecruiterClick}
                >
                  View Expertise
                </PixelPerfectButton>
              </div>
            </LiquidGlassCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;