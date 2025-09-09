

import React from 'react';
import { Teacher } from '../../types';
import { MailIcon, PhoneIcon, ChartBarIcon, CalendarIcon, EditIcon, gradeColors, SUBJECT_COLORS } from '../../constants';
import DonutChart from '../ui/DonutChart';
import { mockClasses } from '../../data';

interface TeacherDetailAdminViewProps {
  teacher: Teacher;
  navigateTo: (view: string, title: string, props?: any) => void;
}

const StatCard: React.FC<{ label: string; value: string | number; children: React.ReactNode }> = ({ label, value, children }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-3">
        <div className="bg-indigo-100 p-3 rounded-full">{children}</div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const TeacherDetailAdminView: React.FC<TeacherDetailAdminViewProps> = ({ teacher, navigateTo }) => {
    const teacherClasses = mockClasses.filter(c => teacher.classes.includes(c.grade + c.section));

    return (
        <div className="p-4 space-y-4 bg-gray-50">
            {/* Teacher Info */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4">
                <img src={teacher.avatarUrl} alt={teacher.name} className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100"/>
                <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-800">{teacher.name}</h3>
                    <p className={`text-sm font-semibold inline-block px-2 py-0.5 rounded ${SUBJECT_COLORS[teacher.subjects[0]] || 'bg-gray-200'}`}>{teacher.subjects.join(', ')}</p>
                    <div className="flex space-x-4 mt-2">
                         <a href={`mailto:${teacher.email}`} className="flex items-center space-x-1 text-sm text-gray-600 hover:text-indigo-600"><MailIcon className="w-4 h-4"/><span>Email</span></a>
                         <a href={`tel:${teacher.phone}`} className="flex items-center space-x-1 text-sm text-gray-600 hover:text-indigo-600"><PhoneIcon className="w-4 h-4"/><span>Call</span></a>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                    <p className="text-sm text-gray-500">Attendance</p>
                    <div className="relative w-20 h-20 mx-auto mt-1">
                        <DonutChart percentage={95} color="#4f46e5" size={80} strokeWidth={9} />
                        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-800">95%</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                    <p className="text-sm text-gray-500">Avg. Student Score</p>
                    <p className="text-5xl font-bold text-indigo-600 mt-2">82%</p>
                </div>
            </div>

            {/* Assigned Classes */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2">Assigned Classes</h4>
                <div className="space-y-2">
                    {teacherClasses.map(c => (
                        <div key={c.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                            <p className="font-semibold text-gray-700">Grade {c.grade}{c.section} - {c.subject}</p>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${gradeColors[c.grade] || 'bg-gray-200'}`}>{c.studentCount} students</span>
                        </div>
                    ))}
                </div>
            </div>

             {/* Actions */}
            <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
                <button onClick={() => navigateTo('teacherPerformance', 'Performance Evaluation', { teacher })} className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg">
                    <ChartBarIcon className="w-6 h-6 text-indigo-500"/>
                    <span className="font-semibold text-gray-700">Performance Evaluation</span>
                </button>
                 <button onClick={() => navigateTo('teacherAttendanceDetail', `${teacher.name}'s Attendance`, { teacher })} className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg">
                    <CalendarIcon className="w-6 h-6 text-indigo-500"/>
                    <span className="font-semibold text-gray-700">Full Attendance Record</span>
                </button>
                <button onClick={() => alert('Edit profile')} className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg">
                    <EditIcon className="w-6 h-6 text-indigo-500"/>
                    <span className="font-semibold text-gray-700">Edit Profile</span>
                </button>
            </div>

        </div>
    );
};

export default TeacherDetailAdminView;
