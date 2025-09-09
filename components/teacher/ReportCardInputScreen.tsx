
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Student, Teacher, Rating, ReportCard, ReportCardAcademicRecord } from '../../types';
import { SchoolLogoIcon, PlusIcon } from '../../constants';
import { mockTeachers, mockStudents } from '../../data';
import { getSubjectsForStudent } from '../../data';
import { SUBJECTS_LIST } from '../../constants';


interface ReportCardInputScreenProps {
  student: Student;
  term: string;
  handleBack: () => void;
  isAdmin?: boolean;
}

// In a real app, this would be from auth context.
const LOGGED_IN_TEACHER_ID = 2; // Mrs. Funke Akintola
const teacher: Teacher = mockTeachers.find(t => t.id === LOGGED_IN_TEACHER_ID)!;


type AcademicRecordState = {
    subject: string;
    ca: string;
    exam: string;
    total: number;
    grade: string;
    remark: string;
    remarkIsManual?: boolean;
};

// --- Helper Components ---
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="bg-gray-100 p-2 rounded-md my-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">{title}</h3>
    </div>
);

const RatingSelector: React.FC<{ value: Rating; onChange: (value: Rating) => void; options: string[], disabled?: boolean }> = ({ value, onChange, options, disabled }) => (
    <select value={value} onChange={(e) => onChange(e.target.value as Rating)} disabled={disabled} className="w-full p-1 border border-gray-300 rounded-md text-sm bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed">
        <option value=""></option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
);

