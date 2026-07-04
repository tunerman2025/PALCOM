"use client";

import { useState } from "react";

// approximate positions on a 200x360 canvas
const CITIES = [
  { id: "jerusalem", name: "القدس", x: 92, y: 168, teams: 12, fields: ["ECU", "AI", "ADAS"] },
  { id: "ramallah", name: "رام الله", x: 96, y: 150, teams: 9, fields: ["برمجة", "EV"] },
  { id: "nablus", name: "نابلس", x: 104, y: 118, teams: 7, fields: ["محركات", "DPF"] },
  { id: "jenin", name: "جنين", x: 108, y: 88, teams: 5, fields: ["OBD", "Reverse"] },
  { id: "tulkarm", name: "طولكرم", x: 80, y: 104, teams: 4, fields: ["CAN", "TCU"] },
  { id: "hebron", name: "الخليل", x: 90, y: 214, teams: 8, fields: ["Hybrid", "EV"] },
  { id: "bethlehem", name: "بيت لحم", x: 92, y: 190, teams: 6, fields: ["AI", "Research"] },
  { id: "gaza", name: "غزة", x: 34, y: 214, teams: 10, fields: ["EV", "برمجة", "AI"] },
  { id: "jericho", name: "أريحا", x: 120, y: 168, teams: 3, fields: ["Solar", "EV"] },
  { id: "haifa", name: "حيفا", x: 74, y: 44, teams: 6, fields: ["ADAS", "Cyber"] },
];

export default function PalestineMap() {
  const [active, setActive] = useState<(typeof CITIES)[number] | null>(
    CITIES[0],
  );

  return (
    <section id="map" className="relative border-y border-white/5 bg-[#07090d] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <span className="text-sm font-bold tracking-widest text-[#35c8ff]">
            THE NETWORK
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            فلسطين <span className="gold-text">مركز الابتكار</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            لوحة إلكترونية حية — كل مدينة نقطة مضيئة تنبض بفرق هندسية. اضغط على أي
            مدينة.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* map */}
          <div className="relative mx-auto w-full max-w-sm">
            <svg viewBox="0 0 200 360" className="h-auto w-full">
              <defs>
                <linearGradient id="pcb" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#0d1a14" />
                  <stop offset="1" stopColor="#06100b" />
                </linearGradient>
              </defs>
              {/* Palestine silhouette (approx) */}
              <path
                d="M78,30 L96,34 L108,52 L100,72 L112,92 L118,120 L128,150 L126,178 L134,196 L120,236 L102,252 L96,300 L80,336 L70,300 L58,250 L34,236 L26,206 L44,200 L58,176 L66,150 L60,120 L70,96 L64,64 Z"
                fill="url(#pcb)"
                stroke="#35c8ff"
                strokeWidth="1"
                className="trace"
                strokeOpacity="0.6"
              />
              {/* connective traces */}
              {CITIES.map((c, i) =>
                CITIES.slice(i + 1).map((d, j) => {
                  const dist = Math.hypot(c.x - d.x, c.y - d.y);
                  if (dist > 70) return null;
                  return (
                    <line
                      key={`${i}-${j}`}
                      x1={c.x}
                      y1={c.y}
                      x2={d.x}
                      y2={d.y}
                      stroke="#d4af7a"
                      strokeOpacity="0.18"
                      strokeWidth="0.5"
                    />
                  );
                }),
              )}
              {CITIES.map((c) => {
                const isActive = active?.id === c.id;
                return (
                  <g
                    key={c.id}
                    className="cursor-pointer"
                    onClick={() => setActive(c)}
                  >
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={isActive ? 9 : 6}
                      fill={isActive ? "#35c8ff" : "#d4af7a"}
                      opacity="0.15"
                    />
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={isActive ? 3.4 : 2.4}
                      fill={isActive ? "#35c8ff" : "#d4af7a"}
                      style={{
                        filter: `drop-shadow(0 0 4px ${
                          isActive ? "#35c8ff" : "#d4af7a"
                        })`,
                      }}
                    />
                    <text
                      x={c.x + 6}
                      y={c.y + 2}
                      fontSize="6"
                      fill={isActive ? "#35c8ff" : "#9aa4b2"}
                    >
                      {c.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* detail panel */}
          <div className="glass rounded-2xl p-8">
            {active && (
              <>
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#35c8ff]/30 bg-[#35c8ff]/10 text-2xl">
                    📍
                  </span>
                  <div>
                    <h3 className="text-2xl font-black gold-text">
                      {active.name}
                    </h3>
                    <div className="text-xs text-slate-400">
                      عقدة هندسية نشطة
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
                    <div className="text-3xl font-black text-[#35c8ff]">
                      {active.teams}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">فريق هندسي</div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
                    <div className="text-3xl font-black text-[#d4af7a]">
                      {active.fields.length}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">تخصص نشط</div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 text-sm text-slate-300">
                    التخصصات المتوفرة:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.fields.map((f) => (
                      <span
                        key={f}
                        className="rounded-lg border border-[#d4af7a]/25 bg-[#d4af7a]/5 px-3 py-1 text-sm text-[#d4af7a]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
