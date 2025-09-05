import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GeneratedLessonPlan, DetailedNote } from '../../types';
import { BookOpenIcon, ClipboardListIcon } from '../../constants';

interface LessonContentScreenProps {
  lessonPlan: GeneratedLessonPlan;
  detailedNote?: DetailedNote; // Note is optional
}

const LessonContentScreen: React.FC<LessonContentScreenProps> = ({ lessonPlan, detailedNote }) => {
  return (
    <div className="p-4 bg-gray-50 printable-area">
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div>
                <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-purple-100 p-2 rounded-lg">
                        <ClipboardListIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Lesson Plan: {lessonPlan.topic}</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                    <p><strong>Week:</strong> {lessonPlan.week}</p>
                    <p><strong>Duration:</strong> {lessonPlan.duration}</p>
                    <div><strong>Objectives:</strong><ul className="list-disc list-inside ml-4">{(lessonPlan.objectives || []).map((o, i) => <li key={i}>{o}</li>)}</ul></div>
                    <div><strong>Materials:</strong><p>{(lessonPlan.materials || []).join(', ')}</p></div>
                    <div><strong>Key Vocabulary:</strong><p>{(lessonPlan.keyVocabulary || []).join(', ')}</p></div>
                    <div><strong>Teaching Steps:</strong><div className="space-y-2 mt-1 ml-4">{(lessonPlan.teachingSteps || []).map((s, i) => <div key={i}><strong className="block">{s.step}:</strong> <p className="pl-2">{s.description}</p></div>)}</div></div>
                    <div><strong>Assessment Methods:</strong><p>{(lessonPlan.assessmentMethods || []).join(', ')}</p></div>
                </div>
            </div>

            <div>
                <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-purple-100 p-2 rounded-lg">
                        <BookOpenIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Detailed Lesson Note</h2>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700">
                    {detailedNote ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{detailedNote.note}</ReactMarkdown>
                    ) : (
                        <p className="text-center text-gray-500 py-4">Detailed note not available for this topic.</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default LessonContentScreen;
