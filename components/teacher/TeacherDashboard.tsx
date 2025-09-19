
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { DashboardType, Teacher } from '../../types';
import { THEME_CONFIG } from '../../constants';
import Header from '../ui/Header';
import { TeacherBottomNav } from '../ui/DashboardBottomNav';
import { mockNotifications, mockTeachers } from '../../data';

// Lazy load all view components
const GlobalSearchScreen = lazy(() => import('../shared/GlobalSearchScreen'));
const TeacherOverview = lazy(() => import('../teacher/TeacherOverview'));
const ClassDetailScreen = lazy(() => import('../teacher/ClassDetailScreen'));
const StudentProfileScreen = lazy(() => import('../teacher/StudentProfileScreen'));
const TeacherExamManagement = lazy(() => import('../teacher/TeacherExamManagement'));
const LibraryScreen = lazy(() => import('../shared/LibraryScreen'));
const PhotoGalleryScreen = lazy(() => import('../teacher/PhotoGalleryScreen'));
const AddExamScreen = lazy(() => import('../admin/AddExamScreen'));
const CreateAssignmentScreen = lazy(() => import('../teacher/CreateAssignmentScreen'));
const TeacherAssignmentsListScreen = lazy(() => import('../teacher/TeacherAssignmentsListScreen'));
const ClassAssignmentsScreen = lazy(() => import('../teacher/ClassAssignmentsScreen'));
const AssignmentSubmissionsScreen = lazy(() => import('../teacher/AssignmentSubmissionsScreen'));
const GradeSubmissionScreen = lazy(() => import('../teacher/GradeSubmissionScreen'));
const CurriculumScreen = lazy(() => import('../shared/CurriculumScreen'));
const TeacherCurriculumSelectionScreen = lazy(() => import('../teacher/TeacherCurriculumSelectionScreen'));
const GradeEntryScreen = lazy(() => import('../teacher/GradeEntryScreen'));
const TeacherMessagesScreen = lazy(() => import('../teacher/TeacherMessagesScreen'));
const TeacherCommunicationScreen = lazy(() => import('../teacher/TeacherCommunicationScreen'));
const CalendarScreen = lazy(() => import('../shared/CalendarScreen'));
const ReportCardInputScreen = lazy(() => import('../teacher/ReportCardInputScreen'));
const CollaborationForumScreen = lazy(() => import('../teacher/CollaborationForumScreen'));
const ForumTopicScreen = lazy(() => import('../teacher/ForumTopicScreen'));
const TimetableScreen = lazy(() => import('../shared/TimetableScreen'));
const ChatScreen = lazy(() => import('../shared/ChatScreen'));
const TeacherReportsScreen = lazy(() => import('../teacher/TeacherReportsScreen'));
const TeacherSettingsScreen = lazy(() => import('../teacher/TeacherSettingsScreen'));
const EditTeacherProfileScreen = lazy(() => import('../teacher/EditTeacherProfileScreen'));
const TeacherNotificationSettingsScreen = lazy(() => import('../teacher/TeacherNotificationSettingsScreen'));
const TeacherSecurityScreen = lazy(() => import('../teacher/TeacherSecurityScreen'));
const TeacherChangePasswordScreen = lazy(() => import('../teacher/TeacherChangePasswordScreen'));
const NewChatScreen = lazy(() => import('../teacher/NewChatScreen'));
const TeacherReportCardPreviewScreen = lazy(() => import('../teacher/TeacherReportCardPreviewScreen'));
const NotificationsScreen = lazy(() => import('../shared/NotificationsScreen'));
const TeacherSelectClassForAttendance = lazy(() => import('../teacher/TeacherUnifiedAttendanceScreen'));
const TeacherMarkAttendanceScreen = lazy(() => import('../teacher/TeacherAttendanceScreen'));
const LessonPlannerScreen = lazy(() => import('../teacher/LessonPlannerScreen'));
const LessonPlanDetailScreen = lazy(() => import('../teacher/LessonPlanDetailScreen'));
const DetailedLessonNoteScreen = lazy(() => import('../teacher/DetailedLessonNoteScreen'));
const SelectTermForReportScreen = lazy(() => import('../teacher/SelectTermForReportScreen'));
const ProfessionalDevelopmentScreen = lazy(() => import('../teacher/ProfessionalDevelopmentScreen'));
const AIPerformanceSummaryScreen = lazy(() => import('../teacher/AIPerformanceSummaryScreen'));
const EducationalGamesScreen = lazy(() => import('../teacher/EducationalGamesScreen'));
const LessonContentScreen = lazy(() => import('../teacher/LessonContentScreen'));
const AssignmentViewScreen = lazy(() => import('../teacher/AssignmentViewScreen'));
const AIGameCreatorScreen = lazy(() => import('../teacher/AIGameCreatorScreen'));
const GamePlayerScreen = lazy(() => import('../shared/GamePlayerScreen'));

const DashboardSuspenseFallback = () => (
    <div className="flex justify-center items-center h-full p-8 pt-20">
      <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-purple-600 rounded-full animate-spin"></div>
    </div>
  );

interface ViewStackItem {
  view: string;
  props?: any;
  title: string;
}

interface TeacherDashboardProps {
    onLogout: () => void;
    setIsHomePage: (isHome: boolean) => void;
}

