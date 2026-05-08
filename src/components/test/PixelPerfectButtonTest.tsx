import React from 'react';
import { PixelPerfectButton } from '../ui';
import './PixelPerfectButtonTest.css';

/**
 * Test component to demonstrate and verify PixelPerfectButton functionality
 */
export const PixelPerfectButtonTest: React.FC = () => {
  const handleClick = (variant: string, size: string) => {
    // eslint-disable-next-line no-console
    console.log(`${variant} ${size} button clicked!`);
  };

  return (
    <div className="button-test">
      <h2 className="text-headline-3">PixelPerfectButton Component Test</h2>
      
      {/* Size variations */}
      <div className="test-section">
        <h3 className="text-headline-5">Size Variations</h3>
        <div className="button-row">
          <div className="button-group">
            <h4 className="text-headline-6">Small (32px height, 12px padding)</h4>
            <PixelPerfectButton 
              variant="primary" 
              size="small"
              onClick={() => handleClick('primary', 'small')}
            >
              Small Button
            </PixelPerfectButton>
          </div>
          
          <div className="button-group">
            <h4 className="text-headline-6">Medium (40px height, 16px padding)</h4>
            <PixelPerfectButton 
              variant="primary" 
              size="medium"
              onClick={() => handleClick('primary', 'medium')}
            >
              Medium Button
            </PixelPerfectButton>
          </div>
          
          <div className="button-group">
            <h4 className="text-headline-6">Large (48px height, 24px padding)</h4>
            <PixelPerfectButton 
              variant="primary" 
              size="large"
              onClick={() => handleClick('primary', 'large')}
            >
              Large Button
            </PixelPerfectButton>
          </div>
        </div>
      </div>

      {/* Variant styles */}
      <div className="test-section">
        <h3 className="text-headline-5">Variant Styles</h3>
        <div className="button-row">
          <div className="button-group">
            <h4 className="text-headline-6">Primary</h4>
            <PixelPerfectButton 
              variant="primary" 
              size="medium"
              onClick={() => handleClick('primary', 'medium')}
            >
              Primary Button
            </PixelPerfectButton>
          </div>
          
          <div className="button-group">
            <h4 className="text-headline-6">Secondary</h4>
            <PixelPerfectButton 
              variant="secondary" 
              size="medium"
              onClick={() => handleClick('secondary', 'medium')}
            >
              Secondary Button
            </PixelPerfectButton>
          </div>
          
          <div className="button-group">
            <h4 className="text-headline-6">Ghost</h4>
            <PixelPerfectButton 
              variant="ghost" 
              size="medium"
              onClick={() => handleClick('ghost', 'medium')}
            >
              Ghost Button
            </PixelPerfectButton>
          </div>
        </div>
      </div>

      {/* Interactive states */}
      <div className="test-section">
        <h3 className="text-headline-5">Interactive States</h3>
        <div className="button-row">
          <div className="button-group">
            <h4 className="text-headline-6">Normal State</h4>
            <PixelPerfectButton 
              variant="primary" 
              size="medium"
              onClick={() => handleClick('normal', 'medium')}
            >
              Hover & Click Me
            </PixelPerfectButton>
            <p className="text-body-small">Hover: scale(1.02) + shadow increase</p>
            <p className="text-body-small">Press: scale(0.98)</p>
          </div>
          
          <div className="button-group">
            <h4 className="text-headline-6">Disabled State</h4>
            <PixelPerfectButton 
              variant="primary" 
              size="medium"
              disabled={true}
            >
              Disabled Button
            </PixelPerfectButton>
            <p className="text-body-small">Opacity: 0.5, no interactions</p>
          </div>
        </div>
      </div>

      {/* All combinations grid */}
      <div className="test-section">
        <h3 className="text-headline-5">All Combinations</h3>
        <div className="combinations-grid">
          {(['primary', 'secondary', 'ghost'] as const).map(variant => (
            <div key={variant} className="variant-column">
              <h4 className="text-headline-6 variant-title">{variant.charAt(0).toUpperCase() + variant.slice(1)}</h4>
              {(['small', 'medium', 'large'] as const).map(size => (
                <PixelPerfectButton
                  key={`${variant}-${size}`}
                  variant={variant}
                  size={size}
                  onClick={() => handleClick(variant, size)}
                  className="combo-button"
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </PixelPerfectButton>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="test-notes">
        <h3 className="text-headline-6">Component Features Tested:</h3>
        <ul>
          <li>✅ Three sizes: small (32px), medium (40px), large (48px)</li>
          <li>✅ Three variants: primary, secondary, ghost</li>
          <li>✅ Consistent 8px corner radius</li>
          <li>✅ Hover effect: scale(1.02) + shadow increase</li>
          <li>✅ Press effect: scale(0.98)</li>
          <li>✅ Disabled state with opacity and no interactions</li>
          <li>✅ CSS variables integration</li>
          <li>✅ Liquid glass design system consistency</li>
          <li>✅ Proper spacing using design system grid</li>
          <li>✅ Typography scale integration</li>
          <li>✅ Accessibility with focus states</li>
          <li>✅ Click handling and event propagation</li>
        </ul>
      </div>
    </div>
  );
};

export default PixelPerfectButtonTest;