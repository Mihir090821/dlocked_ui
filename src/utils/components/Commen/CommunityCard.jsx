import React from 'react';
import { ArrowForward } from '@mui/icons-material';

const CommunityCard = ({ community }) => {
  return (
    <div className="community-card">
      <div 
        className="community-header"
        style={{ background: community.gradient }}
      >
      </div>
          <img 
            src={community.icon} 
            alt={community.name}
            className="community-icon-large"
          />
      
      <div className="community-content">
        <h3 className="community-name">{community.name}</h3>
        <p className="community-description">{community.description}</p>

        <div className="community-card-separator"></div>
        
        <div className="community-footer">
          <div className="member-info">
            <span className="members-label">Members</span>
            <span className="members-count">{community.members}</span>
          </div>
          
          <button className="join-btn">
            <ArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
