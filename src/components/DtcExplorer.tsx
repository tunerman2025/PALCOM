"use client";

import { useCallback, useEffect, useState } from "react";

type Dtc = {
  id: number;
  code: string;
  title: string;
  category: string;
  system: string;
  manufacturer: string;
  unit: string;
  yearFrom: number | null;
  yearTo: number | null;
  severity: string;
  causes: string;
  solution: string;
};

const MAKES = ["all", "Universal", "BMW", "Mercedes", "Volkswagen", "Toyota", "Hyundai", "Ford"];
const UNITS = ["all", "ECU", "TCU", "ABS", "ADAS", "BCM", "SRS"];

const SEV: Record<string, string> = {
  low: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  medium: "text-[#d4af7a] border-[#d4af7a]/30 bg-[#d4af7a]/5",
  high: "text-red-400 border-red-400/30 bg-red-400/5",
};
const SEV_LABEL: Record<string, string> = {
  low: "منخفض",
  medium: "متوسط",
  high: "حرِج",
};

export default function DtcExplorer() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [make, setMake] = useState("all");
  const [unit, setUnit] = useState("all");
  const [year, setYear] = useState("");
  const [rows, setRows] = useState<Dtc[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const search = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category !== "all") params.set("category", category);
    if (make !== "all") params.set("manufacturer", make);
    if (unit !== "all") params.set("unit", unit);
    if (year) params.set("year", year);
    try {
      const res = await fetch(`/api/dtc?${params.toString()}`);
      const json = await res.json();
      setRows(json.data ?? []);
    } catch {
      setRows([]);
    }
    setLoading(false);
  }, [q, make, unit, year]);

  useEffect(() => {
    const t = setTimeout(search, 250);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <section id="dtc" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <span className="text-sm font-bold tracking-widest text-[#35c8ff]">
            LIVE DATABASE
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            قاعدة بيانات <span className="gold-text">أكواد الأعطال DTC</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            لأكثر من نظام إلكتروني — مركبات، أجهزة منزلية، حواسيب، شبكات، هواتف،
            وإلكترونيات عامة. ابحث حسب الكود أو الوصف.
          </p>
        </div>

        {/* controls */}
        <div className="glass rounded-2xl p-5">
          {/* category filter */}
          <div className="-mx-1 mb-4 flex flex-wrap gap-2">
            {[
              "all",
              "المركبات",
              "الأجهزة المنزلية",
              "الحواسيب",
              "الشبكات",
              "الهواتف الذكية",
              "الإلكترونيات العامة",
            ].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  category === c
                    ? "border-[#d4af7a]/50 bg-[#d4af7a]/10 text-[#d4af7a]"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                }`}
              >
                {c === "all" ? "كل الأنظمة" : c}
              </button>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="🔎 ابحث بالكود أو الوصف (P0300...)"
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#35c8ff]/50 md:col-span-2"
            />
            <select
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#35c8ff]/50"
            >
              {MAKES.map((m) => (
                <option key={m} value={m} className="bg-[#0b0e14]">
                  {m === "all" ? "كل الشركات" : m}
                </option>
              ))}
            </select>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#35c8ff]/50"
            >
              {UNITS.map((u) => (
                <option key={u} value={u} className="bg-[#0b0e14]">
                  {u === "all" ? "كل الوحدات" : u}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <input
              value={year}
              onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))}
              placeholder="سنة الصنع (مثال: 2018)"
              maxLength={4}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-[#35c8ff]/50 md:w-52"
            />
          </div>
        </div>

        {/* results */}
        <div className="mt-6 space-y-3">
          {loading && (
            <div className="py-10 text-center text-slate-500">جارٍ البحث…</div>
          )}
          {!loading && rows.length === 0 && (
            <div className="glass rounded-2xl py-12 text-center text-slate-500">
              لا توجد نتائج مطابقة. جرّب معايير مختلفة.
            </div>
          )}
          {!loading &&
            rows.map((r) => (
              <div key={r.id} className="glass overflow-hidden rounded-2xl">
                <button
                  onClick={() => setOpen(open === r.id ? null : r.id)}
                  className="flex w-full items-center gap-4 p-4 text-right transition hover:bg-white/5"
                >
                  <span className="rounded-lg border border-[#35c8ff]/30 bg-[#35c8ff]/10 px-3 py-2 font-mono text-sm font-bold text-[#35c8ff]">
                    {r.code}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-100">
                      {r.title}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      {r.category} • {r.manufacturer} • {r.unit}
                    </div>
                  </div>
                  <span
                    className={`hidden rounded-md border px-2 py-0.5 text-[11px] sm:inline ${
                      SEV[r.severity] ?? SEV.medium
                    }`}
                  >
                    {SEV_LABEL[r.severity] ?? r.severity}
                  </span>
                  <span className="text-slate-500">
                    {open === r.id ? "▲" : "▼"}
                  </span>
                </button>
                {open === r.id && (
                  <div className="border-t border-white/5 bg-black/30 p-5 text-sm">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <div className="mb-1 font-bold text-[#d4af7a]">
                          الأسباب المحتملة
                        </div>
                        <p className="leading-relaxed text-slate-300">
                          {r.causes}
                        </p>
                      </div>
                      <div>
                        <div className="mb-1 font-bold text-[#35c8ff]">
                          الحل المقترح
                        </div>
                        <p className="leading-relaxed text-slate-300">
                          {r.solution}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                      <span className="rounded bg-white/5 px-2 py-1">
                        الموديلات:{" "}
                        {r.yearFrom ?? "—"}–{r.yearTo ?? "الآن"}
                      </span>
                      <span className="rounded bg-white/5 px-2 py-1">
                        النظام: {r.system}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
