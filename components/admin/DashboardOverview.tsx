import React from 'react';
import { StudentsIcon, StaffIcon, ReportIcon, ViewGridIcon, ReceiptIcon, CalendarIcon, ShieldCheckIcon, ClipboardListIcon, TeacherAttendanceIcon, ExamIcon, ChartBarIcon, BellIcon, ShoppingCartIcon, DocumentTextIcon, SettingsIcon, MessagesIcon, HeartIcon } from '../../constants';
import { mockStudents, mockTeachers } from '../../data';
import DonutChart from '../ui/DonutChart';

interface DashboardOverviewProps {
    navigateTo: (view: string, title: string, props?: any) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = function({ navigateTo }) {
  const gridItems = [
    { label: 'Manage Classes', icon: <StudentsIcon />, action: () => navigateTo('classList', 'Manage Classes') },
    { label: 'Manage Staff', icon: <StaffIcon />, action: () => navigateTo('teacherList', 'Teachers') },
    { label: 'Analytics', icon: <ChartBarIcon />, action: () => navigateTo('analytics', 'School Analytics') },
    { label: 'Timetable', icon: <ViewGridIcon />, action: () => navigateTo('timetable', 'Create Timetable') },
    { label: 'Exams', icon: <ExamIcon />, action: () => navigateTo('examManagement', 'Exam Management') },
    { label: 'Announcements', icon: <BellIcon />, action: () => navigateTo('communicationHub', 'Communication Hub') },
    { label: 'Fee Management', icon: <ReceiptIcon />, action: () => navigateTo('feeManagement', 'Fee Management') },
    { label: 'Teacher Attendance', icon: <TeacherAttendanceIcon />, action: () => navigateTo('teacherAttendance', 'Teacher Attendance') },
    { label: 'Health Log', icon: <HeartIcon />, action: () => navigateTo('healthLog', 'Health Log') },
    { label: 'Publish Reports', icon: <ReportIcon />, action: () => navigateTo('reportCardPublishing', 'Publish Reports') },
    { label: 'System Settings', icon: <SettingsIcon />, action: () => navigateTo('systemSettings', 'System Settings') },
  ];

  const totalStudents = mockStudents.length;
  const presentStudents = mockStudents.filter(s => s.attendanceStatus === 'Present' || s.attendanceStatus === 'Late').length;
  const attendancePercentage = totalStudents > 0 ? Math.round((presentStudents / totalStudents) * 100) : 0;
  const totalTeachers = mockTeachers.length;

  return (
    <div className="p-3 space-y-4 bg-gray-100">
      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <button 
          onClick={() => navigateTo('studentList', 'Manage Students', {})}
          className="bg-white p-3 rounded-xl shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
          aria-label={`View all ${totalStudents} students`}
        >
          <p className="font-bold text-2xl text-indigo-600">{totalStudents}</p>
          <p className="text-xs text-gray-500 font-medium">Students</p>
        </button>
        <button 
          onClick={() => navigateTo('teacherList', 'Manage Teachers', {})}
          className="bg-white p-3 rounded-xl shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
          aria-label={`View all ${totalTeachers} teachers`}
        >
          <p className="font-bold text-2xl text-indigo-600">{totalTeachers}</p>
          <p className="text-xs text-gray-500 font-medium">Teachers</p>
        </button>
        <button 
          onClick={() => navigateTo('attendanceOverview', 'Attendance Overview', {})}
          className="bg-white p-3 rounded-xl shadow-sm flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
          aria-label={`View attendance, current student attendance is ${attendancePercentage} percent`}
        >
            <div className="relative">
                <DonutChart percentage={attendancePercentage} color="#4f46e5" size={35} strokeWidth={4} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-indigo-600">{attendancePercentage}%</span>
                </div>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-1">Attendance</p>
        </button>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-3 gap-3">
        {gridItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="bg-white p-3 rounded-xl shadow-sm flex flex-col items-center justify-center space-y-1 text-center hover:bg-indigo-50 transition-colors"
          >
            <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
              {React.cloneElement(item.icon, { className: 'h-5 w-5' })}
            </div>
            <span className="font-semibold text-indigo-900 text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;