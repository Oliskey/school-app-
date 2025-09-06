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
  const [imageError, setImageError] = useState(false);

  const Avatar = () => (
    <div className="w-12 h-12 rounded-full bg-white/30 p-1 flex-shrink-0">
      {imageError ? (
        <div className="rounded-full w-full h-full bg-gray-200 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      ) : (
        <img 
          src={avatarUrl} 
          alt="avatar" 
          className="rounded-full w-full h-full object-cover" 
          onError={() => setImageError(true)}
        />
      )}
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
              <NotificationIcon className="h-6 w-6 text-white" />
              {notificationCount && notificationCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 border-2 border-white text-white text-[10px] flex items-center justify-center font-bold">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>
          )}
          {onLogout && (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="focus:outline-none"
                aria-label="User menu"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                <Avatar />
              </button>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        onLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogoutIcon className="mr-2 h-4 w-4" />
                        Logout
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;