import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('10');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      setSubject('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#dae2fd] relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#0f766e]/10 text-[#005c55] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">contact_support</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#131b2e]">تواصل مع المشرف الأكاديمي</h3>
              <p className="text-xs text-[#6e7977]">د. أحمد السالم • لجنة الدراسات العليا والبحث العلمي</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-[#6e7977] hover:bg-[#f2f3ff] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#005e3f]/15 text-[#005e3f] flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h4 className="font-bold text-lg text-[#131b2e]">تم إرسال رسالتك بنجاح!</h4>
            <p className="text-sm text-[#3e4947] max-w-xs">
              سيقوم المشرف الأكاديمي بمراجعة استفسارك وتقرير الزوايا الحركية والرد خلال 24 ساعة عمل.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div>
              <label className="block text-xs font-bold text-[#3e4947] mb-1.5">الوحدة التعليمية المرتبطة</label>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full bg-[#f2f3ff] text-[#131b2e] px-3.5 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#005c55] border border-[#dae2fd]/60"
              >
                <option value="all">استفسار عام عن البرنامج الحركي</option>
                <option value="1">الوحدة 01: مبادئ التوافق العضلي والوقفة الحركية</option>
                <option value="9">الوحدة 09: البدء المنخفض وتوازن القوى</option>
                <option value="10">الوحدة 10: ضبط التوازن الحركي والتوافق المعقد</option>
                <option value="11">الوحدة 11: سرعة الاستجابة والتغيير الاتجاهي</option>
                <option value="12">الوحدة 12: التوافق بين الأطراف في الفضاء</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3e4947] mb-1.5">موضوع الاستفسار</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="مثال: استفسار حول معايرة زاوية ميل الجذع في مرحلة الهبوط"
                className="w-full bg-[#f2f3ff] text-[#131b2e] px-3.5 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#005c55] border border-[#dae2fd]/60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3e4947] mb-1.5">تفاصيل الاستفسار أو الملاحظة الميدانية</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب ملاحظاتك، الاستفسار عن بطاقة الملاحظة، أو صعوبات التوافق الحركي أثناء التدريب..."
                className="w-full bg-[#f2f3ff] text-[#131b2e] px-3.5 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#005c55] border border-[#dae2fd]/60 resize-none"
              ></textarea>
            </div>

            <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#dae2fd]/60 flex items-center justify-between text-xs text-[#6e7977]">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#006398]">attach_file</span>
                إرفاق تسجيل فيديو حركي (اختياري)
              </span>
              <button
                type="button"
                onClick={() => alert('تم اختيار تسجيل المحاولة الأخيرة تلقائياً')}
                className="text-[#005c55] font-bold hover:underline"
              >
                تحديد ملف
              </button>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-[#f2f3ff] text-[#3e4947] hover:bg-[#eaedff] font-semibold text-xs transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#0f766e] text-white hover:bg-[#005c55] font-semibold text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">send</span>
                <span>إرسال للمشرف</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
