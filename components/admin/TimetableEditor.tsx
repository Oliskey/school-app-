
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { XCircleIcon, AIIcon, SparklesIcon, BriefcaseIcon, ChevronRightIcon } from '../../constants';
import { SUBJECT_COLORS } from '../../constants';

// --- TYPES ---
type Timetable = { [key: string]: string | null };
type TeacherAssignments = { [key: string]: string | null };
type TeacherLoad = { teacherName: string; totalPeriods: number };

// --- CONSTANTS & HELPERS ---
const formatTime12Hour = (timeStr: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    return `${h}:${minutes} ${ampm}`;
};

const PERIODS = [
    { name: 'Period 1', start: '09:00', end: '09:45' },
    { name: 'Period 2', start: '09:45', end: '10:30' },
    { name: 'Period 3', start: '10:30', end: '11:15' },
    { name: 'Short Break', start: '11:15', end: '11:30', isBreak: true },
    { name: 'Period 4', start: '11:30', end: '12:15' },
    { name: 'Period 5', start: '12:15', end: '13:00' },
    { name: 'Long Break', start: '13:00', end: '13:45', isBreak: true },
    { name: 'Period 6', start: '13:45', end: '14:30' },
    { name: 'Period 7', start: '14:30', end: '15:15' },
    { name: 'Period 8', start: '15:15', end: '16:00' },
];

const MOCK_SCHOOL_DATA = {
    class: 'Grade 9A',
    periodsPerDay: 8,
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    teachers: [
        { name: 'Mr. Adeoye', subjects: ['Mathematics'] },
        { name: 'Mrs. Akintola', subjects: ['English'] },
        { name: 'Dr. Bello', subjects: ['Basic Technology'] },
        { name: 'Ms. Sani', subjects: ['Basic Science'] },
        { name: 'Mr. Obi', subjects: ['Business Studies'] },
        { name: 'Mrs. Musa', subjects: ['Social Studies', 'Civic Education'] },
        { name: 'Mr. Pwajok', subjects: ['P.E.'] },
        { name: 'Ms. Effiong', subjects: ['Art'] },
    ],
    subjectRequirements: {
        'Mathematics': 5,
        'English': 5,
        'Basic Science': 4,
        'Basic Technology': 4,
        'Social Studies': 3,
        'Business Studies': 3,
        'Civic Education': 2,
        'P.E.': 2,
        'Art': 2,
    },
    rules: [
        "No double periods except for Mathematics, which can have one double period per week.",
        "Fridays must end early, after the 6th period. Periods 7 and 8 on Friday should be empty.",
        "Teachers cannot be assigned more than 5 periods on any single day.",
        "Core subjects (Mathematics, English, Basic Science) should be spread out and preferably scheduled in the morning periods (1-4).",
        "Practical/Creative subjects (P.E., Art) should be scheduled in the afternoon (periods 5-8)."
    ]
};

// --- SUB-COMPONENTS ---
const DraggableSubject: React.FC<{ subjectName: string }> = ({ subjectName }) => {
    const colorClass = SUBJECT_COLORS[subjectName] || 'bg-gray-200 text-gray-800';
    return (
        <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData('subjectName', subjectName)}
            className={`p-4 rounded-xl cursor-grab text-base font-bold text-center ${colorClass} shadow-md hover:shadow-lg transition-all transform hover:scale-105 border-2 border-white hover:border-gray-200`}
            aria-label={`Drag ${subjectName} subject`}
        >
            {subjectName}
        </div>
    );
};

