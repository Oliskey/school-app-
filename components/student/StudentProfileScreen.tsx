import React, { useState } from 'react';
import { BookOpenIcon } from '../../constants';
import { Student, AcademicRecord, BehaviorNote } from '../../types';
import { SUBJECT_COLORS } from '../../constants';

interface StudentProfileScreenProps {
  student: Student;
  handleBack: () => void;
}

const StudentProfileScreen: React.FC<StudentProfileScreenProps> = ({ student, handleBack }) => {
    const [imageError, setImageError] = useState(false);
    const behaviorNotes = student.behaviorNotes || [];

    return (
        <div className="p-4 space-y-4 bg-gray-50">
            {/* Student Header */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4">
                {imageError ? (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-4 border-orange-100">
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                ) : (
                    <img 
                        src={student.avatarUrl} 
                        alt={student.name} 
                        className="w-16 h-16 rounded-full object-cover border-4 border-orange-100"
                        onError={() => setImageError(true)}
                    />
                )}
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                    <p className="text-gray-500 font-medium">Grade {student.grade}{student.section}</p>
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
                            <span className="font-bold">{record.score}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Behavior Notes */}
            {behaviorNotes.length > 0 && (
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-gray-800 mb-3">Behavior Notes</h4>
                    <div className="space-y-3">
                        {behaviorNotes.slice(0, 3).map(note => (
                            <div key={note.id} className={`p-3 rounded-lg border-l-4 ${note.type === 'Positive' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                                <div className="flex justify-between">
                                    <h5 className="font-semibold text-gray-800">{note.title}</h5>
                                    <span className="text-xs text-gray-500">{new Date(note.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{note.note}</p>
                                <p className="text-xs text-gray-500 mt-2">By: {note.by}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentProfileScreen;