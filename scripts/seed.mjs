// Production-safe setup: applies schema and seeds reference data.
// Usage: DATABASE_URL=... node scripts/seed.mjs
// Seeds only reference tables (dtc_codes, projects) — never touches users/applications.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Client } from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = process.env.DATABASE_URL;

if (!url) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const sql = readFileSync(join(__dirname, "..", "seed.sql"), "utf8");
const client = new Client({ connectionString: url });

try {
  await client.connect();
  console.log("Applying schema + seeding reference data…");
  await client.query(sql);
  console.log("✓ Database ready.");
} catch (e) {
  console.error("Seed failed:", e);
  process.exit(1);
} finally {
  await client.end();
}
