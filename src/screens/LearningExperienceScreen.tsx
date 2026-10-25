import React, { useState } from 'react';
import { ScreenRoute } from '../types';

interface LearningExperienceScreenProps {
  onNavigate: (route: ScreenRoute) => void;
}

export const LearningExperienceScreen: React.FC<LearningExperienceScreenProps> = ({ onNavigate }) => {
  // Navigation active tab
  const [activeSection, setActiveSection] = useState<'theory' | 'gallery' | 'video' | 'drills' | 'assessment'>('theory');

  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSlowMo, setIsSlowMo] = useState(true);
  const [videoTab, setVideoTab] = useState<'notes' | 'transcript'>('notes');
  const [userNote, setUserNote] = useState('');
  const [notesList, setNotesList] = useState([
    {
      time: 'الدقيقة 03:40',
      tag: 'تحليل زاوية الركبة',
      text: 'يجب الانتباه إلى عدم دوران مشط القدم للخارج عند الشروع في وثبة الانتقال، لتفادي إجهاد أربطة الركبة الداخلية.',
      color: 'primary',
    },
    {
      time: 'الدقيقة 05:12',
      tag: 'توجيه النظر',
      text: 'تثبيت الرأس بمستوى أفقي مع النظر للأمام يعزز ثبات الجهاز الدهليزي بنسبة 28% مقارنة بالنظر نحو الأرض.',
      color: 'secondary',
    },
  ]);

  // Lightbox modal state
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    title: string;
    desc: string;
    imgUrl: string;
  }>({
    isOpen: false,
    title: '',
    desc: '',
    imgUrl: '',
  });

  // Checklist state
  const [criteria, setCriteria] = useState([
    {
      id: 1,
      title: 'وضعية الانثناء المبدئي بزاوية صحيحة (110°-120°)',
      desc: 'ثبات القدمين وتساوي توزيع ثقل الجسم قبل الشروع بالانتقال.',
      weight: 20,
      checked: true,
    },
    {
      id: 2,
      title: 'التوافق الكينماتيكي بين دفع القدم وتوجيه الذراع',
      desc: 'تزامن الدفع الانفجاري مع الذراع المقابلة في مسار انسيابي مستقيم.',
      weight: 25,
      checked: true,
    },
    {
      id: 3,
      title: 'الاستقرار الديناميكي للجذع في مرحلة الطيران (Apex)',
      desc: 'عدم ميلان العمود الفقري جانباً والمحافظة على استقامة خط الكتفين.',
      weight: 25,
      checked: true,
    },
    {
      id: 4,
      title: 'مرونة الهبوط وتشتيت طاقة الارتطام',
      desc: 'النزول على المشطين أولاً ثم الكعبين دون إحداث ارتداد عنيف.',
      weight: 20,
      checked: false,
    },
    {
      id: 5,
      title: 'استعادة الوضع الرأسي في زمن قياسي (< 0.6 ثانية)',
      desc: 'الاستعداد الفوري لبدء حركة تالية دون فقدان التوازن.',
      weight: 10,
      checked: false,
    },
  ]);

  // Drill timer states
  const [activeDrillTimer, setActiveDrillTimer] = useState<number | null>(null);

  // Score calculation
  const totalScore = criteria.reduce((acc, curr) => (curr.checked ? acc + curr.weight : acc), 0);

  // Radial calculation (r=40 -> circ=251.2)
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (totalScore / 100) * circumference;

  const toggleCriterion = (id: number) => {
    setCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c))
    );
  };

  const handleResetChecklist = () => {
    setCriteria((prev) => prev.map((c) => ({ ...c, checked: false })));
  };

  const handleAddUserNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userNote.trim()) return;
    setNotesList((prev) => [
      ...prev,
      {
        time: 'ملاحظة شخصية (04:15)',
        tag: 'تسجيل الطالب',
        text: userNote.trim(),
        color: 'primary',
      },
    ]);
    setUserNote('');
  };

  const scrollTo = (id: string, section: 'theory' | 'gallery' | 'video' | 'drills' | 'assessment') => {
    setActiveSection(section);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col w-full pb-14">
      {/* Unit Header & Breadcrumbs Block */}
      <section className="relative rounded-2xl bg-white p-6 sm:p-8 shadow-xs mb-8 overflow-hidden border border-[#dae2fd]">
        <div className="absolute -left-16 -top-20 w-80 h-80 rounded-full bg-[#005c55]/5 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#006398]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Breadcrumbs & Status Flag */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav aria-label="مسار التصفح" className="flex items-center gap-2 text-[#6e7977] text-xs font-medium">
              <button
                type="button"
                onClick={() => onNavigate('overview')}
                className="hover:text-[#005c55] transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">home</span>
                <span>الرئيسية</span>
              </button>
              <span className="material-symbols-outlined text-xs text-[#bdc9c6]">chevron_left</span>
              <button
                type="button"
                onClick={() => onNavigate('educational-units')}
                className="hover:text-[#005c55] transition-colors"
              >
                الوحدات التعليمية
              </button>
              <span className="material-symbols-outlined text-xs text-[#bdc9c6]">chevron_left</span>
              <span className="text-[#005c55] font-bold">الوحدة العاشرة</span>
            </nav>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#007952]/15 text-[#005e3f] text-xs font-bold flex items-center gap-1 border border-[#007952]/20">
                <span className="material-symbols-outlined text-sm">bolt</span>
                <span>مستوى متقدم (أكاديمي)</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-[#eaedff] text-[#3e4947] text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>مخصص: 45 دقيقة</span>
              </span>
            </div>
          </div>

          {/* Main Unit Title & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mt-1">
            <div className="lg:col-span-8 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#005c55] text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#005c55] inline-block" />
                <span>منهاج التربية البدنية وعلوم الحركة الرياضية</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] leading-tight">
                الوحدة التعليمية العاشرة: المهارات المركبة والتوافق الحركي المعقد
              </h1>
              <p className="text-xs sm:text-sm text-[#3e4947] max-w-3xl leading-relaxed">
                دراسة تحليلية وتطبيقية لضبط التوازن والانتقال الحركي السريع مع الربط التوافقي وفق المعايير الكينماتيكية لمركز ثقل الجسم وتحليل زوايا الدفع الميداني.
              </p>
            </div>

            {/* Progress Matrix Card */}
            <div className="lg:col-span-4 bg-[#f2f3ff] p-4 rounded-xl flex flex-col gap-2 shadow-xs border border-[#dae2fd]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#131b2e]">إنجاز الوحدة الكلي</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-[#005c55]">65</span>
                  <span className="text-sm font-bold text-[#005c55]">%</span>
                </div>
              </div>
              {/* RTL Progress Bar */}
              <div className="w-full h-2.5 bg-[#eaedff] rounded-full overflow-hidden" dir="rtl">
                <div
                  className="h-full bg-[#005c55] rounded-full transition-all duration-700 ease-out"
                  style={{ width: '65%' }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#6e7977] font-semibold mt-1">
                <span className="flex items-center gap-1 text-[#005e3f]">
                  <span className="material-symbols-outlined text-xs fill">verified_user</span>
                  <span>تم اجتياز 3 أجزاء</span>
                </span>
                <span>متبقي جزآن (الاختبار والتطبيق)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Horizontal Navigation Sub-Menu */}
      <nav
        aria-label="أقسام الوحدة الدراسية"
        className="sticky top-20 z-30 bg-white/95 backdrop-blur-md rounded-xl shadow-xs p-1.5 mb-8 flex items-center gap-2 overflow-x-auto border border-[#dae2fd]"
      >
        <button
          type="button"
          onClick={() => scrollTo('theoretical-section', 'theory')}
          className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
            activeSection === 'theory'
              ? 'bg-[#0f766e] text-white shadow-xs'
              : 'text-[#3e4947] hover:bg-[#eaedff]'
          }`}
        >
          <span className="material-symbols-outlined text-base">menu_book</span>
          <span>[1] الشرح النظري والمفاهيم</span>
        </button>

        <button
          type="button"
          onClick={() => scrollTo('sequential-gallery', 'gallery')}
          className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
            activeSection === 'gallery'
              ? 'bg-[#0f766e] text-white shadow-xs'
              : 'text-[#3e4947] hover:bg-[#eaedff]'
          }`}
        >
          <span className="material-symbols-outlined text-base">view_carousel</span>
          <span>[2] مراحل الأداء المتسلسل</span>
        </button>

        <button
          type="button"
          onClick={() => scrollTo('video-player-section', 'video')}
          className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
            activeSection === 'video'
              ? 'bg-[#0f766e] text-white shadow-xs'
              : 'text-[#3e4947] hover:bg-[#eaedff]'
          }`}
        >
          <span className="material-symbols-outlined text-base">play_circle</span>
          <span>[3] الفيديو التعليمي والتحليلي</span>
        </button>

        <button
          type="button"
          onClick={() => scrollTo('exercises-section', 'drills')}
          className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
            activeSection === 'drills'
              ? 'bg-[#0f766e] text-white shadow-xs'
              : 'text-[#3e4947] hover:bg-[#eaedff]'
          }`}
        >
          <span className="material-symbols-outlined text-base">fitness_center</span>
          <span>[4] التمرينات التطبيقية المقننة</span>
        </button>

        <button
          type="button"
          onClick={() => scrollTo('assessment-section', 'assessment')}
          className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
            activeSection === 'assessment'
              ? 'bg-[#0f766e] text-white shadow-xs'
              : 'text-[#3e4947] hover:bg-[#eaedff]'
          }`}
        >
          <span className="material-symbols-outlined text-base">checklist_rtl</span>
          <span>[5] التقويم ورصد الأداء الحركي</span>
        </button>
      </nav>

      {/* SECTION 1: THEORETICAL & CONCEPTUAL FRAMEWORK */}
      <section className="flex flex-col gap-6 mb-14" id="theoretical-section">
        <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#005c55]/10 text-[#005c55] flex items-center justify-center font-extrabold text-base">
              01
            </div>
            <div>
              <span className="text-xs text-[#6e7977] uppercase tracking-wider font-bold">التأصيل العلمي</span>
              <h2 className="text-xl font-bold text-[#131b2e]">الشرح النظري والمفاهيم الكينماتيكية</h2>
            </div>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#3e4947]">
            المرجع: الدليل الأكاديمي لعلوم الحركة الرياضية
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Definition Card */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#dae2fd] flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#005c55] font-bold text-base">
                <span className="material-symbols-outlined text-xl">psychology_alt</span>
                <h3>مفهوم التوافق الحركي المركب وأهميته الفسيولوجية</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#3e4947] leading-relaxed">
                يُعرّف التوافق الحركي المعقد بأنه القدرة العصبية-العضلية الفائقة على دمج أكثر من نمط حركي أحادي داخل سلسلة متصلة تتسم بالسلاسة، وتعتمد أساساً على سرعة معالجة الإشارات الحسية الدهليزية واستجابة المستقبلات الذاتية العضلية لضبط مركز ثقل الجسم (<span className="font-bold text-[#005c55]">Center of Mass</span>) دون فقدان الزخم المتولد.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#006398] text-2xl">speed</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#131b2e]">السرعة الإدراكية</span>
                    <span className="text-[11px] text-[#6e7977]">زمن استجابة أقل من 0.24 ثانية</span>
                  </div>
                </div>
                <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#005c55] text-2xl">balance</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#131b2e]">التوازن الديناميكي</span>
                    <span className="text-[11px] text-[#6e7977]">انحراف لا يتجاوز 4 درجات</span>
                  </div>
                </div>
                <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#005e3f] text-2xl">compress</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#131b2e]">كفاءة الطاقة</span>
                    <span className="text-[11px] text-[#6e7977]">تقليل الجهد العضلي الزائد</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mass Center Trajectory Graph */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#dae2fd] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#006398] font-bold text-base">
                  <span className="material-symbols-outlined text-xl">biotech</span>
                  <h3>التحليل الكينماتيكي لحركة الجسم ومسار مركز الثقل</h3>
                </div>
                <span className="px-3 py-0.5 rounded-full bg-[#cce5ff] text-[#00476e] text-xs font-bold">
                  رسم إشعاعي ثلاثي الأبعاد
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#3e4947] leading-relaxed">
                عند تنفيذ الانتقال الحركي السريع، ينخفض خط عمل مركز ثقل الجسم رأسياً بمقدار يتراوح بين 12 إلى 15 سم خلال المرحلة الانتقالية، لتقليص عزم القصور الذاتي الدوراني وتمكين الجذع من تغيير المتجه بزوايا حادة.
              </p>

              {/* Biomechanical Visual Diagram SVG */}
              <div className="w-full bg-[#f2f3ff] rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden border border-[#dae2fd]/60">
                <svg className="w-full h-44 text-[#005c55]" fill="none" viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">
                  <line stroke="#cbd5e1" strokeDasharray="6 6" strokeWidth="1.5" x1="0" x2="700" y1="160" y2="160" />
                  <line stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth="0.75" x1="0" x2="700" y1="100" y2="100" />
                  <path d="M 50 140 Q 200 40 350 90 T 650 130" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
                  <circle cx="50" cy="140" fill="#005c55" r="7" />
                  <circle cx="210" cy="50" fill="#006398" r="8" />
                  <circle cx="350" cy="90" fill="#007952" r="7" />
                  <circle cx="650" cy="130" fill="#ba1a1a" r="7" />

                  <text fill="#3e4947" fontFamily="Cairo" fontSize="12" fontWeight="bold" textAnchor="middle" x="50" y="180">نقطة الارتكاز</text>
                  <text fill="#006398" fontFamily="Cairo" fontSize="12" fontWeight="bold" textAnchor="middle" x="210" y="32">أقصى ارتفاع مسار (Apex)</text>
                  <text fill="#007952" fontFamily="Cairo" fontSize="12" fontWeight="bold" textAnchor="middle" x="350" y="70">الانتقال الزاوي 72°</text>
                  <text fill="#ba1a1a" fontFamily="Cairo" fontSize="12" fontWeight="bold" textAnchor="middle" x="650" y="180">تشتيت قوة الارتطام</text>

                  <path d="M 210 50 L 260 20" markerEnd="url(#arrow)" stroke="#006398" strokeWidth="2" />
                  <defs>
                    <marker id="arrow" markerHeight="6" markerWidth="6" orient="auto-start-reverse" refX="5" refY="5" viewBox="0 0 10 10">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#006398" />
                    </marker>
                  </defs>
                </svg>

                <div className="flex items-center justify-between w-full pt-2 text-[11px] font-bold text-[#6e7977]">
                  <span>المحور السيني: المسافة المقطوعة (متر)</span>
                  <span>المحور الصادي: ارتفاع مركز الثقل (سم)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Objectives Stack */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#dae2fd] flex flex-col gap-4 h-full">
              <div className="flex items-center gap-2 text-[#005c55] font-bold text-base">
                <span className="material-symbols-outlined text-xl">flag</span>
                <h3>الأهداف التعليمية والسلوكية</h3>
              </div>
              <span className="text-xs text-[#6e7977]">المخرجات المعيارية المستهدفة بنهاية الوحدة</span>

              <div className="flex flex-col gap-3.5 mt-1">
                {/* Cognitive Objective */}
                <div className="p-4 rounded-xl bg-[#f2f3ff] flex flex-col gap-1.5 border-r-4 border-[#006398]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#006398] flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">menu_book</span>
                      <span>المجال المعرفي</span>
                    </span>
                    <span className="text-[11px] font-bold bg-[#dae2fd] text-[#006398] px-2 py-0.5 rounded-full">استيعاب</span>
                  </div>
                  <p className="text-xs text-[#3e4947] leading-relaxed">
                    أن يشرح المتعلم الأساس الميكانيكي لدوران الجذع وتوزيع ثقل القدمين بدقة علمية تتجاوز 85%.
                  </p>
                </div>

                {/* Motor Objective */}
                <div className="p-4 rounded-xl bg-[#f2f3ff] flex flex-col gap-1.5 border-r-4 border-[#005c55]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#005c55] flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">sports_gymnastics</span>
                      <span>المجال المهاري الحركي</span>
                    </span>
                    <span className="text-[11px] font-bold bg-[#005c55]/10 text-[#005c55] px-2 py-0.5 rounded-full">إتقان</span>
                  </div>
                  <p className="text-xs text-[#3e4947] leading-relaxed">
                    أن يؤدي المتعلم تتابع الخطوات الانتقالية مع التوقف الاتزاني السريع في زمن لا يتعدى 3.2 ثوانٍ.
                  </p>
                </div>

                {/* Affective Objective */}
                <div className="p-4 rounded-xl bg-[#f2f3ff] flex flex-col gap-1.5 border-r-4 border-[#005e3f]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#005e3f] flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">sentiment_very_satisfied</span>
                      <span>المجال الانفعالي / الوجداني</span>
                    </span>
                    <span className="text-[11px] font-bold bg-[#005e3f]/10 text-[#005e3f] px-2 py-0.5 rounded-full">اتجاه إيجابي</span>
                  </div>
                  <p className="text-xs text-[#3e4947] leading-relaxed">
                    أن يُبدي المتعلم ثقة ودافعية ذاتية أثناء محاولات المعايرة الحركية وتصحيح زوايا الهبوط.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 3 Core Execution Phases Bento */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#dae2fd]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[#005c55] font-bold text-base">
              <span className="material-symbols-outlined text-xl">timeline</span>
              <h3>المراحل الفنية المعيارية للأداء الحركي</h3>
            </div>
            <span className="text-xs text-[#6e7977] font-semibold">تتابع زمني ثلاثي النطاق</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Preparatory Phase */}
            <div className="p-4 rounded-xl bg-[#f2f3ff] flex flex-col gap-1.5 border border-[#dae2fd]/60">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-[#005c55]">المرحلة 01</span>
                <span className="px-2 py-0.5 rounded bg-[#dae2fd] text-[#3e4947] text-[11px] font-bold">التمهيد والإعداد</span>
              </div>
              <h4 className="text-xs font-bold text-[#131b2e]">وقفة التأهب وخفض مركز الثقل</h4>
              <p className="text-xs text-[#3e4947] leading-relaxed">
                اتساع القدمين بعرض الكتفين، انثناء مفصلي الركبتين بزاوية 110-120 درجة، ميل الجذع قليلاً للأمام لتهيئة العضلات الباسطة.
              </p>
              <div className="mt-1 flex items-center gap-1 text-[#6e7977] text-[11px] font-bold">
                <span className="material-symbols-outlined text-sm text-[#006398] fill">check_circle</span>
                <span>نقطة التركيز: توزيع الوزن على مشطي القدمين</span>
              </div>
            </div>

            {/* Main Execution Phase */}
            <div className="p-4 rounded-xl bg-[#f2f3ff] flex flex-col gap-1.5 border-t-2 border-[#005c55] border-x border-b border-[#dae2fd]/60">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-[#005c55]">المرحلة 02</span>
                <span className="px-2 py-0.5 rounded bg-[#005c55]/10 text-[#005c55] text-[11px] font-bold">الأداء الرئيسي</span>
              </div>
              <h4 className="text-xs font-bold text-[#131b2e]">الدفع الانفجاري والربط التوافقي</h4>
              <p className="text-xs text-[#3e4947] leading-relaxed">
                انطلاق حركي متزامن عبر مد مفصل الكاحل والركبة مع مرجحة الذراع المعاكسة للتوجيه الحركي نحو الهدف بزاوية مسار مثالية.
              </p>
              <div className="mt-1 flex items-center gap-1 text-[#6e7977] text-[11px] font-bold">
                <span className="material-symbols-outlined text-sm text-[#005c55] fill">check_circle</span>
                <span>نقطة التركيز: تماسك عضلات الجذع (Core)</span>
              </div>
            </div>

            {/* Follow-through Phase */}
            <div className="p-4 rounded-xl bg-[#f2f3ff] flex flex-col gap-1.5 border border-[#dae2fd]/60">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-[#005c55]">المرحلة 03</span>
                <span className="px-2 py-0.5 rounded bg-[#dae2fd] text-[#3e4947] text-[11px] font-bold">المتابعة والختام</span>
              </div>
              <h4 className="text-xs font-bold text-[#131b2e]">امتصاص الصدمة واستعادة التوازن</h4>
              <p className="text-xs text-[#3e4947] leading-relaxed">
                هبوط مرن يبدأ من مقدمة القدمين ثم الكعبين مع انثناء تعويضي في الركبتين لامتصاص طاقة الارتطام واستقرار الجذع.
              </p>
              <div className="mt-1 flex items-center gap-1 text-[#6e7977] text-[11px] font-bold">
                <span className="material-symbols-outlined text-sm text-[#005e3f] fill">check_circle</span>
                <span>نقطة التركيز: تفادي الارتداد الخلفي المفاجئ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Common Mistakes Table */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#dae2fd] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#ba1a1a] font-bold text-base">
              <span className="material-symbols-outlined text-xl">rule</span>
              <h3>مصفوفة الأخطاء الشائعة واستراتيجيات التصحيح الفوري</h3>
            </div>
            <span className="text-xs text-[#6e7977] font-semibold">تشخيص ميداني دقيق</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-[#f2f3ff] text-[#131b2e] text-xs font-bold">
                  <th className="p-3.5 rounded-r-xl">الخطأ الفني الشائع</th>
                  <th className="p-3.5">السبب الكينماتيكي / العضلي</th>
                  <th className="p-3.5">الإجراء والتغذية الراجعة التصحيحية</th>
                  <th className="p-3.5 rounded-l-xl text-center">التأثير على الأداء</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-[#eaedff]">
                <tr className="hover:bg-[#f2f3ff]/50 transition-colors">
                  <td className="p-3.5 font-bold text-[#131b2e] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] shrink-0" />
                    <span>استقامة الركبتين المفرطة أثناء وقفة الاستعداد</span>
                  </td>
                  <td className="p-3.5 text-[#3e4947]">
                    ارتفاع مفرط في مركز ثقل الجسم يحد من مرونة الدفع المبدئي.
                  </td>
                  <td className="p-3.5 text-[#005c55] font-bold">
                    تطبيق تمرين القرفصاء الجزئي الموجه أمام مرآة تحليليّة وضبط زاوية 110°.
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2.5 py-1 rounded bg-[#ffdad6] text-[#93000a] text-[11px] font-bold">
                      فقدان 35% من قوة التسارع
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-[#f2f3ff]/50 transition-colors">
                  <td className="p-3.5 font-bold text-[#131b2e] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] shrink-0" />
                    <span>عدم توافق حركة الذراع مع انطلاق الرجلين</span>
                  </td>
                  <td className="p-3.5 text-[#3e4947]">
                    خلل في التوقيت العصبي العضلي وافتقار لتوافق السلاسل الكينماتيكية.
                  </td>
                  <td className="p-3.5 text-[#005c55] font-bold">
                    عزل الذراعين وتدريبهما بإشارات صوتية متواترة (Metronome) بمعدل 60 نبضة/دقيقة.
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2.5 py-1 rounded bg-[#eaedff] text-[#3e4947] text-[11px] font-bold">
                      انحراف مسار الحركة 15°
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-[#f2f3ff]/50 transition-colors">
                  <td className="p-3.5 font-bold text-[#131b2e] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] shrink-0" />
                    <span>الهبوط المفاجئ على الكعبين بارتطام شديد</span>
                  </td>
                  <td className="p-3.5 text-[#3e4947]">
                    غياب امتصاص القوة الارتدادية وتأخر في عمل العضلة ذات الرؤوس الفخذية.
                  </td>
                  <td className="p-3.5 text-[#005c55] font-bold">
                    التدريب على القفز والهبوط الصامت فوق مرتبة إسفنجية مضغوطة بسماكة 10 سم.
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2.5 py-1 rounded bg-[#ffdad6] text-[#93000a] text-[11px] font-bold">
                      إجهاد مرتفع للمفاصل
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 2: SEQUENTIAL PHOTO GALLERY */}
      <section className="flex flex-col gap-6 mb-14" id="sequential-gallery">
        <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#006398]/10 text-[#006398] flex items-center justify-center font-extrabold text-base">
              02
            </div>
            <div>
              <span className="text-xs text-[#6e7977] uppercase tracking-wider font-bold">التتبع الحركي البصري</span>
              <h2 className="text-xl font-bold text-[#131b2e]">معرض الصور المتسلسلة والمراحل الكينماتيكية</h2>
            </div>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-[#cce5ff] text-[#00476e] text-xs font-bold">
            التقاط فائق الدقة (120 إطار/ثانية)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#dae2fd] flex flex-col gap-2 hover:shadow-md transition-shadow group">
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#eaedff]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="وقفة الاستعداد"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE5GQi2UacWQiSZSg-Zoz8i2CjV4zuYjiP6RvNHM-LqayNvmiA3QHd4BqW82pSxFA-DIyQWhbCW9WRr0xkjN-K3PC_i4jfgjr5YAmH7IOicWtp7PZCs6tYPLE9-jzSuHCh6nlohhjzf5GRM0Na3R75IWGg2LnqkpVl5mCQ-2oNYFNF0oxF0_55IQ4WECL7wi3z5rp96CB4Jey0TH5L9Dxe0rU3rz6ufuEf-0Qd5Ho-j-eT5htEytZJPA"
              />
              <div className="absolute top-2 right-2 bg-[#131b2e]/80 text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                الطور 01
              </div>
              <button
                type="button"
                onClick={() =>
                  setLightboxData({
                    isOpen: true,
                    title: 'وقفة الاستعداد وتمركز مركز الثقل',
                    desc: 'انثناء الركبتين بزاوية 115 درجة مع تمركز مركز الثقل عمودياً بين القدمين لتوليد أقصى استجابة عضلية.',
                    imgUrl:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuBE5GQi2UacWQiSZSg-Zoz8i2CjV4zuYjiP6RvNHM-LqayNvmiA3QHd4BqW82pSxFA-DIyQWhbCW9WRr0xkjN-K3PC_i4jfgjr5YAmH7IOicWtp7PZCs6tYPLE9-jzSuHCh6nlohhjzf5GRM0Na3R75IWGg2LnqkpVl5mCQ-2oNYFNF0oxF0_55IQ4WECL7wi3z5rp96CB4Jey0TH5L9Dxe0rU3rz6ufuEf-0Qd5Ho-j-eT5htEytZJPA',
                  })
                }
                className="absolute bottom-2 left-2 w-8 h-8 rounded-lg bg-white/90 text-[#131b2e] flex items-center justify-center hover:bg-[#005c55] hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-base">zoom_in</span>
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#005c55]">المرحلة التمهيدية</span>
              <h4 className="text-xs font-bold text-[#131b2e]">وقفة الاستعداد وتمركز الثقل</h4>
              <p className="text-xs text-[#3e4947] line-clamp-2">
                تأصيل الاتزان المسبق وتثبيت القدمين بزاوية متناظرة لتقليل الاهتزاز العضلي.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#dae2fd] flex flex-col gap-2 hover:shadow-md transition-shadow group">
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#eaedff]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="بدء الدفع"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYo6WW_nuGjUM2prb4V3aQC263v0xuUF79CP0szn3meyJK8-rvhPaHow9s63jELMZbJzXfvNWrnUY7yOhwVXarKKihvvR9JOICLtjm0unwIhleEOwCvlFJsGhBdtEDLg-tDg4C_pg46c6juMdU2OaMYbltOZ-AznG7kJ7AdtKWdlwVWx7XZfb_8q-yJzrHpQcC3PdbiK6XY1_yRqbnZPlo1k2oDs_PL_4cqzTeF0lXHUdCEw_SdSBgNA"
              />
              <div className="absolute top-2 right-2 bg-[#131b2e]/80 text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                الطور 02
              </div>
              <button
                type="button"
                onClick={() =>
                  setLightboxData({
                    isOpen: true,
                    title: 'بدء الدفع والتسارع الخطي',
                    desc: 'امتداد كامل لمفاصل الساق الخلفية بزاوية دفع مثالية 45 درجة لتوجيه كمية الحركة نحو الأمام.',
                    imgUrl:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuBYo6WW_nuGjUM2prb4V3aQC263v0xuUF79CP0szn3meyJK8-rvhPaHow9s63jELMZbJzXfvNWrnUY7yOhwVXarKKihvvR9JOICLtjm0unwIhleEOwCvlFJsGhBdtEDLg-tDg4C_pg46c6juMdU2OaMYbltOZ-AznG7kJ7AdtKWdlwVWx7XZfb_8q-yJzrHpQcC3PdbiK6XY1_yRqbnZPlo1k2oDs_PL_4cqzTeF0lXHUdCEw_SdSBgNA',
                  })
                }
                className="absolute bottom-2 left-2 w-8 h-8 rounded-lg bg-white/90 text-[#131b2e] flex items-center justify-center hover:bg-[#005c55] hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-base">zoom_in</span>
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#006398]">الانطلاق الحركي</span>
              <h4 className="text-xs font-bold text-[#131b2e]">بدء الدفع والتسارع الخطي</h4>
              <p className="text-xs text-[#3e4947] line-clamp-2">
                امتداد متكامل للساقين مع تزامن انقباض عضلات الإليتين والرباط الصليبي.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#dae2fd] flex flex-col gap-2 hover:shadow-md transition-shadow group">
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#eaedff]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="نقطة الذروة"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOnyQ8LARapMaq86E6Ymw7G9pibYhieNf-6ImC3xg9DoTdB7TPkrf3pj_FlJNIKs6gCmnHj3M0Y1kKWi8jc-aDxr6s4XypfuwFDYAOnErxs5aifjmjkxavvQWT--Er6m5jMzNfjGhlucTMe4fk3j9xdp5vmFO1nYG-x_ByVhueIjFIH0600YPIVii9pCeCVIptJhzfcnsuzUoNyM3oovDlL6o4J8W_TuGBLF4PJCnax-2pEjNX_jLDpA"
              />
              <div className="absolute top-2 right-2 bg-[#005c55] text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                الطور 03 (الذروة)
              </div>
              <button
                type="button"
                onClick={() =>
                  setLightboxData({
                    isOpen: true,
                    title: 'لحظة ذروة الأداء والتوافق',
                    desc: 'تحقيق الامتداد الجسدي التام في نقطة التعليق الفراغي (Apex) مع تماسك توافقي لكافة عضلات الجذع.',
                    imgUrl:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOnyQ8LARapMaq86E6Ymw7G9pibYhieNf-6ImC3xg9DoTdB7TPkrf3pj_FlJNIKs6gCmnHj3M0Y1kKWi8jc-aDxr6s4XypfuwFDYAOnErxs5aifjmjkxavvQWT--Er6m5jMzNfjGhlucTMe4fk3j9xdp5vmFO1nYG-x_ByVhueIjFIH0600YPIVii9pCeCVIptJhzfcnsuzUoNyM3oovDlL6o4J8W_TuGBLF4PJCnax-2pEjNX_jLDpA',
                  })
                }
                className="absolute bottom-2 left-2 w-8 h-8 rounded-lg bg-white/90 text-[#131b2e] flex items-center justify-center hover:bg-[#005c55] hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-base">zoom_in</span>
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#005e3f]">نقطة الذروة (Apex)</span>
              <h4 className="text-xs font-bold text-[#131b2e]">أقصى امتداد وتوافق عضلي</h4>
              <p className="text-xs text-[#3e4947] line-clamp-2">
                توازن هوائي تام وتوافق بين الجذع والأطراف قبل بدء مرحلة الاستقبال.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#dae2fd] flex flex-col gap-2 hover:shadow-md transition-shadow group">
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#eaedff]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="الهبوط الآمن"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgtsjeNQIrweuRxtcndWP_OaADU782yJGELjk53TKPEl2Ymyzjn6iHo6T5VRdom7pynqQNJQy7HSNeFkwuPiLvWZKgLpGgenZeqcr-aydpMOghhwrtPFe5yRpm2NWInRBnweoNAy0yvDjq6EQE7Hkou66-XGpsSYWLS-g_dL5h5K4d16orqejlUEMw9Mjn7-r6BCWsy0O3-5nAsAMkfUOwK7nrbmQAIWw2CNisOd7rr-HNYgAzdsfqfg"
              />
              <div className="absolute top-2 right-2 bg-[#131b2e]/80 text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                الطور 04
              </div>
              <button
                type="button"
                onClick={() =>
                  setLightboxData({
                    isOpen: true,
                    title: 'المتابعة والهبوط واستعادة التوازن',
                    desc: 'امتصاص القوى الرأسية الصاعدة بثني الركبتين 120 درجة وتثبيت مركز الثقل دون ترنح جانبي.',
                    imgUrl:
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuDgtsjeNQIrweuRxtcndWP_OaADU782yJGELjk53TKPEl2Ymyzjn6iHo6T5VRdom7pynqQNJQy7HSNeFkwuPiLvWZKgLpGgenZeqcr-aydpMOghhwrtPFe5yRpm2NWInRBnweoNAy0yvDjq6EQE7Hkou66-XGpsSYWLS-g_dL5h5K4d16orqejlUEMw9Mjn7-r6BCWsy0O3-5nAsAMkfUOwK7nrbmQAIWw2CNisOd7rr-HNYgAzdsfqfg',
                  })
                }
                className="absolute bottom-2 left-2 w-8 h-8 rounded-lg bg-white/90 text-[#131b2e] flex items-center justify-center hover:bg-[#005c55] hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-base">zoom_in</span>
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#6e7977]">المرحلة الختامية</span>
              <h4 className="text-xs font-bold text-[#131b2e]">الهبوط الآمن واستعادة الاتزان</h4>
              <p className="text-xs text-[#3e4947] line-clamp-2">
                امتصاص طاقة النزول على مشطي القدمين بسلاسة تمنع إجهاد الأوتار المفصلية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxData.isOpen && (
        <div className="fixed inset-0 z-50 bg-[#283044]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#dae2fd] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#005c55]">visibility</span>
                <h3 className="font-bold text-base text-[#131b2e]">{lightboxData.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxData({ ...lightboxData, isOpen: false })}
                className="w-8 h-8 rounded-lg bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="w-full h-72 rounded-xl bg-[#283044] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt={lightboxData.title}
                src={lightboxData.imgUrl}
              />
            </div>

            <p className="text-xs sm:text-sm text-[#3e4947] leading-relaxed">
              {lightboxData.desc}
            </p>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setLightboxData({ ...lightboxData, isOpen: false })}
                className="px-5 py-2 rounded-xl bg-[#005c55] text-white text-xs font-bold hover:bg-[#0f766e]"
              >
                إغلاق المعاينة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: INTERACTIVE VIDEO LEARNING PLAYER */}
      <section className="flex flex-col gap-6 mb-14" id="video-player-section">
        <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#005e3f]/10 text-[#005e3f] flex items-center justify-center font-extrabold text-base">
              03
            </div>
            <div>
              <span className="text-xs text-[#6e7977] uppercase tracking-wider font-bold">الوسائط التفاعلية عالية الدقة</span>
              <h2 className="text-xl font-bold text-[#131b2e]">الفيديو التعليمي والتحليل الحركي البطيء</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-[#005c55]/10 text-[#005c55] text-xs font-bold flex items-center gap-1 border border-[#005c55]/20">
              <span className="material-symbols-outlined text-sm">slow_motion_video</span>
              <span>دعم الحركة البطيئة 0.5x</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            <div className="relative w-full aspect-video rounded-2xl bg-[#283044] overflow-hidden shadow-md group border border-[#dae2fd]">
              <div
                className="bg-cover bg-center w-full h-full flex flex-col justify-between p-4 sm:p-6 relative"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAs18POzNA2R2Tk35Oo3lOXfipxBkPpbKGXcW62Y4yYfX4527NwVR46sq1wMzUuY0nDIcuKzIPF8X1OzDcq2yqv3PaloBQi5gN5y7XYb89AZazGUwU59yxaY8HhwYqQ7TNQEsCKw7BZk9aqAYkblZMG36f8R1rJb-HwrrGZ7whiOJbkXJ8SAeYEit0LLknrDCM9KS0Fvq-X4608hPnF-e2vOMJqyC55-fvGFumMhnMnPrvvBnMhSNmvWQ')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/90 via-transparent to-[#131b2e]/40" />

                {/* Top Overlay */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-[#131b2e]/80 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs">
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse" />
                    <span>بث تعليمي فائق الوضوح (1080p 60fps)</span>
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#131b2e]/80 text-[#9cf2e8] text-xs font-bold backdrop-blur-xs">
                    زمن المقطع: 08:45
                  </span>
                </div>

                {/* Center Play Button */}
                <div className="relative z-10 flex items-center justify-center my-auto">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label="تشغيل / إيقاف"
                    className="w-16 h-16 rounded-full bg-[#005c55] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-3xl fill">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                </div>

                {/* Bottom Custom Video Controls */}
                <div className="relative z-10 flex flex-col gap-2">
                  <div className="w-full flex items-center gap-2 cursor-pointer" dir="rtl">
                    <div className="relative w-full h-2 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-[#005c55] rounded-full" style={{ width: '42%' }} />
                    </div>
                    <span className="text-white text-xs font-bold whitespace-nowrap">03:40 / 08:45</span>
                  </div>

                  <div className="flex items-center justify-between text-white pt-1">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hover:text-[#9cf2e8] transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">
                          {isPlaying ? 'pause' : 'play_arrow'}
                        </span>
                      </button>
                      <button type="button" className="hover:text-[#9cf2e8] transition-colors">
                        <span className="material-symbols-outlined text-xl">fast_forward</span>
                      </button>
                      <button type="button" className="hover:text-[#9cf2e8] transition-colors">
                        <span className="material-symbols-outlined text-xl">volume_up</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsSlowMo(!isSlowMo)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                          isSlowMo ? 'bg-[#005c55] text-white shadow-xs' : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">slow_motion_video</span>
                        <span>{isSlowMo ? '0.5x تحليل بطيء' : '1.0x سرعة عادية'}</span>
                      </button>
                      <button type="button" className="hover:text-[#9cf2e8] transition-colors">
                        <span className="material-symbols-outlined text-xl">fullscreen</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter Bookmarks Bar */}
            <div aria-label="فصول الفيديو" className="flex items-center gap-2 overflow-x-auto py-1">
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-[#0f766e] text-white text-xs font-bold whitespace-nowrap flex items-center gap-1 shadow-xs"
              >
                <span className="material-symbols-outlined text-xs">bookmark</span>
                <span>00:00 - المقدمة والتمهيد</span>
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-white text-[#3e4947] hover:bg-[#eaedff] text-xs font-bold whitespace-nowrap flex items-center gap-1 border border-[#dae2fd]"
              >
                <span className="material-symbols-outlined text-xs">bookmark</span>
                <span>02:15 - وقفة الاستعداد</span>
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-white text-[#3e4947] hover:bg-[#eaedff] text-xs font-bold whitespace-nowrap flex items-center gap-1 border border-[#dae2fd]"
              >
                <span className="material-symbols-outlined text-xs">bookmark</span>
                <span>04:30 - تسارع الدفع وزاوية 45°</span>
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-white text-[#3e4947] hover:bg-[#eaedff] text-xs font-bold whitespace-nowrap flex items-center gap-1 border border-[#dae2fd]"
              >
                <span className="material-symbols-outlined text-xs">bookmark</span>
                <span>06:50 - الهبوط وامتصاص الصدمة</span>
              </button>
            </div>
          </div>

          {/* Video Side Panel: Notes & Transcript */}
          <div className="lg:col-span-4 flex flex-col bg-white rounded-2xl p-5 shadow-xs border border-[#dae2fd]">
            <div className="flex items-center gap-2 border-b border-[#eaedff] pb-3 mb-3">
              <button
                type="button"
                onClick={() => setVideoTab('notes')}
                className={`flex-1 py-1.5 text-center text-xs font-bold transition-all ${
                  videoTab === 'notes'
                    ? 'text-[#005c55] border-b-2 border-[#005c55]'
                    : 'text-[#6e7977] hover:text-[#131b2e]'
                }`}
              >
                الملاحظات التدريبية
              </button>
              <button
                type="button"
                onClick={() => setVideoTab('transcript')}
                className={`flex-1 py-1.5 text-center text-xs font-bold transition-all ${
                  videoTab === 'transcript'
                    ? 'text-[#005c55] border-b-2 border-[#005c55]'
                    : 'text-[#6e7977] hover:text-[#131b2e]'
                }`}
              >
                النص والتفريغ الصوتي
              </button>
            </div>

            {/* Notes Tab Content */}
            {videoTab === 'notes' && (
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                {notesList.map((note, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#f2f3ff] flex flex-col gap-1 border border-[#dae2fd]/50">
                    <div className="flex items-center justify-between text-xs font-bold text-[#005c55]">
                      <span>{note.time}</span>
                      <span className="text-[#006398]">{note.tag}</span>
                    </div>
                    <p className="text-xs text-[#3e4947] leading-relaxed">{note.text}</p>
                  </div>
                ))}

                {/* Add Note Form */}
                <form onSubmit={handleAddUserNote} className="mt-auto pt-3 border-t border-[#eaedff] flex flex-col gap-2">
                  <label className="text-xs text-[#6e7977] font-semibold">إضافة ملاحظة عند التوقيت الحالي</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={userNote}
                      onChange={(e) => setUserNote(e.target.value)}
                      placeholder="اكتب ملاحظتك الأكاديمية..."
                      className="flex-1 bg-[#f2f3ff] text-[#131b2e] placeholder-[#6e7977] px-3 py-2 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#005c55] border border-[#dae2fd]"
                    />
                    <button
                      type="submit"
                      className="w-8 h-8 rounded-xl bg-[#0f766e] text-white flex items-center justify-center hover:bg-[#005c55] transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">send</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Transcript Tab Content */}
            {videoTab === 'transcript' && (
              <div className="flex flex-col gap-2.5 flex-1 overflow-y-auto text-xs text-[#3e4947] leading-relaxed">
                <p>
                  <span className="text-[#005c55] font-bold">00:01</span> مرحباً بكم في المحاضرة التطبيقية للوحدة العاشرة حول التوافق الحركي المركب.
                </p>
                <p>
                  <span className="text-[#005c55] font-bold">01:30</span> يبدأ التكنيك الرياضي من الاستقرار التام للجذع، حيث يتم تفعيل العضلات الباسطة.
                </p>
                <p>
                  <span className="text-[#005c55] font-bold">03:40</span> لاحظ التوافق الزمني الدقيق عند الدفع، حيث ينقل اللاعب القوة من الأرض عبر مفصل الفخذ.
                </p>
                <p>
                  <span className="text-[#005c55] font-bold">06:15</span> في مرحلة الهبوط، احرص على امتصاص القوة بتدرج مرن لتأمين المفاصل السفلية.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: STRUCTURED EXERCISE DRILLS */}
      <section className="flex flex-col gap-6 mb-14" id="exercises-section">
        <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#005c55]/10 text-[#005c55] flex items-center justify-center font-extrabold text-base">
              04
            </div>
            <div>
              <span className="text-xs text-[#6e7977] uppercase tracking-wider font-bold">التطبيق الميداني المقنن</span>
              <h2 className="text-xl font-bold text-[#131b2e]">التمرينات التطبيقية لتنمية التوافق الحركي</h2>
            </div>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#3e4947]">
            بروتوكول تدريبي معتمد
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Drill 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#dae2fd] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-[#006398]/10 text-[#006398] flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <span className="px-3 py-0.5 rounded-full bg-[#cce5ff] text-[#00476e] text-xs font-bold">
                  الشدة: متوسطة
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#131b2e]">التوافق التكراري المقنن بين المحطات</h3>
              <p className="text-xs text-[#3e4947] leading-relaxed">
                تدريب حركي متسلسل بين 4 أقماع تدريبية متباعدة بمسافة 1.5 متر لضبط التبادل الحركي وتغيير الاتجاه الخطي.
              </p>

              <div className="grid grid-cols-3 gap-2 bg-[#f2f3ff] p-3 rounded-xl text-center mt-1 border border-[#dae2fd]/60">
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-[#005c55]">3</span>
                  <span className="text-[11px] text-[#6e7977]">مجموعات</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-[#005c55]">10</span>
                  <span className="text-[11px] text-[#6e7977]">تكرارات</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-[#006398]">45 ث</span>
                  <span className="text-[11px] text-[#6e7977]">فترة راحة</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <div className="flex items-center gap-1 text-[#005e3f] text-xs font-bold">
                <span className="material-symbols-outlined text-sm fill">check_circle</span>
                <span>الهدف: ترسيخ النمط التوافقي العصبي</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveDrillTimer(1);
                  alert('بدء مؤقت التدريب: 45 ثانية');
                }}
                className="w-full py-2.5 rounded-xl bg-[#f2f3ff] text-[#005c55] hover:bg-[#eaedff] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#dae2fd]"
              >
                <span className="material-symbols-outlined text-base">timer</span>
                <span>بدء مؤقت التدريب</span>
              </button>
            </div>
          </div>

          {/* Drill 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#dae2fd] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-[#005c55]/10 text-[#005c55] flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <span className="px-3 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold">
                  الشدة: عالية
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#131b2e]">تدريب الاستجابة المتغيرة والإشارات البصرية</h3>
              <p className="text-xs text-[#3e4947] leading-relaxed">
                الانتقال السريع نحو إشارات ضوئية عشوائية تظهر على شاشة المحاكاة لقياس سرعة المعالجة الحسية-الحركية.
              </p>

              <div className="grid grid-cols-3 gap-2 bg-[#f2f3ff] p-3 rounded-xl text-center mt-1 border border-[#dae2fd]/60">
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-[#005c55]">4</span>
                  <span className="text-[11px] text-[#6e7977]">تكرارات</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-[#005c55]">8</span>
                  <span className="text-[11px] text-[#6e7977]">إشارات/د</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-[#006398]">60 ث</span>
                  <span className="text-[11px] text-[#6e7977]">فترة راحة</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <div className="flex items-center gap-1 text-[#ba1a1a] text-xs font-bold">
                <span className="material-symbols-outlined text-sm">health_and_safety</span>
                <span>تنبيه: يلزم الإحماء المفصلي التام</span>
              </div>
              <button
                type="button"
                onClick={() => alert('تم تفعيل مولد الإشارات الضوئية التفاعلي')}
                className="w-full py-2.5 rounded-xl bg-[#f2f3ff] text-[#005c55] hover:bg-[#eaedff] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#dae2fd]"
              >
                <span className="material-symbols-outlined text-base">play_arrow</span>
                <span>تشغيل مولد الإشارات</span>
              </button>
            </div>
          </div>

          {/* Drill 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#dae2fd] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-[#005e3f]/10 text-[#005e3f] flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <span className="px-3 py-0.5 rounded-full bg-[#007952]/15 text-[#005e3f] text-xs font-bold">
                  الشدة: متدرجة
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#131b2e]">التدريب الحركي المدمج (وثب + دوران 90°)</h3>
              <p className="text-xs text-[#3e4947] leading-relaxed">
                الدمج بين الارتقاء الرأسي السريع والدوران بزاوية قائمة مع الهبوط التوازني فوق قاعدة ارتكاز محددة.
              </p>

              <div className="grid grid-cols-3 gap-2 bg-[#f2f3ff] p-3 rounded-xl text-center mt-1 border border-[#dae2fd]/60">
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-[#005c55]">3</span>
                  <span className="text-[11px] text-[#6e7977]">مجموعات</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-[#005c55]">6</span>
                  <span className="text-[11px] text-[#6e7977]">قفزات/جهة</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-[#006398]">90 ث</span>
                  <span className="text-[11px] text-[#6e7977]">فترة راحة</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <div className="flex items-center gap-1 text-[#005c55] text-xs font-bold">
                <span className="material-symbols-outlined text-sm">sports_score</span>
                <span>الهدف: ضبط مركز الثقل أثناء الدوران</span>
              </div>
              <button
                type="button"
                onClick={() => alert('تم تسجيل محاولة تدريب الوثب بنجاح')}
                className="w-full py-2.5 rounded-xl bg-[#f2f3ff] text-[#005c55] hover:bg-[#eaedff] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#dae2fd]"
              >
                <span className="material-symbols-outlined text-base">assignment_turned_in</span>
                <span>تسجيل نتائج المحاولة</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: INTERACTIVE OBSERVATION CHECKLIST & ASSESSMENT */}
      <section className="flex flex-col gap-6 mb-14" id="assessment-section">
        <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#006398]/10 text-[#006398] flex items-center justify-center font-extrabold text-base">
              05
            </div>
            <div>
              <span className="text-xs text-[#6e7977] uppercase tracking-wider font-bold">التقويم والقياس الحركي</span>
              <h2 className="text-xl font-bold text-[#131b2e]">بطاقة الملاحظة المقننة ورصد درجات الإتقان</h2>
            </div>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-[#cce5ff] text-[#00476e] text-xs font-bold">
            استمارة تقييم فورية
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Motor Criteria Checklist (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-xs border border-[#dae2fd] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#005c55] font-bold text-base">
                <span className="material-symbols-outlined text-xl">checklist</span>
                <h3>معايير الأداء الحركي المستهدفة للتقييم</h3>
              </div>
              <span className="text-xs text-[#6e7977]">حدد المعايير المنجزة أثناء التطبيق</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {criteria.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors border ${
                    item.checked
                      ? 'bg-[#f2f3ff] border-[#005c55]/30'
                      : 'bg-[#faf8ff] border-[#eaedff] hover:bg-[#f2f3ff]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleCriterion(item.id)}
                      className="w-5 h-5 rounded text-[#005c55] focus:ring-[#005c55] cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#131b2e]">{item.title}</span>
                      <span className="text-[11px] text-[#3e4947] mt-0.5">{item.desc}</span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                      item.checked
                        ? 'bg-[#005c55]/10 text-[#005c55]'
                        : 'bg-[#eaedff] text-[#6e7977]'
                    }`}
                  >
                    {item.weight} نقطة
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Live Score & Diagnostic Gauge Panel (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#dae2fd] flex flex-col items-center justify-between text-center h-full">
              <div className="w-full flex items-center justify-between">
                <span className="text-xs font-bold text-[#131b2e]">مؤشر الإتقان المحسوب</span>
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                    totalScore >= 85
                      ? 'bg-[#007952]/15 text-[#005e3f]'
                      : totalScore >= 60
                      ? 'bg-[#cce5ff] text-[#00476e]'
                      : 'bg-[#ffdad6] text-[#93000a]'
                  }`}
                >
                  {totalScore >= 85
                    ? 'إتقان استثنائي'
                    : totalScore >= 60
                    ? 'مستوى متقدم'
                    : 'بحاجة لإعادة المعايرة'}
                </span>
              </div>

              {/* Circular Radial Gauge */}
              <div className="relative w-44 h-44 my-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="none" r={radius} stroke="#eaedff" strokeWidth="8" />
                  <circle
                    className="transition-all duration-500 ease-out"
                    cx="50"
                    cy="50"
                    fill="none"
                    r={radius}
                    stroke={totalScore >= 85 ? '#007952' : totalScore >= 60 ? '#0f766e' : '#ba1a1a'}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-extrabold text-[#005c55] leading-none">{totalScore}</span>
                  <span className="text-xs text-[#6e7977] mt-1 font-semibold">من أصل 100 نقطة</span>
                </div>
              </div>

              {/* Diagnostic Feedback Message */}
              <div className="w-full bg-[#f2f3ff] p-4 rounded-xl text-right flex flex-col gap-1 border border-[#dae2fd]/60">
                <span className="text-xs font-bold text-[#005c55] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">insights</span>
                  <span>التغذية الراجعة التشخيصية</span>
                </span>
                <p className="text-xs text-[#3e4947] leading-relaxed">
                  {totalScore >= 85
                    ? 'أداء كينماتيكي مثالي يطابق كافة المعايير الميكانيكية المعتمدة. الطالب جاهز للانتقال للوحدة التالية مباشرة.'
                    : totalScore >= 60
                    ? 'الأداء ممتاز في مرحلتي الإعداد والذروة. يوصى بإعادة تكرار تمرين امتصاص الهبوط لإتقان النقاط المتبقية والوصول إلى درجة الإتقان الكامل (90+).'
                    : 'هناك اختلال في توافق الأطراف وتمركز ثقل الجسم. يرجى مراجعة الفيديو التحليلي ببطء وتكرار التمرين الأول.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleResetChecklist}
                  className="w-full py-2.5 rounded-xl bg-[#eaedff] text-[#3e4947] hover:text-[#131b2e] hover:bg-[#dae2fd] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">refresh</span>
                  <span>إعادة ضبط التقييم</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert(`تم اعتماد النتيجة (${totalScore} نقطة) في سجل الطالب الأكاديمي!`)}
                  className="w-full py-2.5 rounded-xl bg-[#0f766e] text-white hover:bg-[#005c55] font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>اعتماد النتيجة في السجل</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Inter-Unit Navigation Controller */}
      <footer className="mt-8 pt-6 border-t border-[#eaedff] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Previous Unit Link */}
        <button
          type="button"
          onClick={() => onNavigate('educational-units')}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white hover:bg-[#f2f3ff] shadow-xs border border-[#dae2fd] flex items-center gap-4 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#3e4947] group-hover:bg-[#005c55] group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[11px] text-[#6e7977] font-semibold">الوحدة السابقة</span>
            <span className="text-xs font-bold text-[#131b2e]">الوحدة التاسعة: توازن القوى الارتدادية</span>
          </div>
        </button>

        {/* Academic Accreditation Badge */}
        <div className="flex items-center gap-1.5 text-[#005c55] text-xs font-bold">
          <span className="material-symbols-outlined text-sm">school</span>
          <span>معايير الاعتماد الأكاديمي الحركي</span>
        </div>

        {/* Next Unit Link */}
        <button
          type="button"
          onClick={() => onNavigate('interactive-quizzes')}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#0f766e] text-white hover:bg-[#005c55] shadow-xs flex items-center justify-between sm:justify-start gap-4 transition-all"
        >
          <div className="flex flex-col text-right">
            <span className="text-[11px] text-[#a3faef] font-semibold">الوحدة التالية</span>
            <span className="text-xs font-bold text-white">خوض الاختبار التفاعلي للوحدة العاشرة</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </div>
        </button>
      </footer>
    </div>
  );
};
