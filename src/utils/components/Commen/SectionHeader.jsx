import React from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const SectionHeader = ({ icon, title, subtitle, showNavigation = false }) => {
  return (
    <div className="section-header">
      <div className="section-info">
        <div className="section-title">
          <span className="section-icon">{icon}</span>
          <h2>{title}</h2>
        </div>
        <p className="section-subtitle">{subtitle}</p>
      </div>
      
      {showNavigation && (
        <div className="section-navigation">
          <button className="nav-btn">
            <ChevronLeft />
          </button>
          <button className="nav-btn">
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
