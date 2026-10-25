import React from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNotifications: () => void;
  onOpenFilter?: () => void;
  onToggleMobileMenu: () => void;
  hasUnreadNotification?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenNotifications,
  onOpenFilter,
  onToggleMobileMenu,
  hasUnreadNotification = true,
}) => {
  return (
    <header className="fixed top-0 right-0 lg:right-72 left-0 h-20 bg-[#faf8ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-4 sm:px-6 flex items-center justify-between gap-4 border-b border-[#eaedff]">
      {/* Mobile Hamburger & Logo preview */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#3e4947] flex items-center justify-center hover:bg-[#eaedff] transition-colors"
          aria-label="القائمة الجانبية"
        >
          <span className="material-symbols-outlined text-xl">menu</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0f766e] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-lg">sports_gymnastics</span>
          </div>
          <span className="font-bold text-sm text-[#005c55] hidden sm:inline">المهارات الحركية</span>
        </div>
      </div>

      {/* Global Search and Filter Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6e7977] text-lg pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white text-[#131b2e] placeholder-[#6e7977] pr-10 pl-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#005c55] text-sm shadow-[0_1px_3px_0_rgba(15,23,42,0.03)] border border-[#dae2fd]/60 transition-all"
            placeholder="بحث في المهارات، الوحدات التعليمية، ومعايير الحركة..."
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6e7977] hover:text-[#131b2e] text-xs"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onOpenFilter}
          className="px-3.5 py-2.5 rounded-xl bg-[#f2f3ff] text-[#3e4947] hover:bg-[#eaedff] hover:text-[#131b2e] text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 border border-[#dae2fd]/40"
        >
          <span className="material-symbols-outlined text-base">filter_list</span>
          <span className="hidden sm:inline">تصفية</span>
        </button>
      </div>

      {/* User Status, Notification Bell & Student Profile */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#005e3f]/10 text-[#005e3f] text-xs font-bold border border-[#005e3f]/20">
          <span className="material-symbols-outlined text-sm">verified</span>
          <span>مشروع بحثي أكاديمي</span>
        </span>

        {/* Notifications Icon with active pulse badge */}
        <button
          type="button"
          onClick={onOpenNotifications}
          aria-label="التنبيهات الأكاديمية"
          className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#3e4947] hover:bg-[#eaedff] hover:text-[#131b2e] flex items-center justify-center relative transition-colors border border-[#dae2fd]/40"
        >
          <span className="material-symbols-outlined text-xl">notifications</span>
          {hasUnreadNotification && (
            <span className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white animate-pulse" />
          )}
        </button>

        {/* Profile Avatar and Name */}
        <div className="flex items-center gap-2.5 pr-1 border-r border-[#eaedff] mr-1">
          <div className="text-left hidden md:block">
            <div className="text-xs font-bold text-[#131b2e] leading-tight">الباحث / الطالب الأكاديمي</div>
            <div className="text-[11px] text-[#6e7977]">قسم التربية البدنية وعلوم الحركة</div>
          </div>
          <img
            alt="صورة الطالب الأكاديمي"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-[#005c55]/20 shadow-xs"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XY_jeTrJeLKTBO5bOItovzCwOF5TiuKznmwy5tJmiurSUe987GrKF1DHecb8xb6lUBjrt49nG0rf7MRSCRuhS3LPNQ0Vb0u-sHo07dNQT8WjWSEZWcS2prIMSy4CwaZbZ7nvmEi4-8sHQq33FyzaW4pE9ZUxvKKL7ZS1DI6q181SFXzx4044g6mIcfKAvHVx7DWvN0lQ2GTThXi1PPGcS9ipLVAhie3phqbd-MKvQkbPJk2LfPh80xxCrJ"
          />
        </div>
      </div>
    </header>
  );
};
