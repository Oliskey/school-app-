import React, { useState, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { AIIcon, ANNOUNCEMENT_CATEGORY_CONFIG, PaperclipIcon, XCircleIcon, FileDocIcon, FilePdfIcon, FileImageIcon, DocumentTextIcon } from '../../constants';
import { AnnouncementCategory } from '../../types';
import { mockClasses } from '../../data';

const getFileIcon = (fileName: string): React.ReactElement => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  if (extension === 'pdf') return <FilePdfIcon className="text-red-500 w-8 h-8" />;
  if (extension === 'doc' || extension === 'docx') return <FileDocIcon className="text-blue-500 w-8 h-8" />;
  if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return <FileImageIcon className="text-green-500 w-8 h-8" />;
  return <DocumentTextIcon className="text-gray-500 w-8 h-8" />;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const TeacherCommunicationScreen: React.FC = () => {
    const [selectedClasses, setSelectedClasses] = useState<Set<string>>(new Set());
    const [selectedCategory, setSelectedCategory] = useState<AnnouncementCategory>('General');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    
    const [showAiPrompt, setShowAiPrompt] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClassToggle = (className: string) => {
        const newSelection = new Set(selectedClasses);
        if (newSelection.has(className)) {
            newSelection.delete(className);
        } else {
            newSelection.add(className);
        }
        setSelectedClasses(newSelection);
    };

    const handleGenerate = async () => {
        if (!aiPrompt) return;
        setIsGenerating(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Generate a school announcement for my class. The category is "${selectedCategory}". The topic is: "${aiPrompt}"`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING, description: 'A concise and informative title for the announcement.' },
                            message: { type: Type.STRING, description: 'The full message body of the announcement, written in a clear, friendly, and professional tone suitable for students and parents. Use newline characters for paragraphs.' }
                        }
                    }
                }
            });
            const jsonResponse = JSON.parse(response.text.trim());
            setTitle(jsonResponse.title || '');
            setMessage(jsonResponse.message || '');
            setShowAiPrompt(false);
            setAiPrompt('');
        } catch (error) {
            console.error("AI Generation Error:", error);
            alert("Failed to generate announcement. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedClasses.size === 0 || !title || !message) {
            alert("Please select at least one class, and fill in the title and message.");
            return;
        }
        alert(`Announcement sent to: ${Array.from(selectedClasses).join(', ')}\nCategory: ${selectedCategory}\nTitle: ${title}`);
        // Reset form
        setSelectedClasses(new Set());
        setTitle('');
        setMessage('');
        setAttachedFiles([]);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAttachedFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files!)]);
        }
    };
  
    const handleRemoveFile = (fileToRemove: File) => {
        setAttachedFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
    };
  
    const handleAttachClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <form onSubmit={handleSend} className="flex-grow flex flex-col">
                <main className="flex-grow p-4 space-y-5 overflow-y-auto">
                    {/* Audience Selection */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">1. Select Audience (Classes)</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {mockClasses.map(cls => {
                                const className = `Grade ${cls.grade}${cls.section}`;
                                const isSelected = selectedClasses.has(className);
                                return (
                                    <button 
                                        type="button" 
                                        key={cls.id} 
                                        onClick={() => handleClassToggle(className)}
                                        className={`p-4 bg-white rounded-xl shadow-sm text-center cursor-pointer transition-all duration-200 border-2 ${isSelected ? 'border-purple-500 ring-2 ring-purple-200' : 'border-transparent hover:border-gray-300'}`}
                                        aria-pressed={isSelected}
                                    >
                                        <p className="font-bold text-gray-800">{className}</p>
                                        <p className="text-sm text-gray-500">{cls.subject}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">2. Select Category</h3>
                        <div className="grid grid-cols-4 gap-2">
                           {(Object.keys(ANNOUNCEMENT_CATEGORY_CONFIG) as AnnouncementCategory[]).map((category) => {
                                const config = ANNOUNCEMENT_CATEGORY_CONFIG[category];
                                const isSelected = selectedCategory === category;
                                const Icon = config.icon;
                                return (
                                    <button
                                        type="button"
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`p-3 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all ${isSelected ? `${config.bg} ring-2 ring-offset-1 ${config.color.replace('text-', 'ring-')}` : 'bg-white shadow-sm hover:bg-gray-100'}`}
                                        aria-pressed={isSelected}
                                    >
                                        <Icon className={`w-6 h-6 ${config.color}`} />
                                        <span className={`text-xs font-semibold ${isSelected ? config.color : 'text-gray-600'}`}>{category}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Message Composition */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-bold text-gray-800">3. Compose Message</h3>
                            <button
                                type="button"
                                onClick={() => setShowAiPrompt(!showAiPrompt)}
                                className="flex items-center space-x-2 px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors"
                            >
                                <AIIcon className="h-4 w-4" />
                                <span>Generate with AI</span>
                            </button>
                        </div>
                        {showAiPrompt && (
                            <div className="bg-white p-3 rounded-xl shadow-sm mb-4 border border-purple-200 space-y-2">
                                <input type="text" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="e.g., Explain the homework for tomorrow" className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" disabled={isGenerating} />
                                <button onClick={handleGenerate} disabled={isGenerating || !aiPrompt} className="w-full px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-lg hover:bg-purple-600 disabled:bg-gray-400">
                                    {isGenerating ? 'Generating...' : 'Generate'}
                                </button>
                            </div>
                        )}
                        <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm">
                            <input id="announcement-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Announcement Title" required className="w-full px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 font-semibold" />
                            <textarea id="announcement-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={6} placeholder="Type your message here..." required className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" />
                        </div>
                    </div>

                    {/* Attachments */}
                    <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
                         <h3 className="text-lg font-bold text-gray-800">4. Attachments (Optional)</h3>
                         <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                         <button type="button" onClick={handleAttachClick} className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 hover:border-purple-400 hover:text-purple-600 transition-colors">
                            <PaperclipIcon className="h-5 w-5" />
                            <span className="font-semibold">Attach Files</span>
                         </button>
                         {attachedFiles.length > 0 && (
                            <div className="space-y-2 pt-2">
                                {attachedFiles.map((file, index) => (
                                    <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                                       {getFileIcon(file.name)}
                                       <div className="ml-3 flex-grow overflow-hidden">
                                           <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                                           <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                       </div>
                                       <button type="button" onClick={() => handleRemoveFile(file)} className="ml-2 p-1 text-gray-400 hover:text-red-500" aria-label={`Remove ${file.name}`}>
                                           <XCircleIcon className="w-5 h-5" />
                                       </button>
                                    </div>
                                ))}
                            </div>
                         )}
                    </div>
                </main>
                <div className="p-4 mt-auto bg-white border-t border-gray-200">
                    <button type="submit" disabled={selectedClasses.size === 0 || !title || !message} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Send Announcement
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TeacherCommunicationScreen;