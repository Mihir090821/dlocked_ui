import React from 'react';

const OpportunityCard = ({ opportunity }) => {
  return (
    <div className="opportunity-card">
      <div className="opportunity-image">
        <img 
          src={opportunity.image} 
          alt={opportunity.title}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x250/${opportunity.gradient.match(/#([0-9A-F]{6})/i)?.[1] || '666666'}/white?text=${encodeURIComponent(opportunity.title)}`;
          }}
        />
      </div>
      
      <div className="opportunity-content">
        <div className="opportunity-community">
          By {opportunity.community}
        </div>
        <h3 className="opportunity-title">{opportunity.title}</h3>
        
        {/* Progress bar placeholders */}
        <div className="opportunity-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '60%' }}></div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '40%' }}></div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '80%' }}></div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '30%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
