const LABS = [
  {
    name: "المختبر الافتراضي",
    en: "Virtual Lab",
    icon: "🖥️",
    desc: "محاكاة أنظمة ECU وتحليل إشارات CAN و Oscilloscope دون الحاجة لعتاد فعلي.",
    tags: ["ECU Sim", "CAN Bus", "Oscilloscope"],
  },
  {
    name: "مركز الأبحاث",
    en: "Research Center",
    icon: "🔬",
    desc: "أبحاث تطبيقية في المحركات والانبعاثات والقيادة الذاتية بمنهجية علمية.",
    tags: ["R&D", "Papers", "Data"],
  },
  {
    name: "مركز التدريب",
    en: "Training Center",
    icon: "🎓",
    desc: "دورات معتمدة ومسارات احترافية بشهادات وتقييم مستويات للأعضاء.",
    tags: ["Courses", "Certs", "Levels"],
  },
  {
    name: "مركز الابتكار",
    en: "Innovation Hub",
    icon: "💡",
    desc: "احتضان الأفكار وتحويلها إلى منتجات هندسية حقيقية قابلة للتطبيق.",
    tags: ["Prototype", "Startup", "Patents"],
  },
  {
    name: "تطوير البرمجيات",
    en: "Software Development",
    icon: "💻",
    desc: "بناء أدوات تشخيص وبرمجة وتطبيقات هندسية للمجتمع الفلسطيني والعربي.",
    tags: ["Tools", "Firmware", "Apps"],
  },
];

export default function Labs() {
  return (
    <section id="labs" className="relative border-y border-white/5 bg-[#07090d] py-24">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <span className="text-sm font-bold tracking-widest text-[#35c8ff]">
            THE LABS
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            مختبرات <span className="gold-text">المنظومة</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {LABS.map((lab, i) => (
            <div
              key={lab.en}
              className={`glass card-3d rounded-2xl p-7 ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af7a]/25 bg-[#d4af7a]/5 text-2xl glow-gold">
                  {lab.icon}
                </span>
                <div>
                  <div className="text-lg font-black text-slate-100">
                    {lab.name}
                  </div>
                  <div className="text-xs tracking-wider text-[#d4af7a]">
                    {lab.en}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                {lab.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {lab.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-[#35c8ff]/20 bg-[#35c8ff]/5 px-2.5 py-1 text-[11px] text-[#35c8ff]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
