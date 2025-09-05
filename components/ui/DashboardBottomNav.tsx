import React from 'react';
import { HomeIcon, BellIcon, ProfileIcon, DocumentTextIcon, PhoneIcon, PlayIcon, AnalyticsIcon, MegaphoneIcon, SettingsIcon, MessagesIcon, ElearningIcon, SparklesIcon, UserGroupIcon, GameControllerIcon, ChartBarIcon } from '../../constants';

const NavItem = ({ icon, label, isActive, onClick, activeColor }: { icon: React.ReactElement<{ className?: string }>, label: string, isActive: boolean, onClick: () => void, activeColor: string }) => (
  <button onClick={onClick} className={`flex-1 flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${isActive ? activeColor : 'text-gray-500'}`}>
    {React.cloneElement(icon, { className: `h-6 w-6`})}
    <span className="text-xs font-medium">{label}</span>
  </button>
);

export const AdminBottomNav = ({ activeScreen, setActiveScreen }: { activeScreen: string, setActiveScreen: (screen: string) => void }) => {
  const navItems = [
    { id: 'home', icon: <HomeIcon />, label: 'Home' },
    { id: 'messages', icon: <MessagesIcon />, label: 'Messages' },
    { id: 'communication', icon: <MegaphoneIcon />, label: 'Announce' },
    { id: 'analytics', icon: <AnalyticsIcon className="h-6 w-6"/>, label: 'Analytics' },
    { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
  ];
  return (
    <div className="w-full bg-white/95 backdrop-blur-sm border-t border-gray-100 p-2 flex justify-around items-center print:hidden">
      {navItems.map(item => (
        <NavItem key={item.id} {...item} isActive={activeScreen === item.id} onClick={() => setActiveScreen(item.id)} activeColor="text-indigo-600" />
      ))}
    </div>
  );
};

export const TeacherBottomNav = ({ activeScreen, setActiveScreen }: { activeScreen: string, setActiveScreen: (screen: string) => void }) => {
  const navItems = [
    { id: 'home', icon: <HomeIcon />, label: 'Home' },
    { id: 'reports', icon: <DocumentTextIcon />, label: 'Reports' },
    { id: 'forum', icon: <UserGroupIcon />, label: 'Forum'},
    { id: 'messages', icon: <MessagesIcon />, label: 'Messages' },
    { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
  ];
  return (
    <div className="w-full bg-white/95 backdrop-blur-sm border-t border-gray-100 p-2 flex justify-around items-center print:hidden">
      {navItems.map(item => (
        <NavItem key={item.id} {...item} isActive={activeScreen === item.id} onClick={() => setActiveScreen(item.id)} activeColor="text-[#7B61FF]" />
      ))}
    </div>
  );
};

export const ParentBottomNav = ({ activeScreen, setActiveScreen }: { activeScreen: string, setActiveScreen: (screen: string) => void }) => {
  const navItems = [
    { id: 'home', icon: <HomeIcon />, label: 'Home' },
    { id: 'reports', icon: <DocumentTextIcon />, label: 'Reports' },
    { id: 'notifications', icon: <BellIcon />, label: 'Notifications' },
    { id: 'more', icon: <ProfileIcon />, label: 'More' },
  ];
  return (
    <div className="w-full bg-white/95 backdrop-blur-sm border-t border-gray-100 p-2 flex justify-around items-center print:hidden">
      {navItems.map(item => (
        <NavItem key={item.id} {...item} isActive={activeScreen === item.id} onClick={() => setActiveScreen(item.id)} activeColor="text-[#4CAF50]" />
      ))}
    </div>
  );
};

export const StudentBottomNav = ({ activeScreen, setActiveScreen }: { activeScreen: string, setActiveScreen: (screen: string) => void }) => {
  const navItems = [
    { id: 'home', icon: <HomeIcon />, label: 'Home' },
    { id: 'results', icon: <ChartBarIcon />, label: 'Results' },
    { id: 'games', icon: <GameControllerIcon />, label: 'Games' },
    { id: 'messages', icon: <MessagesIcon />, label: 'Messages' },
    { id: 'profile', icon: <ProfileIcon />, label: 'Profile' },
  ];
  return (
    <div className="w-full bg-white/95 backdrop-blur-sm border-t border-gray-100 p-2 flex justify-around items-center print:hidden">
      {navItems.map(item => (
        <NavItem key={item.id} {...item} isActive={activeScreen === item.id} onClick={() => setActiveScreen(item.id)} activeColor="text-[#FF9800]" />
      ))}
    </div>
  );
};