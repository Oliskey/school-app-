import React, { useState, useEffect } from 'react';
import { DashboardType, Teacher } from '../../types';
import { THEME_CONFIG } from '../../constants';
import Header from '../ui/Header';
import { TeacherBottomNav } from '../ui/DashboardBottomNav';
import { mockNotifications, mockTeachers } from '../../data';
import GlobalSearchScreen from '../shared/GlobalSearchScreen';

// Import all view components
import TeacherOverview from '../teacher/TeacherOverview';
import ClassDetailScreen from '../teacher/ClassDetailScreen';
import StudentProfileScreen from '../teacher/StudentProfileScreen';
import TeacherExamManagement from '../teacher/TeacherExamManagement';
import LibraryScreen from '../shared/LibraryScreen';
import PhotoGalleryScreen from '../teacher/PhotoGalleryScreen';
import AddExamScreen from '../admin/AddExamScreen';
import CreateAssignmentScreen from '../teacher/CreateAssignmentScreen';
import TeacherAssignmentsListScreen from '../teacher/TeacherAssignmentsListScreen';
import ClassAssignmentsScreen from '../teacher/ClassAssignmentsScreen';
import AssignmentSubmissionsScreen from '../teacher/AssignmentSubmissionsScreen';
import GradeSubmissionScreen from '../teacher/GradeSubmissionScreen';
import CurriculumScreen from '../shared/CurriculumScreen';
import TeacherCurriculumSelectionScreen from '../teacher/TeacherCurriculumSelectionScreen';
import GradeEntryScreen from '../teacher/GradeEntryScreen';
import TeacherMessagesScreen from '../teacher/TeacherMessagesScreen';
import TeacherCommunicationScreen from '../teacher/TeacherCommunicationScreen';
import CalendarScreen from '../shared/CalendarScreen';
import ReportCardInputScreen from '../teacher/ReportCardInputScreen';
import CollaborationForumScreen from '../teacher/CollaborationForumScreen';
import ForumTopicScreen from '../teacher/ForumTopicScreen';
import TimetableScreen from '../shared/TimetableScreen';
import ChatScreen from '../shared/ChatScreen';
import TeacherReportsScreen from '../teacher/TeacherReportsScreen';
import TeacherSettingsScreen from '../teacher/TeacherSettingsScreen';
import EditTeacherProfileScreen from '../teacher/EditTeacherProfileScreen';
import TeacherNotificationSettingsScreen from '../teacher/TeacherNotificationSettingsScreen';
import TeacherSecurityScreen from '../teacher/TeacherSecurityScreen';
import TeacherChangePasswordScreen from '../teacher/TeacherChangePasswordScreen';
import NewChatScreen from '../teacher/NewChatScreen';
import TeacherReportCardPreviewScreen from '../teacher/TeacherReportCardPreviewScreen';
import NotificationsScreen from '../shared/NotificationsScreen';
import TeacherSelectClassForAttendance from '../teacher/TeacherUnifiedAttendanceScreen';
import TeacherMarkAttendanceScreen from '../teacher/TeacherAttendanceScreen';
import LessonPlannerScreen from '../teacher/LessonPlannerScreen';
import LessonPlanDetailScreen from '../teacher/LessonPlanDetailScreen';
import DetailedLessonNoteScreen from '../teacher/DetailedLessonNoteScreen';
import SelectTermForReportScreen from '../teacher/SelectTermForReportScreen';
import ProfessionalDevelopmentScreen from '../teacher/ProfessionalDevelopmentScreen';
import AIPerformanceSummaryScreen from '../teacher/AIPerformanceSummaryScreen';
import EducationalGamesScreen from '../teacher/EducationalGamesScreen';
import LessonContentScreen from '../teacher/LessonContentScreen';
import AssignmentViewScreen from '../teacher/AssignmentViewScreen';


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

  const viewComponents: { [key: string]: React.ComponentType<any> } = {
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
    timetable: (props) => <TimetableScreen {...props} context={{ userType: 'teacher', userId: LOGGED_IN_TEACHER_ID }} />,
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
  };

  const currentNavigation = viewStack[viewStack.length - 1];
  const ComponentToRender = viewComponents[currentNavigation.view];
  
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
      <div className="flex-grow overflow-y-auto">
        <main className="min-h-full">
            <div key={`${viewStack.length}-${version}`} className="animate-slide-in-up">
              {ComponentToRender ? (
                  <ComponentToRender {...currentNavigation.props} {...commonProps} />
              ) : (
                   <div className="p-6">View not found: {currentNavigation.view}</div>
              )}
            </div>
        </main>
      </div>
      <TeacherBottomNav activeScreen={activeBottomNav} setActiveScreen={handleBottomNavClick} />
      {isSearchOpen && (
          <GlobalSearchScreen 
              dashboardType={DashboardType.Teacher}
              navigateTo={navigateTo}
              onClose={() => setIsSearchOpen(false)}
          />
      )}
    </div>
  );
};

export default TeacherDashboard;