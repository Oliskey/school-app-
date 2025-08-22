


import React, { useState } from 'react';
import { CameraIcon, UserIcon, MailIcon, PhoneIcon } from '../../constants';

const FormInput = ({ id, label, placeholder, type = 'text', icon }: { id: string, label: string, placeholder: string, type?: string, icon: React.ReactNode }) => (
    <div>
        <label htmlFor={id} className="text-sm font-medium text-gray-600 sr-only">{label}</label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                {icon}
            </span>
            <input
                type={type}
                name={id}
                id={id}
                className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                placeholder={placeholder}
            />
        </div>
    </div>
);

const AddStudentScreen: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <form className="flex-grow flex flex-col">
                <main className="flex-grow p-4 space-y-6 overflow-y-auto">
                    {/* Photo Upload */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Student" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <UserIcon className="w-12 h-12 text-gray-400" />
                                )}
                            </div>
                            <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-sky-500 p-2 rounded-full border-2 border-white cursor-pointer hover:bg-sky-600">
                                <CameraIcon className="text-white h-4 w-4" />
                                <input id="photo-upload" name="photo-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>
                    </div>

                    {/* Student Information Section */}
                    <div className="space-y-4">
                        <div className="p-2 bg-sky-100 rounded-lg">
                            <h3 className="font-bold text-sky-800">Student Information</h3>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                            <FormInput id="fullName" label="Full Name" placeholder="Adebayo Adewale" icon={<UserIcon className="w-5 h-5" />} />
                            <div className="grid grid-cols-2 gap-4">
                                 <div>
                                    <label htmlFor="age" className="text-sm font-medium text-gray-600 sr-only">Age</label>
                                    <input type="number" name="age" id="age" className="w-full px-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" placeholder="Age" />
                                </div>
                                 <div>
                                    <label htmlFor="gender" className="text-sm font-medium text-gray-600 sr-only">Gender</label>
                                    <select id="gender" name="gender" defaultValue="" className="w-full px-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500">
                                        <option value="" disabled>Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="class" className="text-sm font-medium text-gray-600 sr-only">Class</label>
                                    <select id="class" name="class" defaultValue="" className="w-full px-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500">
                                        <option value="" disabled>Select Class</option>
                                        {[...Array(12).keys()].map(i => <option key={i+1}>Grade {i + 1}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="section" className="text-sm font-medium text-gray-600 sr-only">Section</label>
                                    <select id="section" name="section" defaultValue="" className="w-full px-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500">
                                        <option value="" disabled>Select Section</option>
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Guardian Information Section */}
                    <div className="space-y-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <h3 className="font-bold text-green-800">Guardian Information</h3>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                            <FormInput id="guardianName" label="Guardian's Name" placeholder="Mr. Adewale" icon={<UserIcon className="w-5 h-5" />} />
                            <FormInput id="guardianPhone" label="Guardian's Phone" placeholder="+234 801 234 5678" type="tel" icon={<PhoneIcon className="w-5 h-5" />} />
                            <FormInput id="guardianEmail" label="Guardian's Email" placeholder="guardian@example.com" type="email" icon={<MailIcon className="w-5 h-5" />} />
                        </div>
                    </div>
                </main>

                {/* Action Button */}
                <div className="p-4 mt-auto bg-gray-50">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                        Save Student
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudentScreen;