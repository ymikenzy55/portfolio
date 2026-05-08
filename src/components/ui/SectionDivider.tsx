import React from 'react';
import './SectionDivider.css';

interface SectionDividerProps {
  direction?: 'left' | 'right' | 'center';
  fromColor?: string;
  toColor?: string;
  height?: number;
}

/**
 * Sharp notched divider between sections with different backgrounds
 * Creates a sophisticated geometric cut effect with angular notches
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
  direction = 'left',
  fromColor = '#0a0a0a',
  toColor = '#ffffff',
  height = 80
}) => {
  return (
    <div 
      className={`section-divider ${direction}`}
      style={{
        height: `${height}px`,
        background: fromColor
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="divider-svg"
      >
        {direction === 'left' && (
          // Notches on left side, smooth on right
          <polygon
            points="0,0 60,0 90,30 150,30 180,0 1200,0 1200,120 0,120"
            fill={toColor}
          />
        )}
        {direction === 'right' && (
          // Smooth on left, notches on right side
          <polygon
            points="0,0 1020,0 1050,30 1110,30 1140,0 1200,0 1200,120 0,120"
            fill={toColor}
          />
        )}
        {direction === 'center' && (
          // Notches on both sides
          <polygon
            points="0,0 60,0 90,30 150,30 180,0 1020,0 1050,30 1110,30 1140,0 1200,0 1200,120 0,120"
            fill={toColor}
          />
        )}
      </svg>
    </div>
  );
};

