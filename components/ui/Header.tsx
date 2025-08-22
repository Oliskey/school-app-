
import React, { useState } from 'react';
import { LogoutIcon, ChevronLeftIcon, NotificationIcon } from '../../constants';

interface HeaderProps {
  title: string;
  avatarUrl: string;
  bgColor: string;
  onLogout?: () => void;
  onBack?: () => void;
  onNotificationClick?: () => void;
  notificationCount?: number;
}

const Header: React.FC<HeaderProps> = ({ title, avatarUrl, bgColor, onLogout, onBack, onNotificationClick, notificationCount }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const Avatar = () => (
    <div className="w-12 h-12 rounded-full bg-white/30 p-1 flex-shrink-0">
      <img src={avatarUrl} alt="avatar" className="rounded-full w-full h-full object-cover" />
    </div>
  );

  return (
    <header className={`${bgColor} text-white p-6 pb-16 rounded-b-3xl relative z-10 print:hidden`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 min-w-0">
          {onBack && (
            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/10" aria-label="Go back">
              <ChevronLeftIcon className="h-7 w-7 text-white" />
            </button>
          )}
          <h1 className="text-3xl font-bold truncate">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          {onNotificationClick && (
            <button onClick={onNotificationClick} className="relative p-2 rounded-full hover:bg-white/10" aria-label={`View notifications. ${notificationCount || 0} unread.`}>
              <NotificationIcon className="h-7 w-7 text-white" />
              {notificationCount && notificationCount > 0 && (
                <span className="absolute top-1 right-1 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold border-2 border-white">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>
          )}
          {onLogout ? (
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} aria-expanded={isDropdownOpen} aria-haspopup="true" aria-label="Open user menu">
              <Avatar />
            </button>
          ) : (
            <Avatar />
          )}
        </div>
      </div>
       {isDropdownOpen && onLogout && (
          <div 
            className="absolute right-6 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
          >
            <button
              onClick={onLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <LogoutIcon className="mr-3 h-5 w-5 text-gray-500" />
              <span>Logout</span>
            </button>
          </div>
        )}
    </header>
  );
};

export default Header;