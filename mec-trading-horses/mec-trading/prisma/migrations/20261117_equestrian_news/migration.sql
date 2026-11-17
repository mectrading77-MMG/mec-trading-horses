CREATE TYPE "NewsRegion" AS ENUM ('EGYPT', 'GULF', 'EUROPE', 'INTERNATIONAL');
CREATE TYPE "NewsCategory" AS ENUM ('COMPETITION', 'RESULT', 'FEDERATION', 'MARKET', 'WELFARE');

CREATE TABLE "NewsArticle" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "sourceUrl" TEXT NOT NULL,
  "sourceName" TEXT NOT NULL,
  "region" "NewsRegion" NOT NULL,
  "category" "NewsCategory" NOT NULL,
  "publishedAt" TIMESTAMP(3) NOT NULL,
  "titleEn" TEXT NOT NULL,
  "summaryEn" TEXT NOT NULL,
  "titleFr" TEXT NOT NULL,
  "summaryFr" TEXT NOT NULL,
  "titleAr" TEXT NOT NULL,
  "summaryAr" TEXT NOT NULL,
  "titleDe" TEXT NOT NULL,
  "summaryDe" TEXT NOT NULL,
  "titleNl" TEXT NOT NULL,
  "summaryNl" TEXT NOT NULL,
  "imageUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "NewsArticle_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CompetitionEvent" (
  "id" TEXT NOT NULL,
  "sourceUrl" TEXT NOT NULL,
  "sourceName" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "discipline" TEXT NOT NULL DEFAULT 'Show jumping',
  "region" "NewsRegion" NOT NULL,
  "city" TEXT,
  "country" TEXT NOT NULL,
  "startsAt" TIMESTAMP(3) NOT NULL,
  "endsAt" TIMESTAMP(3),
  "heightLevels" TEXT,
  "eventLevel" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CompetitionEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "NewsArticle_slug_key" ON "NewsArticle"("slug");
CREATE UNIQUE INDEX "NewsArticle_sourceUrl_key" ON "NewsArticle"("sourceUrl");
CREATE INDEX "NewsArticle_publishedAt_idx" ON "NewsArticle"("publishedAt");
CREATE INDEX "NewsArticle_region_publishedAt_idx" ON "NewsArticle"("region", "publishedAt");
CREATE INDEX "NewsArticle_category_publishedAt_idx" ON "NewsArticle"("category", "publishedAt");
CREATE UNIQUE INDEX "CompetitionEvent_sourceUrl_key" ON "CompetitionEvent"("sourceUrl");
CREATE INDEX "CompetitionEvent_startsAt_idx" ON "CompetitionEvent"("startsAt");
CREATE INDEX "CompetitionEvent_region_startsAt_idx" ON "CompetitionEvent"("region", "startsAt");
