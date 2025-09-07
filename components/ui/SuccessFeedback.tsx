import React from 'react';

interface SuccessFeedbackProps {
  message: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const SuccessFeedback: React.FC<SuccessFeedbackProps> = ({ 
  message, 
  onClose, 
  showCloseButton = true 
}) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl text-center animate-fade-in shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-green-500 animate-checkmark-pop" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-base font-semibold text-green-800">
          {message}
        </p>
        
        {showCloseButton && (
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
};

export default SuccessFeedback;