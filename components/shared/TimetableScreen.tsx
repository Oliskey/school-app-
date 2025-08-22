import React, { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, SUBJECT_COLORS, ViewGridIcon, ViewDayIcon } from '../../constants';
import { mockTimetableData } from '../../data';
import { TimetableEntry } from '../../types';

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const timeToRow = (time: string): number => {
    const index = timeSlots.findIndex(slot => slot >= time);
    return index !== -1 ? index + 2 : timeSlots.length + 2;
};

const TimetableScreen: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
    const [selectedDay, setSelectedDay] = useState<TimetableEntry['day']>(daysOfWeek[new Date().getDay() - 1] as TimetableEntry['day'] || 'Monday');

    const goToPreviousWeek = () => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
    const goToNextWeek = () => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));

    // For demo purposes, we'll use the same data every week.
    // In a real app, this would filter based on the currentDate.
    const weeklyData = useMemo(() => {
        return mockTimetableData.reduce((acc, entry) => {
            if (!acc[entry.day]) {
                acc[entry.day] = [];
            }
            acc[entry.day].push(entry);
            return acc;
        }, {} as { [key: string]: TimetableEntry[] });
    }, [currentDate]);


    const renderWeekView = () => (
        <div className="grid flex-grow" style={{ gridTemplateColumns: '40px repeat(5, 1fr)', gridTemplateRows: `auto repeat(${timeSlots.length}, 1fr)` }}>
            {/* Top-left empty cell */}
            <div className="col-start-1 row-start-1"></div>
            {/* Day headers */}
            {daysOfWeek.map((day, index) => (
                <div key={day} className="text-center font-bold text-gray-600 text-sm py-2 border-b border-gray-200" style={{ gridColumn: index + 2 }}>
                    {day.substring(0, 3)}
                </div>
            ))}
            {/* Time labels */}
            {timeSlots.map((time, index) => (
                <div key={time} className="text-right text-xs font-semibold text-gray-500 pr-2 pt-1 border-r border-gray-200" style={{ gridRow: index + 2 }}>
                    {time}
                </div>
            ))}
            {/* Timetable entries */}
            {Object.entries(weeklyData).map(([day, entries]) => {
                const col = daysOfWeek.indexOf(day) + 2;
                if (col === 1) return null; // Day not in our week view
                return (
                    <React.Fragment key={day}>
                        {entries.map((entry, i) => {
                            const rowStart = timeToRow(entry.startTime);
                            const rowEnd = timeToRow(entry.endTime);
                            const colorClass = SUBJECT_COLORS[entry.subject] || 'bg-gray-200 text-gray-800';
                            return (
                                <div key={`${day}-${i}`}
                                     className={`p-2 m-0.5 rounded-lg flex flex-col justify-center overflow-hidden shadow-sm hover:scale-[1.02] transition-transform duration-200 ${colorClass}`}
                                     style={{ gridColumn: col, gridRow: `${rowStart} / ${rowEnd}` }}>
                                    <p className="font-bold text-sm truncate">{entry.subject}</p>
                                    <p className="text-xs truncate">{entry.startTime} - {entry.endTime}</p>
                                </div>
                            );
                        })}
                    </React.Fragment>
                );
            })}
        </div>
    );
    
    const renderDayView = () => {
        const dayEntries = weeklyData[selectedDay]?.sort((a,b) => a.startTime.localeCompare(b.startTime)) || [];
        return (
            <div className="p-2 space-y-3">
                 <div className="flex space-x-1">
                    {daysOfWeek.map(day => (
                        <button key={day} onClick={() => setSelectedDay(day as TimetableEntry['day'])} className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors ${selectedDay === day ? 'bg-orange-500 text-white shadow' : 'bg-white text-gray-600'}`}>
                            {day.substring(0,3)}
                        </button>
                    ))}
                </div>
                {dayEntries.length > 0 ? dayEntries.map((entry, i) => {
                     const colorClass = SUBJECT_COLORS[entry.subject] || 'bg-gray-200 text-gray-800';
                     return (
                        <div key={`${selectedDay}-${i}`} className={`p-4 rounded-lg flex items-center space-x-4 shadow-sm ${colorClass.replace('bg-','bg-opacity-20 ')}`}>
                            <div className="text-center w-16 flex-shrink-0">
                                <p className="font-bold text-sm text-gray-800">{entry.startTime}</p>
                                <p className="text-xs text-gray-500">{entry.endTime}</p>
                            </div>
                            <div className={`w-1.5 h-12 rounded-full ${colorClass}`}></div>
                            <div>
                                <p className="font-bold text-gray-800">{entry.subject}</p>
                                <p className="text-sm text-gray-600">Class {entry.className}</p>
                            </div>
                        </div>
                     )
                }) : (
                     <div className="text-center py-10 bg-white rounded-lg">
                        <p className="font-semibold text-gray-500">No classes scheduled for {selectedDay}.</p>
                    </div>
                )}
            </div>
        )
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-t-3xl overflow-hidden">
            {/* Header */}
            <div className="p-3 flex justify-between items-center bg-gray-50 border-b border-gray-200 flex-shrink-0">
                <button onClick={goToPreviousWeek} className="p-2 rounded-full hover:bg-gray-200" aria-label="Previous week">
                    <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                </button>
                <div className="text-center">
                    <h3 className="font-bold text-gray-800">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <p className="text-xs text-gray-500">Week View</p>
                </div>
                <button onClick={goToNextWeek} className="p-2 rounded-full hover:bg-gray-200" aria-label="Next week">
                    <ChevronRightIcon />
                </button>
            </div>
            <div className="p-3 bg-gray-50 border-b border-gray-200">
                 <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
                    <button onClick={() => setViewMode('week')} className={`w-1/2 py-2 text-sm font-semibold rounded-md flex items-center justify-center space-x-2 transition-colors ${viewMode === 'week' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600'}`}>
                        <ViewGridIcon /><span>Week</span>
                    </button>
                    <button onClick={() => setViewMode('day')} className={`w-1/2 py-2 text-sm font-semibold rounded-md flex items-center justify-center space-x-2 transition-colors ${viewMode === 'day' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600'}`}>
                        <ViewDayIcon /><span>Day</span>
                    </button>
                </div>
            </div>

            {/* Content */}
            <main className="flex-grow overflow-auto bg-gray-50">
                {viewMode === 'week' ? renderWeekView() : renderDayView()}
            </main>
        </div>
    );
};

export default TimetableScreen;