

import React, { useState } from 'react';
import { Submission, Assignment } from '../../types';
import { SparklesIcon, AIIcon } from '../../constants';
import { GoogleGenAI, Type } from "@google/genai";

interface GradeSubmissionScreenProps {
  submission: Submission;
  assignment: Assignment;
  onGrade: (submissionId: number, grade: number, feedback: string) => void;
}

const GradeSubmissionScreen: React.FC<GradeSubmissionScreenProps> = ({ submission, assignment, onGrade }) => {
  const [grade, setGrade] = useState<string>(submission.grade?.toString() || '');
  const [feedback, setFeedback] = useState<string>(submission.feedback || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const handleGenerateFeedback = async () => {
    if (!grade) {
      alert("Please enter a grade first to generate contextual feedback.");
      return;
    }
    setIsGenerating(true);
    setAiSuggestions([]);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate 3 distinct, constructive feedback comments for a student's assignment.
      - Assignment Title: "${assignment.title}"
      - Subject: "${assignment.subject}"
      - Student's Score: ${grade}/100
      - Student's Text Submission: "${submission.textSubmission || 'No text submitted.'}"
      
      The feedback should be encouraging and specific to the score. Provide the feedback in a JSON object with a single key "suggestions" which is an array of strings.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              suggestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        }
      });
      
      const jsonResponse = JSON.parse(response.text);
      if (jsonResponse.suggestions && Array.isArray(jsonResponse.suggestions)) {
        setAiSuggestions(jsonResponse.suggestions);
      } else {
        throw new Error("Invalid response format from AI.");
      }

    } catch (error) {
      console.error("AI Feedback Generation Error:", error);
      alert("Sorry, there was an error generating feedback. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericGrade = parseInt(grade, 10);
    if (isNaN(numericGrade) || numericGrade < 0 || numericGrade > 100) {
      alert('Please enter a valid grade between 0 and 100.');
      return;
    }
    onGrade(submission.id, numericGrade, feedback);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        <main className="flex-grow p-4 space-y-4 overflow-y-auto">
          {/* Student and Submission Info */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4">
            <img src={submission.student.avatarUrl} alt={submission.student.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <p className="font-bold text-xl text-gray-800">{submission.student.name}</p>
              <p className="text-sm text-gray-500">
                Submitted: {new Date(submission.submittedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </p>
              <span className={`mt-1 inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${submission.isLate ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {submission.isLate ? 'Late' : 'On Time'}
              </span>
            </div>
          </div>

          {/* Submission Preview */}
          {submission.textSubmission && (
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">Student's Submission</h3>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 max-h-40 overflow-y-auto">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{submission.textSubmission}</p>
                </div>
            </div>
          )}

          {/* Grading Form */}
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
            <div>
              <label htmlFor="grade-input" className="block text-sm font-medium text-gray-700 mb-1">Score (out of 100)</label>
              <input
                id="grade-input"
                type="number"
                value={grade}
                onChange={e => setGrade(e.target.value)}
                placeholder="e.g., 85"
                required
                min="0"
                max="100"
                className="w-full px-3 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="feedback-input" className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
              <textarea
                id="feedback-input"
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                rows={6}
                placeholder="Provide constructive feedback for the student..."
                className="w-full px-3 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            {/* AI Feedback Section */}
            <div>
              <button 
                type="button" 
                onClick={handleGenerateFeedback} 
                disabled={isGenerating || !grade}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 hover:border-purple-400 hover:text-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <AIIcon className="h-5 w-5" />
                  <span className="font-semibold">{isGenerating ? 'Generating...' : 'Generate Feedback with AI'}</span>
              </button>
              {aiSuggestions.length > 0 && (
                <div className="mt-3 space-y-2">
                  <h4 className="text-xs font-semibold text-gray-500">AI Suggestions (Click to use):</h4>
                  {aiSuggestions.map((suggestion, index) => (
                    <button 
                      type="button"
                      key={index}
                      onClick={() => setFeedback(suggestion)}
                      className="w-full text-left p-2 bg-purple-50 text-purple-800 text-sm rounded-lg hover:bg-purple-100 transition-colors flex items-start space-x-2">
                        <SparklesIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-500" />
                        <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        <div className="p-4 mt-auto bg-white border-t border-gray-200">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Submit Grade
          </button>
        </div>
      </form>
    </div>
  );
};

export default GradeSubmissionScreen;