import React from 'react';
import { 
  Search as SearchIcon, 
  Notifications as NotificationsIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useAuth } from '../../../utils/hooks/useAuth';
import UserAvatar from '../../../utils/components/Commen/UserAvatar';


const Header = ({ onToggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="brand-logo">
          project<span className="brand-highlight">(z)</span>
        </div>
      </div>
      
      <div className="header-center">
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search for communities and opportunities"
            className="search-input"
          />
          <button className="search-button">
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="header-right">
        <button className="notification-btn">
          <NotificationsIcon />
        </button>
        
        <button className="create-community-btn">
          Create Community
        </button>

        <div className="user-menu">
          <UserAvatar 
            src={user?.profileImage || 'https://via.placeholder.com/40/6c5ce7/white?text=U'}
            alt={user?.name || 'User'}
            size="medium"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
