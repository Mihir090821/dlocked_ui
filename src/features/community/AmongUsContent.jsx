import React, { useState } from 'react';
import '../../assets/css/community.css';


const AmongUsContent = () => {
  const [activeChannel, setActiveChannel] = useState('general');

  const channels = {
    announcements: [
      { id: 'announcements', name: 'Announcements', icon: '📢' },
      { id: 'opportunities', name: 'Opportunities', icon: '📋' }
    ],
    discussions: [
      { id: 'general', name: 'General', icon: '#' },
      { id: 'music-room', name: 'Music Room', icon: '🔊' },
      { id: 'imposters-corner', name: "Impostor's Corner", icon: '👹' }
    ]
  };

  return (
    <div className="amongus-main-container">
      {/* Channel Sidebar */}
      <div className="amongus-channel-sidebar">
        <div className="amongus-server-header">
          <div className="amongus-server-info">
            <div className="amongus-server-icon">🚀</div>
            <div className="amongus-server-details">
              <h3>Among Us</h3>
              <div className="amongus-server-description">
                Community for "Among Us" Discussions and Updates
              </div>
            </div>
          </div>
          
          <div className="amongus-member-info">
            👥 4,360 Members
            <div className="amongus-online-dot"></div>
            243 Active
          </div>
          
          <div className="amongus-server-url">
            🌐 www.amongus.com
          </div>
        </div>

        <div className="amongus-channels">
          <div className="amongus-channel-category">
            <div className="amongus-category-title">📢 Announcements</div>
            {channels.announcements.map(channel => (
              <div 
                key={channel.id}
                className={`amongus-channel ${activeChannel === channel.id ? 'active' : ''}`}
                onClick={() => setActiveChannel(channel.id)}
              >
                <div className="amongus-channel-icon">{channel.icon}</div>
                {channel.name}
              </div>
            ))}
          </div>

          <div className="amongus-channel-category">
            <div className="amongus-category-title">💬 Discussions</div>
            {channels.discussions.map(channel => (
              <div 
                key={channel.id}
                className={`amongus-channel ${activeChannel === channel.id ? 'active' : ''}`}
                onClick={() => setActiveChannel(channel.id)}
              >
                <div className="amongus-channel-icon">{channel.icon}</div>
                {channel.name}
              </div>
            ))}
          </div>

          <button className="amongus-new-channel-btn">
            New Discussion Channel
          </button>
        </div>
      </div>

      {/* Main Content Panel */}
      <div className="amongus-content-panel">
        <div className="amongus-content-header">
          <div className="amongus-content-title">
            <div className="amongus-title-icon">🚀</div>
            <div className="amongus-title-text">Among Us</div>
          </div>
          
          <div className="amongus-header-actions">
            <div className="amongus-member-count">
              👥 4,360 Members
              <div className="amongus-online-dot"></div>
              243 Active
            </div>
            
            <div className="amongus-url">🌐 www.amongus.com</div>
            
            <div className="amongus-social-icons">
              <button className="amongus-social-icon">📷</button>
              <button className="amongus-social-icon">📘</button>
              <button className="amongus-social-icon">💼</button>
              <button className="amongus-social-icon">🔗</button>
              <button className="amongus-social-icon">📺</button>
            </div>
            
            <button className="amongus-action-btn secondary">Share</button>
            <button className="amongus-action-btn primary">Edit Details</button>
          </div>
        </div>

        <div className="amongus-content-body">
          <div className="amongus-highlights">
            <div className="amongus-highlights-header">
              <h3 className="amongus-highlights-title">Highlights</h3>
              <div className="amongus-nav-controls">
                <button className="amongus-nav-btn">←</button>
                <button className="amongus-nav-btn">→</button>
              </div>
            </div>
            
            <div className="amongus-highlights-grid">
              <div className="amongus-highlight-card">
                <div className="amongus-highlight-image">
                  Gaming Session
                </div>
              </div>
              <div className="amongus-highlight-card">
                <div className="amongus-highlight-image">
                  Controller Setup
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmongUsContent;
