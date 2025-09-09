
import React, { useState } from 'react';
import { DashboardType } from './types';
import AdminDashboard from './components/dashboards/AdminDashboard';
import TeacherDashboard from './components/dashboards/TeacherDashboard';
import ParentDashboard from './components/dashboards/ParentDashboard';
import StudentDashboard from './components/dashboards/StudentDashboard';
import Login from './components/auth/Login';
import AIChatWidget from './components/shared/AIChatWidget';
import AIChatScreen from './components/shared/AIChatScreen';

// A simple checkmark icon for the success animation, based on constants.tsx
const CheckCircleIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className || ''}`.trim()} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" /></svg>;

// A component for the success screen shown after login
const SuccessScreen: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full bg-green-500 animate-fade-in">
        <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center">
            <CheckCircleIcon className="w-20 h-20 text-white animate-checkmark-pop" />
        </div>
        <p className="mt-4 text-2xl font-bold text-white">Login Successful!</p>
    </div>
);


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeDashboard, setActiveDashboard] = useState<DashboardType>(DashboardType.Student);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success'>('idle');

  const handleLogin = (dashboard: DashboardType) => {
    setActiveDashboard(dashboard);
    setLoginStatus('success');
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsHomePage(true);
      setLoginStatus('idle'); // Reset for next time, if user logs out and back in
    }, 1800); // Duration matches animations
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsChatOpen(false); // Reset chat state on logout
    setIsHomePage(true);
    setLoginStatus('idle');
  };

  const renderDashboard = () => {
    switch (activeDashboard) {
      case DashboardType.Admin:
        return <AdminDashboard onLogout={handleLogout} setIsHomePage={setIsHomePage} />;
      case DashboardType.Teacher:
        return <TeacherDashboard onLogout={handleLogout} setIsHomePage={setIsHomePage} />;
      case DashboardType.Parent:
        return <ParentDashboard onLogout={handleLogout} setIsHomePage={setIsHomePage} />;
      case DashboardType.Student:
        return <StudentDashboard onLogout={handleLogout} setIsHomePage={setIsHomePage} />;
      default:
        return <StudentDashboard onLogout={handleLogout} setIsHomePage={setIsHomePage} />;
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 sm:p-4 font-sans bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 print:p-0 print:bg-white">
        <div className="relative mx-auto border-black dark:border-gray-800 bg-black border-[8px] sm:border-[10px] rounded-[2.5rem] sm:rounded-[3rem] w-full max-w-sm h-[95vh] max-h-[850px] shadow-2xl print:border-none print:shadow-none print:h-auto print:w-full">
            {/* Dynamic Island */}
            <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-full z-20 flex justify-center items-center print:hidden">
                <div className="w-2 h-2 bg-gray-700 rounded-full ml-10"></div> {/* Camera lens */}
            </div>
            {/* Side buttons */}
            <div className="h-[60px] w-[4px] bg-gray-800 absolute -left-[12px] sm:-left-[14px] top-[120px] rounded-l-lg print:hidden"></div>
            <div className="h-[60px] w-[4px] bg-gray-800 absolute -left-[12px] sm:-left-[14px] top-[190px] rounded-l-lg print:hidden"></div>
            <div className="h-[90px] w-[4px] bg-gray-800 absolute -right-[12px] sm:-right-[14px] top-[160px] rounded-r-lg print:hidden"></div>
            
            <div className="rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden w-full h-full bg-white flex flex-col print:rounded-none">
                {loginStatus === 'success' ? (
                  <SuccessScreen />
                ) : !isAuthenticated ? (
                  <Login onLogin={handleLogin} />
                ) : isChatOpen ? (
                  <AIChatScreen onBack={() => setIsChatOpen(false)} dashboardType={activeDashboard} />
                ) : (
                  <div className="flex-grow overflow-y-auto print:overflow-visible">
                    {renderDashboard()}
                  </div>
                )}
            </div>
            
            {isAuthenticated && !isChatOpen && isHomePage && <AIChatWidget onClick={() => setIsChatOpen(true)} dashboardType={activeDashboard} />}
        </div>
    </div>
  );
};

export default App;
