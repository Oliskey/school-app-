

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
    <div className="space-y-2 text-gray-900">
        {scheme.map(item => (
            <div key={item.week} className="flex p-2 bg-gray-50 rounded-lg">
                <span className="font-bold w-16 flex-shrink-0">Week {item.week}:</span>
                <span>{item.topic}</span>
            </div>
        ))}
    </div>
);

const LessonPlanAccordion: React.FC<{ plan: GeneratedLessonPlan }> = ({ plan }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white rounded-lg border">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-3 font-semibold flex justify-between items-center hover:bg-gray-50">
                <span className="text-gray-900">Week {plan.week}: {plan.topic}</span>
                <ChevronRightIcon className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-3 border-t space-y-3 text-sm text-gray-800">
                    <div><strong>Objectives:</strong><ul className="list-disc list-inside ml-2 text-gray-900">{(plan.objectives || []).map((o, i) => <li key={i}>{o}</li>)}</ul></div>
                    <div><strong>Materials:</strong><p className="text-gray-900">{(plan.materials || []).join(', ')}</p></div>
                    <div><strong>Steps:</strong><div className="space-y-1 mt-1 text-gray-900">{(plan.teachingSteps || []).map((s, i) => <p key={i}><strong>{s.step}:</strong> {s.description}</p>)}</div></div>
                    <div><strong>Assessment:</strong><p className="text-gray-900">{(plan.assessmentMethods || []).join(', ')}</p></div>
                </div>
            )}
        </div>
    );
};

