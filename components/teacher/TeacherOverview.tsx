
import React from 'react';
import {
  BookOpenIcon,
  ChevronRightIcon,
  CalendarIcon,
  CameraIcon,
  ViewGridIcon,
  TeacherAttendanceIcon,
  ClipboardListIcon
} from '../../constants';
import { ClassInfo, Teacher } from '../../types';
import { THEME_CONFIG, SUBJECT_COLORS } from '../../constants';
import { DashboardType } from '../../types';
import { mockTeachers, mockClasses, mockTimetableData } from '../../data';

const LOGGED_IN_TEACHER_ID = 2; // Mrs. Funke Akintola

interface TeacherOverviewProps {
  navigateTo: (view: string, title: string, props?: any) => void;
}

const TeacherOverview: React.FC<TeacherOverviewProps> = ({ navigateTo }) => {
  const theme = THEME_CONFIG[DashboardType.Teacher];
  const teacher: Teacher = mockTeachers.find(t => t.id === LOGGED_IN_TEACHER_ID)!;
  
  const teacherClasses: ClassInfo[] = mockClasses.filter(c => teacher.classes.includes(c.grade + c.section));
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as any;
  const todaySchedule = mockTimetableData.filter(e => e.day === today && teacher.classes.includes(e.className.substring(e.className.length - 2))).slice(0, 2);

  const quickActions = [
      { label: 'Attendance', icon: <TeacherAttendanceIcon className="h-7 w-7"/>, action: () => navigateTo('unifiedAttendance', 'Mark Attendance') },
      { label: 'Assignments', icon: <ClipboardListIcon className="h-7 w-7"/>, action: () => navigateTo('assignmentsList', 'Manage Assignments') },
      { label: 'Lesson Planner', icon: <BookOpenIcon className="h-7 w-7"/>, action: () => navigateTo('lessonPlanner', 'Lesson Planner') },
      { label: 'Timetable', icon: <ViewGridIcon className="h-7 w-7"/>, action: () => navigateTo('timetable', 'My Timetable') },
      { label: 'Calendar', icon: <CalendarIcon className="h-7 w-7"/>, action: () => navigateTo('calendar', 'School Calendar') },
      { label: 'Gallery', icon: <CameraIcon className="h-7 w-7"/>, action: () => navigateTo('gallery', 'Photo Gallery') },
  ];

  return (
    <div className="p-4 space-y-5 bg-gray-50">
      {/* Welcome Message */}
      <div className={`p-5 rounded-2xl text-white shadow-lg ${theme.mainBg}`}>
        <h3 className="text-2xl font-bold">Welcome, {teacher.name}!</h3>
        <p className="text-sm opacity-90 mt-1">Ready to inspire today?</p>
      </div>
      
      {/* Daily Wellness Check-in */}
      <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
              <p className="font-bold text-gray-800">Daily Wellness Check-in</p>
              <p className="text-sm text-gray-500">How are you feeling today?</p>
          </div>
          <div className="flex space-x-2">
              <button className="text-2xl p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Feeling happy">😊</button>
              <button className="text-2xl p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Feeling neutral">😐</button>
              <button className="text-2xl p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Feeling down">😕</button>
          </div>
      </div>

      {/* Quick Actions Grid */}
       <div className="grid grid-cols-3 gap-4">
            {quickActions.map(item => (
                <button key={item.label} onClick={item.action} className={`${theme.cardBg} p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center space-y-2 hover:bg-purple-200 transition-colors`}>
                    <div className={theme.iconColor}>{item.icon}</div>
                    <span className={`font-semibold ${theme.textColor} text-center text-xs`}>{item.label}</span>
                </button>
            ))}
        </div>

      {/* My Classes */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 px-1">My Classes</h3>
        <div className="space-y-3">
          {teacherClasses.map(cls => (
            <button key={cls.id} onClick={() => navigateTo('classDetail', `Grade ${cls.grade}${cls.section}`, { classInfo: cls })} className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-purple-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg ${SUBJECT_COLORS[cls.subject]} flex items-center justify-center font-bold text-xl`}>
                    {cls.grade}{cls.section}
                </div>
                <div>
                    <p className="font-bold text-gray-800 text-left">Grade {cls.grade}{cls.section}</p>
                    <p className="text-sm text-gray-600 text-left">{cls.studentCount} Students</p>
                </div>
              </div>
              <ChevronRightIcon className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;