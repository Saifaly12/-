import React, { useState, useMemo } from 'react';
import { ScreenRoute } from '../types';
import { ALL_UNITS, TRAINING_LOGS, SUPERVISOR_FEEDBACK } from '../data/mockData';

interface DashboardScreenProps {
  onNavigate: (route: ScreenRoute) => void;
  searchFilter?: string;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate, searchFilter = '' }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'in-progress' | 'completed' | 'pending'>('all');
  const [localSearch, setLocalSearch] = useState('');

  // Effective search query combined from top header and local input
  const activeSearch = (searchFilter || localSearch).trim().toLowerCase();

  const filteredUnits = useMemo(() => {
    return ALL_UNITS.filter((unit) => {
      let matchesFilter = true;
      if (selectedFilter === 'in-progress') matchesFilter = unit.status === 'in_progress';
      if (selectedFilter === 'completed') matchesFilter = unit.status === 'completed';
      if (selectedFilter === 'pending') matchesFilter = unit.status === 'locked';

      const matchesSearch =
        !activeSearch ||
        unit.title.toLowerCase().includes(activeSearch) ||
        unit.description.toLowerCase().includes(activeSearch) ||
        unit.keywords.toLowerCase().includes(activeSearch);

      return matchesFilter && matchesSearch;
    });
  }, [selectedFilter, activeSearch]);

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="flex flex-col w-full gap-y-8 pb-14">
      {/* 1. Student Welcome Header with Biomechanical Cadence */}
      <section className="relative overflow-hidden rounded-2xl bg-[#f2f3ff] p-6 sm:p-8 shadow-xs border border-[#dae2fd]">
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-[#9cf2e8]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-16 w-80 h-80 bg-[#5bb8fe]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <span className="px-3.5 py-1 rounded-full bg-[#005c55]/10 text-[#005c55] text-xs font-bold inline-flex items-center gap-1.5 border border-[#005c55]/20">
                <span className="material-symbols-outlined text-sm">science</span>
                الفصل الدراسي - دراسة تجريبية مقننة
              </span>
              <span className="text-[#6e7977] text-xs font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                الأحد، 15 شعبان 1446 هـ
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] tracking-tight">
              أهلاً بك مجدداً، الباحث / الطالب الأكاديمي{' '}
              <span className="inline-block transform origin-bottom hover:rotate-12 transition-transform duration-300">
                👋
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#3e4947] leading-relaxed">
              مرحباً بك في بيئتك التعليمية، واصل إتقان مهاراتك الحركية وفق برنامجك التدريبي المقنن المصمم وفق أحدث معايير التحليل البيوميكانيكي والقياس الحركي.
            </p>
          </div>

          {/* Quick Session Indicator */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-xs border border-[#dae2fd] self-start xl:self-auto min-w-[260px]">
            <div className="w-12 h-12 rounded-xl bg-[#007952]/15 text-[#005e3f] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">pace</span>
            </div>
            <div>
              <span className="text-[11px] text-[#6e7977] block font-semibold">الجلسة الميدانية القادمة</span>
              <span className="text-sm font-bold text-[#131b2e] block">اليوم • 04:30 مساءً</span>
              <span className="text-xs text-[#005c55] block font-semibold">معمل القياسات المهارية (قاعة 3)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Progress Overview Bento Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Radial Metric Canvas (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl shadow-xs border border-[#dae2fd] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#6e7977] block font-bold mb-1">
                المؤشر الأكاديمي الشامل
              </span>
              <h2 className="text-lg font-bold text-[#131b2e]">الإنجاز الحركي العام</h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#005c55]/10 text-[#005c55] text-xs font-bold flex items-center gap-1.5 border border-[#005c55]/20">
              <span className="w-2 h-2 rounded-full bg-[#005c55] animate-pulse" />
              قيد التتبع النشط
            </span>
          </div>

          <div className="my-6 flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* High-Contrast RTL Radial Progress Indicator */}
            <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle
                  className="text-[#eaedff]"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                />
                <circle
                  className="text-[#005c55] transition-all duration-1000 ease-out"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="70"
                  stroke="currentColor"
                  strokeDasharray="440"
                  strokeDashoffset="193.6"
                  strokeLinecap="round"
                  strokeWidth="12"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold text-[#131b2e] leading-none">
                  56<span className="text-xl text-[#005c55] font-bold">%</span>
                </span>
                <span className="text-xs text-[#6e7977] mt-1 font-semibold">معدل الإنجاز المقنن</span>
              </div>
            </div>

            <div className="space-y-2 w-full">
              <div className="p-2.5 rounded-xl bg-[#f2f3ff] flex items-center justify-between text-xs">
                <span className="text-[#3e4947]">الزمن التدريبي المقضي</span>
                <span className="font-bold text-[#131b2e]">18.5 ساعة</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#f2f3ff] flex items-center justify-between text-xs">
                <span className="text-[#3e4947]">معدل الكفاءة الحركية</span>
                <span className="font-bold text-[#005e3f]">+14% عن خط الأساس</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#f2f3ff] flex items-center justify-between text-xs">
                <span className="text-[#3e4947]">التقييمات المنجزة</span>
                <span className="font-bold text-[#006398]">12 من أصل 20</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#eaedff] flex items-center justify-between text-[#6e7977] text-xs">
            <span>المستوى المستهدف: 75% قبل الاختبار البعدي</span>
            <button
              type="button"
              onClick={() => onNavigate('assessment-results')}
              className="text-[#005c55] font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>تفاصيل الخطة</span>
              <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Quantitative Stats Grid (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Metric 1: Completed */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#dae2fd] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#007952]/15 text-[#005e3f] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl fill">task_alt</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#005e3f]/10 text-[#005e3f] font-bold">
                مكتمل ومعتمد
              </span>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-extrabold text-[#131b2e] block">
                9 <span className="text-base font-medium text-[#6e7977]">وحدات</span>
              </span>
              <span className="text-xs text-[#3e4947] mt-1 block">
                تم استيفاء معايير الأداء والاختبارات القبلية والبعدية
              </span>
            </div>
            <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#005e3f] h-full rounded-full w-[56.25%]" />
            </div>
          </div>

          {/* Metric 2: In Progress */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#dae2fd] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#5bb8fe]/30 text-[#006398] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">progress_activity</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#006398]/10 text-[#006398] font-bold">
                تدريب نشط
              </span>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-extrabold text-[#131b2e] block">
                3 <span className="text-base font-medium text-[#6e7977]">وحدات</span>
              </span>
              <span className="text-xs text-[#3e4947] mt-1 block">
                جلسات تصوير مرئي وتحليل مسارات الزوايا الحركية
              </span>
            </div>
            <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#006398] h-full rounded-full w-[18.75%]" />
            </div>
          </div>

          {/* Metric 3: Pending */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#dae2fd] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#dae2fd] text-[#6e7977] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">lock_clock</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#dae2fd] text-[#3e4947] font-bold">
                في الانتظار
              </span>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-extrabold text-[#131b2e] block">
                4 <span className="text-base font-medium text-[#6e7977]">وحدات</span>
              </span>
              <span className="text-xs text-[#3e4947] mt-1 block">
                مرحلة المهارات المركبة المتقدمة ونقل أثر التدريب
              </span>
            </div>
            <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#bdc9c6] h-full rounded-full w-[25%]" />
            </div>
          </div>

          {/* Metric 4: Quiz Score */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#dae2fd] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#0f766e] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">military_tech</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#005c55]/10 text-[#005c55] font-bold">
                امتياز أكاديمي
              </span>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-extrabold text-[#005c55] block">
                88<span className="text-lg">%</span>
              </span>
              <span className="text-xs text-[#3e4947] mt-1 block">
                متوسط درجات الاختبارات التفاعلية والفهم الحركي
              </span>
            </div>
            <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#005c55] h-full rounded-full w-[88%]" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. 'متابعة التعلم' (Next Recommended Lesson Kinetic Banner) */}
      <section className="bg-[#005c55] text-white rounded-2xl overflow-hidden shadow-md relative border border-[#0f766e]">
        <div className="absolute inset-0 bg-[radial-gradient(#a3faef_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Video thumbnail preview */}
            <div
              onClick={() => onNavigate('unit-learning-experience')}
              className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-[#0f766e] shrink-0 shadow-inner group cursor-pointer"
            >
              <img
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                alt="معمل القياسات والتوازن"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj7gjEtWcJBjcOZdjL9weAiIcA3AZ2J4bEU3LQdL-5CIEVVhnrMLkBYVOGEUypl0XYh0P3YBEy5-QPtu9h6U3CcdSYnHUOSBZAAWrdqT0MkOTIyAmXhJryhIXPWc5k1Rwb3cjTPwzAzNfd1bxU62rVYjs25cAYkm2cSLsn1tc2DgHqJGJdcBWEoIDXqYgNFb-kqJ_tDub4EWgBfbE6DKE-pqPBGBgC_OLXrWbFwmd3XCtx05NGFV0M_w"
              />
              <div className="absolute inset-0 bg-[#005c55]/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white text-[#005c55] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl fill">play_arrow</span>
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-[#131b2e]/80 text-white px-2 py-0.5 rounded text-[11px] font-bold backdrop-blur-xs">
                12:40 د
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-[#0f766e] text-[#a3faef] px-2.5 py-0.5 rounded text-xs font-bold border border-[#a3faef]/30">
                  الوحدة الموصى بها الآن
                </span>
                <span className="text-[#9cf2e8] text-xs flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-sm">timer</span>
                  متبقي 18 دقيقة على إنهاء الجلسة
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                الوحدة التعليمية العاشرة: ضبط التوازن الحركي والتوافق العضلي العصبي
              </h2>
              <p className="text-xs sm:text-sm text-white/85 max-w-2xl leading-relaxed">
                التركيز على تمارين الثبات الديناميكي واستجابة العضلات المثبتة للجذع تحت ضغط حركي متغير، مع تحليل فيديو تصحيحي للزاوية الفقرية.
              </p>
              {/* RTL inline progress meter */}
              <div className="pt-1 flex items-center gap-3 max-w-md">
                <div className="flex-1 bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#9cf2e8] h-full rounded-full" style={{ width: '40%' }} />
                </div>
                <span className="text-xs text-[#80d5cb] whitespace-nowrap font-bold">40% مكتمل</span>
              </div>
            </div>
          </div>

          {/* Action Button CTA */}
          <div className="shrink-0 flex items-center">
            <button
              type="button"
              onClick={() => onNavigate('unit-learning-experience')}
              className="w-full lg:w-auto px-6 py-3.5 rounded-xl bg-white text-[#005c55] font-bold text-sm hover:bg-[#9cf2e8] transition-colors flex items-center justify-center gap-2 shadow-md active:translate-y-0.5"
            >
              <span>متابعة الدرس الحركي</span>
              <span className="material-symbols-outlined rotate-180 text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Filter, Search and Layout Management Bar */}
      <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === 'all'
                ? 'bg-[#005c55] text-white shadow-xs'
                : 'bg-white text-[#3e4947] hover:bg-[#eaedff] border border-[#dae2fd]'
            }`}
          >
            الكل (16)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('in-progress')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === 'in-progress'
                ? 'bg-[#005c55] text-white shadow-xs'
                : 'bg-white text-[#3e4947] hover:bg-[#eaedff] border border-[#dae2fd]'
            }`}
          >
            قيد التعلم (3)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === 'completed'
                ? 'bg-[#005c55] text-white shadow-xs'
                : 'bg-white text-[#3e4947] hover:bg-[#eaedff] border border-[#dae2fd]'
            }`}
          >
            مكتملة (9)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === 'pending'
                ? 'bg-[#005c55] text-white shadow-xs'
                : 'bg-white text-[#3e4947] hover:bg-[#eaedff] border border-[#dae2fd]'
            }`}
          >
            لم تبدأ بعد (4)
          </button>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80 shrink-0">
          <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6e7977] text-sm pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-white text-[#131b2e] placeholder-[#6e7977] pr-10 pl-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#005c55] text-xs shadow-xs border border-[#dae2fd]"
            placeholder="بحث في الوحدات والمهارات..."
          />
        </div>
      </section>

      {/* 5. Main Content Grid: Units Grid (8 Cols) + Quick Action Sidebar (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Grid of Educational Units (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
              <span>خريطة الوحدات التعليمية المبرمجة</span>
              <span className="text-[#6e7977] text-xs font-normal">({filteredUnits.length} وحدة معروضة)</span>
            </h3>
            <div className="flex items-center gap-1 text-[#6e7977] text-xs">
              <span className="material-symbols-outlined text-sm">tune</span>
              مرتبة حسب التسلسل المهاري
            </div>
          </div>

          {/* Unit Cards Dynamic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredUnits.slice(0, 8).map((unit) => {
              const isLocked = unit.status === 'locked';
              const isCompleted = unit.status === 'completed';
              const isInProgress = unit.status === 'in_progress';

              return (
                <article
                  key={unit.id}
                  className={`bg-white rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group border ${
                    unit.id === 10
                      ? 'border-[#005c55] ring-2 ring-[#005c55]/20'
                      : 'border-[#dae2fd]'
                  } ${isLocked ? 'opacity-80' : ''}`}
                >
                  {/* Status Indicator Stripe */}
                  <div
                    className={`absolute right-0 top-0 bottom-0 w-1.5 ${
                      isCompleted ? 'bg-[#005e3f]' : isInProgress ? 'bg-[#005c55]' : 'bg-[#bdc9c6]'
                    }`}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#6e7977]">الوحدة {unit.id.toString().padStart(2, '0')}</span>
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded-full bg-[#005e3f]/10 text-[#005e3f] text-xs font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs fill">check_circle</span>
                          مكتملة
                        </span>
                      )}
                      {isInProgress && (
                        <span className="px-2 py-0.5 rounded-full bg-[#005c55]/10 text-[#005c55] text-xs font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs animate-spin">rotate_right</span>
                          قيد التعلم
                        </span>
                      )}
                      {isLocked && (
                        <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#6e7977] text-xs font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">lock</span>
                          لم تبدأ
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-[#131b2e] group-hover:text-[#005c55] transition-colors leading-snug">
                      {unit.title}
                    </h4>

                    <p className="text-xs text-[#3e4947] mt-1.5 line-clamp-2 leading-relaxed">
                      {unit.description}
                    </p>

                    <div className="flex items-center gap-3 mt-4 text-[#6e7977] text-xs">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">hub</span> {unit.skillsCount} مهارات
                      </span>
                      <span>•</span>
                      {unit.quizScore ? (
                        <span className="text-[#005e3f] font-semibold">اختبار {unit.quizScore}%</span>
                      ) : isInProgress ? (
                        <span className="text-[#006398] font-semibold">بانتظار الاختبار التفاعلي</span>
                      ) : (
                        <span>مستوى تمهيدي</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#eaedff] flex items-center justify-between">
                    <div className="w-1/2">
                      <div
                        className={`flex justify-between text-xs font-bold mb-1 ${
                          isCompleted ? 'text-[#005e3f]' : isInProgress ? 'text-[#005c55]' : 'text-[#6e7977]'
                        }`}
                      >
                        <span>الإنجاز</span>
                        <span>{unit.progressPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#eaedff] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isCompleted ? 'bg-[#005e3f]' : isInProgress ? 'bg-[#005c55]' : 'bg-[#bdc9c6]'
                          }`}
                          style={{ width: `${unit.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isLocked}
                      onClick={() => onNavigate('unit-learning-experience')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        isLocked
                          ? 'bg-[#eaedff] text-[#6e7977] cursor-not-allowed'
                          : isInProgress
                          ? 'bg-[#005c55] text-white hover:bg-[#0f766e]'
                          : 'bg-[#f2f3ff] text-[#005c55] hover:bg-[#005c55] hover:text-white'
                      }`}
                    >
                      {isLocked ? 'مقفلة' : isInProgress ? 'متابعة الآن' : 'عرض الوحدة'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Catalog Note */}
          <div className="p-4 rounded-xl bg-[#f2f3ff] flex flex-col sm:flex-row items-center justify-between text-[#3e4947] text-xs gap-3 border border-[#dae2fd]">
            <span>يتم فتح الوحدات تباعاً وفقاً لإنجاز القياسات القبلية واختبارات الإتقان المهاري بنسبة لا تقل عن 80%.</span>
            <button
              type="button"
              onClick={() => onNavigate('educational-units')}
              className="text-[#005c55] font-bold hover:underline flex items-center gap-1 shrink-0"
            >
              <span>عرض جدول الوحدات الكامل (16)</span>
              <span className="material-symbols-outlined text-sm rotate-180">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Quick Action Sidebar / Academic Right-Aligned Sections (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-y-6">
          {/* Card 1: Upcoming Quizzes */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#dae2fd] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#005c55]">
                <span className="material-symbols-outlined text-xl fill">quiz</span>
                <h3 className="font-bold text-base text-[#131b2e]">الاختبارات السريعة القادمة</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold">
                2 متبقي
              </span>
            </div>

            <p className="text-xs text-[#3e4947] leading-relaxed">
              اختبارات التقييم المعرفي والفهم الحركي التفاعلية المؤكدة لنتائج الميدان.
            </p>

            <div className="space-y-2.5">
              {/* Quiz Item 1 */}
              <div
                onClick={() => onNavigate('interactive-quizzes')}
                className="p-3.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors flex items-center justify-between gap-3 group cursor-pointer border border-[#dae2fd]/60"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#006398] block">الوحدة 10 • تقييم مرحلي</span>
                  <h4 className="text-xs font-bold text-[#131b2e] group-hover:text-[#005c55] transition-colors">
                    اختبار سرعة رد الفعل وزوايا الاتزان
                  </h4>
                  <div className="flex items-center gap-2 text-[#6e7977] text-[11px]">
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-xs">timer</span> 5 دقائق
                    </span>
                    <span>•</span>
                    <span>8 أسئلة تصويرية</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-9 h-9 rounded-xl bg-[#005c55] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined rotate-180 text-lg fill">play_arrow</span>
                </button>
              </div>

              {/* Quiz Item 2 */}
              <div
                onClick={() => onNavigate('interactive-quizzes')}
                className="p-3.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors flex items-center justify-between gap-3 group cursor-pointer border border-[#dae2fd]/60"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#6e7977] block">الوحدة 11 • تحضيري</span>
                  <h4 className="text-xs font-bold text-[#131b2e] group-hover:text-[#005c55] transition-colors">
                    مفاهيم عزم القصور الذاتي والرشاقة
                  </h4>
                  <div className="flex items-center gap-2 text-[#6e7977] text-[11px]">
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-xs">timer</span> 7 دقائق
                    </span>
                    <span>•</span>
                    <span>10 أسئلة مقارنة</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-9 h-9 rounded-xl bg-[#eaedff] text-[#3e4947] flex items-center justify-center shrink-0 group-hover:text-[#005c55] transition-colors"
                >
                  <span className="material-symbols-outlined rotate-180 text-lg">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Academic Supervisor Notifications */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#dae2fd] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#006398]">
                <span className="material-symbols-outlined text-xl">supervised_user_circle</span>
                <h3 className="font-bold text-base text-[#131b2e]">توجيهات المشرف الأكاديمي</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#006398] animate-ping" />
            </div>

            <div className="p-3.5 rounded-xl bg-[#f2f3ff] border-r-4 border-[#006398] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#131b2e]">{SUPERVISOR_FEEDBACK.supervisorName}</span>
                <span className="text-[11px] text-[#6e7977]">{SUPERVISOR_FEEDBACK.timeAgo}</span>
              </div>
              <p className="text-xs text-[#3e4947] leading-relaxed">
                {SUPERVISOR_FEEDBACK.comment}
              </p>
              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#3e4947] text-[11px]">
                  {SUPERVISOR_FEEDBACK.tag}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('assessment-results')}
                  className="text-[#006398] font-bold text-xs hover:underline cursor-pointer"
                >
                  {SUPERVISOR_FEEDBACK.linkText}
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Practical Training Session Log */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#dae2fd] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#005e3f]">
                <span className="material-symbols-outlined text-xl">history_toggle_off</span>
                <h3 className="font-bold text-base text-[#131b2e]">سجل جلسات التدريب العملي</h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('assessment-results')}
                className="text-[#005c55] text-xs font-bold hover:underline"
              >
                عرض الكل
              </button>
            </div>

            <div className="space-y-1.5">
              {TRAINING_LOGS.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f2f3ff] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#005e3f]/10 text-[#005e3f] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-base">{log.icon}</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#131b2e] block">{log.title}</span>
                      <span className="text-[11px] text-[#6e7977]">{log.meta}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#005e3f]">{log.accuracyOrStatus}</span>
                </div>
              ))}
            </div>

            {/* Download Clinical Log Button */}
            <button
              type="button"
              onClick={handleExportPDF}
              className="w-full py-2.5 rounded-xl bg-[#eaedff] text-[#131b2e] font-semibold text-xs hover:bg-[#dae2fd] transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>تصدير السجل الحركي المعتمد (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
