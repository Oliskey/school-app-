import React, { useState, useEffect } from 'react';
import Header from '../ui/Header';
import { AdminBottomNav } from '../ui/DashboardBottomNav';
import { mockNotifications } from '../../data';
import { DashboardType } from '../../types';
import GlobalSearchScreen from '../shared/GlobalSearchScreen';

// Import all view components
import DashboardOverview from '../admin/DashboardOverview';
import AnalyticsScreen from '../admin/AnalyticsScreen';
import ClassListScreen from '../admin/ClassListScreen';
import StudentListScreen from '../admin/StudentListScreen';
import AddStudentScreen from '../admin/AddStudentScreen';
import TeacherListScreen from '../admin/TeacherListScreen';
import TeacherPerformanceScreen from '../admin/TeacherPerformanceScreen';
import TimetableEditor from '../admin/TimetableEditor';
import TeacherAttendanceScreen from '../admin/TeacherAttendanceScreen';
import FeeManagement from '../admin/FeeManagement';
import FeeDetailsScreen from '../admin/FeeDetailsScreen';
import ExamManagement from '../admin/ExamManagement';
import AddExamScreen from '../admin/AddExamScreen';
import ReportCardPublishing from '../admin/ReportCardPublishing';
import CalendarScreen from '../shared/CalendarScreen';
import UserRolesScreen from '../admin/UserRolesScreen';
import AuditLogScreen from '../admin/AuditLogScreen';
import ProfileSettings from '../admin/ProfileSettings';
import CommunicationHub from '../admin/CommunicationHub';
import ReportsScreen from '../admin/ReportsScreen';
import StudentProfileAdminView from '../admin/StudentProfileAdminView';
import EditProfileScreen from '../admin/EditProfileScreen';
import NotificationsSettingsScreen from '../admin/NotificationsSettingsScreen';
import SecuritySettingsScreen from '../admin/SecuritySettingsScreen';
import ChangePasswordScreen from '../admin/ChangePasswordScreen';
import NotificationsScreen from '../shared/NotificationsScreen';
import OnlineStoreScreen from '../admin/OnlineStoreScreen';
import AdminSelectClassForReport from '../admin/AdminSelectClassForReport';
import AdminStudentListForReport from '../admin/AdminStudentListForReport';
import AdminStudentReportCardScreen from '../admin/AdminStudentReportCardScreen';
import SystemSettingsScreen from '../admin/SystemSettingsScreen';
import AcademicSettingsScreen from '../admin/AcademicSettingsScreen';
import FinancialSettingsScreen from '../admin/FinancialSettingsScreen';
import CommunicationSettingsScreen from '../admin/CommunicationSettingsScreen';
import BrandingSettingsScreen from '../admin/BrandingSettingsScreen';
import PersonalSecuritySettingsScreen from '../admin/PersonalSecuritySettingsScreen';
import TeacherDetailAdminView from '../admin/TeacherDetailAdminView';
import TeacherAttendanceDetail from '../admin/TeacherAttendanceDetail';
import AttendanceOverviewScreen from '../admin/AttendanceOverviewScreen';
import ClassAttendanceDetailScreen from '../admin/ClassAttendanceDetailScreen';
import AdminSelectTermForReport from '../admin/AdminSelectTermForReport';
import ReportCardInputScreen from '../teacher/ReportCardInputScreen';
import AdminMessagesScreen from '../admin/AdminMessagesScreen';
import AdminNewChatScreen from '../admin/AdminNewChatScreen';
import ChatScreen from '../shared/ChatScreen';
import HealthLogScreen from '../admin/HealthLogScreen';


// Type for navigation stack item
interface ViewStackItem {
  view: string;
  props: any;
  title: string;
}

interface AdminDashboardProps {
    onLogout: () => void;
    setIsHomePage: (isHome: boolean) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, setIsHomePage }) => {
    const [activeBottomNav, setActiveBottomNav] = useState('home');
    const [viewStack, setViewStack] = useState<ViewStackItem[]>([{ view: 'overview', props: {}, title: 'Admin Dashboard' }]);
    const [version, setVersion] = useState(0);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const forceUpdate = () => setVersion(v => v + 1);

    useEffect(() => {
        setIsHomePage(viewStack.length === 1 && !isSearchOpen);
    }, [viewStack, isSearchOpen, setIsHomePage]);

    const notificationCount = mockNotifications.filter(n => !n.isRead && n.audience.includes('admin')).length;

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
        // Reset stack based on bottom nav selection
        switch(screen) {
            case 'home':
                setViewStack([{ view: 'overview', props: {}, title: 'Admin Dashboard' }]);
                break;
            case 'messages':
                setViewStack([{ view: 'adminMessages', props: {}, title: 'Messages' }]);
                break;
            case 'communication':
                setViewStack([{ view: 'communicationHub', props: {}, title: 'Communication Hub' }]);
                break;
            case 'analytics':
                 setViewStack([{ view: 'analytics', props: {}, title: 'School Analytics' }]);
                break;
            case 'settings':
                setViewStack([{ view: 'profileSettings', props: { onLogout }, title: 'Profile Settings' }]);
                break;
            default:
                setViewStack([{ view: 'overview', props: {}, title: 'Admin Dashboard' }]);
        }
    };

    const handleNotificationClick = () => {
        navigateTo('notifications', 'Notifications');
    };

    const viewComponents: { [key: string]: React.ComponentType<any> } = {
        overview: DashboardOverview,
        analytics: AnalyticsScreen,
        reports: ReportsScreen,
        classList: ClassListScreen,
        teacherList: TeacherListScreen,
        timetable: TimetableEditor,
        teacherAttendance: TeacherAttendanceScreen,
        feeManagement: FeeManagement,
        examManagement: ExamManagement,
        reportCardPublishing: ReportCardPublishing,
        schoolCalendar: CalendarScreen,
        userRoles: UserRolesScreen,
        auditLog: AuditLogScreen,
        profileSettings: ProfileSettings,
        studentList: StudentListScreen,
        addStudent: AddStudentScreen,
        teacherPerformance: TeacherPerformanceScreen,
        feeDetails: FeeDetailsScreen,
        addExam: AddExamScreen,
        communicationHub: CommunicationHub,
        studentProfileAdminView: StudentProfileAdminView,
        editProfile: EditProfileScreen,
        notificationsSettings: NotificationsSettingsScreen,
        securitySettings: SecuritySettingsScreen,
        changePassword: ChangePasswordScreen,
        notifications: (props: any) => <NotificationsScreen {...props} userType="admin" />,
        onlineStore: OnlineStoreScreen,
        schoolReports: AdminSelectClassForReport,
        studentListForReport: AdminStudentListForReport,
        viewStudentReport: AdminStudentReportCardScreen,
        // New Settings Screens
        systemSettings: SystemSettingsScreen,
        academicSettings: AcademicSettingsScreen,
        financialSettings: FinancialSettingsScreen,
        communicationSettings: CommunicationSettingsScreen,
        brandingSettings: BrandingSettingsScreen,
        personalSecuritySettings: PersonalSecuritySettingsScreen,
        teacherDetailAdminView: TeacherDetailAdminView,
        teacherAttendanceDetail: TeacherAttendanceDetail,
        // New Attendance Screens
        attendanceOverview: AttendanceOverviewScreen,
        classAttendanceDetail: ClassAttendanceDetailScreen,
        // Report Card Editing
        adminSelectTermForReport: AdminSelectTermForReport,
        adminReportCardInput: (props: any) => <ReportCardInputScreen {...props} isAdmin={true} />,
        // Messaging
        adminMessages: AdminMessagesScreen,
        adminNewChat: AdminNewChatScreen,
        chat: (props: any) => <ChatScreen {...props} currentUserId={0} />,
        healthLog: HealthLogScreen,
    };
    
    const currentNavigation = viewStack[viewStack.length - 1];
    const ComponentToRender = viewComponents[currentNavigation.view];
    
    const commonProps = {
        navigateTo,
        onLogout,
        handleBack,
        forceUpdate,
    };

    return (
        <div className="flex flex-col h-full bg-gray-100 relative">
            <Header
                title={currentNavigation.title}
                avatarUrl="https://i.pravatar.cc/150?u=admin"
                bgColor="bg-indigo-800"
                onLogout={onLogout}
                onBack={viewStack.length > 1 ? handleBack : undefined}
                onNotificationClick={handleNotificationClick}
                notificationCount={notificationCount}
                onSearchClick={() => setIsSearchOpen(true)}
            />
            <div className="flex-grow overflow-y-auto">
                <div key={`${viewStack.length}-${version}`} className="animate-slide-in-up">
                    {ComponentToRender ? <ComponentToRender {...currentNavigation.props} {...commonProps} /> : <div>View not found: {currentNavigation.view}</div>}
                </div>
            </div>
            <AdminBottomNav activeScreen={activeBottomNav} setActiveScreen={handleBottomNavClick} />
            {isSearchOpen && (
                <GlobalSearchScreen 
                    dashboardType={DashboardType.Admin}
                    navigateTo={navigateTo}
                    onClose={() => setIsSearchOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;