const TimetableCell: React.FC<{ subject: string | null; teacher: string | null; onDrop: (e: React.DragEvent<HTMLDivElement>) => void; onClear: () => void; isBreak?: boolean }> = ({ subject, teacher, onDrop, onClear, isBreak }) => {
    const [isHovering, setIsHovering] = useState(false);
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if(!isBreak) {
            e.currentTarget.classList.add('bg-sky-100', 'border-sky-300', 'border-dashed');
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('bg-sky-100', 'border-sky-300', 'border-dashed');
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        handleDragLeave(e);
        if(!isBreak) onDrop(e);
    }

    if (isBreak) {
        return <div className="h-32 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl flex items-center justify-center font-bold text-amber-800 border-2 border-dashed border-amber-300 text-lg shadow-inner">{subject}</div>;
    }

    const colorClass = subject ? SUBJECT_COLORS[subject] : 'bg-white border-2 border-dashed border-gray-300';
    
    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`h-32 rounded-xl flex flex-col items-center justify-center text-center p-3 relative transition-all duration-200 shadow-sm hover:shadow-md ${subject ? colorClass : 'bg-gray-100'}`}
        >
            {subject ? (
                <>
                    <span className="font-bold text-lg">{subject}</span>
                    {teacher && <span className="text-sm mt-1 opacity-90 font-medium">{teacher}</span>}
                    {isHovering && (
                         <button 
                            onClick={onClear} 
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-colors bg-white/90 rounded-full p-1 shadow-sm"
                            aria-label={`Clear ${subject} from this slot`}
                         >
                            <XCircleIcon className="w-6 h-6" />
                        </button>
                    )}
                </>
            ) : (
                <div className="text-gray-500 text-base font-medium">
                    Drop subject here
                </div>
            )}
        </div>
    );
};

