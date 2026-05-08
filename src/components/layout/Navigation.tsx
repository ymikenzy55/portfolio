import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LiquidGlassCard } from '../ui';
import './Navigation.css';

interface NavItem {
  label: string;
  path: string;
}

interface NavigationProps {
  items: NavItem[];
}

/**
 * Navigation component with liquid glass styling
 * 
 * Features:
 * - Desktop: horizontal nav with liquid glass background
 * - Mobile (<768px): hamburger menu with slide-in drawer
 * - Highlights current section
 * - Adapts colors based on scroll position (dark/light backgrounds)
 */
export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnLightBackground, setIsOnLightBackground] = useState(false);
  const location = useLocation();
  const audienceType = sessionStorage.getItem('audienceType') as 'client' | 'recruiter' | null;

  useEffect(() => {
    const handleScroll = () => {
      // Get all light sections
      const lightSections = document.querySelectorAll('.about-section-light, .light-section, .personal-gallery-section');
      const navHeight = 100; // Approximate nav position from top
      
      let onLight = false;
      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Check if nav is over this light section
        if (rect.top <= navHeight && rect.bottom >= navHeight) {
          onLight = true;
        }
      });
      
      setIsOnLightBackground(onLight);
    };

    // Check on mount and scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('.mobile-drawer-overlay') && !target.closest('.hamburger-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const switchAudience = () => {
    const newAudience = audienceType === 'client' ? 'recruiter' : 'client';
    sessionStorage.setItem('audienceType', newAudience);
    window.location.href = '/'; // Reload to apply changes
  };

  return (
    <nav className={`navigation ${isOnLightBackground ? 'nav-on-light' : ''}`}>
      <LiquidGlassCard className="nav-container">
        {/* Desktop Navigation */}
        <div className="nav-desktop">
          <div className="nav-logo">
            <Link to="/">Portfolio</Link>
          </div>
          <ul className="nav-items">
            {items.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {audienceType && (
            <button className="switch-view-btn" onClick={switchAudience}>
              Switch to {audienceType === 'client' ? 'Recruiter' : 'Client'} View
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="nav-mobile">
          <div className="nav-logo">
            <Link to="/">Portfolio</Link>
          </div>
          <button 
            className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            type="button"
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </LiquidGlassCard>

      {/* Mobile Menu Drawer - Outside of nav container for better positioning */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-overlay">
          <div className="mobile-drawer">
            <LiquidGlassCard className="drawer-content">
              <ul className="mobile-nav-items">
                {items.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path}
                      className={location.pathname === item.path ? 'active' : ''}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {audienceType && (
                <button className="switch-view-btn mobile" onClick={switchAudience}>
                  Switch to {audienceType === 'client' ? 'Recruiter' : 'Client'} View
                </button>
              )}
            </LiquidGlassCard>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;