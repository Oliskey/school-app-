
import React, { useState, useMemo, useCallback } from 'react';
import { SearchIcon, CheckCircleIcon, ClockIcon, PublishIcon } from '../../constants';
import { mockStudents as allStudents } from '../../data';
import ReportCardPreview from './ReportCardPreview';
import { StudentReportInfo, ReportCard, Student } from '../../types';

const statusStyles: { [key in ReportCard['status']]: { bg: string, text: string, icon: React.ReactNode } } = {
  Published: { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircleIcon className="w-4 h-4 mr-1"/> },
  Submitted: { bg: 'bg-sky-100', text: 'text-sky-800', icon: <PublishIcon className="w-4 h-4 mr-1"/> },
  Draft: { bg: 'bg-gray-100', text: 'text-gray-800', icon: <ClockIcon className="w-4 h-4 mr-1"/> },
};


const ReportCardPublishing: React.FC = () => {
  const [studentsWithReports, setStudentsWithReports] = useState<StudentReportInfo[]>(() => {
    return allStudents.map(student => {
        const latestReport = [...(student.reportCards || [])].sort((a, b) => {
            if (a.session !== b.session) return b.session.localeCompare(a.session);
            const termOrder = { "Third Term": 3, "Second Term": 2, "First Term": 1 };
            return (termOrder[b.term as keyof typeof termOrder] || 0) - (termOrder[a.term as keyof typeof termOrder] || 0);
        })[0];
        
        return {
            ...student,
            status: latestReport?.status || 'Draft',
        };
    });
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<ReportCard['status'] | 'All'>('Submitted');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentReportInfo | null>(null);

  const updateStudentStatus = (studentId: number, newStatus: ReportCard['status']) => {
      // Update local component state
      setStudentsWithReports(prev => prev.map(s => s.id === studentId ? { ...s, status: newStatus } : s));

      // Update "global" mock data to persist changes
      const studentIndex = allStudents.findIndex(s => s.id === studentId);
      if (studentIndex > -1) {
          const latestReport = allStudents[studentIndex].reportCards?.[0]; // Assuming latest is first
          if (latestReport) {
              latestReport.status = newStatus;
          }
      }
  };

  const handlePublish = useCallback((studentId: number) => updateStudentStatus(studentId, 'Published'), []);
  const handleRevert = useCallback((studentId: number) => updateStudentStatus(studentId, 'Draft'), []);
  const handleUnpublish = useCallback((studentId: number) => updateStudentStatus(studentId, 'Submitted'), []);

  const handlePublishAll = () => {
    if (window.confirm('Are you sure you want to publish all submitted report cards?')) {
        studentsWithReports.forEach(s => {
            if (s.status === 'Submitted') {
                handlePublish(s.id);
            }
        });
    }
  };

  const handlePreview = (student: Student) => {
    setSelectedStudent(student as StudentReportInfo);
    setShowPreview(true);
  };

  const filteredStudents = useMemo(() =>
    studentsWithReports
      .filter(student => activeTab === 'All' || student.status === activeTab)
      .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [studentsWithReports, activeTab, searchTerm]
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
                {(['Submitted', 'Published', 'Drafts', 'All'] as const).map(tab => {
                    const mappedTab = tab === 'Drafts' ? 'Draft' : tab;
                    return (
                        <button key={tab} onClick={() => setActiveTab(mappedTab)}
                            className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${ activeTab === mappedTab ? 'bg-white text-sky-600 shadow-sm' : 'text-gray-600 hover:bg-gray-50' }`}>
                            {tab}
                        </button>
                    )
                })}
            </div>
             <button onClick={handlePublishAll} className="px-3 py-2 text-sm font-semibold text-white bg-sky-500 rounded-lg shadow-sm hover:bg-sky-600">
                Publish All Submitted
             </button>
        </div>
      </div>

      <main className="flex-grow p-4 space-y-3 overflow-y-auto">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => (
            <div key={student.id} className="bg-white rounded-xl shadow-sm p-3 flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                    <img src={student.avatarUrl} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-grow">
                        <p className="font-bold text-gray-800">{student.name}</p>
                        <div className="flex items-center space-x-2 text-sm">
                            <p className="text-gray-500">Grade {student.grade}{student.section}</p>
                            <span className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyles[student.status].bg} ${statusStyles[student.status].text}`}>
                                {statusStyles[student.status].icon}
                                {student.status}
                            </span>
                        </div>
                    </div>
                </div>
                 <div className="flex justify-end items-center space-x-2 border-t pt-2">
                    <button onClick={() => handlePreview(student)} className="px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-100 rounded-full hover:bg-sky-200">Preview</button>
                    {student.status === 'Submitted' && <>
                        <button onClick={() => handleRevert(student.id)} className="px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full hover:bg-amber-200">Revert</button>
                        <button onClick={() => handlePublish(student.id)} className="px-3 py-1.5 text-xs font-semibold text-white bg-green-500 rounded-full hover:bg-green-600">Publish</button>
                    </>}
                     {student.status === 'Published' && <>
                        <button onClick={() => handleUnpublish(student.id)} className="px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full hover:bg-amber-200">Unpublish</button>
                    </>}
                </div>
            </div>
          ))
        ) : (
             <div className="text-center py-10">
                <p className="text-gray-500">No report cards match this filter.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default ReportCardPublishing;
