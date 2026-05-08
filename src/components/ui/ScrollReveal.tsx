import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'slide-up' | 'clip' | 'fade';
  delay?: number;
  className?: string;
  bidirectional?: boolean; // New prop for reverse animation on scroll up
}

/**
 * Wrapper component that reveals children on scroll
 * Use this to animate any content when it comes into view
 * Set bidirectional={true} to reverse animation when scrolling up
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'slide-up',
  delay = 0,
  className = '',
  bidirectional = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (bidirectional) {
            // Animate in and out based on visibility
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
  }, [delay, isVisible, bidirectional]);

  const animationClass = animation === 'clip' 
    ? 'scroll-reveal-clip' 
    : animation === 'fade' 
    ? 'scroll-reveal-fade' 
    : 'scroll-reveal';

  return (
    <div
      ref={elementRef}
      className={`${animationClass} ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
