
import React, { useState } from 'react';
import { UserIcon, MailIcon, PhoneIcon, CameraIcon, BookOpenIcon } from '../../constants';

const mockTeacher = {
  name: 'Mrs. Funke Akintola',
  email: 'f.akintola@school.com',
  phone: '123-456-7891',
  avatarUrl: 'https://i.pravatar.cc/150?u=teacher',
  subject: 'English'
};

const EditTeacherProfileScreen: React.FC = () => {
    const [name, setName] = useState(mockTeacher.name);
    const [email, setEmail] = useState(mockTeacher.email);
    const [phone, setPhone] = useState(mockTeacher.phone);
    const [avatar, setAvatar] = useState(mockTeacher.avatarUrl);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <form onSubmit={(e) => { e.preventDefault(); alert('Profile saved!'); }} className="flex-grow flex flex-col">
                <main className="flex-grow p-4 space-y-6 overflow-y-auto">
                    {/* Photo Upload */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <img src={avatar} alt="Teacher" className="w-28 h-28 rounded-full object-cover shadow-md" />
                            <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full border-2 border-white cursor-pointer hover:bg-purple-700">
                                <CameraIcon className="text-white h-4 w-4" />
                                <input id="photo-upload" name="photo-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>
                    </div>
                    
                    {/* Form Fields */}
                    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <UserIcon className="w-5 h-5" />
                                </span>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <MailIcon className="w-5 h-5" />
                                </span>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" />
                            </div>
                        </div>
                         <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <PhoneIcon className="w-5 h-5" />
                                </span>
                                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" />
                            </div>
                        </div>
                         <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <BookOpenIcon className="w-5 h-5" />
                                </span>
                                <input type="text" id="subject" value={mockTeacher.subject} disabled className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg cursor-not-allowed" />
                            </div>
                        </div>
                    </div>
                </main>

                {/* Action Button */}
                <div className="p-4 mt-auto bg-gray-50 border-t border-gray-200">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTeacherProfileScreen;
