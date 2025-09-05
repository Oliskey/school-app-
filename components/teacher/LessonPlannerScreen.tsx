
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedResources, TermResources } from '../../types';
import { AIIcon, BookOpenIcon, SparklesIcon, TrashIcon, PlusIcon, UserGroupIcon, XCircleIcon } from '../../constants';

const GeneratingScreen: React.FC = () => {
    const messages = [
        "Analyzing curriculum standards...",
        "Designing engaging lesson plans...",
        "Crafting challenging exam questions...",
        "Aligning content with Bloom's Taxonomy...",
        "Brewing a fresh pot of coffee for the teacher...",
        "Generating marking schemes..."
    ];
    const [message, setMessage] = useState(messages[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(prev => messages[(messages.indexOf(prev) + 1) % messages.length]);
        }, 2500);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="p-6 flex flex-col items-center justify-center h-full text-center bg-gray-100">
            <AIIcon className="w-16 h-16 text-purple-400 animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Generating Your Resources</h2>
            <p className="text-gray-600 mt-2 transition-opacity duration-500">{message}</p>
        </div>
    );
};

interface SchemeEntry {
  week: number;
  topic: string;
  subTopics: string[];
}

const SchemeInput: React.FC<{ label: string; scheme: SchemeEntry[]; setScheme: React.Dispatch<React.SetStateAction<SchemeEntry[]>> }> = ({ label, scheme, setScheme }) => {

  const handleTopicChange = (weekIndex: number, value: string) => {
    const newScheme = [...scheme];
    newScheme[weekIndex].topic = value;
    setScheme(newScheme);
  };
  
  const handleSubTopicChange = (weekIndex: number, subTopicIndex: number, value: string) => {
    const newScheme = [...scheme];
    newScheme[weekIndex].subTopics[subTopicIndex] = value;
    setScheme(newScheme);
  };

  const addSubTopic = (weekIndex: number) => {
    const newScheme = [...scheme];
    newScheme[weekIndex].subTopics.push('');
    setScheme(newScheme);
  };

  const removeSubTopic = (weekIndex: number, subTopicIndex: number) => {
    const newScheme = [...scheme];
    newScheme[weekIndex].subTopics.splice(subTopicIndex, 1);
    setScheme(newScheme);
  };

  const addWeek = () => {
    const newWeek = scheme.length > 0 ? Math.max(...scheme.map(s => s.week)) + 1 : 1;
    setScheme([...scheme, { week: newWeek, topic: '', subTopics: [] }]);
  };

  const removeWeek = (indexToRemove: number) => {
    const newScheme = scheme.filter((_, index) => index !== indexToRemove);
    const renumberedScheme = newScheme.map((entry, index) => ({ ...entry, week: index + 1 }));
    setScheme(renumberedScheme);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="font-bold text-lg text-gray-800 mb-3">{label}</h3>
      <div className="space-y-3">
        {scheme.map((entry, weekIndex) => (
          <div key={weekIndex} className="bg-gray-50/70 p-3 rounded-lg border border-gray-200">
            {/* Main Topic Row */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-800">{entry.week}.</span>
              <input
                type="text"
                value={entry.topic}
                onChange={(e) => handleTopicChange(weekIndex, e.target.value)}
                placeholder="Main Topic for the Week"
                className="w-full p-2 font-semibold border text-gray-800 bg-white border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500"
              />
              <button type="button" onClick={() => removeWeek(weekIndex)} className="p-1 text-gray-400 hover:text-red-500" aria-label={`Remove Week ${entry.week}`}>
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
            {/* Sub-Topics */}
            <div className="pl-8 mt-2 space-y-2">
              {entry.subTopics.map((subTopic, subIndex) => (
                <div key={subIndex} className="flex items-center gap-2">
                  <span className="text-gray-400">-</span>
                  <input
                    type="text"
                    value={subTopic}
                    onChange={(e) => handleSubTopicChange(weekIndex, subIndex, e.target.value)}
                    placeholder="Add a sub-topic or learning objective"
                    className="w-full p-1.5 text-sm border bg-white text-gray-800 border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500"
                  />
                  <button type="button" onClick={() => removeSubTopic(weekIndex, subIndex)} className="p-1 text-gray-400 hover:text-red-500" aria-label={`Remove sub-topic`}>
                    <XCircleIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addSubTopic(weekIndex)} className="flex items-center space-x-1 py-1 px-2 text-xs font-semibold text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200">
                <PlusIcon className="w-4 h-4" />
                <span>Add Sub-Topic</span>
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addWeek} className="mt-2 w-full flex items-center justify-center space-x-1 py-2 text-sm font-semibold text-purple-700 border-2 border-dashed border-gray-300 rounded-lg hover:bg-purple-50 hover:border-purple-300">
          <PlusIcon className="w-4 h-4" />
          <span>Add Week to {label.split(' ')[0]} Term</span>
        </button>
      </div>
    </div>
  );
};


const HomeScreen: React.FC<{
    onGenerate: (subject: string, className: string, schemes: { term1: SchemeEntry[]; term2: SchemeEntry[]; term3: SchemeEntry[]; }) => void;
    isGenerating: boolean;
}> = ({ onGenerate, isGenerating }) => {
    const [subject, setSubject] = useState('English');
    const [className, setClassName] = useState('JSS 2');
    const [term1Scheme, setTerm1Scheme] = useState<SchemeEntry[]>(() => {
        const initialString = '1. Revision of Parts of Speech\n2. Types of Nouns\n3. Types of Pronouns\n4. Introduction to Verbs\n5. Adjectives and Adverbs\n6. Conjunctions & Prepositions\n7. Mid-Term Test\n8. Introduction to Clauses\n9. Simple Sentences\n10. Compound Sentences\n11. Complex Sentences\n12. Revision & Examination';
        return initialString.split('\n').map((line, index) => ({
            week: index + 1,
            topic: line.replace(/^\d+\.\s*/, ''),
            subTopics: []
        }));
    });
    const [term2Scheme, setTerm2Scheme] = useState<SchemeEntry[]>([]);
    const [term3Scheme, setTerm3Scheme] = useState<SchemeEntry[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(subject, className, { term1: term1Scheme, term2: term2Scheme, term3: term3Scheme });
    };

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col overflow-hidden">
                <main className="flex-grow p-4 space-y-5 overflow-y-auto">
                    <div className="bg-purple-50 p-4 rounded-xl text-center border border-purple-200">
                        <SparklesIcon className="h-10 w-10 mx-auto text-purple-400 mb-2" />
                        <h3 className="font-bold text-lg text-purple-800">AI Curriculum Co-Pilot</h3>
                        <p className="text-sm text-purple-700">Input your termly topics and let AI build a comprehensive set of lesson plans, assessments, and notes for your entire academic year.</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <div className="relative">
                                    <BookOpenIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input id="subject" type="text" value={subject} onChange={e => setSubject(e.target.value)} required className="w-full pl-10 p-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"/>
                                </div>
                            </div>
                            <div>
                                 <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                                <div className="relative">
                                    <UserGroupIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input id="className" type="text" value={className} onChange={e => setClassName(e.target.value)} required className="w-full pl-10 p-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SchemeInput label="First Term Scheme of Work" scheme={term1Scheme} setScheme={setTerm1Scheme} />
                    <SchemeInput label="Second Term Scheme of Work" scheme={term2Scheme} setScheme={setTerm2Scheme} />
                    <SchemeInput label="Third Term Scheme of Work" scheme={term3Scheme} setScheme={setTerm3Scheme} />
                </main>
                <div className="p-4 mt-auto bg-white border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={isGenerating || !subject || !className || term1Scheme.length === 0}
                        className="w-full flex justify-center items-center space-x-2 py-3 px-4 font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400"
                    >
                        <SparklesIcon className="h-5 w-5" />
                        <span>Generate Resources</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export const LessonPlannerScreen: React.FC<{ navigateTo: (view: string, title: string, props?: any) => void; }> = ({ navigateTo }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async (subject: string, className: string, schemes: { term1: SchemeEntry[]; term2: SchemeEntry[]; term3: SchemeEntry[]; }) => {
        setIsGenerating(true);
        setError(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const formatSchemeForPrompt = (termName: string, scheme: SchemeEntry[]): string => {
                if (scheme.length === 0 || scheme.every(s => !s.topic.trim())) return `${termName}: Not provided.`;
                const schemeString = scheme
                    .filter(s => s.topic.trim())
                    .map(s => {
                        let entryString = `Week ${s.week}: ${s.topic}`;
                        if (s.subTopics.length > 0 && s.subTopics.some(st => st.trim())) {
                            const subTopicsList = s.subTopics.filter(st => st.trim()).map(st => `  - ${st}`).join('\n');
                            entryString += `\n${subTopicsList}`;
                        }
                        return entryString;
                    }).join('\n');
                return `${termName}:\n${schemeString}`;
            };

            const schemesForPrompt = [
                formatSchemeForPrompt('First Term', schemes.term1),
                formatSchemeForPrompt('Second Term', schemes.term2),
                formatSchemeForPrompt('Third Term', schemes.term3)
            ].join('\n\n');

            const prompt = `
                You are an expert curriculum designer. Based on the provided schemes of work for ${subject} for class ${className}, generate a complete set of educational resources for the entire academic year.

                The schemes are:
                ${schemesForPrompt}

                For EACH term with a provided scheme, generate:
                1. A 'schemeOfWork' array, breaking the input text into objects with 'week' and 'topic'.
                2. A 'lessonPlans' array. For each topic in the scheme, create a detailed lesson plan object.
                3. An 'assessments' array. Create at least one 'Test' and one 'Exam' for each term with relevant questions.

                Structure the entire output as a single JSON object that strictly adheres to the provided schema.
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                           subject: { type: Type.STRING },
                           className: { type: Type.STRING },
                           terms: {
                               type: Type.ARRAY,
                               items: {
                                   type: Type.OBJECT,
                                   properties: {
                                       term: { type: Type.STRING },
                                       schemeOfWork: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { week: { type: Type.INTEGER }, topic: { type: Type.STRING } } } },
                                       lessonPlans: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { week: { type: Type.INTEGER }, topic: { type: Type.STRING }, objectives: { type: Type.ARRAY, items: { type: Type.STRING } }, materials: { type: Type.ARRAY, items: { type: Type.STRING } }, teachingSteps: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { step: { type: Type.STRING }, description: { type: Type.STRING } } } }, duration: { type: Type.STRING }, keyVocabulary: { type: Type.ARRAY, items: { type: Type.STRING } }, assessmentMethods: { type: Type.ARRAY, items: { type: Type.STRING } } } } },
                                       assessments: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { type: { type: Type.STRING }, totalMarks: { type: Type.INTEGER }, questions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.INTEGER }, question: { type: Type.STRING }, type: { type: Type.STRING }, options: { type: Type.ARRAY, items: { type: Type.STRING } }, answer: { type: Type.STRING }, explanation: { type: Type.STRING }, marks: { type: Type.INTEGER } } } } } } }
                                   }
                               }
                           }
                        }
                    }
                }
            });

            const resources = JSON.parse(response.text.trim());
            navigateTo('lessonPlanDetail', `AI Plan: ${subject}`, { resources });

        } catch (e) {
            console.error(e);
            setError("Failed to generate resources. The AI might be busy, or the request was too complex. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    }, [navigateTo]);

    if (isGenerating) {
        return <GeneratingScreen />;
    }

    return <HomeScreen onGenerate={handleGenerate} isGenerating={isGenerating} />;
};

export default LessonPlannerScreen;
