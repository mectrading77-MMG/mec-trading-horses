-- Initial MEC HORSES database schema.
-- All identifiers are created without database-side defaults because Prisma
-- generates cuid identifiers in the application.

CREATE TYPE "HorseStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'SOLD');
CREATE TYPE "HorseSex" AS ENUM ('MARE', 'STALLION', 'GELDING');
CREATE TYPE "InquiryStatus" AS ENUM (
  'NEW', 'CONTACTED', 'QUALIFIED', 'HORSES_SENT', 'NEGOTIATION',
  'VIEWING_SCHEDULED', 'WON', 'LOST', 'SOLD', 'CLOSED'
);
CREATE TYPE "AdminRole" AS ENUM ('OWNER', 'EDITOR');
CREATE TYPE "MediaType" AS ENUM ('PHOTO', 'VIDEO_GENERAL', 'VIDEO_COMPETITION', 'VIDEO_TRAINING');
CREATE TYPE "DocumentType" AS ENUM (
  'VETERINARY_EXAM', 'XRAY', 'VACCINATION', 'PASSPORT',
  'REGISTRATION', 'COMPETITION_RECORD', 'PEDIGREE_DOCUMENT'
);

CREATE TABLE "Horse" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "breed" TEXT NOT NULL,
  "sex" "HorseSex" NOT NULL,
  "dateOfBirth" TIMESTAMP(3) NOT NULL,
  "heightCm" INTEGER,
  "color" TEXT NOT NULL,
  "jumpHeightCm" INTEGER NOT NULL DEFAULT 130,
  "maxHeightJumpedCm" INTEGER,
  "competitionLevel" TEXT,
  "registrationNo" TEXT,
  "passportNo" TEXT,
  "priceAmount" INTEGER,
  "priceCurrency" TEXT NOT NULL DEFAULT 'EUR',
  "priceOnRequest" BOOLEAN NOT NULL DEFAULT false,
  "status" "HorseStatus" NOT NULL DEFAULT 'AVAILABLE',
  "locationLabel" TEXT NOT NULL,
  "featuredOnHome" BOOLEAN NOT NULL DEFAULT false,
  "featuredStory" BOOLEAN NOT NULL DEFAULT false,
  "documentsPublic" BOOLEAN NOT NULL DEFAULT false,
  "trustVetDocs" BOOLEAN NOT NULL DEFAULT false,
  "trustXrays" BOOLEAN NOT NULL DEFAULT false,
  "trustPedigreeDocs" BOOLEAN NOT NULL DEFAULT false,
  "trustTransport" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Horse_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Horse_slug_key" ON "Horse"("slug");

CREATE TABLE "HorseTranslation" (
  "id" TEXT NOT NULL,
  "horseId" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "positioning" TEXT NOT NULL,
  "personality" TEXT,
  "training" TEXT,
  "strengths" TEXT,
  "experience" TEXT,
  "suitability" TEXT,
  "potential" TEXT,
  "idealRider" TEXT,
  CONSTRAINT "HorseTranslation_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "HorseTranslation_horseId_locale_key" ON "HorseTranslation"("horseId", "locale");
ALTER TABLE "HorseTranslation" ADD CONSTRAINT "HorseTranslation_horseId_fkey"
  FOREIGN KEY ("horseId") REFERENCES "Horse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "PedigreeEntry" (
  "id" TEXT NOT NULL,
  "horseId" TEXT NOT NULL,
  "position" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "breed" TEXT,
  "photoUrl" TEXT,
  "competitionNote" TEXT,
  CONSTRAINT "PedigreeEntry_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "PedigreeEntry" ADD CONSTRAINT "PedigreeEntry_horseId_fkey"
  FOREIGN KEY ("horseId") REFERENCES "Horse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "CompetitionResult" (
  "id" TEXT NOT NULL,
  "horseId" TEXT NOT NULL,
  "competition" TEXT NOT NULL,
  "year" INTEGER NOT NULL,
  "level" TEXT NOT NULL,
  "result" TEXT NOT NULL,
  "rider" TEXT,
  "location" TEXT,
  CONSTRAINT "CompetitionResult_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "CompetitionResult" ADD CONSTRAINT "CompetitionResult_horseId_fkey"
  FOREIGN KEY ("horseId") REFERENCES "Horse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "Media" (
  "id" TEXT NOT NULL,
  "horseId" TEXT NOT NULL,
  "type" "MediaType" NOT NULL,
  "url" TEXT NOT NULL,
  "alt" TEXT,
  "isCover" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "Media" ADD CONSTRAINT "Media_horseId_fkey"
  FOREIGN KEY ("horseId") REFERENCES "Horse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "Document" (
  "id" TEXT NOT NULL,
  "horseId" TEXT NOT NULL,
  "type" "DocumentType" NOT NULL,
  "url" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "downloadable" BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "Document" ADD CONSTRAINT "Document_horseId_fkey"
  FOREIGN KEY ("horseId") REFERENCES "Horse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "SeoEntry" (
  "id" TEXT NOT NULL,
  "horseId" TEXT NOT NULL,
  "titleEn" TEXT NOT NULL,
  "titleFr" TEXT NOT NULL,
  "titleAr" TEXT NOT NULL,
  "descriptionEn" TEXT NOT NULL,
  "descriptionFr" TEXT NOT NULL,
  "descriptionAr" TEXT NOT NULL,
  "canonicalUrl" TEXT NOT NULL,
  "ogImageUrl" TEXT,
  CONSTRAINT "SeoEntry_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "SeoEntry_horseId_key" ON "SeoEntry"("horseId");
ALTER TABLE "SeoEntry" ADD CONSTRAINT "SeoEntry_horseId_fkey"
  FOREIGN KEY ("horseId") REFERENCES "Horse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "Inquiry" (
  "id" TEXT NOT NULL,
  "horseId" TEXT,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "country" TEXT,
  "message" TEXT NOT NULL,
  "service" TEXT NOT NULL DEFAULT 'general',
  "locale" TEXT NOT NULL DEFAULT 'en',
  "source" TEXT NOT NULL DEFAULT 'website',
  "preferredContact" TEXT NOT NULL DEFAULT 'email',
  "lookingFor" TEXT,
  "hasTrainer" BOOLEAN,
  "viewingDate" TIMESTAMP(3),
  "notes" TEXT,
  "nextAction" TIMESTAMP(3),
  "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "Inquiry_status_createdAt_idx" ON "Inquiry"("status", "createdAt");
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_horseId_fkey"
  FOREIGN KEY ("horseId") REFERENCES "Horse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "CustomerUser" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "phone" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CustomerUser_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "CustomerUser_email_key" ON "CustomerUser"("email");

CREATE TABLE "AdminUser" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" "AdminRole" NOT NULL DEFAULT 'EDITOR',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

CREATE TABLE "WebsiteSettings" (
  "id" TEXT NOT NULL DEFAULT 'main',
  "whatsappNumber" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "instagramUrl" TEXT,
  "facebookUrl" TEXT,
  "youtubeUrl" TEXT,
  "tiktokUrl" TEXT,
  "aboutEn" TEXT NOT NULL,
  "aboutFr" TEXT NOT NULL,
  "aboutAr" TEXT NOT NULL,
  CONSTRAINT "WebsiteSettings_pkey" PRIMARY KEY ("id")
);
