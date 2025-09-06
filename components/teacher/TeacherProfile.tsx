import React, { useState } from 'react';
import { 
  MailIcon, 
  PhoneIcon, 
  SettingsIcon,
  AttendanceIcon,
  BookOpenIcon,
  ClipboardListIcon
} from '../../constants';
import { THEME_CONFIG, SUBJECT_COLORS } from '../../constants';
import { DashboardType } from '../../types';

interface TeacherProfileProps {
  navigateTo: (view: string, title: string, props?: any) => void;
}

const mockTeacher = {
  name: 'Mrs. Funke Akintola',
  avatarUrl: 'https://i.pravatar.cc/150?u=teacher',
  subject: 'English',
  email: 'f.akintola@school.com',
  phone: '123-456-7891'
};

const QuickActionCard = ({ icon: Icon, label, bgColor, action }: { icon: React.ComponentType<{ className?: string }>, label: string, bgColor: string, action: () => void }) => (
    <button onClick={action} className={`w-full p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105 ${bgColor}`}>
        <div className="text-white mb-2">
          <Icon className="h-6 w-6" />
        </div>
        <span className="font-semibold text-white text-sm">{label}</span>
    </button>
);


const TeacherProfile: React.FC<TeacherProfileProps> = ({ navigateTo }) => {
    const theme = THEME_CONFIG[DashboardType.Teacher];
    const subjectColor = SUBJECT_COLORS[mockTeacher.subject] || 'bg-gray-100 text-gray-800';
    const [imageError, setImageError] = useState(false);

    const quickActions = [
        { label: 'Attendance', icon: AttendanceIcon, bgColor: 'bg-green-500', action: () => navigateTo('attendance', 'Mark Attendance', {}) },
        { label: 'Assignments', icon: ClipboardListIcon, bgColor: 'bg-sky-500', action: () => navigateTo('assignmentsList', 'Manage Assignments', {}) },
        { label: 'Curriculum', icon: BookOpenIcon, bgColor: 'bg-indigo-500', action: () => navigateTo('curriculumSelection', 'View Curriculum', {}) }
    ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <main className="flex-grow p-4 space-y-5 overflow-y-auto">
        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center space-y-3">
          {imageError ? (
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <img 
              src={mockTeacher.avatarUrl} 
              alt={mockTeacher.name} 
              className="w-28 h-28 rounded-full object-cover border-4 border-purple-200 shadow-md"
              onError={() => setImageError(true)}
            />
          )}
          <h3 className="text-2xl font-bold text-gray-800">{mockTeacher.name}</h3>
          <span className={`text-sm font-semibold px-4 py-1 rounded-full ${subjectColor}`}>
            {mockTeacher.subject} Teacher
          </span>
          <div className="flex space-x-4 pt-2">
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

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h4 className="font-bold text-gray-800 mb-3 px-2">Quick Actions</h4>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action, index) => (
              <QuickActionCard 
                key={index}
                icon={action.icon}
                label={action.label}
                bgColor={action.bgColor}
                action={action.action}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherProfile;