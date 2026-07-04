import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

// قاعدة بيانات أكواد الأعطال DTC
export const dtcCodes = pgTable("dtc_codes", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 24 }).notNull(),
  title: text("title").notNull(),
  category: varchar("category", { length: 48 }).notNull().default("المركبات"), // المركبات / الأجهزة المنزلية / الحواسيب / الشبكات / الهواتف الذكية / الإلكترونيات العامة
  system: varchar("system", { length: 64 }).notNull(),
  manufacturer: varchar("manufacturer", { length: 64 }).notNull(),
  unit: varchar("unit", { length: 40 }).notNull(),
  yearFrom: integer("year_from"),
  yearTo: integer("year_to"),
  severity: varchar("severity", { length: 16 }).notNull(), // low / medium / high
  causes: text("causes").notNull(),
  solution: text("solution").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// المشاريع والأبحاث
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  summary: text("summary").notNull(),
  status: varchar("status", { length: 32 }).notNull(), // active / research / released
  city: varchar("city", { length: 64 }),
  tags: jsonb("tags").$type<string[]>().default([]).notNull(),
  progress: integer("progress").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// طلبات الانضمام للمنظومة
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  city: varchar("city", { length: 64 }).notNull(),
  field: varchar("field", { length: 96 }).notNull(),
  level: varchar("level", { length: 48 }).notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
