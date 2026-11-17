# MEC HORSES Equestrian News automation

The news hub is served from the existing localized `/[locale]/news` page. A Vercel Cron job calls `/api/cron/news` daily at 05:00 UTC.

## One-time Vercel environment configuration

Add these variables to the Vercel project for **Production** and **Preview**:

- `CRON_SECRET`: a long random secret. Vercel Cron sends this as a Bearer token.
- `OPENAI_API_KEY`: API key used to prepare short, source-grounded summaries and translations.
- `NEWS_RSS_FEEDS`: JSON array of curated HTTPS RSS/Atom feeds. Each item must have `name`, `url`, and `region` (`EGYPT`, `GULF`, `EUROPE`, or `INTERNATIONAL`).
- `NEWS_ICS_FEEDS`: JSON array of curated HTTPS iCalendar feeds. Each item must have `name`, `url`, `region`, and `country`; optional `city`.
- `NEWS_AI_MODEL` (optional): defaults to `gpt-4o-mini`.

Example structure (replace the example URLs with feeds confirmed by the relevant federation or event organiser):

```json
[
  { "name": "Official federation", "url": "https://example.org/news.xml", "region": "EUROPE" }
]
```

Calendar feed example:

```json
[
  { "name": "National federation calendar", "url": "https://example.org/calendar.ics", "region": "EUROPE", "country": "France", "city": "Paris" }
]
```

Do not add a source until its ownership, publication rights, and feed URL have been checked. The importer stores short AI-written summaries and links to the original publisher; it does not republish full articles. The editorial filter rejects wanted/buyer requests and individual horse-sale classifieds. The news hub never creates or changes horse listings: those remain managed in the MEC HORSES horse catalogue.

## Database

The Prisma migration is `20261117_equestrian_news`. Apply it with the repository's existing **Apply database migrations** GitHub Actions workflow after reviewing the preview build. It requires the existing `DIRECT_URL` repository secret.

## Important operational note

The cron schedule and ingestion endpoint are code-ready, but daily publishing will remain inactive until the environment variables above are configured and the database migration is applied. The calendar is populated only from configured official iCalendar feeds; no dates or results are fabricated.
