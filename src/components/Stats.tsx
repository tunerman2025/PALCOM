"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 50, suffix: "+", label: "خبيرًا هندسيًا", icon: "👨‍🔬" },
  { value: 100, suffix: "+", label: "مشروعًا وبحثًا", icon: "🚀" },
  { value: 20, suffix: "+", label: "مجالًا هندسيًا", icon: "⚡" },
  { value: 1000, suffix: "+", label: "عضو مستقبلي", icon: "🌐" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const dur = 1500;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="count-up">
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative border-y border-white/5 bg-[#07090d] py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 lg:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="glass card-3d rounded-2xl p-6 text-center"
          >
            <div className="mb-2 text-3xl">{s.icon}</div>
            <div className="text-4xl font-black gold-text lg:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
