
import React from 'react';
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
              <img 
                  src={mockTeacher.avatarUrl}
                  alt={mockTeacher.name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-purple-200 shadow-md"
              />
              <h3 className="text-2xl font-bold text-gray-800">{mockTeacher.name}</h3>
              <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">{mockTeacher.subject} Teacher</span>
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-3">
               <div className="flex items-center space-x-4">
                  <div className={`p-2.5 rounded-lg ${theme.cardBg}`}>
                      <MailIcon className={`w-5 h-5 ${theme.iconColor}`} />
                  </div>
                  <span className="text-gray-700 font-medium">{mockTeacher.email}</span>
              </div>
               <div className="flex items-center space-x-4">
                  <div className={`p-2.5 rounded-lg ${theme.cardBg}`}>
                      <PhoneIcon className={`w-5 h-5 ${theme.iconColor}`} />
                  </div>
                  <span className="text-gray-700 font-medium">{mockTeacher.phone}</span>
              </div>
            </div>
        </div>
        
        {/* Settings Card */}
        <div className="bg-white rounded-xl shadow-sm p-2">
          {settingsItems.map((item, index) => (
            <button key={index} onClick={item.action} className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${item.color}`}>
                  {React.cloneElement(item.icon, { className: 'h-5 w-5' })}
                </div>
                <span className="font-semibold text-gray-700">{item.label}</span>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
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

export default TeacherSettingsScreen;
