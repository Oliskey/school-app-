import React, { useState } from 'react';
import { XCircleIcon } from '../../constants';
import { SUBJECTS_LIST, SUBJECT_COLORS } from '../../constants';

const DraggableSubject: React.FC<{ subjectName: string }> = ({ subjectName }) => {
    const colorClass = SUBJECT_COLORS[subjectName] || 'bg-gray-200 text-gray-800';
    return (
        <div
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('subjectName', subjectName);
            }}
            className={`p-2 rounded-lg cursor-grab text-sm font-semibold text-center ${colorClass} shadow-sm hover:shadow-md transition-shadow`}
            aria-label={`Drag ${subjectName} subject`}
        >
            {subjectName}
        </div>
    );
};

const TimetableCell: React.FC<{ subject: string | null, onDrop: (e: React.DragEvent<HTMLDivElement>) => void, onClear: () => void }> = ({ subject, onDrop, onClear }) => {
    const [isHovering, setIsHovering] = useState(false);
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('bg-sky-100', 'border-dashed');
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('bg-sky-100', 'border-dashed');
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        handleDragLeave(e);
        onDrop(e);
    }

    const colorClass = subject ? SUBJECT_COLORS[subject] : 'bg-white';
    
    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`h-20 border border-gray-200 rounded-lg flex items-center justify-center text-center p-1 relative transition-colors duration-150 ${subject ? colorClass : 'bg-gray-50'}`}
        >
            {subject ? (
                <>
                    <span className="font-bold text-sm">{subject}</span>
                    {isHovering && (
                         <button 
                            onClick={onClear} 
                            className="absolute top-1 right-1 text-gray-500 hover:text-red-500 transition-colors"
                            aria-label={`Clear ${subject} from this slot`}
                         >
                            <XCircleIcon className="w-4 h-4" />
                        </button>
                    )}
                </>
            ) : <div className="w-full h-full border-2 border-transparent rounded-lg"></div>}
        </div>
    );
};

const TimetableEditor: React.FC = () => {
    const [timetable, setTimetable] = useState<{ [key: string]: string | null }>({});
    const [selectedClass, setSelectedClass] = useState('Grade 9A');

    const handleDrop = (day: string, period: number, subjectName: string) => {
        if (subjectName) {
            const key = `${day}-${period}`;
            setTimetable(prev => ({ ...prev, [key]: subjectName }));
        }
    };

    const clearCell = (day: string, period: number) => {
        const key = `${day}-${period}`;
        setTimetable(prev => {
            const newTimetable = {...prev};
            delete newTimetable[key];
            return newTimetable;
        });
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = [
        '09:00 - 09:45', '09:45 - 10:30', '10:45 - 11:30', '11:30 - 12:15',
        '01:00 - 01:45', '01:45 - 02:30', '02:30 - 03:15', '03:15 - 04:00'
    ];

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <div className="p-4 bg-gray-100 border-b border-gray-200">
                 <select 
                    value={selectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm font-semibold focus:ring-sky-500 focus:border-sky-500"
                >
                    <option>Grade 9A</option>
                    <option>Grade 9B</option>
                    <option>Grade 10A</option>
                    <option>Grade 10B</option>
                    <option>Grade 11A</option>
                    <option>Grade 12A</option>
                </select>
            </div>

            <div className="flex-grow flex overflow-hidden">
                {/* Subjects Sidebar */}
                <aside className="w-1/3 p-4 bg-white border-r border-gray-200 overflow-y-auto">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Subjects</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {SUBJECTS_LIST.map(subject => (
                            <DraggableSubject key={subject.id} subjectName={subject.name} />
                        ))}
                    </div>
                </aside>

                {/* Timetable Grid */}
                <main className="w-2/3 flex-grow p-2 sm:p-4 overflow-auto">
                    <div className="grid gap-1" style={{ gridTemplateColumns: `40px repeat(${days.length}, 1fr)`}}>
                        {/* Empty corner */}
                        <div></div>
                        {/* Day Headers */}
                        {days.map(day => <div key={day} className="text-center font-bold text-gray-600 text-[10px] sm:text-sm py-2">{day.substring(0,3)}</div>)}
                        
                        {/* Time slots and cells */}
                        {timeSlots.map((time, periodIndex) => (
                            <React.Fragment key={time}>
                                <div className="text-center font-bold text-gray-600 text-[9px] leading-tight py-2 flex items-center justify-center">{time.split('-')[0]}</div>
                                {days.map(day => (
                                    <TimetableCell
                                        key={`${day}-${periodIndex}`}
                                        subject={timetable[`${day}-${periodIndex+1}`] || null}
                                        onDrop={(e) => handleDrop(day, periodIndex + 1, e.dataTransfer.getData('subjectName'))}
                                        onClear={() => clearCell(day, periodIndex + 1)}
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </main>
            </div>
             {/* Action Button */}
             <div className="p-4 bg-white border-t border-gray-200">
                <button
                    onClick={() => alert(`Timetable for ${selectedClass} saved!`)}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    Save Timetable
                </button>
            </div>
        </div>
    );
};

export default TimetableEditor;