const AISummary: React.FC<{ suggestions: string[]; teacherLoad: TeacherLoad[] }> = ({ suggestions, teacherLoad }) => {
    if (suggestions.length === 0 && teacherLoad.length === 0) return null;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">AI Summary & Suggestions</h3>
            {teacherLoad.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center"><BriefcaseIcon className="w-5 h-5 mr-2 text-indigo-600"/>Teacher Workload</h4>
                    <ul className="text-sm space-y-1">
                        {teacherLoad.map(load => (
                            <li key={load.teacherName} className="flex justify-between">
                                <span>{load.teacherName}:</span>
                                <span className="font-bold">{load.totalPeriods} periods</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {suggestions.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center"><SparklesIcon className="w-5 h-5 mr-2 text-indigo-600"/>AI Suggestions</h4>
                    <div className="prose prose-sm max-w-none prose-ul:pl-4 prose-li:my-1 text-gray-700">
                        <ReactMarkdown>{suggestions.map(s => `- ${s}`).join('\n')}</ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
};


// --- MAIN COMPONENT ---
const TimetableEditor: React.FC = () => {
    const [timetable, setTimetable] = useState<Timetable>({});
    const [teacherAssignments, setTeacherAssignments] = useState<TeacherAssignments>({});
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [teacherLoad, setTeacherLoad] = useState<TeacherLoad[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedClass, setSelectedClass] = useState('Grade 9A');

    const handleDrop = (day: string, periodName: string, e: React.DragEvent<HTMLDivElement>) => {
        const subjectName = e.dataTransfer.getData('subjectName');
        if (subjectName) {
            const key = `${day}-${periodName}`;
            setTimetable(prev => ({ ...prev, [key]: subjectName }));
        }
    };

    const clearCell = (day: string, periodName: string) => {
        const key = `${day}-${periodName}`;
        setTimetable(prev => {
            const newTimetable = {...prev};
            delete newTimetable[key];
            return newTimetable;
        });
        setTeacherAssignments(prev => {
            const newAssignments = {...prev};
            delete newAssignments[key];
            return newAssignments;
        })
    };

    const handleGenerateTimetable = async () => {
        setIsGenerating(true);
        setSuggestions([]);
        setTeacherLoad([]);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `
                You are an expert school administrator and timetable planner. Generate a clear, balanced, and conflict-free weekly timetable for the class: ${MOCK_SCHOOL_DATA.class}.

                Inputs:
                - Teachers & Subjects: ${JSON.stringify(MOCK_SCHOOL_DATA.teachers)}
                - Subject weekly period requirements: ${JSON.stringify(MOCK_SCHOOL_DATA.subjectRequirements)}
                - Periods: ${MOCK_SCHOOL_DATA.periodsPerDay} teaching periods per day, plus breaks. The periods are named 'Period 1' to 'Period 8'.
                - Rules: ${MOCK_SCHOOL_DATA.rules.join('. ')}

                Your task is to generate the timetable and associated data according to the provided JSON schema. Ensure all rules are followed and subjects meet their weekly quota.
            `;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            timetable: {
                                type: Type.ARRAY,
                                description: "An array of timetable slots.",
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        slot: { type: Type.STRING, description: "The timetable slot, format 'Day-Period Name' (e.g., 'Monday-Period 1')." },
                                        subject: { type: Type.STRING, description: "The subject for this slot. Can be an empty string for free periods." }
                                    },
                                    required: ['slot', 'subject']
                                }
                            },
                            teacherAssignments: {
                                type: Type.ARRAY,
                                description: "An array of teacher assignments for each slot.",
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        slot: { type: Type.STRING, description: "The timetable slot, format 'Day-Period Name'." },
                                        teacher: { type: Type.STRING, description: "The teacher assigned to this slot. Can be an empty string." }
                                    },
                                    required: ['slot', 'teacher']
                                }
                            },
                            suggestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Suggestions to improve the timetable." },
                            teacherLoad: {
                                 type: Type.ARRAY,
                                 items: {
                                     type: Type.OBJECT,
                                     properties: {
                                         teacherName: { type: Type.STRING },
                                         totalPeriods: { type: Type.INTEGER }
                                     },
                                     required: ['teacherName', 'totalPeriods']
                                 }
                            }
                        }
                    }
                }
            });
            const result = JSON.parse(response.text.trim());

            const timetableMap: Timetable = {};
            if (result.timetable && Array.isArray(result.timetable)) {
                for (const item of result.timetable) {
                    if (item.slot && item.subject) {
                        timetableMap[item.slot] = item.subject;
                    }
                }
            }
            setTimetable(timetableMap);

            const teacherAssignmentsMap: TeacherAssignments = {};
            if (result.teacherAssignments && Array.isArray(result.teacherAssignments)) {
                for (const item of result.teacherAssignments) {
                    if (item.slot && item.teacher) {
                        teacherAssignmentsMap[item.slot] = item.teacher;
                    }
                }
            }
            setTeacherAssignments(teacherAssignmentsMap);

            setSuggestions(result.suggestions || []);
            setTeacherLoad(result.teacherLoad || []);
        } catch (error) {
            console.error("Timetable generation error:", error);
            alert("An error occurred while generating the timetable. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    return (
        <div className="flex flex-col h-full bg-gray-100 relative">
            {isGenerating && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-50 backdrop-blur-sm rounded-3xl">
                    <div className="bg-white/10 p-6 rounded-full mb-6">
                        <AIIcon className="w-20 h-20 text-white animate-spin" />
                    </div>
                    <p className="text-white font-bold text-2xl mb-2">Generating Timetable</p>
                    <p className="text-white/90 text-lg">AI is creating your optimized schedule...</p>
                    <div className="mt-6 w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                </div>
            )}
            <header className="p-4 bg-white border-b border-gray-200 flex-shrink-0 shadow-sm">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-1">Timetable Editor</h2>
                            <div className="flex items-center space-x-4">
                                <select 
                                    value={selectedClass} 
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    className="p-3 border-2 border-gray-300 rounded-xl font-bold text-base focus:ring-3 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-md min-w-[140px]"
                                >
                                    <option>Grade 9A</option>
                                    <option>Grade 9B</option>
                                    <option>Grade 10A</option>
                                    <option>Grade 10B</option>
                                    <option>Grade 11A</option>
                                    <option>Grade 11B</option>
                                    <option>Grade 12A</option>
                                    <option>Grade 12B</option>
                                </select>
                                <div className="flex items-center text-base font-semibold text-gray-700 bg-green-100 px-4 py-2 rounded-full">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                                    <span>Live Editing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button className="flex items-center space-x-2 px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl shadow-md transition-all transform hover:scale-105">
                            <span>Save Draft</span>
                        </button>
                        <button onClick={handleGenerateTimetable} disabled={isGenerating} className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 disabled:from-gray-400 disabled:to-gray-400 disabled:scale-100">
                            <AIIcon className="w-6 h-6" />
                            <span>Generate with AI</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex-grow flex overflow-hidden">
                <aside className="w-72 flex-shrink-0 p-4 bg-white border-r border-gray-200 overflow-y-auto space-y-6 shadow-inner">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <span>Subjects Palette</span>
                            <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded-full">
                                {Object.keys(MOCK_SCHOOL_DATA.subjectRequirements).length}
                            </span>
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            {Object.keys(MOCK_SCHOOL_DATA.subjectRequirements).map(subjectName => (
                                <DraggableSubject key={subjectName} subjectName={subjectName} />
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full text-left p-4 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors font-semibold flex items-center">
                                <span className="flex-grow">Clear All Periods</span>
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                            <button className="w-full text-left p-4 bg-green-100 hover:bg-green-200 rounded-xl transition-colors font-semibold flex items-center">
                                <span className="flex-grow">Copy Monday to All Days</span>
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                            <button className="w-full text-left p-4 bg-purple-100 hover:bg-purple-200 rounded-xl transition-colors font-semibold flex items-center">
                                <span className="flex-grow">Auto-assign Teachers</span>
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <AISummary suggestions={suggestions} teacherLoad={teacherLoad} />
                </aside>

                <main className="flex-1 overflow-auto bg-gray-200/50">
                    <div className="p-4 space-y-4">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-4 rounded-r-xl shadow-md">
                            <p className="text-indigo-800 font-medium">
                                <span className="font-bold">Tip:</span> Drag subjects from the palette on the left and drop them into the timetable slots. Click on any subject to remove it.
                            </p>
                        </div>
                        <div className="grid gap-2" style={{ gridTemplateColumns: `min-content repeat(${PERIODS.length}, 1fr)`}}>
                            {/* Top-left empty cell */}
                            <div className="sticky top-0 left-0 bg-white z-30 border-b border-r border-gray-300 rounded-tl-lg shadow-md"></div>
                            
                            {/* Period headers with improved styling */}
                            {PERIODS.map(period => (
                                <div key={period.name} className="text-center font-bold text-gray-800 text-base py-4 sticky top-0 bg-white z-20 border-b border-gray-300 shadow-md rounded-tr-xl">
                                    <div className="font-extrabold text-gray-900">{period.name}</div>
                                    <div className="font-medium text-sm text-gray-600 mt-1">{formatTime12Hour(period.start)} - {formatTime12Hour(period.end)}</div>
                                </div>
                            ))}
                            
                            {/* Rows for each day with improved styling */}
                            {days.map(day => (
                                <React.Fragment key={day}>
                                    <div className="sticky left-0 bg-gradient-to-b from-gray-50 to-white z-10 font-extrabold text-gray-800 text-lg flex items-center justify-center p-4 border-r border-gray-300 shadow-md rounded-bl-xl">
                                        {day}
                                    </div>
                                    {PERIODS.map(period => (
                                        <TimetableCell
                                            key={`${day}-${period.name}`}
                                            isBreak={period.isBreak}
                                            subject={period.isBreak ? period.name : timetable[`${day}-${period.name}`] || null}
                                            teacher={teacherAssignments[`${day}-${period.name}`] || null}
                                            onDrop={(e) => handleDrop(day, period.name, e)}
                                            onClear={() => clearCell(day, period.name)}
                                        />
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TimetableEditor;