const LOGGED_IN_TEACHER_ID = 2;

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onLogout, setIsHomePage }) => {
  const [viewStack, setViewStack] = useState<ViewStackItem[]>([{ view: 'overview', title: 'Teacher Dashboard', props: {} }]);
  const [activeBottomNav, setActiveBottomNav] = useState('home');
  const [version, setVersion] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const forceUpdate = () => setVersion(v => v + 1);

  useEffect(() => {
    const currentView = viewStack[viewStack.length - 1];
    setIsHomePage(currentView.view === 'overview' && !isSearchOpen);
  }, [viewStack, isSearchOpen, setIsHomePage]);

  const notificationCount = mockNotifications.filter(n => !n.isRead && n.audience.includes('teacher')).length;

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
    let props = {};
    switch(screen) {
        case 'home':
            setViewStack([{ view: 'overview', title: 'Teacher Dashboard', props }]);
            break;
        case 'reports':
             setViewStack([{ view: 'reports', title: 'Student Reports', props }]);
            break;
        case 'forum':
            setViewStack([{ view: 'collaborationForum', title: 'Collaboration Forum', props: {} }]);
            break;
        case 'messages':
            setViewStack([{ view: 'messages', title: 'Messages', props: {} }]);
            break;
        case 'settings':
            setViewStack([{ view: 'settings', props, title: 'Settings' }]);
            break;
        default:
            setViewStack([{ view: 'overview', title: 'Teacher Dashboard', props }]);
     }
  };

  const handleNotificationClick = () => {
    navigateTo('notifications', 'Notifications', {});
  };

  const viewComponents = React.useMemo(() => ({
    overview: TeacherOverview,
    classDetail: ClassDetailScreen,
    studentProfile: StudentProfileScreen,
    examManagement: TeacherExamManagement,
    selectClassForAttendance: TeacherSelectClassForAttendance,
    markAttendance: TeacherMarkAttendanceScreen,
    library: LibraryScreen,
    gallery: PhotoGalleryScreen,
    calendar: CalendarScreen,
    addExam: AddExamScreen,
    createAssignment: CreateAssignmentScreen,
    assignmentsList: TeacherAssignmentsListScreen,
    classAssignments: ClassAssignmentsScreen,
    assignmentSubmissions: AssignmentSubmissionsScreen,
    gradeSubmission: GradeSubmissionScreen,
    curriculumSelection: TeacherCurriculumSelectionScreen,
    curriculum: CurriculumScreen,
    gradeEntry: GradeEntryScreen,
    messages: TeacherMessagesScreen,
    newChat: NewChatScreen,
    communication: TeacherCommunicationScreen,
    reportCardInput: ReportCardInputScreen,
    collaborationForum: CollaborationForumScreen,
    forumTopic: ForumTopicScreen,
    timetable: (props: any) => <TimetableScreen {...props} context={{ userType: 'teacher', userId: LOGGED_IN_TEACHER_ID }} />,
    chat: (props: any) => <ChatScreen {...props} currentUserId={2} />,
    reports: TeacherReportsScreen,
    reportCardPreview: TeacherReportCardPreviewScreen,
    settings: TeacherSettingsScreen,
    editTeacherProfile: EditTeacherProfileScreen,
    teacherNotificationSettings: TeacherNotificationSettingsScreen,
    teacherSecurity: TeacherSecurityScreen,
    teacherChangePassword: TeacherChangePasswordScreen,
    lessonPlanner: LessonPlannerScreen,
    lessonPlanDetail: LessonPlanDetailScreen,
    lessonContent: LessonContentScreen,
    assignmentView: AssignmentViewScreen,
    detailedLessonNote: DetailedLessonNoteScreen,
    notifications: (props: any) => <NotificationsScreen {...props} userType="teacher" />,
    selectTermForReport: SelectTermForReportScreen,
    professionalDevelopment: ProfessionalDevelopmentScreen,
    aiPerformanceSummary: AIPerformanceSummaryScreen,
    educationalGames: EducationalGamesScreen,
    aiGameCreator: AIGameCreatorScreen,
    gamePlayer: GamePlayerScreen,
  }), []);

  const currentNavigation = viewStack[viewStack.length - 1];
  const ComponentToRender = viewComponents[currentNavigation.view as keyof typeof viewComponents];
  
  const commonProps = {
    navigateTo,
    handleBack,
    onLogout,
    forceUpdate,
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 relative">
       <Header
        title={currentNavigation.title}
        avatarUrl="https://i.pravatar.cc/150?u=teacher"
        bgColor={THEME_CONFIG[DashboardType.Teacher].mainBg}
        onLogout={onLogout}
        onBack={viewStack.length > 1 ? handleBack : undefined}
        onNotificationClick={handleNotificationClick}
        notificationCount={notificationCount}
        onSearchClick={() => setIsSearchOpen(true)}
      />
      <div className="flex-grow overflow-y-auto" style={{marginTop: '-5rem'}}>
        <main className="min-h-full pt-20">
            <Suspense fallback={<DashboardSuspenseFallback />}>
                <div key={`${viewStack.length}-${version}`} className="animate-slide-in-up">
                {ComponentToRender ? (
                    <ComponentToRender {...currentNavigation.props} {...commonProps} />
                ) : (
                    <div className="p-6">View not found: {currentNavigation.view}</div>
                )}
                </div>
            </Suspense>
        </main>
      </div>
      <TeacherBottomNav activeScreen={activeBottomNav} setActiveScreen={handleBottomNavClick} />
      <Suspense>
        {isSearchOpen && (
            <GlobalSearchScreen 
                dashboardType={DashboardType.Teacher}
                navigateTo={navigateTo}
                onClose={() => setIsSearchOpen(false)}
            />
        )}
      </Suspense>
    </div>
  );
};

export default TeacherDashboard;
