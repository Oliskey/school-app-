
import React, { useState, useEffect } from 'react';
import { CameraIcon, UserIcon, MailIcon, PhoneIcon, BookOpenIcon, UsersIcon, XCircleIcon } from '../../constants';
import { Teacher } from '../../types';
import { mockTeachers } from '../../data';

interface AddTeacherScreenProps {
    teacherToEdit?: Teacher;
    forceUpdate: () => void;
    handleBack: () => void;
}

const TagInput: React.FC<{ label: string; tags: string[]; setTags: React.Dispatch<React.SetStateAction<string[]>>; placeholder: string }> = ({ label, tags, setTags, placeholder }) => {
    const [input, setInput] = useState('');

    const handleAddTag = () => {
        const newTag = input.trim();
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            handleAddTag();
        }
    };

    return (
        <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
            <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-lg bg-gray-50">
                {tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 bg-sky-100 text-sky-800 text-sm font-semibold px-2 py-1 rounded-md">
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)} className="text-sky-600 hover:text-sky-800">
                            <XCircleIcon className="w-4 h-4" />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-grow bg-transparent p-1 focus:outline-none"
                />
            </div>
        </div>
    );
};


const AddTeacherScreen: React.FC<AddTeacherScreenProps> = ({ teacherToEdit, forceUpdate, handleBack }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subjects, setSubjects] = useState<string[]>([]);
    const [classes, setClasses] = useState<string[]>([]);
    const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
    const [avatar, setAvatar] = useState<string | null>(null);

    useEffect(() => {
        if (teacherToEdit) {
            setName(teacherToEdit.name);
            setEmail(teacherToEdit.email);
            setPhone(teacherToEdit.phone);
            setSubjects(teacherToEdit.subjects);
            setClasses(teacherToEdit.classes);
            setStatus(teacherToEdit.status);
            setAvatar(teacherToEdit.avatarUrl);
        }
    }, [teacherToEdit]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => { setAvatar(reader.result as string); };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newTeacherData = {
            name,
            email,
            phone,
            subjects,
            classes,
            status,
            avatarUrl: avatar || `https://i.pravatar.cc/150?u=${name.replace(' ', '')}`,
        };

        if (teacherToEdit) {
            const index = mockTeachers.findIndex(t => t.id === teacherToEdit.id);
            if (index > -1) {
                mockTeachers[index] = { ...teacherToEdit, ...newTeacherData };
            }
        } else {
            const newId = Math.max(0, ...mockTeachers.map(t => t.id)) + 1;
            mockTeachers.unshift({ id: newId, ...newTeacherData });
        }

        alert(`Teacher ${teacherToEdit ? 'Updated' : 'Saved'} Successfully!`);
        forceUpdate();
        handleBack();
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
                <main className="flex-grow p-4 space-y-6 overflow-y-auto">
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
                                {avatar ? <img src={avatar} alt="Teacher" className="w-full h-full rounded-full object-cover" /> : <UserIcon className="w-12 h-12 text-gray-400" />}
                            </div>
                            <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-sky-500 p-2 rounded-full border-2 border-white cursor-pointer hover:bg-sky-600">
                                <CameraIcon className="text-white h-4 w-4" />
                                <input id="photo-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                        <InputField id="name" label="Full Name" value={name} onChange={setName} icon={<UserIcon className="w-5 h-5"/>} />
                        <InputField id="email" label="Email" value={email} onChange={setEmail} icon={<MailIcon className="w-5 h-5"/>} type="email" />
                        <InputField id="phone" label="Phone" value={phone} onChange={setPhone} icon={<PhoneIcon className="w-5 h-5"/>} type="tel" />
                        
                        <TagInput label="Subjects" tags={subjects} setTags={setSubjects} placeholder="Add subject & press Enter" />
                        <TagInput label="Classes" tags={classes} setTags={setClasses} placeholder="Add class (e.g., 7A) & press Enter" />

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select id="status" value={status} onChange={e => setStatus(e.target.value as 'Active' | 'Inactive')} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </main>
                <div className="p-4 mt-auto bg-gray-50">
                    <button type="submit" className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-sky-500 hover:bg-sky-600">
                        {teacherToEdit ? 'Update Teacher' : 'Save Teacher'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const InputField: React.FC<{id: string, label: string, value: string, onChange: (val: string) => void, icon: React.ReactNode, type?: string}> = ({ id, label, value, onChange, icon, type = 'text' }) => (
    <div>
        <label htmlFor={id} className="text-sm font-medium text-gray-600 sr-only">{label}</label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{icon}</span>
            <input type={type} name={id} id={id} value={value} onChange={e => onChange(e.target.value)} className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" placeholder={label} required/>
        </div>
    </div>
);

export default AddTeacherScreen;
