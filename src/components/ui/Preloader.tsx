import React, { useEffect, useState } from 'react';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 2 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2000);

    // Complete after exit animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`preloader ${isExiting ? 'exiting' : ''}`}>
      <div className="preloader-content">
        <h1 className="preloader-title">Welcome</h1>
        <div className="preloader-spinner"></div>
      </div>
    </div>
  );
};
