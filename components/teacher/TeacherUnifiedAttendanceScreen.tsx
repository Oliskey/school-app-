

import React, { useState, useMemo, useCallback } from 'react';
import { ChevronRightIcon } from '../../constants';
import { mockStudents, mockTeachers, mockClasses } from '../../data';
import { Student, AttendanceStatus, ClassInfo, Teacher } from '../../types';

const LOGGED_IN_TEACHER_ID = 2;

const AttendanceStatusButtons = ({ status, onStatusChange }: { status: AttendanceStatus, onStatusChange: (newStatus: AttendanceStatus) => void }) => {
    const statusOptions: AttendanceStatus[] = ['Present', 'Absent', 'Late', 'Leave'];
    const statusStyles: { [key in AttendanceStatus]: { button: string, text: string } } = {
        Present: { button: 'bg-green-100 text-green-700 ring-green-500', text: 'P' },
        Absent: { button: 'bg-red-100 text-red-700 ring-red-500', text: 'A' },
        Late: { button: 'bg-blue-100 text-blue-700 ring-blue-500', text: 'L' },
        Leave: { button: 'bg-amber-100 text-amber-700 ring-amber-500', text: 'Lv' },
    };

    return (
        <div className="flex items-center space-x-1">
            {statusOptions.map(option => (
                <button
                    key={option}
                    onClick={() => onStatusChange(option)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                        status === option 
                        ? statusStyles[option].button
                        : 'bg-gray-200 text-gray-600'
                    }`}
                >
                    {statusStyles[option].text}
                </button>
            ))}
        </div>
    );
};

const ClassAccordion: React.FC<{
    classInfo: ClassInfo,
    students: Student[],
    isOpen: boolean,
    onToggle: () => void,
    onStatusChange: (studentId: number, status: AttendanceStatus) => void,
}> = ({ classInfo, students, isOpen, onToggle, onStatusChange }) => {
    const presentCount = students.filter(s => s.attendanceStatus === 'Present' || s.attendanceStatus === 'Late').length;
    
    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-4 text-left"
                aria-expanded={isOpen}
            >
                <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 text-purple-700 font-bold w-12 h-12 rounded-lg flex items-center justify-center text-lg">
                        {classInfo.grade}{classInfo.section}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Grade {classInfo.grade}{classInfo.section}</h3>
                        <p className="text-sm text-gray-500">{classInfo.subject}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{presentCount}/{students.length} Present</span>
                    <ChevronRightIcon className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                </div>
            </button>
            {isOpen && (
                <div className="px-4 pb-4 pt-0">
                    <ul className="divide-y divide-gray-100">
                        {students.map(student => (
                            <li key={student.id} className="py-3 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <img src={student.avatarUrl} alt={student.name} className="w-10 h-10 rounded-full object-cover"/>
                                    <p className="font-semibold text-gray-700">{student.name}</p>
                                </div>
                                <AttendanceStatusButtons 
                                    status={student.attendanceStatus}
                                    onStatusChange={(newStatus) => onStatusChange(student.id, newStatus)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
};


const TeacherUnifiedAttendanceScreen: React.FC = () => {
    const [students, setStudents] = useState<Student[]>(mockStudents);
    const [openClassId, setOpenClassId] = useState<string | null>(null);

    const teacher: Teacher = useMemo(() => mockTeachers.find(t => t.id === LOGGED_IN_TEACHER_ID)!, []);
    
    const teacherClasses = useMemo(() => {
        const classSet = new Set<string>();
        teacher.classes.forEach(cls => classSet.add(cls));
        return mockClasses.filter(c => classSet.has(`${c.grade}${c.section}`));
    }, [teacher]);

    const studentsByClass = useMemo(() => {
        const grouped: { [classId: string]: Student[] } = {};
        teacherClasses.forEach(cls => {
            grouped[cls.id] = students.filter(s => s.grade === cls.grade && s.section === cls.section);
        });
        return grouped;
    }, [teacherClasses, students]);

    const handleToggle = (classId: string) => {
        setOpenClassId(prevId => (prevId === classId ? null : classId));
    };
    
    const handleStatusChange = useCallback((studentId: number, status: AttendanceStatus) => {
        setStudents(currentStudents =>
            currentStudents.map(student => 
                student.id === studentId ? { ...student, attendanceStatus: status } : student
            )
        );
    }, []);

    return (
         <div className="flex flex-col h-full bg-gray-100">
            <main className="flex-grow p-4 space-y-4 overflow-y-auto">
                {teacherClasses.map(classInfo => (
                    <ClassAccordion 
                        key={classInfo.id}
                        classInfo={classInfo}
                        students={studentsByClass[classInfo.id] || []}
                        isOpen={openClassId === classInfo.id}
                        onToggle={() => handleToggle(classInfo.id)}
                        onStatusChange={handleStatusChange}
                    />
                ))}
            </main>
            <div className="p-4 bg-white border-t border-gray-200">
                <button
                    onClick={() => alert(`All attendance records submitted!`)}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                    Submit All Attendance
                </button>
            </div>
        </div>
    );
};

export default TeacherUnifiedAttendanceScreen;