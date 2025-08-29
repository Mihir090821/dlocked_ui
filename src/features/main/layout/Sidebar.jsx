import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Explore as ExploreIcon,
  Message as MessageIcon,
  KeyboardArrowLeft as CollapseIcon
} from '@mui/icons-material';

const Sidebar = ({ collapsed }) => {
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
    }
  ];

  const myCommunities = [
    {
      id: 'among-us',
      name: 'Among Us',
      icon: 'https://via.placeholder.com/32/e74c3c/white?text=AU',
      color: '#e74c3c'
    },
    {
      id: 'pubg-pc',
      name: 'PUBG PC',
      icon: 'https://via.placeholder.com/32/f39c12/white?text=PG',
      color: '#f39c12'
    }
  ];

  const joinedCommunities = [
    { 
      id: 'facebook', 
      name: 'Facebook daily Jobs', 
      icon: 'https://via.placeholder.com/32/3b5998/white?text=FB',
      color: '#3b5998' 
    },
    { 
      id: 'midjourney', 
      name: 'MidJourney AI', 
      icon: 'https://via.placeholder.com/32/9b59b6/white?text=MJ',
      color: '#9b59b6' 
    },
    { 
      id: 'chatgpt', 
      name: 'ChatGPT', 
      icon: 'https://via.placeholder.com/32/00a67e/white?text=CG',
      color: '#00a67e' 
    },
    { 
      id: 'valorant', 
      name: 'Valorant', 
      icon: 'https://via.placeholder.com/32/ff4655/white?text=VL',
      color: '#ff4655' 
    },
    { 
      id: 'eleven-labs', 
      name: 'Eleven Labs', 
      icon: 'https://via.placeholder.com/32/2ecc71/white?text=EL',
      color: '#2ecc71' 
    },
    { 
      id: 'microsoft', 
      name: 'Microsoft', 
      icon: 'https://via.placeholder.com/32/00bcf2/white?text=MS',
      color: '#00bcf2' 
    },
    { 
      id: 'adobe', 
      name: 'Adobe', 
      icon: 'https://via.placeholder.com/32/ff0000/white?text=AD',
      color: '#ff0000' 
    },
    { 
      id: 'apple', 
      name: 'Apple', 
      icon: 'https://via.placeholder.com/32/007aff/white?text=AP',
      color: '#007aff' 
    },
    { 
      id: 'android', 
      name: 'Android', 
      icon: 'https://via.placeholder.com/32/3ddc84/white?text=AN',
      color: '#3ddc84' 
    },
    { 
      id: 'github', 
      name: 'GitHub', 
      icon: 'https://via.placeholder.com/32/333/white?text=GH',
      color: '#333' 
    },
    { 
      id: 'figma', 
      name: 'Figma', 
      icon: 'https://via.placeholder.com/32/f24e1e/white?text=FG',
      color: '#f24e1e' 
    }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <nav className="sidebar-nav">
        {/* Main Menu Items */}
        <div className="nav-section">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${item.active ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Collapse Button */}
        {!collapsed && (
          <div className="nav-section">
            <button className="nav-item collapse-btn">
              <CollapseIcon className="nav-icon" />
              <span className="nav-label">Collapse</span>
            </button>
          </div>
        )}

        {/* My Communities */}
        {!collapsed && (
          <div className="nav-section">
            <div className="section-header">MY COMMUNITIES</div>
            {myCommunities.map(community => (
              <button
                key={community.id}
                className="nav-item community-item"
                onClick={() => navigate(`/community/${community.id}`)}
              >
                <img 
                  src={community.icon} 
                  alt={community.name}
                  className="community-avatar"
                />
                <span className="nav-label">{community.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Joined Communities */}
        {!collapsed && (
          <div className="nav-section">
            <div className="section-header">JOINED COMMUNITIES</div>
            <div className="community-list">
              {joinedCommunities.map(community => (
                <button
                  key={community.id}
                  className="nav-item community-item"
                  onClick={() => navigate(`/community/${community.id}`)}
                >
                  <img 
                    src={community.icon} 
                    alt={community.name}
                    className="community-avatar"
                  />
                  <span className="nav-label">{community.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
