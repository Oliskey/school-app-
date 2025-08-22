import React from 'react';
import { LessonPlan } from '../../types';
import { BookOpenIcon, DocumentTextIcon, ShareIcon } from '../../constants';

interface LessonPlanDetailScreenProps {
  plan: LessonPlan;
}

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="font-bold text-lg text-purple-800 border-b-2 border-purple-200 pb-1 mb-2">{title}</h3>
        {children}
    </div>
);

const LessonPlanDetailScreen: React.FC<LessonPlanDetailScreenProps> = ({ plan }) => {
    const handlePrint = () => {
        window.print();
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: plan.title,
                text: `Check out this lesson plan for ${plan.subject}: ${plan.title}`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert('Sharing is not supported on your browser, but you can copy the link!');
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <div className="p-3 border-b border-gray-200 flex justify-end items-center space-x-2 flex-shrink-0 bg-white print:hidden">
                <button onClick={handleShare} className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-semibold text-sky-700 bg-sky-100 rounded-md hover:bg-sky-200">
                    <ShareIcon className="w-4 h-4"/>
                    <span>Share</span>
                </button>
                <button onClick={handlePrint} className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-semibold text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200">
                    <DocumentTextIcon className="w-4 h-4"/>
                    <span>Print</span>
                </button>
            </div>

            <main className="flex-grow overflow-y-auto p-4">
                <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl mx-auto printable-area">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <BookOpenIcon className="h-12 w-12 mx-auto text-purple-400 mb-2"/>
                        <h1 className="text-3xl font-bold text-gray-800">{plan.title}</h1>
                        <p className="text-md text-gray-500 mt-2">{plan.grade} | {plan.subject}</p>
                    </div>

                    <div className="space-y-6">
                        {/* Objectives */}
                        <Section title="Learning Objectives">
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {plan.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                            </ul>
                        </Section>

                        {/* Materials */}
                        <Section title="Materials">
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {plan.materials.map((mat, i) => <li key={i}>{mat}</li>)}
                            </ul>
                        </Section>

                        {/* Activities */}
                        <Section title="Learning Activities">
                            <div className="space-y-4">
                                {plan.activities.map((act, i) => (
                                    <div key={i}>
                                        <h4 className="font-semibold text-gray-800">{act.title}</h4>
                                        <p className="text-gray-700 pl-2">{act.description}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        {/* Assessment */}
                        <Section title="Assessment">
                            <p className="text-gray-700">{plan.assessment}</p>
                        </Section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LessonPlanDetailScreen;