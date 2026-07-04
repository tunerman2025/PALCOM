import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn(
    "⚠️  DATABASE_URL is not set — database-backed features are disabled until it is provided.",
  );
}

const globalForDb = globalThis as typeof globalThis & {
  __palcomPool?: Pool;
};

export const pool =
  globalForDb.__palcomPool ?? new Pool({ connectionString: databaseUrl });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__palcomPool = pool;
}

export const db = drizzle(pool);
