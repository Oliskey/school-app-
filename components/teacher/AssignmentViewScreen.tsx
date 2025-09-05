import React from 'react';
import { GeneratedAssessment } from '../../types';
import { SchoolLogoIcon, DocumentTextIcon } from '../../constants';

interface AssignmentViewScreenProps {
    assessment: GeneratedAssessment;
    handleBack: () => void;
}

const AssignmentViewScreen: React.FC<AssignmentViewScreenProps> = ({ assessment, handleBack }) => {
    
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <div className="p-3 border-b border-gray-200 flex justify-between items-center flex-shrink-0 bg-white print:hidden">
                <h2 className="text-lg font-bold text-gray-800">Assignment View</h2>
                <button onClick={handlePrint} className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-semibold text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200">
                    <DocumentTextIcon className="w-4 h-4"/><span>Print</span>
                </button>
            </div>
            
            <main className="flex-grow overflow-y-auto p-4">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg printable-area font-serif">
                    <header className="text-center border-b-2 pb-4 mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">{assessment.type}</h1>
                        <p className="text-gray-600 font-semibold mt-1">Total Marks: {assessment.totalMarks}</p>
                    </header>
                    <div className="space-y-6">
                        {assessment.questions.map(q => (
                            <div key={q.id}>
                                <p className="font-semibold text-gray-800">{q.id}. {q.question} ({q.marks} marks)</p>
                                {q.options && (
                                    <ul className="list-decimal list-inside ml-6 mt-2 space-y-1 text-gray-700">
                                        {q.options.map((opt, i) => <li key={i}>{opt}</li>)}
                                    </ul>
                                )}
                                {q.type === 'short-answer' && <div className="mt-2 border-b-2 border-dotted h-8"></div>}
                                {q.type === 'theory' && <div className="mt-2 border-b-2 border-dotted h-24"></div>}
                                {q.type === 'practical' && <div className="mt-2 p-2 border border-dashed rounded-md h-24 text-gray-400 text-sm">Space for practical work/diagram.</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AssignmentViewScreen;
