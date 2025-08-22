import React from 'react';
import { StudentsIcon, StaffIcon, ReportIcon, ViewGridIcon, ReceiptIcon, CalendarIcon, ShieldCheckIcon, ClipboardListIcon, TeacherAttendanceIcon, ExamIcon, ChartBarIcon, BellIcon, ShoppingCartIcon, DocumentTextIcon, SettingsIcon } from '../../constants';
import { mockStudents, mockTeachers } from '../../data';
import DonutChart from '../ui/DonutChart';

interface DashboardOverviewProps {
    navigateTo: (view: string, props: any, title: string) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ navigateTo }) => {
  const gridItems = [
    { label: 'Manage Classes', icon: <StudentsIcon />, action: () => navigateTo('classList', {}, 'Manage Classes') },
    { label: 'Manage Staff', icon: <StaffIcon />, action: () => navigateTo('teacherList', {}, 'Teachers') },
    { label: 'Analytics', icon: <ChartBarIcon />, action: () => navigateTo('analytics', {}, 'School Analytics') },
    { label: 'Timetable', icon: <ViewGridIcon />, action: () => navigateTo('timetable', {}, 'Create Timetable') },
    { label: 'Exams', icon: <ExamIcon />, action: () => navigateTo('examManagement', {}, 'Exam Management') },
    { label: 'Announcements', icon: <BellIcon />, action: () => navigateTo('communicationHub', {}, 'Communication Hub') },
    { label: 'Fee Management', icon: <ReceiptIcon />, action: () => navigateTo('feeManagement', {}, 'Fee Management') },
    { label: 'Teacher Attendance', icon: <TeacherAttendanceIcon />, action: () => navigateTo('teacherAttendance', {}, 'Teacher Attendance') },
    { label: 'System Settings', icon: <SettingsIcon />, action: () => navigateTo('systemSettings', {}, 'System Settings') },
    { label: 'View Report Cards', icon: <DocumentTextIcon />, action: () => navigateTo('schoolReports', {}, 'School Reports') },
    { label: 'Publish Reports', icon: <ReportIcon />, action: () => navigateTo('reportCardPublishing', {}, 'Publish Reports') },
    { label: 'Online Store', icon: <ShoppingCartIcon />, action: () => navigateTo('onlineStore', {}, 'Online Store') },
  ];

  const totalStudents = mockStudents.length;
  const presentStudents = mockStudents.filter(s => s.attendanceStatus === 'Present' || s.attendanceStatus === 'Late').length;
  const attendancePercentage = totalStudents > 0 ? Math.round((presentStudents / totalStudents) * 100) : 0;
  const totalTeachers = mockTeachers.length;

  return (
    <div className="p-4 space-y-5 bg-gray-100">
      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <p className="font-bold text-3xl text-indigo-600">{totalStudents}</p>
          <p className="text-sm text-gray-500 font-medium">Students</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <p className="font-bold text-3xl text-indigo-600">{totalTeachers}</p>
          <p className="text-sm text-gray-500 font-medium">Teachers</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center">
            <div className="relative">
                <DonutChart percentage={attendancePercentage} color="#4f46e5" size={40} strokeWidth={5} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-indigo-600">{attendancePercentage}%</span>
                </div>
            </div>
            <p className="text-sm text-gray-500 font-medium mt-1">Attendance</p>
        </div>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-3 gap-4">
        {gridItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center space-y-2 text-center hover:bg-indigo-50 transition-colors"
          >
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
              {React.cloneElement(item.icon, { className: 'h-6 w-6' })}
            </div>
            <span className="font-semibold text-indigo-900 text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;