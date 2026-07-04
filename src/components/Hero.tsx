"use client";

import { useEffect, useState } from "react";

const NODES = [
  { x: 30, y: 18 }, { x: 68, y: 12 }, { x: 82, y: 30 }, { x: 20, y: 40 },
  { x: 50, y: 8 }, { x: 88, y: 55 }, { x: 15, y: 65 }, { x: 40, y: 78 },
  { x: 72, y: 82 }, { x: 60, y: 55 }, { x: 33, y: 55 }, { x: 90, y: 78 },
  { x: 10, y: 22 }, { x: 55, y: 90 }, { x: 78, y: 66 }, { x: 25, y: 88 },
];

const BRANCHES = [
  { label: "السيارات", en: "Vehicles", icon: "🚗", angle: -90 },
  { label: "الذكاء الاصطناعي", en: "AI", icon: "🧠", angle: -39 },
  { label: "البرمجة", en: "Software", icon: "💻", angle: 13 },
  { label: "مولد الهيدروجين", en: "HHO", icon: "💧", angle: 64 },
  { label: "المختبرات", en: "Labs", icon: "🔬", angle: 116 },
  { label: "المحركات", en: "Engines", icon: "⚙️", angle: 167 },
  { label: "التدريب", en: "Training", icon: "🎓", angle: 219 },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(53,200,255,0.10),transparent_60%)]" />
      <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,122,0.14),transparent_70%)]" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(53,200,255,0.12),transparent_70%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-28 lg:grid-cols-2">
        {/* Left: text */}
        <div className="text-center lg:text-right">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4af7a]/30 bg-[#d4af7a]/5 px-4 py-1.5 text-xs tracking-wide text-[#d4af7a]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#35c8ff]" />
            مركز القيادة الرقمي • Digital Command Center
          </div>

          <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            منظومة <span className="gold-text">فلسطين</span>
            <br />
            للمهندسين والمحترفين
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base text-slate-300 lg:mx-0 lg:text-lg">
            أكبر شبكة ذكاء هندسي متخصصة في الهندسة والبرمجة في فلسطين والعالم
            العربي — حيث تلتقي الخبرات، وتُبنى المستقبل.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm text-slate-400 lg:justify-start">
            {["الهندسة", "الابتكار", "البحث", "البرمجة", "الذكاء الاصطناعي"].map(
              (t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#d4af7a]" /> {t}
                </span>
              ),
            )}
          </div>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#join"
              className="glow-gold rounded-xl bg-gradient-to-l from-[#b87333] to-[#d4af7a] px-8 py-3.5 text-center font-bold text-[#0a0a0a] transition hover:brightness-110"
            >
              انضم إلى المنظومة
            </a>
            <a
              href="#projects"
              className="rounded-xl border border-[#35c8ff]/40 bg-[#35c8ff]/5 px-8 py-3.5 text-center font-bold text-[#35c8ff] transition hover:bg-[#35c8ff]/15"
            >
              استكشف المشاريع
            </a>
          </div>
        </div>

        {/* Right: ECU chip + network */}
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          {/* network dots */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <g stroke="rgba(53,200,255,0.35)" strokeWidth="0.2">
              {NODES.map((n, i) =>
                NODES.slice(i + 1).map((m, j) => {
                  const d = Math.hypot(n.x - m.x, n.y - m.y);
                  if (d > 32) return null;
                  return (
                    <line
                      key={`${i}-${j}`}
                      x1={n.x}
                      y1={n.y}
                      x2={m.x}
                      y2={m.y}
                      className="animate-dash"
                    />
                  );
                }),
              )}
            </g>
            {NODES.map((n, i) => (
              <circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={mounted ? 1.1 : 0}
                fill="#35c8ff"
                style={{
                  filter: "drop-shadow(0 0 3px #35c8ff)",
                  opacity: 0.5 + (i % 3) * 0.2,
                }}
              />
            ))}
            {/* electronic paths radiating from the core to each branch */}
            <g stroke="#35c8ff" strokeOpacity="0.45" strokeWidth="0.25">
              {BRANCHES.map((b, i) => {
                const rad = (b.angle * Math.PI) / 180;
                const R = 44;
                return (
                  <line
                    key={`t-${i}`}
                    x1={50}
                    y1={50}
                    x2={50 + Math.cos(rad) * R}
                    y2={50 + Math.sin(rad) * R}
                    className="trace"
                  />
                );
              })}
            </g>
          </svg>

          {/* rotating rings */}
          <div className="animate-spin-slow absolute inset-6 rounded-full border border-[#d4af7a]/15" />
          <div className="animate-spin-rev absolute inset-14 rounded-full border border-dashed border-[#35c8ff]/20" />

          {/* branches */}
          {BRANCHES.map((b) => {
            const rad = (b.angle * Math.PI) / 180;
            const R = 44;
            const cx = 50 + Math.cos(rad) * R;
            const cy = 50 + Math.sin(rad) * R;
            return (
              <div
                key={b.en}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: `${cx}%`, top: `${cy}%` }}
              >
                <div className="glass flex h-11 w-11 items-center justify-center rounded-xl text-lg glow-blue">
                  {b.icon}
                </div>
                <span className="mt-1 whitespace-nowrap text-[10px] text-slate-400">
                  {b.label}
                </span>
              </div>
            );
          })}

          {/* central ECU chip */}
          <div className="animate-float absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <div className="glow-blue relative h-full w-full rounded-2xl border border-[#35c8ff]/40 bg-gradient-to-br from-[#0d1420] to-[#060a10] p-3">
              {/* pins */}
              {[...Array(8)].map((_, i) => (
                <span
                  key={`t${i}`}
                  className="absolute top-0 h-1.5 w-1 -translate-y-full rounded-t bg-[#d4af7a]/70"
                  style={{ left: `${12 + i * 10}%` }}
                />
              ))}
              {[...Array(8)].map((_, i) => (
                <span
                  key={`b${i}`}
                  className="absolute bottom-0 h-1.5 w-1 translate-y-full rounded-b bg-[#d4af7a]/70"
                  style={{ left: `${12 + i * 10}%` }}
                />
              ))}
              {[...Array(8)].map((_, i) => (
                <span
                  key={`l${i}`}
                  className="absolute left-0 h-1 w-1.5 -translate-x-full rounded-l bg-[#d4af7a]/70"
                  style={{ top: `${12 + i * 10}%` }}
                />
              ))}
              {[...Array(8)].map((_, i) => (
                <span
                  key={`r${i}`}
                  className="absolute right-0 h-1 w-1.5 translate-x-full rounded-r bg-[#d4af7a]/70"
                  style={{ top: `${12 + i * 10}%` }}
                />
              ))}
              {/* inner die */}
              <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-[#d4af7a]/30 bg-[#070c14]">
                <span className="text-2xl">🧩</span>
                <span className="mt-1 text-[10px] font-bold tracking-wide text-[#35c8ff]">
                  SOFT HARD CORE
                </span>
                <span className="mt-0.5 text-[8px] text-[#d4af7a]">
                  PALESTINE HUB
                </span>
                <div className="mt-1.5 flex gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <span
                      key={i}
                      className="h-1 w-1 animate-pulse rounded-full bg-[#35c8ff]"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-slate-600 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-[#d4af7a]" />
        </div>
      </div>
    </section>
  );
}
