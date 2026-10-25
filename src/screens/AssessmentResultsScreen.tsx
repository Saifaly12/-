import React, { useState } from 'react';
import { ASSESSMENT_RECORDS } from '../data/mockData';
import { ScreenRoute } from '../types';

interface AssessmentResultsScreenProps {
  onNavigate: (route: ScreenRoute, unitId?: number) => void;
  onOpenContactModal: () => void;
}

export const AssessmentResultsScreen: React.FC<AssessmentResultsScreenProps> = ({
  onNavigate,
  onOpenContactModal,
}) => {
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isExportMenuOpen, setIsExportMenuOpen] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Filter records
  const filteredRecords = ASSESSMENT_RECORDS.filter((rec) => {
    const matchesLevel =
      filterLevel === 'all'
        ? true
        : filterLevel === 'excellent'
        ? rec.performanceLevel === 'ممتاز'
        : filterLevel === 'verygood'
        ? rec.performanceLevel === 'جيد جداً'
        : rec.performanceLevel === 'تدريب إضافي';

    const matchesSearch =
      rec.unitTitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      rec.targetSkill.toLowerCase().includes(searchFilter.toLowerCase()) ||
      rec.recommendedAction.toLowerCase().includes(searchFilter.toLowerCase());

    return matchesLevel && matchesSearch;
  });

  const handleExport = (format: 'Excel' | 'CSV' | 'SPSS') => {
    setIsExportMenuOpen(false);
    setExportNotice(`جاري تصدير بيانات القياس بصيغة ${format}...`);
    setTimeout(() => {
      setExportNotice(null);
    }, 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  // 6-axis Radar Chart Calculations
  // Axes: [التوازن الثابت والديناميكي, الرشاقة وتغيير الاتجاه, الدقة الحركية, التوافق العضلي العصبي, زمن رد الفعل, القدرة الانفجارية]
  const radarAxes = [
    { label: 'التوازن', value: 92, angle: 0 },
    { label: 'الرشاقة', value: 85, angle: 60 },
    { label: 'الدقة الحركية', value: 94, angle: 120 },
    { label: 'التوافق', value: 88, angle: 180 },
    { label: 'زمن الاستجابة', value: 76, angle: 240 },
    { label: 'القدرة الانفجارية', value: 89, angle: 300 },
  ];

  const radarCenter = { x: 140, y: 140 };
  const radarRadius = 90;

  const getRadarCoordinates = (angleDeg: number, valPercent: number) => {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    const r = (valPercent / 100) * radarRadius;
    const x = radarCenter.x + r * Math.cos(angleRad);
    const y = radarCenter.y + r * Math.sin(angleRad);
    return { x, y };
  };

  const studentPolygonPoints = radarAxes
    .map((axis) => {
      const { x, y } = getRadarCoordinates(axis.angle, axis.value);
      return `${x},${y}`;
    })
    .join(' ');

  const benchmarkPolygonPoints = radarAxes
    .map((axis) => {
      const { x, y } = getRadarCoordinates(axis.angle, 80); // 80% benchmark
      return `${x},${y}`;
    })
    .join(' ');

  // Progression Line Data across 12 assessed units
  const progressionData = [
    { unit: 1, score: 72 },
    { unit: 2, score: 78 },
    { unit: 3, score: 81 },
    { unit: 4, score: 85 },
    { unit: 5, score: 83 },
    { unit: 6, score: 89 },
    { unit: 7, score: 88 },
    { unit: 8, score: 92 },
    { unit: 9, score: 94 },
    { unit: 10, score: 91 },
    { unit: 11, score: 76 },
    { unit: 12, score: 88 },
  ];

  const svgWidth = 600;
  const svgHeight = 160;
  const paddingX = 40;
  const paddingY = 25;

  const getLinePoint = (idx: number, score: number) => {
    const x = paddingX + (idx / 11) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - ((score - 60) / 40) * (svgHeight - paddingY * 2);
    return { x, y };
  };

  const polylinePoints = progressionData
    .map((d, i) => {
      const pt = getLinePoint(i, d.score);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  return (
    <div className="space-y-8">
      {/* Export notification */}
      {exportNotice && (
        <div className="p-4 bg-primary text-white rounded-2xl shadow-lg flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined">download_done</span>
            <span className="text-sm font-bold">{exportNotice}</span>
          </div>
          <button
            onClick={() => setExportNotice(null)}
            className="text-white/80 hover:text-white material-symbols-outlined text-lg cursor-pointer"
          >
            close
          </button>
        </div>
      )}

      {/* Header & Academic Metadata Bar */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
              تقرير القياس والتقويم الحركي الشامل
            </span>
            <span className="text-xs text-slate-400 font-bold">الفصل الدراسي الثاني 2026/2025</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            سجل القياسات والتحليل البيوميكانيكي
          </h1>
          <p className="text-sm text-slate-500 font-bold mt-1">
            الطالب: عبدالله الفهد | الرقم الجامعي: 44102983 | إشراف: د. أحمد السالم
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Share with supervisor */}
          <button
            onClick={onOpenContactModal}
            className="px-4 py-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-2 border border-slate-200 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">forum</span>
            <span>مشاركة التقرير مع المشرف</span>
          </button>

          {/* Print PDF Button */}
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-2xl bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">print</span>
            <span>طباعة تقرير معتمد</span>
          </button>

          {/* Raw Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-primary/20 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">file_download</span>
              <span>تصدير البيانات</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>

            {isExportMenuOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30 animate-fade-in text-right">
                <button
                  onClick={() => handleExport('Excel')}
                  className="w-full px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-base">table_chart</span>
                    <span>Excel (.xlsx)</span>
                  </span>
                  <span className="text-[10px] text-slate-400">شامل</span>
                </button>
                <button
                  onClick={() => handleExport('SPSS')}
                  className="w-full px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-base">query_stats</span>
                    <span>SPSS (.sav)</span>
                  </span>
                  <span className="text-[10px] text-slate-400">إحصائي</span>
                </button>
                <button
                  onClick={() => handleExport('CSV')}
                  className="w-full px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-600 text-base">data_object</span>
                    <span>مجدول (.csv)</span>
                  </span>
                  <span className="text-[10px] text-slate-400">خام</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4 Quantitative KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">المعدل التراكمي الحركي</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">grade</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">89.4%</span>
            <span className="text-xs font-bold text-emerald-600">تقدير ممتاز</span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 mt-2">
            معيار الانحراف المعياري (Z-Score): +1.84
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">الوحدات المنجزة</span>
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">check_box</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">12</span>
            <span className="text-xs font-bold text-slate-400">من أصل 16 وحدة</span>
          </div>
          <p className="text-[11px] font-bold text-primary mt-2">نسبة إنجاز المنهاج الحركي 75%</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">متوسط زمن الاستجابة</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">timer</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">6.2</span>
            <span className="text-xs font-bold text-slate-500">ثانية</span>
          </div>
          <p className="text-[11px] font-bold text-emerald-600 mt-2">تحسن بنسبة 28% مقارنة بالقياس القبلي</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">دقة التطبيق الميداني</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">target</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">91.8%</span>
            <span className="text-xs font-bold text-amber-600">فوق المتوسط</span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 mt-2">وفق شبكة الملاحظة الميدانية للمشرف</p>
        </div>
      </section>

      {/* Visual Analytics: Progression Curve + 6-Axis Radar */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 16-Unit Progression Trend Line (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-800">منحنى التطور الحركي عبر الوحدات</h3>
              <p className="text-xs text-slate-400 font-bold">تدرج الدرجات من الوحدة 1 حتى الوحدة 12 المقيمة</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="flex items-center gap-1 text-primary">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                درجة الطالب
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-3 border-t-2 border-dashed border-slate-400 inline-block"></span>
                المعيار الأكاديمي (80%)
              </span>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="w-full overflow-x-auto pt-2">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-48">
              {/* Grid Lines */}
              <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="#f1f5f9" strokeWidth="1" />
              <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="#f1f5f9" strokeWidth="1" />
              <line
                x1={paddingX}
                y1={svgHeight - paddingY}
                x2={svgWidth - paddingX}
                y2={svgHeight - paddingY}
                stroke="#f1f5f9"
                strokeWidth="1"
              />

              {/* 80% Benchmark dashed line */}
              <line
                x1={paddingX}
                y1={svgHeight - paddingY - (20 / 40) * (svgHeight - paddingY * 2)}
                x2={svgWidth - paddingX}
                y2={svgHeight - paddingY - (20 / 40) * (svgHeight - paddingY * 2)}
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text
                x={svgWidth - paddingX + 5}
                y={svgHeight - paddingY - (20 / 40) * (svgHeight - paddingY * 2) + 3}
                fontSize="9"
                fill="#94a3b8"
                fontWeight="bold"
              >
                80%
              </text>

              {/* Actual Polyline */}
              <polyline
                fill="none"
                stroke="#005c55"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={polylinePoints}
              />

              {/* Data points circles */}
              {progressionData.map((d, i) => {
                const pt = getLinePoint(i, d.score);
                const isWarning = d.score < 80;
                return (
                  <g key={d.unit}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isWarning ? '5' : '4'}
                      fill={isWarning ? '#e11d48' : '#005c55'}
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x={pt.x}
                      y={svgHeight - 6}
                      fontSize="9"
                      fill="#64748b"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      و{d.unit}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <p className="text-xs text-slate-500 font-bold bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">info</span>
            <span>
              يظهر المنحنى نمواً مطرداً من المرحلة الإدراكية إلى الاستقلالية، مع انخفاض في الوحدة 11 نتيجة صعوبة المهارة المركبة.
            </span>
          </p>
        </div>

        {/* 6-Axis Capability Radar Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-800">مخطط القدرات الحركية (رادار)</h3>
              <p className="text-xs text-slate-400 font-bold">توزيع الكفاءات الحركية الست</p>
            </div>
            <span className="text-xs font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              6 محاور
            </span>
          </div>

          {/* Radar Chart SVG */}
          <div className="flex justify-center items-center py-2">
            <svg width="280" height="280" viewBox="0 0 280 280" className="overflow-visible">
              {/* Concentric Hexagons */}
              {[0.25, 0.5, 0.75, 1.0].map((level) => {
                const ringPoints = radarAxes
                  .map((axis) => {
                    const { x, y } = getRadarCoordinates(axis.angle, level * 100);
                    return `${x},${y}`;
                  })
                  .join(' ');
                return (
                  <polygon
                    key={level}
                    points={ringPoints}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    strokeDasharray={level === 0.75 ? '3 3' : 'none'}
                  />
                );
              })}

              {/* Axis spokes */}
              {radarAxes.map((axis) => {
                const { x, y } = getRadarCoordinates(axis.angle, 100);
                return (
                  <line
                    key={axis.label}
                    x1={radarCenter.x}
                    y1={radarCenter.y}
                    x2={x}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Benchmark polygon */}
              <polygon
                points={benchmarkPolygonPoints}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Student polygon */}
              <polygon
                points={studentPolygonPoints}
                fill="#005c55"
                fillOpacity="0.25"
                stroke="#005c55"
                strokeWidth="2.5"
              />

              {/* Points on vertices */}
              {radarAxes.map((axis) => {
                const { x, y } = getRadarCoordinates(axis.angle, axis.value);
                const labelPos = getRadarCoordinates(axis.angle, 115);
                return (
                  <g key={axis.label}>
                    <circle cx={x} cy={y} r="4" fill="#005c55" stroke="#fff" strokeWidth="2" />
                    <text
                      x={labelPos.x}
                      y={labelPos.y + 4}
                      fontSize="10"
                      fill="#334155"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {axis.label} ({axis.value}%)
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-around text-xs font-bold border-t border-slate-100 pt-3 text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-primary inline-block"></span>
              <span>مستوى الطالب الفعلي</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 border-t-2 border-dashed border-slate-400 inline-block"></span>
              <span>المعيار المستهدف (80%)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Targeted Intervention Banner for Underperforming Unit */}
      <section className="bg-gradient-to-l from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
            <span className="material-symbols-outlined text-2xl">priority_high</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-200 text-amber-900 font-black px-2.5 py-0.5 rounded-full">
                توصية إشرافية استدراكية
              </span>
              <span className="text-xs text-amber-700 font-bold">الوحدة 11: الفرملة الحركية والتحكم في الزخم</span>
            </div>
            <h4 className="text-base font-black text-slate-800">
              برنامج ضبط التباطؤ الحركي المفاجئ وتشتيت رد الفعل
            </h4>
            <p className="text-xs text-slate-600 font-bold leading-relaxed">
              أظهر تقييم الوحدة 11 نسبة إتقان 64% (أقل من معيار الإتقان 80%). يُوصى بأداء 3 تدريبات نوعية لضبط مركز ثقل الجسم قبل الاختبار النهائي.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('unit-learning-experience', 11)}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-md shadow-amber-600/20 whitespace-nowrap transition-all cursor-pointer"
        >
          <span>بدء التدريب الاستدراكي</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </section>

      {/* Detailed Measurement Records Table */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-slate-800">سجل القياسات الحركية الميدانية المعتمَدة</h3>
            <p className="text-xs text-slate-400 font-bold">توثيق درجات الاختبار المعرفي والتطبيق العملي وملاحظات المشرف</p>
          </div>

          {/* Filter tabs & Search */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
              <button
                onClick={() => setFilterLevel('all')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  filterLevel === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500'
                }`}
              >
                الكل ({ASSESSMENT_RECORDS.length})
              </button>
              <button
                onClick={() => setFilterLevel('excellent')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  filterLevel === 'excellent' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500'
                }`}
              >
                ممتاز
              </button>
              <button
                onClick={() => setFilterLevel('verygood')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  filterLevel === 'verygood' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500'
                }`}
              >
                جيد جداً
              </button>
              <button
                onClick={() => setFilterLevel('needswork')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  filterLevel === 'needswork' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-500'
                }`}
              >
                تدريب إضافي
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="بحث في المهارة أو الإجراء..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <span className="material-symbols-outlined text-slate-400 text-sm absolute right-2.5 top-1/2 -translate-y-1/2">
                search
              </span>
            </div>
          </div>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-xs font-black border-b border-slate-100">
                <th className="py-3.5 px-4">رقم الوحدة</th>
                <th className="py-3.5 px-4">اسم المهارة الحركية</th>
                <th className="py-3.5 px-4">المهارة المستهدفة</th>
                <th className="py-3.5 px-4">الاختبار المعرفي</th>
                <th className="py-3.5 px-4">التطبيق العملي</th>
                <th className="py-3.5 px-4">المستوى</th>
                <th className="py-3.5 px-4">التاريخ</th>
                <th className="py-3.5 px-4">الإجراء المقترح</th>
                <th className="py-3.5 px-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
              {filteredRecords.map((record) => {
                const isExcellent = record.performanceLevel === 'ممتاز';
                const isVeryGood = record.performanceLevel === 'جيد جداً';

                return (
                  <tr key={record.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-4 font-black text-slate-800">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center">
                        #{record.unitId}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-black text-slate-900">{record.unitTitle}</td>
                    <td className="py-4 px-4 text-slate-500">{record.targetSkill}</td>
                    <td className="py-4 px-4 font-bold text-primary">
                      {record.cognitiveScore} / {record.maxCognitiveScore}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-sm font-black ${
                          isExcellent
                            ? 'text-emerald-700'
                            : isVeryGood
                            ? 'text-blue-700'
                            : 'text-rose-600'
                        }`}
                      >
                        {record.practicalPercentage}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          isExcellent
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : isVeryGood
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {record.performanceLevel}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-400 font-medium">{record.evaluationDate}</td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {record.recommendedAction}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => onNavigate('unit-learning-experience', record.unitId)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-primary hover:text-white text-slate-600 font-bold transition-all text-xs flex items-center gap-1 mx-auto cursor-pointer"
                        title="عرض تدريبات الوحدة"
                      >
                        <span>مراجعة</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
