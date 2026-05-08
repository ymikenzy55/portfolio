import React, { useEffect, useRef } from 'react';
import './Microbots.css';

interface MicrobotsProps {
  count?: number;
  color?: string;
  size?: number;
}

interface Bot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

/**
 * Microbots - Floating animated particles
 * Creates organic movement and depth
 */
export const Microbots: React.FC<MicrobotsProps> = ({
  count = 30,
  color = 'rgba(255, 255, 255, 0.4)',
  size = 4
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const botsRef = useRef<Bot[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize bots
    botsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: size + Math.random() * size
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      botsRef.current.forEach((bot) => {
        // Update position
        bot.x += bot.vx;
        bot.y += bot.vy;

        // Bounce off edges
        if (bot.x < 0 || bot.x > canvas.width) bot.vx *= -1;
        if (bot.y < 0 || bot.y > canvas.height) bot.vy *= -1;

        // Draw bot
        ctx.beginPath();
        ctx.arc(bot.x, bot.y, bot.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Draw connections
        botsRef.current.forEach((otherBot) => {
          const dx = bot.x - otherBot.x;
          const dy = bot.y - otherBot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(bot.x, bot.y);
            ctx.lineTo(otherBot.x, otherBot.y);
            ctx.strokeStyle = color.replace('0.4', `${0.1 * (1 - distance / 150)}`);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, color, size]);

  return <canvas ref={canvasRef} className="microbots-canvas" />;
};
