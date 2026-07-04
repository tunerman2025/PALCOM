import { db } from "@/db";
import { projects as projectsTable } from "@/db/schema";
import { desc } from "drizzle-orm";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  active: { label: "قيد التطوير", color: "text-[#35c8ff] border-[#35c8ff]/30 bg-[#35c8ff]/5" },
  research: { label: "بحث", color: "text-[#d4af7a] border-[#d4af7a]/30 bg-[#d4af7a]/5" },
  released: { label: "منشور", color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5" },
};

async function getProjects() {
  try {
    return await db
      .select()
      .from(projectsTable)
      .orderBy(desc(projectsTable.createdAt))
      .limit(6);
  } catch {
    return [];
  }
}

export default async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <span className="text-sm font-bold tracking-widest text-[#35c8ff]">
            PROJECTS & RESEARCH
          </span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            المشاريع <span className="gold-text">والإنجازات</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            منتجات وأبحاث هندسية بمعايير عالمية، صنعت بأيادٍ فلسطينية.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center text-slate-500">
            جارٍ إعداد قاعدة المشاريع…
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => {
              const s = STATUS_MAP[p.status] ?? STATUS_MAP.active;
              return (
                <div
                  key={p.id}
                  className="glass card-3d group flex flex-col overflow-hidden rounded-2xl"
                >
                  <div className="relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d1420] to-[#060a10]">
                    <div className="absolute inset-0 grid-bg opacity-40" />
                    <span className="relative text-5xl opacity-70 transition group-hover:scale-110">
                      {p.category.includes("AI")
                        ? "🧠"
                        : p.category.includes("EV")
                          ? "🔋"
                          : p.category.includes("ECU")
                            ? "🧩"
                            : "🛠️"}
                    </span>
                    <span
                      className={`absolute right-3 top-3 rounded-md border px-2 py-0.5 text-[11px] ${s.color}`}
                    >
                      {s.label}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="text-xs text-[#d4af7a]">{p.category}</div>
                    <h3 className="mt-1 text-lg font-black text-slate-100">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                      {p.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4">
                      <div className="mb-1 flex justify-between text-[11px] text-slate-500">
                        <span>{p.city ?? "فلسطين"}</span>
                        <span>{p.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-l from-[#b87333] to-[#35c8ff]"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
