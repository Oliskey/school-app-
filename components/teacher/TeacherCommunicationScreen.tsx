
import React, { useState, useRef, useEffect } from 'react';
import { AnnouncementCategory, Notice } from '../../types';
import { mockClasses, mockNotices } from '../../data';
import { CameraIcon, StopIcon, XCircleIcon, VideoIcon } from '../../constants';

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const TeacherCommunicationScreen: React.FC = () => {
    const [mode, setMode] = useState<'text' | 'video'>('text');
    const [selectedClasses, setSelectedClasses] = useState<Set<string>>(new Set());
    const [selectedCategory, setSelectedCategory] = useState<AnnouncementCategory>('General');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    
    // Video state
    const [isRecording, setIsRecording] = useState(false);
    const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const recordingIntervalRef = useRef<number | null>(null);
    
    const handleClassToggle = (className: string) => {
        const newSelection = new Set(selectedClasses);
        if (newSelection.has(className)) {
            newSelection.delete(className);
        } else {
            newSelection.add(className);
        }
        setSelectedClasses(newSelection);
    };
    
    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedClasses.size === 0 || !title) {
            alert("Please select at least one class and provide a title.");
            return;
        }
        if (mode === 'text' && !message) {
            alert("Please provide a message for the text announcement.");
            return;
        }
        if (mode === 'video' && !videoBlobUrl) {
            alert("Please record or provide a video for the video announcement.");
            return;
        }

        const newNotice: Omit<Notice, 'id'> = {
            title,
            content: message,
            timestamp: new Date().toISOString(),
            category: selectedCategory,
            isPinned: false,
            audience: ['parents', 'students'],
            className: Array.from(selectedClasses).join(', '),
            videoUrl: mode === 'video' ? videoBlobUrl! : undefined,
        };
        
        mockNotices.unshift({ id: Date.now(), ...newNotice });
        
        alert(`Announcement sent to: ${Array.from(selectedClasses).join(', ')}`);
        // Reset form
        setSelectedClasses(new Set());
        setTitle('');
        setMessage('');
        setVideoBlobUrl(null);
        setMode('text');
    };

    const stopStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };
    
    useEffect(() => {
        // Cleanup stream on component unmount
        return () => stopStream();
    }, []);
    
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;
            if (videoRef.current) videoRef.current.srcObject = stream;
            
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            const chunks: Blob[] = [];
            recorder.ondataavailable = (event) => chunks.push(event.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                setVideoBlobUrl(URL.createObjectURL(blob));
                stopStream();
            };
            recorder.start();
            setIsRecording(true);
            setRecordingTime(0);
            recordingIntervalRef.current = window.setInterval(() => setRecordingTime(t => t + 1), 1000);
        } catch (err) {
            console.error(err);
            alert("Camera/microphone permission denied. Please enable it in your browser settings.");
        }
    };
    
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if(recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
        }
    };
    
    const handleDiscardVideo = () => {
        setVideoBlobUrl(null);
        setRecordingTime(0);
    };

    const VideoRecorderUI = () => (
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
                <video ref={videoRef} autoPlay muted className="w-full h-full object-cover"></video>
                {isRecording && <div className="absolute top-2 right-2 text-white bg-red-500 px-2 py-0.5 rounded text-xs font-mono">REC {formatTime(recordingTime)}</div>}
            </div>
            <div className="flex justify-center">
                {isRecording ? (
                    <button type="button" onClick={stopRecording} className="p-4 bg-red-500 text-white rounded-full shadow-lg"><StopIcon /></button>
                ) : (
                    <button type="button" onClick={startRecording} className="p-4 bg-gray-700 text-white rounded-full shadow-lg"><CameraIcon /></button>
                )}
            </div>
        </div>
    );
    
    const VideoPreviewUI = () => (
         <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
            <video src={videoBlobUrl!} controls className="w-full aspect-video bg-black rounded-lg"></video>
            <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={handleDiscardVideo} className="w-full py-2 bg-gray-200 text-gray-800 font-bold rounded-lg">Discard</button>
                <div className="w-full py-2 bg-green-500 text-white font-bold rounded-lg flex items-center justify-center">Video Attached ✓</div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <form onSubmit={handleSend} className="flex-grow flex flex-col">
                <main className="flex-grow p-4 space-y-5 overflow-y-auto">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">1. Select Classes</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {mockClasses.map(cls => {
                                const className = `Grade ${cls.grade}${cls.section}`;
                                const isSelected = selectedClasses.has(className);
                                return (
                                    <button type="button" key={cls.id} onClick={() => handleClassToggle(className)} className={`p-4 bg-white rounded-xl shadow-sm text-center border-2 ${isSelected ? 'border-purple-500' : 'border-transparent'}`} aria-pressed={isSelected}>
                                        <p className="font-bold text-gray-800">{className}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                         <h3 className="text-lg font-bold text-gray-800 mb-2">2. Announcement Type</h3>
                         <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
                            <button type="button" onClick={() => { setMode('text'); stopStream(); }} className={`w-1/2 py-2 text-sm font-semibold rounded-md ${mode === 'text' ? 'bg-white shadow' : 'text-gray-600'}`}>Text</button>
                            <button type="button" onClick={() => setMode('video')} className={`w-1/2 py-2 text-sm font-semibold rounded-md ${mode === 'video' ? 'bg-white shadow' : 'text-gray-600'}`}>Video</button>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">3. Compose Message</h3>
                        <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm">
                            <input id="announcement-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Announcement Title" required className="w-full px-4 py-2 text-gray-800 bg-gray-50 border rounded-lg font-semibold" />
                             {mode === 'text' && (
                                <textarea id="announcement-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={6} placeholder="Type your message here..." className="w-full px-4 py-2 text-gray-700 bg-gray-50 border rounded-lg" />
                            )}
                        </div>
                         {mode === 'video' && !videoBlobUrl && <VideoRecorderUI />}
                         {mode === 'video' && videoBlobUrl && <VideoPreviewUI />}
                    </div>
                </main>
                <div className="p-4 mt-auto bg-white border-t border-gray-200">
                    <button type="submit" className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400">
                        Send Announcement
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TeacherCommunicationScreen;
