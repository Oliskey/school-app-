import React, { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, EVENT_TYPE_CONFIG } from '../../constants';
import { mockCalendarEvents } from '../../data';
import { CalendarEvent } from '../../types';

const CalendarScreen: React.FC = () => {
    // Start with a fixed date for consistent demo data viewing
    const [currentDate, setCurrentDate] = useState(new Date('2024-08-01T12:00:00Z'));
    const [selectedDate, setSelectedDate] = useState(new Date('2024-08-10T12:00:00Z'));

    const firstDayOfMonth = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), [currentDate]);
    const lastDayOfMonth = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0), [currentDate]);

    const daysInMonth = useMemo(() => {
        const days = [];
        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
        }
        return days;
    }, [lastDayOfMonth, currentDate]);
    
    const startingDayIndex = firstDayOfMonth.getDay();

    const eventsByDate = useMemo(() => {
        const map = new Map<string, CalendarEvent[]>();
        mockCalendarEvents.forEach(event => {
            const dateKey = event.date;
            if (!map.has(dateKey)) {
                map.set(dateKey, []);
            }
            map.get(dateKey)!.push(event);
        });
        return map;
    }, []);

    const selectedDateEvents = useMemo(() => {
      const dateKey = selectedDate.toISOString().split('T')[0];
      return eventsByDate.get(dateKey) || [];
    }, [selectedDate, eventsByDate]);

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100">
            <main className="flex-grow p-3 md:p-4 space-y-4 md:space-y-5 overflow-y-auto">
                <div className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg p-4 md:p-5 transition-all duration-300 hover:shadow-lg">
                    <div className="flex justify-between items-center mb-4 md:mb-5">
                        <button onClick={goToPreviousMonth} className="p-2 md:p-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-sm" aria-label="Previous month">
                            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
                        </button>
                        <h3 className="font-bold text-lg md:text-xl text-gray-800">
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h3>
                        <button onClick={goToNextMonth} className="p-2 md:p-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-sm" aria-label="Next month">
                            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 md:gap-2 text-center text-xs md:text-sm font-bold text-gray-600 mb-2 md:mb-3">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="py-3">{day}</div>)}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 md:gap-2">
                        {Array.from({ length: startingDayIndex }).map((_, index) => <div key={`empty-${index}`} className="h-10 md:h-12" />)}
                        
                        {daysInMonth.map(day => {
                            const dateKey = day.toISOString().split('T')[0];
                            const dayEvents = eventsByDate.get(dateKey) || [];
                            const isToday = isSameDay(day, new Date());
                            const isSelected = isSameDay(day, selectedDate);
                            
                            return (
                                <div key={day.toString()} className="flex flex-col items-center">
                                    <button 
                                      onClick={() => setSelectedDate(day)}
                                      className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-sm md:text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-sm
                                        ${isSelected ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : isToday ? 'bg-gradient-to-r from-sky-100 to-blue-100 text-sky-800 border-2 border-sky-300' : 'hover:bg-gray-100 text-gray-700'}`}
                                    >
                                        {day.getDate()}
                                    </button>
                                    <div className="flex space-x-1 mt-1 md:mt-2 h-2">
                                        {dayEvents.slice(0, 3).map(event => {
                                            const config = EVENT_TYPE_CONFIG[event.type];
                                            return <div key={event.id} className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${config.bg}`}></div>;
                                        })}
                                        {dayEvents.length > 3 && (
                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-400 flex items-center justify-center text-[6px] md:text-[7px] text-white font-bold">
                                                +{dayEvents.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg p-4 md:p-5 min-h-[140px] md:min-h-[180px] transition-all duration-300 hover:shadow-lg">
                    <h3 className="font-bold text-gray-800 text-base md:text-lg mb-3 md:mb-4 pb-2 border-b border-gray-100">
                        Events on {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                    {selectedDateEvents.length > 0 ? (
                        <ul className="space-y-3 md:space-y-4">
                            {selectedDateEvents.map(event => {
                                const config = EVENT_TYPE_CONFIG[event.type];
                                const Icon = config.icon;
                                return (
                                    <li key={event.id} className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 rounded-lg md:rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-100">
                                        <div className={`mt-1 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center ${config.bg} shadow-sm`}>
                                            <Icon className={`w-6 h-6 ${config.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className={`font-bold text-sm md:text-base ${config.color}`}>{event.title}</p>
                                            {event.description && <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2">{event.description}</p>}
                                            <p className="text-[10px] md:text-xs text-gray-500 mt-1 bg-gray-50 px-1.5 py-0.5 md:px-2 md:py-1 rounded-md md:rounded-lg inline-block">{event.date}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="text-center py-6 md:py-8">
                            <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 md:mb-3">
                                <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <p className="text-gray-500 text-sm md:text-base">No events scheduled for this day.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CalendarScreen;