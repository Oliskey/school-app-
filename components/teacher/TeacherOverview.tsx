import React from 'react';
import {
  BookOpenIcon,
  ChevronRightIcon,
  ViewGridIcon,
  TeacherAttendanceIcon,
  ClipboardListIcon,
  BriefcaseIcon,
  ClockIcon,
  SparklesIcon
} from '../../constants';
import { ClassInfo, Teacher } from '../../types';
import { DashboardType } from '../../types';
import { THEME_CONFIG, SUBJECT_COLORS, getFormattedClassName } from '../../constants';
import { mockTeachers, mockClasses, mockTimetableData } from '../../data';

const LOGGED_IN_TEACHER_ID = 2; // Mrs. Funke Akintola

interface TeacherOverviewProps {
  navigateTo: (view: string, title: string, props?: any) => void;
}

const ActionCard: React.FC<{ label: string; icon: React.ReactNode; onClick: () => void }> = ({ label, icon, onClick }) => {
    const theme = THEME_CONFIG[DashboardType.Teacher];
    return (
        <button onClick={onClick} className={`${theme.cardBg} p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center space-y-2 hover:bg-purple-200 transition-colors`}>
            <div className={theme.iconColor}>{icon}</div>
            <span className={`font-semibold ${theme.textColor} text-center text-sm`}>{label}</span>
        </button>
    );
};

const TeacherOverview: React.FC<TeacherOverviewProps> = ({ navigateTo }) => {
  const theme = THEME_CONFIG[DashboardType.Teacher];
  const teacher: Teacher = mockTeachers.find(t => t.id === LOGGED_IN_TEACHER_ID)!;
  
  const teacherClasses: ClassInfo[] = mockClasses.filter(c => teacher.classes.includes(c.grade + c.section));
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as any;
  const todaySchedule = mockTimetableData
    .filter(e => e.day === today && teacher.classes.some(cls => e.className.includes(cls)))
    .sort((a,b) => a.startTime.localeCompare(b.startTime))
    .slice(0, 3);

  const formatTime12Hour = (timeStr: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    return `${h}:${minutes} ${ampm}`;
  };

  return (
    <div className="p-4 space-y-5 bg-gray-50">
      {/* Welcome Message */}
      <div className={`p-5 rounded-2xl text-white shadow-lg ${theme.mainBg}`}>
        <h3 className="text-2xl font-bold">Welcome, {teacher.name}!</h3>
        <p className="text-sm opacity-90 mt-1">Ready to inspire today?</p>
      </div>

      {/* Priority Actions */}
      <div className="grid grid-cols-3 gap-4">
        <ActionCard label="Mark Attendance" icon={<TeacherAttendanceIcon className="h-7 w-7"/>} onClick={() => navigateTo('selectClassForAttendance', 'Select Class', {})} />
        <ActionCard label="Assignments" icon={<ClipboardListIcon className="h-7 w-7"/>} onClick={() => navigateTo('assignmentsList', 'Manage Assignments', {})} />
        <ActionCard label="AI Planner" icon={<SparklesIcon className="h-7 w-7"/>} onClick={() => navigateTo('lessonPlanner', 'AI Lesson Planner', {})} />
      </div>

      {/* Today's Schedule */}
      <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 px-1">Today's Schedule</h3>
            {todaySchedule.length > 0 ? (
                <div className="space-y-3">
                    {todaySchedule.map((entry, i) => (
                        <div key={i} className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm">
                            <div className="w-16 text-center">
                                <p className="font-bold text-sm text-gray-800">{formatTime12Hour(entry.startTime)}</p>
                                <p className="text-xs text-gray-500">({entry.className})</p>
                            </div>
                            <div className={`w-1 h-10 rounded-full ${SUBJECT_COLORS[entry.subject]}`}></div>
                            <div>
                                <p className="font-semibold text-gray-800">{entry.subject}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white p-4 rounded-xl shadow-sm text-center text-gray-500">
                    No classes scheduled for today.
                </div>
            )}
        </div>

      {/* My Classes */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 px-1">All My Classes</h3>
        <div className="space-y-3">
          {teacherClasses.map(cls => (
            <button key={cls.id} onClick={() => navigateTo('classDetail', `Class ${getFormattedClassName(cls.grade, cls.section)}`, { classInfo: cls })} className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-purple-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg ${SUBJECT_COLORS[cls.subject]} flex items-center justify-center`}>
                  <BookOpenIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-left">{cls.subject}</p>
                  <p className="text-sm text-gray-600 text-left">{getFormattedClassName(cls.grade, cls.section)} &bull; {cls.studentCount} Students</p>
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
