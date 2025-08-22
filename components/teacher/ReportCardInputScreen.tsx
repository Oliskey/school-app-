import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Student, Teacher, Rating, ReportCard, ReportCardAcademicRecord } from '../../types';
import { SchoolLogoIcon, SparklesIcon, StarIcon, BookmarkIcon } from '../../constants';
import { mockTeachers, mockStudents } from '../../data';
import { GoogleGenAI, Type } from "@google/genai";

interface ReportCardInputScreenProps {
  student: Student;
  term: string;
  handleBack: () => void;
}

// In a real app, this would be from auth context.
const LOGGED_IN_TEACHER_ID = 2; // Mrs. Funke Akintola is an English teacher
const teacher: Teacher = mockTeachers.find(t => t.id === LOGGED_IN_TEACHER_ID)!;


type AcademicRecordState = {
    subject: string;
    ca: string; // scores are strings for input control
    exam: string;
    total: number;
    grade: string;
    remark: string;
};

// --- Helper Components ---
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="bg-gray-100 p-2 rounded-md my-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">{title}</h3>
    </div>
);

const InfoField: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-700">{label}</p>
        <p className="font-semibold text-gray-900 text-sm border-b border-dotted border-gray-400 pb-1">{value}&nbsp;</p>
    </div>
);

const RatingSelector: React.FC<{ value: Rating; onChange: (value: Rating) => void; options: string[] }> = ({ value, onChange, options }) => (
    <select value={value} onChange={(e) => onChange(e.target.value as Rating)} className="w-full p-1 border border-gray-300 rounded-md text-sm bg-white text-gray-900">
        <option value=""></option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
);

