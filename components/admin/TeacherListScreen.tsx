import React, { useState, useMemo } from 'react';
import { 
  SearchIcon,
  MailIcon,
  PhoneIcon,
  SUBJECT_COLORS
} from '../../constants';
import { Teacher } from '../../types';
import { mockTeachers } from '../../data';

interface TeacherListScreenProps {
  navigateTo: (view: string, title: string, props?: any) => void;
}

const TeacherCard: React.FC<{ teacher: Teacher, onSelect: (teacher: Teacher) => void }> = ({ teacher, onSelect }) => {
    return (
        <button 
            onClick={() => onSelect(teacher)}
            className="w-full bg-white rounded-xl shadow-sm p-4 flex flex-col space-y-3 text-left hover:shadow-md hover:ring-2 hover:ring-sky-200 transition-all duration-200"
            aria-label={`View details for ${teacher.name}`}
        >
            <div className="flex items-center space-x-4">
                <img src={teacher.avatarUrl} alt={teacher.name} className="w-16 h-16 rounded-full object-cover" />
                <div className="flex-grow">
                    <p className="font-bold text-lg text-gray-800">{teacher.name}</p>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${SUBJECT_COLORS[teacher.subject] || 'bg-gray-100 text-gray-800'}`}>
                        {teacher.subject}
                    </span>
                </div>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                <div>
                    <p className="text-sm font-medium text-gray-700">Classes: {teacher.classes.join(', ')}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <a href={`mailto:${teacher.email}`} onClick={(e) => e.stopPropagation()} className="p-2 bg-gray-100 rounded-full hover:bg-sky-100" aria-label={`Email ${teacher.name}`}>
                        <MailIcon className="h-5 w-5 text-gray-500" />
                    </a>
                    <a href={`tel:${teacher.phone}`} onClick={(e) => e.stopPropagation()} className="p-2 bg-gray-100 rounded-full hover:bg-green-100" aria-label={`Call ${teacher.name}`}>
                        <PhoneIcon className="h-5 w-5 text-gray-500" />
                    </a>
                </div>
            </div>
        </button>
    );
};

const TeacherListScreen: React.FC<TeacherListScreenProps> = ({ navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeachers = useMemo(() => 
    mockTeachers.filter(teacher =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const handleSelectTeacher = (teacher: Teacher) => {
    navigateTo('teacherDetailAdminView', teacher.name, { teacher });
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Search Bar */}
      <div className="p-4 bg-gray-100 z-10">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
            aria-label="Search for a teacher"
          />
        </div>
      </div>

      {/* Teacher List */}
      <main className="flex-grow px-4 pb-4 space-y-3 overflow-y-auto">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map(teacher => (
            <TeacherCard key={teacher.id} teacher={teacher} onSelect={handleSelectTeacher} />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No teachers found.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherListScreen;
