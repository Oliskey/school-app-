import React from 'react';
import { 
  EditIcon, 
  NotificationIcon, 
  SecurityIcon, 
  HelpIcon, 
  LogoutIcon,
  ChevronRightIcon
} from '../../constants';

interface ProfileSettingsProps {
  onLogout: () => void;
  navigateTo: (view: string, title: string, props?: any) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onLogout, navigateTo }) => {

  const settingsItems = [
    { icon: <EditIcon />, label: 'Edit Profile', color: 'bg-blue-100 text-blue-500', action: () => navigateTo('editProfile', 'Edit Profile') },
    { icon: <NotificationIcon />, label: 'Notifications', color: 'bg-green-100 text-green-500', action: () => navigateTo('notificationsSettings', 'Notification Settings') },
    { icon: <SecurityIcon />, label: 'My Security', color: 'bg-orange-100 text-orange-500', action: () => navigateTo('personalSecuritySettings', 'My Security Settings') },
    { icon: <HelpIcon />, label: 'Help & Support', color: 'bg-purple-100 text-purple-500', action: () => alert('Help Center clicked') },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {/* Profile Info */}
        <div className="flex flex-col items-center p-6 space-y-2 bg-white rounded-xl shadow-sm">
            <div className="relative">
                <img 
                    src="https://i.pravatar.cc/150?u=admin"
                    alt="Admin Avatar" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Adekunle Ciroma</h3>
            <span className="bg-sky-100 text-sky-800 text-xs font-semibold px-3 py-1 rounded-full">Administrator</span>
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
              <ChevronRightIcon />
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 mt-auto bg-gray-50 border-t border-gray-200">
        <button onClick={onLogout} className="w-full flex items-center justify-center space-x-2 py-3 px-4 font-medium text-red-500 bg-white rounded-lg shadow-sm border hover:bg-red-50 focus:outline-none">
          <LogoutIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
