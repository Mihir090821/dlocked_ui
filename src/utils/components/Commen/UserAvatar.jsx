import React from 'react';

const UserAvatar = ({ src, alt, size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'avatar-small',
    medium: 'avatar-medium',
    large: 'avatar-large'
  };

  return (
    <div className={`user-avatar ${sizeClasses[size]} ${className}`}>
      <img 
        src={src} 
        alt={alt}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/40/6c5ce7/white?text=U';
        }}
      />
    </div>
  );
};

export default UserAvatar;
