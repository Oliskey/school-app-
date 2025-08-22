import React, { useMemo } from 'react';
import { SchoolLogoIcon, DocumentTextIcon } from '../../constants';
import { Student, ReportCard } from '../../types';

// Helper function for grading based on the provided scale
const getGrade = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
};

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

interface ReportCardScreenProps {
  student: Student;
}

const ReportCardScreen: React.FC<ReportCardScreenProps> = ({ student }) => {
    const terms = ["First Term", "Second Term", "Third Term"];

    const reportsByTerm = useMemo(() => {
        const map: { [key: string]: ReportCard | undefined } = {};
        terms.forEach(term => {
            map[term] = student.reportCards?.find(r => r.term === term);
        });
        return map;
    }, [student.reportCards]);

    const publishedReports = useMemo(() => 
        Object.values(reportsByTerm).filter(r => r && r.isPublished) as ReportCard[],
        [reportsByTerm]
    );

    const allSubjects = useMemo(() => {
        const subjectSet = new Set<string>();
        publishedReports.forEach(report => {
            report.academicRecords.forEach(record => subjectSet.add(record.subject));
        });
        return Array.from(subjectSet).sort();
    }, [publishedReports]);

    const calculations = useMemo(() => {
        const termTotals: { [key: string]: number } = {};
        const termAverages: { [key: string]: number } = {};
        const subjectScores: { [key: string]: number[] } = {};
        let cumulativeTotal = 0;
        let cumulativeScoreCount = 0;

        allSubjects.forEach(s => subjectScores[s] = []);

        terms.forEach(term => {
            const report = reportsByTerm[term];
            if (report?.isPublished) {
                const total = report.academicRecords.reduce((sum, rec) => sum + rec.total, 0);
                termTotals[term] = total;
                termAverages[term] = report.academicRecords.length > 0 ? Math.round(total / report.academicRecords.length) : 0;
                
                report.academicRecords.forEach(rec => {
                    subjectScores[rec.subject].push(rec.total);
                    cumulativeTotal += rec.total;
                    cumulativeScoreCount++;
                });
            }
        });
        
        const cumulativeAverage = cumulativeScoreCount > 0 ? Math.round(cumulativeTotal / cumulativeScoreCount) : 0;
        const overallGrade = getGrade(cumulativeAverage);

        return { termTotals, termAverages, subjectScores, cumulativeTotal, cumulativeAverage, overallGrade };
    }, [allSubjects, reportsByTerm, terms]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="p-2 sm:p-4 bg-gray-50 font-serif min-h-full">
            <div className="max-w-4xl mx-auto">
                <div className="mb-4 flex justify-end print:hidden">
                    <button onClick={handlePrint} className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white font-sans font-semibold rounded-lg shadow-md hover:bg-green-600">
                        <DocumentTextIcon className="w-5 h-5"/>
                        <span>Print Report</span>
                    </button>
                </div>

                <div className="printable-area bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
                    <header className="text-center border-b-2 border-gray-300 pb-4 mb-4">
                        <div className="flex justify-center items-center gap-2"><SchoolLogoIcon className="text-green-500 h-10 w-10"/><h1 className="text-2xl font-bold text-gray-800">Smart School Academy</h1></div>
                        <p className="text-gray-600 font-sans font-semibold mt-1">ACADEMIC SESSION REPORT CARD</p>
                    </header>
                    
                    <SectionHeader title="Student Information" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-900 font-sans">
                        <InfoField label="Full Name" value={student.name} />
                        <InfoField label="Class/Grade" value={`${student.grade}${student.section}`} />
                        <InfoField label="Session" value={publishedReports[0]?.session || 'N/A'} />
                        <InfoField label="Student ID" value={`SCH-00${student.id}`} />
                    </div>

                    <SectionHeader title="Academic Performance" />
                    <div className="overflow-x-auto text-sm">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-100 text-left text-gray-700 font-sans font-bold">
                                <tr>
                                    <th className="p-2 border border-gray-300">Subject</th>
                                    {terms.map(term => <th key={term} className="p-2 border border-gray-300 w-20 text-center">{term}</th>)}
                                    <th className="p-2 border border-gray-300 w-20 text-center">Total</th>
                                    <th className="p-2 border border-gray-300 w-20 text-center">Average</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allSubjects.map(subject => {
                                    const scores = calculations.subjectScores[subject] || [];
                                    const total = scores.reduce((a, b) => a + b, 0);
                                    const average = scores.length > 0 ? Math.round(total / scores.length) : 0;
                                    return (
                                        <tr key={subject}>
                                            <td className="p-2 border border-gray-300 font-semibold text-gray-800">{subject}</td>
                                            {terms.map(term => {
                                                const report = reportsByTerm[term];
                                                const record = report?.isPublished ? report.academicRecords.find(r => r.subject === subject) : null;
                                                return <td key={term} className="p-2 border border-gray-300 text-center">{record ? record.total : (report ? '-' : 'N/P')}</td>;
                                            })}
                                            <td className="p-2 border border-gray-300 text-center font-semibold">{total}</td>
                                            <td className="p-2 border border-gray-300 text-center font-bold">{average}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot className="bg-gray-100 font-sans font-bold text-gray-800">
                                <tr>
                                    <td className="p-2 border border-gray-300">Term Total</td>
                                    {terms.map(term => <td key={term} className="p-2 border border-gray-300 text-center">{calculations.termTotals[term] || '-'}</td>)}
                                    <td colSpan={2} className="p-2 border border-gray-300 bg-gray-200"></td>
                                </tr>
                                <tr>
                                    <td className="p-2 border border-gray-300">Term Average</td>
                                    {terms.map(term => <td key={term} className="p-2 border border-gray-300 text-center">{calculations.termAverages[term] || '-'}</td>)}
                                    <td colSpan={2} className="p-2 border border-gray-300 bg-gray-200"></td>
                                </tr>
                            </tfoot>
                        </table>
                        <p className="text-xs text-gray-500 mt-1 font-sans">N/P: Not Published</p>
                    </div>

                    <SectionHeader title="Overall Performance" />
                    <div className="grid grid-cols-3 gap-4 text-center bg-gray-50 p-4 rounded-lg font-sans">
                        <div>
                            <p className="text-sm text-gray-600">Cumulative Total</p>
                            <p className="font-bold text-xl text-gray-800">{calculations.cumulativeTotal}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Cumulative Average</p>
                            <p className="font-bold text-xl text-gray-800">{calculations.cumulativeAverage.toFixed(2)}%</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Overall Grade</p>
                            <p className="font-bold text-xl text-gray-800">{calculations.overallGrade}</p>
                        </div>
                    </div>

                    <SectionHeader title="Comments" />
                    <div className="space-y-4 font-sans">
                        {publishedReports.map(report => (
                             <div key={report.term}>
                                <h4 className="font-bold text-gray-800">{report.term}</h4>
                                <div className="mt-1 p-3 text-sm bg-gray-50 rounded-md text-gray-800 italic space-y-2">
                                    <p><span className="font-semibold not-italic">Teacher:</span> "{report.teacherComment}"</p>
                                    <p><span className="font-semibold not-italic">Principal:</span> "{report.principalComment}"</p>
                                </div>
                             </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center text-sm text-gray-600 font-sans">
                        <p className="border-t-2 border-dotted border-gray-400 pt-2 inline-block">Principal's Signature</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportCardScreen;
