import React, { useMemo } from 'react';
import { Student, ReportCardAcademicRecord } from '../../types';
import { mockStudents } from '../../data';
import { SUBJECT_COLORS, DocumentTextIcon } from '../../constants';
import DonutChart from '../ui/DonutChart';

const SimpleBarChart = ({ data }: { data: ReportCardAcademicRecord[] }) => {
    const maxValue = 100;
    return (
        <div className="space-y-3 pt-2">
            {data.map(item => {
                const colorClass = SUBJECT_COLORS[item.subject] || 'bg-gray-200 text-gray-800';
                return (
                    <div key={item.subject} className="flex items-center space-x-2">
                        <span className="w-28 text-sm font-medium text-gray-600 truncate">{item.subject}</span>
                        <div className="flex-grow bg-gray-200 rounded-full h-5">
                            <div className={`${colorClass} h-5 rounded-full flex items-center justify-end pr-2 text-xs font-bold`} style={{ width: `${item.total}%` }}>
                                {item.total}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

const getGradeInfo = (score: number): { grade: 'A' | 'B' | 'C' | 'D' | 'F', color: string } => {
    if (score >= 90) return { grade: 'A', color: 'text-green-600' };
    if (score >= 80) return { grade: 'B', color: 'text-sky-600' };
    if (score >= 70) return { grade: 'C', color: 'text-amber-600' };
    if (score >= 60) return { grade: 'D', color: 'text-orange-600' };
    return { grade: 'F', color: 'text-red-600' };
};

interface ResultsScreenProps {
    studentId: number;
    navigateTo: (view: string, title: string, props?: any) => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ studentId, navigateTo }) => {
    const student = useMemo(() => mockStudents.find(s => s.id === studentId), [studentId]);

    const latestReport = useMemo(() => {
        if (!student?.reportCards || student.reportCards.length === 0) {
            return null;
        }
        return student.reportCards.find(rc => rc.isPublished); // Find the first published report
    }, [student]);

    const reportData = useMemo(() => {
        if (!latestReport) {
            return { term: 'N/A', records: [], average: 0 };
        }
        const records = latestReport.academicRecords;
        const average = records.length > 0 ? Math.round(records.reduce((sum, r) => sum + r.total, 0) / records.length) : 0;
        
        return { term: latestReport.term, records, average };
    }, [latestReport]);

    if (!student) return <div>Student not found.</div>;
    
    if (!latestReport) {
        return (
             <div className="p-4 bg-gray-50 h-full flex flex-col items-center justify-center text-center">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold text-gray-700">Results Not Yet Published</h2>
                    <p className="text-gray-500 mt-2">Your results for this term have not been published. Please check back later.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 space-y-5 bg-gray-50">
            {/* Overall Performance */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">Overall Performance</h3>
                        <p className="text-sm text-gray-500">{reportData.term}</p>
                    </div>
                    <div className="relative">
                        <DonutChart percentage={reportData.average} color="#FF9800" size={80} strokeWidth={9} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-bold text-gray-800">{reportData.average}%</span>
                            <span className="text-xs text-gray-500">Average</span>
                        </div>
                    </div>
                </div>
                <SimpleBarChart data={reportData.records} />
                 <button 
                    onClick={() => navigateTo('academicReport', 'Academic Report', { studentId })}
                    className="mt-4 w-full text-center py-2 px-4 bg-orange-100 text-orange-700 font-semibold rounded-lg hover:bg-orange-200 transition-colors flex justify-center items-center space-x-2"
                >
                    <span>View Detailed Report</span>
                </button>
            </div>
        </div>
    );
};

export default ResultsScreen;
