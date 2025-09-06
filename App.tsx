import React, { useState } from 'react';
import { DashboardType } from './types';
import AdminDashboard from './components/dashboards/AdminDashboard';
import TeacherDashboard from './components/dashboards/TeacherDashboard';
import ParentDashboard from './components/dashboards/ParentDashboard';
import StudentDashboard from './components/dashboards/StudentDashboard';
import Login from './components/auth/Login';
import AIChatWidget from './components/shared/AIChatWidget';
import AIChatScreen from './components/shared/AIChatScreen';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeDashboard, setActiveDashboard] = useState<DashboardType>(DashboardType.Student);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);

  const handleLogin = (dashboard: DashboardType) => {
    setActiveDashboard(dashboard);
    setIsAuthenticated(true);
    setIsHomePage(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsChatOpen(false); // Reset chat state on logout
    setIsHomePage(true);
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
    <div className="flex flex-col items-center justify-center min-h-screen p-2 font-sans bg-gray-100 dark:bg-gray-900 print:p-0 print:bg-white">
        <div className="relative mx-auto border-black dark:border-gray-800 bg-black border-[8px] rounded-[2.5rem] h-[874px] w-[402px] shadow-2xl print:border-none print:shadow-none print:h-auto print:w-full">
            {/* Dynamic Island - slightly larger for iPhone 16 Pro */}
            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[130px] h-[34px] bg-black rounded-full z-20 flex justify-center items-center print:hidden">
                <div className="w-2.5 h-2.5 bg-gray-700 rounded-full ml-11"></div> {/* Camera lens */}
            </div>
            {/* Side buttons - adjusted for iPhone 16 Pro */}
            <div className="h-[65px] w-[4px] bg-gray-800 absolute -left-[12px] top-[125px] rounded-l-lg print:hidden"></div>
            <div className="h-[65px] w-[4px] bg-gray-800 absolute -left-[12px] top-[195px] rounded-l-lg print:hidden"></div>
            <div className="h-[95px] w-[4px] bg-gray-800 absolute -right-[12px] top-[165px] rounded-r-lg print:hidden"></div>
            
            <div className="rounded-[2.25rem] overflow-hidden w-full h-full bg-white flex flex-col print:rounded-none">
                {!isAuthenticated ? (
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