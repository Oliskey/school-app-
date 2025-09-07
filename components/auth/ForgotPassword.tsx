import React, { useState } from 'react';
import { SchoolLogoIcon, MailIcon } from '../../constants';
import { DashboardType } from '../../types';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Email validation
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setSuccess(false);
    setShowSuccessAnimation(true);

    // Simulate API call to send reset link
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setIsEmailSent(true);
      // In a real app, you would send a request to your backend here
    }, 1500);
  };

  const handleResend = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setShowSuccessAnimation(true);
    
    // Simulate resending the email
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      // In a real app, you would resend the request to your backend here
    }, 1500);
  };

  const handleBackToLogin = () => {
    // Reset all states when going back to login
    setEmail('');
    setError('');
    setSuccess(false);
    setIsEmailSent(false);
    setShowSuccessAnimation(false);
    onBackToLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-sky-100 via-green-50 to-amber-100 p-4">
      <div className="w-full max-w-sm mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 transition-all duration-500 ease-in-out hover:shadow-2xl hover:bg-white/90">
        <div className="flex flex-col items-center justify-center mb-8 text-center transition-all duration-500 ease-in-out">
          <div className="relative mb-4">
            <SchoolLogoIcon className="text-sky-500 h-20 w-20 transition-transform duration-300 hover:scale-105 mx-auto drop-shadow-lg" />
            <div className="absolute inset-0 bg-sky-500 rounded-full opacity-0 transition-opacity duration-300 hover:opacity-10"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-2 transition-all duration-300 ease-in-out">
            {isEmailSent ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Check Your Email
              </>
            ) : (
              'Forgot Password?'
            )}
          </h1>
          <p className="text-gray-600 text-center mt-3 transition-all duration-300 ease-in-out max-w-xs leading-relaxed">
            {isEmailSent 
              ? <span className="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mb-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="font-semibold text-gray-800">{email}</span>
                  <span className="mt-2">Check your inbox for a password reset link.</span>
                </span>
              : (
                <span className="flex flex-col items-center justify-center">
                  <span>Enter your email address below</span>
                  <span className="mt-1 text-sm">We'll send you a link to reset your password</span>
                </span>
              )}
          </p>
        </div>

        {success ? (
          <div className="space-y-6">
            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-14 w-14 text-green-500 ${showSuccessAnimation ? 'animate-checkmark-pop' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-base font-semibold text-green-800">
                Password reset link sent!
              </p>
              <p className="text-sm text-green-700 mt-2">
                We've sent a password reset link to <span className="font-bold">{email}</span>
              </p>
            </div>
            
            <div className="text-center bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-gray-700 text-sm font-medium">
                Didn't receive the email?
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Check your spam or junk folder. It may take a few minutes to arrive.
              </p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleResend}
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white ${
                  isLoading 
                    ? 'bg-gray-400' 
                    : 'bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 hover:shadow-md'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : 'Resend Email'}
              </button>
              
              <button
                onClick={handleBackToLogin}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all"
              >
                Back to Login
              </button>
            </div>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 sr-only">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MailIcon className="text-gray-400 h-5 w-5" />
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3.5 text-gray-700 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-200 rounded-xl text-center shadow-sm">
                <div className="flex justify-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-red-700">{error}</p>
                <p className="text-xs text-red-600 mt-1">Please check your email address and try again</p>
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white ${
                  isLoading 
                    ? 'bg-gray-400' 
                    : 'bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 hover:shadow-md'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : 'Send Reset Link'}
              </button>
              
              <button
                type="button"
                onClick={handleBackToLogin}
                className="w-full flex justify-center py-3.5 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Already remember your password? <button onClick={handleBackToLogin} className="font-medium text-sky-600 hover:text-sky-500 hover:underline transition-colors duration-200">Sign in here</button></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;