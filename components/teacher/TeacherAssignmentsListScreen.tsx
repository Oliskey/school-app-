import React from 'react';
import { Assignment, Student, Teacher } from '../../types';
import { mockAssignments, mockSubmissions, mockStudents, mockTeachers } from '../../data';
import { ChevronRightIcon, PlusIcon, SUBJECT_COLORS, SparklesIcon, ClipboardListIcon, ClockIcon, CheckCircleIcon } from '../../constants';

const LOGGED_IN_TEACHER_ID = 2; // Mrs. Funke Akintola

const TeacherAssignmentsListScreen: React.FC<{ navigateTo: (view: string, title: string, props: any) => void; }> = ({ navigateTo }) => {
    // Get the current teacher
    const currentTeacher: Teacher = mockTeachers.find(t => t.id === LOGGED_IN_TEACHER_ID)!;
    
    // Filter assignments based on the teacher's subject
    const filteredAssignments = mockAssignments.filter(assignment => 
        assignment.subject === currentTeacher.subject
    );
    
    // Group assignments by class (only for assignments that match the teacher's subject)
    const assignmentsByClass = filteredAssignments.reduce((acc, assignment) => {
        if (!acc[assignment.className]) {
            acc[assignment.className] = [];
        }
        acc[assignment.className].push(assignment);
        return acc;
    }, {} as Record<string, Assignment[]>);

    // Get students who have submitted for a specific assignment
    const getSubmittedStudents = (assignmentId: number) => {
        return mockSubmissions
            .filter(submission => submission.assignmentId === assignmentId)
            .map(submission => submission.student);
    };

    // Get students who have not submitted for a specific assignment
    const getNonSubmittedStudents = (assignment: Assignment) => {
        // Extract grade and section from className (e.g., "Grade 11C" -> grade: 11, section: "C")
        const classMatch = assignment.className.match(/Grade (\d+)([A-Z])/);
        if (!classMatch) return [];
        
        const grade = parseInt(classMatch[1]);
        const section = classMatch[2];
        
        // Get all students in the class
        const classStudents = mockStudents.filter(student => 
            student.grade === grade && student.section === section
        );
        
        // Get submitted student IDs
        const submittedStudentIds = getSubmittedStudents(assignment.id).map(student => student.id);
        
        // Return students who haven't submitted
        return classStudents.filter(student => !submittedStudentIds.includes(student.id));
    };

    // Get all students in a class
    const getClassStudents = (className: string) => {
        // Extract grade and section from className (e.g., "Grade 11C" -> grade: 11, section: "C")
        const classMatch = className.match(/Grade (\d+)([A-Z])/);
        if (!classMatch) return [];
        
        const grade = parseInt(classMatch[1]);
        const section = classMatch[2];
        
        // Get all students in the class
        return mockStudents.filter(student => 
            student.grade === grade && student.section === section
        );
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Get status badge for assignment based on due date
    const getAssignmentStatus = (dueDate: string) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            return { text: 'Overdue', className: 'bg-red-100 text-red-800' };
        } else if (diffDays === 0) {
            return { text: 'Due Today', className: 'bg-amber-100 text-amber-800' };
        } else if (diffDays <= 3) {
            return { text: 'Due Soon', className: 'bg-blue-100 text-blue-800' };
        } else {
            return { text: 'Active', className: 'bg-green-100 text-green-800' };
        }
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100 relative">
            {/* Header with title and stats */}
            <div className="bg-white p-3 md:p-4 border-b border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-1.5 md:mb-2">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
                        <ClipboardListIcon className="h-6 w-6 md:h-7 md:w-7 mr-2 text-purple-600" />
                        Assignments
                    </h1>
                    <span className="text-xs md:text-sm font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 md:px-3 md:py-1 rounded-full">
                        {Object.keys(assignmentsByClass).length} Classes
                    </span>
                </div>
                <p className="text-xs md:text-sm text-gray-600">
                    Manage assignments for your {currentTeacher.subject} classes
                </p>
            </div>
            
            <main className="flex-grow p-3 md:p-4 space-y-5 md:space-y-6 overflow-y-auto pb-20 md:pb-24">
                {Object.keys(assignmentsByClass).length > 0 ? (
                    Object.entries(assignmentsByClass).map(([className, assignments]) => {
                        const classStudents = getClassStudents(className);
                        const submittedStudents = assignments.flatMap(assignment => 
                            getSubmittedStudents(assignment.id)
                        );
                        const uniqueSubmittedStudents = Array.from(
                            new Set(submittedStudents.map(s => s.id))
                        ).map(id => submittedStudents.find(s => s.id === id)!);
                        
                        const nonSubmittedStudents = classStudents.filter(student => 
                            !uniqueSubmittedStudents.some(submitted => submitted.id === student.id)
                        );
                        
                        // Calculate submission percentage
                        const submissionPercentage = classStudents.length > 0 
                            ? Math.round((uniqueSubmittedStudents.length / classStudents.length) * 100) 
                            : 0;
                        
                        return (
                            <div key={className} className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
                                {/* Class header with progress */}
                                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 md:p-5">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-3 md:space-y-0">
                                        <div>
                                            <h3 className="font-bold text-lg md:text-xl">{className}</h3>
                                            <p className="text-xs md:text-sm opacity-90 mt-1">
                                                {classStudents.length} students • {uniqueSubmittedStudents.length} submitted
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl md:text-3xl font-bold">{submissionPercentage}%</p>
                                            <p className="text-xs opacity-90">Submitted</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 md:mt-4 w-full bg-purple-500 rounded-full h-2">
                                        <div 
                                            className="bg-white h-2 rounded-full transition-all duration-500 ease-out" 
                                            style={{ width: `${submissionPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                                
                                {/* Assignment list */}
                                <div className="p-4 md:p-5 space-y-4 md:space-y-5">
                                    {assignments.map(assignment => {
                                        const submittedStudents = getSubmittedStudents(assignment.id);
                                        const nonSubmittedStudents = getNonSubmittedStudents(assignment);
                                        
                                        // Calculate assignment submission percentage
                                        const assignmentSubmissionPercentage = assignment.totalStudents > 0 
                                            ? Math.round((assignment.submissionsCount / assignment.totalStudents) * 100) 
                                            : 0;
                                            
                                        const status = getAssignmentStatus(assignment.dueDate);
                                        
                                        return (
                                            <div key={assignment.id} className="border border-gray-200 rounded-lg md:rounded-xl p-4 md:p-5 hover:shadow-sm md:hover:shadow-md transition-all duration-300 bg-white hover:border-purple-200">
                                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 md:mb-4 space-y-3 md:space-y-0">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-2 md:space-y-0">
                                                            <h4 className="font-bold text-gray-800 text-base md:text-lg truncate">{assignment.title}</h4>
                                                            <span className={`text-xs font-semibold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full ml-0 md:ml-3 ${status.className} transition-all duration-300`}>
                                                                {status.text}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-3">
                                                            <span className={`text-xs font-semibold px-2.5 py-1 md:px-3 md:py-1 rounded-full ${SUBJECT_COLORS[assignment.subject] || 'bg-gray-200 text-gray-700'}`}>
                                                                {assignment.subject}
                                                            </span>
                                                            <div className="flex items-center text-xs text-gray-500">
                                                                <ClockIcon className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5" />
                                                                <span>Due: {formatDate(assignment.dueDate)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Progress bar */}
                                                <div className="mb-4 md:mb-5">
                                                    <div className="flex justify-between text-xs md:text-sm mb-1.5 md:mb-2">
                                                        <span className="text-gray-600 font-medium">Class Progress</span>
                                                        <span className="font-semibold text-gray-800">{assignmentSubmissionPercentage}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-700 ease-out" 
                                                            style={{ width: `${assignmentSubmissionPercentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="flex justify-between text-xs text-gray-500 mt-1.5 md:mt-2">
                                                        <span>{assignment.submissionsCount} submitted</span>
                                                        <span>{assignment.totalStudents - assignment.submissionsCount} pending</span>
                                                    </div>
                                                </div>
                                                
                                                {/* Student submission preview */}
                                                <div className="mb-4 md:mb-5">
                                                    <div className="flex items-center justify-between mb-2 md:mb-3">
                                                        <h5 className="text-sm font-semibold text-gray-700">Submissions</h5>
                                                        <span className="text-xs text-gray-500">
                                                            {submittedStudents.length}/{assignment.totalStudents}
                                                        </span>
                                                    </div>
                                                    
                                                    {submittedStudents.length > 0 ? (
                                                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                                                            {submittedStudents.slice(0, 5).map(student => (
                                                                <div key={student.id} className="flex items-center bg-green-50 text-green-800 px-2.5 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-xs font-medium transition-all duration-200 hover:bg-green-100">
                                                                    <CheckCircleIcon className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1" />
                                                                    {student.name.split(' ')[0]}
                                                                </div>
                                                            ))}
                                                            {submittedStudents.length > 5 && (
                                                                <div className="flex items-center bg-gray-100 text-gray-600 px-2.5 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-xs font-medium transition-all duration-200 hover:bg-gray-200">
                                                                    +{submittedStudents.length - 5} more
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="text-xs text-gray-500 italic py-2 px-2.5 md:py-2.5 md:px-3 bg-gray-50 rounded-md md:rounded-lg">
                                                            No submissions yet
                                                        </div>
                                                    )}
                                                    
                                                    {nonSubmittedStudents.length > 0 && (
                                                        <div className="mt-2 md:mt-3">
                                                            <div className="flex items-center justify-between mb-1.5 md:mb-2">
                                                                <span className="text-xs text-gray-500 font-medium">Pending</span>
                                                                <span className="text-xs text-gray-500">
                                                                    {nonSubmittedStudents.length}
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                                                {nonSubmittedStudents.slice(0, 3).map(student => (
                                                                    <div key={student.id} className="flex items-center bg-red-50 text-red-800 px-2.5 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-xs font-medium transition-all duration-200 hover:bg-red-100">
                                                                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full mr-1.5"></div>
                                                                        {student.name.split(' ')[0]}
                                                                    </div>
                                                                ))}
                                                                {nonSubmittedStudents.length > 3 && (
                                                                    <div className="flex items-center bg-gray-100 text-gray-600 px-2.5 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-xs font-medium transition-all duration-200 hover:bg-gray-200">
                                                                        +{nonSubmittedStudents.length - 3} more
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className="border-t border-gray-100 pt-4 md:pt-5">
                                                    <button 
                                                        onClick={() => {
                                                            navigateTo('assignmentSubmissions', `Submissions: ${assignment.title}`, { assignment });
                                                        }}
                                                        className="w-full text-center py-2.5 md:py-3 px-3 md:px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-md md:rounded-lg transition-all duration-300 flex justify-center items-center space-x-1.5 md:space-x-2 shadow-sm md:shadow-md hover:shadow-md md:hover:shadow-lg transform hover:-translate-y-0.5"
                                                        aria-label={`View submissions for ${assignment.title}`}
                                                    >
                                                        <span className="text-sm md:text-base">View Submissions</span>
                                                        <ChevronRightIcon className="h-4 w-4 md:h-5 md:w-5"/>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="bg-white p-8 md:p-10 rounded-xl md:rounded-2xl shadow-md md:shadow-lg text-center border border-gray-100 transition-all duration-300 hover:shadow-lg">
                        <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-4 md:mb-5">
                            <ClipboardListIcon className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">No Assignments Found</h3>
                        <p className="text-gray-600 text-sm md:text-base mb-5 md:mb-7 max-w-md mx-auto px-4">You don't have any assignments for your {currentTeacher.subject} classes yet.</p>
                        <button
                            onClick={() => navigateTo('createAssignment', 'Create Assignment', {})}
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl hover:shadow-md md:hover:shadow-lg transition-all font-bold text-base md:text-lg shadow-sm md:shadow-md transform hover:-translate-y-0.5 duration-300"
                        >
                            Create Your First Assignment
                        </button>
                    </div>
                )}
            </main>
            
            {/* Floating action buttons */}
            <div className="fixed bottom-5 md:bottom-6 right-5 md:right-6 space-y-3 md:space-y-4 z-20">
                <button
                    onClick={() => console.log('Assignment AI clicked')}
                    className="p-3 md:p-4 rounded-full text-white shadow-lg md:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    aria-label="Open Assignment AI Assistant"
                >
                    <SparklesIcon className="h-5 w-5 md:h-7 md:w-7" />
                </button>
                <button
                    onClick={() => navigateTo('createAssignment', 'Create Assignment', {})}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 md:p-5 rounded-full shadow-lg md:shadow-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105"
                    aria-label="Create new assignment"
                >
                    <PlusIcon className="h-5 w-5 md:h-7 md:w-7" />
                </button>
            </div>
        </div>
    );
};

export default TeacherAssignmentsListScreen;