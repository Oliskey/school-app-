import React, { useState, useMemo } from 'react';
import { Conversation } from '../../types';
import { mockConversations } from '../../data';
import { SearchIcon, PlusIcon } from '../../constants';
import { THEME_CONFIG } from '../../constants';
import { DashboardType } from '../../types';

const formatDistanceToNow = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days === 1) return 'Yesterday';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
};

const RoleTag: React.FC<{ role: Conversation['participant']['role'] }> = ({ role }) => {
    const roleColors = {
        Parent: 'bg-green-100 text-green-800',
        Student: 'bg-orange-100 text-orange-800',
        Teacher: 'bg-purple-100 text-purple-800',
    };
    return <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${roleColors[role]}`}>{role}</span>;
}

interface StudentMessagesScreenProps {
  navigateTo: (view: string, title: string, props?: any) => void;
}

const StudentMessagesScreen: React.FC<StudentMessagesScreenProps> = ({ navigateTo }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const theme = THEME_CONFIG[DashboardType.Student];

    const filteredConversations = useMemo(() => {
        // For student (Fatima Bello, ID 4), filter conversations where she is a participant.
        // This logic is slightly mocked as we don't have a true multi-user context.
        // We'll assume the mockConversations are already tailored for Fatima.
        return mockConversations
            .filter(convo => convo.participant.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime());
    }, [searchTerm]);

    return (
        <div className="flex flex-col h-full bg-gray-50 relative">
            {/* Search Bar */}
            <div className="p-4 bg-gray-50/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon className="text-gray-400" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        aria-label="Search messages"
                    />
                </div>
            </div>

            {/* Conversation List */}
            <main className="flex-grow overflow-y-auto">
                <ul className="divide-y divide-gray-100">
                    {filteredConversations.map(convo => (
                        <li key={convo.id}>
                            <button
                                onClick={() => navigateTo('chat', convo.participant.name, { conversation: convo })}
                                className="w-full text-left p-4 flex items-center space-x-4 hover:bg-orange-50/50 transition-colors"
                            >
                                <div className="relative flex-shrink-0">
                                    <img src={convo.participant.avatarUrl} alt={convo.participant.name} className="w-14 h-14 rounded-full object-cover" />
                                    {convo.unreadCount > 0 && (
                                        <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 border-2 border-white text-white text-[10px] flex items-center justify-center font-bold">
                                            {convo.unreadCount > 9 ? '9+' : convo.unreadCount}
                                        </span>
                                    )}
                                </div>
                                <div className="flex-grow overflow-hidden">
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-gray-800 truncate">{convo.participant.name}</p>
                                        <p className="text-xs text-gray-500 flex-shrink-0 ml-2">{formatDistanceToNow(convo.lastMessage.timestamp)}</p>
                                    </div>
                                    <div className="flex justify-between items-start mt-1">
                                        <p className={`text-sm text-gray-600 truncate ${convo.unreadCount > 0 ? 'font-bold' : 'font-normal'}`}>
                                            {convo.lastMessage.text}
                                        </p>
                                    </div>
                                     <div className="mt-1.5">
                                        <RoleTag role={convo.participant.role} />
                                     </div>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </main>

            {/* New Message FAB */}
            <div className="absolute bottom-6 right-6">
                <button
                    onClick={() => navigateTo('newMessage', 'New Message', {})}
                    className={`p-4 rounded-full shadow-lg text-white transition-transform transform hover:scale-110 ${theme.mainBg}`}
                    aria-label="New message"
                >
                    <PlusIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default StudentMessagesScreen;
