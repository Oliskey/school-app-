import React from 'react';
import { SchoolLogoIcon, XCircleIcon } from '../../constants';
import { Student, ReportCard, Rating } from '../../types';

interface ReportCardPreviewProps {
  student: Student;
  onClose: () => void;
}

const getGradeInfo = (score: number): { grade: string, color: string } => {
    if (score >= 90) return { grade: 'A', color: 'text-green-600' };
    if (score >= 80) return { grade: 'B', color: 'text-sky-600' };
    if (score >= 70) return { grade: 'C', color: 'text-amber-600' };
    if (score >= 60) return { grade: 'D', color: 'text-orange-600' };
    if (score >= 50) return { grade: 'E', color: 'text-red-600' };
    return { grade: 'F', color: 'text-red-600' };
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-2.5 py-1.5 rounded-md my-3 border-l-2 border-indigo-500">
        <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wide">{title}</h3>
    </div>
);

const InfoField: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="mb-1.5">
        <p className="text-[0.6rem] text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="font-semibold text-gray-800 text-xs">{value}</p>
    </div>
);

const ReportCardPreview: React.FC<ReportCardPreviewProps> = ({ student, onClose }) => {
    
    const report = student.reportCards?.[student.reportCards.length - 1];

    if (!report) {
        return (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-3 z-50 animate-fade-in">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-xs mx-auto p-4 text-center">
                    <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                        <XCircleIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="font-bold text-base text-gray-800 mb-1.5">No Report Card Available</h3>
                    <p className="text-gray-600 text-xs mb-4">A report card has not been generated for this student yet.</p>
                    <button 
                        onClick={onClose} 
                        className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-md font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    const SKILL_BEHAVIOUR_DOMAINS = ['Neatness', 'Punctuality', 'Politeness', 'Respect for Others', 'Participation in Class', 'Homework Completion', 'Teamwork/Cooperation', 'Attentiveness', 'Creativity', 'Honesty/Integrity'];
    const PSYCHOMOTOR_SKILLS = ['Handwriting', 'Drawing/Art Skills', 'Craft Skills', 'Music & Dance', 'Sports Participation'];

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-2 z-50 animate-fade-in">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto flex flex-col max-h-[95vh]">
                {/* Header */}
                <div className="px-3 py-2 border-b border-gray-200 flex justify-between items-center flex-shrink-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
                    <h3 className="font-bold text-base text-gray-800">Report Card Preview</h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 bg-white rounded-full p-0.5 shadow-xs hover:shadow-sm transition-all"
                    >
                        <XCircleIcon className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Scrollable Content */}
                <div className="flex-grow overflow-y-auto px-3 py-2 bg-gradient-to-b from-indigo-50/30 to-purple-50/30">
                    <div className="bg-white rounded-lg shadow-xs px-3 py-2.5">
                        {/* School Header */}
                        <header className="text-center border-b border-indigo-200 pb-3">
                            <div className="flex justify-center items-center gap-2 mb-2">
                                <SchoolLogoIcon className="text-indigo-600 h-8 w-8" />
                                <div>
                                    <h1 className="text-lg font-bold text-gray-800">Smart School Academy</h1>
                                    <p className="text-gray-600 font-semibold text-xs mt-0.5">END OF TERM REPORT CARD</p>
                                </div>
                            </div>
                            <div className="inline-block bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                                Official Academic Report - Confidential
                            </div>
                        </header>
                        
                        {/* Student Information */}
                        <SectionHeader title="Student Information" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <InfoField label="Full Name" value={student.name} />
                            <InfoField label="Class/Grade" value={`${student.grade}${student.section}`} />
                            <InfoField label="Term/Semester" value={report.term} />
                            <InfoField label="Session" value={report.session} />
                        </div>
                        
                        {/* Academic Performance */}
                        <SectionHeader title="Academic Performance" />
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 rounded-md text-xs">
                                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                                    <tr>
                                        <th className="px-2 py-1.5 border-b border-gray-200 text-left text-gray-700 font-semibold">Subject</th>
                                        <th className="px-2 py-1.5 border-b border-gray-200 text-center text-gray-700 font-semibold w-10">CA</th>
                                        <th className="px-2 py-1.5 border-b border-gray-200 text-center text-gray-700 font-semibold w-10">Exam</th>
                                        <th className="px-2 py-1.5 border-b border-gray-200 text-center text-gray-700 font-semibold w-10">Total</th>
                                        <th className="px-2 py-1.5 border-b border-gray-200 text-center text-gray-700 font-semibold w-8">Grade</th>
                                        <th className="px-2 py-1.5 border-b border-gray-200 text-left text-gray-700 font-semibold">Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {report.academicRecords.map((record, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-2 py-1.5 border-b border-gray-100 font-semibold text-gray-800">{record.subject}</td>
                                            <td className="px-2 py-1.5 border-b border-gray-100 text-center">{record.ca}</td>
                                            <td className="px-2 py-1.5 border-b border-gray-100 text-center">{record.exam}</td>
                                            <td className="px-2 py-1.5 border-b border-gray-100 text-center font-bold text-gray-800">{record.total}</td>
                                            <td className="px-2 py-1.5 border-b border-gray-100 text-center font-bold text-gray-800">
                                                <span className={getGradeInfo(record.total).color}>
                                                    {getGradeInfo(record.total).grade}
                                                </span>
                                            </td>
                                            <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700 italic">"{record.remark}"</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Skills and Behavior & Psychomotor Skills */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <SectionHeader title="Skills & Behaviour" />
                                <div className="bg-white rounded border border-gray-200 overflow-hidden">
                                    {SKILL_BEHAVIOUR_DOMAINS.map((skill, index) => (
                                        <div key={skill} className={`flex justify-between items-center px-2.5 py-1.5 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                            <span className="text-gray-800 text-xs">{skill}</span>
                                            <span className="inline-block w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs font-bold">
                                                {report.skills[skill] || '-'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <SectionHeader title="Psychomotor Skills" />
                                <div className="bg-white rounded border border-gray-200 overflow-hidden">
                                    {PSYCHOMOTOR_SKILLS.map((skill, index) => (
                                        <div key={skill} className={`flex justify-between items-center px-2.5 py-1.5 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                            <span className="text-gray-800 text-xs">{skill}</span>
                                            <span className="inline-block w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs font-bold">
                                                {report.psychomotor[skill] || '-'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Attendance Record */}
                        <SectionHeader title="Attendance Record" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-md p-2.5 text-center border border-blue-200">
                                <p className="text-[0.6rem] text-gray-600 uppercase tracking-wide">Total School Days</p>
                                <p className="font-bold text-base text-blue-700">{report.attendance.total}</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-md p-2.5 text-center border border-green-200">
                                <p className="text-[0.6rem] text-gray-600 uppercase tracking-wide">Days Present</p>
                                <p className="font-bold text-base text-green-700">{report.attendance.present}</p>
                            </div>
                            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-md p-2.5 text-center border border-red-200">
                                <p className="text-[0.6rem] text-gray-600 uppercase tracking-wide">Days Absent</p>
                                <p className="font-bold text-base text-red-700">{report.attendance.absent}</p>
                            </div>
                            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-md p-2.5 text-center border border-amber-200">
                                <p className="text-[0.6rem] text-gray-600 uppercase tracking-wide">Days Late</p>
                                <p className="font-bold text-base text-amber-700">{report.attendance.late}</p>
                            </div>
                        </div>
                        
                        {/* Comments */}
                        <div className="space-y-3">
                            <div>
                                <label className="font-semibold text-gray-700 block mb-1 text-xs">Teacher's Comment:</label>
                                <div className="w-full px-2.5 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-md border border-indigo-100">
                                    <p className="text-gray-800 italic text-xs">"{report.teacherComment}"</p>
                                </div>
                            </div>
                            
                            <div>
                                <label className="font-semibold text-gray-700 block mb-1 text-xs">Principal's Comment:</label>
                                <div className="w-full px-2.5 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-md border border-indigo-100">
                                    <p className="text-gray-800 italic text-xs">"{report.principalComment}"</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="pt-3 border-t border-gray-200 text-center">
                            <p className="text-gray-600 text-[0.65rem]">
                                This report card is confidential and should be kept safely. 
                                For any inquiries, please contact the school administration.
                            </p>
                            <div className="mt-3 flex flex-col sm:flex-row justify-center gap-4">
                                <div className="text-center">
                                    <div className="border-t border-gray-400 pt-1.5 mt-1.5 w-24 mx-auto"></div>
                                    <p className="text-gray-700 font-semibold mt-1 text-xs">Class Teacher</p>
                                </div>
                                <div className="text-center">
                                    <div className="border-t border-gray-400 pt-1.5 mt-1.5 w-24 mx-auto"></div>
                                    <p className="text-gray-700 font-semibold mt-1 text-xs">Principal</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Footer Actions */}
                <div className="px-3 py-2 border-t border-gray-200 flex justify-end flex-shrink-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-b-lg mt-auto">
                    <button 
                        onClick={onClose} 
                        className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-md font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xs"
                    >
                        Close Preview
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportCardPreview;