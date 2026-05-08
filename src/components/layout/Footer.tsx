import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

interface FooterProps {
  className?: string;
}

/**
 * Footer component with dynamic split design
 * Black/white contrast with asymmetric layout
 */
export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${className}`}>
      <div className="footer-split">
        {/* Left Side - Black */}
        <div className="footer-left">
          <div className="footer-left-content">
            <h2 className="footer-brand">Let's Build Something</h2>
            <p className="footer-tagline">
              Ready to bring your ideas to life? Let's talk about your next project.
            </p>
            
            <div className="footer-contact-primary">
              <a href="mailto:hello@portfolio.com" className="footer-email">
                hello@portfolio.com
              </a>
              <span className="footer-status">● Available for projects</span>
            </div>

            <div className="footer-social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - White */}
        <div className="footer-right">
          <div className="footer-right-content">
            <div className="footer-nav-section">
              <h4>Navigate</h4>
              <nav className="footer-nav">
                <Link to="/" className="footer-nav-link">
                  <span className="footer-nav-arrow">→</span>
                  <span>Home</span>
                </Link>
                <Link to="/clients" className="footer-nav-link">
                  <span className="footer-nav-arrow">→</span>
                  <span>Projects</span>
                </Link>
                <Link to="/recruiters" className="footer-nav-link">
                  <span className="footer-nav-arrow">→</span>
                  <span>Skills</span>
                </Link>
                <Link to="/process" className="footer-nav-link">
                  <span className="footer-nav-arrow">→</span>
                  <span>Process</span>
                </Link>
                <Link to="/articles" className="footer-nav-link">
                  <span className="footer-nav-arrow">→</span>
                  <span>Articles</span>
                </Link>
                <Link to="/contact" className="footer-nav-link">
                  <span className="footer-nav-arrow">→</span>
                  <span>Contact</span>
                </Link>
              </nav>
            </div>

            <div className="footer-meta">
              <div className="footer-tech-badge">
                <span>Built with React + TypeScript</span>
                <span>Enhanced with AI</span>
              </div>
              <p className="footer-copyright">
                © {currentYear} Portfolio. Crafted with precision.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal Divider */}
      <div className="footer-divider"></div>
    </footer>
  );
};

export default Footer;
