


import React from 'react';
import { 
    StudentsIcon, 
    StaffIcon, 
    ReportIcon, 
    ReceiptIcon, 
    HeartIcon, 
    ChevronRightIcon,
    PlusIcon,
    MegaphoneIcon,
    LoginIcon,
    EditIcon,
    PublishIcon,
    DollarSignIcon,
    ClipboardListIcon,
    UsersIcon,
    BusVehicleIcon,
    TrashIcon,
} from '../../constants';
import { mockStudents, mockTeachers, mockStudentFees, mockAuditLogs, mockParents, mockSavedTimetable } from '../../data';
import { AuditLog } from '../../types';

// --- NEW, REFINED UI/UX COMPONENTS ---

// FIX: Changed icon prop type from React.ReactElement<{ className?: string }> to React.ReactElement<any> to resolve a TypeScript error with React.cloneElement.
const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactElement<any>; colorClasses: string; onClick: () => void; }> = ({ label, value, icon, colorClasses, onClick }) => (
    <div className={`p-5 rounded-2xl shadow-sm text-white relative overflow-hidden ${colorClasses}`}>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-white/90 font-medium">{label}</p>
                <p className="text-4xl font-bold">{value}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
                 {React.cloneElement(icon, { className: "h-7 w-7" })}
            </div>
        </div>
        <button onClick={onClick} className="mt-4 text-sm font-semibold flex items-center space-x-1 hover:underline">
            <span>View All</span>
            <ChevronRightIcon className="w-4 h-4" />
        </button>
    </div>
);

// FIX: Changed icon prop type from React.ReactElement to React.ReactElement<any> to allow adding className via React.cloneElement.
const ManagementAction: React.FC<{ label: string; icon: React.ReactElement<any>; onClick: () => void; color: string; }> = ({ label, icon, onClick, color }) => (
    <button onClick={onClick} className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
        <div className={`p-4 rounded-full ${color}`}>
            {React.cloneElement(icon, { className: "h-8 w-8 text-white" })}
        </div>
        <p className="font-semibold text-gray-700 mt-3 text-sm">{label}</p>
    </button>
);

