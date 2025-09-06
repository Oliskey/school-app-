import React, { useState } from 'react';
import { 
  EditIcon, 
  NotificationIcon, 
  SecurityIcon, 
  HelpIcon, 
  LogoutIcon,
  ChevronRightIcon,
  MailIcon,
  PhoneIcon,
  TrendingUpIcon
} from '../../constants';
import { THEME_CONFIG } from '../../constants';
import { DashboardType } from '../../types';

interface TeacherSettingsScreenProps {
  onLogout: () => void;
  navigateTo: (view: string, title: string, props?: any) => void;
}

const mockTeacher = {
  name: 'Mrs. Funke Akintola',
  avatarUrl: 'https://i.pravatar.cc/150?u=teacher',
  subject: 'English',
  email: 'f.akintola@school.com',
  phone: '123-456-7891'
};

const TeacherSettingsScreen: React.FC<TeacherSettingsScreenProps> = ({ onLogout, navigateTo }) => {
  const theme = THEME_CONFIG[DashboardType.Teacher];
  const [imageError, setImageError] = useState(false);

  const settingsItems = [
    { icon: <EditIcon />, label: 'Edit Profile', color: 'bg-blue-100 text-blue-500', action: () => navigateTo('editTeacherProfile', 'Edit Profile') },
    { icon: <TrendingUpIcon />, label: 'Professional Development', color: 'bg-teal-100 text-teal-500', action: () => navigateTo('professionalDevelopment', 'PD Hub', {}) },
    { icon: <NotificationIcon />, label: 'Notifications', color: 'bg-green-100 text-green-500', action: () => navigateTo('teacherNotificationSettings', 'Notification Settings') },
    { icon: <SecurityIcon />, label: 'Security & Password', color: 'bg-orange-100 text-orange-500', action: () => navigateTo('teacherSecurity', 'Security Settings') },
    { icon: <HelpIcon />, label: 'Help & Support', color: 'bg-purple-100 text-purple-500', action: () => alert('Help Center clicked') },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {/* Profile Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex flex-col items-center space-y-2">
              {imageError ? (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-purple-200">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <img 
                    src={mockTeacher.avatarUrl}
                    alt={mockTeacher.name} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-purple-200 shadow-md"
                    onError={() => setImageError(true)}
                />
              )}
              <h3 className="text-2xl font-bold text-gray-800">{mockTeacher.name}</h3>
              <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">{mockTeacher.subject} Teacher</span>
              <div className="flex space-x-4 pt-1">
                <a href={`mailto:${mockTeacher.email}`} className="flex items-center space-x-1 text-gray-600 hover:text-purple-600">
                  <MailIcon className="h-4 w-4" />
                  <span className="text-sm">Email</span>
                </a>
                <a href={`tel:${mockTeacher.phone}`} className="flex items-center space-x-1 text-gray-600 hover:text-purple-600">
                  <PhoneIcon className="h-4 w-4" />
                  <span className="text-sm">Call</span>
                </a>
              </div>
            </div>
        </div>

        {/* Settings Menu */}
        <div className="space-y-3">
          {settingsItems.map((item, index) => (
            <button
              key={item.label}
              onClick={item.action}
              className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${item.color}`}>
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

export default TeacherSettingsScreen;