
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
        <div className="flex flex-col h-full bg-gray-100">
            <main className="flex-grow p-4 space-y-4 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-100" aria-label="Previous month">
                            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        <h3 className="font-bold text-lg text-gray-800">
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h3>
                        <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-100" aria-label="Next month">
                            <ChevronRightIcon />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day}>{day}</div>)}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: startingDayIndex }).map((_, index) => <div key={`empty-${index}`} />)}
                        
                        {daysInMonth.map(day => {
                            const dateKey = day.toISOString().split('T')[0];
                            const dayEvents = eventsByDate.get(dateKey) || [];
                            const isToday = isSameDay(day, new Date());
                            const isSelected = isSameDay(day, selectedDate);
                            
                            return (
                                <div key={day.toString()} className="flex flex-col items-center">
                                    <button 
                                      onClick={() => setSelectedDate(day)}
                                      className={`w-9 h-9 flex items-center justify-center rounded-full text-sm transition-colors duration-150
                                        ${isSelected ? 'bg-sky-500 text-white font-bold' : isToday ? 'bg-sky-100 text-sky-800' : 'hover:bg-gray-100 text-gray-700'}`}
                                    >
                                        {day.getDate()}
                                    </button>
                                    <div className="flex space-x-0.5 mt-1 h-2">
                                        {dayEvents.slice(0, 3).map(event => {
                                            const config = EVENT_TYPE_CONFIG[event.type];
                                            return <div key={event.id} className={`w-1.5 h-1.5 rounded-full ${config.bg}`}></div>;
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4 min-h-[150px]">
                    <h3 className="font-bold text-gray-800 mb-3">
                        Events on {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                    {selectedDateEvents.length > 0 ? (
                        <ul className="space-y-3">
                            {selectedDateEvents.map(event => {
                                const config = EVENT_TYPE_CONFIG[event.type];
                                const Icon = config.icon;
                                return (
                                    <li key={event.id} className="flex items-start space-x-3">
                                        <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${config.bg}`}>
                                            <Icon className={`w-5 h-5 ${config.color}`} />
                                        </div>
                                        <div>
                                            <p className={`font-semibold ${config.color}`}>{event.title}</p>
                                            {event.description && <p className="text-sm text-gray-600">{event.description}</p>}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-4">No events scheduled for this day.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CalendarScreen;