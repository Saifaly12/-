import React from 'react';
import { ScreenRoute } from '../types';

interface SidebarProps {
  currentRoute: ScreenRoute;
  onRouteChange: (route: ScreenRoute) => void;
  onOpenContact: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onRouteChange,
  onOpenContact,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const navItems: { route: ScreenRoute; label: string; icon: string; badge?: string }[] = [
    { route: 'overview', label: 'الرئيسية', icon: 'home' },
    { route: 'student-dashboard', label: 'لوحة التحكم', icon: 'dashboard' },
    { route: 'educational-units', label: 'الوحدات التعليمية', icon: 'auto_stories', badge: '16' },
    { route: 'unit-learning-experience', label: 'تجربة التعلم الحركي', icon: 'interactive_space' },
    { route: 'interactive-quizzes', label: 'الاختبارات التفاعلية', icon: 'quiz' },
    { route: 'assessment-results', label: 'نتائج وتقويم الأداء', icon: 'fact_check' },
  ];

  const handleNavClick = (route: ScreenRoute) => {
    onRouteChange(route);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed right-0 top-0 h-full w-72 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          {/* Logo & Platform Branding */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0f766e] flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-2xl">sports_gymnastics</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-[#005c55] leading-tight">المهارات الحركية</span>
                <span className="text-xs text-[#6e7977] font-medium">بيئة تعليمية تفاعلية</span>
              </div>
            </div>
            {/* Close button for mobile */}
            {isOpenMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-lg text-[#6e7977] hover:bg-slate-100"
                aria-label="إغلاق القائمة"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>

          {/* Academic Context Chip */}
          <div className="mb-6 px-4 py-2 rounded-xl bg-[#f2f3ff] flex items-center justify-between">
            <span className="text-xs text-[#3e4947] font-medium">السياق الأكاديمي</span>
            <span className="px-2 py-0.5 rounded-full bg-[#005c55]/10 text-[#005c55] text-xs font-bold">
              بحث تدريسي
            </span>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavClick(item.route)}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 text-right ${
                    isActive
                      ? 'bg-[#0f766e] text-white shadow-[0_1px_3px_0_rgba(15,23,42,0.08)]'
                      : 'text-[#3e4947] hover:bg-[#eaedff] hover:text-[#131b2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#dae2fd] text-[#006398]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Motor Consistency Index & Researcher Contact */}
        <div className="p-6 space-y-4 border-t border-slate-100">
          <div className="p-3.5 rounded-xl bg-[#f2f3ff]">
            <div className="flex items-center gap-1.5 text-[#005c55] mb-1">
              <span className="material-symbols-outlined text-sm">analytics</span>
              <span className="text-xs font-bold">مؤشر الاتساق الحركي</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-extrabold text-[#131b2e]">84%</span>
              <span className="text-xs font-bold text-[#007952]">مستوى متقدم</span>
            </div>
            <div className="w-full bg-[#dae2fd] h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#007952] h-full rounded-full w-[84%]"></div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenContact}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#eaedff] text-[#005c55] font-semibold text-sm hover:bg-[#005c55] hover:text-white transition-colors duration-200"
          >
            <span className="material-symbols-outlined text-base">mail</span>
            <span>تواصل مع الباحث</span>
          </button>
        </div>
      </aside>
    </>
  );
};
