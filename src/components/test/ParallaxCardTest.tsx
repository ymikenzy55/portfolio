import React from 'react';
import { ParallaxCard, LiquidGlassCard } from '../ui';
import './ParallaxCardTest.css';

/**
 * Test component for ParallaxCard with various configurations
 * Demonstrates 3D hover effects and cursor sheen functionality
 */
export const ParallaxCardTest: React.FC = () => {
  return (
    <div className="parallax-card-test">
      <h1>ParallaxCard Component Test</h1>
      <p>Hover over the cards to see 3D parallax effects and cursor sheen</p>
      
      <div className="test-grid">
        {/* Basic ParallaxCard with default settings */}
        <div className="test-section">
          <h2>Default Settings (intensity: 0.5, no sheen)</h2>
          <ParallaxCard>
            <LiquidGlassCard className="demo-card">
              <div className="card-content">
                <h3>Default Parallax</h3>
                <p>Intensity: 0.5</p>
                <p>Cursor Sheen: Disabled</p>
                <div className="demo-image">🎯</div>
              </div>
            </LiquidGlassCard>
          </ParallaxCard>
        </div>

        {/* ParallaxCard with cursor sheen */}
        <div className="test-section">
          <h2>With Cursor Sheen</h2>
          <ParallaxCard cursorSheen>
            <LiquidGlassCard className="demo-card">
              <div className="card-content">
                <h3>Sheen Effect</h3>
                <p>Intensity: 0.5</p>
                <p>Cursor Sheen: Enabled</p>
                <div className="demo-image">✨</div>
              </div>
            </LiquidGlassCard>
          </ParallaxCard>
        </div>

        {/* High intensity parallax */}
        <div className="test-section">
          <h2>High Intensity (0.8)</h2>
          <ParallaxCard intensity={0.8} cursorSheen>
            <LiquidGlassCard className="demo-card">
              <div className="card-content">
                <h3>High Intensity</h3>
                <p>Intensity: 0.8</p>
                <p>Cursor Sheen: Enabled</p>
                <div className="demo-image">🚀</div>
              </div>
            </LiquidGlassCard>
          </ParallaxCard>
        </div>

        {/* Low intensity parallax */}
        <div className="test-section">
          <h2>Low Intensity (0.2)</h2>
          <ParallaxCard intensity={0.2} cursorSheen>
            <LiquidGlassCard className="demo-card">
              <div className="card-content">
                <h3>Subtle Effect</h3>
                <p>Intensity: 0.2</p>
                <p>Cursor Sheen: Enabled</p>
                <div className="demo-image">🌙</div>
              </div>
            </LiquidGlassCard>
          </ParallaxCard>
        </div>

        {/* Maximum intensity */}
        <div className="test-section">
          <h2>Maximum Intensity (1.0)</h2>
          <ParallaxCard intensity={1.0} cursorSheen>
            <LiquidGlassCard className="demo-card">
              <div className="card-content">
                <h3>Maximum Effect</h3>
                <p>Intensity: 1.0</p>
                <p>Cursor Sheen: Enabled</p>
                <div className="demo-image">⚡</div>
              </div>
            </LiquidGlassCard>
          </ParallaxCard>
        </div>

        {/* Project card simulation */}
        <div className="test-section">
          <h2>Project Card Simulation</h2>
          <ParallaxCard intensity={0.5} cursorSheen>
            <LiquidGlassCard className="demo-card project-simulation">
              <div className="project-image-demo">
                <div className="placeholder-image">📱</div>
              </div>
              <div className="project-info-demo">
                <h3>Sample Project</h3>
                <p>A demonstration of how ParallaxCard works with project cards</p>
                <div className="tech-tags-demo">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">TypeScript</span>
                  <span className="tech-tag">CSS</span>
                </div>
              </div>
            </LiquidGlassCard>
          </ParallaxCard>
        </div>
      </div>

      <div className="test-info">
        <h2>Component Features</h2>
        <ul>
          <li>✅ 3D transform on hover based on cursor position</li>
          <li>✅ Optional cursor-linked sheen overlay</li>
          <li>✅ Configurable parallax intensity (0-1)</li>
          <li>✅ Smooth transitions and professional animations</li>
          <li>✅ Integration with LiquidGlassCard</li>
          <li>✅ Responsive and accessible</li>
        </ul>
      </div>
    </div>
  );
};

export default ParallaxCardTest;