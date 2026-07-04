import { db } from "@/db";
import { dtcCodes } from "@/db/schema";
import { and, or, ilike, eq, sql, lte, gte } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const category = searchParams.get("category")?.trim() ?? "";
  const manufacturer = searchParams.get("manufacturer")?.trim() ?? "";
  const unit = searchParams.get("unit")?.trim() ?? "";
  const year = searchParams.get("year")?.trim() ?? "";

  const conditions = [];
  if (q) {
    conditions.push(
      or(ilike(dtcCodes.code, `%${q}%`), ilike(dtcCodes.title, `%${q}%`)),
    );
  }
  if (category && category !== "all") {
    conditions.push(eq(dtcCodes.category, category));
  }
  if (manufacturer && manufacturer !== "all") {
    conditions.push(eq(dtcCodes.manufacturer, manufacturer));
  }
  if (unit && unit !== "all") {
    conditions.push(eq(dtcCodes.unit, unit));
  }
  if (year) {
    const y = parseInt(year, 10);
    if (!Number.isNaN(y)) {
      conditions.push(
        and(
          or(lte(dtcCodes.yearFrom, y), sql`${dtcCodes.yearFrom} is null`),
          or(gte(dtcCodes.yearTo, y), sql`${dtcCodes.yearTo} is null`),
        ),
      );
    }
  }

  try {
    const rows = await db
      .select()
      .from(dtcCodes)
      .where(conditions.length ? and(...conditions) : undefined)
      .limit(60);
    return Response.json({ ok: true, data: rows });
  } catch (e) {
    return Response.json({ ok: false, data: [], error: String(e) }, { status: 500 });
  }
}
