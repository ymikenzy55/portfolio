import React from 'react';
import './LiquidGlassCard.css';

export interface LiquidGlassCardProps {
  children: React.ReactNode;
  blur?: number; // default: 10px
  opacity?: number; // default: 0.1
  shadow?: string; // default: "0 8px 32px rgba(0,0,0,0.1)"
  hoverEffect?: boolean; // enables glass morphing on hover
  className?: string;
  onClick?: ((e: React.MouseEvent) => void) | (() => void);
}

/**
 * Base component for all card-style elements with liquid glass styling
 * Applies backdrop-filter: blur() and uses rgba backgrounds for transparency
 */
export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  blur = 10,
  opacity = 0.1,
  shadow = "0 8px 32px rgba(0,0,0,0.1)",
  hoverEffect = false,
  className = "",
  onClick
}) => {
  const cardStyle = {
    backdropFilter: `blur(${blur}px)`,
    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    boxShadow: shadow,
  };

  return (
    <div 
      className={`liquid-glass-card ${hoverEffect ? 'hover-effect' : ''} ${className}`}
      style={cardStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default LiquidGlassCard;