import React, { useState, useMemo, useCallback } from 'react';
import { SearchIcon, CheckCircleIcon, ClockIcon, DocumentTextIcon } from '../../constants';
import { mockStudents as allStudents, mockTeachers } from '../../data';
import ReportCardPreview from './ReportCardPreview';
import { StudentReportInfo } from '../../types';

const mockStudentReports: StudentReportInfo[] = allStudents.map((student, index) => ({
  ...student,
  isPublished: index % 3 === 0, // Some are published, some are not
}));

const ReportCardPublishing: React.FC = () => {
  const [students, setStudents] = useState<StudentReportInfo[]>(mockStudentReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Published' | 'Not Published'>('All');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentReportInfo | null>(null);

  const handlePublish = useCallback((studentId: number) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, isPublished: true } : s));
  }, []);

  const handlePublishAll = () => {
    if (window.confirm('Are you sure you want to publish all visible report cards?')) {
      const filteredIds = new Set(filteredStudents.map(s => s.id));
      setStudents(prev => prev.map(s => filteredIds.has(s.id) ? { ...s, isPublished: true } : s));
    }
  };

  const handlePreview = (student: StudentReportInfo) => {
    setSelectedStudent(student);
    setShowPreview(true);
  };

  const filteredStudents = useMemo(() =>
    students
      .filter(student => activeTab === 'All' || (activeTab === 'Published' && student.isPublished) || (activeTab === 'Not Published' && !student.isPublished))
      .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [students, activeTab, searchTerm]
  );
  
  const publishedCount = useMemo(() => students.filter(s => s.isPublished).length, [students]);
  const notPublishedCount = useMemo(() => students.filter(s => !s.isPublished).length, [students]);
  
  // Function to get the teacher who input the report card
  const getTeacherForStudent = (student: StudentReportInfo) => {
    // Find the first behavior note with a teacher name
    if (student.behaviorNotes && student.behaviorNotes.length > 0) {
      return student.behaviorNotes[0].by;
    }
    
    // If no behavior notes, try to find a teacher based on the student's grade and section
    const gradeSection = `${student.grade}${student.section}`;
    const teacher = mockTeachers.find(t => t.classes.includes(gradeSection) || t.classes.includes('All'));
    
    return teacher ? teacher.name : 'Unknown Teacher';
  };
  
  if (showPreview && selectedStudent) {
    return <ReportCardPreview student={selectedStudent} onClose={() => setShowPreview(false)} />;
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex items-center mb-1">
          <DocumentTextIcon className="h-5 w-5 mr-2" />
          <h1 className="text-lg font-bold">Publish Report Cards</h1>
        </div>
        
        <p className="text-indigo-100 text-xs">
          Review and publish student report cards. Published reports will be visible to parents and students.
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-2 px-3 py-2 bg-white border-b border-gray-200">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-md p-2 text-center border border-indigo-100">
          <p className="text-base font-bold text-indigo-700">{students.length}</p>
          <p className="text-[0.6rem] text-indigo-600">Total Students</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-md p-2 text-center border border-green-100">
          <p className="text-base font-bold text-green-700">{publishedCount}</p>
          <p className="text-[0.6rem] text-green-600">Published</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-md p-2 text-center border border-amber-100">
          <p className="text-base font-bold text-amber-700">{notPublishedCount}</p>
          <p className="text-[0.6rem] text-amber-600">Pending</p>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="px-3 py-2 space-y-3 bg-gray-50 border-b border-gray-200">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <SearchIcon className="text-gray-400 h-4 w-4" />
          </span>
          <input 
            type="text" 
            placeholder="Search student..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-7 pr-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm" 
          />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex space-x-0.5 bg-gray-200 p-0.5 rounded-md">
            {(['All', 'Published', 'Not Published'] as const).map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  activeTab === tab 
                    ? 'bg-white text-indigo-600 shadow-xs' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab} {tab === 'All' ? `(${students.length})` : tab === 'Published' ? `(${publishedCount})` : `(${notPublishedCount})`}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handlePublishAll} 
            disabled={filteredStudents.filter(s => !s.isPublished).length === 0}
            className={`px-2.5 py-1 text-xs font-medium text-white rounded-md shadow-xs transition-all ${
              filteredStudents.filter(s => !s.isPublished).length === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
            }`}
          >
            Publish All
          </button>
        </div>
      </div>

      {/* Student List */}
      <main className="flex-grow px-3 py-2 space-y-2 overflow-y-auto">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => {
            const teacherName = getTeacherForStudent(student);
            const classInfo = `Grade ${student.grade}${student.section}`;
            
            return (
              <div key={student.id} className="bg-white rounded-lg shadow-xs p-4 flex items-start space-x-3 hover:shadow-sm transition-all border border-gray-100 group">
                <div className="flex-shrink-0">
                  <img 
                    src={student.avatarUrl} 
                    alt={student.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 group-hover:border-indigo-300 transition-colors" 
                  />
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {classInfo}
                        </span>
                        <h3 className="font-semibold text-gray-800 text-sm truncate">
                          {student.name}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <div className="flex items-center text-xs text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="truncate">{teacherName}</span>
                        </div>
                        
                        {student.isPublished ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircleIcon className="w-3 h-3 mr-1" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            <ClockIcon className="w-3 h-3 mr-1" /> Not Published
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 flex-shrink-0">
                      <button 
                        onClick={() => handlePreview(student)} 
                        className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview
                      </button>
                      
                      {!student.isPublished && (
                        <button 
                          onClick={() => handlePublish(student.id)} 
                          className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-md hover:from-green-700 hover:to-emerald-700 transition-all shadow-xs flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Publish
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow-xs">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <DocumentTextIcon className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">No students found</h3>
            <p className="text-xs text-gray-500 px-4">
              {searchTerm 
                ? `No students match your search for "${searchTerm}".` 
                : activeTab === 'Published' 
                  ? "No report cards have been published yet." 
                  : activeTab === 'Not Published' 
                    ? "All report cards are already published." 
                    : "There are no students in the system."
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReportCardPublishing;