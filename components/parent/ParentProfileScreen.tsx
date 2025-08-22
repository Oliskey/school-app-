import React from 'react';
import { 
  EditIcon, 
  NotificationIcon, 
  SecurityIcon, 
  HelpIcon, 
  LogoutIcon,
  ChevronRightIcon,
  MegaphoneIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  UsersIcon,
  CameraIcon,
  HelpingHandIcon,
  ClipboardListIcon
} from '../../constants';
import { mockParents } from '../../data';

interface ParentProfileScreenProps {
  onLogout: () => void;
  navigateTo: (view: string, title: string, props?: any) => void;
}

const ParentProfileScreen: React.FC<ParentProfileScreenProps> = ({ onLogout, navigateTo }) => {
  const mockParent = mockParents[0];

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
    { icon: <SecurityIcon />, label: 'Security & Password', action: () => navigateTo('securitySettings', 'Security') },
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
            <img 
                src={mockParent.avatarUrl}
                alt="Parent Avatar" 
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div>
                <h3 className="text-xl font-bold text-gray-800">{mockParent.name}</h3>
                <p className="text-sm text-gray-500">{mockParent.email}</p>
            </div>
        </div>
        
        {/* Menu Card */}
        <div className="bg-white rounded-xl shadow-sm p-2">
          {menuItems.map((item, index) => (
            <button key={item.label} onClick={item.action} className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${theme.iconColors[index % theme.iconColors.length]}`}>
                  {React.cloneElement(item.icon, { className: 'h-5 w-5' })}
                </div>
                <span className="font-semibold text-gray-700">{item.label}</span>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400"/>
            </button>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 mt-auto">
        <button onClick={onLogout} className="w-full flex items-center justify-center space-x-2 py-3 px-4 font-medium text-red-500 bg-white rounded-xl shadow-sm hover:bg-red-50">
          <LogoutIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ParentProfileScreen;