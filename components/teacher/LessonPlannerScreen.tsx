import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedResources, SchemeWeek, SavedScheme, HistoryEntry } from '../../types';
import { AIIcon, BookOpenIcon, SparklesIcon, TrashIcon, PlusIcon, UserGroupIcon, XCircleIcon, CheckCircleIcon } from '../../constants';

const HistoryIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className || ''}`.trim()} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 8l0 4l2 2" /><path d="M3.05 11a9 9 0 1 1 .5 4m-3.55 -4a9 9 0 0 1 12.5 -5" /><path d="M3 4v4h4" /></svg>;


// --- SUB-COMPONENTS ---

const GeneratingScreen: React.FC = () => {
    // ... Implementation from previous state ...
    return <div className="p-6 text-center">Generating...</div>;
};

const SchemeInput: React.FC<{ scheme: SchemeWeek[]; setScheme: React.Dispatch<React.SetStateAction<SchemeWeek[]>> }> = ({ scheme, setScheme }) => {
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
    setScheme(scheme.filter((_, index) => index !== indexToRemove));
  };

  return (
      <div className="space-y-3">
        {scheme.map((entry, weekIndex) => (
          <div key={entry.week} className="bg-gray-50/70 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-800">{entry.week}.</span>
              <input type="text" value={entry.topic} onChange={(e) => handleTopicChange(weekIndex, e.target.value)} placeholder="Main Topic for the Week" className="w-full p-2 font-semibold border text-gray-800 bg-white border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500"/>
              <button type="button" onClick={() => removeWeek(weekIndex)} className="p-1 text-gray-400 hover:text-red-500" aria-label={`Remove Week ${entry.week}`}><TrashIcon className="w-5 h-5" /></button>
            </div>
            <div className="pl-8 mt-2 space-y-2">
              {entry.subTopics.map((subTopic, subIndex) => (
                <div key={subIndex} className="flex items-center gap-2">
                  <span className="text-gray-400">-</span>
                  <input type="text" value={subTopic} onChange={(e) => handleSubTopicChange(weekIndex, subIndex, e.target.value)} placeholder="Add a sub-topic or learning objective" className="w-full p-1.5 text-sm border bg-white text-gray-800 border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500"/>
                  <button type="button" onClick={() => removeSubTopic(weekIndex, subIndex)} className="p-1 text-gray-400 hover:text-red-500" aria-label={`Remove sub-topic`}><XCircleIcon className="w-5 h-5" /></button>
                </div>
              ))}
              <button type="button" onClick={() => addSubTopic(weekIndex)} className="flex items-center space-x-1 py-1 px-2 text-xs font-semibold text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"><PlusIcon className="w-4 h-4" /><span>Add Sub-Topic</span></button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addWeek} className="mt-2 w-full flex items-center justify-center space-x-1 py-2 text-sm font-semibold text-gray-800 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400"><PlusIcon className="w-4 h-4" /><span>Add Week</span></button>
      </div>
  );
};

const HistoryModal: React.FC<{ isOpen: boolean; onClose: () => void; history: HistoryEntry[]; onLoad: (entry: HistoryEntry) => void; onClear: () => void; }> = ({ isOpen, onClose, history, onLoad, onClear }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">Load Scheme of Work</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><XCircleIcon className="w-7 h-7" /></button>
                </div>
                <div className="flex-grow p-4 space-y-2 overflow-y-auto">
                    {history.length > 0 ? history.map(entry => (
                        <div key={entry.lastUpdated} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                            <div>
                                <p className="font-bold text-gray-800">{entry.subject}</p>
                                <p className="text-sm text-gray-600">{entry.className}</p>
                                <p className="text-xs text-gray-400 mt-1">Last saved: {new Date(entry.lastUpdated).toLocaleString()}</p>
                            </div>
                            <button onClick={() => onLoad(entry)} className="px-3 py-1.5 text-sm font-semibold bg-gray-800 text-white rounded-lg hover:bg-gray-900">Load</button>
                        </div>
                    )) : <p className="text-center text-gray-500 py-8">No saved history.</p>}
                </div>
                {history.length > 0 && (
                    <div className="p-4 border-t">
                        <button onClick={onClear} className="w-full py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100">Clear All History</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const Toast: React.FC<{ message: string; onClear: () => void; }> = ({ message, onClear }) => {
    useEffect(() => {
        const timer = setTimeout(onClear, 3000);
        return () => clearTimeout(timer);
    }, [onClear]);

    return (
        <div className="fixed bottom-24 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in-up">
            <CheckCircleIcon className="w-5 h-5 text-green-400" />
            <span>{message}</span>
        </div>
    );
};

// --- MAIN COMPONENT ---

const LessonPlannerScreen: React.FC<{ navigateTo: (view: string, title: string, props?: any) => void; }> = ({ navigateTo }) => {
    const [subject, setSubject] = useState('');
    const [className, setClassName] = useState('');
    const [term1Scheme, setTerm1Scheme] = useState<SchemeWeek[]>([]);
    const [term2Scheme, setTerm2Scheme] = useState<SchemeWeek[]>([]);
    const [term3Scheme, setTerm3Scheme] = useState<SchemeWeek[]>([]);
    const [activeTerm, setActiveTerm] = useState<'term1' | 'term2' | 'term3'>('term1');
    const [isGenerating, setIsGenerating] = useState(false);
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const LESSON_PLANNER_HISTORY_KEY = 'lessonPlannerHistory_v2';

    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem(LESSON_PLANNER_HISTORY_KEY);
            if (savedHistory) {
                setHistory(JSON.parse(savedHistory));
            }
        } catch (error) {
            console.error("Failed to parse history from localStorage", error);
        }
    }, []);

    const handleSaveScheme = useCallback(() => {
        if (!subject.trim() || !className.trim()) {
            setToastMessage('Please enter Subject and Class Name to save.');
            return;
        }
        const newEntry: HistoryEntry = {
            subject,
            className,
            term1Scheme,
            term2Scheme,
            term3Scheme,
            lastUpdated: new Date().toISOString()
        };
        const newHistory = [...history];
        const existingIndex = newHistory.findIndex(h => h.subject.toLowerCase() === subject.toLowerCase() && h.className.toLowerCase() === className.toLowerCase());
        
        if (existingIndex > -1) {
            newHistory[existingIndex] = newEntry;
        } else {
            newHistory.push(newEntry);
        }
        
        localStorage.setItem(LESSON_PLANNER_HISTORY_KEY, JSON.stringify(newHistory));
        setHistory(newHistory);
        setToastMessage('Scheme of work saved!');
    }, [subject, className, term1Scheme, term2Scheme, term3Scheme, history]);
    
    const handleLoadFromHistory = useCallback((entry: HistoryEntry) => {
        setSubject(entry.subject);
        setClassName(entry.className);
        setTerm1Scheme(entry.term1Scheme);
        setTerm2Scheme(entry.term2Scheme);
        setTerm3Scheme(entry.term3Scheme);
        setIsHistoryOpen(false);
        setToastMessage(`Loaded scheme for ${entry.subject} - ${entry.className}.`);
    }, []);

    const handleClearHistory = useCallback(() => {
        if (window.confirm("Are you sure you want to clear all saved schemes? This cannot be undone.")) {
            localStorage.removeItem(LESSON_PLANNER_HISTORY_KEY);
            setHistory([]);
            setIsHistoryOpen(false);
            setToastMessage('History cleared.');
        }
    }, []);

    const schemes = { term1: term1Scheme, term2: term2Scheme, term3: term3Scheme };
    const currentScheme = schemes[activeTerm];
    const setCurrentScheme = { term1: setTerm1Scheme, term2: setTerm2Scheme, term3: setTerm3Scheme }[activeTerm];

    const handleGenerate = async () => { /* ... AI generation logic ... */ };

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <main className="flex-grow p-4 space-y-5 overflow-y-auto pb-24">
                <div className="bg-gray-100 p-4 rounded-xl text-center border border-gray-200">
                    <SparklesIcon className="h-10 w-10 mx-auto text-gray-500 mb-2" />
                    <h3 className="font-bold text-lg text-gray-800">AI Curriculum Co-Pilot</h3>
                    <p className="text-sm text-gray-700">Input your termly topics and let AI build resources for your entire academic year.</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-grow">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input id="subject" type="text" value={subject} onChange={e => setSubject(e.target.value)} required className="w-full p-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg"/>
                        </div>
                        <div className="flex-grow">
                             <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                            <input id="className" type="text" value={className} onChange={e => setClassName(e.target.value)} required className="w-full p-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg"/>
                        </div>
                    </div>
                    <button type="button" onClick={() => setIsHistoryOpen(true)} className="w-full flex items-center justify-center space-x-2 py-2 text-sm font-semibold text-gray-700 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400">
                        <HistoryIcon className="w-4 h-4"/>
                        <span>Load from History</span>
                    </button>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-4">
                        <button onClick={() => setActiveTerm('term1')} className={`w-1/3 py-2 text-sm font-semibold rounded-md ${activeTerm === 'term1' ? 'bg-white shadow text-gray-900' : 'text-gray-700'}`}>First Term</button>
                        <button onClick={() => setActiveTerm('term2')} className={`w-1/3 py-2 text-sm font-semibold rounded-md ${activeTerm === 'term2' ? 'bg-white shadow text-gray-900' : 'text-gray-700'}`}>Second Term</button>
                        <button onClick={() => setActiveTerm('term3')} className={`w-1/3 py-2 text-sm font-semibold rounded-md ${activeTerm === 'term3' ? 'bg-white shadow text-gray-900' : 'text-gray-700'}`}>Third Term</button>
                    </div>
                    <SchemeInput scheme={currentScheme} setScheme={setCurrentScheme} />
                </div>
            </main>
            
            <footer className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 grid grid-cols-2 gap-3 sticky bottom-0">
                <button type="button" onClick={handleSaveScheme} className="w-full py-3 px-4 font-medium text-gray-800 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300">Save Scheme</button>
                <button type="button" onClick={handleGenerate} disabled={isGenerating || !subject || !className || term1Scheme.length === 0} className="w-full flex justify-center items-center space-x-2 py-3 px-4 font-medium text-white bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400">
                    <SparklesIcon className="h-5 h-5" /><span>Generate Resources</span>
                </button>
            </footer>
            
            <HistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} history={history} onLoad={handleLoadFromHistory} onClear={handleClearHistory} />
            {toastMessage && <Toast message={toastMessage} onClear={() => setToastMessage('')} />}
        </div>
    );
};

export default LessonPlannerScreen;
