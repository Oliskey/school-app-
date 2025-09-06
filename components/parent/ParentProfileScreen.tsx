import React, { useState } from 'react';
import { 
  EditIcon, 
  BookOpenIcon, 
  ShieldCheckIcon, 
  UsersIcon, 
  CameraIcon, 
  HelpingHandIcon, 
  ClipboardListIcon, 
  MegaphoneIcon, 
  NotificationIcon, 
  SecurityIcon, 
  HelpIcon, 
  LogoutIcon,
  ChevronRightIcon
} from '../../constants';
import { mockParents } from '../../data';

interface ParentProfileScreenProps {
  onLogout: () => void;
  navigateTo: (view: string, title: string, props?: any) => void;
}

const ParentProfileScreen: React.FC<ParentProfileScreenProps> = ({ onLogout, navigateTo }) => {
  const mockParent = mockParents[0];
  const [imageError, setImageError] = useState(false);

  const menuItems = [
    { icon: <EditIcon />, label: 'Edit Profile', action: () => navigateTo('editParentProfile', 'Edit Profile') },
    { icon: <BookOpenIcon />, label: 'Learning Resources', action: () => navigateTo('learningResources', 'Learning Resources') },
    { icon: <ShieldCheckIcon />, label: 'School Policies', action: () => navigateTo('schoolPolicies', 'School Policies') },
    { icon: <UsersIcon />, label: 'PTA Meetings', action: () => navigateTo('ptaMeetings', 'PTA Meetings') },
    { icon: <CameraIcon />, label: 'Photo Gallery', action: () => navigateTo('photoGallery', 'Photo Gallery') },
    { icon: <HelpingHandIcon />, label: 'Volunteer', action: () => navigateTo('volunteering', 'Volunteering') },
    { icon: <ClipboardListIcon />, label: 'Permission Slips', action: () => navigateTo('permissionSlips', 'Permission Slips') },
    { icon: <MegaphoneIcon />, label: 'Feedback & Support', action: () => navigateTo('feedback', 'Feedback & Support') },
    { icon: <NotificationIcon />, label: 'Notification Settings', action: () => navigateTo('notificationSettings', 'Notifications') },
    { icon: <SecurityIcon />, label: 'Security & Password', action: () => navigateTo('parentSecurity', 'Security Settings') },
    { icon: <HelpIcon />, label: 'Help Center', action: () => alert('Help Center clicked') },
  ];

  const theme = {
    iconColors: [
        'bg-blue-100 text-blue-500', 
        'bg-orange-100 text-orange-500', 
        'bg-indigo-100 text-indigo-500', 
        'bg-teal-100 text-teal-500',
        'bg-pink-100 text-pink-500',
        'bg-sky-100 text-sky-500',
        'bg-lime-100 text-lime-500',
        'bg-green-100 text-green-500', 
        'bg-amber-100 text-amber-500', 
        'bg-red-100 text-red-500', 
        'bg-purple-100 text-purple-500'
    ]
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {/* Profile Info Card */}
        <div className="flex items-center p-4 space-x-4 bg-white rounded-xl shadow-sm">
            {imageError ? (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>
            ) : (
                <img 
                    src={mockParent.avatarUrl}
                    alt="Parent Avatar" 
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                    onError={() => setImageError(true)}
                />
            )}
            <div>
                <h2 className="text-xl font-bold text-gray-800">{mockParent.name}</h2>
                <p className="text-gray-600">Parent Account</p>
            </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={item.action}
              className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${theme.iconColors[index % theme.iconColors.length]}`}>
                  {item.icon}
                </div>
                <span className="font-medium text-gray-800">{item.label}</span>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 p-4 bg-red-50 text-red-500 rounded-xl shadow-sm hover:bg-red-100 transition-colors"
        >
          <LogoutIcon className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ParentProfileScreen;