// FIX: Changed icon prop type from React.ReactElement to React.ReactElement<any> to allow adding className via React.cloneElement.
const AlertCard: React.FC<{ label: string; value: string | number; icon: React.ReactElement<any>; onClick: () => void; color: string; }> = ({ label, value, icon, onClick, color }) => (
    <button onClick={onClick} className="w-full bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4 text-left hover:bg-gray-50 transition-colors">
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('-500', '-100')}`}>
             {React.cloneElement(icon, { className: `h-6 w-6 ${color}`})}
        </div>
        <div>
            <p className="font-bold text-gray-800">{value} {label}</p>
            <p className="text-sm text-gray-500">Action required</p>
        </div>
        <ChevronRightIcon className="h-5 w-5 text-gray-400 ml-auto" />
    </button>
);


const actionTypeIcons: { [key in AuditLog['type']]: React.ReactNode } = {
    login: <LoginIcon className="h-5 w-5 text-green-500" />,
    logout: <LoginIcon className="h-5 w-5 text-gray-500 transform scale-x-[-1]" />,
    create: <PlusIcon className="h-5 w-5 text-sky-500" />,
    update: <EditIcon className="h-5 w-5 text-amber-500" />,
    delete: <TrashIcon className="h-5 w-5 text-red-500" />,
    publish: <PublishIcon className="h-5 w-5 text-purple-500" />,
    payment: <DollarSignIcon className="h-5 w-5 text-indigo-500" />,
};

const formatDistanceToNow = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
};

const ActivityLogItem: React.FC<{ log: AuditLog }> = ({ log }) => (
    <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-gray-100">
            {actionTypeIcons[log.type]}
        </div>
        <div className="flex-grow text-sm">
            <p className="text-gray-800">
                <span className="font-semibold">{log.user.name}</span> {log.action}
            </p>
        </div>
        <p className="text-xs text-gray-400 flex-shrink-0">{formatDistanceToNow(log.timestamp)}</p>
    </div>
);

// --- MAIN DASHBOARD COMPONENT ---

interface DashboardOverviewProps {
    navigateTo: (view: string, title: string, props?: any) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ navigateTo }) => {
  
  const totalStudents = mockStudents.length;
  const totalStaff = mockTeachers.length;
  const totalParents = mockParents.length;
  
  const unpublishedReports = mockStudents.flatMap(s => s.reportCards || []).filter(rc => rc.status === 'Submitted').length;
  const overdueFees = mockStudentFees.filter(f => f.status === 'Overdue').length;
  
  const recentActivities = mockAuditLogs.slice(0, 4);

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      {/* 1. Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Administrator!</h1>
        <p className="text-gray-500">Here's a snapshot of your school's activities.</p>
      </div>

      {/* 2. Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="Total Students" value={totalStudents} icon={<StudentsIcon />} colorClasses="bg-sky-500" onClick={() => navigateTo('studentList', 'Manage Students', {})} />
        <StatCard label="Total Staff" value={totalStaff} icon={<StaffIcon />} colorClasses="bg-purple-500" onClick={() => navigateTo('teacherList', 'Manage Teachers', {})} />
        <StatCard label="Total Parents" value={totalParents} icon={<UsersIcon />} colorClasses="bg-orange-500" onClick={() => navigateTo('parentList', 'Manage Parents', {})} />
      </div>

      {/* 3. Management Hub */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Management Hub</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <ManagementAction label="Add User" icon={<PlusIcon />} onClick={() => navigateTo('selectUserTypeToAdd', 'Add New User', {})} color="bg-sky-500" />
            <ManagementAction label="Reports" icon={<ReportIcon />} onClick={() => navigateTo('reports', 'School Reports', {})} color="bg-purple-500" />
            <ManagementAction label="Timetable" icon={<ClipboardListIcon />} onClick={() => navigateTo(mockSavedTimetable.current ? 'timetableEditor' : 'timetable', 'AI Timetable', { timetableData: mockSavedTimetable.current })} color="bg-indigo-500" />
            <ManagementAction label="Announce" icon={<MegaphoneIcon />} onClick={() => navigateTo('communicationHub', 'Communication Hub')} color="bg-teal-500" />
            <ManagementAction label="Bus Roster" icon={<BusVehicleIcon />} onClick={() => navigateTo('busDutyRoster', 'Bus Duty Roster')} color="bg-orange-500" />
            <ManagementAction label="Health Log" icon={<HeartIcon />} onClick={() => navigateTo('healthLog', 'Health Log')} color="bg-red-500" />
        </div>
      </div>
      
      {/* 4. Urgent Tasks & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
             <h2 className="text-xl font-bold text-gray-700 mb-4">Action Required</h2>
             <div className="space-y-3">
                {unpublishedReports > 0 && (
                    <AlertCard label="Reports to Publish" value={unpublishedReports} icon={<ReportIcon />} onClick={() => navigateTo('reportCardPublishing', 'Publish Reports')} color="text-red-500" />
                )}
                {overdueFees > 0 && (
                    <AlertCard label="Overdue Fee Payments" value={overdueFees} icon={<ReceiptIcon />} onClick={() => navigateTo('feeManagement', 'Fee Management')} color="text-orange-500" />
                )}
                {unpublishedReports === 0 && overdueFees === 0 && (
                    <div className="bg-white p-4 rounded-xl shadow-sm text-center text-gray-500">
                        No urgent tasks. Well done!
                    </div>
                )}
             </div>
        </div>
        <div>
             <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Activity</h2>
             <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                {recentActivities.map(log => <ActivityLogItem key={log.id} log={log} />)}
                <button onClick={() => navigateTo('auditLog', 'Audit Log')} className="mt-2 text-sm w-full text-center font-semibold text-indigo-600 hover:text-indigo-800">
                    View Full Audit Log
                </button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;