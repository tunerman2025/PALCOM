"use client";

import { useState } from "react";

const ROLES = [
  "هندسة التحليل الكهربائي (Electrolysis)",
  "السلامة وإدارة الضغط (Safety)",
  "دمج ECU والتحكم بالإشارة",
  "كفاءة الاحتراق والمحركات",
  "هندسة المواد والأقطاب",
  "الاختبار وتحليل البيانات",
];

const PRINCIPLES = [
  { n: "01", t: "التحليل الكهربائي", d: "تمرير تيار عبر الماء المشبّع بالإلكتروليت لتوليد غاز HHO (Brown's Gas) وفق قانون فاراداي." },
  { n: "02", t: "التحسين اللحظي", d: "يُحقن الغاز مباشرة في مجرى هواء السحب، فيُسرّع ويفّعل الاحتراق دون تخزين خطِر." },
  { n: "03", t: "توفير الوقود", d: "تحسّن نسبة الاحتراق يقلّل استهلاك البنزين/الديزل ويخفض الانبعاثات الضارة." },
  { n: "04", t: "الأمان أولًا", d: "صمّامات أمان، إطفاء تلقائي عند توقف المحرك، وفلاتر ضد الارتداد." },
];

export default function HydrogenHub() {
  const [role, setRole] = useState(ROLES[0]);
  const [form, setForm] = useState({ name: "", email: "", city: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.city) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          field: `هيدروجين — ${role}`,
          level:
            role.includes("Electrolysis") || role.includes("Safety")
              ? "مهندس"
              : "خبير / محترف",
          message: "التسجيل عبر باب خبراء الهيدروجين.",
        }),
      });
      if (res.ok) {
        setStatus("done");
        setForm({ name: "", email: "", city: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#35c8ff]/50";

  return (
    <section id="hydrogen" className="relative overflow-hidden border-y border-white/5 bg-[#07090d] py-24">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(53,200,255,0.12),transparent_70%)]" />
      <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(184,115,51,0.12),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#35c8ff]/30 bg-[#35c8ff]/5 px-4 py-1.5 text-xs tracking-widest text-[#35c8ff]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#35c8ff]" />
            HYDROGEN DIVISION
          </span>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            باب <span className="gold-text">خبراء الهيدروجين</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            مبادرة متخصصة لجمع المهندسين والخبراء لتطوير أنظمة الهيدروجين
            (HHO) لتوفير الوقود في المركبات التي تعمل بالبنزين والديزل.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* left: project + principles */}
          <div className="space-y-6">
            {/* featured project */}
            <div className="glass card-3d relative overflow-hidden rounded-2xl">
              <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1622] to-[#06100b]">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <span className="relative animate-float text-6xl opacity-80">💧</span>
                <span className="absolute right-3 top-3 rounded-md border border-[#d4af7a]/30 bg-[#d4af7a]/5 px-2 py-0.5 text-[11px] text-[#d4af7a]">
                  قيد البحث
                </span>
              </div>
              <div className="p-6">
                <div className="text-xs text-[#35c8ff]">Hydrogen Systems</div>
                <h3 className="mt-1 text-xl font-black text-slate-100">
                  نظام الهيدروجين لتوفير وقود المركبات
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  منظومة توليد غاز HHO لحظيًا عبر التحليل الكهربائي لتحسين احتراق
                  المحرك، بهدف خفض استهلاك الوقود والانبعاثات بأمان.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Hydrogen", "HHO", "Efficiency", "Green"].map((t) => (
                    <span key={t} className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-[11px] text-slate-500">
                    <span>غزة</span>
                    <span>38%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-gradient-to-l from-[#b87333] to-[#35c8ff]" style={{ width: "38%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* principles */}
            <div className="grid grid-cols-2 gap-3">
              {PRINCIPLES.map((p) => (
                <div key={p.n} className="glass rounded-xl p-4">
                  <div className="text-lg font-black gold-text">{p.n}</div>
                  <div className="mt-1 text-sm font-bold text-slate-200">{p.t}</div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{p.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* right: gather experts */}
          <div className="glass rounded-2xl p-7">
            <h3 className="text-xl font-black text-slate-100">
              نبحث عن خبراء للانضمام
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              اختر تخصصك وسجّل بياناتك — سنجمع نخبة الخبراء في هذا الباب.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`rounded-xl border px-3 py-2 text-right text-xs transition ${
                    role === r
                      ? "border-[#35c8ff]/50 bg-[#35c8ff]/10 text-[#35c8ff]"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {status === "done" ? (
              <div className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-6 text-center">
                <div className="mb-2 text-4xl">💧✅</div>
                <h4 className="font-black text-emerald-400">تم تسجيلك بنجاح!</h4>
                <p className="mt-2 text-sm text-slate-400">
                  شكرًا لانضمامك إلى باب خبراء الهيدروجين. سيتواصل معك الفريق قريبًا.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-3">
                <input
                  className={inputCls}
                  placeholder="الاسم الكامل *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className={inputCls}
                  placeholder="البريد الإلكتروني *"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  className={inputCls}
                  placeholder="المدينة / الموقع *"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
                <div className="rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-xs text-slate-400">
                  التخصص المختار: <span className="text-[#35c8ff]">{role}</span>
                </div>
                {status === "error" && (
                  <div className="rounded-lg border border-red-400/30 bg-red-400/5 px-4 py-2 text-sm text-red-400">
                    يرجى تعبئة جميع الحقول المطلوبة (*).
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="glow-gold w-full rounded-xl bg-gradient-to-l from-[#b87333] to-[#d4af7a] py-3 font-bold text-[#0a0a0a] transition hover:brightness-110 disabled:opacity-60"
                >
                  {status === "sending" ? "جارٍ الإرسال…" : "انضم كباحث في الهيدروجين"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
