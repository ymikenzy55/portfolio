import React from 'react';
import { AnimatedText } from '../ui';
import './AnimatedTextTest.css';

/**
 * Test component for AnimatedText with all animation types
 */
export const AnimatedTextTest: React.FC = () => {
  return (
    <div className="animated-text-test">
      <h1>AnimatedText Component Test</h1>
      
      <div className="test-section">
        <h2>Clip-path Reveal Animation</h2>
        <div className="test-item">
          <AnimatedText 
            text="This text reveals with clip-path animation"
            animation="clip-path-reveal"
            delay={0}
          />
        </div>
        <div className="test-item">
          <AnimatedText 
            text="This text has a 500ms delay"
            animation="clip-path-reveal"
            delay={500}
          />
        </div>
      </div>

      <div className="test-section">
        <h2>Fade-in Animation</h2>
        <div className="test-item">
          <AnimatedText 
            text="This text fades in smoothly"
            animation="fade-in"
            delay={0}
          />
        </div>
        <div className="test-item">
          <AnimatedText 
            text="This text fades in with 300ms delay"
            animation="fade-in"
            delay={300}
          />
        </div>
      </div>

      <div className="test-section">
        <h2>Slide-up Animation</h2>
        <div className="test-item">
          <AnimatedText 
            text="This text slides up from below"
            animation="slide-up"
            delay={0}
          />
        </div>
        <div className="test-item">
          <AnimatedText 
            text="This text slides up with 400ms delay"
            animation="slide-up"
            delay={400}
          />
        </div>
      </div>

      <div className="test-section">
        <h2>Staggered Headlines</h2>
        <div className="staggered-headlines">
          <AnimatedText 
            text="Professional"
            animation="clip-path-reveal"
            delay={0}
            className="headline-large"
          />
          <AnimatedText 
            text="Text"
            animation="clip-path-reveal"
            delay={200}
            className="headline-large"
          />
          <AnimatedText 
            text="Animations"
            animation="clip-path-reveal"
            delay={400}
            className="headline-large"
          />
        </div>
        
        <AnimatedText 
          text="Subtle, professional animations that enhance user experience without distraction"
          animation="fade-in"
          delay={800}
          className="subtitle"
        />
      </div>

      <div className="test-section">
        <h2>Custom Styling</h2>
        <div className="test-item">
          <AnimatedText 
            text="Custom styled animated text"
            animation="slide-up"
            delay={0}
            className="custom-style"
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedTextTest;