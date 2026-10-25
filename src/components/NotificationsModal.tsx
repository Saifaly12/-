import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNotification?: (unitId: number) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onSelectNotification,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'ملاحظة تحليل حركي جديدة من د. أحمد السالم',
      description: 'تم فحص تسجيل الفيديو للوحدة التاسعة مع إضافة توجيهات خاصة بامتصاص صدمة الهبوط في الوحدة العاشرة.',
      time: 'منذ 3 ساعات',
      unitId: 10,
      unread: true,
      type: 'feedback',
    },
    {
      id: 2,
      title: 'تذكير بالجلسة الميدانية القادمة',
      description: 'اليوم الساعة 04:30 مساءً في معمل القياسات المهارية (قاعة 3) لإجراء القياس البعدي للتوازن.',
      time: 'اليوم • 01:00 م',
      unitId: 10,
      unread: true,
      type: 'session',
    },
    {
      id: 3,
      title: 'اعتماد نتيجة الاختبار التفاعلي للوحدة الثامنة',
      description: 'تم اجتياز اختبار دقة التصويب وتوجيه القوة بنسبة 95% وتحديث سجل الإنجاز التراكمي.',
      time: 'أمس',
      unitId: 8,
      unread: false,
      type: 'result',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005c55] text-xl">notifications</span>
            <h3 className="font-bold text-base text-[#131b2e]">التنبيهات والتوجيهات الأكاديمية</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-[#6e7977] hover:bg-[#f2f3ff] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="divide-y divide-[#eaedff] max-h-96 overflow-y-auto my-2">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 hover:bg-[#f2f3ff]/70 transition-colors rounded-xl my-1 cursor-pointer ${
                item.unread ? 'bg-[#f2f3ff]/40' : ''
              }`}
              onClick={() => {
                if (onSelectNotification) onSelectNotification(item.unitId);
                onClose();
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-[#131b2e] leading-snug">{item.title}</span>
                {item.unread && (
                  <span className="w-2 h-2 rounded-full bg-[#ba1a1a] shrink-0 mt-1"></span>
                )}
              </div>
              <p className="text-xs text-[#3e4947] leading-relaxed line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between mt-2 pt-1 text-[11px] text-[#6e7977]">
                <span>{item.time}</span>
                <span className="text-[#005c55] font-semibold hover:underline">عرض التفاصيل ←</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-[#eaedff] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-[#6e7977] hover:text-[#131b2e]"
          >
            تحديد الكل كمقروء
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0f766e] text-white text-xs font-semibold hover:bg-[#005c55] transition-colors"
          >
            تم
          </button>
        </div>
      </div>
    </div>
  );
};
