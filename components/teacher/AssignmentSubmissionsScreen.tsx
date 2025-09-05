

import React, { useState, useMemo } from 'react';
import { Submission, Assignment } from '../../types';
import { mockSubmissions as initialSubmissions, mockAssignments } from '../../data';
import { CheckCircleIcon, ClockIcon, ChevronRightIcon } from '../../constants';

const StatusIcon = ({ status }: { status: 'Graded' | 'Ungraded' }) => {
  if (status === 'Graded') {
    return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
  }
  return <ClockIcon className="w-6 h-6 text-gray-400" />;
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
    handleBack();
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
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <main className="flex-grow p-4 space-y-4 overflow-y-auto">
        {/* Summary Header */}
        <div className="bg-white p-4 rounded-xl shadow-sm text-center grid grid-cols-3 divide-x divide-gray-200">
          <div>
            <p className="text-2xl font-bold text-purple-700">{submissions.length}/{assignment.totalStudents}</p>
            <p className="text-xs text-gray-500 font-medium">Submitted</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{gradedCount}</p>
            <p className="text-xs text-gray-500 font-medium">Graded</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{ungradedCount}</p>
            <p className="text-xs text-gray-500 font-medium">Ungraded</p>
          </div>
        </div>

        {/* Submissions List */}
        <div className="space-y-3">
          {submissions.map(submission => (
            <div key={submission.id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300">
              <div className="p-3 flex items-center space-x-3">
                <img src={submission.student.avatarUrl} alt={submission.student.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-grow">
                   <div className="flex items-center space-x-1">
                    <p className="font-bold text-gray-800">{submission.student.name}</p>
                    <button onClick={() => toggleHistory(submission.student.id)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100" aria-label={`Show submission history for ${submission.student.name}`}>
                        <ChevronRightIcon className={`h-4 w-4 transition-transform ${expandedStudentId === submission.student.id ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 space-x-2">
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
                      <span className="font-bold text-green-600 text-sm">{submission.grade}/100</span>
                    )}
                  </div>
                  <button 
                    onClick={() => viewOrGrade(submission)}
                    className="py-2 px-4 bg-purple-100 text-purple-700 text-sm font-semibold rounded-lg hover:bg-purple-200 transition-colors">
                    {submission.status === 'Graded' ? 'View' : 'Grade'}
                  </button>
                </div>
              </div>
               {expandedStudentId === submission.student.id && (
                  <PastSubmissions studentId={submission.student.id} currentAssignmentId={assignment.id} />
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AssignmentSubmissionsScreen;