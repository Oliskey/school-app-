
import React from 'react';
import { Student } from '../../types';
import { BookOpenIcon, ClipboardListIcon, SUBJECT_COLORS, CakeIcon } from '../../constants';

interface StudentProfileScreenProps {
  student: Student;
  handleBack: () => void;
}

const StudentProfileScreen: React.FC<StudentProfileScreenProps> = ({ student, handleBack }) => {
    
    const behaviorNotes = student.behaviorNotes || [];

    return (
        <div className="p-4 space-y-4 bg-gray-50">
            {/* Student Header */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4">
                <img src={student.avatarUrl} alt={student.name} className="w-16 h-16 rounded-full object-cover border-4 border-orange-100"/>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                    <p className="text-gray-500 font-medium">Grade {student.grade}{student.section}</p>
                    {student.birthday && (
                        <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                            <CakeIcon className="w-4 h-4" />
                            <span>{new Date(student.birthday.replace(/-/g, '/')).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Academic Performance */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center space-x-2 mb-3">
                    <BookOpenIcon className="h-5 w-5 text-orange-600" />
                    <h4 className="font-bold text-gray-800">Academic Performance</h4>
                </div>
                <div className="space-y-2">
                    {student.academicPerformance?.map(record => (
                        <div key={record.subject} className={`p-3 rounded-lg flex justify-between items-center ${SUBJECT_COLORS[record.subject] || 'bg-gray-100'}`}>
                            <span className="font-semibold">{record.subject}</span>
                            <span className="font-bold text-lg">{record.score}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Behavioral Notes */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2">
                        <ClipboardListIcon className="h-5 w-5 text-orange-600" />
                        <h4 className="font-bold text-gray-800">Behavioral Notes</h4>
                    </div>
                </div>

                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {behaviorNotes.length > 0 ? [...behaviorNotes].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(note => {
                        const isPositive = note.type === 'Positive';
                        return (
                             <div key={note.id} className={`p-3 rounded-lg border-l-4 ${isPositive ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                                <div className="flex justify-between items-start">
                                    <h5 className={`font-bold ${isPositive ? 'text-green-800' : 'text-red-800'}`}>{note.title}</h5>
                                    <p className="text-xs text-gray-500 font-medium flex-shrink-0 ml-2">{new Date(note.date.replace(/-/g, '/')).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                </div>
                                <p className="text-sm text-gray-700 mt-1">{note.note}</p>
                                <p className="text-xs text-gray-500 text-right mt-2 italic">- {note.by}</p>
                             </div>
                        );
                    }) : <p className="text-sm text-gray-400 text-center py-4">No behavioral notes recorded.</p>}
                </div>
            </div>
        </div>
    );
};

export default StudentProfileScreen;
