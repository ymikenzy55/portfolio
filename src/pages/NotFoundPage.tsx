import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PixelPerfectButton, DotMatrix } from '../components/ui';
import './NotFoundPage.css';

/**
 * 404 Not Found page with creative design
 */
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <DotMatrix density={15} interactive={true} color="rgba(255, 255, 255, 0.08)" />
      
      <div className="not-found-content">
        <div className="error-code">
          <span className="glitch" data-text="404">404</span>
        </div>
        
        <h1>Page Not Found</h1>
        <p className="error-message">
          Looks like this page took a wrong turn. Let's get you back on track.
        </p>

        <div className="not-found-actions">
          <PixelPerfectButton 
            variant="primary" 
            size="large"
            onClick={() => navigate('/')}
          >
            Back to Home
          </PixelPerfectButton>
          
          <PixelPerfectButton 
            variant="secondary" 
            size="large"
            onClick={() => navigate(-1)}
          >
            Go Back
          </PixelPerfectButton>
        </div>

        <div className="helpful-links">
          <p>Or try these:</p>
          <div className="link-grid">
            <button onClick={() => navigate('/clients')} className="quick-link">
              View Projects
            </button>
            <button onClick={() => navigate('/recruiters')} className="quick-link">
              View Skills
            </button>
            <button onClick={() => navigate('/process')} className="quick-link">
              Our Process
            </button>
            <button onClick={() => navigate('/contact')} className="quick-link">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
