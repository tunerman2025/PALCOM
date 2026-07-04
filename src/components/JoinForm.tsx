"use client";

import { useState } from "react";

const FIELDS = [
  "برمجة ECU",
  "معايرة المحركات",
  "الهندسة العكسية",
  "المركبات الكهربائية",
  "الذكاء الاصطناعي",
  "التشخيص OBD",
  "شبكات CAN",
  "الأمن السيبراني",
  "أخرى",
];
const LEVELS = ["طالب / مبتدئ", "فني", "مهندس", "خبير / محترف"];
const CITIES = ["القدس", "رام الله", "نابلس", "جنين", "الخليل", "بيت لحم", "غزة", "طولكرم", "أريحا", "حيفا", "الشتات"];

export default function JoinForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    field: "",
    level: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.city || !form.field || !form.level) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("done");
        setForm({ name: "", email: "", city: "", field: "", level: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#35c8ff]/50";

  return (
    <section id="join" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,122,0.15),transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="mb-10 text-center">
          <span className="text-sm font-bold tracking-widest text-[#35c8ff]">
            JOIN THE NETWORK
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            كن جزءًا من{" "}
            <span className="gold-text">شبكة فلسطين الهندسية</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            سجّل بياناتك للانضمام إلى المنظومة والحصول على ملف عضو ومستوى اعتماد.
          </p>
        </div>

        {status === "done" ? (
          <div className="glass rounded-2xl p-10 text-center">
            <div className="mb-4 text-5xl">✅</div>
            <h3 className="text-2xl font-black gold-text">تم استلام طلبك!</h3>
            <p className="mt-3 text-slate-400">
              أهلاً بك في منظومة فلسطين الهندسية. سيتواصل معك فريقنا قريبًا لتفعيل
              عضويتك.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 rounded-xl border border-[#35c8ff]/40 px-6 py-2.5 text-sm text-[#35c8ff]"
            >
              تسجيل عضو آخر
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="glass space-y-4 rounded-2xl p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className={inputCls}
                placeholder="الاسم الكامل *"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
              <input
                className={inputCls}
                placeholder="البريد الإلكتروني *"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
              <select
                className={inputCls}
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
              >
                <option value="" className="bg-[#0b0e14]">
                  المدينة / الموقع *
                </option>
                {CITIES.map((c) => (
                  <option key={c} value={c} className="bg-[#0b0e14]">
                    {c}
                  </option>
                ))}
              </select>
              <select
                className={inputCls}
                value={form.level}
                onChange={(e) => set("level", e.target.value)}
              >
                <option value="" className="bg-[#0b0e14]">
                  المستوى *
                </option>
                {LEVELS.map((l) => (
                  <option key={l} value={l} className="bg-[#0b0e14]">
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <select
              className={inputCls}
              value={form.field}
              onChange={(e) => set("field", e.target.value)}
            >
              <option value="" className="bg-[#0b0e14]">
                مجال التخصص *
              </option>
              {FIELDS.map((f) => (
                <option key={f} value={f} className="bg-[#0b0e14]">
                  {f}
                </option>
              ))}
            </select>
            <textarea
              className={inputCls}
              rows={3}
              placeholder="نبذة عنك وخبراتك (اختياري)"
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
            />

            {status === "error" && (
              <div className="rounded-lg border border-red-400/30 bg-red-400/5 px-4 py-2 text-sm text-red-400">
                يرجى تعبئة جميع الحقول المطلوبة (*).
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="glow-gold w-full rounded-xl bg-gradient-to-l from-[#b87333] to-[#d4af7a] py-3.5 font-bold text-[#0a0a0a] transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "sending" ? "جارٍ الإرسال…" : "انضم إلى المنظومة الآن"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
