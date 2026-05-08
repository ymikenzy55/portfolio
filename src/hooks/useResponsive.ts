import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/utils/constants';
import { debounce } from '@/utils';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

interface UseResponsiveReturn {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
}

/**
 * Custom hook for responsive design
 * Provides current breakpoint and screen dimensions
 */
export function useResponsive(): UseResponsiveReturn {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const getBreakpoint = (width: number): Breakpoint => {
    if (width < BREAKPOINTS.mobile) {
      return 'mobile';
    }
    if (width < BREAKPOINTS.tablet) {
      return 'tablet';
    }
    return 'desktop';
  };

  const breakpoint = getBreakpoint(dimensions.width);

  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
    width: dimensions.width,
    height: dimensions.height,
  };
}