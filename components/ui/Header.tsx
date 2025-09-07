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
    <div className="w-11 h-11 rounded-full bg-white/30 p-0.5 flex-shrink-0 ring-2 ring-white/50 shadow-md">
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
    <header className={`${bgColor} text-white p-5 pb-14 rounded-b-3xl relative z-10 print:hidden transition-all duration-300 shadow-lg`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 min-w-0">
          {onBack && (
            <button onClick={onBack} className="p-2 -ml-1 rounded-full hover:bg-white/25 transition-all duration-300 transform hover:scale-105 shadow-sm" aria-label="Go back">
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </button>
          )}
          <h1 className="text-2xl font-bold truncate">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          {onNotificationClick && (
            <button onClick={onNotificationClick} className="relative p-2 rounded-full hover:bg-white/25 transition-all duration-300 transform hover:scale-105 shadow-sm" aria-label={`View notifications. ${notificationCount || 0} unread.`}>
              <NotificationIcon className="h-6 w-6 text-white" />
              {notificationCount && notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 block h-6 w-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 border-2 border-white text-white text-xs flex items-center justify-center font-bold animate-pulse shadow-md">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>
          )}
          {onLogout && (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full transition-all duration-300 transform hover:scale-105"
                aria-label="User menu"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                <Avatar />
              </button>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-52 rounded-2xl shadow-xl bg-white ring-1 ring-black ring-opacity-10 focus:outline-none z-50 animate-fade-in-up border border-gray-100">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        onLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-5 py-3 text-base text-gray-700 hover:bg-gray-50 rounded-xl mx-2 transition-all duration-200 flex items-center font-medium"
                    >
                      <div className="flex items-center">
                        <LogoutIcon className="mr-3 h-5 w-5 text-gray-500" />
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