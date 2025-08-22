
import React, { useState, useMemo, useEffect } from 'react';
import { DashboardType, Student, StudentAssignment } from '../../types';
import { THEME_CONFIG, ClockIcon, ClipboardListIcon, BellIcon, ChartBarIcon, ChevronRightIcon, SUBJECT_COLORS, BookOpenIcon, MegaphoneIcon, AttendanceSummaryIcon, CalendarIcon, ElearningIcon, StudyBuddyIcon, SparklesIcon, ReceiptIcon, AwardIcon, HelpIcon } from '../../constants';
import Header from '../ui/Header';
import { StudentBottomNav } from '../ui/DashboardBottomNav';
import { mockStudents, mockTimetableData, mockAssignments, mockSubmissions, mockNotices, mockNotifications } from '../../data';

// Import all view components
import StudyBuddy from '../student/StudyBuddy';
import ExamSchedule from '../shared/ExamSchedule';
import NoticeboardScreen from '../shared/NoticeboardScreen';
import CalendarScreen from '../shared/CalendarScreen';
import LibraryScreen from '../shared/LibraryScreen';
import CurriculumScreen from '../shared/CurriculumScreen';
import TimetableScreen from '../shared/TimetableScreen';
import AssignmentsScreen from '../student/AssignmentsScreen';
import SubjectsScreen from '../student/SubjectsScreen';
import ClassroomScreen from '../student/ClassroomScreen';
import AttendanceScreen from '../student/AttendanceScreen';
import ResultsScreen from '../student/ResultsScreen';
import StudentFinanceScreen from '../student/StudentFinanceScreen';
import AchievementsScreen from '../student/AchievementsScreen';
import StudentMessagesScreen from '../student/StudentMessagesScreen';
import StudentProfileScreen from '../student/StudentProfileScreen';
import VideoLessonScreen from '../student/VideoLessonScreen';
import AssignmentSubmissionScreen from '../student/AssignmentSubmissionScreen';
import AssignmentFeedbackScreen from '../student/AssignmentFeedbackScreen';
import AcademicReportScreen from '../student/AcademicReportScreen';
import ChatScreen from '../shared/ChatScreen';
import ExtracurricularsScreen from '../student/ExtracurricularsScreen';
import NotificationsScreen from '../shared/NotificationsScreen';
import QuizzesScreen from '../student/QuizzesScreen';
import QuizPlayerScreen from '../student/QuizPlayerScreen';

interface ViewStackItem {
  view: string;
  props?: any;
  title: string;
}

const loggedInStudent: Student = mockStudents.find(s => s.id === 4)!; // Fatima Bello

const Overview: React.FC<{ navigateTo: (view: string, title: string, props?: any) => void }> = ({ navigateTo }) => {
    const theme = THEME_CONFIG[DashboardType.Student];
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as any;
    const todaySchedule = mockTimetableData
      .filter(e => e.day === today && e.className.includes(`${loggedInStudent.grade}${loggedInStudent.section}`))
      .slice(0, 3);
    
    const upcomingAssignments = useMemo(() => {
        const studentSubmissions = mockSubmissions.filter(s => s.student.id === loggedInStudent.id).map(s => s.assignmentId);
        return mockAssignments
            .filter(a => !studentSubmissions.includes(a.id) && new Date(a.dueDate) > new Date())
            .sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .slice(0, 2);
    }, []);

    const recentAnnouncement = useMemo(() => mockNotices
        .filter(n => n.audience.includes('all') || n.audience.includes('students'))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0], 
    []);

    const quickAccessItems = [
        { label: 'Timetable', icon: <CalendarIcon />, action: () => navigateTo('timetable', 'Timetable') },
        { label: 'Attendance', icon: <AttendanceSummaryIcon />, action: () => navigateTo('attendance', 'My Attendance', { studentId: loggedInStudent.id }) },
        { label: 'Quizzes', icon: <HelpIcon />, action: () => navigateTo('quizzes', 'Gamified Quizzes') },
        { label: 'Assignments', icon: <ClipboardListIcon />, action: () => navigateTo('assignments', 'Assignments', { studentId: loggedInStudent.id }) },
    ];

    return (
        <div className="p-4 space-y-5 bg-gray-50">
            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-3 text-center">
                {quickAccessItems.map(item => (
                     <button key={item.label} onClick={item.action} className={`${theme.cardBg} p-3 rounded-2xl shadow-sm flex flex-col items-center justify-center space-y-2 hover:bg-orange-200 transition-colors`}>
                        <div className={theme.iconColor}>{React.cloneElement(item.icon, { className: 'h-6 w-6' })}</div>
                        <span className={`font-semibold ${theme.textColor} text-center text-xs`}>{item.label}</span>
                    </button>
                ))}
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-2xl shadow-lg flex items-center justify-between text-white">
                <div>
                    <h3 className="font-bold text-lg">AI Study Buddy</h3>
                    <p className="text-sm opacity-90">Stuck on a problem? Ask me!</p>
                </div>
                <button onClick={() => navigateTo('studyBuddy', 'Study Buddy')} className="bg-white/20 px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center space-x-2">
                    <SparklesIcon className="h-5 w-5"/>
                    <span>Start</span>
                </button>
            </div>
            
            <button 
                onClick={() => navigateTo('subjects', 'My Subjects')}
                className="w-full bg-white p-4 rounded-xl shadow-sm flex justify-between items-center hover:bg-orange-50 transition-colors"
            >
                <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                        <BookOpenIcon className="h-6 w-6 text-orange-600"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">My Subjects</h3>
                        <p className="text-sm text-gray-500">View all your courses and materials</p>
                    </div>
                </div>
                <ChevronRightIcon className="text-gray-400"/>
            </button>

            {/* Today's Schedule */}
            <div>
                 <h3 className="text-lg font-bold text-gray-800 mb-2 px-1">Today's Schedule</h3>
                 <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
                    {todaySchedule.length > 0 ? todaySchedule.map((entry, i) => (
                        <div key={i} className="flex items-center space-x-3">
                            <div className="w-16 text-right">
                                <p className="font-semibold text-sm text-gray-700">{entry.startTime}</p>
                            </div>
                            <div className={`w-1 h-10 rounded-full ${SUBJECT_COLORS[entry.subject]}`}></div>
                            <p className="font-semibold text-gray-800">{entry.subject}</p>
                        </div>
                    )) : <p className="text-center text-gray-500">No classes scheduled for today.</p>}
                </div>
            </div>

            {/* Upcoming Assignments */}
            <div>
                 <h3 className="text-lg font-bold text-gray-800 mb-2 px-1">Upcoming Assignments</h3>
                 <div className="space-y-3">
                    {upcomingAssignments.map(hw => (
                        <div key={hw.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-800">{hw.title}</p>
                                <p className="text-sm text-gray-500">{hw.subject} &bull; Due {new Date(hw.dueDate).toLocaleDateString('en-GB')}</p>
                            </div>
                            <ChevronRightIcon className="text-gray-400"/>
                        </div>
                    ))}
                 </div>
            </div>

        </div>
    );
};

