import React from 'react';

interface AssessmentHeaderProps {
  schoolName: string;
  className: string;
  assessmentTitle: string;
  totalMarks: number;
}

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({ 
  schoolName, 
  className, 
  assessmentTitle, 
  totalMarks 
}) => {
  return (
    <header className="flex flex-col border-b-2 border-gray-300 pb-4 mb-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-800">{schoolName}</h1>
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-gray-600">Class: {className}</p>
        <div className="mt-2">
          <h2 className="text-xl font-bold text-gray-800">{assessmentTitle}</h2>
          <p className="font-semibold text-gray-600">Total Marks: {totalMarks}</p>
        </div>
      </div>
    </header>
  );
};

export default AssessmentHeader;