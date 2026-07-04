export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050608] py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d4af7a]/40 bg-[#0d1420] text-lg">
                🧩
              </span>
            <span className="text-sm font-bold leading-tight">
              Palcom <br />
              <span className="text-[10px] font-normal text-[#d4af7a]">
                palcom.online · شبكة الهندسة والبرمجة
              </span>
            </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              منظومة رقمية هندسية متكاملة تهدف لأن تكون المرجع الأول في الهندسة
              والبرمجة لكل الأنظمة الإلكترونية في فلسطين والعالم العربي.
            </p>
          </div>

          <div>
            <div className="mb-3 text-sm font-bold text-slate-300">المنظومة</div>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#domains" className="hover:text-[#d4af7a]">المجالات الهندسية</a></li>
              <li><a href="#labs" className="hover:text-[#d4af7a]">المختبرات</a></li>
              <li><a href="#projects" className="hover:text-[#d4af7a]">المشاريع</a></li>
              <li><a href="#dtc" className="hover:text-[#d4af7a]">قاعدة DTC</a></li>
            </ul>
          </div>

          <div>
            <div className="mb-3 text-sm font-bold text-slate-300">المجتمع</div>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#join" className="hover:text-[#d4af7a]">انضم إلينا</a></li>
              <li><a href="#map" className="hover:text-[#d4af7a]">شبكة المدن</a></li>
              <li><span>مكتبة الأبحاث</span></li>
              <li><span>منتدى المهندسين</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-600 sm:flex-row">
          <span>© {new Date().getFullYear()} Palcom · palcom.online — صُنع بأيادٍ فلسطينية 🇵🇸</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            الأنظمة تعمل • System Online
          </span>
        </div>
      </div>
    </footer>
  );
}
