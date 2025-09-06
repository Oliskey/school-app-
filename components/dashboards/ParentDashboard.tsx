
import React, { useState, useMemo, useEffect } from 'react';
import { DashboardType, Student, BehaviorNote, StudentAttendance, AttendanceStatus, StudentAssignment } from '../../types';
import { 
    THEME_CONFIG, 
    ChevronRightIcon, 
    BusVehicleIcon, 
    ReceiptIcon, 
    ReportIcon, 
    PhoneIcon, 
    ChartBarIcon, 
    ClipboardListIcon, 
    MegaphoneIcon, 
    AttendanceSummaryIcon,
    ClockIcon,
    BookOpenIcon,
    SUBJECT_COLORS,
    ChevronLeftIcon,
    XCircleIcon,
    TrendingUpIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    StarIcon,
    CalendarIcon,
    CalendarPlusIcon,
    SparklesIcon,
    getFormattedClassName
} from '../../constants';
import Header from '../ui/Header';
import { ParentBottomNav } from '../ui/DashboardBottomNav';
import { 
    mockStudentFees, 
    mockStudents, 
    mockAssignments, 
    mockSubmissions, 
    mockNotices,
    mockStudentAttendance,
    mockTimetableData,
    mockProgressData,
    mockNotifications,
} from '../../data';
import DonutChart from '../ui/DonutChart';


// Import all view components
import ExamSchedule from '../shared/ExamSchedule';
import NoticeboardScreen from '../shared/NoticeboardScreen';
import NotificationsScreen from '../shared/NotificationsScreen';
import CalendarScreen from '../shared/CalendarScreen';
import LibraryScreen from '../shared/LibraryScreen';
import BusRouteScreen from '../shared/BusRouteScreen';
import FeeStatusScreen from '../parent/FeeStatusScreen';
import ReportCardScreen from '../parent/ReportCardScreen';
import SelectChildForReportScreen from '../parent/SelectChildForReportScreen';
import TimetableScreen from '../shared/TimetableScreen';
import ParentProfileScreen from '../parent/ParentProfileScreen';
import EditParentProfileScreen from '../parent/EditParentProfileScreen';
import FeedbackScreen from '../parent/FeedbackScreen';
import ParentNotificationSettingsScreen from '../parent/ParentNotificationSettingsScreen';
import ParentSecurityScreen from '../parent/ParentSecurityScreen';
import LearningResourcesScreen from '../parent/LearningResourcesScreen';
import SchoolPoliciesScreen from '../parent/SchoolPoliciesScreen';
import PTAMeetingScreen from '../parent/PTAMeetingScreen';
import ParentPhotoGalleryScreen from '../parent/ParentPhotoGalleryScreen';
import VolunteeringScreen from '../parent/VolunteeringScreen';
import PermissionSlipScreen from '../parent/PermissionSlipScreen';
import AppointmentScreen from '../parent/AppointmentScreen';
import AIParentingTipsScreen from '../parent/AIParentingTips';


interface ViewStackItem {
  view: string;
  props?: any;
  title: string;
}

const StatItem = ({ icon, label, value, colorClass }: { icon: React.ReactNode, label: string, value: string, colorClass: string }) => (
    <div className="flex items-center space-x-2">
        <div className={`p-1.5 rounded-lg ${colorClass}`}>
            {icon}
        </div>
        <div>
            <p className="text-xs text-gray-700">{label}</p>
            <p className="font-bold text-xs text-gray-800">{value}</p>
        </div>
    </div>
);

