import React from 'react';
import './PixelPerfectButton.css';

export interface ButtonProps {
  variant: "primary" | "secondary" | "ghost";
  size: "small" | "medium" | "large";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Pixel-perfect button component with consistent sizing and hover states
 * 
 * Sizes:
 * - small: 32px height, 12px padding
 * - medium: 40px height, 16px padding  
 * - large: 48px height, 24px padding
 * 
 * Corner radius: 8px
 * Hover: subtle scale(1.02) + shadow increase
 * Press: scale(0.98)
 */
export const PixelPerfectButton: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  onClick,
  disabled = false,
  className = ""
}) => {
  return (
    <button
      className={`pixel-perfect-button ${variant} ${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PixelPerfectButton;