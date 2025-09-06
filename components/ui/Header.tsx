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
    <div className="w-10 h-10 rounded-full bg-white/30 p-0.5 flex-shrink-0">
      {imageError ? (
        <div className="rounded-full w-full h-full bg-gray-200 flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
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
    <header className={`${bgColor} text-white p-4 pb-12 rounded-b-2xl relative z-10 print:hidden`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-1.5 min-w-0">
          {onBack && (
            <button onClick={onBack} className="p-1.5 -ml-1 rounded-full hover:bg-white/10" aria-label="Go back">
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </button>
          )}
          <h1 className="text-2xl font-bold truncate">{title}</h1>
        </div>
        <div className="flex items-center space-x-3">
          {onNotificationClick && (
            <button onClick={onNotificationClick} className="relative p-1.5 rounded-full hover:bg-white/10" aria-label={`View notifications. ${notificationCount || 0} unread.`}>
              <NotificationIcon className="h-5 w-5 text-white" />
              {notificationCount && notificationCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 border border-white text-white text-[8px] flex items-center justify-center font-bold">
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
                <div className="origin-top-right absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        onLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogoutIcon className="mr-1.5 h-3.5 w-3.5" />
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