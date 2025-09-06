import React from 'react';
import AssessmentHeader from '../shared/AssessmentHeader';

interface Question {
  id: number;
  text: string;
  marks: number;
}

interface AssessmentScreenProps {
  assessmentTitle: string;
  className: string;
  totalMarks: number;
  questions: Question[];
}

const AssessmentScreen: React.FC<AssessmentScreenProps> = ({ 
  assessmentTitle, 
  className, 
  totalMarks, 
  questions 
}) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 font-sans">
      <AssessmentHeader 
        schoolName="Smart School Academy" 
        className={className}
        assessmentTitle={assessmentTitle}
        totalMarks={totalMarks}
      />
      
      <main className="flex-grow overflow-y-auto">
        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-800">Question {question.id}</h3>
                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {question.marks} mark{question.marks > 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{question.text}</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <textarea 
                  className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter your answer here..."
                ></textarea>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200">
            Submit Assessment
          </button>
        </div>
      </main>
    </div>
  );
};

export default AssessmentScreen;