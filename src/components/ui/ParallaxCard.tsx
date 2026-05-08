import React, { useRef, useState } from 'react';
import './ParallaxCard.css';

interface ParallaxCardProps {
  children: React.ReactNode;
  intensity?: number; // 0-1, controls parallax strength
  cursorSheen?: boolean; // enables cursor-linked sheen effect
  className?: string;
}

/**
 * Parallax card component with 3D hover effects and optional cursor sheen
 * 
 * Features:
 * - 3D transform on hover based on cursor position
 * - Optional sheen overlay that follows cursor
 * - Configurable parallax intensity
 */
export const ParallaxCard: React.FC<ParallaxCardProps> = ({
  children,
  intensity = 0.5,
  cursorSheen = false,
  className = ""
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [sheenPosition, setSheenPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation based on cursor position
    const rotateX = ((y - centerY) / centerY) * -10 * intensity;
    const rotateY = ((x - centerX) / centerX) * 10 * intensity;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`);

    // Update sheen position if enabled
    if (cursorSheen) {
      setSheenPosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
  };

  return (
    <div
      ref={cardRef}
      className={`parallax-card ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {cursorSheen && (
        <div
          className="cursor-sheen"
          style={{
            left: sheenPosition.x - 100,
            top: sheenPosition.y - 100,
          }}
        />
      )}
    </div>
  );
};

export default ParallaxCard;