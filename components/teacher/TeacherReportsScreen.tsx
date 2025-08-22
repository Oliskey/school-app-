import React, { useState, useMemo, useCallback } from 'react';
import { Student, ClassInfo, ReportCard } from '../../types';
import { mockStudents, mockClasses, mockTeachers } from '../../data';
import { ChevronLeftIcon, DocumentTextIcon, EditIcon, PublishIcon, CheckCircleIcon } from '../../constants';

// In a real app, this would be from auth context.
const LOGGED_IN_TEACHER_ID = 2; // Mrs. Funke Akintola

type ReportStatus = 'Published' | 'Draft' | 'Not Started';

const getStudentReportStatus = (student: Student): ReportStatus => {
    if (!student.reportCards || student.reportCards.length === 0) {
        return 'Not Started';
    }
    // A more robust system would check the specific term's report.
    // For this demo, we check if ANY report is unpublished to consider it a "Draft"
    const hasUnpublished = student.reportCards.some(rc => !rc.isPublished && rc.academicRecords.length > 0);
    const hasPublished = student.reportCards.some(rc => rc.isPublished);

    if (hasUnpublished) return 'Draft';
    if(hasPublished) return 'Published';
    return 'Not Started';
};

const StatusBadge: React.FC<{ status: ReportStatus }> = ({ status }) => {
    const styles: { [key in ReportStatus]: string } = {
        'Published': 'bg-green-100 text-green-800',
        'Draft': 'bg-amber-100 text-amber-800',
        'Not Started': 'bg-gray-100 text-gray-800',
    };
    return <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${styles[status]}`}>{status}</span>;
};


interface TeacherReportsScreenProps {
  navigateTo: (view: string, title: string, props: any) => void;
  handleBack: () => void;
}

const TeacherReportsScreen: React.FC<TeacherReportsScreenProps> = ({ navigateTo, handleBack }) => {
    const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
    const [studentsData, setStudentsData] = useState<Student[]>(mockStudents);
    const [publishSuccessId, setPublishSuccessId] = useState<number | null>(null);

    const teacher = useMemo(() => mockTeachers.find(t => t.id === LOGGED_IN_TEACHER_ID)!, []);
    const teacherClasses = useMemo(() => mockClasses.filter(c => teacher.classes.includes(`${c.grade}${c.section}`)), [teacher]);

    const studentsInClass = useMemo(() => {
        if (!selectedClass) return [];
        return studentsData.filter(s => s.grade === selectedClass.grade && s.section === selectedClass.section);
    }, [selectedClass, studentsData]);

    const handlePublish = useCallback((studentId: number) => {
        setStudentsData(prevStudents => {
            const newStudents = prevStudents.map(s => {
                if (s.id === studentId) {
                    const updatedReportCards = s.reportCards?.map(rc => ({ ...rc, isPublished: true }));
                    return { ...s, reportCards: updatedReportCards };
                }
                return s;
            });
            
            // Also update the global mock data for consistency
            const studentIndex = mockStudents.findIndex(s => s.id === studentId);
            if (studentIndex !== -1 && mockStudents[studentIndex].reportCards) {
                mockStudents[studentIndex].reportCards!.forEach(rc => rc.isPublished = true);
            }

            return newStudents;
        });
        
        setPublishSuccessId(studentId);
        setTimeout(() => setPublishSuccessId(null), 3000);
    }, []);

    const handlePublishAllDrafts = () => {
        if (!selectedClass) return;
        
        const draftStudentsInClass = studentsInClass.filter(s => getStudentReportStatus(s) === 'Draft');

        if (draftStudentsInClass.length === 0) {
            alert("No draft reports to publish for this class.");
            return;
        }

        if (window.confirm(`Are you sure you want to publish all ${draftStudentsInClass.length} draft reports for Grade ${selectedClass.grade}${selectedClass.section}?`)) {
            const studentIdsToPublish = new Set(draftStudentsInClass.map(s => s.id));

            const updateGlobalMock = (studentId: number) => {
                 const studentIndex = mockStudents.findIndex(s => s.id === studentId);
                 if (studentIndex !== -1 && mockStudents[studentIndex].reportCards) {
                    mockStudents[studentIndex].reportCards!.forEach(rc => {
                        if (!rc.isPublished) rc.isPublished = true;
                    });
                 }
            };

            setStudentsData(prevStudents => {
                const newStudents = prevStudents.map(s => {
                    if (studentIdsToPublish.has(s.id)) {
                        updateGlobalMock(s.id);
                        const updatedReportCards = s.reportCards?.map(rc => ({ ...rc, isPublished: true }));
                        return { ...s, reportCards: updatedReportCards };
                    }
                    return s;
                });
                return newStudents;
            });
            alert("All draft reports have been published.");
        }
    };
    
    const hasDrafts = useMemo(() => studentsInClass.some(s => getStudentReportStatus(s) === 'Draft'), [studentsInClass]);


    if (!selectedClass) {
        return (
            <div className="p-4 space-y-4">
                <h3 className="text-xl font-bold text-gray-800">Select a Class</h3>
                <div className="grid grid-cols-2 gap-4">
                    {teacherClasses.map(cls => (
                        <button key={cls.id} onClick={() => setSelectedClass(cls)} className="p-6 bg-white rounded-xl shadow-sm text-center hover:bg-purple-50 transition-colors">
                            <p className="font-bold text-2xl text-purple-700">Grade {cls.grade}{cls.section}</p>
                            <p className="text-sm text-gray-500">{cls.studentCount} Students</p>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <header className="p-4 bg-white border-b border-gray-200">
                <button onClick={() => setSelectedClass(null)} className="flex items-center space-x-1 text-sm font-semibold text-purple-600 hover:text-purple-800">
                    <ChevronLeftIcon className="w-5 h-5" />
                    <span>All Classes</span>
                </button>
                 <div className="flex justify-between items-center mt-1">
                    <h2 className="text-xl font-bold text-gray-800">Grade {selectedClass.grade}{selectedClass.section} Reports</h2>
                    {hasDrafts && (
                        <button onClick={handlePublishAllDrafts} className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 shadow-sm">
                            <PublishIcon className="w-4 h-4" />
                            <span>Publish All</span>
                        </button>
                    )}
                </div>
            </header>
            <main className="flex-grow p-4 space-y-3 overflow-y-auto">
                {studentsInClass.map(student => {
                    const status = getStudentReportStatus(student);
                    return (
                        <div key={student.id} className="bg-white rounded-xl shadow-sm p-3">
                            <div className="flex items-center space-x-3">
                                <img src={student.avatarUrl} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
                                <div className="flex-grow">
                                    <p className="font-bold text-gray-800">{student.name}</p>
                                    <StatusBadge status={status} />
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end items-center space-x-2">
                                {publishSuccessId === student.id ? (
                                    <div className="flex items-center space-x-2 text-green-600 font-semibold transition-opacity duration-300">
                                        <CheckCircleIcon className="w-5 h-5" />
                                        <span>Published Successfully!</span>
                                    </div>
                                ) : (
                                    <>
                                        <button onClick={() => navigateTo('selectTermForReport', `Select Term for ${student.name}`, { student })} className="px-3 py-1.5 text-xs font-semibold rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 flex items-center space-x-1">
                                            <EditIcon className="w-4 h-4" />
                                            <span>{status === 'Not Started' ? 'Create' : 'Edit'}</span>
                                        </button>
                                        <button disabled={status === 'Not Started'} onClick={() => navigateTo('reportCardPreview', `Preview: ${student.name}`, { 
                                            student,
                                            onPublish: () => {
                                                handlePublish(student.id);
                                                handleBack();
                                            }
                                        })} className="px-3 py-1.5 text-xs font-semibold rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1">
                                            <DocumentTextIcon className="w-4 h-4"/>
                                            <span>Preview</span>
                                        </button>
                                        <button disabled={status !== 'Draft'} onClick={() => handlePublish(student.id)} className="px-3 py-1.5 text-xs font-semibold rounded-md text-green-700 bg-green-100 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1">
                                            <PublishIcon className="w-4 h-4" />
                                            <span>Publish</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </main>
        </div>
    );
};

export default TeacherReportsScreen;
