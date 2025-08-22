

import React, { useState } from 'react';
import { Submission, Assignment } from '../../types';
import { mockSubmissions as initialSubmissions } from '../../data';
import { CheckCircleIcon, ClockIcon } from '../../constants';

const StatusIcon = ({ status }: { status: 'Graded' | 'Ungraded' }) => {
  if (status === 'Graded') {
    return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
  }
  return <ClockIcon className="w-6 h-6 text-gray-400" />;
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
            <div key={submission.id} className="bg-white rounded-xl shadow-sm p-3 flex items-center space-x-3 transition-all hover:shadow-md">
              <img src={submission.student.avatarUrl} alt={submission.student.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-grow">
                <p className="font-bold text-gray-800">{submission.student.name}</p>
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
          ))}
        </div>
      </main>
    </div>
  );
};

export default AssignmentSubmissionsScreen;