import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ContactModal } from './components/ContactModal';
import { NotificationsModal } from './components/NotificationsModal';
import { OverviewScreen } from './screens/OverviewScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { EducationalUnitsScreen } from './screens/EducationalUnitsScreen';
import { LearningExperienceScreen } from './screens/LearningExperienceScreen';
import { InteractiveQuizScreen } from './screens/InteractiveQuizScreen';
import { AssessmentResultsScreen } from './screens/AssessmentResultsScreen';
import { ScreenRoute } from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<ScreenRoute>('student-dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleNavigate = (route: ScreenRoute) => {
    setCurrentRoute(route);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectNotification = (unitId: number) => {
    setIsNotificationsOpen(false);
    handleNavigate('unit-learning-experience');
  };

  return (
    <div className="min-h-screen bg-surface-container font-sans text-slate-800 flex flex-col antialiased">
      {/* Right-Hand RTL Navigation Sidebar */}
      <Sidebar
        currentRoute={currentRoute}
        onRouteChange={handleNavigate}
        onOpenContact={() => setIsContactModalOpen(true)}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area (offset by right sidebar on lg screens: margin-right 72) */}
      <div className="flex-1 lg:mr-72 flex flex-col min-w-0 pt-20">
        {/* Top Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        />

        {/* Dynamic Screen Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentRoute === 'overview' && (
            <OverviewScreen onNavigate={handleNavigate} />
          )}

          {currentRoute === 'student-dashboard' && (
            <DashboardScreen
              onNavigate={handleNavigate}
              searchFilter={searchQuery}
            />
          )}

          {currentRoute === 'educational-units' && (
            <EducationalUnitsScreen
              onNavigate={handleNavigate}
              searchFilter={searchQuery}
            />
          )}

          {currentRoute === 'unit-learning-experience' && (
            <LearningExperienceScreen
              onNavigate={handleNavigate}
            />
          )}

          {currentRoute === 'interactive-quizzes' && (
            <InteractiveQuizScreen onNavigate={handleNavigate} />
          )}

          {currentRoute === 'assessment-results' && (
            <AssessmentResultsScreen
              onNavigate={handleNavigate}
              onOpenContactModal={() => setIsContactModalOpen(true)}
            />
          )}
        </main>

        {/* Academic Footer */}
        <footer className="mt-auto py-6 px-8 border-t border-slate-200/60 bg-white/50 text-slate-400 text-xs text-center sm:flex sm:justify-between sm:items-center">
          <p>© 2026 بيئة التعلم الحركي التفاعلية | أطروحة دكتوراه في المناهج وطرق تدريس التربية البدنية والبيوميكانيك</p>
          <div className="flex items-center justify-center gap-4 mt-2 sm:mt-0 font-bold">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              التواصل مع الباحث المشرف
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavigate('overview')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              دليل الإطار النظري
            </button>
          </div>
        </footer>
      </div>

      {/* Global Modals */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onSelectNotification={handleSelectNotification}
      />
    </div>
  );
}