const ChildStatCard = ({ data, navigateTo, colorTheme }: { data: any, navigateTo: (view: string, title: string, props?: any) => void, colorTheme: { bg: string, text: string } }) => {
    const { student, feeInfo, nextHomework, recentGrades, attendancePercentage } = data;
    const theme = THEME_CONFIG[DashboardType.Parent];
    const formattedClassName = getFormattedClassName(student.grade, student.section);

    const feeStatus = feeInfo ? `${new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(feeInfo.totalFee - feeInfo.paidAmount)} due ${new Date(feeInfo.dueDate).toLocaleDateString('en-GB', {day:'numeric', month:'short'})}` : "All fees paid";
    
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-2" style={{borderColor: colorTheme.bg}}>
            <div className="p-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img src={student.avatarUrl} alt={student.name} className="w-12 h-12 rounded-full object-cover border" style={{borderColor: colorTheme.bg}}/>
                        <div>
                            <h3 className="font-bold text-base text-gray-800">{student.name}</h3>
                            <p className="text-xs font-semibold" style={{color: colorTheme.text}}>{formattedClassName}</p>
                        </div>
                    </div>
                    <button onClick={() => navigateTo('childDetail', student.name, { student: student })} className="bg-gray-100 p-1.5 rounded-full hover:bg-gray-200">
                        <ChevronRightIcon className="text-gray-600 h-4 w-4"/>
                    </button>
                </div>
            </div>

            <div className="px-3 pb-3 grid grid-cols-2 gap-2">
                <StatItem icon={<AttendanceSummaryIcon className="h-4 w-4 text-green-600"/>} label="Attendance" value={`${attendancePercentage}%`} colorClass="bg-green-100" />
                <StatItem icon={<ReceiptIcon className="h-4 w-4 text-red-600"/>} label="Fees" value={feeStatus} colorClass="bg-red-100" />
                {recentGrades.length > 0 && <StatItem icon={<ChartBarIcon className="h-4 w-4 text-sky-600"/>} label="Grade" value={`${recentGrades[0].subject}: ${recentGrades[0].score}%`} colorClass="bg-sky-100" />}
                {nextHomework && <StatItem icon={<ClipboardListIcon className="h-4 w-4 text-purple-600"/>} label="Homework" value={`${nextHomework.subject} due ${new Date(nextHomework.dueDate).toLocaleDateString('en-GB', {day:'numeric', month:'short'})}`} colorClass="bg-purple-100" />}
            </div>
        </div>
    );
};

const getHomeworkStatus = (assignment: StudentAssignment) => {
    const dueDate = new Date(assignment.dueDate);
    const now = new Date();

    if (assignment.submission) {
        if (assignment.submission.status === 'Graded') {
            return { text: `Graded: ${assignment.submission.grade}/100`, icon: <CheckCircleIcon />, color: 'text-green-600', bg: 'bg-green-50', isComplete: true };
        }
        return { text: 'Submitted', icon: <CheckCircleIcon />, color: 'text-sky-600', bg: 'bg-sky-50', isComplete: true };
    }

    if (dueDate < now) {
        return { text: 'Overdue', icon: <ExclamationCircleIcon />, color: 'text-red-600', bg: 'bg-red-50', isComplete: false };
    }
    return { text: 'Pending', icon: <ClockIcon />, color: 'text-amber-600', bg: 'bg-amber-50', isComplete: false };
};

