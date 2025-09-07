import React, { useState } from 'react';
import SuccessFeedback from '../ui/SuccessFeedback';

const FeedbackSubmitDemo: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate feedback submission
    setSuccessMessage('Feedback submitted successfully!');
    setShowSuccess(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Parent Feedback</h1>
      
      {/* Show success feedback when submission is successful */}
      {showSuccess && (
        <SuccessFeedback 
          message={successMessage} 
          onClose={() => setShowSuccess(false)}
        />
      )}
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Share Your Feedback</h2>
          <p className="text-gray-600 mt-1">We value your input to improve our school experience</p>
        </div>
        
        <form onSubmit={handleSubmitFeedback} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
              <option>General Feedback</option>
              <option>Academic Concerns</option>
              <option>Extracurricular Activities</option>
              <option>Facility Issues</option>
              <option>Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Child's Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter your child's name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feedback
            </label>
            <textarea
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Please share your feedback with us"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Preference (Optional)
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="rounded text-sky-500 focus:ring-sky-500" />
                <span className="ml-2 text-gray-700">Email</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="rounded text-sky-500 focus:ring-sky-500" />
                <span className="ml-2 text-gray-700">Phone</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="rounded text-sky-500 focus:ring-sky-500" />
                <span className="ml-2 text-gray-700">In-person meeting</span>
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-medium rounded-lg hover:from-sky-600 hover:to-emerald-600 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackSubmitDemo;