import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CameraIcon, UserIcon, MailIcon, PhoneIcon } from '../../constants';
import { Student, Department } from '../../types';

interface AddStudentScreenProps {
    studentToEdit?: Student;
}

const AddStudentScreen: React.FC<AddStudentScreenProps> = ({ studentToEdit }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [department, setDepartment] = useState<Department | ''>('');
    const [imageError, setImageError] = useState(false);
    
    // Guardian states can remain simple as they are not on the student object
    const [guardianName, setGuardianName] = useState('');
    const [guardianPhone, setGuardianPhone] = useState('');
    const [guardianEmail, setGuardianEmail] = useState('');

    const grade = useMemo(() => {
        const match = className.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
    }, [className]);

    useEffect(() => {
        if (studentToEdit) {
            setSelectedImage(studentToEdit.avatarUrl);
            setFullName(studentToEdit.name);
            setClassName(`Grade ${studentToEdit.grade}`);
            setSection(studentToEdit.section);
            setDepartment(studentToEdit.department || '');
        }
    }, [studentToEdit]);

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
                setSelectedImage(reader.result as string);
                setImageError(false);
            };
            reader.onerror = () => {
                alert('Error reading image file');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImageError(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`${studentToEdit ? 'Student Updated' : 'Student Saved'} Successfully!`);
    }

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
                <main className="flex-grow p-4 space-y-6 overflow-y-auto">
                    {/* Photo Upload */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
                                {selectedImage ? (
                                    <>
                                        <img 
                                            src={selectedImage} 
                                            alt="Student" 
                                            className="w-full h-full rounded-full object-cover"
                                            onError={() => setImageError(true)}
                                        />
                                        {imageError && (
                                            <div className="absolute inset-0 w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                                <UserIcon className="w-12 h-12 text-gray-400" />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <UserIcon className="w-12 h-12 text-gray-400" />
                                )}
                            </div>
                            <div className="absolute bottom-0 right-0 flex space-x-1">
                                <label 
                                    htmlFor="photo-upload" 
                                    className="bg-sky-500 p-2 rounded-full border-2 border-white cursor-pointer hover:bg-sky-600"
                                    aria-label="Upload student photo"
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
                                {selectedImage && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="bg-red-500 p-2 rounded-full border-2 border-white cursor-pointer hover:bg-red-600"
                                        aria-label="Remove student photo"
                                    >
                                        <svg className="text-white h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Student Information Section */}
                    <div className="space-y-4">
                        <div className="p-2 bg-sky-100 rounded-lg">
                            <h3 className="font-bold text-sky-800">Student Information</h3>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                            <div>
                                <label htmlFor="fullName" className="text-sm font-medium text-gray-600 sr-only">Full Name</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><UserIcon className="w-5 h-5" /></span>
                                    <input 
                                        type="text" 
                                        name="fullName" 
                                        id="fullName" 
                                        value={fullName} 
                                        onChange={e => setFullName(e.target.value)} 
                                        className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" 
                                        placeholder="Adebayo Adewale"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                 <div>
                                    <label htmlFor="age" className="text-sm font-medium text-gray-600 sr-only">Age</label>
                                    <input 
                                        type="number" 
                                        name="age" 
                                        id="age" 
                                        value={age} 
                                        onChange={e => setAge(e.target.value)} 
                                        className="w-full px-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" 
                                        placeholder="Age" 
                                        required
                                    />
                                </div>
                                 <div>
                                    <label htmlFor="gender" className="text-sm font-medium text-gray-600 sr-only">Gender</label>
                                    <select 
                                        id="gender" 
                                        name="gender" 
                                        value={gender} 
                                        onChange={e => setGender(e.target.value)} 
                                        className="w-full px-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                        required
                                    >
                                        <option value="">Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="class" className="text-sm font-medium text-gray-600 sr-only">Class</label>
                                    <select 
                                        id="class" 
                                        name="class" 
                                        value={className} 
                                        onChange={e => setClassName(e.target.value)} 
                                        className="w-full px-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                        required
                                    >
                                        <option value="">Select Class</option>
                                        {[...Array(12).keys()].map(i => <option key={i+1} value={`Grade ${i + 1}`}>Grade {i + 1}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="section" className="text-sm font-medium text-gray-600 sr-only">Section</label>
                                    <select 
                                        id="section" 
                                        name="section" 
                                        value={section} 
                                        onChange={e => setSection(e.target.value)} 
                                        className="w-full px-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                        required
                                    >
                                        <option value="">Select Section</option>
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                    </select>
                                </div>
                            </div>
                            {grade >= 10 && (
                                <div>
                                    <label htmlFor="department" className="text-sm font-medium text-gray-600 sr-only">Department</label>
                                    <select 
                                        id="department" 
                                        name="department" 
                                        value={department} 
                                        onChange={e => setDepartment(e.target.value as Department | '')} 
                                        className="w-full px-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                        required={grade >= 10}
                                    >
                                        <option value="">Select Department</option>
                                        <option value="Science">Science</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Arts">Arts</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Guardian Information Section */}
                    <div className="space-y-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <h3 className="font-bold text-green-800">Guardian Information</h3>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                             <div>
                                <label htmlFor="guardianName" className="text-sm font-medium text-gray-600 sr-only">Guardian's Name</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><UserIcon className="w-5 h-5" /></span>
                                    <input 
                                        type="text" 
                                        name="guardianName" 
                                        id="guardianName" 
                                        value={guardianName} 
                                        onChange={e => setGuardianName(e.target.value)} 
                                        className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" 
                                        placeholder="Mr. Adewale"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="guardianPhone" className="text-sm font-medium text-gray-600 sr-only">Guardian's Phone</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><PhoneIcon className="w-5 h-5" /></span>
                                    <input 
                                        type="tel" 
                                        name="guardianPhone" 
                                        id="guardianPhone" 
                                        value={guardianPhone} 
                                        onChange={e => setGuardianPhone(e.target.value)} 
                                        className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" 
                                        placeholder="+234 801 234 5678"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="guardianEmail" className="text-sm font-medium text-gray-600 sr-only">Guardian's Email</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><MailIcon className="w-5 h-5" /></span>
                                    <input 
                                        type="email" 
                                        name="guardianEmail" 
                                        id="guardianEmail" 
                                        value={guardianEmail} 
                                        onChange={e => setGuardianEmail(e.target.value)} 
                                        className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" 
                                        placeholder="guardian@example.com"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Action Button */}
                <div className="p-4 mt-auto bg-gray-50">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                        {studentToEdit ? 'Update Student' : 'Save Student'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudentScreen;