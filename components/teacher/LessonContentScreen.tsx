
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GeneratedLessonPlan, DetailedNote } from '../../types';
import { BookOpenIcon, ClipboardListIcon } from '../../constants';

// A helper component for sections in the document-style view
const DocumentSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div>
        <div className="flex items-center space-x-3 py-2 border-b-2 border-gray-200 mb-4">
            <div className="text-purple-600">{icon}</div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{title}</h2>
        </div>
        <div className="prose prose-base max-w-none text-gray-800">
            {children}
        </div>
    </div>
);


const LessonContentScreen: React.FC<{ lessonPlan: GeneratedLessonPlan; detailedNote?: DetailedNote }> = ({ lessonPlan, detailedNote }) => {
  return (
    <div className="p-4 bg-gray-100 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg printable-area">
        <div className="space-y-12">
          
          <DocumentSection title={`Lesson Plan: ${lessonPlan.topic}`} icon={<ClipboardListIcon className="w-7 h-7" />}>
            <p><strong>Week:</strong> {lessonPlan.week}</p>
            <p><strong>Duration:</strong> {lessonPlan.duration}</p>
            <h4>Objectives</h4>
            <ul>{(lessonPlan.objectives || []).map((o, i) => <li key={i}>{o}</li>)}</ul>
            <h4>Materials</h4>
            <p>{(lessonPlan.materials || []).join(', ')}</p>
            <h4>Key Vocabulary</h4>
            <p>{(lessonPlan.keyVocabulary || []).join(', ')}</p>
            <h4>Teaching Steps</h4>
            <ol>{(lessonPlan.teachingSteps || []).map((s, i) => <li key={i}><strong>{s.step}:</strong> {s.description}</li>)}</ol>
            <h4>Assessment Methods</h4>
            <p>{(lessonPlan.assessmentMethods || []).join(', ')}</p>
          </DocumentSection>
          
          <DocumentSection title="Detailed Lesson Note" icon={<BookOpenIcon className="w-7 h-7" />}>
            {detailedNote ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{detailedNote.note}</ReactMarkdown>
            ) : (
                <p className="text-center text-gray-500 py-4 italic">Detailed note not available for this topic.</p>
            )}
          </DocumentSection>
          
        </div>
      </div>
    </div>
  );
};

export default LessonContentScreen;
