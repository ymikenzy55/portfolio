import React, { useEffect, useState, useRef } from 'react';
import './AnimatedText.css';

interface AnimatedTextProps {
  text: string;
  animation: "clip-path-reveal" | "fade-in" | "slide-up";
  delay?: number;
  className?: string;
  triggerOnScroll?: boolean;
  bidirectional?: boolean; // New prop for reverse animation
}

/**
 * Animated text component with various reveal animations
 * 
 * Animations:
 * - clip-path-reveal: animates from clip-path: inset(0 100% 0 0) to inset(0 0 0 0)
 * - fade-in: opacity transition
 * - slide-up: transform translateY transition
 * 
 * Can trigger on mount or on scroll into view
 * Set bidirectional={true} to reverse animation when scrolling up
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  animation,
  delay = 0,
  className = "",
  triggerOnScroll = false,
  bidirectional = true
}) => {
  const [isVisible, setIsVisible] = useState(!triggerOnScroll);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!triggerOnScroll) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }

    // Scroll-based trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (bidirectional) {
            // Animate in and out
            if (entry.isIntersecting) {
              setTimeout(() => {
                setIsVisible(true);
              }, delay);
            } else {
              setIsVisible(false);
            }
          } else {
            // Only animate in once
            if (entry.isIntersecting && !isVisible) {
              setTimeout(() => {
                setIsVisible(true);
              }, delay);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, triggerOnScroll, isVisible, bidirectional]);

  return (
    <span 
      ref={elementRef}
      className={`animated-text ${animation} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {text}
    </span>
  );
};

export default AnimatedText;