const LessonPlansTab: React.FC<{ plans: TermResources['lessonPlans'] }> = ({ plans }) => {
    return (
        <div className="space-y-3">
            {plans.map(plan => (
                <LessonPlanAccordion key={plan.week} plan={plan} />
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

const DetailedNotesTab: React.FC<{ 
    notes?: DetailedNote[]; 
    scheme: TermResources['schemeOfWork']; 
    onGenerate: () => void;
    isGenerating: boolean;
    navigateTo: (view: string, title: string, props: any) => void;
}> = ({ notes, scheme, onGenerate, isGenerating, navigateTo }) => {
    
    const relevantNotes = notes?.filter(note => scheme.some(s => s.topic === note.topic)) || [];

    if (relevantNotes.length > 0) {
        return (
            <div className="space-y-2">
                {scheme.map(item => {
                    const noteData = relevantNotes.find(n => n.topic === item.topic);
                    if (!noteData) return null;

                    return (
                        <button 
                            key={item.week}
                            onClick={() => navigateTo('detailedLessonNote', `Note: ${item.topic}`, { note: noteData.note, title: item.topic })}
                            className="w-full text-left p-3 font-semibold flex justify-between items-center hover:bg-gray-100 bg-white rounded-lg border"
                        >
                            <span>Week {item.week}: {item.topic}</span>
                            <ChevronRightIcon />
                        </button>
                    );
                })}
            </div>
        );
    }
    
    return (
        <div className="text-center p-6 bg-gray-50 rounded-lg border">
            <h4 className="font-bold text-lg text-gray-800">Generate Detailed Notes</h4>
            <p className="text-sm text-gray-600 my-2 max-w-md mx-auto">
                Create comprehensive, ready-to-use lesson notes for all topics in this term with a single click.
            </p>
            <button
                onClick={onGenerate}
                disabled={isGenerating}
                className="mt-2 inline-flex items-center justify-center space-x-2 py-2 px-6 bg-purple-600 text-white font-semibold rounded-xl shadow-md hover:bg-purple-700 transition-colors disabled:bg-gray-400"
            >
                <SparklesIcon className="w-5 h-5" />
                <span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
            </button>
        </div>
    );
};

const TermContent: React.FC<{ 
    termResource: TermResources, 
    resources: GeneratedResources, 
    navigateTo: (view: string, title: string, props?: any) => void;
    onGenerateNotes: () => void;
    isGeneratingNotes: boolean;
}> = ({ termResource, resources, navigateTo, onGenerateNotes, isGeneratingNotes }) => {
    const [activeTab, setActiveTab] = useState<'scheme' | 'plans' | 'assessments' | 'notes'>('scheme');
    return (
        <div>
            <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-4 print:hidden">
                <button onClick={() => setActiveTab('scheme')} className={`w-1/4 py-2 text-sm font-semibold rounded-md ${activeTab === 'scheme' ? 'bg-white shadow' : 'text-gray-800'}`}>Scheme</button>
                <button onClick={() => setActiveTab('plans')} className={`w-1/4 py-2 text-sm font-semibold rounded-md ${activeTab === 'plans' ? 'bg-white shadow' : 'text-gray-800'}`}>Lesson Plans</button>
                <button onClick={() => setActiveTab('assessments')} className={`w-1/4 py-2 text-sm font-semibold rounded-md ${activeTab === 'assessments' ? 'bg-white shadow' : 'text-gray-800'}`}>Assessments</button>
                 <button onClick={() => setActiveTab('notes')} className={`w-1/4 py-2 text-sm font-semibold rounded-md ${activeTab === 'notes' ? 'bg-white shadow' : 'text-gray-800'}`}>Detailed Notes</button>
            </div>
            {activeTab === 'scheme' && <SchemeOfWorkTab scheme={termResource.schemeOfWork} />}
            {activeTab === 'plans' && <LessonPlansTab plans={termResource.lessonPlans} />}
            {activeTab === 'assessments' && <AssessmentsTab assessments={termResource.assessments} />}
            {activeTab === 'notes' && (
                <DetailedNotesTab 
                    notes={resources.detailedNotes} 
                    scheme={termResource.schemeOfWork} 
                    navigateTo={navigateTo} 
                    onGenerate={onGenerateNotes}
                    isGenerating={isGeneratingNotes}
                />
            )}
        </div>
    );
};

const LessonPlanDetailScreen: React.FC<{ resources: GeneratedResources; navigateTo: (view: string, title: string, props?: any) => void; }> = ({ resources, navigateTo }) => {
    const [currentResources, setCurrentResources] = useState<GeneratedResources>(resources);
    const [activeTerm, setActiveTerm] = useState<string>(resources.terms[0]?.term || '');
    const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
    
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

    const handleNotesGenerated = (newNotes: DetailedNote[]) => {
        const updatedResources = { ...currentResources };
        if (!updatedResources.detailedNotes) {
            updatedResources.detailedNotes = [];
        }
        
        newNotes.forEach(newNote => {
            const existingIndex = updatedResources.detailedNotes!.findIndex(n => n.topic === newNote.topic);
            if (existingIndex > -1) {
                updatedResources.detailedNotes![existingIndex] = newNote;
            } else {
                updatedResources.detailedNotes!.push(newNote);
            }
        });

        setCurrentResources(updatedResources);
        
        try {
            const GENERATED_HISTORY_KEY = 'generatedLessonPlanHistory_v1';
            const savedHistory = localStorage.getItem(GENERATED_HISTORY_KEY);
            if(savedHistory) {
                const history: GeneratedHistoryEntry[] = JSON.parse(savedHistory);
                const entryIndex = history.findIndex(h => h.subject === updatedResources.subject && h.className === updatedResources.className);
                if (entryIndex > -1) {
                    history[entryIndex].resources = updatedResources;
                    localStorage.setItem(GENERATED_HISTORY_KEY, JSON.stringify(history));
                }
            }
        } catch(e) {
            console.error("Could not update generated history in localStorage", e);
        }
    };

    const handleGenerateNotes = async () => {
        if (!activeTermData) return;
        setIsGeneratingNotes(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const topics = activeTermData.schemeOfWork.map(s => s.topic).join(', ');

            const prompt = `Generate detailed, comprehensive lesson notes in Markdown format for the following topics related to ${resources.subject} for ${resources.className}: ${topics}.
            
            For each topic, provide a well-structured note that a teacher could use directly in class.
            
            Return the response as a JSON object with a single key "detailedNotes". This key should hold an array of objects, where each object has a "topic" key (the topic string) and a "note" key (the full markdown note string).`;
            
            const responseSchema = {
                type: Type.OBJECT,
                properties: {
                    detailedNotes: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                topic: { type: Type.STRING },
                                note: { type: Type.STRING }
                            },
                            required: ['topic', 'note']
                        }
                    }
                },
                required: ['detailedNotes']
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { responseMimeType: "application/json", responseSchema }
            });

            const result = JSON.parse(response.text.trim());
            if (result.detailedNotes) {
                handleNotesGenerated(result.detailedNotes);
            }

        } catch (e) {
            console.error("Error generating detailed notes:", e);
            alert("Failed to generate notes. The AI may be busy, please try again.");
        } finally {
            setIsGeneratingNotes(false);
        }
    };

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
                {activeTermData ? <TermContent termResource={activeTermData} resources={currentResources} navigateTo={navigateTo} onGenerateNotes={handleGenerateNotes} isGeneratingNotes={isGeneratingNotes} /> : <p className="text-gray-900">Select a term to view resources.</p>}
            </main>
        </div>
    );
};

export default LessonPlanDetailScreen;
