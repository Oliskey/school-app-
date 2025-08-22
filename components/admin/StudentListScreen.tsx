
import React, { useState, useMemo } from 'react';
import { 
  SearchIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  PlusIcon,
  gradeColors,
  ClockIcon,
  ChevronRightIcon
} from '../../constants';
import { Student, AttendanceStatus } from '../../types';
import { mockStudents } from '../../data';

const AttendanceStatusIndicator: React.FC<{ status: AttendanceStatus }> = ({ status }) => {
  switch (status) {
    case 'Present':
      return <CheckCircleIcon className="text-green-500" />;
    case 'Absent':
      return <XCircleIcon className="text-red-500" />;
    case 'Leave':
      return <ExclamationCircleIcon className="text-orange-500" />;
    case 'Late':
      return <ClockIcon className="text-blue-500" />;
    default:
      return null;
  }
};

const AccordionSection: React.FC<{ title: string; count: number; children: React.ReactNode, defaultOpen?: boolean }> = ({ title, count, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left"
                aria-expanded={isOpen}
            >
                <h3 className="font-bold text-lg text-gray-800">{title}</h3>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full">{count} Students</span>
                    <ChevronRightIcon className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                </div>
            </button>
            {isOpen && (
                <div className="px-4 pb-4 pt-0">
                    {children}
                </div>
            )}
        </div>
    );
};

interface StudentListScreenProps {
  filter?: { grade: number; section: string; };
  navigateTo: (view: string, props: any, title: string) => void;
}

const StudentListScreen: React.FC<StudentListScreenProps> = ({ filter, navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleStudentSelect = (student: Student) => {
    navigateTo('studentDetailReport', { student }, `${student.name}'s Report`);
  };

  const StudentRow: React.FC<{ student: Student }> = ({ student }) => (
    <button
      key={student.id}
      onClick={() => handleStudentSelect(student)}
      className="w-full text-left bg-gray-50 rounded-xl p-3 flex items-center space-x-4 transition-all hover:bg-gray-100"
      aria-label={`View report for ${student.name}`}
    >
      <img src={student.avatarUrl} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
      <div className="flex-grow">
        <p className="font-bold text-gray-800">{student.name}</p>
        <p className="text-sm text-gray-700">Class: {student.grade}{student.section}</p>
      </div>
      <div className="flex items-center space-x-3">
        <AttendanceStatusIndicator status={student.attendanceStatus} />
      </div>
    </button>
  );

  const studentsByStage = useMemo(() => {
    const stages = {
      primary: [] as Student[],
      junior: [] as Student[],
      senior: [] as Student[],
    };
    const allStudents = mockStudents.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()));
    allStudents.forEach(student => {
      if (student.grade >= 1 && student.grade <= 6) stages.primary.push(student);
      else if (student.grade >= 7 && student.grade <= 9) stages.junior.push(student);
      else if (student.grade >= 10 && student.grade <= 12) stages.senior.push(student);
    });
    stages.primary.sort((a, b) => a.grade - b.grade || a.name.localeCompare(b.name));
    stages.junior.sort((a, b) => a.grade - b.grade || a.name.localeCompare(b.name));
    stages.senior.sort((a, b) => a.grade - b.grade || a.name.localeCompare(b.name));
    return stages;
  }, [searchTerm]);

  if (filter) {
    const filteredStudents = mockStudents.filter(student =>
      (student.grade === filter.grade && student.section === filter.section) &&
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
      <div className="flex flex-col h-full bg-gray-100 relative">
        <div className="p-4 bg-gray-100 z-10"><div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><SearchIcon className="text-gray-600" /></span><input type="text" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" aria-label="Search for a student" /></div></div>
        <main className="flex-grow px-4 pb-24 space-y-3 overflow-y-auto">
          {filteredStudents.map(student => (
            <button 
              key={student.id} 
              onClick={() => handleStudentSelect(student)}
              className="w-full text-left bg-white rounded-xl shadow-sm p-3 flex items-center space-x-4 transition-all hover:shadow-md hover:ring-2 hover:ring-sky-200"
              aria-label={`View report for ${student.name}`}
            >
              <img src={student.avatarUrl} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-grow">
                <p className="font-bold text-gray-800">{student.name}</p>
                <p className="text-sm text-gray-700">Class: {student.grade}{student.section}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${gradeColors[student.grade] || 'bg-gray-100 text-gray-800'}`}>
                  Grade {student.grade}
                </span>
                <AttendanceStatusIndicator status={student.attendanceStatus} />
              </div>
            </button>
          ))}
        </main>
        <div className="absolute bottom-6 right-6"><button onClick={() => navigateTo('addStudent', {}, 'Add New Student')} className="bg-sky-500 text-white p-4 rounded-full shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" aria-label="Add new student"><PlusIcon className="h-6 w-6" /></button></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 relative">
      <div className="p-4 bg-gray-100 z-10">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="text-gray-600" />
          </span>
          <input type="text" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" aria-label="Search for a student" />
        </div>
      </div>

      <main className="flex-grow px-4 pb-24 space-y-4 overflow-y-auto">
        <AccordionSection title="Senior Secondary" count={studentsByStage.senior.length} defaultOpen>
          <div className="space-y-2">{studentsByStage.senior.length > 0 ? studentsByStage.senior.map(s => <StudentRow key={s.id} student={s} />) : <p className="text-center text-gray-700 py-4">No students found.</p>}</div>
        </AccordionSection>
        <AccordionSection title="Junior Secondary" count={studentsByStage.junior.length}>
          <div className="space-y-2">{studentsByStage.junior.length > 0 ? studentsByStage.junior.map(s => <StudentRow key={s.id} student={s} />) : <p className="text-center text-gray-700 py-4">No students found.</p>}</div>
        </AccordionSection>
        <AccordionSection title="Primary School" count={studentsByStage.primary.length}>
          <div className="space-y-2">{studentsByStage.primary.length > 0 ? studentsByStage.primary.map(s => <StudentRow key={s.id} student={s} />) : <p className="text-center text-gray-700 py-4">No students found.</p>}</div>
        </AccordionSection>
      </main>
      
      <div className="absolute bottom-6 right-6">
        <button onClick={() => navigateTo('addStudent', {}, 'Add New Student')} className="bg-sky-500 text-white p-4 rounded-full shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" aria-label="Add new student"><PlusIcon className="h-6 w-6" /></button>
      </div>
    </div>
  );
};

export default StudentListScreen;