import React from 'react';
import {
  BookOpenIcon,
  ChevronRightIcon,
  CalendarIcon,
  ViewGridIcon,
  TeacherAttendanceIcon,
  ClipboardListIcon,
  BriefcaseIcon,
  GameControllerIcon,
  THEME_CONFIG,
  SUBJECT_COLORS,
  getFormattedClassName
} from '../../constants';
import { ClassInfo, Teacher } from '../../types';
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
      { label: 'Attendance', icon: <TeacherAttendanceIcon className="h-5 w-5"/>, action: () => navigateTo('selectClassForAttendance', 'Select Class', {}) },
      { label: 'Assignments', icon: <ClipboardListIcon className="h-5 w-5"/>, action: () => navigateTo('assignmentsList', 'Manage Assignments', {}) },
      { label: 'AI Planner', icon: <BriefcaseIcon className="h-5 w-5"/>, action: () => navigateTo('lessonPlanner', 'AI Lesson Planner', {}) },
      { label: 'Games', icon: <GameControllerIcon className="h-5 w-5"/>, action: () => navigateTo('educationalGames', 'Educational Games', {}) },
      { label: 'Timetable', icon: <ViewGridIcon className="h-5 w-5"/>, action: () => navigateTo('timetable', 'My Timetable', {}) },
      { label: 'Calendar', icon: <CalendarIcon className="h-5 w-5"/>, action: () => navigateTo('calendar', 'School Calendar', {}) },
  ];

  return (
    <div className="p-3 space-y-4 bg-gray-50">
      {/* Welcome Message */}
      <div className={`p-4 rounded-xl text-white shadow-lg ${theme.mainBg}`}>
        <h3 className="text-xl font-bold">Welcome, {teacher.name}!</h3>
        <p className="text-xs opacity-90 mt-1">Ready to inspire today?</p>
      </div>
      
      {/* Daily Wellness Check-in */}
      <div className="bg-white p-3 rounded-xl shadow-sm flex items-center justify-between">
          <div>
              <p className="font-bold text-gray-800 text-sm">Daily Wellness Check-in</p>
              <p className="text-xs text-gray-500">How are you feeling today?</p>
          </div>
          <div className="flex space-x-1">
              <button className="text-lg p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Feeling happy">😊</button>
              <button className="text-lg p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Feeling neutral">😐</button>
              <button className="text-lg p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Feeling down">😕</button>
          </div>
      </div>

      {/* Quick Actions Grid */}
       <div className="grid grid-cols-3 gap-3">
            {quickActions.map(item => (
                <button key={item.label} onClick={item.action} className={`${theme.cardBg} p-3 rounded-xl shadow-sm flex flex-col items-center justify-center space-y-1 hover:bg-purple-200 transition-colors`}>
                    <div className={theme.iconColor}>{item.icon}</div>
                    <span className={`font-semibold ${theme.textColor} text-center text-xs`}>{item.label}</span>
                </button>
            ))}
        </div>

      {/* My Classes */}
      <div>
        <h3 className="text-base font-bold text-gray-800 mb-2 px-1">My Classes</h3>
        <div className="space-y-2">
          {teacherClasses.map(cls => (
            <button key={cls.id} onClick={() => navigateTo('classDetail', `Class ${getFormattedClassName(cls.grade, cls.section)}`, { classInfo: cls })} className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:bg-purple-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg ${SUBJECT_COLORS[cls.subject]} flex items-center justify-center`}>
                  <BookOpenIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{cls.subject}</p>
                  <p className="text-xs text-gray-600">{getFormattedClassName(cls.grade, cls.section)} &bull; {cls.studentCount} Students</p>
                </div>
              </div>
              <ChevronRightIcon className="text-gray-400 h-5 w-5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TeacherOverview;