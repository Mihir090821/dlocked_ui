import React from 'react';

const CommunityIcon = ({ icon, color, size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'community-icon-small',
    medium: 'community-icon-medium',
    large: 'community-icon-large'
  };

  return (
    <div 
      className={`community-icon ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: color }}
    >
      <span>{icon}</span>
    </div>
  );
};

export default CommunityIcon;
