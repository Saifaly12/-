import React, { useState, useEffect } from 'react';
import { ALL_UNITS, SAMPLE_QUIZ_QUESTIONS } from '../data/mockData';
import { QuizQuestion, ScreenRoute } from '../types';

interface InteractiveQuizScreenProps {
  onNavigate: (route: ScreenRoute, unitId?: number) => void;
}

export const InteractiveQuizScreen: React.FC<InteractiveQuizScreenProps> = ({ onNavigate }) => {
  const [selectedUnitId, setSelectedUnitId] = useState<number>(10);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<'a' | 'b' | 'c' | 'd' | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(3450);
  const [streak, setStreak] = useState<number>(3);
  const [timeLeft, setTimeLeft] = useState<number>(18);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Filter or fallback questions
  const availableQuestions = SAMPLE_QUIZ_QUESTIONS.filter((q) => q.unitId === selectedUnitId);
  const activeQuestions = availableQuestions.length > 0 ? availableQuestions : SAMPLE_QUIZ_QUESTIONS;
  const currentQuestion: QuizQuestion = activeQuestions[questionIndex] || activeQuestions[0];

  const totalTime = 20;

  // Countdown timer
  useEffect(() => {
    if (!isTimerRunning || isAnswerSubmitted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, isAnswerSubmitted, questionIndex]);

  const handleTimeOut = () => {
    setIsAnswerSubmitted(true);
    setStreak(0);
  };

  const handleOptionSelect = (optId: 'a' | 'b' | 'c' | 'd') => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    setIsTimerRunning(false);

    const chosenOption = currentQuestion.options.find((opt) => opt.id === selectedOptionId);
    if (chosenOption && chosenOption.isCorrect) {
      const bonus = timeLeft * 10 + streak * 40 + currentQuestion.points;
      setScore((prev) => prev + bonus);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex < activeQuestions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
      setTimeLeft(20);
      setIsTimerRunning(true);
    } else {
      alert(`تهانينا! أكملت بنك الأسئلة التفاعلية للوحدة ${selectedUnitId} برصيد ${score} نقطة.`);
    }
  };

  const handleRestartQuiz = () => {
    setQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setTimeLeft(20);
    setIsTimerRunning(true);
  };

  const selectUnit = (uId: number) => {
    setSelectedUnitId(uId);
    setQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setTimeLeft(20);
    setIsTimerRunning(true);
    setIsDrawerOpen(false);
  };

  const selectedUnit = ALL_UNITS.find((u) => u.id === selectedUnitId) || ALL_UNITS[9];

  return (
    <div className="relative space-y-6">
      {/* Top Banner / Arena Control Bar */}
      <section className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Left: Unit Selector & Quiz info */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-2xl transition-all cursor-pointer"
            title="تبديل وحدة الاختبار"
          >
            <span className="material-symbols-outlined text-lg">menu_book</span>
            <span>الوحدة {selectedUnit.numberStr}: {selectedUnit.title}</span>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-bold bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
            <span>سؤال</span>
            <span className="text-primary font-black text-sm">{questionIndex + 1}</span>
            <span>من</span>
            <span>{activeQuestions.length}</span>
          </div>
        </div>

        {/* Right: Gamified Stats (Streak, Points, Timer) */}
        <div className="flex items-center gap-4">
          {/* Streak Indicator */}
          <div className="flex items-center gap-2 bg-gradient-to-l from-orange-500/10 to-amber-500/10 px-3.5 py-1.5 rounded-2xl border border-orange-200 text-orange-600">
            <span className="text-lg">🔥</span>
            <div className="text-right">
              <p className="text-[10px] font-bold text-orange-400 leading-none">مضاعف السرعة</p>
              <p className="text-sm font-black leading-tight">{streak}x متتالي</p>
            </div>
          </div>

          {/* Points Counter */}
          <div className="flex items-center gap-2 bg-slate-900 text-amber-300 px-4 py-2 rounded-2xl shadow-sm">
            <span className="material-symbols-outlined text-amber-400 text-lg">stars</span>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold leading-none">مجموع النقاط</p>
              <p className="text-base font-black leading-tight tracking-wider">{score.toLocaleString()}</p>
            </div>
          </div>

          {/* Animated Circular Timer */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="19"
                stroke="currentColor"
                strokeWidth="4"
                className="text-slate-100"
                fill="transparent"
              />
              <circle
                cx="24"
                cy="24"
                r="19"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="119.4"
                strokeDashoffset={119.4 * (1 - timeLeft / totalTime)}
                strokeLinecap="round"
                className={`transition-all duration-1000 ${
                  timeLeft <= 5 ? 'text-rose-500' : 'text-primary'
                }`}
                fill="transparent"
              />
            </svg>
            <span
              className={`absolute text-sm font-black ${
                timeLeft <= 5 ? 'text-rose-600 animate-pulse' : 'text-slate-800'
              }`}
            >
              {timeLeft}
            </span>
          </div>
        </div>
      </section>

      {/* Main Question Display & Media */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        {/* Unit & Biomechanical Category Pill */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full">
              {currentQuestion.domain}
            </span>
            <span className="text-xs text-slate-400 font-bold">
              المجال الفرعي: {currentQuestion.subDomain}
            </span>
          </div>

          <div className="text-xs text-slate-400 font-bold">
            القيمة المهارية: +{currentQuestion.points} نقطة إتقان
          </div>
        </div>

        {/* Question Prompt */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            {currentQuestion.questionText}
          </h2>

          {/* Diagram Image if available */}
          {currentQuestion.diagramImageUrl && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900/5 max-h-72 flex items-center justify-center">
              <img
                src={currentQuestion.diagramImageUrl}
                alt={currentQuestion.questionText}
                className="w-full h-64 object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-xs">analytics</span>
                <span>{currentQuestion.diagramBadge || 'مخطط التحليل البيوميكانيكي'}</span>
                {currentQuestion.diagramFormula && (
                  <span className="border-r border-slate-600 pr-2 mr-2 text-amber-300 font-mono">
                    {currentQuestion.diagramFormula}
                  </span>
                )}
              </div>
            </div>
          )}

          {currentQuestion.hintText && (
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-500 font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500 text-sm">tips_and_updates</span>
              <span>{currentQuestion.hintText}</span>
            </div>
          )}
        </div>

        {/* 4 Kahoot-Style Quadrant Answer Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrect = option.isCorrect;

            let cardStyles = `${option.colorClass} shadow-md`;
            let statusBadge = null;

            if (isAnswerSubmitted) {
              if (isCorrect) {
                cardStyles = 'bg-emerald-600 text-white ring-4 ring-emerald-300 shadow-lg scale-[1.01]';
                statusBadge = (
                  <span className="flex items-center gap-1 bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-bold">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    الإجابة الصحيحة
                  </span>
                );
              } else if (isSelected && !isCorrect) {
                cardStyles = 'bg-rose-600 text-white ring-4 ring-rose-300 opacity-90';
                statusBadge = (
                  <span className="flex items-center gap-1 bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-bold">
                    <span className="material-symbols-outlined text-sm">cancel</span>
                    اختيار خاطئ
                  </span>
                );
              } else {
                cardStyles = 'bg-slate-200 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              cardStyles += ' ring-4 ring-white/50 scale-[1.02]';
            }

            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={isAnswerSubmitted}
                className={`relative p-5 rounded-2xl text-right flex flex-col justify-between min-h-[110px] transition-all transform active:scale-95 cursor-pointer ${cardStyles}`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl opacity-90">{option.iconName}</span>
                    <span className="text-xs font-black uppercase opacity-80">{option.label}</span>
                  </div>
                  {statusBadge}
                </div>

                <p className="text-base font-bold leading-normal">{option.text}</p>
              </button>
            );
          })}
        </div>

        {/* Action Controls & Immediate Feedback */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          {!isAnswerSubmitted ? (
            <div className="w-full flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold">
                {selectedOptionId ? 'اضغط "تأكيد الإجابة" للاحتساب' : 'حدد الخيار المناسب قبل نفاد الوقت'}
              </span>
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className={`px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-md transition-all ${
                  selectedOptionId
                    ? 'bg-primary text-white hover:bg-primary-hover shadow-primary/20 cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>تأكيد الإجابة</span>
                <span className="material-symbols-outlined text-lg">check</span>
              </button>
            </div>
          ) : (
            <div className="w-full space-y-4">
              {/* Pedagogical Explanation Card */}
              <div
                className={`p-5 rounded-2xl border ${
                  selectedOptionId === currentQuestion.options.find((o) => o.isCorrect)?.id
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`material-symbols-outlined text-2xl ${
                      selectedOptionId === currentQuestion.options.find((o) => o.isCorrect)?.id
                        ? 'text-emerald-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {selectedOptionId === currentQuestion.options.find((o) => o.isCorrect)?.id
                      ? 'verified'
                      : 'lightbulb'}
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-sm">
                        {selectedOptionId === currentQuestion.options.find((o) => o.isCorrect)?.id
                          ? `إجابة متقنة ومطابقة لمبادئ البيوميكانيك (+${currentQuestion.points} نقطة)!`
                          : 'التفسير العلمي للتغذية الراجعة الفورية:'}
                      </p>
                      <span className="text-xs font-bold text-slate-500">
                        المهارة المستهدفة: {currentQuestion.masteredSkill}
                      </span>
                    </div>
                    <p className="text-sm font-bold leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>

              {/* Navigation button */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleRestartQuiz}
                  className="px-4 py-2.5 text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">restart_alt</span>
                  <span>إعادة محاولة هذا السؤال</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigate('unit-learning-experience', selectedUnitId)}
                    className="px-4 py-2.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all cursor-pointer"
                  >
                    مراجعة محتوى الوحدة {selectedUnitId}
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl flex items-center gap-2 shadow-lg shadow-primary/20 transition-all cursor-pointer"
                  >
                    <span>{questionIndex < activeQuestions.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Gamification Achievements & Leaderboard Mini-Bar */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">military_tech</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold">الوسام الأكاديمي</p>
            <h4 className="text-sm font-black text-slate-800">محلل المتجهات المتقدم</h4>
            <p className="text-[11px] text-emerald-600 font-bold">دقة إجابات متتالية &gt; 90%</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">leaderboard</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold">الترتيب بين الأقران</p>
            <h4 className="text-sm font-black text-slate-800">المركز 4 من أصل 48 طالباً</h4>
            <p className="text-[11px] text-slate-500 font-bold">رصيد نقاط التنافس: 18,240</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">psychology</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold">سرعة الإدراك المعرفي</p>
            <h4 className="text-sm font-black text-slate-800">متوسط 5.8 ثوانٍ</h4>
            <p className="text-[11px] text-emerald-600 font-bold">+18% أسرع من المعيار البحثي</p>
          </div>
        </div>
      </section>

      {/* 16-Unit Drawer for quick switching */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">quiz</span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">اختر وحدة الاختبار التفاعلي</h3>
                  <p className="text-xs text-slate-500 font-bold">16 وحدة تعليمية مبنية وفق تسلسل فيتز وبوسنر</p>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="overflow-y-auto py-4 space-y-2 flex-1 pr-1">
              {ALL_UNITS.map((u) => {
                const isSelected = u.id === selectedUnitId;
                return (
                  <button
                    key={u.id}
                    onClick={() => selectUnit(u.id)}
                    className={`w-full p-4 rounded-2xl text-right flex items-center justify-between transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-primary/5 border-primary text-primary font-black shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-slate-600 shadow-xs">
                        {u.numberStr}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold">{u.title}</h4>
                        <p className="text-[11px] text-slate-400 font-bold">
                          المجال: {u.category} | الإنجاز: {u.progressPercent}%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {u.hasQuiz ? (
                        <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">
                          جاهز للاختبار
                        </span>
                      ) : (
                        <span className="text-xs bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                          نموذج إرشادي
                        </span>
                      )}
                      <span className="material-symbols-outlined text-slate-400 text-lg">chevron_left</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-all cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
