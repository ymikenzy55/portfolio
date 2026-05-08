import React from 'react';
import { LiquidGlassCard } from '../ui';
import './LiquidGlassCardTest.css';

/**
 * Test component to demonstrate and verify LiquidGlassCard functionality
 */
export const LiquidGlassCardTest: React.FC = () => {
  return (
    <div className="liquid-glass-test">
      <h2 className="text-headline-3">LiquidGlassCard Component Test</h2>
      
      <div className="test-grid">
        {/* Default card */}
        <div className="test-item">
          <h3 className="text-headline-6">Default Card</h3>
          <LiquidGlassCard>
            <div className="card-content">
              <h4>Default Glass Card</h4>
              <p>This card uses default blur (10px), opacity (0.1), and shadow values.</p>
            </div>
          </LiquidGlassCard>
        </div>

        {/* High blur card */}
        <div className="test-item">
          <h3 className="text-headline-6">High Blur</h3>
          <LiquidGlassCard blur={20} opacity={0.15}>
            <div className="card-content">
              <h4>High Blur Card</h4>
              <p>This card has increased blur (20px) and opacity (0.15) for a stronger glass effect.</p>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Low opacity card */}
        <div className="test-item">
          <h3 className="text-headline-6">Low Opacity</h3>
          <LiquidGlassCard blur={8} opacity={0.05}>
            <div className="card-content">
              <h4>Subtle Glass Card</h4>
              <p>This card has reduced blur (8px) and opacity (0.05) for a more subtle effect.</p>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Hover effect card */}
        <div className="test-item">
          <h3 className="text-headline-6">Hover Effect</h3>
          <LiquidGlassCard hoverEffect={true}>
            <div className="card-content">
              <h4>Interactive Glass Card</h4>
              <p>This card has hover effects enabled. Try hovering over it to see the glass morphing animation.</p>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Custom shadow card */}
        <div className="test-item">
          <h3 className="text-headline-6">Custom Shadow</h3>
          <LiquidGlassCard 
            shadow="0 16px 64px rgba(100, 200, 255, 0.2)"
            hoverEffect={true}
          >
            <div className="card-content">
              <h4>Accent Shadow Card</h4>
              <p>This card uses a custom shadow with accent color for a unique glow effect.</p>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Clickable card */}
        <div className="test-item">
          <h3 className="text-headline-6">Clickable Card</h3>
          <LiquidGlassCard 
            hoverEffect={true}
            onClick={() => alert('Glass card clicked!')}
            className="clickable-card"
          >
            <div className="card-content">
              <h4>Clickable Glass Card</h4>
              <p>This card is clickable and will show an alert when clicked. It also has custom styling via className.</p>
            </div>
          </LiquidGlassCard>
        </div>
      </div>

      <div className="test-notes">
        <h3 className="text-headline-6">Component Features Tested:</h3>
        <ul>
          <li>✅ Default blur, opacity, and shadow values</li>
          <li>✅ Configurable blur intensity</li>
          <li>✅ Configurable background opacity</li>
          <li>✅ Custom shadow effects</li>
          <li>✅ Hover effect with glass morphing</li>
          <li>✅ Click handling</li>
          <li>✅ Custom className support</li>
          <li>✅ Backdrop filter blur effect</li>
          <li>✅ RGBA transparency</li>
          <li>✅ Border and transition animations</li>
        </ul>
      </div>
    </div>
  );
};

export default LiquidGlassCardTest;