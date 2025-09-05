import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GoogleGenAI } from "@google/genai";
import { GeneratedResources, TermResources, GeneratedLessonPlan, GeneratedAssessment, AssessmentQuestion } from '../../types';
import { DocumentTextIcon, ShareIcon, BookOpenIcon, ClipboardListIcon, SparklesIcon } from '../../constants';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <h3 className="font-bold text-lg text-purple-800 border-b-2 border-purple-200 pb-1 mb-3">{title}</h3>
);

const SchemeOfWorkTab: React.FC<{ scheme: TermResources['schemeOfWork'] }> = ({ scheme }) => (
    <div className="space-y-2 text-gray-900">
        {scheme.map(item => (
            <div key={item.week} className="flex p-2 bg-gray-50 rounded-lg">
                <span className="font-bold w-16 flex-shrink-0">Week {item.week}:</span>
                <span>{item.topic}</span>
            </div>
        ))}
    </div>
);

const LessonPlanAccordion: React.FC<{ plan: GeneratedLessonPlan; onGenerateNote: (plan: GeneratedLessonPlan) => void; isGenerating: boolean; }> = ({ plan, onGenerateNote, isGenerating }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white rounded-lg border">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-3 font-semibold flex justify-between items-center hover:bg-gray-50">
                <span className="text-gray-900">Week {plan.week}: {plan.topic}</span>
            </button>
            {isOpen && (
                <div className="p-3 border-t space-y-3 text-gray-800">
                    <div><strong>Objectives:</strong><ul className="list-disc list-inside ml-2 text-gray-900">{(plan.objectives || []).map((o, i) => <li key={i}>{o}</li>)}</ul></div>
                    <div><strong>Materials:</strong><p className="text-gray-900">{(plan.materials || []).join(', ')}</p></div>
                    <div><strong>Steps:</strong><div className="space-y-1 mt-1 text-gray-900">{(plan.teachingSteps || []).map((s, i) => <p key={i}><strong>{s.step}:</strong> {s.description}</p>)}</div></div>
                    <div><strong>Assessment:</strong><p className="text-gray-900">{(plan.assessmentMethods || []).join(', ')}</p></div>
                    <div className="mt-4 pt-3 border-t">
                        <button 
                            onClick={() => onGenerateNote(plan)}
                            disabled={isGenerating}
                            className="flex items-center space-x-2 px-3 py-1.5 text-sm font-semibold text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200 disabled:bg-gray-200 disabled:text-gray-500"
                        >
                            {isGenerating ? (
                                <SparklesIcon className="w-4 h-4 animate-pulse" />
                            ) : (
                                <SparklesIcon className="w-4 h-4" />
                            )}
                            <span>{isGenerating ? 'Generating...' : 'Create Detailed Lesson Note'}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const LessonPlansTab: React.FC<{ plans: TermResources['lessonPlans'] }> = ({ plans }) => {
    const [generatingNoteFor, setGeneratingNoteFor] = useState<number | null>(null);
    const [generatedNote, setGeneratedNote] = useState<{ week: number, note: string } | null>(null);

    const handleGenerateNote = async (plan: GeneratedLessonPlan) => {
        setGeneratingNoteFor(plan.week);
        setGeneratedNote(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Based on this structured lesson plan for the topic "${plan.topic}", generate a detailed, narrative-style "Teacher's Lesson Note". The note should be comprehensive, easy to follow, and include practical teaching tips. Format it nicely using markdown.

            Lesson Plan Details:
            - Topic: ${plan.topic}
            - Objectives: ${(plan.objectives || []).join(', ')}
            - Materials: ${(plan.materials || []).join(', ')}
            - Teaching Steps: ${(plan.teachingSteps || []).map(s => `${s.step}: ${s.description}`).join('\n')}
            - Assessment: ${(plan.assessmentMethods || []).join(', ')}
            `;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setGeneratedNote({ week: plan.week, note: response.text });
        } catch (error) {
            console.error(error);
            alert("Failed to generate lesson note.");
        } finally {
            setGeneratingNoteFor(null);
        }
    };

    return (
        <div className="space-y-3">
            {plans.map(plan => (
                <div key={plan.week}>
                    <LessonPlanAccordion 
                        plan={plan} 
                        onGenerateNote={handleGenerateNote}
                        isGenerating={generatingNoteFor === plan.week}
                    />
                    {generatedNote?.week === plan.week && (
                        <div className="mt-2 p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <h4 className="font-bold text-purple-800 mb-2">Generated Lesson Note for Week {plan.week}</h4>
                            <div className="prose prose-sm max-w-none text-gray-900">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{generatedNote.note}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const AssessmentDisplay: React.FC<{ assessment: GeneratedAssessment }> = ({ assessment }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-bold text-xl mb-2 text-gray-800">{assessment.type} ({assessment.totalMarks} Marks)</h4>
        {assessment.questions.map(q => (
            <div key={q.id} className="mb-4 pb-2 border-b last:border-b-0 text-gray-900">
                <p className="font-semibold text-gray-800">{q.id}. {q.question} ({q.marks} marks)</p>
                {q.options && <ul className="list-decimal list-inside ml-4 text-sm text-gray-700">{q.options.map((opt, i) => <li key={i}>{opt}</li>)}</ul>}
                <div className="mt-2 text-sm p-2 bg-green-50 rounded">
                    <p className="text-gray-900"><strong className="text-green-800">Answer:</strong> {q.answer}</p>
                    {q.explanation && <p className="text-gray-900"><strong className="text-green-800">Explanation:</strong> {q.explanation}</p>}
                </div>
            </div>
        ))}
    </div>
);

const AssessmentsTab: React.FC<{ assessments: TermResources['assessments'] }> = ({ assessments }) => (
    <div className="space-y-4">
        {assessments.map(ass => <AssessmentDisplay key={ass.type} assessment={ass} />)}
    </div>
);

const TermContent: React.FC<{ termResource: TermResources }> = ({ termResource }) => {
    const [activeTab, setActiveTab] = useState<'scheme' | 'plans' | 'assessments'>('scheme');
    return (
        <div>
            <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-4">
                <button onClick={() => setActiveTab('scheme')} className={`w-1/3 py-2 text-sm font-semibold rounded-md ${activeTab === 'scheme' ? 'bg-white shadow' : 'text-gray-800'}`}>Scheme of Work</button>
                <button onClick={() => setActiveTab('plans')} className={`w-1/3 py-2 text-sm font-semibold rounded-md ${activeTab === 'plans' ? 'bg-white shadow' : 'text-gray-800'}`}>Lesson Plans</button>
                <button onClick={() => setActiveTab('assessments')} className={`w-1/3 py-2 text-sm font-semibold rounded-md ${activeTab === 'assessments' ? 'bg-white shadow' : 'text-gray-800'}`}>Assessments</button>
            </div>
            {activeTab === 'scheme' && <SchemeOfWorkTab scheme={termResource.schemeOfWork} />}
            {activeTab === 'plans' && <LessonPlansTab plans={termResource.lessonPlans} />}
            {activeTab === 'assessments' && <AssessmentsTab assessments={termResource.assessments} />}
        </div>
    );
};

const AILessonPlannerResultsScreen: React.FC<{ resources: GeneratedResources; handleBack: () => void; }> = ({ resources, handleBack }) => {
    const [activeTerm, setActiveTerm] = useState<string>(resources.terms[0]?.term || '');
    
    const handlePrint = () => window.print();
    const handleShare = () => navigator.share ? navigator.share({ title: `Lesson Plan for ${resources.subject}`, url: window.location.href }) : alert('Share not supported.');
    
    const activeTermData = resources.terms.find(t => t.term === activeTerm);

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
                    {resources.terms.map(term => (
                        <button key={term.term} onClick={() => setActiveTerm(term.term)} className={`px-4 py-2 font-semibold rounded-lg ${activeTerm === term.term ? 'bg-purple-600 text-white shadow' : 'bg-white text-gray-900'}`}>
                            {term.term}
                        </button>
                    ))}
                </div>
                {activeTermData ? <TermContent termResource={activeTermData} /> : <p className="text-gray-900">Select a term to view resources.</p>}
            </main>
        </div>
    );
};

export default AILessonPlannerResultsScreen;