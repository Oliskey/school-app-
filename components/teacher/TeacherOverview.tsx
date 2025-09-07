import React, { useState } from 'react';
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
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedule = mockTimetableData
    .filter(e => e.day === today && teacher.classes.some(cls => e.className.includes(cls)))
    .slice(0, 2);

  // State for wellness check-in
  const [wellnessSelection, setWellnessSelection] = useState<string | null>(null);

  const quickActions = [
    { 
      label: 'Attendance', 
      icon: <TeacherAttendanceIcon className="h-6 w-6"/>, 
      action: () => navigateTo('selectClassForAttendance', 'Select Class', {}),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100'
    },
    { 
      label: 'Assignments', 
      icon: <ClipboardListIcon className="h-6 w-6"/>, 
      action: () => navigateTo('assignmentsList', 'Manage Assignments', {}),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100'
    },
    { 
      label: 'AI Planner', 
      icon: <BriefcaseIcon className="h-6 w-6"/>, 
      action: () => navigateTo('lessonPlanner', 'AI Lesson Planner', {}),
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100'
    },
    { 
      label: 'Games', 
      icon: <GameControllerIcon className="h-6 w-6"/>, 
      action: () => navigateTo('educationalGames', 'Educational Games', {}),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100'
    },
    { 
      label: 'Timetable', 
      icon: <ViewGridIcon className="h-6 w-6"/>, 
      action: () => navigateTo('timetable', 'My Timetable', {}),
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100'
    },
    { 
      label: 'Calendar', 
      icon: <CalendarIcon className="h-6 w-6"/>, 
      action: () => navigateTo('calendar', 'School Calendar', {}),
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 hover:bg-amber-100'
    },
  ];

  // Handle wellness check-in
  const handleWellnessSelect = (feeling: string) => {
    setWellnessSelection(feeling);
    // In a real app, you might send this data to a backend
    console.log(`Teacher feeling: ${feeling}`);
  };

  return (
    <div className="p-4 space-y-5 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Welcome Message */}
      <div className={`p-5 rounded-2xl text-white shadow-lg ${theme.mainBg} transition-all duration-300 hover:shadow-xl`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold">Welcome, {teacher.name}!</h3>
            <p className="text-sm opacity-90 mt-2">Ready to inspire today?</p>
          </div>
          <div className="bg-white/20 p-3 rounded-xl">
            <BookOpenIcon className="h-7 w-7 text-white" />
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md">
          <p className="text-2xl font-bold text-gray-800">{teacherClasses.length}</p>
          <p className="text-xs text-gray-500 mt-1">Classes</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md">
          <p className="text-2xl font-bold text-gray-800">5</p>
          <p className="text-xs text-gray-500 mt-1">Students</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md">
          <p className="text-2xl font-bold text-gray-800">2</p>
          <p className="text-xs text-gray-500 mt-1">Pending</p>
        </div>
      </div>
      
      {/* Daily Wellness Check-in */}
      <div className="bg-white p-5 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Daily Wellness Check-in</h3>
          <span className="text-xs text-gray-500">How are you feeling?</span>
        </div>
        <div className="flex justify-between">
          <button 
            onClick={() => handleWellnessSelect('happy')} 
            className={`text-3xl p-3 rounded-full transition-all duration-200 ${wellnessSelection === 'happy' ? 'bg-green-100 scale-110' : 'hover:bg-gray-100'}`} 
            aria-label="Feeling happy"
          >
            😊
          </button>
          <button 
            onClick={() => handleWellnessSelect('neutral')} 
            className={`text-3xl p-3 rounded-full transition-all duration-200 ${wellnessSelection === 'neutral' ? 'bg-yellow-100 scale-110' : 'hover:bg-gray-100'}`} 
            aria-label="Feeling neutral"
          >
            😐
          </button>
          <button 
            onClick={() => handleWellnessSelect('down')} 
            className={`text-3xl p-3 rounded-full transition-all duration-200 ${wellnessSelection === 'down' ? 'bg-blue-100 scale-110' : 'hover:bg-gray-100'}`} 
            aria-label="Feeling down"
          >
            😕
          </button>
          <button 
            onClick={() => handleWellnessSelect('stressed')} 
            className={`text-3xl p-3 rounded-full transition-all duration-200 ${wellnessSelection === 'stressed' ? 'bg-red-100 scale-110' : 'hover:bg-gray-100'}`} 
            aria-label="Feeling stressed"
          >
            😰
          </button>
          <button 
            onClick={() => handleWellnessSelect('excited')} 
            className={`text-3xl p-3 rounded-full transition-all duration-200 ${wellnessSelection === 'excited' ? 'bg-purple-100 scale-110' : 'hover:bg-gray-100'}`} 
            aria-label="Feeling excited"
          >
            🤩
          </button>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((item, index) => (
            <button 
              key={item.label} 
              onClick={item.action} 
              className={`flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${item.bgColor}`}
            >
              <div className={`p-3 rounded-xl mb-3 ${item.color}`}>
                {item.icon}
              </div>
              <span className="font-semibold text-gray-700 text-center text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* My Classes */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-gray-800">My Classes</h3>
          <span className="text-xs text-gray-500">{teacherClasses.length} classes</span>
        </div>
        <div className="space-y-3">
          {teacherClasses.map(cls => (
            <button 
              key={cls.id} 
              onClick={() => navigateTo('classDetail', `Class ${getFormattedClassName(cls.grade, cls.section)}`, { classInfo: cls })} 
              className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-purple-50 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl ${SUBJECT_COLORS[cls.subject]} flex items-center justify-center`}>
                  <BookOpenIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-800">{getFormattedClassName(cls.grade, cls.section)}</p>
                  <p className="text-sm text-gray-600">{cls.subject}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{cls.studentCount} students</p>
                <ChevronRightIcon className="text-gray-400 h-5 w-5 mt-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Today's Schedule */}
      {todaySchedule.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">Today's Schedule</h3>
          <div className="space-y-3">
            {todaySchedule.map((schedule, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-gray-800">{schedule.subject}</p>
                  <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">{schedule.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{schedule.className} • {schedule.teacher}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherOverview;