import React, { useState, useMemo, useCallback } from 'react';
import { SearchIcon, CheckCircleIcon, ClockIcon } from '../../constants';
import { mockStudents as allStudents } from '../../data';
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
  
  if (showPreview && selectedStudent) {
    return <ReportCardPreview student={selectedStudent} onClose={() => setShowPreview(false)} />;
  }

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="p-4 space-y-4 bg-gray-100 border-b border-gray-200">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="text-gray-400" />
          </span>
          <input type="text" placeholder="Search student..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" />
        </div>
        <div className="flex justify-between items-center">
            <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
                {(['All', 'Published', 'Not Published'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
                      activeTab === tab ? 'bg-white text-sky-600 shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                    }`}>
                    {tab}
                  </button>
                ))}
            </div>
             <button onClick={handlePublishAll} className="px-3 py-2 text-sm font-semibold text-white bg-sky-500 rounded-lg shadow-sm hover:bg-sky-600">
                Publish All
             </button>
        </div>
      </div>

      <main className="flex-grow p-4 space-y-3 overflow-y-auto">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => (
            <div key={student.id} className="bg-white rounded-xl shadow-sm p-3 flex items-center space-x-3">
              <img src={student.avatarUrl} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-grow">
                <p className="font-bold text-gray-800">{student.name}</p>
                <div className="flex items-center space-x-2 text-sm">
                    <p className="text-gray-500">Grade {student.grade}{student.section}</p>
                    {student.isPublished 
                        ? <span className="flex items-center text-green-600"><CheckCircleIcon className="w-4 h-4 mr-1"/> Published</span> 
                        : <span className="flex items-center text-gray-500"><ClockIcon className="w-4 h-4 mr-1"/> Not Published</span>
                    }
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => handlePreview(student)} className="px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-100 rounded-full hover:bg-sky-200">Preview</button>
                {!student.isPublished && (
                  <button onClick={() => handlePublish(student.id)} className="px-3 py-1.5 text-xs font-semibold text-white bg-green-500 rounded-full hover:bg-green-600">Publish</button>
                )}
              </div>
            </div>
          ))
        ) : (
             <div className="text-center py-10">
                <p className="text-gray-500">No students found for this filter.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default ReportCardPublishing;