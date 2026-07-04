# منظومة فلسطين للمهندسين — Palestine Automotive Engineering Hub

منصة هندسية متكاملة (Digital Command Center) متخصصة في هندسة وبرمجة المركبات، مبنية بـ **Next.js (App Router) + Drizzle ORM + PostgreSQL**.

## التقنيات
- **Next.js 16** (App Router, standalone output)
- **Drizzle ORM** + **PostgreSQL**
- **Tailwind CSS v4**
- خط **Cairo** عربي RTL

## متطلبات التشغيل محليًا
```bash
npm install
cp .env.example .env   # اضبط DATABASE_URL
node scripts/init-db.mjs   # ينشئ الجداول ويُدخل بيانات المرجعية (التطبيق الأول فقط)
npm run dev
```

---

## النشر على نطاقك (Deployment)

### الخيار الأول — Vercel (الأسهل والأسرع لـ Next.js)

1. ادفع الكود إلى مستودع GitHub.
2. في [vercel.com](https://vercel.com) → **Add New → Project** → اختر المستودع → **Deploy**.
3. **قاعدة البيانات:** أنشئ PostgreSQL (مثلاً Neon / Supabase / Vercel Postgres)، ثم أضف متغيّر البيئة `DATABASE_URL` في
   **Project Settings → Environment Variables**.
4. **تجهيز القاعدة** (أمر واحد ينشئ الجداول ويُدخل بيانات المرجعية):
   ```bash
   node scripts/init-db.mjs
   ```
5. **ربط النطاق:** **Project → Settings → Domains** → أدخل نطاقك.
   - أضف في لوحة مزوّد النطاق سجل `A` إلى `76.76.21.21`، أو سجل `CNAME` إلى `cname.vercel-dns.com`.
   - يُفعّل HTTPS تلقائيًا.

### الخيار الثاني — خادم خاص (VPS) عبر Docker (نطاق كامل + قاعدة بياناتك)

المشروع يحتوي كل ما يلزم: `Dockerfile` + `docker-compose.yml` (يربط التطبيق بقاعدة PostgreSQL).

```bash
# 1) ابدأ التطبيق وقاعدة البيانات (سينفّذ push + seed تلقائيًا عند أول تشغيل)
docker compose up -d --build

# 2) افتح: http://localhost:3000
```

- غيّر كلمة المرور `change_this_strong_password` في `docker-compose.yml` قبل النشر.
- بعد نجاح التشغيل، اربط نطاقك بعنوان IP الخادم عبر سجل `A`، وأضف وكيل عكسي (مثلاً Nginx/Caddy) مع شهادة SSL.
- لإعادة تهيئة القاعدة يدويًا: `docker compose exec app node scripts/init-db.mjs`

---

## متغيّرات البيئة
| المتغير | الوصف |
|---|---|
| `DATABASE_URL` | رابط اتصال PostgreSQL، مطلوب لتشغيل التطبيق والـ API |

## بنية المجلدات
```
src/
  app/            # الصفحات ومسارات الـ API (/api/dtc, /api/apply, /api/health)
  components/     # أقسام الواجهة (Hero, Domains, Labs, HydrogenHub, ...)
  db/             # اتصال Drizzle + مخطط الجداول (schema)
scripts/seed.mjs  # تهيئة الجداول وإدخال بيانات المرجعية
seed.sql          # بيانات البذرة (DTC + المشاريع)
```
