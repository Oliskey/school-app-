

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedResources, TermResources, GeneratedLessonPlan, GeneratedAssessment, AssessmentQuestion, DetailedNote, GeneratedHistoryEntry } from '../../types';
import { DocumentTextIcon, ShareIcon, BookOpenIcon, ClipboardListIcon, ChevronRightIcon, SparklesIcon } from '../../constants';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <h3 className="font-bold text-lg text-purple-800 border-b-2 border-purple-200 pb-1 mb-3">{title}</h3>
);

const SchemeOfWorkTab: React.FC<{ scheme: TermResources['schemeOfWork'] }> = ({ scheme }) => (
    <div className="overflow-x-auto bg-white p-2 rounded-lg border">
        <table className="min-w-full">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase w-24">Week</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase">Topic</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {scheme.map(item => (
                    <tr key={item.week}>
                        <td className="px-4 py-3 font-bold text-gray-800">{item.week}</td>
                        <td className="px-4 py-3 text-gray-700">{item.topic}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


const LessonPlanLink: React.FC<{ plan: GeneratedLessonPlan, onClick: () => void }> = ({ plan, onClick }) => {
    return (
        <button onClick={onClick} className="w-full text-left p-3 font-semibold flex justify-between items-center hover:bg-purple-50 bg-white rounded-lg border group transition-colors">
            <span className="text-purple-800 group-hover:text-purple-900">Week {plan.week}: {plan.topic}</span>
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        </button>
    );
};

const LessonPlansTab: React.FC<{ plans: TermResources['lessonPlans'], notes?: DetailedNote[], navigateTo: (view: string, title: string, props: any) => void; }> = ({ plans, notes, navigateTo }) => {
    const handlePlanClick = (plan: GeneratedLessonPlan) => {
        const noteData = notes?.find(n => n.topic === plan.topic);
        navigateTo('lessonContent', `Week ${plan.week}`, { lessonPlan: plan, detailedNote: noteData });
    };
    
    return (
        <div className="space-y-3">
            {plans.map(plan => (
                <LessonPlanLink key={plan.week} plan={plan} onClick={() => handlePlanClick(plan)} />
            ))}
        </div>
    );
};

const AssessmentDisplay: React.FC<{ assessment: GeneratedAssessment, navigateTo: (view: string, title: string, props?: any) => void; }> = ({ assessment, navigateTo }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-bold text-xl mb-2 text-gray-800">{assessment.type} ({assessment.totalMarks} Marks)</h4>
        {assessment.questions.slice(0, 2).map(q => ( // Show a preview of first 2 questions
            <div key={q.id} className="mb-2 pb-2 border-b last:border-b-0 text-gray-900">
                <p className="font-semibold text-gray-800 truncate">{q.id}. {q.question}</p>
            </div>
        ))}
        <div className="mt-4 border-t pt-3">
            <button
                onClick={() => navigateTo('assignmentView', `Assignment: ${assessment.type}`, { assessment })}
                className="w-full text-center py-2 px-4 bg-purple-100 text-purple-700 font-semibold rounded-lg hover:bg-purple-200 transition-colors"
            >
                View as Assignment
            </button>
        </div>
    </div>
);

const AssessmentsTab: React.FC<{ assessments: TermResources['assessments'], navigateTo: (view: string, title: string, props?: any) => void; }> = ({ assessments, navigateTo }) => (
    <div className="space-y-4">
        {assessments.map((ass, index) => <AssessmentDisplay key={index} assessment={ass} navigateTo={navigateTo} />)}
    </div>
);


const TermContent: React.FC<{ 
    termResource: TermResources, 
    resources: GeneratedResources, 
    navigateTo: (view: string, title: string, props?: any) => void;
}> = ({ termResource, resources, navigateTo }) => {
    const [activeTab, setActiveTab] = useState<'scheme' | 'plans' | 'assessments'>('scheme');
    return (
        <div>
            <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-4 print:hidden">
                <button onClick={() => setActiveTab('scheme')} className={`w-1/3 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'scheme' ? 'bg-white shadow text-black' : 'text-gray-600 hover:bg-gray-300/50'}`}>Scheme</button>
                <button onClick={() => setActiveTab('plans')} className={`w-1/3 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'plans' ? 'bg-white shadow text-black' : 'text-gray-600 hover:bg-gray-300/50'}`}>Lesson Plans</button>
                <button onClick={() => setActiveTab('assessments')} className={`w-1/3 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'assessments' ? 'bg-white shadow text-black' : 'text-gray-600 hover:bg-gray-300/50'}`}>Assessments</button>
            </div>
            {activeTab === 'scheme' && <SchemeOfWorkTab scheme={termResource.schemeOfWork} />}
            {activeTab === 'plans' && <LessonPlansTab plans={termResource.lessonPlans} notes={resources.detailedNotes} navigateTo={navigateTo} />}
            {activeTab === 'assessments' && <AssessmentsTab assessments={termResource.assessments} navigateTo={navigateTo} />}
        </div>
    );
};

const LessonPlanDetailScreen: React.FC<{ resources: GeneratedResources; navigateTo: (view: string, title: string, props?: any) => void; }> = ({ resources, navigateTo }) => {
    const [currentResources, setCurrentResources] = useState<GeneratedResources>(resources);
    const [activeTerm, setActiveTerm] = useState<string>(resources.terms[0]?.term || '');
    
    const handlePrint = () => window.print();
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Lesson Plan for ${resources.subject}`,
                text: `Check out the AI-generated lesson plan for ${resources.subject} (${resources.className}).`,
            }).catch(error => console.log('Error sharing:', error));
        } else {
            alert('Share feature not supported on this browser.');
        }
    };
    
    const activeTermData = currentResources.terms.find(t => t.term === activeTerm);

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <div className="p-3 border-b border-gray-200 flex justify-between items-center flex-shrink-0 bg-white print:hidden">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">AI Plan: {resources.subject} ({resources.className})</h2>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={handleShare} className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-semibold text-sky-700 bg-sky-100 rounded-md hover:bg-sky-200">
                        <ShareIcon className="w-4 h-4"/><span>Share</span>
                    </button>
                    <button onClick={handlePrint} className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-semibold text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200">
                        <DocumentTextIcon className="w-4 h-4"/><span>Print</span>
                    </button>
                </div>
            </div>

            <main className="flex-grow overflow-y-auto p-4 printable-area">
                <div className="flex space-x-2 mb-4 print:hidden">
                    {currentResources.terms.map(term => (
                        <button key={term.term} onClick={() => setActiveTerm(term.term)} className={`px-4 py-2 font-semibold rounded-lg ${activeTerm === term.term ? 'bg-purple-600 text-white shadow' : 'bg-white text-gray-900'}`}>
                            {term.term}
                        </button>
                    ))}
                </div>
                {activeTermData ? <TermContent termResource={activeTermData} resources={currentResources} navigateTo={navigateTo} /> : <p className="text-gray-900">Select a term to view resources.</p>}
            </main>
        </div>
    );
};

export default LessonPlanDetailScreen;