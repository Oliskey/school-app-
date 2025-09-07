import React from 'react';
import { EXAM_TYPE_COLORS, ClockIcon, ExamIcon } from '../../constants';
import { mockExamsData } from '../../data';
import { Exam } from '../../types';

// Function to group exams by date
const groupExamsByDate = (exams: Exam[]) => {
  return exams.reduce((acc, exam) => {
    const date = exam.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(exam);
    return acc;
  }, {} as { [key: string]: Exam[] });
};

const ExamSchedule: React.FC = () => {
    
    const publishedExams = mockExamsData
        .filter(exam => exam.isPublished)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const groupedExams = groupExamsByDate(publishedExams);

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100">
            <main className="flex-grow p-3 md:p-4 space-y-5 md:space-y-7 overflow-y-auto">
                {Object.keys(groupedExams).length > 0 ? (
                    Object.entries(groupedExams).map(([date, examsOnDate]) => (
                        <div key={date}>
                            <div className="mb-3 md:mb-4 pl-2">
                                <h3 className="font-bold text-lg md:text-xl text-gray-800 pb-2 border-b border-gray-200">
                                    {/* Replace hyphens with slashes for better cross-browser date parsing consistency */}
                                    {new Date(date.replace(/-/g, '/')).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                </h3>
                            </div>
                            <div className="space-y-3 md:space-y-4">
                                {examsOnDate.map(exam => {
                                    const examTypeStyle = EXAM_TYPE_COLORS[exam.type] || 'bg-gray-100 text-gray-800 border-gray-300';
                                    const borderColorClass = examTypeStyle.split(' ').find(c => c.startsWith('border-')) || 'border-gray-300';
                                    const bgColorClass = examTypeStyle.split(' ')[0] || 'bg-gray-100';
                                    const textColorClass = (examTypeStyle.split(' ')[1] || 'text-gray-800').replace('-800', '-600');
                                    
                                    return (
                                        <div key={exam.id} className={`bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg border-l-4 ${borderColorClass} overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5`}>
                                            <div className="p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
                                                <div className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center ${bgColorClass} transition-all duration-300 hover:scale-105 shadow-sm md:shadow-md`}>
                                                    <ExamIcon className={`w-7 h-7 md:w-8 md:h-8 ${textColorClass}`} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-base md:text-xl text-gray-800">{exam.subject}</p>
                                                    <p className="text-xs md:text-sm text-gray-500 font-semibold mt-1">{exam.className}</p>
                                                    {exam.time && (
                                                      <div className="flex items-center text-xs md:text-sm text-gray-600 mt-2">
                                                        <ClockIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gray-400" />
                                                        <span className="font-medium">{exam.time}</span>
                                                      </div>
                                                    )
                                                    }
                                                </div>
                                                <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 shadow-sm">
                                                    {exam.type}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 md:py-16 bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg mt-6 md:mt-8 transition-all duration-300 hover:shadow-lg">
                        <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 md:mb-5 shadow-sm md:shadow-md">
                            <ExamIcon className="h-8 w-8 md:h-10 md:w-10 text-gray-500" />
                        </div>
                        <h3 className="mt-2 text-xl md:text-2xl font-bold text-gray-900">No Exams Published</h3>
                        <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-600 max-w-md mx-auto px-4">The exam schedule has not been released yet. Please check back later.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ExamSchedule;