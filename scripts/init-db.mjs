// Self-contained production initializer — no external CLI needed.
// 1) Creates tables if missing, 2) seeds reference data only when empty.
// Used at container start (VPS/Docker) and as a one-shot on Vercel.
// Usage: DATABASE_URL=... node scripts/init-db.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Client } from "pg";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const url = process.env.DATABASE_URL;

if (!url) {
  console.error("✗ DATABASE_URL is required");
  process.exit(1);
}

const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS dtc_codes (
  id serial PRIMARY KEY,
  code varchar(16) NOT NULL,
  title text NOT NULL,
  system varchar(64) NOT NULL,
  manufacturer varchar(64) NOT NULL,
  unit varchar(32) NOT NULL,
  year_from integer,
  year_to integer,
  severity varchar(16) NOT NULL,
  causes text NOT NULL,
  solution text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id serial PRIMARY KEY,
  title text NOT NULL,
  category varchar(64) NOT NULL,
  summary text NOT NULL,
  status varchar(32) NOT NULL,
  city varchar(64),
  tags jsonb NOT NULL DEFAULT '[]',
  progress integer NOT NULL DEFAULT 0,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS applications (
  id serial PRIMARY KEY,
  name text NOT NULL,
  email varchar(160) NOT NULL,
  city varchar(64) NOT NULL,
  field varchar(96) NOT NULL,
  level varchar(48) NOT NULL,
  message text,
  created_at timestamp NOT NULL DEFAULT now()
);
`;

const client = new Client({ connectionString: url });

try {
  await client.connect();
  console.log("→ Ensuring schema…");
  await client.query(CREATE_TABLES);

  const { rows } = await client.query("SELECT count(*)::int AS c FROM dtc_codes");
  if (rows[0].c === 0) {
    // strip TRUNCATE so a restart never wipes data
    const seedSql = readFileSync(join(root, "seed.sql"), "utf8").replace(
      /^\s*TRUNCATE[^;]+;\s*$/gim,
      "",
    );
    await client.query(seedSql);
    console.log("✓ Tables created and reference data seeded.");
  } else {
    console.log("✓ Schema present and already seeded — skipping.");
  }
} catch (e) {
  console.error("✗ Init failed:", e);
  process.exit(1);
} finally {
  await client.end();
}
