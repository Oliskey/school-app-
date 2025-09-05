
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SparklesIcon } from '../../constants';
import { THEME_CONFIG } from '../../constants';
import { DashboardType } from '../../types';
import Header from '../ui/Header';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AIChatScreenProps {
    dashboardType: DashboardType;
    onBack: () => void;
}

const AIChatScreen: React.FC<AIChatScreenProps> = ({ dashboardType, onBack }) => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: `Hello! I'm your AI School Assistant. How can I help you navigate the ${dashboardType} dashboard or answer your questions today?` }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const theme = THEME_CONFIG[dashboardType];

    useEffect(() => {
        const systemInstruction = `You are a friendly and helpful AI assistant for the "Smart School App". You are currently helping a user on the ${dashboardType} Dashboard. Your primary role is to answer questions about the app's features for this specific user type. You can also provide general educational assistance. Keep your answers concise, clear, and encouraging. Use markdown for formatting.`;
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: { 
                systemInstruction,
            },
        });
    }, [dashboardType]);

    useEffect(() => {
        chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    }, [messages]);

    const handleSendMessage = useCallback(async (text: string) => {
        if (!text) return;

        setIsLoading(true);
        setInputText('');
        
        const userMessage: Message = { role: 'user', text };
        setMessages(prev => [...prev, userMessage, { role: 'model', text: '' }]);

        try {
            if (!chatRef.current) throw new Error("Chat not initialized");

            const stream = await chatRef.current.sendMessageStream({ message: text });
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

    const getAvatarUrl = () => {
        switch(dashboardType) {
            case DashboardType.Admin: return "https://i.pravatar.cc/150?u=admin";
            case DashboardType.Teacher: return "https://i.pravatar.cc/150?u=teacher";
            case DashboardType.Parent: return "https://i.pravatar.cc/150?u=parent1";
            case DashboardType.Student: return "https://i.pravatar.cc/150?u=fatima";
            default: return "https://i.pravatar.cc/150?u=default";
        }
    }

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <Header
                title="AI Assistant"
                avatarUrl={getAvatarUrl()}
                bgColor={theme.mainBg}
                onBack={onBack}
            />
            <div className="flex-grow flex flex-col overflow-hidden" style={{marginTop: '-4rem'}}>
                <div ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto pt-20">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl shadow ${msg.role === 'user' ? `${theme.mainBg} text-white` : 'bg-white text-gray-800'}`}>
                               <div className="prose prose-sm max-w-none prose-p:my-2 prose-headings:my-2">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                      {msg.text || ''}
                                    </ReactMarkdown>
                               </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && messages[messages.length - 1].role === 'model' && (
                        <div className="flex justify-start">
                            <div className="px-4 py-2 rounded-2xl shadow bg-white text-gray-800">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-white border-t border-gray-200">
                    <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Ask me anything..."
                            className={`flex-grow px-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 ${theme.iconColor.replace('text-', 'focus:ring-')}`}
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !inputText} className={`px-4 py-2 rounded-full font-semibold text-white ${theme.mainBg} disabled:opacity-50 transition-colors`}>
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AIChatScreen;
