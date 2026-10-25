import React from 'react';
import { ScreenRoute } from '../types';

interface OverviewScreenProps {
  onNavigate: (route: ScreenRoute) => void;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({ onNavigate }) => {
  const scrollToMethodology = () => {
    const el = document.getElementById('methodology-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full pb-14">
      {/* Dynamic Background Elements */}
      <div className="relative w-full overflow-hidden pb-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#9cf2e8]/25 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[#5bb8fe]/20 blur-3xl pointer-events-none" />

        {/* 1. HERO SECTION */}
        <section className="relative w-full pt-4 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text & CTAs (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-start gap-4 text-right">
              {/* Academic Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e2e7ff] text-[#005c55] shadow-xs border border-[#dae2fd]">
                <span className="material-symbols-outlined text-lg fill">verified</span>
                <span className="text-xs font-bold tracking-wide">
                  مشروع بحثي أكاديمي تطبيقي في علوم الرياضة والتربية البدنية
                </span>
              </div>

              {/* Hero Heading */}
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#131b2e] tracking-tight leading-tight">
                منصة تعلم المهارات الحركية
              </h1>

              {/* Academic Subtitle */}
              <p className="text-base sm:text-lg text-[#3e4947] max-w-2xl leading-relaxed">
                بيئة تعليمية تفاعلية لتعلم المهارات الحركية وتنميتها وتقويمها - مدعومة بأسس البحث العلمي وتطبيقات التعلم النشط والتحليل الكينماتيكي التفاعلي للأداء الرياضي.
              </p>

              {/* Interactive CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onNavigate('educational-units')}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0f766e] text-white font-bold text-sm shadow-md hover:bg-[#005c55] active:translate-y-0.5 transition-all duration-200"
                >
                  <span>ابدأ التعلم الآن</span>
                  <span className="material-symbols-outlined rotate-180 text-lg">arrow_forward</span>
                </button>

                <button
                  type="button"
                  onClick={scrollToMethodology}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#f2f3ff] text-[#006398] font-bold text-sm hover:bg-[#eaedff] transition-colors border border-[#dae2fd]/60"
                >
                  <span className="material-symbols-outlined text-lg">menu_book</span>
                  <span>دليل الإطار المنهجي للبحث</span>
                </button>
              </div>

              {/* Micro-Trust Metrics */}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-1.5 text-[#3e4947]">
                  <span className="material-symbols-outlined text-[#005e3f] fill">check_circle</span>
                  <span className="text-xs font-semibold">مبني وفق نموذج فيتس وبوزنر الحركي</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[#3e4947]">
                  <span className="material-symbols-outlined text-[#006398] fill">tune</span>
                  <span className="text-xs font-semibold">تغذية راجعة آنية وفورية</span>
                </div>
              </div>
            </div>

            {/* Biomechanical Motion Analysis Visual Card (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full rounded-2xl bg-white shadow-xl overflow-hidden p-4 border border-[#dae2fd]">
                {/* Simulated Analysis Header */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#eaedff]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] inline-block animate-pulse" />
                    <span className="text-xs font-bold text-[#131b2e]">نظام الرصد الكينماتيكي الحيوي</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#eaedff] text-[#005c55] text-xs font-bold">
                    زاوية الإطلاق: 42.6°
                  </span>
                </div>

                {/* Video / Motion Analysis Graphic */}
                <div className="relative w-full h-72 rounded-xl overflow-hidden bg-[#283044] group">
                  <img
                    className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                    alt="تحليل حركي كينماتيكي"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFidJRFxxGznH4hxGASJG5LvP955gGdOrnlaeq36Hr1vkfiskWgzaR0upZM_cwpAfeppYcUfLu8OESWshPwoZOLkvHUVR1--EIBjDTf7Xz162l8lPbUDoNnrCbkcFgDI2aLKftTMhxf5g9qjerwOu_g8OBTOHvT7HL-8lB6bH9JTErpwW7EdDyReMr-o_eMtcpWt_1cihDe490sTzqqALufkeCcf3gKuCczuQ10kCjlnweR2f5NtjBXQ"
                  />

                  {/* Skeletal Overlay Vector Badges */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm flex items-center gap-1.5 text-[#005c55]">
                    <span className="material-symbols-outlined text-sm">hub</span>
                    <span className="text-xs font-bold">محور الاتزان: مستقر (96%)</span>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm flex items-center gap-1.5 text-[#006398]">
                    <span className="material-symbols-outlined text-sm">speed</span>
                    <span className="text-xs font-bold">تسارع الدفع: 3.4 م/ث²</span>
                  </div>

                  {/* Center Kinetic Reticle */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-20 h-20 rounded-full border border-dashed border-[#80d5cb]/80 flex items-center justify-center animate-spin"
                      style={{ animationDuration: '16s' }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-[#9cf2e8]" />
                    </div>
                  </div>
                </div>

                {/* Kinetic Checkpoints Row */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="p-2 rounded-xl bg-[#f2f3ff]">
                    <span className="text-[11px] text-[#6e7977] block">زاوية الركبة</span>
                    <span className="text-lg font-bold text-[#005c55]">118°</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#f2f3ff]">
                    <span className="text-[11px] text-[#6e7977] block">التوافق العضلي</span>
                    <span className="text-lg font-bold text-[#005e3f]">91%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#f2f3ff]">
                    <span className="text-[11px] text-[#6e7977] block">تكرار القياس</span>
                    <span className="text-lg font-bold text-[#006398]">16/16</span>
                  </div>
                </div>
              </div>

              {/* Overlapping Floating Badge */}
              <div className="absolute -bottom-5 -right-3 bg-white shadow-xl px-4 py-3 rounded-2xl flex items-center gap-3 border border-[#dae2fd]">
                <div className="w-10 h-10 rounded-xl bg-[#007952] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-xl">sports_score</span>
                </div>
                <div>
                  <div className="text-[11px] text-[#6e7977]">معدل التوافق العام</div>
                  <div className="text-sm font-extrabold text-[#131b2e]">إتقان متقدم (88.4%)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. KEY PLATFORM STATISTICS (4 Cards) */}
        <section className="w-full mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat Card 1 */}
            <div className="p-6 rounded-2xl bg-white shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group border border-[#dae2fd]">
              <div className="w-1.5 h-full absolute right-0 top-0 bg-[#005c55]" />
              <div className="flex items-start justify-between mb-2 pr-2">
                <div className="text-4xl font-extrabold text-[#005c55] group-hover:scale-105 transition-transform">16</div>
                <div className="w-10 h-10 rounded-xl bg-[#9cf2e8]/30 flex items-center justify-center text-[#005c55]">
                  <span className="material-symbols-outlined text-xl">auto_stories</span>
                </div>
              </div>
              <div className="pr-2">
                <h2 className="text-base font-bold text-[#131b2e]">وحدة تعليمية</h2>
                <p className="text-xs text-[#3e4947] mt-1 leading-relaxed">
                  مقسمة وفق معايير التدرج المنهجي والخصائص النمائية للدارسين.
                </p>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="p-6 rounded-2xl bg-white shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group border border-[#dae2fd]">
              <div className="w-1.5 h-full absolute right-0 top-0 bg-[#006398]" />
              <div className="flex items-start justify-between mb-2 pr-2">
                <div className="text-4xl font-extrabold text-[#006398] group-hover:scale-105 transition-transform">16</div>
                <div className="w-10 h-10 rounded-xl bg-[#cce5ff]/40 flex items-center justify-center text-[#006398]">
                  <span className="material-symbols-outlined text-xl">smart_display</span>
                </div>
              </div>
              <div className="pr-2">
                <h2 className="text-base font-bold text-[#131b2e]">درساً تفاعلياً</h2>
                <p className="text-xs text-[#3e4947] mt-1 leading-relaxed">
                  مدعومة بالفيديو عالي الدقة وتقنيات التحليل البصري التفسيري.
                </p>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="p-6 rounded-2xl bg-white shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group border border-[#dae2fd]">
              <div className="w-1.5 h-full absolute right-0 top-0 bg-[#005e3f]" />
              <div className="flex items-start justify-between mb-2 pr-2">
                <div className="text-4xl font-extrabold text-[#005e3f] group-hover:scale-105 transition-transform">+48</div>
                <div className="w-10 h-10 rounded-xl bg-[#6ffbbe]/30 flex items-center justify-center text-[#005e3f]">
                  <span className="material-symbols-outlined text-xl">fitness_center</span>
                </div>
              </div>
              <div className="pr-2">
                <h2 className="text-base font-bold text-[#131b2e]">تدريبات عملية متخصصة</h2>
                <p className="text-xs text-[#3e4947] mt-1 leading-relaxed">
                  تطبيقات تدريبية مقننة التكرار والشدة وفق أزمنة التعافي الفسيولوجي.
                </p>
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className="p-6 rounded-2xl bg-white shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group border border-[#dae2fd]">
              <div className="w-1.5 h-full absolute right-0 top-0 bg-[#5bb8fe]" />
              <div className="flex items-start justify-between mb-2 pr-2">
                <div className="text-4xl font-extrabold text-[#00476e] group-hover:scale-105 transition-transform">100%</div>
                <div className="w-10 h-10 rounded-xl bg-[#dae2fd] flex items-center justify-center text-[#006398]">
                  <span className="material-symbols-outlined text-xl">task_alt</span>
                </div>
              </div>
              <div className="pr-2">
                <h2 className="text-base font-bold text-[#131b2e]">تقويم مستمر وتفاعلي</h2>
                <p className="text-xs text-[#3e4947] mt-1 leading-relaxed">
                  اختبارات تفاعلية فورية وقوائم إلكترونية لرصد مؤشرات الأداء الحركي.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. EDUCATIONAL METHODOLOGY SECTION (Fitts & Posner) */}
        <section className="w-full mb-14 rounded-3xl bg-[#f2f3ff] p-6 sm:p-8 border border-[#dae2fd]" id="methodology-section">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-[#005c55] mb-1">
                <span className="material-symbols-outlined text-lg">science</span>
                <span className="text-xs font-bold uppercase tracking-wider">المنهجية الأكاديمية المعتمدة</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#131b2e]">الإطار المنهجي لاكتساب المهارات الحركية</h2>
            </div>
            <p className="text-sm text-[#3e4947] max-w-xl leading-relaxed">
              تعتمد المنصة على الركائز التجريبية لنظرية فيتس وبوزنر (Fitts & Posner) لتدرج المهارة من التفكير الإدراكي الواعي حتى الانسيابية التلقائية الفائقة.
            </p>
          </div>

          {/* 3 Acquisition Phases */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phase 1 */}
            <div className="p-6 rounded-2xl bg-white shadow-xs flex flex-col justify-between border border-[#dae2fd]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-xl bg-[#005c55]/10 text-[#005c55] font-bold text-lg flex items-center justify-center">
                    ١
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#eaedff] text-xs font-semibold text-[#3e4947]">
                    المرحلة الإدراكية
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#131b2e] mb-2">المرحلة التوافقية الأولية</h3>
                <p className="text-xs text-[#3e4947] leading-relaxed">
                  يركز المتعلم على الفهم النظري لتسلسل الخطوات الحركية. تتسم الحركات بالجمود النسبي وتشتت الانتباه وكثرة الأخطاء التوافقية مع الاعتماد المكثف على الملاحظة البصرية.
                </p>
              </div>
              <div className="mt-6 pt-3 bg-[#f2f3ff] rounded-xl p-3">
                <span className="text-xs font-bold text-[#005c55] block mb-1">دور المنصة التعليمي:</span>
                <span className="text-xs text-[#131b2e]">تفكيك الحركة لمقاطع بطيئة وتوضيح نقاط الارتكاز الميكانيكي.</span>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="p-6 rounded-2xl bg-white shadow-xs flex flex-col justify-between border border-[#dae2fd]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-xl bg-[#006398]/15 text-[#006398] font-bold text-lg flex items-center justify-center">
                    ٢
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#eaedff] text-xs font-semibold text-[#3e4947]">
                    المرحلة الرابطة
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#131b2e] mb-2">مرحلة ضبط وتنسيق الحركة</h3>
                <p className="text-xs text-[#3e4947] leading-relaxed">
                  تقليل المجهود الزائد واختفاء الحركات العشوائية غير المجدية. يبدأ المتعلم في ربط أجزاء الحركة كوحدة ديناميكية واحدة مع سرعة تصحيح المسار عبر التغذية الراجعة.
                </p>
              </div>
              <div className="mt-6 pt-3 bg-[#f2f3ff] rounded-xl p-3">
                <span className="text-xs font-bold text-[#006398] block mb-1">دور المنصة التعليمي:</span>
                <span className="text-xs text-[#131b2e]">تدريبات مقننة التكرار وربط المحاولات بمصفوفة تصحيح الأخطاء الشائعة.</span>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="p-6 rounded-2xl bg-white shadow-xs flex flex-col justify-between border border-[#dae2fd]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-xl bg-[#005e3f]/15 text-[#005e3f] font-bold text-lg flex items-center justify-center">
                    ٣
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#eaedff] text-xs font-semibold text-[#3e4947]">
                    المرحلة الاستقلالية
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#131b2e] mb-2">مرحلة الآلية والإتقان الحركي</h3>
                <p className="text-xs text-[#3e4947] leading-relaxed">
                  تؤدى الحركة بأعلى درجات الانسيابية والتناسق والفاعلية الفسيولوجية. يتحول تركيز الرياضي من كيفية الأداء الحركي إلى بيئة اللعب وظروف المنافسة المتغيرة.
                </p>
              </div>
              <div className="mt-6 pt-3 bg-[#f2f3ff] rounded-xl p-3">
                <span className="text-xs font-bold text-[#005e3f] block mb-1">دور المنصة التعليمي:</span>
                <span className="text-xs text-[#131b2e]">اختبارات إتقان تفاعلية، سرعة استجابة، وقياس ثبات الأداء تحت الضغط.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. THE 4-STAGE LEARNING JOURNEY */}
        <section className="w-full mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="px-4 py-1 rounded-full bg-[#005c55]/10 text-[#005c55] text-xs font-bold">
              مسار الطالب الأكاديمي
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#131b2e] mt-2 mb-2">
              رحلة التعلم الحركي التفاعلية
            </h2>
            <p className="text-sm text-[#3e4947]">
              خطوات متسلسلة تضمن للطالب بناء المعرفة الميكانيكية وصولاً للتطبيق المهاري والتقويم الذاتي الدقيق.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Stage 1 */}
            <div className="p-6 rounded-2xl bg-white shadow-xs flex flex-col justify-between group hover:bg-[#f2f3ff] transition-colors border border-[#dae2fd]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#eaedff] text-[#005c55] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">psychology</span>
                  </div>
                  <span className="text-3xl font-extrabold text-[#d2d9f4]">01</span>
                </div>
                <h3 className="text-base font-bold text-[#131b2e] mb-1.5">التعلم النظري</h3>
                <p className="text-xs text-[#3e4947] leading-relaxed">
                  استيعاب المفاهيم، القواعد القانونية، والأسس الميكانيكية الحيوية التي تحكم مسار الحركة ونقاط الارتكاز.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[#005c55] text-xs font-bold">
                <span className="material-symbols-outlined text-base">check</span>
                <span>بناء التصور العقلي</span>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="p-6 rounded-2xl bg-white shadow-xs flex flex-col justify-between group hover:bg-[#f2f3ff] transition-colors border border-[#dae2fd]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#eaedff] text-[#006398] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">videocam</span>
                  </div>
                  <span className="text-3xl font-extrabold text-[#d2d9f4]">02</span>
                </div>
                <h3 className="text-base font-bold text-[#131b2e] mb-1.5">مشاهدة الأداء الحركي</h3>
                <p className="text-xs text-[#3e4947] leading-relaxed">
                  تحليل النموذج الحركي النموذجي عبر زوايا متعددة بالتصوير البطيء مع تفكيك مراحل البداية والدفع والهبوط.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[#006398] text-xs font-bold">
                <span className="material-symbols-outlined text-base">visibility</span>
                <span>المحاكاة البصرية الدقيقة</span>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="p-6 rounded-2xl bg-white shadow-xs flex flex-col justify-between group hover:bg-[#f2f3ff] transition-colors border border-[#dae2fd]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#eaedff] text-[#005e3f] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">sports_handball</span>
                  </div>
                  <span className="text-3xl font-extrabold text-[#d2d9f4]">03</span>
                </div>
                <h3 className="text-base font-bold text-[#131b2e] mb-1.5">التدريب والتطبيق العملي</h3>
                <p className="text-xs text-[#3e4947] leading-relaxed">
                  تنفيذ التدريبات التمهيدية والنوعية المقننة، مع تكرار المحاولات لتثبيت المسار العصبي العضلي للمهارة.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[#005e3f] text-xs font-bold">
                <span className="material-symbols-outlined text-base">autorenew</span>
                <span>التكرار المقنن والتصحيح</span>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="p-6 rounded-2xl bg-white shadow-xs flex flex-col justify-between group hover:bg-[#f2f3ff] transition-colors border border-[#dae2fd]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#eaedff] text-[#005c55] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">fact_check</span>
                  </div>
                  <span className="text-3xl font-extrabold text-[#d2d9f4]">04</span>
                </div>
                <h3 className="text-base font-bold text-[#131b2e] mb-1.5">التقويم والاختبار التفاعلي</h3>
                <p className="text-xs text-[#3e4947] leading-relaxed">
                  خوض الاختبار المعرفي والتحليلي، ومقارنة مؤشرات الحركة بقوائم الملاحظة المقننة للحصول على نتيجة فورية.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[#005c55] text-xs font-bold">
                <span className="material-symbols-outlined text-base">grade</span>
                <span>قياس الإتقان والحصاد</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SHOWCASE OF SELECTED UNITS */}
        <section className="w-full mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs text-[#6e7977] uppercase font-bold tracking-wider">المحتوى التعليمي والتطبيقي</span>
              <h2 className="text-2xl font-bold text-[#131b2e]">وحدات دراسية مختارة</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('educational-units')}
              className="inline-flex items-center gap-1.5 text-[#005c55] text-xs font-bold hover:underline transition-colors"
            >
              <span>استعراض جميع الوحدات الـ 16</span>
              <span className="material-symbols-outlined rotate-180 text-base">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Unit Card 1 */}
            <div className="rounded-2xl bg-white shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group border border-[#dae2fd]">
              <div className="relative h-48 w-full overflow-hidden bg-[#eaedff]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt="الدحرجة الأمامية"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2lBUVTbB2cczWyjb4TQvLjNHhGrfSt8n9t6G7D-OqYYA_SVG-uhNyaDJoM8OEkPHglaeA6XLTfXanCiFtv51KTVD9ag39h1Z2hpSO0VUQtF2DHiDRTA7DYnEByHd3edEDSrQNSmA0mzjGhnALB9rZsUzWRs1iRkAUWt43hzXA7VwMLhajh4tvELhFLsDjVVws5-eQHT7cVtfs0aZyVwpt4EwSxUwAOCt7GeYJiyp2CnCTeyBQ5P9jOg"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#005c55] text-xs font-bold shadow-xs">
                  الوحدة الأولى
                </div>
                <div className="absolute bottom-3 left-3 px-3 py-0.5 rounded bg-[#007952] text-white text-xs font-bold">
                  مكتملة 100%
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[#6e7977] mb-1 text-xs">
                    <span className="material-symbols-outlined text-sm">timer</span>
                    <span>الزمن المقترح: 45 دقيقة</span>
                  </div>
                  <h3 className="text-base font-bold text-[#131b2e] mb-1 group-hover:text-[#005c55] transition-colors">
                    الدحرجة الأمامية المنحنية
                  </h3>
                  <p className="text-xs text-[#3e4947] line-clamp-2 leading-relaxed">
                    دراسة ميكانيكية استدارة الظهر ووضع الذقن على الصدر وتوزيع القوة الدافعة للأطراف السفلية.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#eaedff]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#3e4947]">مؤشر الإتقان</span>
                    <span className="text-xs text-[#005c55] font-bold">100%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                    <div className="h-full bg-[#005c55] rounded-full w-full" />
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('unit-learning-experience')}
                    className="w-full mt-4 py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#005c55] hover:text-white text-[#005c55] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>مراجعة الوحدة</span>
                    <span className="material-symbols-outlined rotate-180 text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Unit Card 2 */}
            <div className="rounded-2xl bg-white shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group border border-[#dae2fd]">
              <div className="relative h-48 w-full overflow-hidden bg-[#eaedff]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt="التمريرة الصدرية"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnjrKTaPq5Hwk0i2DcNNRGwK_G8c5PF-4VJZtQunh3euH-hqwqGeDopimBPrIdd0hQWjSFeYY1b87OyhVZb2IdtBfllDiXcv9kMx-Itcdtc5SjR21g5Xbvldo_w9dvMhxeiZGrv486K3E6BvjvFVlozJhl-x7nBuwmU6LTImsbwPOwZ7rStGqZ4IOq4SHBym4N3eshaZa03LYJ3TFfxkNtT_K3B7gu7GQMaCPxzKSOAhcnPsxn7Wpwuw"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#006398] text-xs font-bold shadow-xs">
                  الوحدة الرابعة
                </div>
                <div className="absolute bottom-3 left-3 px-3 py-0.5 rounded bg-[#006398] text-white text-xs font-bold">
                  قيد التعلم (65%)
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[#6e7977] mb-1 text-xs">
                    <span className="material-symbols-outlined text-sm">timer</span>
                    <span>الزمن المقترح: 50 دقيقة</span>
                  </div>
                  <h3 className="text-base font-bold text-[#131b2e] mb-1 group-hover:text-[#006398] transition-colors">
                    التمريرة الصدرية المستقيمة
                  </h3>
                  <p className="text-xs text-[#3e4947] line-clamp-2 leading-relaxed">
                    تحليل زاوية المرفقين ونقل عزم القوة من الجذع والطرف المتقدم لضمان السرعة والدقة في إيصال الكرة.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#eaedff]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#3e4947]">مؤشر الإتقان</span>
                    <span className="text-xs text-[#006398] font-bold">65%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                    <div className="h-full bg-[#006398] rounded-full w-[65%]" />
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('unit-learning-experience')}
                    className="w-full mt-4 py-2.5 rounded-xl bg-[#006398] text-white hover:bg-[#00476e] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>متابعة التعلم</span>
                    <span className="material-symbols-outlined rotate-180 text-base">play_arrow</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Unit Card 3 */}
            <div className="rounded-2xl bg-white shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group border border-[#dae2fd]">
              <div className="relative h-48 w-full overflow-hidden bg-[#eaedff]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt="البدء المنخفض"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmgathoQddOq7Swy-uODUgIzY7_tU8DRpio4vVil-y7ypHwNjV-2RcAknTj-ZlmD_5zNUNnbyI870cMcc87ugqRmq5iYdIrxjV0erref93fUaMPWMfouPCaurEcuDh3rvA4MuoYYRA4yPCnmgjmow5IKa7HlezSrVc_8H-ULozKuPepFwM0NYm2fFEAz1gPTdZpaUqL8M1ulmHG4IDh_4_quLM7LjvFSColgIgYEYBLSja2aVBvprHmw"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#3e4947] text-xs font-bold shadow-xs">
                  الوحدة التاسعة
                </div>
                <div className="absolute bottom-3 left-3 px-3 py-0.5 rounded bg-[#eaedff] text-[#3e4947] text-xs font-bold">
                  الوحدة التالية
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[#6e7977] mb-1 text-xs">
                    <span className="material-symbols-outlined text-sm">timer</span>
                    <span>الزمن المقترح: 60 دقيقة</span>
                  </div>
                  <h3 className="text-base font-bold text-[#131b2e] mb-1 group-hover:text-[#005c55] transition-colors">
                    البدء المنخفض والانطلاق السريع
                  </h3>
                  <p className="text-xs text-[#3e4947] line-clamp-2 leading-relaxed">
                    تطبيق قوانين نيوتن للحركة في دفع مكعبات البداية وزوايا استقامة الجذع التدريجية أثناء التسارع الأولي.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#eaedff]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#3e4947]">مؤشر الإتقان</span>
                    <span className="text-xs text-[#6e7977] font-bold">0%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                    <div className="h-full bg-[#bdc9c6] rounded-full w-0" />
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('unit-learning-experience')}
                    className="w-full mt-4 py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>بدء الوحدة</span>
                    <span className="material-symbols-outlined text-base">lock_open</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. RESEARCH CONTEXT & ACADEMIC TEAM FOOTER NOTE */}
        <section className="w-full rounded-2xl bg-white p-6 sm:p-8 shadow-xs border border-[#dae2fd]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 flex flex-col gap-2 text-right">
              <div className="inline-flex items-center gap-1.5 text-[#005c55]">
                <span className="material-symbols-outlined text-lg">account_balance</span>
                <span className="text-xs font-bold">السياق العلمي والبحثي للمشروع</span>
              </div>
              <h3 className="text-xl font-bold text-[#131b2e]">
                قسم المناهج وطرق تدريس التربية البدنية وعلوم الرياضة
              </h3>
              <p className="text-xs sm:text-sm text-[#3e4947] leading-relaxed">
                تم تصميم هذه البيئة التعليمية الرقمية كأداة بحثية وتدريسية لدراسة فاعلية المنصات التفاعلية والتحليل البصري الحركي في تسريع اكتساب المهارات التوافقية لطلاب المرحلة الجامعية، والتحقق من بقاء أثر التعلم الحركي المقنن وفق المعايير التجريبية المعتمدة.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <div className="p-3.5 rounded-xl bg-[#f2f3ff] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0f766e] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">person</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#131b2e]">إعداد الباحث الأكاديمي</div>
                  <div className="text-[11px] text-[#6e7977]">باحث دراسات عليا - علوم الحركة الرياضية</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f2f3ff] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#dae2fd] text-[#006398] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">school</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#131b2e]">الإشراف الأكاديمي</div>
                  <div className="text-[11px] text-[#6e7977]">لجنة الدراسات العليا والمناهج الرياضية</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
