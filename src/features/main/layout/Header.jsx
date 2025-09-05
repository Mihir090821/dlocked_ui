import React from 'react';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  
} from '@mui/icons-material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAuth } from '../../../utils/hooks/useAuth';
import { useTheme } from '../../../utils/hooks/useTheme';
import UserAvatar from '../../../utils/components/Commen/UserAvatar';

import profileImage from '../../../assets/images/user/user.png';
import SearchBar from '../../../utils/components/Commen/Search';


const Header = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const {toggleTheme,isDarkMode}=useTheme();

  
  return (
    <header className="app-header">
      {/* Left Side - Only Logo */}
      <div className="header-left">
        <div className="brand-logo">
          project<span className="brand-highlight">(z)</span>
        </div>
      </div>

      {/* Right Side - Search with External Icon, Separator, Other Elements */}
      <div className="header-right">
        {/* <div className="search-container">
          <input
            type="text"
            placeholder="Search for communities and opportunities"
            className="search-input"
          />
        </div> */}
        <SearchBar  placeholder="Search for communities and opportunities"/>

        <button className="search-btn">
          <SearchIcon />
        </button>

        {/* Vertical Separator Line */}
        <div className="header-separator"></div>

        <button className="notification-btn" onClick={toggleTheme}>
          {isDarkMode  ? <LightModeIcon /> : <DarkModeIcon/>}
        </button>

        <button className="notification-btn">
          {<NotificationsIcon />}
        </button>

        <button className="create-community-btn">
          New Community
        </button>

        <div className="user-menu">
          <UserAvatar
            src={user?.profileImage || profileImage}
            alt={user?.name || 'User'}
            size="medium"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
