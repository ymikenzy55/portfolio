import React, { useState, useEffect } from 'react';
import { LiquidGlassCard, DotMatrix, SectionDivider } from '../components/ui';
import './ProcessPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

/**
 * ProcessPage component displaying workflow process
 */
export const ProcessPage: React.FC = () => {
  const [processData, setProcessData] = useState({
    title: 'Our Process',
    subtitle: 'From concept to deployment, powered by AI and human expertise',
    steps: [
      { step: 1, title: "Discovery", description: "Understanding your needs" },
      { step: 2, title: "Design", description: "Creating the blueprint" },
      { step: 3, title: "Development", description: "Building the solution" },
      { step: 4, title: "Deployment", description: "Launching your project" }
    ]
  });

  useEffect(() => {
    // Initial fetch
    fetchProcessData();

    // Set up polling to refetch data every 30 seconds
    const interval = setInterval(() => {
      fetchProcessData();
    }, 30000); // 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const fetchProcessData = async () => {
    try {
      const response = await fetch(`${API_URL}/site-content`);
      const data = await response.json();
      if (data.content?.process) {
        setProcessData(data.content.process);
      }
    } catch (error) {
      console.error('Failed to fetch process data:', error);
    }
  };

  return (
    <div className="process-page">
      {/* Dark Hero Section */}
      <div className="process-hero-dark">
        <div className="section-header">
          <h1 className="section-title">{processData.title}</h1>
          <p className="section-subtitle">{processData.subtitle}</p>
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
      <div className="process-content-light light-section">
        <DotMatrix density={8} interactive={false} color="rgba(0, 0, 0, 0.03)" />

      {/* Creative Workflow Layout */}
      <div className="workflow-creative">
        <div className="workflow-steps-grid">
          {processData.steps.map((step) => (
            <LiquidGlassCard 
              key={step.step}
              className="step-card-creative"
              hoverEffect
            >
              <div className="step-number-creative">{step.step}</div>
              <div className="step-content-creative">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>

      {/* AI Philosophy - Centered Feature */}
      <div className="philosophy-feature">
        <LiquidGlassCard className="philosophy-card-large">
          <h2>AI as a Creative Partner</h2>
          <div className="philosophy-grid">
            <div className="philosophy-point">
              <h4>Enhanced, Not Replaced</h4>
              <p>AI amplifies human creativity rather than replacing judgment and decision-making.</p>
            </div>
            <div className="philosophy-point">
              <h4>Strategic Application</h4>
              <p>Applied where it adds value: layout exploration, code generation, optimization.</p>
            </div>
            <div className="philosophy-point">
              <h4>Human-Centered Results</h4>
              <p>Every output is reviewed, refined, and validated to meet quality standards.</p>
            </div>
          </div>
        </LiquidGlassCard>
      </div>

      {/* Benefits - Asymmetric Grid */}
      <div className="benefits-asymmetric">
        <h2>Why This Approach Works</h2>
        <div className="benefits-grid-creative">
          <LiquidGlassCard className="benefit-card-large" hoverEffect>
            <h3>Faster Iteration</h3>
            <p>AI-assisted exploration allows for rapid prototyping and testing of multiple design directions.</p>
          </LiquidGlassCard>

          <LiquidGlassCard className="benefit-card-small" hoverEffect>
            <h3>Higher Quality</h3>
            <p>More time for refinement leads to better experiences.</p>
          </LiquidGlassCard>

          <LiquidGlassCard className="benefit-card-small" hoverEffect>
            <h3>Continuous Learning</h3>
            <p>Each project incorporates new capabilities.</p>
          </LiquidGlassCard>

          <LiquidGlassCard className="benefit-card-large" hoverEffect>
            <h3>Scalable Solutions</h3>
            <p>Efficient workflows enable handling complex projects while maintaining attention to detail and quality.</p>
          </LiquidGlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessPage;