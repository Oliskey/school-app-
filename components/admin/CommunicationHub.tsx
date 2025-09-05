
import React, { useState } from 'react';
import { UsersIcon, ParentNavIcon, TeacherNavIcon, StudentNavIcon, AIIcon } from '../../constants';
import { GoogleGenAI, Type } from "@google/genai";

type Audience = 'all' | 'parents' | 'teachers' | 'students';

const AudienceCard = ({ icon, label, id, selected, onSelect }: { icon: React.ReactNode, label: string, id: Audience, selected: boolean, onSelect: () => void }) => {
  const baseStyle = "w-full p-4 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200";
  const selectedStyle = "ring-2 ring-sky-500 border-sky-500 scale-105";
  const hoverStyle = "hover:shadow-md hover:scale-105";
  
  return (
    <button onClick={onSelect} className={`${baseStyle} ${selected ? selectedStyle : 'border-transparent'} ${hoverStyle}`} aria-pressed={selected}>
      <div className={`mb-2 ${selected ? 'text-sky-500' : 'text-gray-500'}`}>{icon}</div>
      <span className={`font-semibold ${selected ? 'text-sky-600' : 'text-gray-700'}`}>{label}</span>
    </button>
  );
};


const CommunicationHub: React.FC = () => {
  const [selectedAudience, setSelectedAudience] = useState<Audience | null>(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);


  const audiences: { id: Audience, label: string, icon: React.ReactNode }[] = [
    { id: 'all', label: 'Everyone', icon: <UsersIcon className="h-8 w-8" /> },
    { id: 'parents', label: 'Parents', icon: <ParentNavIcon className="h-8 w-8" /> },
    { id: 'teachers', label: 'Teachers', icon: <TeacherNavIcon className="h-8 w-8" /> },
    { id: 'students', label: 'Students', icon: <StudentNavIcon className="h-8 w-8" /> },
  ];
  
  const handleGenerate = async () => {
    if (!aiPrompt) return;
    if (!selectedAudience) {
        alert("Please select an audience first to generate a tailored announcement.");
        return;
    }
    setIsGenerating(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const audienceText = selectedAudience === 'all' ? 'everyone (students, parents, and teachers)' : `the ${selectedAudience}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a school announcement targeted at ${audienceText}. The topic is: "${aiPrompt}". The tone should be appropriate for the selected audience.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING, description: 'A concise and informative title for the announcement.' },
                        message: { type: Type.STRING, description: 'The full message body of the announcement, written in a clear, friendly, and professional tone. Use newline characters for paragraphs.' }
                    }
                },
            }
        });
        const jsonResponse = JSON.parse(response.text.trim());
        setTitle(jsonResponse.title || '');
        setMessage(jsonResponse.message || '');
        setShowAiPrompt(false);
        setAiPrompt('');
    } catch (error) {
        console.error("AI Generation Error:", error);
        alert("Failed to generate announcement. Please try again.");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSend = () => {
    if (!selectedAudience || !title || !message) {
        alert('Please select an audience, and fill in the title and message.');
        return;
    }
    alert(`Message sent to ${selectedAudience}`);
    // Reset form
    setSelectedAudience(null);
    setTitle('');
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
        <main className="flex-grow p-4 space-y-5 overflow-y-auto">
            {/* Audience */}
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">1. Select Audience</h3>
                <div className="grid grid-cols-4 gap-3">
{/* FIX: Replaced spread operator with explicit props to avoid passing unexpected properties and resolve the TypeScript error. */}
                    {audiences.map(aud => (
                        <AudienceCard 
                            key={aud.id} 
                            icon={aud.icon}
                            label={aud.label}
                            id={aud.id}
                            selected={selectedAudience === aud.id}
                            onSelect={() => setSelectedAudience(aud.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Message Composition */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-gray-800">2. Compose Message</h3>
                    <button
                        type="button"
                        onClick={() => setShowAiPrompt(!showAiPrompt)}
                        className="flex items-center space-x-2 px-3 py-1 text-sm font-semibold text-sky-600 bg-sky-100 rounded-full hover:bg-sky-200 transition-colors"
                    >
                        <AIIcon className="h-4 w-4" />
                        <span>Generate with AI</span>
                    </button>
                </div>
                {showAiPrompt && (
                    <div className="bg-white p-3 rounded-xl shadow-sm mb-4 border border-sky-200 space-y-2">
                        <input type="text" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="e.g., a reminder about sports day" className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" disabled={isGenerating} />
                        <button onClick={handleGenerate} disabled={isGenerating || !aiPrompt} className="w-full px-4 py-2 text-sm font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-600 disabled:bg-gray-400">
                            {isGenerating ? 'Generating...' : 'Generate'}
                        </button>
                    </div>
                )}
                <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm">
                    <input id="announcement-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Announcement Title" required className="w-full px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 font-semibold" />
                    <textarea id="announcement-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={8} placeholder="Type your message here..." required className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" />
                </div>
            </div>
        </main>
        <div className="p-4 bg-white border-t border-gray-200">
            <button
                onClick={handleSend}
                disabled={!selectedAudience || !title || !message}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-400"
            >
                Send Announcement
            </button>
        </div>
    </div>
  );
};

export default CommunicationHub;