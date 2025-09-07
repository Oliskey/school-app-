import React, { useState } from 'react';
import { DashboardType } from './types';
import AdminDashboard from './components/dashboards/AdminDashboard';
import TeacherDashboard from './components/dashboards/TeacherDashboard';
import ParentDashboard from './components/dashboards/ParentDashboard';
import StudentDashboard from './components/dashboards/StudentDashboard';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import AIChatWidget from './components/shared/AIChatWidget';
import AIChatScreen from './components/shared/AIChatScreen';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeDashboard, setActiveDashboard] = useState<DashboardType>(DashboardType.Student);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = (dashboard: DashboardType) => {
    setActiveDashboard(dashboard);
    setIsAuthenticated(true);
    setIsHomePage(true);
    setShowForgotPassword(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsChatOpen(false); // Reset chat state on logout
    setIsHomePage(true);
    setShowForgotPassword(false);
  };

  const renderAuthScreen = () => {
    if (showForgotPassword) {
      return <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />;
    }
    return <Login onLogin={handleLogin} onForgotPassword={() => setShowForgotPassword(true)} />;
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
        <div className="relative mx-auto border-black dark:border-gray-800 bg-black border-[8px] rounded-[2.5rem] h-[600px] w-[320px] md:h-[700px] md:w-[360px] lg:h-[800px] lg:w-[380px] shadow-2xl print:border-none print:shadow-none print:h-auto print:w-full">
            {/* Dynamic Island - slightly larger for iPhone 16 Pro */}
            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] md:w-[120px] md:h-[32px] bg-black rounded-full z-20 flex justify-center items-center print:hidden">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gray-700 rounded-full ml-8 md:ml-10"></div> {/* Camera lens */}
            </div>
            {/* Side buttons - adjusted for iPhone 16 Pro */}
            <div className="h-[50px] w-[3px] md:h-[55px] md:w-[4px] bg-gray-800 absolute -left-[10px] md:-left-[12px] top-[100px] md:top-[125px] rounded-l-lg print:hidden"></div>
            <div className="h-[50px] w-[3px] md:h-[55px] md:w-[4px] bg-gray-800 absolute -left-[10px] md:-left-[12px] top-[160px] md:top-[195px] rounded-l-lg print:hidden"></div>
            <div className="h-[75px] w-[3px] md:h-[95px] md:w-[4px] bg-gray-800 absolute -right-[10px] md:-right-[12px] top-[140px] md:top-[165px] rounded-r-lg print:hidden"></div>
            
            <div className="rounded-[2rem] md:rounded-[2.25rem] overflow-hidden w-full h-full bg-white flex flex-col print:rounded-none">
                {!isAuthenticated ? (
                  renderAuthScreen()
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