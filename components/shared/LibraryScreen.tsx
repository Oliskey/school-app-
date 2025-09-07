import React, { useState, useMemo } from 'react';
import { mockDigitalResources } from '../../data';
import { DigitalResource, VideoLesson } from '../../types';
import { RESOURCE_TYPE_CONFIG, PlayIcon } from '../../constants';

interface LibraryScreenProps {
    navigateTo: (view: string, title: string, props?: any) => void;
}

const ResourceCard: React.FC<{ resource: DigitalResource, onClick: () => void }> = ({ resource, onClick }) => {
    const TypeIcon = RESOURCE_TYPE_CONFIG[resource.type].icon;
    const typeColor = RESOURCE_TYPE_CONFIG[resource.type].color;

    return (
        <button 
            onClick={onClick} 
            className="block w-full text-left bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg overflow-hidden group transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
        >
            <div className="relative h-32 md:h-40">
                <img src={resource.thumbnailUrl} alt={resource.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                {resource.type === 'Video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/40 shadow-lg">
                            <PlayIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                        </div>
                    </div>
                )}
                <div className={`absolute top-2 md:top-3 right-2 md:right-3 p-2 rounded-full md:rounded-full bg-white/95 backdrop-blur-sm ${typeColor} shadow-md`}>
                    <TypeIcon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3">
                    <h3 className="font-bold text-white text-sm md:text-base truncate">{resource.title}</h3>
                    <p className="text-[10px] md:text-xs text-gray-200 truncate mt-1">{resource.subject}</p>
                </div>
            </div>
            <div className="p-3 md:p-4 bg-white">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] md:text-xs font-semibold text-gray-500">{resource.type}</span>
                    <span className="text-[10px] md:text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">View</span>
                </div>
            </div>
        </button>
    );
};


const LibraryScreen: React.FC<LibraryScreenProps> = ({ navigateTo }) => {
    const [selectedSubject, setSelectedSubject] = useState<string>('All');

    const subjects = useMemo(() => 
        ['All', ...Array.from(new Set(mockDigitalResources.map(r => r.subject)))]
    , []);

    const resourcesBySubject = useMemo(() => {
        const grouped: { [key: string]: DigitalResource[] } = {};
        mockDigitalResources.forEach(resource => {
            if (!grouped[resource.subject]) {
                grouped[resource.subject] = [];
            }
            grouped[resource.subject].push(resource);
        });
        return grouped;
    }, []);

    const handleResourceClick = (resource: DigitalResource) => {
        if (resource.type === 'Video') {
            navigateTo('videoLesson', resource.title, { lessonId: resource.id });
        } else {
            alert(`Opening ${resource.type}: ${resource.title}`);
        }
    };

    const filteredSubjects = selectedSubject === 'All' ? Object.keys(resourcesBySubject) : [selectedSubject];

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Subject Filters */}
            <div className="p-3 md:p-5 bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10 shadow-md rounded-b-xl md:rounded-b-2xl">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Digital Library</h2>
                <div className="flex space-x-2 md:space-x-3 overflow-x-auto pb-3 md:pb-4 -mb-3 md:-mb-4">
                    {subjects.map(subject => (
                        <button
                            key={subject}
                            onClick={() => setSelectedSubject(subject)}
                            className={`px-3 md:px-6 py-1.5 md:py-2.5 text-xs md:text-base font-bold rounded-full flex-shrink-0 transition-all duration-300 whitespace-nowrap shadow-sm md:shadow-md ${
                                selectedSubject === subject
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white transform scale-105 shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-purple-50 hover:shadow-sm'
                            }`}
                        >
                            {subject}
                        </button>
                    ))}
                </div>
            </div>

            {/* Resources Grid */}
            <main className="flex-grow p-3 md:p-5 overflow-y-auto">
                <div className="space-y-6 md:space-y-9">
                {filteredSubjects.map(subject => (
                    <div key={subject}>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-5 pb-2 md:pb-3 border-b-2 border-gray-200">{subject}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
                            {resourcesBySubject[subject].map(resource => (
                                <ResourceCard 
                                    key={resource.id} 
                                    resource={resource} 
                                    onClick={() => handleResourceClick(resource)} 
                                />
                            ))}
                        </div>
                    </div>
                ))}
                </div>
            </main>
        </div>
    );
};

export default LibraryScreen;