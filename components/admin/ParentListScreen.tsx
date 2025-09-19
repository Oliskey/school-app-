
import React, { useState, useMemo } from 'react';
import { SearchIcon, MailIcon, PhoneIcon, PlusIcon, StudentsIcon } from '../../constants';
import { Parent } from '../../types';
import { mockParents } from '../../data';

interface ParentListScreenProps {
  navigateTo: (view: string, title: string, props?: any) => void;
}

const ParentCard: React.FC<{ parent: Parent, onSelect: (parent: Parent) => void }> = ({ parent, onSelect }) => (
    <button onClick={() => onSelect(parent)} className="w-full bg-white rounded-xl shadow-sm p-4 flex flex-col space-y-3 text-left hover:shadow-md hover:ring-2 hover:ring-sky-200 transition-all">
        <div className="flex items-center space-x-4">
            <img src={parent.avatarUrl} alt={parent.name} className="w-16 h-16 rounded-full object-cover" />
            <div className="flex-grow">
                <p className="font-bold text-lg text-gray-800">{parent.name}</p>
                <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                    <StudentsIcon className="w-4 h-4" />
                    <span>Children IDs: {(parent.childIds || []).join(', ')}</span>
                </div>
            </div>
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-end items-center space-x-2">
            <a href={`mailto:${parent.email}`} onClick={e => e.stopPropagation()} className="p-2 bg-gray-100 rounded-full hover:bg-sky-100"><MailIcon className="h-5 w-5 text-gray-500" /></a>
            <a href={`tel:${parent.phone}`} onClick={e => e.stopPropagation()} className="p-2 bg-gray-100 rounded-full hover:bg-green-100"><PhoneIcon className="h-5 w-5 text-gray-500" /></a>
        </div>
    </button>
);

const ParentListScreen: React.FC<ParentListScreenProps> = ({ navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParents = useMemo(() => 
    mockParents.filter(parent => parent.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm]
  );

  const handleSelectParent = (parent: Parent) => {
    navigateTo('parentDetailAdminView', parent.name, { parent });
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 relative">
      <div className="p-4 bg-gray-100 z-10">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3"><SearchIcon className="text-gray-400" /></span>
          <input type="text" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg" />
        </div>
      </div>
      <main className="flex-grow px-4 pb-24 space-y-3 overflow-y-auto">
        {filteredParents.map(parent => <ParentCard key={parent.id} parent={parent} onSelect={handleSelectParent} />)}
      </main>
      <div className="absolute bottom-6 right-6">
        <button onClick={() => navigateTo('addParent', 'Add New Parent')} className="bg-sky-500 text-white p-4 rounded-full shadow-lg"><PlusIcon /></button>
      </div>
    </div>
  );
};

export default ParentListScreen;
