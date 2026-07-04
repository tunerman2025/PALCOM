import { db } from "@/db";
import { applications } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, city, field, level, message } = body ?? {};
    if (!name || !email || !city || !field || !level) {
      return Response.json(
        { ok: false, error: "الحقول المطلوبة ناقصة" },
        { status: 400 },
      );
    }
    const [row] = await db
      .insert(applications)
      .values({
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 160),
        city: String(city).slice(0, 64),
        field: String(field).slice(0, 96),
        level: String(level).slice(0, 48),
        message: message ? String(message).slice(0, 1000) : null,
      })
      .returning();
    return Response.json({ ok: true, data: row });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
