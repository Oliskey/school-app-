import React, { useState } from 'react';
import SuccessFeedback from '../ui/SuccessFeedback';

const AssignmentSubmissionDemo: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate assignment submission
    setSuccessMessage('Assignment created successfully!');
    setShowSuccess(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Assignment</h1>
      
      {/* Show success feedback when submission is successful */}
      {showSuccess && (
        <SuccessFeedback 
          message={successMessage} 
          onClose={() => setShowSuccess(false)}
        />
      )}
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleAssignmentSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignment Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter assignment title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
              <option>Mathematics</option>
              <option>English</option>
              <option>Physics</option>
              <option>Chemistry</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter assignment instructions"
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-medium rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Create Assignment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignmentSubmissionDemo;