

import React, { useMemo } from 'react';
import { PinIcon } from '../../constants';
import { mockNotices } from '../../data';
import { Notice } from '../../types';

interface NoticeboardScreenProps {
  userType: 'parent' | 'student';
}

const categoryStyles: { [key in Notice['category']]: { bg: string, text: string, border: string } } = {
  Urgent: { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' },
  Event: { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200' },
  Holiday: { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200' },
  General: { bg: 'bg-gray-50', text: 'text-gray-800', border: 'border-gray-200' },
};

const NoticeCard: React.FC<{ notice: Notice }> = ({ notice }) => {
  const styles = categoryStyles[notice.category];

  return (
    <div className={`rounded-xl shadow-sm border ${styles.border} overflow-hidden`}>
      <div className={`${styles.bg} p-4`}>
        {notice.imageUrl && (
            <img src={notice.imageUrl} alt={notice.title} className="w-full h-32 object-cover rounded-lg mb-3" />
        )}
        <div className="flex justify-between items-start">
            <h3 className={`font-bold text-lg ${styles.text}`}>{notice.title}</h3>
            {notice.isPinned && (
                <div className="flex-shrink-0 ml-2">
                    <PinIcon className={`w-5 h-5 -rotate-45 ${styles.text}`} />
                </div>
            )}
        </div>
        <p className="text-sm text-gray-700 mt-1">
          {new Date(notice.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
      <div className="p-4 bg-white">
        <p className="text-gray-800">{notice.content}</p>
      </div>
    </div>
  );
};


const NoticeboardScreen: React.FC<NoticeboardScreenProps> = ({ userType }) => {
  const relevantNotices = useMemo(() => {
    return mockNotices
      .filter(notice => 
          notice.audience.includes('all') || 
          notice.audience.includes(`${userType}s` as 'parents' | 'students')
      )
      .sort((a, b) => {
        // Pinned items first, then by date
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
  }, [userType]);

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <main className="flex-grow p-4 space-y-4 overflow-y-auto">
        {relevantNotices.length > 0 ? (
          relevantNotices.map(notice => (
            <NoticeCard key={notice.id} notice={notice} />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-700">No announcements found.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NoticeboardScreen;