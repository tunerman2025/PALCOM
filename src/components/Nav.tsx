"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#domains", label: "المجالات" },
  { href: "#labs", label: "المختبرات" },
  { href: "#projects", label: "المشاريع" },
  { href: "#dtc", label: "قاعدة DTC" },
  { href: "#map", label: "الخريطة" },
  { href: "#join", label: "انضم" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "glass py-2" : "py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d4af7a]/40 bg-[#0d1420] text-lg glow-blue">
            🧩
          </span>
          <span className="hidden text-sm font-bold leading-tight sm:block">
            Palcom <br />
            <span className="text-[10px] font-normal text-[#d4af7a]">
              palcom.online
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-300 transition hover:text-[#d4af7a]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#join"
          className="hidden rounded-lg border border-[#35c8ff]/40 bg-[#35c8ff]/10 px-5 py-2 text-sm font-bold text-[#35c8ff] transition hover:bg-[#35c8ff]/20 md:block"
        >
          دخول المنظومة
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="text-2xl md:hidden"
          aria-label="menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="glass mt-2 flex flex-col gap-1 px-6 py-4 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-300 hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