interface StudentDashboardProps {
    onLogout: () => void;
    setIsHomePage: (isHome: boolean) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onLogout, setIsHomePage }) => {
    const [viewStack, setViewStack] = useState<ViewStackItem[]>([{ view: 'overview', title: 'Student Dashboard' }]);
    const [activeBottomNav, setActiveBottomNav] = useState('home');
    const notificationCount = mockNotifications.filter(n => !n.isRead && n.audience.includes('student')).length;
    
    useEffect(() => {
        setIsHomePage(viewStack.length === 1);
    }, [viewStack, setIsHomePage]);
    
    const navigateTo = (view: string, title: string, props: any = {}) => {
        setViewStack(stack => [...stack, { view, props, title }]);
    };
    
    const handleBack = () => {
        if (viewStack.length > 1) {
            setViewStack(stack => stack.slice(0, -1));
        }
    };

    const handleBottomNavClick = (screen: string) => {
        setActiveBottomNav(screen);
        switch(screen) {
            case 'home':
                setViewStack([{ view: 'overview', title: 'Student Dashboard' }]);
                break;
            case 'elearning':
                setViewStack([{ view: 'library', title: 'E-Learning Library' }]);
                break;
            case 'activities':
                setViewStack([{ view: 'extracurriculars', title: 'Activities & Events' }]);
                break;
            case 'notifications':
                setViewStack([{ view: 'notifications', title: 'Notifications' }]);
                break;
            case 'profile':
                setViewStack([{ view: 'profile', title: 'My Profile', props: { student: loggedInStudent } }]);
                break;
            default:
                setViewStack([{ view: 'overview', title: 'Student Dashboard' }]);
        }
    };

    const handleNotificationClick = () => {
        navigateTo('notifications', 'Notifications', {});
    };
    
    const viewComponents: { [key: string]: React.ComponentType<any> } = {
        overview: Overview,
        studyBuddy: StudyBuddy,
        examSchedule: ExamSchedule,
        noticeboard: (props: any) => <NoticeboardScreen {...props} userType="student" />,
        calendar: CalendarScreen,
        library: LibraryScreen,
        curriculum: CurriculumScreen,
        timetable: TimetableScreen,
        assignments: AssignmentsScreen,
        subjects: SubjectsScreen,
        classroom: ClassroomScreen,
        attendance: AttendanceScreen,
        results: ResultsScreen,
        finances: StudentFinanceScreen,
        achievements: AchievementsScreen,
        messages: StudentMessagesScreen,
        profile: StudentProfileScreen,
        videoLesson: VideoLessonScreen,
        assignmentSubmission: AssignmentSubmissionScreen,
        assignmentFeedback: AssignmentFeedbackScreen,
        academicReport: AcademicReportScreen,
        chat: (props: any) => <ChatScreen {...props} currentUserId={loggedInStudent.id} />,
        extracurriculars: ExtracurricularsScreen,
        notifications: (props: any) => <NotificationsScreen {...props} userType="student" navigateTo={navigateTo} />,
        quizzes: QuizzesScreen,
        quizPlayer: QuizPlayerScreen,
    };

    const currentNavigation = viewStack[viewStack.length - 1];
    const ComponentToRender = viewComponents[currentNavigation.view];

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <Header
                title={currentNavigation.title}
                avatarUrl={loggedInStudent.avatarUrl}
                bgColor={THEME_CONFIG[DashboardType.Student].mainBg}
                onLogout={onLogout}
                onBack={viewStack.length > 1 ? handleBack : undefined}
                onNotificationClick={handleNotificationClick}
                notificationCount={notificationCount}
            />
            <div className="flex-grow overflow-y-auto" style={{marginTop: '-4rem'}}>
                <div className="pt-16">
                    {ComponentToRender ? (
                        <ComponentToRender {...currentNavigation.props} navigateTo={navigateTo} handleBack={handleBack} />
                    ) : (
                        <div className="p-6">View not found: {currentNavigation.view}</div>
                    )}
                </div>
            </div>
            <StudentBottomNav activeScreen={activeBottomNav} setActiveScreen={handleBottomNavClick} />
        </div>
    );
};

export default StudentDashboard;
