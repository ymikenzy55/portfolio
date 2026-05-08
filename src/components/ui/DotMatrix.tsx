import React, { useEffect, useRef } from 'react';
import './DotMatrix.css';

interface DotMatrixProps {
  density?: number; // dots per 100px
  color?: string;
  interactive?: boolean; // dots react to cursor
  className?: string;
}

export const DotMatrix: React.FC<DotMatrixProps> = ({
  density = 20,
  color = 'rgba(255, 255, 255, 0.15)',
  interactive = true,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Calculate grid
    const spacing = 100 / density;
    const cols = Math.ceil(canvas.width / spacing);
    const rows = Math.ceil(canvas.height / spacing);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          // Calculate distance from mouse
          let radius = 1.5;
          let opacity = 0.15;

          if (interactive) {
            const dx = mousePos.current.x - x;
            const dy = mousePos.current.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;

            if (distance < maxDistance) {
              const influence = 1 - distance / maxDistance;
              radius = 1.5 + influence * 2;
              opacity = 0.15 + influence * 0.4;
            }
          }

          // Draw dot
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = color.replace(/[\d.]+\)$/, `${opacity})`);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationId);
    };
  }, [density, color, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`dot-matrix ${className}`}
    />
  );
};
