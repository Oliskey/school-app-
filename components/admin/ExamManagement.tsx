import React, { useState, useMemo } from 'react';
import { PlusIcon, EditIcon, TrashIcon, PublishIcon, EXAM_TYPE_COLORS } from '../../constants';
import { Exam } from '../../types';
import { mockExamsData, mockTeachers } from '../../data';

const ExamManagement: React.FC<{ navigateTo: (view: string, title: string, props?: any) => void; }> = ({ navigateTo }) => {
    const [exams, setExams] = useState<Exam[]>(mockExamsData);
    const [selectedTeacherId, setSelectedTeacherId] = useState<string>('all');

    const filteredExams = useMemo(() => {
        if (selectedTeacherId === 'all') {
            return exams;
        }
        return exams.filter(exam => exam.teacherId === parseInt(selectedTeacherId, 10));
    }, [exams, selectedTeacherId]);

    const handleEdit = (exam: Exam) => {
        const onSave = (examData: Omit<Exam, 'id' | 'isPublished' | 'teacherId'>) => {
            setExams(prev => prev.map(e => e.id === exam.id ? { ...exam, ...examData } : e));
        };
        navigateTo('addExam', 'Edit Exam', { onSave, examToEdit: exam });
    };

    const handleDelete = (examId: number) => {
        if (window.confirm('Are you sure you want to delete this exam?')) {
            setExams(prev => prev.filter(e => e.id !== examId));
        }
    };
    
    const handlePublish = (examId: number) => {
        setExams(prev => prev.map(e => e.id === examId ? { ...e, isPublished: true } : e));
    };

    const handleAddNew = () => {
         const onSave = (examData: Omit<Exam, 'id' | 'isPublished' | 'teacherId'>) => {
            const newId = Math.max(0, ...exams.map(e => e.id)) + 1;
            setExams(prev => [...prev, { id: newId, ...examData, isPublished: false, teacherId: parseInt(selectedTeacherId, 10) || undefined }]);
        };
        navigateTo('addExam', 'Add New Exam', { onSave });
    };

    return (
        <div className="flex flex-col h-full bg-gray-100 relative">
            <div className="p-4 bg-gray-100/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200">
                <label htmlFor="teacher-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Teacher</label>
                <select
                    id="teacher-filter"
                    value={selectedTeacherId}
                    onChange={e => setSelectedTeacherId(e.target.value)}
                    className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                >
                    <option value="all">All Teachers</option>
                    {mockTeachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id.toString()}>{teacher.name}</option>
                    ))}
                </select>
            </div>

            <main className="flex-grow p-4 space-y-3 overflow-y-auto pb-20">
                {/* For larger screens: Table view */}
                <div className="hidden sm:block bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredExams.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(exam => (
                                <tr key={exam.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${EXAM_TYPE_COLORS[exam.type] || 'bg-gray-100 text-gray-800 border-gray-300'}`}>
                                            {exam.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(exam.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'})}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{exam.className}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{exam.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {exam.isPublished
                                            ? <span className="text-green-600">Published</span>
                                            : <span className="text-amber-600">Pending</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        {!exam.isPublished && <button onClick={() => handlePublish(exam.id)} className="text-sky-600 hover:text-sky-900" aria-label="Publish exam"><PublishIcon className="w-5 h-5"/></button>}
                                        <button onClick={() => handleEdit(exam)} className="text-indigo-600 hover:text-indigo-900"><EditIcon className="w-5 h-5"/></button>
                                        <button onClick={() => handleDelete(exam.id)} className="text-red-600 hover:text-red-900"><TrashIcon className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* For smaller screens: Card view */}
                <div className="sm:hidden space-y-3">
                     {filteredExams.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(exam => (
                        <div key={exam.id} className="bg-white rounded-xl shadow-sm p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-gray-800">{exam.subject}</p>
                                    <p className="text-sm text-gray-500">{exam.className}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${EXAM_TYPE_COLORS[exam.type] || 'bg-gray-100 text-gray-800 border-gray-300'}`}>
                                    {exam.type}
                                </span>
                            </div>
                             <div className="flex justify-between items-center">
                                <p className="text-sm font-medium">Status: 
                                    {exam.isPublished 
                                        ? <span className="text-green-600 ml-1">Published</span>
                                        : <span className="text-amber-600 ml-1">Pending</span>
                                    }
                                </p>
                                <p className="text-sm text-gray-600 font-medium">{new Date(exam.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'})}</p>
                            </div>
                            <div className="flex justify-end items-center border-t border-gray-100 pt-3 space-x-3">
                                {!exam.isPublished && <button onClick={() => handlePublish(exam.id)} className="flex items-center space-x-1 text-sm font-semibold text-sky-600 p-1"><PublishIcon className="w-4 h-4"/><span>Publish</span></button>}
                                <button onClick={() => handleEdit(exam)} className="text-indigo-600 p-1"><EditIcon className="w-5 h-5"/></button>
                                <button onClick={() => handleDelete(exam.id)} className="text-red-600 p-1"><TrashIcon className="w-5 h-5"/></button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredExams.length === 0 && <p className="text-center text-gray-500 py-8">No exams found for this filter.</p>}
            </main>

            <div className="absolute bottom-6 right-6">
                <button onClick={handleAddNew} className="bg-sky-500 text-white p-4 rounded-full shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" aria-label="Add new exam">
                    <PlusIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};
export default ExamManagement;