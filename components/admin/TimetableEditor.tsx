
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { XCircleIcon, AIIcon, SparklesIcon, BriefcaseIcon } from '../../constants';
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
            className={`p-2 rounded-lg cursor-grab text-sm font-semibold text-center ${colorClass} shadow-sm hover:shadow-md transition-shadow`}
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
        return <div className="h-24 bg-gray-200 rounded-lg flex items-center justify-center font-semibold text-gray-500">{subject}</div>;
    }

    const colorClass = subject ? SUBJECT_COLORS[subject] : 'bg-white';
    
    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`h-24 border-2 border-transparent rounded-lg flex flex-col items-center justify-center text-center p-1 relative transition-colors duration-150 ${subject ? colorClass : 'bg-gray-200/50'}`}
        >
            {subject ? (
                <>
                    <span className="font-bold text-sm">{subject}</span>
                    {teacher && <span className="text-xs mt-1 opacity-80">{teacher}</span>}
                    {isHovering && (
                         <button 
                            onClick={onClear} 
                            className="absolute top-1 right-1 text-gray-500 hover:text-red-500 transition-colors"
                            aria-label={`Clear ${subject} from this slot`}
                         >
                            <XCircleIcon className="w-4 h-4 bg-white/50 rounded-full" />
                        </button>
                    )}
                </>
            ) : <div className="w-full h-full rounded-lg"></div>}
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
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
                    <AIIcon className="w-16 h-16 text-white animate-spin" />
                    <p className="text-white font-semibold mt-4">Generating Timetable...</p>
                </div>
            )}
            <header className="p-4 bg-white border-b border-gray-200 flex-shrink-0">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Timetable Editor</h2>
                        <select 
                            value={selectedClass} 
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-lg font-semibold text-sm focus:ring-sky-500 focus:border-sky-500 bg-gray-50"
                        >
                            <option>Grade 9A</option>
                            <option>Grade 9B</option>
                        </select>
                    </div>
                    <button onClick={handleGenerateTimetable} disabled={isGenerating} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors disabled:bg-gray-400">
                        <AIIcon className="w-5 h-5" />
                        <span>Generate with AI</span>
                    </button>
                </div>
            </header>

            <div className="flex-grow flex overflow-hidden">
                <aside className="w-64 flex-shrink-0 p-4 bg-white border-r border-gray-200 overflow-y-auto space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Subjects Palette</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.keys(MOCK_SCHOOL_DATA.subjectRequirements).map(subjectName => (
                                <DraggableSubject key={subjectName} subjectName={subjectName} />
                            ))}
                        </div>
                    </div>
                    <AISummary suggestions={suggestions} teacherLoad={teacherLoad} />
                </aside>

                <main className="flex-1 overflow-auto bg-gray-200/50">
                    <div className="p-4 space-y-3">
                        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-3 rounded-r-lg">
                            <p className="text-sm text-indigo-800">
                                <strong>Tip:</strong> Drag subjects from the palette on the left and drop them into the timetable slots.
                            </p>
                        </div>
                        <div className="grid gap-1.5" style={{ gridTemplateColumns: `min-content repeat(${PERIODS.length}, 1fr)`}}>
                            {/* Top-left empty cell */}
                            <div className="sticky top-0 left-0 bg-gray-100 z-30 border-b border-r border-gray-200"></div>
                            
                            {/* Period headers */}
                            {PERIODS.map(period => (
                                <div key={period.name} className="text-center font-bold text-gray-600 text-sm py-2 sticky top-0 bg-gray-100 z-20 border-b border-gray-200">
                                    {period.name}
                                    <div className="font-normal text-xs text-gray-500">{formatTime12Hour(period.start)} - {formatTime12Hour(period.end)}</div>
                                </div>
                            ))}
                            
                            {/* Rows for each day */}
                            {days.map(day => (
                                <React.Fragment key={day}>
                                    <div className="sticky left-0 bg-gray-100 z-10 font-bold text-gray-600 text-sm flex items-center justify-center p-2 border-r border-gray-200">{day}</div>
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
