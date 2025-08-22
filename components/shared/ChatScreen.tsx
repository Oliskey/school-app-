import React, { useState, useRef, useEffect } from 'react';
import { Conversation, Message } from '../../types';

interface ChatScreenProps {
  conversation: Conversation;
  currentUserId: number;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ conversation, currentUserId }) => {
    const [messages, setMessages] = useState<Message[]>(conversation.messages);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim() === '') return;
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: currentUserId,
            text: inputText,
            timestamp: new Date().toISOString(),
        };
        // This is a mock implementation. It just updates local state.
        setMessages([...messages, newMessage]);
        setInputText('');
    };

    return (
        <div className="flex flex-col h-full bg-gray-100">
            {/* Chat Area */}
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {messages.map((msg) => {
                    const isCurrentUser = msg.senderId === currentUserId;
                    return (
                        <div key={msg.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl shadow ${isCurrentUser ? 'bg-sky-500 text-white' : 'bg-white text-gray-800'}`}>
                                <p>{msg.text}</p>
                                <p className={`text-xs mt-1 ${isCurrentUser ? 'text-sky-100' : 'text-gray-400'} text-right`}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow px-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                    <button type="submit" disabled={!inputText.trim()} className="px-4 py-2 rounded-full font-semibold text-white bg-sky-500 disabled:bg-sky-300 transition-colors">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatScreen;
