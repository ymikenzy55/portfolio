import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Microbots } from './Microbots';
import './AudienceChoice.css';

interface AudienceChoiceProps {
  onChoice: (audience: 'client' | 'recruiter') => void;
}

export const AudienceChoice: React.FC<AudienceChoiceProps> = ({ onChoice }) => {
  const navigate = useNavigate();

  const handleChoice = (audience: 'client' | 'recruiter') => {
    onChoice(audience);
    navigate(audience === 'client' ? '/clients' : '/recruiters');
  };

  return (
    <div className="audience-choice">
      <Microbots count={25} color="rgba(255, 255, 255, 0.3)" size={3} />
      <div className="choice-content">
        <h1 className="choice-title">I am a...</h1>
        <div className="choice-buttons">
          <button 
            className="choice-button client-button"
            onClick={() => handleChoice('client')}
          >
            <span className="button-label">Client</span>
            <span className="button-subtitle">Looking for a developer</span>
          </button>
          <button 
            className="choice-button recruiter-button"
            onClick={() => handleChoice('recruiter')}
          >
            <span className="button-label">Recruiter</span>
            <span className="button-subtitle">Evaluating candidates</span>
          </button>
        </div>
      </div>
    </div>
  );
};
