import React, { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, SUBJECT_COLORS, ViewGridIcon, ViewDayIcon } from '../../constants';
import { mockTimetableData, mockStudents, mockTeachers } from '../../data';
import { TimetableEntry, Student, Teacher } from '../../types';

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

const daysOfWeek: TimetableEntry['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

interface TimetableScreenProps {
    context: {
        userType: 'teacher' | 'student';
        userId: number;
    }
}

const TimetableScreen: React.FC<TimetableScreenProps> = ({ context }) => {
    const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
    const [selectedDay, setSelectedDay] = useState<TimetableEntry['day']>(daysOfWeek[new Date().getDay() - 1] || 'Monday');
    
    const { filteredData, themeColor } = useMemo(() => {
        if (context.userType === 'student') {
            const student = mockStudents.find(s => s.id === context.userId);
            if (!student) return { filteredData: [], themeColor: 'orange' };
            const studentClass = `Grade ${student.grade}${student.section}`;
            return {
                filteredData: mockTimetableData.filter(entry => entry.className.includes(studentClass)),
                themeColor: 'orange'
            };
        }
        if (context.userType === 'teacher') {
            const teacher = mockTeachers.find(t => t.id === context.userId);
            if (!teacher) return { filteredData: [], themeColor: 'purple' };
            return {
                filteredData: mockTimetableData.filter(entry => teacher.classes.includes(entry.className.replace('Grade ','')) && entry.subject === teacher.subject),
                themeColor: 'purple'
            };
        }
        return { filteredData: [], themeColor: 'gray' };
    }, [context]);
    
    const timetableGrid = useMemo(() => {
        const grid: { [key: string]: TimetableEntry } = {};
        filteredData.forEach(entry => {
            grid[`${entry.day}-${entry.startTime}`] = entry;
        });
        return grid;
    }, [filteredData]);

    const renderWeekView = () => (
        <div className="overflow-x-auto p-3 md:p-4">
            <div className="grid gap-1 md:gap-2 min-w-full" style={{ gridTemplateColumns: `80px repeat(${PERIODS.length}, 1fr)`}}>
                {/* Top-left empty cell */}
                <div className="sticky top-0 left-0 bg-white z-30 border-b border-r border-gray-200 rounded-t-lg shadow-sm"></div>
                
                {/* Period headers with improved styling */}
                {PERIODS.map(period => (
                    <div key={period.name} className="text-center font-bold text-gray-700 text-[10px] md:text-sm py-2 sticky top-0 bg-white z-20 border-b border-gray-200 shadow-sm rounded-t-lg">
                        <div className="text-gray-900 truncate">{period.name}</div>
                        <div className="font-normal text-[9px] md:text-xs text-gray-500 mt-1">{formatTime12Hour(period.start)} - {formatTime12Hour(period.end)}</div>
                    </div>
                ))}
                
                {/* Rows for each day with improved navigation */}
                {daysOfWeek.map(day => (
                    <React.Fragment key={day}>
                        <div className="sticky left-0 bg-white z-10 font-bold text-gray-700 text-[10px] md:text-sm flex items-center justify-center p-2 border-r border-gray-200 shadow-sm rounded-l-lg">
                            <button 
                                onClick={() => {
                                    setSelectedDay(day);
                                    setViewMode('day');
                                }}
                                className="hover:text-purple-600 transition-colors duration-300 truncate"
                            >
                                {day.substring(0, 3)}
                            </button>
                        </div>
                        {PERIODS.map(period => {
                            const key = `${day}-${period.start}`;
                            const entry = timetableGrid[key];
                            
                            if (period.isBreak) {
                                return (
                                    <div key={key} className="h-14 md:h-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg flex items-center justify-center font-semibold text-amber-700 border border-amber-200 shadow-sm">
                                        <div className="text-center px-1">
                                            <div className="text-[10px] md:text-xs truncate">{period.name}</div>
                                            <div className="text-[9px] md:text-[10px] mt-1 truncate">{formatTime12Hour(period.start)} - {formatTime12Hour(period.end)}</div>
                                        </div>
                                    </div>
                                );
                            }

                            if (!entry) {
                                return (
                                    <div key={key} className="h-14 md:h-16 bg-white rounded-lg border border-gray-100 flex items-center justify-center shadow-sm transition-all duration-300 hover:shadow-md">
                                        <span className="text-gray-300 text-[9px] md:text-xs">No class</span>
                                    </div>
                                );
                            }
                            
                            const colorClass = SUBJECT_COLORS[entry.subject] || 'bg-gray-200 text-gray-800';
                            return (
                                <div 
                                    key={key} 
                                    className={`h-14 md:h-16 p-1 cursor-pointer transition-all duration-300 hover:scale-[1.02]`}
                                    onClick={() => {
                                        setSelectedDay(day);
                                        setViewMode('day');
                                    }}
                                >
                                    <div className={`h-full w-full p-1.5 md:p-2 rounded-lg flex flex-col justify-center text-white ${colorClass} shadow-md hover:shadow-lg transition-all duration-300`}>
                                        <p className="font-bold text-[9px] md:text-xs truncate">{entry.subject}</p>
                                        <p className="text-[8px] md:text-[9px] truncate mt-1 opacity-90">{formatTime12Hour(entry.startTime)} - {formatTime12Hour(entry.endTime)}</p>
                                        {context.userType === 'teacher' && <p className="text-[7px] md:text-[8px] truncate mt-1">{entry.className}</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
    
    const renderDayView = () => {
        const dayEntries = filteredData
            .filter(e => e.day === selectedDay)
            .sort((a,b) => a.startTime.localeCompare(b.startTime));
        
        return (
            <div className="p-2 md:p-4 space-y-2 md:space-y-4">
                 <div className="flex space-x-1 mb-3 md:mb-4">
                    {daysOfWeek.map(day => (
                        <button 
                            key={day} 
                            onClick={() => setSelectedDay(day)} 
                            className={`flex-1 py-1.5 md:py-2.5 text-[10px] md:text-sm font-semibold rounded-md md:rounded-lg transition-all duration-300 ${
                                selectedDay === day ? `bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md` : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                            }`}
                        >
                            {day.substring(0, 3)}
                        </button>
                    ))}
                </div>
                {dayEntries.length > 0 ? dayEntries.map((entry, i) => {
                     const colorClass = SUBJECT_COLORS[entry.subject] || 'bg-gray-200 text-gray-800';
                     const bgColorClass = colorClass.replace(/bg-\w+-\d+/, `bg-purple-50`);
                     const borderColorClass = colorClass.replace(/bg-\w+-\d+/, `border-purple-300`);
                     return (
                        <div key={`${selectedDay}-${i}`} className={`p-2 md:p-4 rounded-lg md:rounded-xl flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 md:space-x-3 shadow-sm md:shadow-md transition-all duration-300 hover:shadow-md md:hover:shadow-lg ${bgColorClass} border-l-2 ${borderColorClass}`}>
                            <div className="text-center w-full md:w-16 flex-shrink-0 bg-white rounded-md md:rounded-lg p-1.5 md:p-2.5 shadow-sm">
                                <p className="font-bold text-gray-800 text-xs md:text-base">{formatTime12Hour(entry.startTime)}</p>
                                <p className="text-[10px] md:text-xs text-gray-500">{formatTime12Hour(entry.endTime)}</p>
                            </div>
                            <div className={`w-8 md:w-2 h-2 md:h-8 rounded-full ${colorClass} mx-auto md:mx-0`}></div>
                            <div className="flex-grow">
                                <p className="font-bold text-gray-800 text-sm md:text-lg">{entry.subject}</p>
                                {context.userType === 'teacher' && <p className="text-[10px] md:text-sm text-gray-600 mt-1">{entry.className}</p>}
                                <p className="text-[10px] md:text-xs text-gray-500 mt-1 bg-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-md md:rounded-lg inline-block">Period: {entry.startTime} - {entry.endTime}</p>
                            </div>
                        </div>
                     )
                }) : (
                     <div className="text-center py-6 md:py-10 bg-white rounded-lg md:rounded-xl shadow-sm">
                        <div className="mx-auto w-10 h-10 md:w-14 md:h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2 md:mb-3">
                            <svg className="w-5 h-5 md:w-7 md:h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1">No Classes Scheduled</h3>
                        <p className="text-[10px] md:text-sm text-gray-500 px-2">There are no classes scheduled for {selectedDay}.</p>
                    </div>
                )}
            </div>
        )
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-t-2xl md:rounded-t-3xl overflow-hidden shadow-lg">
            <div className="p-2 md:p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                 <div className="flex space-x-1 bg-gray-200 p-1 rounded-md md:rounded-lg">
                    <button 
                        onClick={() => setViewMode('week')} 
                        className={`w-1/2 py-1.5 md:py-2.5 text-[10px] md:text-sm font-semibold rounded-sm md:rounded-md flex items-center justify-center space-x-1 transition-all duration-300 ${
                            viewMode === 'week' ? `bg-white text-purple-600 shadow-sm md:shadow-md` : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <ViewGridIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span>Week</span>
                    </button>
                    <button 
                        onClick={() => setViewMode('day')} 
                        className={`w-1/2 py-1.5 md:py-2.5 text-[10px] md:text-sm font-semibold rounded-sm md:rounded-md flex items-center justify-center space-x-1 transition-all duration-300 ${
                            viewMode === 'day' ? `bg-white text-purple-600 shadow-sm md:shadow-md` : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <ViewDayIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span>Day</span>
                    </button>
                </div>
            </div>

            <main className="flex-grow overflow-auto bg-gray-50">
                {viewMode === 'week' ? renderWeekView() : renderDayView()}
            </main>
        </div>
    );
};

export default TimetableScreen;