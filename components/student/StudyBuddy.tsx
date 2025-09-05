
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CameraIcon } from '../../constants';
import { THEME_CONFIG } from '../../constants';
import { DashboardType } from '../../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const StudyBuddy: React.FC = () => {
    const theme = THEME_CONFIG[DashboardType.Student];
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: "Hello! I'm your Study Buddy. Ask me anything about your school subjects, or upload a picture of a problem you're stuck on." }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: 'You are a friendly and encouraging study buddy for a high school student. Help them understand concepts without giving away the direct answer. Use simple language and lots of examples. Format your responses with markdown.',
            },
        });
    }, []);

    useEffect(() => {
        chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    }, [messages]);

    const handleSendMessage = useCallback(async (text: string, imageFile?: File) => {
        if (!text && !imageFile) return;

        setIsLoading(true);
        setInputText('');
        
        const userMessage: Message = { role: 'user', text };
        setMessages(prev => [...prev, userMessage]);
        
        // Add a placeholder for the model's response, which will be populated by the stream
        setMessages(prev => [...prev, { role: 'model', text: '' }]);

        try {
            if (!chatRef.current) {
                throw new Error("Chat not initialized");
            }

            const parts = [];
            if (imageFile) {
                const imagePart = await fileToGenerativePart(imageFile);
                parts.push(imagePart);
            }
            if (text) {
                parts.push({ text });
            }

            const stream = await chatRef.current.sendMessageStream({ message: parts });

            for await (const chunk of stream) {
                const chunkText = chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text += chunkText;
                    return newMessages;
                });
            }

        } catch (error) {
            console.error(error);
            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1].text = "Sorry, something went wrong. Please try again.";
              return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(inputText);
    };

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleSendMessage("Can you help me with this problem?", file);
        }
    };
    
    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Chat Area */}
            <div ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl shadow ${msg.role === 'user' ? `${theme.mainBg} text-white` : 'bg-white text-gray-800'}`}>
                           <div className="prose prose-sm max-w-none prose-p:my-2 prose-headings:my-2">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {msg.text || '...'}
                                </ReactMarkdown>
                           </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <button type="button" onClick={handleCameraClick} className="p-2 text-gray-500 hover:text-orange-500" aria-label="Upload image">
                        <CameraIcon className="h-6 w-6" />
                    </button>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow px-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !inputText} className={`px-4 py-2 rounded-full font-semibold text-white ${theme.mainBg} disabled:bg-orange-300 transition-colors`}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudyBuddy;
