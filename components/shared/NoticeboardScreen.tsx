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
    <div className={`rounded-xl md:rounded-2xl shadow-md md:shadow-lg border ${styles.border} overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5`}>
      <div className={`${styles.bg} p-4 md:p-6`}>
        {notice.imageUrl && (
            <img src={notice.imageUrl} alt={notice.title} className="w-full h-32 md:h-44 object-cover rounded-lg md:rounded-xl mb-4 md:mb-5 transition-all duration-500 hover:scale-105" />
        )}
        <div className="flex justify-between items-start">
            <h3 className={`font-bold text-xl md:text-2xl ${styles.text}`}>{notice.title}</h3>
            {notice.isPinned && (
                <div className="flex-shrink-0 ml-2 md:ml-3 animate-bounce">
                    <PinIcon className={`w-5 h-5 md:w-7 md:h-7 -rotate-45 ${styles.text}`} />
                </div>
            )}
        </div>
        <p className="text-xs md:text-sm text-gray-700 mt-2 md:mt-3 font-medium">
          {new Date(notice.timestamp).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
      <div className="p-4 md:p-6 bg-white">
        <p className="text-gray-800 leading-relaxed text-sm md:text-base">{notice.content}</p>
      </div>
      <div className="px-4 py-3 md:px-6 md:py-4 bg-gray-50 border-t border-gray-100">
        <span className={`inline-block px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold rounded-full ${styles.bg} ${styles.text} shadow-sm`}>
          {notice.category}
        </span>
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
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-grow p-3 md:p-5 space-y-4 md:space-y-6 overflow-y-auto">
        {relevantNotices.length > 0 ? (
          relevantNotices.map(notice => (
            <NoticeCard key={notice.id} notice={notice} />
          ))
        ) : (
          <div className="text-center py-12 md:py-16 bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg">
            <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 md:mb-5 shadow-sm md:shadow-md">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">No Announcements</h3>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto px-4">There are currently no announcements to display.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NoticeboardScreen;