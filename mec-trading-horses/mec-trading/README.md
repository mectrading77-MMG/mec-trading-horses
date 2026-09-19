# MEC Trading — Horse Sales Platform

A premium, single-seller international horse sales site: luxury editorial front end,
multilingual content (English / French / Arabic with full RTL), and an admin
dashboard for managing horses, media, pedigree, and buyer inquiries.

This is a **working prototype**: the front end runs end-to-end today against
sample data in `src/lib/sample-data.ts`. The database schema, seed script, and
API routes are in place so a real backend is a data-wiring exercise, not a
rebuild — see "Going live" below.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** — charcoal / ivory / sand / champagne-gold / hunter-green palette
- **Prisma** — schema in `prisma/schema.prisma` (Postgres)
- **Fraunces** (display serif) / **Inter** (body) / **IBM Plex Mono** (data, registry numbers)

## Getting started

```bash
npm install
cp .env.example .env      # fill in DATABASE_URL, AUTH_SECRET, etc.
npm run dev
```

Visit `http://localhost:3000` — you'll be redirected to `/en`, `/fr`, or `/ar`
based on browser language. The admin area is at `/en/admin/login`
(default credentials: `admin@mectrading.com` / `changeme` — **change these**
via `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` before deploying anywhere real).

## Project structure

```
src/
  app/
    [locale]/
      (site)/            public pages — home, horses-for-sale, about, services, news, contact
      admin/
        login/            public login screen
        (protected)/       everything requiring a session: dashboard, horses, inquiries
    api/                  route handlers (inquiries, admin auth, admin horse creation)
  components/            Header, Footer, HorseCard, PedigreeTree, MediaTabs, ContactForm, ...
  i18n/                   locale config + en/fr/ar dictionaries
  lib/
    sample-data.ts        prototype data — swap for Prisma queries
    horses.ts             the ONE seam between UI and data source
    auth.ts                session cookies (JWT via `jose`)
    whatsapp.ts             wa.me deep-link builder
  types/horse.ts          shared domain types
prisma/
  schema.prisma            full data model
  seed.ts                   loads sample-data.ts into a real database
```

## Design notes

- **One seller, no marketplace mechanics.** There is deliberately no seller
  registration, seller dashboard, or commission logic anywhere in the codebase.
- **Every horse text field is per-locale**, not machine-translated — see
  `HorseTranslation` in the schema and `translations` in the sample data.
  Admins write English, French, and Arabic content independently.
- **Pedigree** is modelled as a flat list of `{ position, name, ... }` entries
  (`"sire"`, `"dam.sire"`, `"sire.sire.dam"`, ...) rather than fixed columns,
  so `PedigreeTree.tsx` can render any number of generations and expand on demand.
- **Trust badges** (vet docs, X-rays, pedigree docs, transport) are booleans
  the admin controls per horse — nothing is shown unless explicitly enabled.
- **RTL** is handled at the `<html dir>` level per locale, not just mirrored CSS.

## Going live: what's stubbed vs. real

| Area | Status |
|---|---|
| Public pages, catalog filtering, horse detail | Real, works today against sample data |
| i18n (en/fr/ar incl. RTL) | Real |
| Admin login / session cookie | Real (JWT), but checks a single env-var account — see below |
| Add-horse form | Real UI, `POST /api/admin/horses` currently only logs the payload |
| Inquiry form | Real UI, `POST /api/inquiries` currently only logs the payload |
| Database | Schema + seed script ready; nothing reads/writes it yet |
| File uploads (photos/videos/documents) | Form inputs exist; no storage wired up |

To connect the real backend:

1. `npm run db:push` against a Postgres database (Supabase, Neon, Railway, or
   self-hosted all work fine).
2. `npm run db:seed` to load the sample horses (or your real ones) using the
   same shape.
3. In `src/lib/horses.ts`, replace each function body with the equivalent
   `db.horse.findMany(...)` / `findUnique(...)` call — no page or component
   needs to change, since they only import from this file.
4. In `src/lib/auth.ts`, replace `verifyCredentials` with a real
   `db.adminUser.findUnique` + `bcrypt.compare` check (the TODO comment shows
   exactly what to swap in), and create real `AdminUser` rows instead of the
   single env-var account.
5. Wire `/api/inquiries` and `/api/admin/horses` to `db.inquiry.create` /
   `db.horse.create` (both TODOs are marked inline).
6. Add an S3-compatible bucket (AWS S3, Cloudflare R2, Supabase Storage) for
   photo/video/document uploads; the `.env.example` has placeholders for this.

## Production checklist (not yet done)

- [ ] Real admin accounts with hashed passwords per user, not one shared login
- [ ] Rate limiting on `/api/inquiries` (public, unauthenticated)
- [ ] Image upload → storage bucket → CDN, with responsive `next/image` remote patterns
- [ ] Email/WhatsApp notification when a new inquiry arrives
- [ ] Replace the `console.log` TODOs with real Prisma writes
- [ ] Structured data review (Organization + Breadcrumb JSON-LD in addition to
      the per-horse Product schema already in `horse-detail/page.tsx`)
