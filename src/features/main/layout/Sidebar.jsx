import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import ExploreIcon from '@mui/icons-material/AutoFixHigh';
import MessageIcon from '@mui/icons-material/ChatBubbleOutline';
import CollapseIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import profileImage from '../../../assets/images/user/user.png';

const Sidebar = ({ collapsed, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: 'discover',
      label: 'Discover',
      icon: <ExploreIcon />,
      path: '/discover',
      active: location.pathname === '/discover'
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <MessageIcon />,
      path: '/messages',
      active: location.pathname === '/messages'
    },
    {
      id: 'collapse',
      label: 'Collapse',
      icon: <CollapseIcon className={collapsed ? 'rotated' : ''} />,
      isCollapse: true,
      onClick: onToggleCollapse
    }
  ];

  const myCommunities = [
    {
      id: 'among-us',
      name: 'Among Us',
      icon: profileImage,
      color: '#e74c3c'
    },
    {
      id: 'pubg-pc',
      name: 'PUBG PC',
      icon: profileImage,
      color: '#f39c12'
    }
  ];

  const joinedCommunities = [
    {
      id: 'facebook',
      name: 'Facebook daily Jobs',
      icon: profileImage,
      color: '#3b5998'
    },
    {
      id: 'midjourney',
      name: 'MidJourney AI',
      icon: profileImage,
      color: '#9b59b6'
    },
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      icon: profileImage,
      color: '#00a67e'
    },
    {
      id: 'valorant',
      name: 'Valorant',
      icon: profileImage,
      color: '#ff4655'
    },
    {
      id: 'eleven-labs',
      name: 'Eleven Labs',
      icon: profileImage,
      color: '#2ecc71'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: profileImage,
      color: '#00bcf2'
    },
    {
      id: 'adobe',
      name: 'Adobe',
      icon: profileImage,
      color: '#ff0000'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: profileImage,
      color: '#007aff'
    },
    {
      id: 'android',
      name: 'Android',
      icon: profileImage,
      color: '#3ddc84'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: profileImage,
      color: '#333'
    },
    {
      id: 'figma',
      name: 'Figma',
      icon: profileImage,
      color: '#f24e1e'
    }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <nav className="sidebar-nav">
        {/* Main Navigation Items */}
        <div className="nav-section main-navigation">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${item.active ? 'active' : ''}`}
              onClick={item.isCollapse ? item.onClick : () => navigate(item.path)}
              title={collapsed ? item.label : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </div>

        <div className="community-separator"></div>

        {/* Scrollable Communities Section */}
        <div className="communities-container">
          {/* My Communities - Always Rendered */}
          <div className="nav-section">
            {!collapsed && <div className="section-header">MY COMMUNITIES</div>}
            {myCommunities.map(community => (
              <button
                key={community.id}
                className="nav-item community-item"
                onClick={() => navigate(`/community/${community.id}`)}
                title={community.name}
              >
                <img
                  src={community.icon}
                  alt={community.name}
                  className="community-avatar"
                />
                {!collapsed && <span className="nav-label">{community.name}</span>}
              </button>
            ))}
          </div>

          {/* Visual Separator for Collapsed State */}
          {collapsed && myCommunities.length > 0 && joinedCommunities.length > 0 && (
            <div className="community-separator"></div>
          )}

          {/* Joined Communities - Always Rendered */}
          <div className="nav-section">
            {!collapsed && <div className="section-header">JOINED COMMUNITIES</div>}
            {joinedCommunities.map(community => (
              <button
                key={community.id}
                className="nav-item community-item"
                onClick={() => navigate(`/community/${community.id}`)}
                title={community.name}
              >
                <img
                  src={community.icon}
                  alt={community.name}
                  className="community-avatar"
                />
                {!collapsed && <span className="nav-label">{community.name}</span>}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
