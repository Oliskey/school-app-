import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Conversation, Message } from '../../types';
import { THEME_CONFIG } from '../../constants';
import { DashboardType } from '../../types';
import { mockConversations, mockAdminConversations } from '../../data';

interface ChatScreenProps {
  conversation: Conversation;
  currentUserId: number; // 0 for Admin, 2 for Teacher, 4 for Student etc.
}

const ChatScreen: React.FC<ChatScreenProps> = ({ conversation, currentUserId }) => {
    const [messages, setMessages] = useState<Message[]>(conversation.messages);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const dashboardType = useMemo(() => {
      // Simple logic to determine user type from ID for theming
      if (currentUserId === 0) return DashboardType.Admin;
      const teacherIds = [1,2,3,4,5,6,7,8,9,10];
      if (teacherIds.includes(currentUserId)) return DashboardType.Teacher;
      // This is a simplification; a real app would have a more robust role system
      if (currentUserId > 1000) return DashboardType.Parent;
      return DashboardType.Student;
    }, [currentUserId]);
    
    const theme = THEME_CONFIG[dashboardType];

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
        
        // This is a mock implementation. We update both local state and the shared mock data source.
        setMessages([...messages, newMessage]);
        
        // Find and update the correct conversation list
        const allConvos = [...mockConversations, ...mockAdminConversations];
        const convoToUpdate = allConvos.find(c => c.id === conversation.id);
        if (convoToUpdate) {
            convoToUpdate.messages.push(newMessage);
            convoToUpdate.lastMessage = { text: inputText, timestamp: newMessage.timestamp };
        }
        
        setInputText('');
    };

    return (
        <div className="flex flex-col h-full bg-gray-100">
            {/* Chat Area */}
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {messages.map((msg, index) => {
                    const isCurrentUser = msg.senderId === currentUserId;
                    const bubbleStyle = isCurrentUser
                        ? `${theme.mainBg} text-white rounded-br-none`
                        : 'bg-white text-gray-800 rounded-bl-none';
                    
                    return (
                        <div key={msg.id || index} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow ${bubbleStyle}`}>
                                <p className="text-sm">{msg.text}</p>
                                <p className={`text-xs mt-1 ${isCurrentUser ? 'text-white/70' : 'text-gray-400'} text-right`}>
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
                        className={`flex-grow px-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 ${theme.iconColor.replace('text-', 'focus:ring-')}`}
                    />
                    <button type="submit" disabled={!inputText.trim()} className={`px-4 py-2 rounded-full font-semibold text-white ${theme.mainBg} disabled:opacity-50 transition-colors`}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatScreen;
