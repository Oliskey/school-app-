import React, { useMemo } from 'react';
import { Assignment, Submission, StudentAssignment } from '../../types';
import { mockAssignments, mockSubmissions } from '../../data';
import { CheckCircleIcon, ClockIcon, ExclamationCircleIcon, DocumentTextIcon, SUBJECT_COLORS } from '../../constants';

interface StudentAssignmentsScreenProps {
    studentId: number;
    subjectFilter?: string;
    navigateTo: (view: string, title: string, props?: any) => void;
}

const AssignmentsScreen: React.FC<StudentAssignmentsScreenProps> = ({ studentId, subjectFilter, navigateTo }) => {
    
    const studentAssignments = useMemo(() => {
        const studentSubmissionsMap = new Map<number, Submission>();
        mockSubmissions
            .filter(s => s.student.id === studentId)
            .forEach(s => studentSubmissionsMap.set(s.assignmentId, s));

        return mockAssignments
            .filter(assignment => !subjectFilter || assignment.subject === subjectFilter)
            .map(assignment => ({
                ...assignment,
                submission: studentSubmissionsMap.get(assignment.id)
            }))
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }, [studentId, subjectFilter]);

    const getStatus = (assignment: StudentAssignment) => {
        const dueDate = new Date(assignment.dueDate);
        const now = new Date();

        if (assignment.submission) {
            if (assignment.submission.status === 'Graded') {
                return { text: `Graded: ${assignment.submission.grade}/100`, icon: <CheckCircleIcon />, color: 'text-green-600', isComplete: true };
            }
            return { text: 'Submitted', icon: <CheckCircleIcon />, color: 'text-sky-600', isComplete: true };
        }

        if (dueDate < now) {
            return { text: 'Overdue', icon: <ExclamationCircleIcon />, color: 'text-red-600', isComplete: false };
        }
        return { text: 'Pending', icon: <ClockIcon />, color: 'text-amber-600', isComplete: false };
    };

    const getButtonInfo = (assignment: StudentAssignment) => {
        const isOverdue = new Date(assignment.dueDate) < new Date() && !assignment.submission;
        
        if (assignment.submission?.status === 'Graded') {
            return { text: 'View Grade', style: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md' };
        }
        if (assignment.submission) {
            return { text: 'View Submission', style: 'bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white shadow-md' };
        }
        if (isOverdue) {
            return { text: 'Submit Late', style: 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-md' };
        }
        return { text: 'Submit Now', style: 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-md' };
    };

    const handleButtonClick = (assignment: StudentAssignment, buttonText: string) => {
        switch(buttonText) {
            case 'View Grade':
                navigateTo('assignmentFeedback', 'View Feedback', { assignment });
                break;
            case 'Submit Now':
            case 'Submit Late':
            case 'View Submission':
                navigateTo('assignmentSubmission', 'Submit Assignment', { assignment });
                break;
            default:
                console.log("No action defined for:", buttonText);
        }
    };


    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100">
            <main className="flex-grow p-3 md:p-5 space-y-4 md:space-y-5 overflow-y-auto">
                {studentAssignments.length > 0 ? studentAssignments.map(assignment => {
                    const status = getStatus(assignment);
                    const subjectColor = SUBJECT_COLORS[assignment.subject] || 'bg-gray-100 text-gray-800';
                    const buttonInfo = getButtonInfo(assignment);

                    return (
                        <div key={assignment.id} className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg overflow-hidden transition-all hover:shadow-lg transform hover:-translate-y-0.5">
                            <div className="p-4 md:p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-bold text-lg md:text-xl text-gray-800 pr-2 md:pr-3 flex-1">{assignment.title}</h4>
                                    <span className={`px-3 py-1.5 text-xs md:text-sm font-bold rounded-full flex-shrink-0 ${subjectColor} shadow-sm`}>
                                        {assignment.subject}
                                    </span>
                                </div>

                                <div className="flex items-center text-sm md:text-base text-gray-600 mt-2 md:mt-3">
                                    <ClockIcon className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2 text-gray-500" />
                                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 md:px-5 md:py-4 flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 border-t border-gray-100">
                                <div className={`flex items-center space-x-2 text-sm md:text-base font-bold ${status.color}`}>
                                    {React.cloneElement(status.icon, { className: `w-5 h-5 md:w-6 md:h-6 ${status.isComplete ? 'animate-checkmark-pop' : ''}`.trim() })}
                                    <span>{status.text}</span>
                                </div>

                                <button 
                                  onClick={() => handleButtonClick(assignment, buttonInfo.text)}
                                  className={`px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base font-bold rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-105 ${buttonInfo.style}`}
                                >
                                    {buttonInfo.text}
                                </button>
                            </div>
                        </div>
                    );
                }) : (
                    <div className="text-center py-12 md:py-16 bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg mt-6 md:mt-8">
                        <DocumentTextIcon className="mx-auto h-12 md:h-16 w-12 md:w-16 text-gray-300" />
                        <h3 className="mt-3 md:mt-4 text-lg md:text-xl font-bold text-gray-900">No Assignments Found</h3>
                        <p className="mt-2 text-sm md:text-base text-gray-600 px-4">{subjectFilter ? `There are no assignments for this subject yet.` : `You're all caught up!`}</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AssignmentsScreen;