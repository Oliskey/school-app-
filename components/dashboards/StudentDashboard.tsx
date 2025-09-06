
import React, { useState, useMemo, useEffect } from 'react';
import { DashboardType, Student, StudentAssignment } from '../../types';
import { THEME_CONFIG, ClockIcon, ClipboardListIcon, BellIcon, ChartBarIcon, ChevronRightIcon, SUBJECT_COLORS, BookOpenIcon, MegaphoneIcon, AttendanceSummaryIcon, CalendarIcon, ElearningIcon, StudyBuddyIcon, SparklesIcon, ReceiptIcon, AwardIcon, HelpIcon, GameControllerIcon } from '../../constants';
import Header from '../ui/Header';
import { StudentBottomNav } from '../ui/DashboardBottomNav';
import { mockStudents, mockTimetableData, mockAssignments, mockSubmissions, mockNotices, mockNotifications } from '../../data';
import AdventureQuestHost from '../student/adventure/AdventureQuestHost';
import ErrorBoundary from '../ui/ErrorBoundary';

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
import NewMessageScreen from '../student/NewMessageScreen';
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
import GamesHubScreen from '../student/games/GamesHubScreen';
import MathSprintLobbyScreen from '../student/games/MathSprintLobbyScreen';
import MathSprintGameScreen from '../student/games/MathSprintGameScreen';
import MathSprintResultsScreen from '../student/games/MathSprintResultsScreen';

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
        { label: 'Games', icon: <GameControllerIcon />, action: () => navigateTo('gamesHub', 'Games Hub') },
        { label: 'Assignments', icon: <ClipboardListIcon />, action: () => navigateTo('assignments', 'Assignments', { studentId: loggedInStudent.id }) },
    ];

    return (
        <div className="p-3 space-y-4 bg-gray-50">
            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-2 text-center">
                {quickAccessItems.map(item => (
                     <button key={item.label} onClick={item.action} className={`${theme.cardBg} p-2 rounded-xl shadow-sm flex flex-col items-center justify-center space-y-1 hover:bg-orange-200 transition-colors`}>
                        <div className={theme.iconColor}>{React.cloneElement(item.icon, { className: 'h-5 w-5' })}</div>
                        <span className={`font-semibold ${theme.textColor} text-center text-xs`}>{item.label}</span>
                    </button>
                ))}
            </div>
            
            <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-3 rounded-xl shadow-lg flex items-center justify-between text-white">
                <div>
                    <h3 className="font-bold text-base">AI Adventure Quest</h3>
                    <p className="text-xs opacity-90">Turn text into a fun quiz!</p>
                </div>
                <button onClick={() => navigateTo('adventureQuest', 'AI Adventure Quest', {})} className="bg-white/20 px-3 py-1.5 rounded-md font-semibold hover:bg-white/30 transition-colors flex items-center space-x-1">
                    <SparklesIcon className="h-4 w-4"/>
                    <span className="text-sm">Start</span>
                </button>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg flex items-center justify-between text-white">
                <div>
                    <h3 className="font-bold text-base">AI Study Buddy</h3>
                    <p className="text-xs opacity-90">Stuck on a problem? Ask me!</p>
                </div>
                <button onClick={() => navigateTo('studyBuddy', 'Study Buddy')} className="bg-white/20 px-3 py-1.5 rounded-md font-semibold hover:bg-white/30 transition-colors flex items-center space-x-1">
                    <SparklesIcon className="h-4 w-4"/>
                    <span className="text-sm">Start</span>
                </button>
            </div>
            
            <button 
                onClick={() => navigateTo('subjects', 'My Subjects')}
                className="w-full bg-white p-3 rounded-lg shadow-sm flex justify-between items-center hover:bg-orange-50 transition-colors"
            >
                <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                        <BookOpenIcon className="h-5 w-5 text-orange-600"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-sm">My Subjects</h3>
                        <p className="text-xs text-gray-500">View courses and materials</p>
                    </div>
                </div>
                <ChevronRightIcon className="text-gray-400 h-5 w-5"/>
            </button>

            {/* Today's Schedule */}
            <div>
                 <h3 className="text-base font-bold text-gray-800 mb-2 px-1">Today's Schedule</h3>
                 <div className="bg-white p-3 rounded-lg shadow-sm space-y-2">
                    {todaySchedule.length > 0 ? todaySchedule.map((entry, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <div className="w-14 text-right">
                                <p className="font-semibold text-xs text-gray-700">{entry.startTime}</p>
                            </div>
                            <div className={`w-1 h-8 rounded-full ${SUBJECT_COLORS[entry.subject]}`}></div>
                            <p className="font-semibold text-gray-800 text-sm">{entry.subject}</p>
                        </div>
                    )) : <p className="text-center text-gray-500 text-sm">No classes scheduled for today.</p>}
                </div>
            </div>

            {/* Upcoming Assignments */}
            <div>
                 <h3 className="text-base font-bold text-gray-800 mb-2 px-1">Upcoming Assignments</h3>
                 <div className="space-y-2">
                    {upcomingAssignments.map(hw => (
                        <div key={hw.id} className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-800 text-sm">{hw.title}</p>
                                <p className="text-xs text-gray-500">{hw.subject} &bull; Due {new Date(hw.dueDate).toLocaleDateString('en-GB')}</p>
                            </div>
                            <ChevronRightIcon className="text-gray-400 h-5 w-5"/>
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
        const currentView = viewStack[viewStack.length - 1];
        setIsHomePage(currentView.view === 'overview');
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
            case 'results':
                setViewStack([{ view: 'results', title: 'Academic Performance', props: { studentId: loggedInStudent.id } }]);
                break;
            case 'games':
                setViewStack([{ view: 'gamesHub', title: 'Games Hub' }]);
                break;
            case 'messages':
                setViewStack([{ view: 'messages', title: 'Messages' }]);
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
        adventureQuest: AdventureQuestHost,
        examSchedule: ExamSchedule,
        noticeboard: (props: any) => <NoticeboardScreen {...props} userType="student" />,
        calendar: CalendarScreen,
        library: LibraryScreen,
        curriculum: CurriculumScreen,
        timetable: (props) => <TimetableScreen {...props} context={{ userType: 'student', userId: loggedInStudent.id }} />,
        assignments: AssignmentsScreen,
        subjects: SubjectsScreen,
        classroom: ClassroomScreen,
        attendance: AttendanceScreen,
        results: ResultsScreen,
        finances: StudentFinanceScreen,
        achievements: AchievementsScreen,
        messages: StudentMessagesScreen,
        newMessage: NewMessageScreen,
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
        gamesHub: GamesHubScreen,
        mathSprintLobby: MathSprintLobbyScreen,
        mathSprintGame: MathSprintGameScreen,
        mathSprintResults: MathSprintResultsScreen,
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
            <div className="flex-grow overflow-y-auto h-full" style={{marginTop: '-4rem'}}>
                <div className="pt-16 h-full">
{/* FIX: This error was caused by incorrect state handling in the ErrorBoundary component. The fix has been applied to ErrorBoundary.tsx, and this component now functions correctly without changes. */}
                    <ErrorBoundary>
                        <div key={viewStack.length} className="animate-slide-in-up h-full">
                            {ComponentToRender ? (
                                <ComponentToRender {...currentNavigation.props} studentId={loggedInStudent.id} navigateTo={navigateTo} handleBack={handleBack} />
                            ) : (
                                <div className="p-6">View not found: {currentNavigation.view}</div>
                            )}
                        </div>
                    </ErrorBoundary>
                </div>
            </div>
            <StudentBottomNav activeScreen={activeBottomNav} setActiveScreen={handleBottomNavClick} />
        </div>
    );
};

export default StudentDashboard;