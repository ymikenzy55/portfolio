import React, { useState } from 'react';
import { AnimatedText } from '../ui';
import { PixelPerfectButton } from '../ui';
import './AnimatedTextDemo.css';

/**
 * Interactive demo for AnimatedText component
 * Tests all animation types and features
 */
export const AnimatedTextDemo: React.FC = () => {
  const [resetKey, setResetKey] = useState(0);
  const [selectedAnimation, setSelectedAnimation] = useState<"clip-path-reveal" | "fade-in" | "slide-up">("clip-path-reveal");

  const resetAnimations = () => {
    setResetKey(prev => prev + 1);
  };

  const animationTypes: Array<"clip-path-reveal" | "fade-in" | "slide-up"> = [
    "clip-path-reveal",
    "fade-in", 
    "slide-up"
  ];

  return (
    <div className="animated-text-demo">
      <div className="demo-header">
        <h1>AnimatedText Component Demo</h1>
        <p>Interactive demonstration of all animation types and features</p>
      </div>

      <div className="demo-controls">
        <div className="animation-selector">
          <h3>Select Animation Type:</h3>
          <div className="button-group">
            {animationTypes.map(type => (
              <PixelPerfectButton
                key={type}
                variant={selectedAnimation === type ? "primary" : "secondary"}
                size="medium"
                onClick={() => setSelectedAnimation(type)}
              >
                {type.replace('-', ' ')}
              </PixelPerfectButton>
            ))}
          </div>
        </div>
        
        <PixelPerfectButton
          variant="ghost"
          size="medium"
          onClick={resetAnimations}
        >
          Reset Animations
        </PixelPerfectButton>
      </div>

      <div className="demo-showcase" key={resetKey}>
        <div className="showcase-section">
          <h2>Selected Animation: {selectedAnimation}</h2>
          <div className="demo-text-large">
            <AnimatedText 
              text="Professional Text Animation"
              animation={selectedAnimation}
              delay={0}
              className="showcase-headline"
            />
          </div>
          <div className="demo-text-medium">
            <AnimatedText 
              text="Subtle, professional animations that enhance user experience"
              animation={selectedAnimation}
              delay={300}
              className="showcase-subtitle"
            />
          </div>
        </div>

        <div className="showcase-section">
          <h2>Staggered Animation Demo</h2>
          <div className="staggered-demo">
            <AnimatedText 
              text="Staggered"
              animation="clip-path-reveal"
              delay={0}
              className="stagger-word"
            />
            <AnimatedText 
              text="Text"
              animation="clip-path-reveal"
              delay={200}
              className="stagger-word"
            />
            <AnimatedText 
              text="Reveals"
              animation="clip-path-reveal"
              delay={400}
              className="stagger-word"
            />
          </div>
          <AnimatedText 
            text="Each word appears with a 200ms delay for smooth, professional timing"
            animation="fade-in"
            delay={800}
            className="stagger-description"
          />
        </div>

        <div className="showcase-section">
          <h2>All Animation Types</h2>
          <div className="all-animations">
            <div className="animation-example">
              <h4>Clip-path Reveal</h4>
              <AnimatedText 
                text="Text reveals from right to left using clip-path"
                animation="clip-path-reveal"
                delay={0}
                className="example-text"
              />
            </div>
            
            <div className="animation-example">
              <h4>Fade In</h4>
              <AnimatedText 
                text="Text fades in with subtle upward movement"
                animation="fade-in"
                delay={200}
                className="example-text"
              />
            </div>
            
            <div className="animation-example">
              <h4>Slide Up</h4>
              <AnimatedText 
                text="Text slides up from below with opacity transition"
                animation="slide-up"
                delay={400}
                className="example-text"
              />
            </div>
          </div>
        </div>

        <div className="showcase-section">
          <h2>Real-world Usage Examples</h2>
          <div className="usage-examples">
            <div className="usage-example hero-example">
              <h4>Hero Section</h4>
              <AnimatedText 
                text="Full-Stack Developer"
                animation="clip-path-reveal"
                delay={0}
                className="hero-title"
              />
              <AnimatedText 
                text="Building exceptional digital experiences with modern technologies"
                animation="fade-in"
                delay={500}
                className="hero-subtitle"
              />
            </div>
            
            <div className="usage-example section-example">
              <h4>Section Headers</h4>
              <AnimatedText 
                text="Featured Projects"
                animation="clip-path-reveal"
                delay={0}
                className="section-title"
              />
              <AnimatedText 
                text="Showcasing innovative solutions and technical expertise"
                animation="slide-up"
                delay={300}
                className="section-description"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="demo-specs">
        <h2>Technical Specifications</h2>
        <div className="specs-grid">
          <div className="spec-item">
            <h4>Animation Duration</h4>
            <p>0.8s with cubic-bezier(0.4, 0, 0.2, 1) easing</p>
          </div>
          <div className="spec-item">
            <h4>Clip-path Reveal</h4>
            <p>From inset(0 100% 0 0) to inset(0 0 0 0)</p>
          </div>
          <div className="spec-item">
            <h4>Performance</h4>
            <p>GPU-accelerated with will-change optimization</p>
          </div>
          <div className="spec-item">
            <h4>Accessibility</h4>
            <p>Respects prefers-reduced-motion settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTextDemo;