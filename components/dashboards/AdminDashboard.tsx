import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from '../ui/Header';
import { AdminBottomNav } from '../ui/DashboardBottomNav';
import { mockNotifications } from '../../data';
import { DashboardType } from '../../types';

// Lazy load all view components
const GlobalSearchScreen = lazy(() => import('../shared/GlobalSearchScreen'));
const DashboardOverview = lazy(() => import('../admin/DashboardOverview'));
const AnalyticsScreen = lazy(() => import('../admin/AnalyticsScreen'));
const ClassListScreen = lazy(() => import('../admin/ClassListScreen'));
const StudentListScreen = lazy(() => import('../admin/StudentListScreen'));
const AddStudentScreen = lazy(() => import('../admin/AddStudentScreen'));
const TeacherListScreen = lazy(() => import('../admin/TeacherListScreen'));
const TeacherPerformanceScreen = lazy(() => import('../admin/TeacherPerformanceScreen'));
const TimetableEditor = lazy(() => import('../admin/TimetableEditor'));
const TeacherAttendanceScreen = lazy(() => import('../admin/TeacherAttendanceScreen'));
const FeeManagement = lazy(() => import('../admin/FeeManagement'));
const FeeDetailsScreen = lazy(() => import('../admin/FeeDetailsScreen'));
const ExamManagement = lazy(() => import('../admin/ExamManagement'));
const AddExamScreen = lazy(() => import('../admin/AddExamScreen'));
const ReportCardPublishing = lazy(() => import('../admin/ReportCardPublishing'));
const CalendarScreen = lazy(() => import('../shared/CalendarScreen'));
const UserRolesScreen = lazy(() => import('../admin/UserRolesScreen'));
const AuditLogScreen = lazy(() => import('../admin/AuditLogScreen'));
const ProfileSettings = lazy(() => import('../admin/ProfileSettings'));
const CommunicationHub = lazy(() => import('../admin/CommunicationHub'));
const ReportsScreen = lazy(() => import('../admin/ReportsScreen'));
const StudentProfileAdminView = lazy(() => import('../admin/StudentProfileAdminView'));
const EditProfileScreen = lazy(() => import('../admin/EditProfileScreen'));
const NotificationsSettingsScreen = lazy(() => import('../admin/NotificationsSettingsScreen'));
const SecuritySettingsScreen = lazy(() => import('../admin/SecuritySettingsScreen'));
const ChangePasswordScreen = lazy(() => import('../admin/ChangePasswordScreen'));
const NotificationsScreen = lazy(() => import('../shared/NotificationsScreen'));
const OnlineStoreScreen = lazy(() => import('../admin/OnlineStoreScreen'));
const AdminSelectClassForReport = lazy(() => import('../admin/AdminSelectClassForReport'));
const AdminStudentListForReport = lazy(() => import('../admin/AdminStudentListForReport'));
const AdminStudentReportCardScreen = lazy(() => import('../admin/AdminStudentReportCardScreen'));
const SystemSettingsScreen = lazy(() => import('../admin/SystemSettingsScreen'));
const AcademicSettingsScreen = lazy(() => import('../admin/AcademicSettingsScreen'));
const FinancialSettingsScreen = lazy(() => import('../admin/FinancialSettingsScreen'));
const CommunicationSettingsScreen = lazy(() => import('../admin/CommunicationSettingsScreen'));
const BrandingSettingsScreen = lazy(() => import('../admin/BrandingSettingsScreen'));
const PersonalSecuritySettingsScreen = lazy(() => import('../admin/PersonalSecuritySettingsScreen'));
const TeacherDetailAdminView = lazy(() => import('../admin/TeacherDetailAdminView'));
const TeacherAttendanceDetail = lazy(() => import('../admin/TeacherAttendanceDetail'));
const AttendanceOverviewScreen = lazy(() => import('../admin/AttendanceOverviewScreen'));
const ClassAttendanceDetailScreen = lazy(() => import('../admin/ClassAttendanceDetailScreen'));
const AdminSelectTermForReport = lazy(() => import('../admin/AdminSelectTermForReport'));
const ReportCardInputScreen = lazy(() => import('../teacher/ReportCardInputScreen'));
const AdminMessagesScreen = lazy(() => import('../admin/AdminMessagesScreen'));
const AdminNewChatScreen = lazy(() => import('../admin/AdminNewChatScreen'));
const ChatScreen = lazy(() => import('../shared/ChatScreen'));
const HealthLogScreen = lazy(() => import('../admin/HealthLogScreen'));
const TimetableGeneratorScreen = lazy(() => import('../admin/TimetableGeneratorScreen'));
const BusDutyRosterScreen = lazy(() => import('../admin/BusDutyRosterScreen'));

// User Management Screens
const SelectUserTypeToAddScreen = lazy(() => import('../admin/SelectUserTypeToAddScreen'));
const AddTeacherScreen = lazy(() => import('../admin/AddTeacherScreen'));
const AddParentScreen = lazy(() => import('../admin/AddParentScreen'));
const ParentListScreen = lazy(() => import('../admin/ParentListScreen'));
const ParentDetailAdminView = lazy(() => import('../admin/ParentDetailAdminView'));


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

const DashboardSuspenseFallback = () => (
    <div className="flex justify-center items-center h-full p-8 pt-20">
      <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
);

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

    const viewComponents = React.useMemo(() => ({
        overview: DashboardOverview,
        analytics: AnalyticsScreen,
        reports: ReportsScreen,
        classList: ClassListScreen,
        teacherList: TeacherListScreen,
        timetable: TimetableGeneratorScreen,
        timetableEditor: TimetableEditor,
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
        systemSettings: SystemSettingsScreen,
        academicSettings: AcademicSettingsScreen,
        financialSettings: FinancialSettingsScreen,
        communicationSettings: CommunicationSettingsScreen,
        brandingSettings: BrandingSettingsScreen,
        personalSecuritySettings: PersonalSecuritySettingsScreen,
        teacherDetailAdminView: TeacherDetailAdminView,
        teacherAttendanceDetail: TeacherAttendanceDetail,
        attendanceOverview: AttendanceOverviewScreen,
        classAttendanceDetail: ClassAttendanceDetailScreen,
        adminSelectTermForReport: AdminSelectTermForReport,
        adminReportCardInput: (props: any) => <ReportCardInputScreen {...props} isAdmin={true} />,
        adminMessages: AdminMessagesScreen,
        adminNewChat: AdminNewChatScreen,
        chat: (props: any) => <ChatScreen {...props} currentUserId={0} />,
        healthLog: HealthLogScreen,
        busDutyRoster: BusDutyRosterScreen,
        // User Management
        selectUserTypeToAdd: SelectUserTypeToAddScreen,
        addTeacher: AddTeacherScreen,
        addParent: AddParentScreen,
        parentList: ParentListScreen,
        parentDetailAdminView: ParentDetailAdminView,
    }), []);
    
    const currentNavigation = viewStack[viewStack.length - 1];
    const ComponentToRender = viewComponents[currentNavigation.view as keyof typeof viewComponents];
    
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
                 <Suspense fallback={<DashboardSuspenseFallback />}>
                    <div key={`${viewStack.length}-${version}`} className="animate-slide-in-up">
                        {ComponentToRender ? <ComponentToRender {...currentNavigation.props} {...commonProps} /> : <div>View not found: {currentNavigation.view}</div>}
                    </div>
                </Suspense>
            </div>
            <AdminBottomNav activeScreen={activeBottomNav} setActiveScreen={handleBottomNavClick} />
            <Suspense>
                {isSearchOpen && (
                    <GlobalSearchScreen 
                        dashboardType={DashboardType.Admin}
                        navigateTo={navigateTo}
                        onClose={() => setIsSearchOpen(false)}
                    />
                )}
            </Suspense>
        </div>
    );
};

export default AdminDashboard;