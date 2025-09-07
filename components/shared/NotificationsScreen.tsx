import React, { useMemo } from 'react';
import { mockNotifications } from '../../data';
import { mockStudents, mockStudentFees } from '../../data';
import { NOTIFICATION_CATEGORY_CONFIG } from '../../constants';
import { Notification } from '../../types';

const formatDistanceToNow = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
};

interface NotificationsScreenProps {
  userType: 'admin' | 'parent' | 'student' | 'teacher';
  navigateTo: (view: string, title: string, props?: any) => void;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ userType, navigateTo }) => {

  const relevantNotifications = useMemo(() =>
    mockNotifications
      .filter(n => n.audience.includes('all') || n.audience.includes(userType))
      .sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [userType]
  );

  const handleNotificationClick = (notification: Notification) => {
    // Parent-specific navigation logic
    if (userType === 'parent') {
        switch (notification.category) {
        case 'Fees':
            const feeStudentInfo = mockStudentFees.find(f => f.id === notification.studentId);
            if (feeStudentInfo) {
            navigateTo('feeStatus', 'Fee Status', { student: feeStudentInfo });
            }
            break;
        case 'Attendance':
            const student = mockStudents.find(s => s.id === notification.studentId);
            if (student) {
            navigateTo('childDetail', student.name, { student, initialTab: 'attendance' });
            }
            break;
        case 'Event':
            navigateTo('calendar', 'School Calendar', {});
            break;
        case 'Message':
            alert("Navigating to messages...");
            break;
        default:
            break;
        }
    }
    // Add logic for other user types if needed
  };
  
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-grow p-3 md:p-5 space-y-4 md:space-y-5 overflow-y-auto">
        {relevantNotifications.length > 0 ? (
          relevantNotifications.map(notification => {
            const config = NOTIFICATION_CATEGORY_CONFIG[notification.category];
            const Icon = config.icon;
            return (
              <button 
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className="w-full text-left bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-start md:space-x-5 space-y-3 md:space-y-0 relative transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {!notification.isRead && (
                  <div className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 h-3 w-3 md:h-4 md:w-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse shadow-md"></div>
                )}
                <div className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center ${config.bg} transition-all duration-300 hover:scale-105 shadow-sm md:shadow-md`}>
                  <Icon className={`w-7 h-7 md:w-8 md:h-8 ${config.color}`} />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-2 md:space-y-0">
                    <p className={`font-bold text-lg md:text-xl ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>{notification.title}</p>
                    <p className="text-xs md:text-sm text-gray-500 flex-shrink-0 bg-gray-100 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full font-semibold">
                      {formatDistanceToNow(notification.timestamp)}
                    </p>
                  </div>
                  <p className={`text-sm md:text-base mt-2 md:mt-3 leading-relaxed ${notification.isRead ? 'text-gray-600' : 'text-gray-800'}`}>{notification.summary}</p>
                  <div className="mt-3 md:mt-4">
                    <span className={`inline-block px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold rounded-full ${config.bg} ${config.color} shadow-sm`}>
                      {notification.category}
                    </span>
                  </div>
                </div>
              </button>
            )
          })
        ) : (
          <div className="text-center py-16 md:py-20 bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg">
            <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 md:mb-5 shadow-sm md:shadow-md">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM9 7H4l5-5v5z"></path>
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">No Notifications</h3>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto px-4">You're all caught up! Check back later for new notifications.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NotificationsScreen;