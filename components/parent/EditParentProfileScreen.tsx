import React, { useState, useRef } from 'react';
import { UserIcon, MailIcon, PhoneIcon, CameraIcon } from '../../constants';
import { mockParents } from '../../data';

const EditParentProfileScreen: React.FC = () => {
    const mockParent = mockParents[0];
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState(mockParent.name);
    const [email, setEmail] = useState(mockParent.email);
    const [phone, setPhone] = useState(mockParent.phone);
    const [avatar, setAvatar] = useState(mockParent.avatarUrl);
    const [imageError, setImageError] = useState(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            
            // Check if file is an image
            if (!file.type.match('image.*')) {
                alert('Please select an image file');
                return;
            }
            
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
                setImageError(false);
            };
            reader.onerror = () => {
                alert('Error reading image file');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setAvatar('https://i.pravatar.cc/150?u=parent');
        setImageError(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Profile saved!');
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
                <main className="flex-grow p-4 space-y-6 overflow-y-auto">
                    {/* Photo Upload */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <img 
                                src={avatar} 
                                alt="Parent Avatar" 
                                className="w-28 h-28 rounded-full object-cover shadow-md"
                                onError={() => setImageError(true)}
                            />
                            {imageError && (
                                <div className="absolute inset-0 w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
                                    <UserIcon className="w-12 h-12 text-gray-400" />
                                </div>
                            )}
                            <div className="absolute bottom-0 right-0 flex space-x-1">
                                <label 
                                    htmlFor="photo-upload" 
                                    className="bg-green-500 p-2 rounded-full border-2 border-white cursor-pointer hover:bg-green-600"
                                    aria-label="Change profile picture"
                                >
                                    <CameraIcon className="text-white h-4 w-4" />
                                    <input 
                                        id="photo-upload" 
                                        name="photo-upload" 
                                        type="file" 
                                        className="sr-only" 
                                        accept="image/*" 
                                        onChange={handleImageChange} 
                                        ref={fileInputRef}
                                    />
                                </label>
                                {avatar !== 'https://i.pravatar.cc/150?u=parent' && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="bg-red-500 p-2 rounded-full border-2 border-white cursor-pointer hover:bg-red-600"
                                        aria-label="Remove profile picture"
                                    >
                                        <svg className="text-white h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
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
                                <input 
                                    type="text" 
                                    id="name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <MailIcon className="w-5 h-5" />
                                </span>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                                    required
                                />
                            </div>
                        </div>
                         <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <PhoneIcon className="w-5 h-5" />
                                </span>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </main>

                <div className="p-4 mt-auto bg-gray-50 border-t border-gray-200">
                    <button 
                        type="submit" 
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditParentProfileScreen;