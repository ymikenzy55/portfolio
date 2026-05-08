import React from 'react';
import './ResponsiveGrid.css';

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap: 8 | 16 | 24; // matches spacing grid
  className?: string;
}

/**
 * Responsive grid component using CSS Grid
 * 
 * Breakpoints:
 * - Mobile: < 768px
 * - Tablet: 768px - 1024px  
 * - Desktop: > 1024px
 * 
 * Gap values match the 8/16/24px spacing grid
 */
export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns,
  gap,
  className = ""
}) => {
  const gridStyle = {
    '--mobile-columns': columns.mobile,
    '--tablet-columns': columns.tablet,
    '--desktop-columns': columns.desktop,
    '--grid-gap': `${gap}px`
  } as React.CSSProperties;

  return (
    <div 
      className={`responsive-grid ${className}`}
      style={gridStyle}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid;