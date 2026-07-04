const DOMAINS = [
  { code: "ECU", name: "وحدة التحكم بالمحرك", icon: "🧩", desc: "برمجة ومعايرة وحدات التحكم الإلكترونية." },
  { code: "TCU", name: "التحكم بناقل الحركة", icon: "⚙️", desc: "ضبط وتحسين علب السرعة الأوتوماتيكية." },
  { code: "ADAS", name: "أنظمة القيادة المساعدة", icon: "🛰️", desc: "معايرة الرادارات والكاميرات والحساسات." },
  { code: "EV", name: "المركبات الكهربائية", icon: "🔋", desc: "أنظمة البطاريات والمحركات الكهربائية." },
  { code: "Hybrid", name: "المركبات الهجينة", icon: "♻️", desc: "إدارة الطاقة بين المحرك والبطارية." },
  { code: "DPF", name: "مرشح الجسيمات", icon: "🌫️", desc: "معالجة وتشخيص أنظمة الديزل." },
  { code: "SCR", name: "خفض الانبعاثات", icon: "💨", desc: "أنظمة AdBlue والتحكم بالانبعاثات." },
  { code: "CAN", name: "شبكات CAN Bus", icon: "🔗", desc: "تحليل بروتوكولات الاتصال بين الوحدات." },
  { code: "OBD", name: "التشخيص المتقدم", icon: "🩺", desc: "قراءة وتحليل بيانات الأعطال الحية." },
  { code: "Reverse", name: "الهندسة العكسية", icon: "🔍", desc: "تحليل ملفات الفلاش والخرائط." },
  { code: "Cyber", name: "الأمن السيبراني", icon: "🛡️", desc: "حماية أنظمة المركبات من الاختراق." },
  { code: "AI", name: "الذكاء الاصطناعي", icon: "🧠", desc: "نماذج تعلّم آلي لتشخيص الأعطال." },
  { code: "H2", name: "أنظمة الهيدروجين", icon: "💧", desc: "تحليل كهربائي لتوليد HHO وتوفير الوقود." },
];

export default function Domains() {
  return (
    <section id="domains" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <span className="text-sm font-bold tracking-widest text-[#35c8ff]">
            FIELDS OF WORK
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            مجالات <span className="gold-text">العمل الهندسي</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            تخصصات عميقة تغطّي كامل منظومة المركبة الحديثة، من العتاد حتى الذكاء
            الاصطناعي.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {DOMAINS.map((d) => (
            <div
              key={d.code}
              className="glass card-3d group relative overflow-hidden rounded-2xl p-5"
            >
              <div className="absolute -right-6 -top-6 text-6xl opacity-5 transition group-hover:opacity-10">
                {d.icon}
              </div>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-[#35c8ff]/20 bg-[#35c8ff]/5 text-xl">
                {d.icon}
              </div>
              <div className="text-lg font-black gold-text">{d.code}</div>
              <div className="mt-1 text-sm font-bold text-slate-200">
                {d.name}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                {d.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