const ReportCardInputScreen: React.FC<ReportCardInputScreenProps> = ({ student, term, handleBack, isAdmin = false }) => {
    const [academicData, setAcademicData] = useState<AcademicRecordState[]>([]);
    const [skills, setSkills] = useState<Record<string, Rating>>({});
    const [psychomotor, setPsychomotor] = useState<Record<string, Rating>>({});
    const [attendance, setAttendance] = useState({ total: '115', present: '', absent: '', late: '' });
    const [teacherComment, setTeacherComment] = useState('');
    const [principalComment, setPrincipalComment] = useState('');

    const isClassTeacher = useMemo(() => {
        if (isAdmin || !teacher || !student) return false;
        // "Class Teacher" has the student's specific class (e.g., '7A') in their list of classes.
        const studentClass = `${student.grade}${student.section}`;
        return teacher.classes.some(cls => cls === studentClass);
    }, [student, teacher, isAdmin]);
    
    const canEditGeneralSections = isAdmin || isClassTeacher;

    const SKILL_BEHAVIOUR_DOMAINS = ['Neatness', 'Punctuality', 'Politeness', 'Respect for Others', 'Participation in Class', 'Homework Completion', 'Teamwork/Cooperation', 'Attentiveness', 'Creativity', 'Honesty/Integrity'];
    const PSYCHOMOTOR_SKILLS = ['Handwriting', 'Drawing/Art Skills', 'Craft Skills', 'Music & Dance', 'Sports Participation'];
    const RATING_OPTIONS = ['A', 'B', 'C', 'D', 'E'];

    const getGrade = useCallback((score: number): string => {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        if (score >= 50) return 'E';
        return 'F';
    }, []);

    const getRemark = useCallback((score: number): string => {
        if (score >= 90) return 'Excellent Work';
        if (score >= 80) return 'Very Good';
        if (score >= 70) return 'Good Result';
        if (score >= 60) return 'Credit Pass';
        if (score >= 50) return 'Pass';
        if (score >= 40) return 'Fair Attempt';
        return 'Needs Improvement';
    }, []);

    useEffect(() => {
        const expectedSubjects = getSubjectsForStudent(student);
        const existingReport = student.reportCards?.find(rc => rc.term === term);
        
        const existingRecordsMap = new Map<string, ReportCardAcademicRecord>();
        if (existingReport) {
            existingReport.academicRecords.forEach(rec => {
                existingRecordsMap.set(rec.subject, rec);
            });
        }
        
        const allSubjectNames = Array.from(new Set([...expectedSubjects, ...existingRecordsMap.keys()]));
        
        const initialData = allSubjectNames.map(subjectName => {
            const existingRecord = existingRecordsMap.get(subjectName);
            if (existingRecord) {
                return {
                    ...existingRecord,
                    ca: existingRecord.ca.toString(),
                    exam: existingRecord.exam.toString(),
                    remarkIsManual: !!existingRecord.remark,
                };
            } else {
                return {
                    subject: subjectName,
                    ca: '', exam: '', total: 0, grade: '', remark: '',
                    remarkIsManual: false,
                };
            }
        });

        setAcademicData(initialData);

        if (existingReport) {
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
            setSkills({});
            setPsychomotor({});
            setAttendance({ total: '115', present: '', absent: '', late: '' });
            setTeacherComment('');
            setPrincipalComment('');
        }
    }, [student, term]);


    const handleAcademicChange = useCallback((index: number, field: keyof Omit<AcademicRecordState, 'total' | 'grade'>, value: string) => {
        setAcademicData(currentData => {
            const newData = [...currentData];
            const recordToUpdate = { ...newData[index] };
    
            // Directly update the field with the new value from the input
            (recordToUpdate as any)[field] = value;
    
            // If CA or Exam score changed, recalculate everything
            if (field === 'ca' || field === 'exam') {
                let caScore = parseInt(recordToUpdate.ca, 10) || 0;
                let examScore = parseInt(recordToUpdate.exam, 10) || 0;
                
                // Clamp scores to their max values
                if (caScore > 40) {
                    caScore = 40;
                    recordToUpdate.ca = '40';
                }
                if (examScore > 60) {
                    examScore = 60;
                    recordToUpdate.exam = '60';
                }
                
                const total = caScore + examScore;
                recordToUpdate.total = total;
                recordToUpdate.grade = getGrade(total);
    
                // Update remark only if it hasn't been manually edited by an admin
                if (!recordToUpdate.remarkIsManual) {
                    recordToUpdate.remark = getRemark(total);
                }
            }
            
            // If the remark itself is being edited, flag it as manual to prevent overwrites
            if (field === 'remark') {
                 recordToUpdate.remarkIsManual = true;
            }
    
            newData[index] = recordToUpdate;
            return newData;
        });
    }, [getGrade, getRemark]);
    
    const addSubject = () => {
        const newSubjectName = prompt("Enter new subject name:");
        if (newSubjectName && !academicData.some(rec => rec.subject === newSubjectName)) {
            setAcademicData(prev => [
                ...prev,
                { subject: newSubjectName, ca: '', exam: '', total: 0, grade: '', remark: '', remarkIsManual: false }
            ]);
        } else if (newSubjectName) {
            alert("This subject already exists.");
        }
    };

    const handleSaveAndPublish = () => {
        // ... (save logic)
        alert('Report card has been saved and published successfully!');
        handleBack();
    };

    return (
        <div className="p-4 bg-gray-100 font-serif">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <header className="text-center border-b-2 border-gray-300 pb-4 mb-4">
                    <div className="flex justify-center items-center gap-2"><SchoolLogoIcon className="text-purple-600 h-10 w-10"/><h1 className="text-2xl font-bold text-gray-800">Smart School Academy</h1></div>
                    <p className="text-gray-800 font-semibold mt-1">END OF TERM REPORT CARD - INPUT FORM</p>
                </header>
                
                <SectionHeader title="Academic Performance" />
                <div className="overflow-x-auto text-xs">
                    <table className="min-w-full border">
                        <thead className="bg-gray-50"><tr className="text-left text-gray-800"><th className="p-2 border">Subject</th><th className="p-2 border w-20 text-center">CA (40)</th><th className="p-2 border w-20 text-center">Exam (60)</th><th className="p-2 border w-20 text-center">Total (100)</th><th className="p-2 border w-16 text-center">Grade</th><th className="p-2 border">Remark</th></tr></thead>
                        <tbody>
                            {academicData.map((record, index) => {
                                const isSubjectTeacher = teacher.subjects.includes(record.subject);
                                const canEditScores = isAdmin || isSubjectTeacher;
                                
                                return (
                                <tr key={index} className={canEditScores ? '' : 'bg-gray-50'}>
                                    <td className="p-1 border font-semibold text-gray-800">{record.subject}</td>
                                    <td className="p-1 border"><input type="number" max="40" min="0" value={record.ca} disabled={!canEditScores} onChange={e => handleAcademicChange(index, 'ca', e.target.value)} className="w-full text-center border border-gray-300 rounded bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"/></td>
                                    <td className="p-1 border"><input type="number" max="60" min="0" value={record.exam} disabled={!canEditScores} onChange={e => handleAcademicChange(index, 'exam', e.target.value)} className="w-full text-center border border-gray-300 rounded bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"/></td>
                                    <td className="p-1 border text-center font-bold text-gray-800">{record.total}</td>
                                    <td className="p-1 border text-center font-bold text-gray-800">{record.grade}</td>
                                    <td className="p-1 border"><input type="text" value={record.remark} disabled={!canEditScores} onChange={e => handleAcademicChange(index, 'remark', e.target.value)} className="w-full border border-gray-300 rounded bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"/></td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
                {isAdmin && (
                    <div className="mt-4">
                        <button type="button" onClick={addSubject} className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200">
                           <PlusIcon className="w-4 h-4" />
                           <span>Add Subject</span>
                        </button>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div><SectionHeader title="Skills & Behaviour" /><table className="w-full text-sm"><tbody>{SKILL_BEHAVIOUR_DOMAINS.map(skill => (<tr key={skill}><td className="py-1 text-gray-800">{skill}</td><td className="w-20"><RatingSelector disabled={!canEditGeneralSections} value={skills[skill] || ''} onChange={val => setSkills(p => ({...p, [skill]: val}))} options={RATING_OPTIONS}/></td></tr>))}</tbody></table></div>
                    <div><SectionHeader title="Psychomotor Skills" /><table className="w-full text-sm"><tbody>{PSYCHOMOTOR_SKILLS.map(skill => (<tr key={skill}><td className="py-1 text-gray-800">{skill}</td><td className="w-20"><RatingSelector disabled={!canEditGeneralSections} value={psychomotor[skill] || ''} onChange={val => setPsychomotor(p => ({...p, [skill]: val}))} options={RATING_OPTIONS}/></td></tr>))}</tbody></table></div>
                </div>
                
                <SectionHeader title="Attendance Record" />
                <div className="grid grid-cols-4 gap-4 text-sm">
                    {Object.entries(attendance).map(([key, value]) => (<div key={key}><label className="capitalize text-xs text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</label><input type="number" value={value} disabled={!canEditGeneralSections} onChange={e => setAttendance(p => ({...p, [key]: e.target.value}))} className="w-full p-2 text-sm border border-gray-300 rounded bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"/></div>))}
                </div>
                
                <div className="mt-6 space-y-4">
                    <div><label className="font-semibold text-sm text-gray-900">Teacher's General Comment:</label><textarea value={teacherComment} disabled={!canEditGeneralSections} onChange={e => setTeacherComment(e.target.value)} rows={3} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"></textarea></div>
                    <div><label className="font-semibold text-sm text-gray-900">Principal's Comment:</label><textarea value={principalComment} onChange={e => setPrincipalComment(e.target.value)} readOnly={!isAdmin} placeholder={isAdmin ? "Enter principal's comment..." : "Principal's comment (read-only)"} rows={2} className={`w-full mt-1 p-2 border border-gray-300 rounded-md text-sm text-gray-900 ${isAdmin ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}></textarea></div>
                </div>

                <div className="pt-6 mt-4 border-t"><button type="button" onClick={handleSaveAndPublish} className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:bg-purple-700 transition-colors">Save & Publish Report</button></div>
            </div>
        </div>
    );
};

export default ReportCardInputScreen;
