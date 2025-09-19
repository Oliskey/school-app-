
import React, { useState, useEffect } from 'react';
import { CameraIcon, UserIcon, MailIcon, PhoneIcon, StudentsIcon } from '../../constants';
import { Parent } from '../../types';
import { mockParents } from '../../data';

interface AddParentScreenProps {
    parentToEdit?: Parent;
    forceUpdate: () => void;
    handleBack: () => void;
}

const AddParentScreen: React.FC<AddParentScreenProps> = ({ parentToEdit, forceUpdate, handleBack }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [childIds, setChildIds] = useState('');
    const [avatar, setAvatar] = useState<string | null>(null);

    useEffect(() => {
        if (parentToEdit) {
            setName(parentToEdit.name);
            setEmail(parentToEdit.email);
            setPhone(parentToEdit.phone);
            setChildIds((parentToEdit.childIds || []).join(', '));
            setAvatar(parentToEdit.avatarUrl);
        }
    }, [parentToEdit]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => { setAvatar(reader.result as string); };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newParentData = {
            name,
            email,
            phone,
            childIds: childIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)),
            avatarUrl: avatar || `https://i.pravatar.cc/150?u=${name.replace(' ', '')}`,
        };

        if (parentToEdit) {
            const index = mockParents.findIndex(p => p.id === parentToEdit.id);
            if (index > -1) {
                mockParents[index] = { ...parentToEdit, ...newParentData };
            }
        } else {
            const newId = Math.max(0, ...mockParents.map(p => p.id)) + 1;
            mockParents.unshift({ id: newId, ...newParentData });
        }

        alert(`Parent ${parentToEdit ? 'Updated' : 'Saved'} Successfully!`);
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
                                {avatar ? <img src={avatar} alt="Parent" className="w-full h-full rounded-full object-cover" /> : <UserIcon className="w-12 h-12 text-gray-400" />}
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
                        <InputField id="childIds" label="Child Student IDs (comma separated)" value={childIds} onChange={setChildIds} icon={<StudentsIcon className="w-5 h-5"/>} />
                    </div>
                </main>
                <div className="p-4 mt-auto bg-gray-50">
                    <button type="submit" className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-sky-500 hover:bg-sky-600">
                        {parentToEdit ? 'Update Parent' : 'Save Parent'}
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

export default AddParentScreen;