const ReportCardInputScreen: React.FC<ReportCardInputScreenProps> = ({ student, term, handleBack }) => {
    // --- State Initialization ---
    const initialAcademicData: AcademicRecordState[] = [{
        subject: teacher.subject,
        ca: '',
        exam: '',
        total: 0,
        grade: '',
        remark: ''
    }];

    const [academicData, setAcademicData] = useState<AcademicRecordState[]>(initialAcademicData);
    const [skills, setSkills] = useState<Record<string, Rating>>({});
    const [psychomotor, setPsychomotor] = useState<Record<string, Rating>>({});
    const [attendance, setAttendance] = useState({ total: '115', present: '', absent: '', late: '' });
    const [teacherComment, setTeacherComment] = useState('');
    const [principalComment, setPrincipalComment] = useState('');
    
    // New states for comment helper features
    const [favoriteComments, setFavoriteComments] = useState<string[]>([]);
    const [helperContent, setHelperContent] = useState<{type: 'ai' | 'fav', comments: string[]}>({type: 'fav', comments: []});
    const [showCommentHelper, setShowCommentHelper] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.API_KEY }), []);

    // --- Data and Constants ---
    const SKILL_BEHAVIOUR_DOMAINS = ['Neatness', 'Punctuality', 'Politeness', 'Respect for Others', 'Participation in Class', 'Homework Completion', 'Teamwork/Cooperation', 'Attentiveness', 'Creativity', 'Honesty/Integrity'];
    const PSYCHOMOTOR_SKILLS = ['Handwriting', 'Drawing/Art Skills', 'Craft Skills', 'Music & Dance', 'Sports Participation'];
    const RATING_OPTIONS = ['A', 'B', 'C', 'D', 'E'];

    // --- Callbacks and Effects ---
    const getGrade = useCallback((score: number): string => {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        if (score >= 50) return 'E';
        return 'F';
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem('favoriteTeacherComments');
        if (saved) {
            setFavoriteComments(JSON.parse(saved));
        }

        const existingReport = student.reportCards?.find(rc => rc.term === term);
        if (existingReport) {
            setAcademicData(existingReport.academicRecords.map(r => ({
                ...r,
                ca: r.ca.toString(),
                exam: r.exam.toString(),
            })));
            setSkills(existingReport.skills);
            setPsychomotor(existingReport.psychomotor);
            setAttendance({
                total: existingReport.attendance.total.toString(),
                present: existingReport.attendance.present.toString(),
                absent: existingReport.attendance.absent.toString(),
                late: existingReport.attendance.late.toString(),
            });
            setTeacherComment(existingReport.teacherComment);
            setPrincipalComment(existingReport.principalComment);
        } else {
            // Reset to default if no report for this term exists
            setAcademicData(initialAcademicData);
            setSkills({});
            setPsychomotor({});
            setAttendance({ total: '115', present: '', absent: '', late: '' });
            setTeacherComment('');
            setPrincipalComment('');
        }
    }, [student, term]);

    const handleAcademicChange = (index: number, field: keyof AcademicRecordState, value: string) => {
        const newData = [...academicData];
        const record = { ...newData[index], [field]: value };
        
        if (field === 'ca' || field === 'exam') {
            const caScore = parseInt(record.ca, 10) || 0;
            const examScore = parseInt(record.exam, 10) || 0;
            const total = caScore + examScore;
            record.total = total > 100 ? 100 : total;
            record.grade = getGrade(record.total);
        }
        
        newData[index] = record;
        setAcademicData(newData);
    };

    const saveCommentToFavorites = () => {
        if (teacherComment && !favoriteComments.includes(teacherComment)) {
            const newFavorites = [...favoriteComments, teacherComment];
            setFavoriteComments(newFavorites);
            localStorage.setItem('favoriteTeacherComments', JSON.stringify(newFavorites));
            alert('Comment saved to favorites!');
        }
    };

     const handleSaveAndPublish = () => {
        const reportCardData: ReportCard = {
            term: term,
            session: "2023/2024",
            isPublished: true,
            academicRecords: academicData.map(r => ({
                ...r,
                ca: parseInt(r.ca, 10) || 0,
                exam: parseInt(r.exam, 10) || 0,
            })),
            skills,
            psychomotor,
            attendance: {
                total: parseInt(attendance.total, 10) || 0,
                present: parseInt(attendance.present, 10) || 0,
                absent: parseInt(attendance.absent, 10) || 0,
                late: parseInt(attendance.late, 10) || 0,
            },
            teacherComment,
            principalComment: "An outstanding result. The student is a beacon of academic excellence in our school." // Mock principal comment
        };

        const studentIndex = mockStudents.findIndex(s => s.id === student.id);
        if (studentIndex !== -1) {
            const studentToUpdate = mockStudents[studentIndex];
            if (!studentToUpdate.reportCards) {
                studentToUpdate.reportCards = [];
            }
            const existingReportIndex = studentToUpdate.reportCards.findIndex(rc => rc.term === reportCardData.term);
            
            if (existingReportIndex !== -1) {
                studentToUpdate.reportCards[existingReportIndex] = reportCardData;
            } else {
                studentToUpdate.reportCards.push(reportCardData);
            }
            
            mockStudents[studentIndex] = studentToUpdate;
            alert('Report card has been saved and published successfully!');
            handleBack();
        } else {
            alert('Error: Could not find student to update.');
        }
    };

    const handleGenerateSuggestions = async () => {
        setIsGenerating(true);
        setShowCommentHelper(true);
        setHelperContent({type: 'ai', comments: []});
        try {
            const academicSummary = academicData.map(rec => `${rec.subject}: ${rec.total}%`).join(', ');
            const behaviorSummary = Object.entries(skills).slice(0, 3).map(([skill, rating]) => `${skill}: ${rating || 'N/A'}`).join(', ');
            const prompt = `Generate 3 distinct, encouraging, and constructive teacher comments for a student's report card. The comment is for the subject ${teacher.subject}.
            Student's performance summary:
            - Academic scores: ${academicSummary}.
            - Behavioral ratings (A=Excellent): ${behaviorSummary}.
            Keep each comment to 1-2 sentences.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash', contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: { type: Type.OBJECT, properties: { comments: { type: Type.ARRAY, items: { type: Type.STRING } } } }
                }
            });
            const jsonResponse = JSON.parse(response.text);
            if (jsonResponse.comments && Array.isArray(jsonResponse.comments)) {
                 setHelperContent({type: 'ai', comments: jsonResponse.comments});
            } else { throw new Error("Invalid AI response format"); }
        } catch (error) {
            console.error("AI Generation Error:", error);
            alert("Failed to generate suggestions. Please check your network connection and try again.");
            setShowCommentHelper(false);
        } finally { setIsGenerating(false); }
    };

    const handleRegenerateComment = async () => {
        if (!teacherComment) return;
        setIsGenerating(true);
        try {
            const prompt = `Rephrase and improve this teacher's comment for a report card. Make it encouraging and professional: "${teacherComment}"`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setTeacherComment(response.text.trim());
        } catch (error) {
            console.error("AI Regeneration Error:", error);
            alert("Failed to regenerate comment. Please check your network connection and try again.");
        } finally { setIsGenerating(false); }
    };

    return (
        <div className="p-4 bg-gray-100 font-serif">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <header className="text-center border-b-2 border-gray-300 pb-4 mb-4">
                    <div className="flex justify-center items-center gap-2"><SchoolLogoIcon className="text-purple-600 h-10 w-10"/><h1 className="text-2xl font-bold text-gray-800">Smart School Academy</h1></div>
                    <p className="text-gray-800 font-semibold mt-1">END OF TERM REPORT CARD</p>
                </header>
                <SectionHeader title="Student Information" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-900">
                    <InfoField label="Full Name" value={student.name} />
                    <InfoField label="Class/Grade" value={`${student.grade}${student.section}`} /><InfoField label="Term/Semester" value={term} /><InfoField label="Session" value="2023/2024" /><InfoField label="Student ID" value={`SCH-0${student.id}`} /><InfoField label="Gender" value="Female" /><InfoField label="Date of Birth" value="12/05/2008" /><InfoField label="Admission No" value={`ADM/0${student.id}`} />
                </div>
                <SectionHeader title="Academic Performance" />
                <div className="overflow-x-auto text-xs">
                    <table className="min-w-full border">
                        <thead className="bg-gray-50"><tr className="text-left text-gray-800"><th className="p-2 border">Subject</th><th className="p-2 border w-16 text-center">CA (40)</th><th className="p-2 border w-16 text-center">Exam (60)</th><th className="p-2 border w-16 text-center">Total (100)</th><th className="p-2 border w-12 text-center">Grade</th><th className="p-2 border">Remark</th></tr></thead>
                        <tbody>
                            {academicData.map((record, index) => (
                                <tr key={index}><td className="p-1 border font-semibold text-gray-800">{record.subject}</td><td className="p-1 border"><input type="number" max="40" min="0" value={record.ca} onChange={e => handleAcademicChange(index, 'ca', e.target.value)} className="w-full text-center border border-gray-300 rounded bg-white text-gray-900"/></td><td className="p-1 border"><input type="number" max="60" min="0" value={record.exam} onChange={e => handleAcademicChange(index, 'exam', e.target.value)} className="w-full text-center border border-gray-300 rounded bg-white text-gray-900"/></td><td className="p-1 border text-center font-bold text-gray-800">{record.total}</td><td className="p-1 border text-center font-bold text-gray-800">{record.grade}</td><td className="p-1 border"><input type="text" value={record.remark} onChange={e => handleAcademicChange(index, 'remark', e.target.value)} className="w-full border border-gray-300 rounded bg-white text-gray-900"/></td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div><SectionHeader title="Skills & Behaviour" /><table className="w-full text-sm"><tbody>{SKILL_BEHAVIOUR_DOMAINS.map(skill => (<tr key={skill}><td className="py-1 text-gray-800">{skill}</td><td className="w-20"><RatingSelector value={skills[skill] || ''} onChange={val => setSkills(p => ({...p, [skill]: val}))} options={RATING_OPTIONS}/></td></tr>))}</tbody></table></div>
                    <div><SectionHeader title="Psychomotor Skills" /><table className="w-full text-sm"><tbody>{PSYCHOMOTOR_SKILLS.map(skill => (<tr key={skill}><td className="py-1 text-gray-800">{skill}</td><td className="w-20"><RatingSelector value={psychomotor[skill] || ''} onChange={val => setPsychomotor(p => ({...p, [skill]: val}))} options={RATING_OPTIONS}/></td></tr>))}</tbody></table></div>
                </div>
                <SectionHeader title="Attendance Record" />
                <div className="grid grid-cols-4 gap-4 text-sm">
                    {Object.entries(attendance).map(([key, value]) => (<div key={key}><label className="capitalize text-xs text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</label><input type="number" value={value} onChange={e => setAttendance(p => ({...p, [key]: e.target.value}))} className="w-full p-2 text-sm border border-gray-300 rounded bg-white text-gray-900"/></div>))}
                </div>
                <SectionHeader title="Grading Key" />
                <div className="text-xs grid grid-cols-2 gap-x-4 text-gray-700"><p><b>A</b>: 90-100 (Excellent), <b>B</b>: 80-89 (Very Good), <b>C</b>: 70-79 (Good), <b>D</b>: 60-69 (Credit), <b>E</b>: 50-59 (Pass), <b>F</b>: 0-49 (Fail)</p><p><b>Skills:</b> A: Excellent, B: Very Good, C: Good, D: Fair, E: Needs Improvement</p></div>
                <div className="mt-6 space-y-4">
                    <div className="relative">
                        <label className="font-semibold text-sm text-gray-900">Teacher's General Comment:</label>
                        <textarea value={teacherComment} onChange={e => setTeacherComment(e.target.value)} rows={3} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900"></textarea>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                                <button type="button" onClick={handleGenerateSuggestions} disabled={isGenerating} className="flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full hover:bg-purple-200 disabled:opacity-50"><SparklesIcon className="w-4 h-4"/><span>AI Suggestions</span></button>
                                <button type="button" onClick={() => {setShowCommentHelper(true); setHelperContent({type: 'fav', comments: favoriteComments})}} className="flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full hover:bg-amber-200"><StarIcon filled={false} className="w-4 h-4"/><span>Favorites</span></button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button type="button" onClick={handleRegenerateComment} disabled={!teacherComment || isGenerating} title="Regenerate with AI" className="p-1 text-gray-600 hover:text-purple-600 disabled:opacity-50"><SparklesIcon className="w-5 h-5"/></button>
                                <button type="button" onClick={saveCommentToFavorites} disabled={!teacherComment} title="Save to favorites" className="p-1 text-gray-600 hover:text-amber-600 disabled:opacity-50"><BookmarkIcon className="w-5 h-5"/></button>
                            </div>
                        </div>
                        {showCommentHelper && (
                            <div className="absolute bottom-full left-0 w-full mb-2 p-2 bg-white border border-gray-300 rounded-lg shadow-xl z-10">
                                <div className="flex justify-between items-center px-2 pb-1 border-b mb-1">
                                    <h4 className="font-bold text-sm text-gray-800">{helperContent.type === 'ai' ? 'AI Suggestions' : 'Favorite Comments'}</h4>
                                    <button type="button" onClick={() => setShowCommentHelper(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
                                </div>
                                <div className="max-h-32 overflow-y-auto">
                                    {isGenerating ? (<p className="p-2 text-sm text-gray-600 text-center">Generating...</p>) : helperContent.comments.length > 0 ? (helperContent.comments.map((comment, i) => (<button type="button" key={i} onClick={() => {setTeacherComment(comment); setShowCommentHelper(false);}} className="w-full text-left p-2 text-sm text-gray-700 hover:bg-purple-50 rounded">{comment}</button>))) : (<p className="p-2 text-sm text-gray-600 text-center">No comments found.</p>)}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-end pt-4"><div className="text-sm text-gray-800"><p className="font-semibold">{teacher.name}</p><p className="border-t border-gray-400 mt-1 pt-1">{teacher.subject} Teacher's Signature & Date</p></div></div>
                </div>
                <div className="mt-6 space-y-4">
                    <div><label className="font-semibold text-sm text-gray-900">Principal's Comment:</label><textarea value={principalComment} readOnly placeholder="Principal's comment (read-only)" rows={2} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm bg-gray-100 cursor-not-allowed text-gray-900"></textarea></div>
                    <div className="flex justify-between items-end pt-4"><div className="text-sm text-gray-800"><p className="border-t border-gray-400 mt-1 pt-1">Principal's Signature & Date</p></div></div>
                </div>
                <div className="pt-6 mt-4 border-t"><button type="button" onClick={handleSaveAndPublish} className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:bg-purple-700 transition-colors">Save & Publish Report</button></div>
            </div>
        </div>
    );
};

export default ReportCardInputScreen;