const AcademicsTab = ({ student, navigateTo }: { student: Student; navigateTo: (view: string, title: string, props?: any) => void }) => {
    const theme = THEME_CONFIG[DashboardType.Parent];

    // Memoized data processing
    const { latestTerm, latestGrades, averageScore, studentHomework, progressReport } = useMemo(() => {
        const publishedReport = student.reportCards?.find(rc => rc.isPublished);

        let term = 'N/A';
        let grades: { subject: string; score: number; teacherRemark?: string; }[] = [];
        let avg = 0;

        if (publishedReport) {
            term = `${publishedReport.term} (${publishedReport.session})`;
            grades = publishedReport.academicRecords.map(r => ({ subject: r.subject, score: r.total, teacherRemark: r.remark }));
            avg = grades.length > 0 ? Math.round(grades.reduce((acc, curr) => acc + curr.score, 0) / grades.length) : 0;
        } else {
            // Fallback to academicPerformance if no published report card
            const term2Grades = student.academicPerformance?.filter(p => p.term === 'Term 2');
            if (term2Grades && term2Grades.length > 0) {
                term = 'Term 2';
                grades = term2Grades;
                avg = Math.round(grades.reduce((acc, curr) => acc + curr.score, 0) / grades.length);
            }
        }
        
        const homework = mockAssignments
            .map(a => ({
                ...a,
                submission: mockSubmissions.find(s => s.assignmentId === a.id && s.student.id === student.id)
            }))
            .filter(a => new Date(a.dueDate) > new Date())
            .sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
            
        const progress = mockProgressData.find(p => p.studentId === student.id);

        return { latestTerm: term, latestGrades: grades, averageScore: avg, studentHomework: homework, progressReport: progress };
    }, [student]);

    return (
        <div className="p-4 space-y-4">
            {/* NEW AI Parenting Tips Button */}
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 rounded-2xl shadow-lg flex items-center justify-between text-white">
                <div>
                    <h3 className="font-bold text-lg">Personalized Advice</h3>
                    <p className="text-sm opacity-90">Get AI-powered tips for your child.</p>
                </div>
                <button 
                    onClick={() => navigateTo('aiParentingTips', 'AI Parenting Tips', { student })} 
                    className="bg-white/20 px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center space-x-2"
                >
                    <SparklesIcon className="h-5 w-5"/>
                    <span>Get Tips</span>
                </button>
            </div>

            {/* Term Performance */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="font-bold text-gray-800">Term Performance</h4>
                        <p className="text-sm text-gray-700">{latestTerm}</p>
                    </div>
                    {averageScore > 0 && (
                        <div className="text-right">
                             <p className="font-bold text-2xl text-green-600">{averageScore}%</p>
                             <p className="text-xs text-gray-700">Overall Average</p>
                        </div>
                    )}
                </div>
                {latestGrades.length > 0 && (
                    <div className="mt-3 space-y-2">
                        {latestGrades.map((grade, i) => (
                            <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                                <span className="font-semibold text-sm text-gray-700">{grade.subject}</span>
                                <span className="font-bold text-sm text-gray-800">{grade.score}%</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Homework */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
                 <h4 className="font-bold text-gray-800 mb-3">Upcoming Homework</h4>
                 <div className="space-y-3">
                    {studentHomework.length > 0 ? studentHomework.map(hw => {
                        const status = getHomeworkStatus(hw);
                        return (
                            <div key={hw.id} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                                <div>
                                    <p className="font-bold text-gray-800">{hw.title}</p>
                                    <p className="text-sm text-gray-700">{hw.subject} &bull; Due {new Date(hw.dueDate).toLocaleDateString('en-GB')}</p>
                                </div>
                                <div className={`flex items-center space-x-2 text-xs font-semibold px-2 py-1 rounded-full ${status.bg} ${status.color}`}>
                                    {React.cloneElement(status.icon, {className: `h-4 w-4 ${status.isComplete ? 'animate-checkmark-pop' : ''}`.trim()})}
                                    <span>{status.text}</span>
                                </div>
                            </div>
                        );
                    }) : <p className="text-sm text-gray-700 text-center">No upcoming homework.</p>}
                 </div>
            </div>

            {/* AI Generated Progress Report */}
            {progressReport && (
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-2 mb-3">
                        <SparklesIcon className="text-green-500"/>
                        <h4 className="font-bold text-gray-800">AI Progress Insights</h4>
                    </div>
                     <div className="space-y-3 text-sm">
                        <div>
                            <h5 className="font-semibold text-green-700 mb-1">Strengths</h5>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {progressReport.strengths.map((s,i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold text-amber-700 mb-1">Areas for Improvement</h5>
                             <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {progressReport.areasForImprovement.map((s,i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const BehaviorTab = ({ student }: { student: Student }) => {
    return (
        <div className="p-4 space-y-4">
            {student.behaviorNotes && student.behaviorNotes.length > 0 ? [...student.behaviorNotes].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(note => {
                const isPositive = note.type === 'Positive';
                return (
                    <div key={note.id} className={`p-4 rounded-xl border-l-4 ${isPositive ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
                        <div className="flex justify-between items-start">
                            <h5 className={`font-bold ${isPositive ? 'text-green-800' : 'text-red-800'}`}>{note.title}</h5>
                            <p className="text-xs text-gray-700 font-medium flex-shrink-0 ml-2">{new Date(note.date.replace(/-/g, '/')).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{note.note}</p>
                        {note.suggestions && (
                             <div className="mt-3 pt-3 border-t border-gray-200">
                                <h6 className="font-semibold text-xs text-gray-600">Suggestions for Home:</h6>
                                <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-1">
                                    {note.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                                </ul>
                             </div>
                        )}
                        <p className="text-xs text-gray-600 text-right mt-2 italic">- {note.by}</p>
                    </div>
                );
            }) : <p className="text-sm text-gray-700 text-center py-8">No behavioral notes recorded.</p>}
        </div>
    );
};

const AttendanceTab = ({ student }: { student: Student }) => {
    const studentAttendance = useMemo(() => 
        mockStudentAttendance.filter(att => att.studentId === student.id)
    , [student.id]);
    
    const [currentDate, setCurrentDate] = useState(new Date());

    const attendanceMap = useMemo(() => {
        const map = new Map<string, AttendanceStatus>();
        studentAttendance.forEach(att => map.set(att.date, att.status));
        return map;
    }, [studentAttendance]);

    const firstDayOfMonth = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), [currentDate]);
    const daysInMonth = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(), [currentDate]);
    const startingDayIndex = firstDayOfMonth.getDay();

    const goToPreviousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const goToNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    
    const attendanceColors: { [key in AttendanceStatus]: string } = {
        Present: 'bg-green-400 text-white',
        Absent: 'bg-red-400 text-white',
        Late: 'bg-blue-400 text-white',
        Leave: 'bg-gray-200 text-gray-500',
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeftIcon className="h-5 w-5 text-gray-600" /></button>
                <h3 className="font-bold text-lg text-gray-800">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronRightIcon /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-700 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startingDayIndex }).map((_, index) => <div key={`empty-${index}`} />)}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const dateString = date.toISOString().split('T')[0];
                    const status = attendanceMap.get(dateString);
                    return (
                        <div key={day} className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold ${status ? attendanceColors[status] : 'bg-gray-100 text-gray-400'}`}>
                            {day}
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-center space-x-3 mt-4 text-xs">
                <span className="flex items-center"><div className="w-3 h-3 rounded-full bg-green-400 mr-1.5"></div>Present</span>
                <span className="flex items-center"><div className="w-3 h-3 rounded-full bg-red-400 mr-1.5"></div>Absent</span>
                <span className="flex items-center"><div className="w-3 h-3 rounded-full bg-blue-400 mr-1.5"></div>Late</span>
            </div>
        </div>
    );
};

type ChildDetailTab = 'academics' | 'behavior' | 'attendance';

const ChildDetailScreen = ({ student, initialTab, navigateTo }: { student: Student, initialTab?: ChildDetailTab, navigateTo: (view: string, title: string, props?: any) => void }) => {
    const [activeTab, setActiveTab] = useState<ChildDetailTab>(initialTab || 'academics');
    
    const TabButton = ({ id, label }: { id: ChildDetailTab, label: string }) => (
        <button
          onClick={() => setActiveTab(id)}
          className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
            activeTab === id ? 'bg-green-500 text-white shadow' : 'text-gray-800'
          }`}
        >
          {label}
        </button>
    );
    
    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Child Header */}
            <div className="p-4 bg-white flex items-center space-x-4">
                <img src={student.avatarUrl} alt={student.name} className="w-16 h-16 rounded-full object-cover border-4 border-green-100" />
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                    <p className="text-gray-700 font-medium">{getFormattedClassName(student.grade, student.section)}</p>
                </div>
            </div>
            
            {/* Tabs */}
            <div className="px-4 py-2 bg-white">
                <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
                    <TabButton id="academics" label="Academics" />
                    <TabButton id="behavior" label="Behavior" />
                    <TabButton id="attendance" label="Attendance" />
                </div>
            </div>

            <div className="flex-grow overflow-y-auto">
                {activeTab === 'academics' && <AcademicsTab student={student} navigateTo={navigateTo} />}
                {activeTab === 'behavior' && <BehaviorTab student={student} />}
                {activeTab === 'attendance' && <div className="p-4"><AttendanceTab student={student} /></div>}
            </div>
        </div>
    );
};

const Dashboard = ({ navigateTo }: { navigateTo: (view: string, title: string, props?: any) => void }) => {
    const theme = THEME_CONFIG[DashboardType.Parent];
    const parentChildrenIds = [3, 4]; // Mock: This parent has two children
    
    const childrenData = useMemo(() => mockStudents
        .filter(s => parentChildrenIds.includes(s.id))
        .map(student => {
            const feeInfo = mockStudentFees.find(f => f.id === student.id);
            const nextHomework = mockAssignments
                .filter(a => !mockSubmissions.some(sub => sub.assignmentId === a.id && sub.student.id === student.id))
                .sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];
            const recentGrades = student.academicPerformance?.filter(p => p.term === 'Term 2').slice(0,1) || [];
            
            const attendanceRecords = mockStudentAttendance.filter(a => a.studentId === student.id && a.status !== 'Leave');
            const presentCount = attendanceRecords.filter(a => a.status === 'Present' || a.status === 'Late').length;
            const attendancePercentage = attendanceRecords.length > 0 ? Math.round((presentCount / attendanceRecords.length) * 100) : 100;

            return { student, feeInfo, nextHomework, recentGrades, attendancePercentage };
        }), []);

    const quickAccessItems = [
        { label: 'Bus', icon: <BusVehicleIcon className="h-5 w-5"/>, action: () => navigateTo('busRoute', 'Bus Route') },
        { label: 'Fees', icon: <ReceiptIcon className="h-5 w-5"/>, action: () => navigateTo('feeStatus', 'Fee Status', { childrenIds: parentChildrenIds }) },
        { label: 'Reports', icon: <ReportIcon className="h-5 w-5"/>, action: () => navigateTo('selectReport', 'Select Report Card') },
        { label: 'Appointments', icon: <CalendarPlusIcon className="h-5 w-5"/>, action: () => navigateTo('appointments', 'Book Appointment') },
    ];
    
    const latestNotice = mockNotices.filter(n => n.audience.includes('all') || n.audience.includes('parents')).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

    const childColorThemes = [{bg: '#3b82f6', text: '#1e40af'}, {bg: '#ec4899', text: '#831843'}];

    return (
        <div className="p-3 space-y-4 bg-gray-50">
            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-2">
                {quickAccessItems.map((item, index) => (
                    <button key={item.label} onClick={item.action} className={`${theme.cardBg} p-2 rounded-xl shadow-sm flex flex-col items-center justify-center space-y-1 hover:bg-green-200 transition-colors`}>
                        <div className={theme.iconColor}>{item.icon}</div>
                        <span className={`font-semibold ${theme.textColor} text-center text-xs`}>{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Children Cards */}
            <div className="space-y-3">
{/* FIX: Removed redundant 'key' prop from ChildStatCard component call. */}
                {childrenData.map((data, index) => (
                    <ChildStatCard data={data} navigateTo={navigateTo} colorTheme={childColorThemes[index % childColorThemes.length]} />
                ))}
            </div>
            
             {/* School Notice */}
             {latestNotice && (
                <div className="bg-white p-3 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-amber-100 p-1.5 rounded-lg">
                            <MegaphoneIcon className="h-4 w-4 text-amber-600"/>
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">School Notice</h4>
                    </div>
                    <div className="border-l-2 border-amber-300 pl-2">
                         <h5 className="font-semibold text-gray-700 text-sm">{latestNotice.title}</h5>
                         <p className="text-xs text-gray-800">{latestNotice.content.substring(0, 80)}...</p>
                         <button onClick={() => navigateTo('noticeboard', 'Noticeboard')} className="text-xs font-semibold text-green-600 mt-1">Read More</button>
                    </div>
                </div>
             )}
        </div>
    );
};

interface ParentDashboardProps {
    onLogout: () => void;
    setIsHomePage: (isHome: boolean) => void;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ onLogout, setIsHomePage }) => {
    const [viewStack, setViewStack] = useState<ViewStackItem[]>([{ view: 'dashboard', title: 'Parent Dashboard' }]);
    const [activeBottomNav, setActiveBottomNav] = useState('home');

    useEffect(() => {
        const currentView = viewStack[viewStack.length - 1];
        setIsHomePage(currentView.view === 'dashboard');
    }, [viewStack, setIsHomePage]);

    const notificationCount = mockNotifications.filter(n => !n.isRead && n.audience.includes('parent')).length;

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
                setViewStack([{ view: 'dashboard', title: 'Parent Dashboard' }]);
                break;
            case 'reports':
                setViewStack([{ view: 'selectReport', title: 'Select Report Card' }]);
                break;
            case 'notifications':
                setViewStack([{ view: 'notifications', title: 'Notifications' }]);
                break;
            case 'more':
                setViewStack([{ view: 'more', title: 'More Options' }]);
                break;
            default:
                setViewStack([{ view: 'dashboard', title: 'Parent Dashboard' }]);
        }
    };
    
    const handleNotificationClick = () => {
        navigateTo('notifications', 'Notifications', {});
    };

    const viewComponents: { [key: string]: React.ComponentType<any> } = {
        dashboard: Dashboard,
        childDetail: ChildDetailScreen,
        examSchedule: ExamSchedule,
        noticeboard: (props: any) => <NoticeboardScreen {...props} userType="parent" />,
        notifications: (props: any) => <NotificationsScreen {...props} userType="parent" navigateTo={navigateTo} />,
        calendar: CalendarScreen,
        library: LibraryScreen,
        busRoute: BusRouteScreen,
        feeStatus: (props: any) => <FeeStatusScreen {...props} childrenIds={[3, 4]} />,
        selectReport: SelectChildForReportScreen,
        reportCard: ReportCardScreen,
        timetable: TimetableScreen,
        more: ParentProfileScreen,
        editParentProfile: EditParentProfileScreen,
        feedback: FeedbackScreen,
        notificationSettings: ParentNotificationSettingsScreen,
        securitySettings: ParentSecurityScreen,
        learningResources: LearningResourcesScreen,
        schoolPolicies: SchoolPoliciesScreen,
        ptaMeetings: PTAMeetingScreen,
        photoGallery: ParentPhotoGalleryScreen,
        volunteering: VolunteeringScreen,
        permissionSlips: PermissionSlipScreen,
        appointments: AppointmentScreen,
        aiParentingTips: AIParentingTipsScreen,
    };
    
    const currentNavigation = viewStack[viewStack.length - 1];
    const ComponentToRender = viewComponents[currentNavigation.view];
    
    const commonProps = {
        navigateTo,
        onLogout,
        handleBack,
    };

    return (
        <div className="flex flex-col h-full bg-gray-100">
             <Header
                title={currentNavigation.title}
                avatarUrl="https://i.pravatar.cc/150?u=parent1"
                bgColor={THEME_CONFIG[DashboardType.Parent].mainBg}
                onLogout={onLogout}
                onBack={viewStack.length > 1 ? handleBack : undefined}
                onNotificationClick={handleNotificationClick}
                notificationCount={notificationCount}
            />
            <div className="flex-grow overflow-y-auto" style={{marginTop: '-4rem'}}>
                <div className="pt-16">
                    <div key={viewStack.length} className="animate-slide-in-up">
                        {ComponentToRender ? (
                            <ComponentToRender {...currentNavigation.props} {...commonProps} />
                        ) : (
                             <div className="p-6">View not found: {currentNavigation.view}</div>
                        )}
                    </div>
                </div>
            </div>
             <ParentBottomNav activeScreen={activeBottomNav} setActiveScreen={handleBottomNavClick} />
        </div>
    );
};

export default ParentDashboard;
