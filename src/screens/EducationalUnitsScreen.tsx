import React, { useState, useMemo } from 'react';
import { ScreenRoute, UnitStatus } from '../types';
import { ALL_UNITS } from '../data/mockData';

interface EducationalUnitsScreenProps {
  onNavigate: (route: ScreenRoute) => void;
  searchFilter?: string;
}

export const EducationalUnitsScreen: React.FC<EducationalUnitsScreenProps> = ({
  onNavigate,
  searchFilter = '',
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'in_progress' | 'locked'>('all');
  const [localSearch, setLocalSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const query = (searchFilter || localSearch).trim().toLowerCase();

  const filteredUnits = useMemo(() => {
    let list = ALL_UNITS.filter((u) => {
      const matchesTab = activeTab === 'all' || u.status === activeTab;
      const matchesQuery =
        !query ||
        u.title.toLowerCase().includes(query) ||
        u.description.toLowerCase().includes(query) ||
        u.keywords.toLowerCase().includes(query);
      return matchesTab && matchesQuery;
    });

    if (!sortAsc) {
      list = [...list].reverse();
    }
    return list;
  }, [activeTab, query, sortAsc]);

  const completedCount = ALL_UNITS.filter((u) => u.status === 'completed').length;
  const inProgressCount = ALL_UNITS.filter((u) => u.status === 'in_progress').length;
  const lockedCount = ALL_UNITS.filter((u) => u.status === 'locked').length;

  return (
    <div className="flex flex-col w-full pb-14">
      {/* Top Academic Context Banner */}
      <div className="relative w-full rounded-2xl bg-[#f2f3ff] p-6 sm:p-8 mb-8 overflow-hidden shadow-xs border border-[#dae2fd]">
        <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-[#005c55]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 right-1/3 w-48 h-48 rounded-full bg-[#006398]/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#005c55] text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-base fill">menu_book</span>
              <span>المسار التعليمي والبحثي المعتمد</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#005c55]/40" />
              <span>بروتوكول التربية الحركية 2024-2025</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] tracking-tight mb-2">
              مكتبة الوحدات التعليمية{' '}
              <span className="text-[#005c55] font-extrabold">(16 وحدة)</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#3e4947] leading-relaxed">
              منهج تعليمي وبحثي متكامل لتعلم المهارات الحركية وتطويرها خطوة بخطوة وفق معايير الأداء المقنن والقياس الكينماتيكي الدقيق.
            </p>
          </div>

          {/* Overview Stats Chips */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="p-4 rounded-xl bg-white shadow-xs border border-[#dae2fd] flex flex-col items-center justify-center min-w-[90px] text-center">
              <span className="text-2xl font-extrabold text-[#005e3f]">{completedCount.toString().padStart(2, '0')}</span>
              <span className="text-[11px] font-bold text-[#6e7977]">مكتملة</span>
            </div>
            <div className="p-4 rounded-xl bg-white shadow-xs border border-[#dae2fd] flex flex-col items-center justify-center min-w-[90px] text-center">
              <span className="text-2xl font-extrabold text-[#006398]">{inProgressCount.toString().padStart(2, '0')}</span>
              <span className="text-[11px] font-bold text-[#6e7977]">قيد التعلم</span>
            </div>
            <div className="p-4 rounded-xl bg-white shadow-xs border border-[#dae2fd] flex flex-col items-center justify-center min-w-[90px] text-center">
              <span className="text-2xl font-extrabold text-[#6e7977]">{lockedCount.toString().padStart(2, '0')}</span>
              <span className="text-[11px] font-bold text-[#6e7977]">متبقية</span>
            </div>
          </div>
        </div>

        {/* Filter & Action Bar */}
        <div className="mt-6 pt-4 border-t border-[#eaedff] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6e7977] text-sm pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-white text-[#131b2e] placeholder-[#6e7977] pr-10 pl-4 py-2.5 rounded-xl text-xs shadow-xs outline-none focus:ring-2 focus:ring-[#005c55] border border-[#dae2fd]"
              placeholder="ابحث باسم المهارة، رقم الوحدة، أو المعيار الحركي..."
            />
          </div>

          {/* Filters & Sorting buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex p-1 bg-[#eaedff] rounded-xl border border-[#dae2fd]/60">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'all'
                    ? 'bg-white text-[#005c55] shadow-xs'
                    : 'text-[#3e4947] hover:text-[#131b2e]'
                }`}
              >
                الكل (16)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('completed')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'completed'
                    ? 'bg-white text-[#005c55] shadow-xs'
                    : 'text-[#3e4947] hover:text-[#131b2e]'
                }`}
              >
                مكتملة ({completedCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('in_progress')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'in_progress'
                    ? 'bg-white text-[#005c55] shadow-xs'
                    : 'text-[#3e4947] hover:text-[#131b2e]'
                }`}
              >
                قيد التعلم ({inProgressCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('locked')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'locked'
                    ? 'bg-white text-[#005c55] shadow-xs'
                    : 'text-[#3e4947] hover:text-[#131b2e]'
                }`}
              >
                لم تبدأ ({lockedCount})
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSortAsc(!sortAsc)}
              className="px-3.5 py-2.5 rounded-xl bg-white text-[#131b2e] text-xs font-bold shadow-xs hover:bg-[#eaedff] transition-colors flex items-center gap-1.5 border border-[#dae2fd]"
            >
              <span className="material-symbols-outlined text-sm">sort</span>
              <span>{sortAsc ? 'التدرج المنهجي (تصاعدي)' : 'التدرج المنهجي (تنازلي)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Units Grid (16 Units) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {filteredUnits.map((unit) => {
          const isCompleted = unit.status === 'completed';
          const isInProgress = unit.status === 'in_progress';
          const isLocked = unit.status === 'locked';

          return (
            <div
              key={unit.id}
              className={`group relative flex flex-col justify-between rounded-2xl bg-white p-5 shadow-xs hover:shadow-md transition-all duration-200 border ${
                unit.id === 10 ? 'border-[#005c55] ring-2 ring-[#005c55]/20' : 'border-[#dae2fd]'
              } ${isLocked ? 'opacity-85' : ''}`}
            >
              {/* Colored Side Bar */}
              <div
                className={`absolute top-0 right-0 bottom-0 w-1.5 rounded-r-2xl ${
                  isCompleted ? 'bg-[#005e3f]' : isInProgress ? 'bg-[#5bb8fe]' : 'bg-[#bdc9c6]'
                }`}
              />

              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isCompleted
                        ? 'bg-[#005e3f]/10 text-[#005e3f]'
                        : isInProgress
                        ? 'bg-[#5bb8fe]/20 text-[#006398]'
                        : 'bg-[#eaedff] text-[#6e7977]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {isCompleted
                        ? 'accessibility_new'
                        : isInProgress
                        ? 'motion_photos_on'
                        : 'hourglass_empty'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isCompleted && (
                      <span className="px-2.5 py-0.5 rounded-md bg-[#005e3f]/10 text-[#005e3f] text-xs font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs fill">check_circle</span>
                        مكتملة
                      </span>
                    )}
                    {isInProgress && (
                      <span className="px-2.5 py-0.5 rounded-md bg-[#5bb8fe]/20 text-[#00476e] text-xs font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs animate-spin">sync</span>
                        قيد التعلم
                      </span>
                    )}
                    {isLocked && (
                      <span className="px-2.5 py-0.5 rounded-md bg-[#eaedff] text-[#6e7977] text-xs font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">lock</span>
                        لم تبدأ
                      </span>
                    )}
                    <span className="text-base font-extrabold text-[#bdc9c6] opacity-70">
                      {unit.numberStr}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[#131b2e] mb-1.5 group-hover:text-[#005c55] transition-colors leading-snug">
                  {unit.title}
                </h3>

                <p className="text-xs text-[#3e4947] line-clamp-2 mb-4 leading-relaxed">
                  {unit.description}
                </p>

                {/* Badges / Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#3e4947] text-[11px] font-medium flex items-center gap-1 border border-[#dae2fd]/40">
                    <span className="material-symbols-outlined text-xs">fitness_center</span> {unit.skillsCount} مهارات
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#3e4947] text-[11px] font-medium flex items-center gap-1 border border-[#dae2fd]/40">
                    <span className="material-symbols-outlined text-xs">videocam</span> فيديو تحليلي
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#3e4947] text-[11px] font-medium flex items-center gap-1 border border-[#dae2fd]/40">
                    <span className="material-symbols-outlined text-xs">quiz</span> اختبار
                  </span>
                </div>
              </div>

              <div>
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-[#3e4947]">نسبة الإتقان الأكاديمي</span>
                    <span
                      className={`font-bold ${
                        isCompleted
                          ? 'text-[#005e3f]'
                          : isInProgress
                          ? 'text-[#006398]'
                          : 'text-[#6e7977]'
                      }`}
                    >
                      {unit.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-[#005e3f]'
                          : isInProgress
                          ? 'bg-[#5bb8fe]'
                          : 'bg-[#bdc9c6]'
                      }`}
                      style={{ width: `${unit.progressPercent}%` }}
                    />
                  </div>
                </div>

                {isLocked ? (
                  <button
                    type="button"
                    disabled
                    className="w-full py-2.5 px-3 rounded-xl bg-[#eaedff] text-[#6e7977] text-xs font-bold cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">lock</span>
                    <span>{unit.prerequisite || 'الوحدة مقفلة حالياً'}</span>
                  </button>
                ) : isInProgress ? (
                  <button
                    type="button"
                    onClick={() => onNavigate('unit-learning-experience')}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#0f766e] text-white text-xs font-bold hover:bg-[#005c55] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>متابعة التدريب</span>
                    <span className="material-symbols-outlined text-sm rotate-180">arrow_back</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigate('unit-learning-experience')}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#f2f3ff] text-[#005c55] text-xs font-bold hover:bg-[#005c55] hover:text-white transition-all flex items-center justify-center gap-1.5 border border-[#dae2fd]/60"
                  >
                    <span>عرض محتوى الوحدة</span>
                    <span className="material-symbols-outlined text-sm rotate-180">arrow_back</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty Search State */}
      {filteredUnits.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl shadow-xs my-6 border border-[#dae2fd]">
          <div className="w-16 h-16 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#6e7977] mb-3">
            <span className="material-symbols-outlined text-3xl">search_off</span>
          </div>
          <h4 className="text-base font-bold text-[#131b2e] mb-1">لم يتم العثور على وحدات تعليمية مطابقة</h4>
          <p className="text-xs text-[#3e4947] max-w-sm">يرجى تجربة كلمات بحث أخرى أو تغيير خيارات التصفية لعرض وحدات المنهج.</p>
        </div>
      )}

      {/* Bottom Analytics & Methodology Summary Bar */}
      <div className="mt-10 p-6 rounded-2xl bg-[#f2f3ff] shadow-xs flex flex-col xl:flex-row items-center justify-between gap-6 border border-[#dae2fd]">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
          <div className="w-14 h-14 rounded-2xl bg-[#0f766e] text-white flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <div>
            <div className="text-base font-bold text-[#131b2e]">معدل الإنجاز العام للمنهج: 69.3%</div>
            <div className="text-xs text-[#3e4947] mt-0.5">
              تم استيفاء متطلبات 9 وحدات كاملة من أصل 16 وحدة بحثية مسجلة للبرنامج الحركي.
            </div>
          </div>
        </div>

        {/* Visual Linear Aggregation */}
        <div className="w-full xl:w-96 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-[#131b2e]">
            <span>الساعات المعتمدة للتدريب: 24/36 ساعة</span>
            <span className="text-[#005c55] font-extrabold">69%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-[#dae2fd] overflow-hidden flex">
            <div className="bg-[#005e3f] h-full transition-all" style={{ width: '56.25%' }} title="مكتملة (9)" />
            <div className="bg-[#5bb8fe] h-full transition-all" style={{ width: '18.75%' }} title="قيد التعلم (3)" />
            <div className="bg-[#bdc9c6]/40 h-full transition-all" style={{ width: '25%' }} title="متبقية (4)" />
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#6e7977] font-semibold">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#005e3f]" /> 9 مكتملة
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#5bb8fe]" /> 3 جارية
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#bdc9c6]" /> 4 متبقية
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 w-full xl:w-auto justify-end">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex-1 xl:flex-none px-5 py-3 rounded-xl bg-white text-[#005c55] font-bold text-xs shadow-xs hover:bg-[#eaedff] transition-all flex items-center justify-center gap-1.5 border border-[#dae2fd]"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>تحميل خطة الوحدات (PDF)</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('unit-learning-experience')}
            className="flex-1 xl:flex-none px-5 py-3 rounded-xl bg-[#0f766e] text-white font-bold text-xs shadow-sm hover:bg-[#005c55] transition-all flex items-center justify-center gap-1.5"
          >
            <span>متابعة الوحدة النشطة</span>
            <span className="material-symbols-outlined text-base rotate-180">arrow_back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
