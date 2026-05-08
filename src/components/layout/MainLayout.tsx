import React, { useMemo } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from './SEO';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Main layout wrapper with consistent spacing and typography
 * Includes navigation and provides structure for all pages
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const audienceType = sessionStorage.getItem('audienceType') as 'client' | 'recruiter' | null;

  const navItems = useMemo(() => {
    const baseItems = [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Our Works', path: '/recent-works' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'Process', path: '/process' },
      { label: 'Contact', path: '/contact' },
    ];

    // Add audience-specific nav items
    if (audienceType === 'client') {
      return [
        { label: 'Home', path: '/' },
        { label: 'Our Works', path: '/recent-works' },
        { label: 'Solutions', path: '/clients' },
        { label: 'About', path: '/about' },
        { label: 'Gallery', path: '/gallery' },
        { label: 'Process', path: '/process' },
        { label: 'Contact', path: '/contact' },
      ];
    } else if (audienceType === 'recruiter') {
      return [
        { label: 'Home', path: '/' },
        { label: 'Our Works', path: '/recent-works' },
        { label: 'Expertise', path: '/recruiters' },
        { label: 'About', path: '/about' },
        { label: 'Gallery', path: '/gallery' },
        { label: 'Process', path: '/process' },
        { label: 'Contact', path: '/contact' },
      ];
    }

    return baseItems;
  }, [audienceType]);

  return (
    <div className="main-layout">
      <SEO />
      <Navigation items={navItems} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;