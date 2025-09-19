
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Conversation, Message } from '../../types';
import { THEME_CONFIG, MicrophoneIcon, PlayIcon, PauseIcon, VideoIcon, StopIcon, SendIcon, XCircleIcon } from '../../constants';
import { DashboardType } from '../../types';
import { mockConversations, mockAdminConversations } from '../../data';

interface ChatScreenProps {
  conversation: Conversation;
  currentUserId: number;
}

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const AudioPlayer: React.FC<{ src: string; themeColor: string; isCurrentUser: boolean }> = ({ src, themeColor, isCurrentUser }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const setAudioData = () => {
                setDuration(audio.duration);
                setCurrentTime(audio.currentTime);
            };
            const setAudioTime = () => setCurrentTime(audio.currentTime);
            audio.addEventListener('loadeddata', setAudioData);
            audio.addEventListener('timeupdate', setAudioTime);
            audio.addEventListener('ended', () => setIsPlaying(false));
            return () => {
                audio.removeEventListener('loadeddata', setAudioData);
                audio.removeEventListener('timeupdate', setAudioTime);
                audio.removeEventListener('ended', () => setIsPlaying(false));
            };
        }
    }, []);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const playerTheme = isCurrentUser ? 'bg-white/30 text-white' : `${themeColor.replace('bg-','')} text-white`;
    const progressBg = isCurrentUser ? 'bg-white' : themeColor;
    const progressTrackBg = isCurrentUser ? 'bg-white/30' : 'bg-gray-300/50';

    return (
        <div className="flex items-center space-x-2 w-48">
            <audio ref={audioRef} src={src} preload="metadata"></audio>
            <button type="button" onClick={togglePlayPause} className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${playerTheme}`}>
                {isPlaying ? <PauseIcon className="w-5 h-5"/> : <PlayIcon className="w-5 h-5"/>}
            </button>
            <div className="flex-grow flex items-center space-x-2">
                <div className={`w-full ${progressTrackBg} rounded-full h-1.5`}>
                    <div className={`${progressBg} h-1.5 rounded-full`} style={{ width: `${progress}%` }}></div>
                </div>
                <span className="text-xs font-mono w-10">{formatTime(isPlaying ? currentTime : duration)}</span>
            </div>
        </div>
    );
};

const ChatScreen: React.FC<ChatScreenProps> = ({ conversation, currentUserId }) => {
    const [messages, setMessages] = useState<Message[]>(conversation.messages);
    const [inputText, setInputText] = useState('');
    
    // Video state
    const [isVideomode, setIsVideoMode] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const recordingIntervalRef = useRef<number | null>(null);
    
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const dashboardType = useMemo(() => {
      if (currentUserId === 0) return DashboardType.Admin;
      const teacherIds = [1, 2, 3, 4, 5];
      if (teacherIds.includes(currentUserId)) return DashboardType.Teacher;
      if (currentUserId > 1000) return DashboardType.Parent;
      return DashboardType.Student;
    }, [currentUserId]);
    
    const theme = THEME_CONFIG[dashboardType];

    useEffect(() => {
        chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    }, [messages, isVideomode]);

    const addMessageToState = (newMessage: Message) => {
        setMessages(prev => [...prev, newMessage]);
        const allConvos = [...mockConversations, ...mockAdminConversations];
        const convoToUpdate = allConvos.find(c => c.id === conversation.id);
        if (convoToUpdate) {
            convoToUpdate.messages.push(newMessage);
            const text = newMessage.type === 'audio' ? 'Voice message' : newMessage.type === 'video' ? 'Video message' : newMessage.text || '';
            convoToUpdate.lastMessage = { text, timestamp: newMessage.timestamp };
        }
    };

    const stopStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    useEffect(() => {
        if (isVideomode) {
            const startStream = async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                    streamRef.current = stream;
                    if (videoRef.current) videoRef.current.srcObject = stream;
                } catch (err) {
                    console.error(err);
                    alert("Camera/microphone permission denied.");
                    setIsVideoMode(false);
                }
            };
            startStream();
        } else {
            stopStream();
        }
        return () => stopStream();
    }, [isVideomode]);

    const startVideoRecording = () => {
        if (!streamRef.current) return;
        const recorder = new MediaRecorder(streamRef.current);
        mediaRecorderRef.current = recorder;
        const chunks: Blob[] = [];
        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            setVideoBlobUrl(URL.createObjectURL(blob));
        };
        recorder.start();
        setIsRecording(true);
        setRecordingTime(0);
        recordingIntervalRef.current = window.setInterval(() => setRecordingTime(t => t + 1), 1000);
    };
    
    const stopVideoRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if(recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
        }
    };

    const handleSendVideo = () => {
        if (!videoBlobUrl) return;
        addMessageToState({ id: `msg-${Date.now()}`, senderId: currentUserId, type: 'video', videoUrl: videoBlobUrl, timestamp: new Date().toISOString() });
        setIsVideoMode(false);
        setVideoBlobUrl(null);
    };

    const handleSendTextMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim() === '') return;
        addMessageToState({ id: `msg-${Date.now()}`, senderId: currentUserId, type: 'text', text: inputText, timestamp: new Date().toISOString() });
        setInputText('');
    };
    
    if (isVideomode) {
        return (
            <div className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center">
                <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 text-white bg-red-500 px-2 py-0.5 rounded text-xs font-mono flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse"></div>
                    REC {formatTime(recordingTime)}
                </div>
                <div className="absolute bottom-6 inset-x-0 flex justify-around items-center">
                    <button onClick={() => { setIsVideoMode(false); setVideoBlobUrl(null); }} className="text-white">
                        <XCircleIcon className="w-8 h-8"/>
                    </button>
                    {isRecording ? (
                        <button onClick={stopVideoRecording} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <StopIcon className="w-10 h-10 text-red-500"/>
                        </button>
                    ) : videoBlobUrl ? (
                         <button disabled className="w-20 h-20 bg-gray-400 rounded-full border-4 border-white"></button>
                    ) : (
                         <button onClick={startVideoRecording} className="w-20 h-20 bg-red-500 rounded-full border-4 border-white shadow-lg"></button>
                    )}
                    {videoBlobUrl ? (
                        <button onClick={handleSendVideo} className="p-4 bg-green-500 rounded-full text-white shadow-lg">
                            <SendIcon className="w-6 h-6"/>
                        </button>
                    ) : (
                        <div className="w-14 h-14"></div> // placeholder
                    )}
                </div>
                {videoBlobUrl && (
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <video src={videoBlobUrl} controls autoPlay className="w-full max-w-sm rounded-lg" />
                    </div>
                )}
            </div>
        );
    }
    
    return (
        <div className="flex flex-col h-full bg-gray-100">
            <div ref={chatContainerRef} className="flex-grow p-4 space-y-2 overflow-y-auto">
                {messages.map((msg) => {
                    const isCurrentUser = msg.senderId === currentUserId;
                    return (
                        <div key={msg.id} className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-3 py-2 rounded-2xl shadow ${isCurrentUser ? `${theme.mainBg} text-white` : 'bg-white text-gray-800'}`}>
                               {msg.type === 'video' && msg.videoUrl ? (
                                   <video src={msg.videoUrl} controls className="w-full rounded-lg" style={{maxWidth: '250px'}} />
                               ) : msg.type === 'audio' && msg.audioUrl ? (
                                   <AudioPlayer src={msg.audioUrl} themeColor={theme.mainBg} isCurrentUser={isCurrentUser} />
                               ) : (
                                   <p>{msg.text}</p>
                               )}
                            </div>
                            <span className="text-xs text-gray-400 px-2 mt-1">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSendTextMessage} className="flex items-center space-x-2">
                    <button type="button" onClick={() => setIsVideoMode(true)} className="p-2 text-gray-500 hover:text-gray-800"><VideoIcon/></button>
                    <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type a message..." className={`flex-grow px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 ${theme.iconColor.replace('text-','focus:ring-')}`} />
                    {inputText ? (
                         <button type="submit" className={`p-3 rounded-full text-white ${theme.mainBg}`}><SendIcon className="w-5 h-5"/></button>
                    ) : (
                        <button type="button" className="p-2 text-gray-500 hover:text-gray-800"><MicrophoneIcon /></button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ChatScreen;
