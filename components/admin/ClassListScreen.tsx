
import React from 'react';
import { StudentsIcon, ChevronRightIcon, gradeColors } from '../../constants';
import { mockStudents } from '../../data';

interface ClassListScreenProps {
  navigateTo: (view: string, props: any, title: string) => void;
}

interface ClassData {
  [grade: number]: {
    [section: string]: number;
  };
}

const ClassListScreen: React.FC<ClassListScreenProps> = ({ navigateTo }) => {
    const classData: ClassData = React.useMemo(() => {
        return mockStudents.reduce((acc, student) => {
            const { grade, section } = student;
            if (!acc[grade]) {
                acc[grade] = {};
            }
            if (!acc[grade][section]) {
                acc[grade][section] = 0;
            }
            acc[grade][section]++;
            return acc;
        }, {} as ClassData);
    }, []);

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <main className="flex-grow p-4 space-y-4 overflow-y-auto">
                {Object.keys(classData).sort((a,b) => Number(a) - Number(b)).map(gradeStr => {
                    const grade = Number(gradeStr);
                    const sections = classData[grade];
                    const gradeColorClass = gradeColors[grade] || 'bg-gray-200 text-gray-800';
                    const [bgColor, textColor] = gradeColorClass.split(' ');

                    return (
                        <div key={grade} className={`bg-white rounded-2xl shadow-sm overflow-hidden`}>
                            <div className={`${bgColor} p-4`}>
                                <h3 className={`font-bold text-lg ${textColor}`}>Grade {grade}</h3>
                            </div>
                            <div className="p-4 space-y-3">
                                {Object.keys(sections).sort().map(section => (
                                    <button 
                                        key={section}
                                        onClick={() => navigateTo('studentList', { filter: { grade, section } }, `Grade ${grade}${section}`)}
                                        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        aria-label={`Manage Grade ${grade} Section ${section}`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-white p-2 rounded-lg border border-gray-200">
                                                <StudentsIcon className={`h-5 w-5 ${textColor}`} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-left">Section {section}</p>
                                                <p className="text-sm text-gray-500 text-left">{sections[section]} Students</p>
                                            </div>
                                        </div>
                                        <div className="text-gray-400">
                                            <ChevronRightIcon />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </main>
        </div>
    );
};

export default ClassListScreen;