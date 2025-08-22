import React, { useState, useMemo } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { LessonPlan } from '../../types';
import { mockLessonPlans } from '../../data';
import { AIIcon, BookOpenIcon, ChevronRightIcon, PlusIcon } from '../../constants';

interface LessonPlannerScreenProps {
  navigateTo: (view: string, title: string, props: any) => void;
}

const LessonPlannerScreen: React.FC<LessonPlannerScreenProps> = ({ navigateTo }) => {
    const [topic, setTopic] = useState('');
    const [grade, setGrade] = useState('');
    const [duration, setDuration] = useState('40');
    const [isGenerating, setIsGenerating] = useState(false);
    const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>(mockLessonPlans);

    const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.API_KEY }), []);

    const handleGeneratePlan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic || !grade || !duration) {
            alert("Please fill in all fields to generate a plan.");
            return;
        }
        setIsGenerating(true);
        try {
            const prompt = `Create a detailed lesson plan for a class.
            - Topic: ${topic}
            - Grade Level: ${grade}
            - Lesson Duration: ${duration} minutes
            
            The lesson plan should include clear learning objectives, a list of required materials, a sequence of learning activities with descriptions, and a method for assessment.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            grade: { type: Type.STRING },
                            subject: { type: Type.STRING },
                            objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
                            materials: { type: Type.ARRAY, items: { type: Type.STRING } },
                            activities: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        title: { type: Type.STRING },
                                        description: { type: Type.STRING }
                                    }
                                }
                            },
                            assessment: { type: Type.STRING }
                        }
                    }
                }
            });

            const generatedPlan = JSON.parse(response.text) as Omit<LessonPlan, 'id'>;
            const newPlan: LessonPlan = { ...generatedPlan, id: Date.now() };

            setLessonPlans(prev => [newPlan, ...prev]);
            navigateTo('lessonPlanDetail', newPlan.title, { plan: newPlan });

        } catch (error) {
            console.error("Lesson Plan Generation Error:", error);
            alert("Failed to generate lesson plan. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <main className="flex-grow p-4 space-y-5 overflow-y-auto">
                {/* AI Generation Form */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-2 mb-3">
                        <AIIcon className="h-6 w-6 text-purple-600"/>
                        <h3 className="font-bold text-lg text-gray-800">Generate New Lesson Plan</h3>
                    </div>
                    <form onSubmit={handleGeneratePlan} className="space-y-3">
                        <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Lesson Topic (e.g., The Water Cycle)" required className="w-full px-3 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"/>
                        <div className="grid grid-cols-2 gap-3">
                            <input type="text" value={grade} onChange={e => setGrade(e.target.value)} placeholder="Grade Level (e.g., JSS 1)" required className="w-full px-3 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"/>
                            <input type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration (mins)" required className="w-full px-3 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"/>
                        </div>
                        <button type="submit" disabled={isGenerating} className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:bg-purple-700 transition-colors disabled:bg-gray-400">
                            {isGenerating ? 'Generating...' : 'Create Plan'}
                        </button>
                    </form>
                </div>

                {/* Existing Lesson Plans */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 px-1">My Lesson Plans</h3>
                    <div className="space-y-3">
                        {lessonPlans.map(plan => (
                            <button key={plan.id} onClick={() => navigateTo('lessonPlanDetail', plan.title, { plan })} className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-purple-50 transition-colors text-left">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-purple-100 text-purple-700 p-3 rounded-lg">
                                        <BookOpenIcon className="h-6 w-6"/>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-800">{plan.title}</p>
                                        <p className="text-sm text-gray-600">{plan.grade} - {plan.subject}</p>
                                    </div>
                                </div>
                                <ChevronRightIcon className="text-gray-400" />
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LessonPlannerScreen;
