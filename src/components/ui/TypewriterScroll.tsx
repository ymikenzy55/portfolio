import React, { useEffect, useRef, useState } from 'react';

interface TypewriterScrollProps {
  text: string;
  speed?: number; // milliseconds per character
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  bidirectional?: boolean;
}

/**
 * Typewriter effect that triggers on scroll
 * Text types out character by character when scrolled into view
 * Reverses when scrolling back up if bidirectional is true
 */
export const TypewriterScroll: React.FC<TypewriterScrollProps> = ({
  text,
  speed = 50,
  className = '',
  as: Component = 'p',
  bidirectional = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else if (bidirectional) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
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
  }, [bidirectional]);

  useEffect(() => {
    if (isVisible) {
      // Type forward
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    } else if (bidirectional) {
      // Type backward (erase) - only if we have text to erase
      setDisplayText('');
    }
    
    return undefined;
  }, [isVisible, text, speed, bidirectional]);

  return (
    <Component ref={elementRef as any} className={className}>
      {displayText}
      {isVisible && displayText.length < text.length && (
        <span className="typewriter-cursor">|</span>
      )}
    </Component>
  );
};
