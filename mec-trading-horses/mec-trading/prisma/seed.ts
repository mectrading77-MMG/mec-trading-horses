import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { horses } from "../src/lib/sample-data";

const db = new PrismaClient();

async function main() {
  console.log("Seeding MEC Trading database...");

  await db.websiteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "33600000000",
      phone: "+33 6 00 00 00 00",
      email: "contact@mectrading.com",
      aboutEn: "MEC Trading is a private horse trading house based in Brittany, France.",
      aboutFr: "MEC Trading est une maison de commerce équin privée basée en Bretagne, France.",
      aboutAr: "MEC Trading هي دار تجارة خيول خاصة مقرها في بريتاني، فرنسا."
    }
  });

  const ownerEmail = process.env.ADMIN_EMAIL ?? "admin@mectrading.com";
  const ownerPassword = process.env.ADMIN_PASSWORD ?? "changeme";
  await db.adminUser.upsert({
    where: { email: ownerEmail },
    update: {},
    create: {
      email: ownerEmail,
      passwordHash: await bcrypt.hash(ownerPassword, 10),
      name: "MEC Trading",
      role: "OWNER"
    }
  });

  for (const horse of horses) {
    const created = await db.horse.upsert({
      where: { slug: horse.slug },
      update: {},
      create: {
        slug: horse.slug,
        breed: horse.breed,
        sex: horse.sex,
        dateOfBirth: new Date(horse.dateOfBirth),
        heightCm: horse.heightCm,
        color: horse.color,
        discipline: horse.discipline,
        competitionLevel: horse.competitionLevel,
        registrationNo: horse.registrationNo,
        passportNo: horse.passportNo,
        priceAmount: horse.priceAmount,
        priceCurrency: horse.priceCurrency,
        priceOnRequest: horse.priceOnRequest,
        status: horse.status,
        locationLabel: horse.locationLabel,
        featuredOnHome: horse.featuredOnHome,
        featuredStory: horse.featuredStory,
        trustVetDocs: horse.trust.vetDocs,
        trustXrays: horse.trust.xrays,
        trustPedigreeDocs: horse.trust.pedigreeDocs,
        trustTransport: horse.trust.transport,
        translations: {
          create: Object.values(horse.translations).map((t) => ({
            locale: t.locale,
            name: t.name,
            positioning: t.positioning,
            personality: t.personality,
            training: t.training,
            strengths: t.strengths,
            experience: t.experience,
            suitability: t.suitability,
            potential: t.potential,
            idealRider: t.idealRider
          }))
        },
        media: {
          create: horse.media.map((m, i) => ({
            type: m.type,
            url: m.url,
            alt: m.alt,
            isCover: m.isCover ?? false,
            sortOrder: i
          }))
        },
        documents: {
          create: horse.documents.map((d) => ({
            type: d.type,
            url: d.url,
            label: d.label,
            downloadable: d.downloadable
          }))
        },
        competitionResults: {
          create: horse.competitionResults.map((c) => ({
            competition: c.competition,
            year: c.year,
            level: c.level,
            result: c.result,
            rider: c.rider,
            location: c.location
          }))
        },
        pedigreeEntries: {
          create: horse.pedigree.map((p) => ({
            position: p.position,
            name: p.name,
            breed: p.breed,
            photoUrl: p.photoUrl,
            competitionNote: p.competitionNote
          }))
        }
      }
    });
    console.log(`  seeded ${created.slug}`);
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
