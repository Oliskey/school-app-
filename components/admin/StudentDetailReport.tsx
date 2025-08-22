
import React from 'react';
import { Student } from '../../types';
import { DocumentTextIcon, BookOpenIcon, ClipboardListIcon, CheckCircleIcon, SUBJECT_COLORS } from '../../constants';
import DonutChart from '../ui/DonutChart';

interface StudentDetailReportProps {
  student: Student;
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

const StudentDetailReport: React.FC<StudentDetailReportProps> = ({ student }) => {
    const academicPerformance = student.academicPerformance || [];
    const averageScore = academicPerformance.length > 0
        ? Math.round(academicPerformance.reduce((sum, record) => sum + record.score, 0) / academicPerformance.length)
        : 0;
        
    // Mock detailed attendance data for a better visual representation
    const attendanceData = {
        present: 175,
        absent: 5,
        late: 2,
        leave: 3,
    };
    const totalDays = Object.values(attendanceData).reduce((sum, val) => sum + val, 0);
    const presentPercentage = totalDays > 0 ? Math.round(((attendanceData.present + attendanceData.late) / totalDays) * 100) : 0;


    return (
        <div className="p-4 space-y-4 bg-gray-50">
            {/* Student Header */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img src={student.avatarUrl} alt={student.name} className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100"/>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                        <p className="text-gray-500 font-medium">Grade {student.grade}{student.section}{student.department && `, ${student.department}`}</p>
                    </div>
                </div>
                <button className="flex items-center space-x-2 px-3 py-2 text-sm font-semibold text-sky-700 bg-sky-100 rounded-lg hover:bg-sky-200">
                    <DocumentTextIcon className="w-5 h-5" />
                    <span>Download</span>
                </button>
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
        </div>
    );
};

export default StudentDetailReport;
