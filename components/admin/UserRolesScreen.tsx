
import React, { useState } from 'react';
import { 
    ExamIcon, 
    AttendanceIcon, 
    ReportIcon, 
    MegaphoneIcon, 
    BookOpenIcon, 
    ViewGridIcon, 
    BusIcon, 
    ReceiptIcon,
    UsersIcon,
    AnalyticsIcon,
    AIIcon
} from '../../constants';
import { mockRolesAndPermissions } from '../../data';
import { RoleName } from '../../types';

const PermissionToggle = ({ enabled, onToggle, disabled = false }: { enabled: boolean, onToggle: () => void, disabled?: boolean }) => (
    <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        disabled={disabled}
        className={`relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
            enabled ? 'bg-sky-600' : 'bg-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        <span
            aria-hidden="true"
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                enabled ? 'translate-x-5' : 'translate-x-0'
            }`}
        />
    </button>
);

const permissionIcons: { [key: string]: React.ReactNode } = {
    'manage-users': <UsersIcon className="w-5 h-5" />,
    'manage-finances': <ReceiptIcon className="w-5 h-5" />,
    'view-analytics': <AnalyticsIcon className="w-5 h-5" />,
    'send-announcements': <MegaphoneIcon className="w-5 h-5" />,
    'manage-own-exams': <ExamIcon className="w-5 h-5" />,
    'mark-attendance': <AttendanceIcon className="w-5 h-5" />,
    'enter-results': <ReportIcon className="w-5 h-5" />,
    'access-library': <BookOpenIcon className="w-5 h-5" />,
    'view-reports': <ReportIcon className="w-5 h-5" />,
    'view-attendance': <AttendanceIcon className="w-5 h-5" />,
    'track-bus': <BusIcon className="w-5 h-5" />,
    'view-fees': <ReceiptIcon className="w-5 h-5" />,
    'view-timetable': <ViewGridIcon className="w-5 h-5" />,
    'view-own-results': <ReportIcon className="w-5 h-5" />,
    'use-study-buddy': <AIIcon className="w-5 h-5" />,
};

const UserRolesScreen: React.FC = () => {
    const [permissionsState, setPermissionsState] = useState(() => {
        const initialState: { [key in RoleName]?: { [key: string]: boolean } } = {};
        mockRolesAndPermissions.forEach(role => {
            initialState[role.id] = {};
            role.permissions.forEach(perm => {
                initialState[role.id]![perm.id] = perm.enabled;
            });
        });
        return initialState;
    });

    const handleToggle = (roleId: RoleName, permId: string) => {
        if (roleId === 'Admin') return; // Admins cannot have their permissions changed.
        setPermissionsState(prev => ({
            ...prev,
            [roleId]: {
                ...prev[roleId],
                [permId]: !prev[roleId]![permId],
            },
        }));
    };

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <main className="flex-grow p-4 space-y-4 overflow-y-auto pb-20">
                {mockRolesAndPermissions.map(role => {
                    const IconComponent = role.icon;
                    return (
                        <div key={role.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="p-4 flex items-center space-x-4 bg-gray-50 border-b border-gray-200">
                                <div className="text-sky-500">
                                    <IconComponent className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{role.name}</h3>
                                    <p className="text-sm text-gray-500">{role.description}</p>
                                </div>
                            </div>
                            <ul className="divide-y divide-gray-100 p-2">
                                {role.permissions.map(perm => (
                                    <li key={perm.id} className="flex justify-between items-center p-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-gray-500">{permissionIcons[perm.id]}</div>
                                            <span className="font-medium text-gray-700">{perm.label}</span>
                                        </div>
                                        <PermissionToggle
                                            enabled={permissionsState[role.id]?.[perm.id] ?? false}
                                            onToggle={() => handleToggle(role.id, perm.id)}
                                            disabled={role.id === 'Admin'}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </main>

            <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0">
                <button
                    onClick={() => alert('Permissions saved!')}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default UserRolesScreen;