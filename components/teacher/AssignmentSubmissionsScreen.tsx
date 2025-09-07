import React, { useState, useMemo } from 'react';
import { Submission, Assignment } from '../../types';
import { mockSubmissions as initialSubmissions, mockAssignments } from '../../data';
import { CheckCircleIcon, ClockIcon, ChevronRightIcon, XCircleIcon } from '../../constants';

const StatusIcon = ({ status }: { status: 'Graded' | 'Ungraded' }) => {
  if (status === 'Graded') {
    return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
  }
  return <ClockIcon className="w-5 h-5 text-gray-400" />;
};

// New component for past submissions
const PastSubmissions: React.FC<{ studentId: number; currentAssignmentId: number }> = ({ studentId, currentAssignmentId }) => {
    const pastSubmissions = useMemo(() => {
        return initialSubmissions
            .filter(sub => sub.student.id === studentId && sub.assignmentId !== currentAssignmentId && sub.status === 'Graded')
            .map(sub => {
                const assignmentDetails = mockAssignments.find(a => a.id === sub.assignmentId);
                return { ...sub, title: assignmentDetails?.title || 'Unknown Assignment' };
            })
            .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
            .slice(0, 3); // Show latest 3
    }, [studentId, currentAssignmentId]);

    if (pastSubmissions.length === 0) {
        return <div className="p-4 text-center text-sm text-gray-500 bg-gray-50/50 border-t">No past graded submissions found.</div>;
    }

    return (
        <div className="p-4 bg-gray-50/50 border-t border-gray-200">
            <h5 className="font-bold text-sm text-gray-700 mb-2">Recent Submissions History</h5>
            <div className="space-y-3">
                {pastSubmissions.map(sub => (
                    <div key={sub.id} className="p-3 bg-white rounded-lg border">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-gray-800 text-sm truncate pr-2">{sub.title}</p>
                            <p className="font-bold text-purple-700 flex-shrink-0">{sub.grade}/100</p>
                        </div>
                        <p className="text-xs text-gray-500">Submitted: {new Date(sub.submittedAt).toLocaleDateString()}</p>
                        {sub.feedback && <p className="text-sm text-gray-600 mt-1 italic truncate">Feedback: "{sub.feedback}"</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

interface AssignmentSubmissionsScreenProps {
  assignment: Assignment;
  navigateTo: (view: string, title: string, props: any) => void;
  handleBack: () => void;
}

const AssignmentSubmissionsScreen: React.FC<AssignmentSubmissionsScreenProps> = ({ assignment, navigateTo, handleBack }) => {
  const [submissions, setSubmissions] = useState<Submission[]>(
    initialSubmissions.filter(sub => sub.assignmentId === assignment.id)
  );
  const [expandedStudentId, setExpandedStudentId] = useState<number | null>(null);
  
  const gradedCount = submissions.filter(s => s.status === 'Graded').length;
  const ungradedCount = submissions.length - gradedCount;

  const handleGradeSubmission = (submissionId: number, grade: number, feedback: string) => {
    setSubmissions(prevSubmissions =>
      prevSubmissions.map(sub =>
        sub.id === submissionId
          ? { ...sub, grade, feedback, status: 'Graded' as 'Graded' }
          : sub
      )
    );
    // Don't call handleBack here, let the user stay on the page
  };

  const viewOrGrade = (submission: Submission) => {
    navigateTo('gradeSubmission', 'Grade Submission', {
      submission: submission,
      assignment: assignment,
      onGrade: handleGradeSubmission,
    });
  };

  const toggleHistory = (studentId: number) => {
      setExpandedStudentId(prevId => prevId === studentId ? null : studentId);
  };

  // Calculate submission percentage
  const submissionPercentage = assignment.totalStudents > 0 
    ? Math.round((submissions.length / assignment.totalStudents) * 100) 
    : 0;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header with assignment details */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-gray-800">{assignment.title}</h1>
            <p className="text-sm text-gray-600">{assignment.className} • {assignment.subject}</p>
          </div>
          <button 
            onClick={handleBack}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Go back"
          >
            <XCircleIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Class Progress</span>
            <span className="font-medium text-gray-800">{submissionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full" 
              style={{ width: `${submissionPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{submissions.length} submitted</span>
            <span>{assignment.totalStudents - submissions.length} pending</span>
          </div>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-2 p-4 bg-white border-b border-gray-200">
        <div className="text-center p-2">
          <p className="text-lg font-bold text-purple-700">{submissions.length}/{assignment.totalStudents}</p>
          <p className="text-xs text-gray-500">Submitted</p>
        </div>
        <div className="text-center p-2">
          <p className="text-lg font-bold text-green-600">{gradedCount}</p>
          <p className="text-xs text-gray-500">Graded</p>
        </div>
        <div className="text-center p-2">
          <p className="text-lg font-bold text-blue-600">{ungradedCount}</p>
          <p className="text-xs text-gray-500">Ungraded</p>
        </div>
      </div>

      {/* Submissions List */}
      <main className="flex-grow p-4 space-y-3 overflow-y-auto">
        {submissions.length > 0 ? (
          submissions.map(submission => (
            <div key={submission.id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300">
              <div className="p-3 flex items-center space-x-3">
                <img src={submission.student.avatarUrl} alt={submission.student.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-grow min-w-0">
                  <div className="flex items-center space-x-1">
                    <p className="font-bold text-gray-800 truncate">{submission.student.name}</p>
                    <button 
                      onClick={() => toggleHistory(submission.student.id)} 
                      className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100" 
                      aria-label={`Show submission history for ${submission.student.name}`}
                    >
                      <ChevronRightIcon className={`h-4 w-4 transition-transform ${expandedStudentId === submission.student.id ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 space-x-2 mt-1">
                    <span>{new Date(submission.submittedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${submission.isLate ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {submission.isLate ? 'Late' : 'On Time'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-center">
                    <StatusIcon status={submission.status} />
                    {submission.status === 'Graded' && (
                      <span className="font-bold text-green-600 text-sm mt-1">{submission.grade}/100</span>
                    )}
                  </div>
                  <button 
                    onClick={() => viewOrGrade(submission)}
                    className="py-2 px-4 bg-purple-100 text-purple-700 text-sm font-semibold rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    {submission.status === 'Graded' ? 'View' : 'Grade'}
                  </button>
                </div>
              </div>
              {expandedStudentId === submission.student.id && (
                <PastSubmissions studentId={submission.student.id} currentAssignmentId={assignment.id} />
              )}
            </div>
          ))
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <ClipboardListIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No Submissions Yet</h3>
            <p className="text-gray-600">Students haven't submitted their assignments for {assignment.title}.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AssignmentSubmissionsScreen;