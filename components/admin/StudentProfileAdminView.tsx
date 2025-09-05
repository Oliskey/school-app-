import React from 'react';
import { Student } from '../../types';
import { DocumentTextIcon, BookOpenIcon, ClipboardListIcon, CheckCircleIcon, SUBJECT_COLORS, EditIcon, MailIcon, getFormattedClassName } from '../../constants';
import DonutChart from '../ui/DonutChart';

interface StudentProfileAdminViewProps {
  student: Student;
  navigateTo: (view: string, title: string, props?: any) => void;
}

const SimpleBarChart = ({ data }: { data: { subject: string, score: number }[] }) => {
    const maxValue = 100;
    return (
        <div className="space-y-3 pt-2">
            {data.map(item => {
                const colorClass = SUBJECT_COLORS[item.subject] || 'bg-gray-200 text-gray-800';
                return (
                    <div key={item.subject} className="flex items-center space-x-2">
                        <span className="w-28 text-sm font-medium text-gray-600 truncate">{item.subject}</span>
                        <div className="flex-grow bg-gray-200 rounded-full h-5">
                            <div className={`${colorClass} h-5 rounded-full flex items-center justify-end pr-2 text-xs font-bold`} style={{ width: `${item.score}%` }}>
                                {item.score}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

const StudentProfileAdminView: React.FC<StudentProfileAdminViewProps> = ({ student, navigateTo }) => {
    const academicPerformance = student.academicPerformance || [];
    const averageScore = academicPerformance.length > 0
        ? Math.round(academicPerformance.reduce((sum, record) => sum + record.score, 0) / academicPerformance.length)
        : 0;
        
    const attendanceData = {
        present: 175,
        absent: 5,
        late: 2,
        leave: 3,
    };
    const totalDays = Object.values(attendanceData).reduce((sum, val) => sum + val, 0);
    const presentPercentage = totalDays > 0 ? Math.round(((attendanceData.present + attendanceData.late) / totalDays) * 100) : 0;
    const formattedClassName = getFormattedClassName(student.grade, student.section);

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <main className="flex-grow p-4 space-y-4 overflow-y-auto">
                {/* Student Header */}
                <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img src={student.avatarUrl} alt={student.name} className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100"/>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                            <p className="text-gray-500 font-medium">{formattedClassName}{student.department && `, ${student.department}`}</p>
                        </div>
                    </div>
                </div>

                {/* Academic Performance */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                        <BookOpenIcon className="h-5 w-5 text-indigo-600" />
                        <h4 className="font-bold text-gray-800">Academic Performance</h4>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                        <span className="font-semibold text-indigo-800">Overall Average</span>
                        <span className="text-2xl font-bold text-indigo-800">{averageScore}%</span>
                    </div>
                    <SimpleBarChart data={academicPerformance} />
                </div>

                {/* Attendance Summary */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-2 mb-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                        <h4 className="font-bold text-gray-800">Attendance Summary</h4>
                    </div>
                    <div className="flex items-center justify-around">
                        <div className="relative">
                            <DonutChart percentage={presentPercentage} color="#16a34a" size={100} strokeWidth={10} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-gray-800">{presentPercentage}%</span>
                                <span className="text-xs text-gray-500">Present</span>
                            </div>
                        </div>
                        <div className="space-y-1 text-sm font-medium">
                            <p>Present: <span className="font-bold text-green-600">{attendanceData.present} days</span></p>
                            <p>Absent: <span className="font-bold text-red-600">{attendanceData.absent} days</span></p>
                            <p>Late: <span className="font-bold text-blue-600">{attendanceData.late} days</span></p>
                            <p>On Leave: <span className="font-bold text-amber-600">{attendanceData.leave} days</span></p>
                        </div>
                    </div>
                </div>

                {/* Behavioral Notes */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-2 mb-3">
                        <ClipboardListIcon className="h-5 w-5 text-purple-600" />
                        <h4 className="font-bold text-gray-800">Behavioral Notes</h4>
                    </div>
                    <div className="space-y-3">
                        {(student.behaviorNotes && student.behaviorNotes.length > 0) ? student.behaviorNotes.map(note => (
                             <div key={note.id} className="bg-purple-50 p-3 rounded-lg">
                                <p className="text-sm text-gray-700">{note.note}</p>
                                <p className="text-xs text-gray-500 text-right mt-1">- {note.by} on {new Date(note.date).toLocaleDateString()}</p>
                             </div>
                        )) : <p className="text-sm text-gray-400 text-center py-4">No behavioral notes recorded.</p>}
                    </div>
                </div>
            </main>
            <div className="p-4 mt-auto bg-white border-t space-y-2 print:hidden">
                <h3 className="text-sm font-bold text-gray-500 text-center uppercase tracking-wider">Admin Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => navigateTo('addStudent', `Edit ${student.name}`, { studentToEdit: student })} className="flex items-center justify-center space-x-2 py-3 px-4 bg-indigo-100 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-200">
                        <EditIcon className="w-5 h-5" />
                        <span>Edit Profile</span>
                    </button>
                    <button onClick={() => navigateTo('adminSelectTermForReport', `Select Term for ${student.name}`, { student })} className="flex items-center justify-center space-x-2 py-3 px-4 bg-indigo-100 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-200">
                        <EditIcon className="w-5 h-5" />
                        <span>Edit Report Card</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentProfileAdminView;