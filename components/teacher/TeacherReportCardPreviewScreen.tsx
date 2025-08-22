import React from 'react';
import { SchoolLogoIcon, DocumentTextIcon, XCircleIcon, PublishIcon } from '../../constants';
import { Student } from '../../types';

interface TeacherReportCardPreviewScreenProps {
  student: Student;
  handleBack: () => void;
  onPublish?: () => void;
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="bg-gray-100 p-2 rounded-md my-4">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{title}</h3>
    </div>
);

const InfoField: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800 text-sm">{value}</p>
    </div>
);

const TeacherReportCardPreviewScreen: React.FC<TeacherReportCardPreviewScreenProps> = ({ student, handleBack, onPublish }) => {
    
    const report = student.reportCards?.[student.reportCards.length - 1];
    const isPublished = report?.isPublished ?? false;

    const handlePrint = () => {
        window.print();
    };

    if (!report) {
        return (
            <div className="p-6 text-center bg-gray-50 h-full flex flex-col justify-center">
                <h3 className="font-bold text-lg text-gray-800">No Report Card Data</h3>
                <p className="text-gray-600 mt-2">This student does not have a report card draft to preview yet.</p>
                <button onClick={handleBack} className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Go Back</button>
            </div>
        );
    }

    const SKILL_BEHAVIOUR_DOMAINS = ['Neatness', 'Punctuality', 'Politeness', 'Respect for Others', 'Participation in Class', 'Homework Completion', 'Teamwork/Cooperation', 'Attentiveness', 'Creativity', 'Honesty/Integrity'];
    const PSYCHOMOTOR_SKILLS = ['Handwriting', 'Drawing/Art Skills', 'Craft Skills', 'Music & Dance', 'Sports Participation'];

    return (
        <div className="flex flex-col h-full bg-gray-100">
             <div className="p-3 border-b border-gray-200 flex justify-end items-center space-x-2 flex-shrink-0 bg-white print:hidden">
                <button onClick={handlePrint} className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-semibold text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200">
                    <DocumentTextIcon className="w-4 h-4"/>
                    <span>Print</span>
                </button>
                {onPublish && !isPublished && (
                    <button onClick={onPublish} className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-semibold text-green-700 bg-green-100 rounded-md hover:bg-green-200">
                        <PublishIcon className="w-4 h-4" />
                        <span>Publish</span>
                    </button>
                )}
            </div>
            
            <div className="flex-grow overflow-y-auto p-4 font-serif">
                 <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm max-w-md mx-auto printable-area">
                    <header className="text-center border-b-2 border-gray-300 pb-4 mb-4">
                        <div className="flex justify-center items-center gap-2"><SchoolLogoIcon className="text-purple-500 h-10 w-10"/><h1 className="text-2xl font-bold text-gray-800">Smart School Academy</h1></div>
                        <p className="text-gray-600 font-semibold mt-1">END OF TERM REPORT CARD</p>
                    </header>
                    
                    <SectionHeader title="Student Information" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-900">
                        <InfoField label="Full Name" value={student.name} />
                        <InfoField label="Class/Grade" value={`${student.grade}${student.section}`} />
                        <InfoField label="Term/Semester" value={report.term} />
                        <InfoField label="Session" value={report.session} />
                    </div>

                    <SectionHeader title="Academic Performance" />
                    <div className="overflow-x-auto text-xs">
                        <table className="min-w-full border">
                            <thead className="bg-gray-50"><tr className="text-left text-gray-600"><th className="p-2 border">Subject</th><th className="p-2 border w-14 text-center">CA</th><th className="p-2 border w-14 text-center">Exam</th><th className="p-2 border w-14 text-center">Total</th><th className="p-2 border w-12 text-center">Grade</th><th className="p-2 border">Remark</th></tr></thead>
                            <tbody>
                                {report.academicRecords.map((record, index) => (
                                    <tr key={index}><td className="p-1 border font-semibold text-gray-800">{record.subject}</td><td className="p-1 border text-center">{record.ca}</td><td className="p-1 border text-center">{record.exam}</td><td className="p-1 border text-center font-bold text-gray-800">{record.total}</td><td className="p-1 border text-center font-bold text-gray-800">{record.grade}</td><td className="p-1 border text-gray-700 italic">"{record.remark}"</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        <div><SectionHeader title="Skills & Behaviour" /><table className="w-full text-sm"><tbody>{SKILL_BEHAVIOUR_DOMAINS.map(skill => (<tr key={skill}><td className="py-1 text-gray-800">{skill}</td><td className="w-20 text-center font-bold">{report.skills[skill] || '-'}</td></tr>))}</tbody></table></div>
                        <div><SectionHeader title="Psychomotor Skills" /><table className="w-full text-sm"><tbody>{PSYCHOMOTOR_SKILLS.map(skill => (<tr key={skill}><td className="py-1 text-gray-800">{skill}</td><td className="w-20 text-center font-bold">{report.psychomotor[skill] || '-'}</td></tr>))}</tbody></table></div>
                    </div>

                    <SectionHeader title="Attendance Record" />
                    <div className="grid grid-cols-4 gap-4 text-sm text-center">
                        <div><p className="text-xs text-gray-500">Total Days</p><p className="font-bold text-lg">{report.attendance.total}</p></div>
                        <div><p className="text-xs text-gray-500">Present</p><p className="font-bold text-lg">{report.attendance.present}</p></div>
                        <div><p className="text-xs text-gray-500">Absent</p><p className="font-bold text-lg">{report.attendance.absent}</p></div>
                        <div><p className="text-xs text-gray-500">Late</p><p className="font-bold text-lg">{report.attendance.late}</p></div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div><label className="font-semibold text-sm text-gray-700">Teacher's Comment:</label><p className="w-full mt-1 p-2 text-sm bg-gray-50 rounded-md text-gray-800 italic">"{report.teacherComment}"</p></div>
                        <div><label className="font-semibold text-sm text-gray-700">Principal's Comment:</label><p className="w-full mt-1 p-2 text-sm bg-gray-50 rounded-md text-gray-800 italic">"{report.principalComment}"</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherReportCardPreviewScreen;