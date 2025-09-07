import React, { useState } from 'react';
import SuccessFeedback from '../ui/SuccessFeedback';

const AssignmentSubmitDemo: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate assignment submission
    setSuccessMessage('Assignment submitted successfully!');
    setShowSuccess(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Submit Assignment</h1>
      
      {/* Show success feedback when submission is successful */}
      {showSuccess && (
        <SuccessFeedback 
          message={successMessage} 
          onClose={() => setShowSuccess(false)}
        />
      )}
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Mathematics - Algebra Homework</h2>
          <p className="text-gray-600 mt-1">Due: Tomorrow, 10:00 AM</p>
        </div>
        
        <form onSubmit={handleSubmitAssignment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload File
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, DOC, or DOCX (MAX. 10MB)</p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Comments (Optional)
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Any additional information for your teacher"
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-medium rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Submit Assignment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignmentSubmitDemo;