import React from 'react';
import { Assignment } from '../../types';
import { mockAssignments } from '../../data';
import { ChevronRightIcon, PlusIcon } from '../../constants';

const TeacherAssignmentsListScreen: React.FC<{ navigateTo: (view: string, title: string, props: any) => void; }> = ({ navigateTo }) => {
    
    return (
        <div className="flex flex-col h-full bg-gray-100 relative">
            <main className="flex-grow p-4 space-y-4 overflow-y-auto pb-24">
                {mockAssignments.map(assignment => (
                    <div key={assignment.id} className="bg-white p-4 rounded-xl shadow-sm space-y-3 transition-all hover:shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-lg text-gray-800">{assignment.title}</h4>
                                <p className="text-sm text-gray-500">{assignment.className}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-2xl text-purple-700">{assignment.submissionsCount}/{assignment.totalStudents}</p>
                                <p className="text-sm text-gray-500">Submitted</p>
                            </div>
                        </div>
                         <p className="text-xs text-gray-500 font-medium">
                            Due: {new Date(assignment.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                        <div className="border-t border-gray-100 pt-3">
                            <button 
                                onClick={() => navigateTo('assignmentSubmissions', `Submissions: ${assignment.title}`, { assignment })}
                                className="w-full text-center py-2 px-4 bg-purple-100 text-purple-700 font-semibold rounded-lg hover:bg-purple-200 transition-colors flex justify-center items-center space-x-2"
                                aria-label={`View submissions for ${assignment.title}`}
                            >
                                <span>View Submissions</span>
                                <ChevronRightIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                ))}
            </main>
            <div className="absolute bottom-6 right-6">
                <button
                    onClick={() => navigateTo('createAssignment', 'Create Assignment', {})}
                    className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    aria-label="Create new assignment"
                >
                    <PlusIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default TeacherAssignmentsListScreen;
