import type { Horse, MediaItem, XrayImage } from "@/types/horse";
import xrayManifest from "../../public/horses/ilico-du-chateau/xrays/manifest.json";

/**
 * DEMO DATA — replace with the owner's own horses before launch.
 *
 * Every horse below is a real show jumper. Identity, studbook, sex, colour,
 * date of birth, pedigree and competition history come from public records
 * (FEI database, Wikipedia, the veterinary study for Ilico du Château).
 * Photographs are Creative Commons images from Wikimedia Commons; the credit
 * on each item is required by the licence and is shown on the horse page.
 *
 * What is NOT real: prices, "available/reserved/sold" status, the Brittany
 * location, and the editorial sales copy — those are placeholders written to
 * demonstrate the template. Ilico du Château's gallery uses stand-in photos
 * of a different chestnut (flagged with `photosAreRepresentative`).
 *
 * Once Prisma + the database are connected, `src/lib/horses.ts` swaps this
 * module for `db.horse.findMany(...)` — the shape is identical.
 */

function photos(slug: string, files: string[], credit: string, alt: string, cover = 0): MediaItem[] {
  return files.map((f, i) => ({
    type: "PHOTO" as const,
    url: `/horses/${slug}/${f}`,
    alt,
    credit,
    isCover: i === cover
  }));
}

const KRAMER = "Michael Kramer, Wikimedia Commons · CC BY-SA 3.0";
const BUCCO = "Clément Bucco-Lechat, Wikimedia Commons · CC BY-SA 3.0";
const VALREN = "Tsaag Valren, Wikimedia Commons · CC BY-SA 4.0";
const MCFLY = "PaterMcFly, Wikimedia Commons · CC BY 3.0/4.0";

const ilicoXrays: XrayImage[] = (xrayManifest as Array<{ file: string; label: string; bodyPart?: string }>).map((x) => ({
  url: `/horses/ilico-du-chateau/xrays/${x.file}`,
  thumbUrl: `/horses/ilico-du-chateau/xrays/thumbs/${x.file}`,
  label: x.label,
  bodyPart: x.bodyPart
}));

export const horses: Horse[] = [
  // ───────────────────────────── 1.30 m ─────────────────────────────
  {
    id: "ilico-du-chateau",
    slug: "ilico-du-chateau",
    breed: "Selle Français",
    sex: "GELDING",
    dateOfBirth: "2018-04-19",
    color: "Chestnut",
    jumpHeightCm: 130,
    competitionLevel: "1.30 m",
    registrationNo: "SF 18161820Q",
    priceOnRequest: true,
    priceCurrency: "EUR",
    status: "AVAILABLE",
    locationLabel: "Brittany, France",
    featuredOnHome: true,
    featuredStory: false,
    highlights: ["Full set of 29 radiographs on file", "Vet study June 2024 · Olivier Lambrecht", "Eight-year-old Selle Français"],
    photosAreRepresentative: true,
    trust: { vetDocs: true, xrays: true, pedigreeDocs: true, transport: true },
    translations: {
      en: {
        locale: "en",
        name: "Ilico du Château",
        positioning: "An eight-year-old Selle Français with a complete, recent radiographic set available to view online.",
        experience: "Registered with the Selle Français studbook under number 18161820Q. A full pre-purchase radiographic series — feet, fetlocks, knees, hocks, stifles, back and neck — was taken on 17 June 2024 and can be viewed in full on this page.",
        suitability: "For a buyer who values transparency: every image the veterinarian took is available before you travel.",
        idealRider: "Details of Ilico's training and competition record are provided on enquiry."
      },
      fr: {
        locale: "fr",
        name: "Ilico du Château",
        positioning: "Selle Français de huit ans, avec un bilan radiographique complet et récent consultable en ligne.",
        experience: "Inscrit au stud-book Selle Français sous le numéro 18161820Q. Une série radiographique complète de visite d'achat — pieds, boulets, genoux, jarrets, grassets, dos et encolure — a été réalisée le 17 juin 2024 et peut être consultée intégralement sur cette page.",
        suitability: "Pour un acheteur qui privilégie la transparence : chaque cliché du vétérinaire est disponible avant de vous déplacer."
      },
      ar: {
        locale: "ar",
        name: "إيليكو دو شاتو",
        positioning: "سيل فرانسيه بعمر ثماني سنوات مع مجموعة أشعة كاملة وحديثة يمكن الاطلاع عليها عبر الإنترنت.",
        experience: "مسجّل في سجل Selle Français برقم 18161820Q. أُجريت سلسلة أشعة شاملة لفحص ما قبل الشراء في 17 يونيو 2024 ويمكن الاطلاع عليها بالكامل في هذه الصفحة."
      }
    },
    media: photos(
      "ilico-du-chateau",
      ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
      `${KRAMER} · representative image`,
      "Representative image — chestnut show jumper (not Ilico du Château)"
    ),
    documents: [
      { type: "XRAY", label: "Radiographic set — 29 views, 17 June 2024", url: "/horses/ilico-du-chateau/xrays/ilico-du-chateau-xrays.zip", downloadable: true },
      { type: "REGISTRATION", label: "Selle Français registration 18161820Q", url: "#", downloadable: false },
      { type: "PASSPORT", label: "Passport", url: "#", downloadable: false }
    ],
    xrays: {
      takenOn: "2024-06-17",
      clinic: "Olivier Lambrecht · DR by Veterinary Solutions",
      images: ilicoXrays,
      zipUrl: "/horses/ilico-du-chateau/xrays/ilico-du-chateau-xrays.zip",
      zipSizeMb: 4.7
    },
    competitionResults: [],
    pedigree: []
  },

  // ───────────────────────────── 1.20 m ─────────────────────────────
  {
    id: "fischerdaily-impressed",
    slug: "fischerdaily-impressed",
    breed: "KWPN",
    sex: "GELDING",
    dateOfBirth: "2008-06-08",
    color: "Grey",
    jumpHeightCm: 120,
    maxHeightJumpedCm: 145,
    competitionLevel: "1.20 m – 1.25 m",
    registrationNo: "FEI 104MM52",
    priceAmount: 28000,
    priceCurrency: "EUR",
    priceOnRequest: false,
    status: "AVAILABLE",
    locationLabel: "Brittany, France",
    featuredOnHome: true,
    featuredStory: false,
    highlights: ["Produced by Michael Jung", "186 international starts · 15 wins", "Schoolmaster for an ambitious young rider"],
    trust: { vetDocs: true, xrays: true, pedigreeDocs: true, transport: true },
    translations: {
      en: {
        locale: "en",
        name: "fischerDaily Impressed",
        positioning: "A Michael Jung-produced grey gelding with 186 international starts, now the ideal schoolmaster at 1.20 m – 1.25 m.",
        experience: "Campaigned internationally by Michael Jung in the young horse tours, then by Kristina Klebanova, and most recently placed 6th in the CSI Children's Big Tour 1.25 m Grand Prix at Kronenberg (November 2024) with Maya Edle von Braunmühl.",
        strengths: "Experience is the selling point: fifteen international wins and a decade of showground mileage make him a horse who knows his job in any arena.",
        suitability: "A young rider or amateur stepping up to international 1.20 m – 1.25 m classes who wants a horse that has seen it all.",
        idealRider: "A rider who values a calm, confident partner over a green one."
      },
      fr: {
        locale: "fr",
        name: "fischerDaily Impressed",
        positioning: "Hongre gris formé par Michael Jung, 186 départs internationaux, aujourd'hui le maître d'école idéal en 1,20 m – 1,25 m.",
        experience: "Sorti à l'international par Michael Jung dans les circuits jeunes chevaux, puis par Kristina Klebanova ; 6e du Grand Prix 1,25 m Children à Kronenberg (novembre 2024) avec Maya Edle von Braunmühl.",
        suitability: "Un jeune cavalier ou un amateur qui passe en 1,20 m – 1,25 m international et souhaite un cheval qui a tout vu."
      },
      ar: {
        locale: "ar",
        name: "فيشر ديلي إمبريسد",
        positioning: "خصي رمادي دربه مايكل يونغ، 186 مشاركة دولية، واليوم الحصان المثالي لتعليم الفرسان على ارتفاع 1.20 – 1.25 م.",
        suitability: "لفارس شاب أو هاوٍ ينتقل إلى فئات 1.20 – 1.25 م الدولية ويريد حصاناً خبيراً."
      }
    },
    media: photos("fischerdaily-impressed", ["03.jpg", "01.jpg", "02.jpg", "04.jpg"], KRAMER, "fischerDaily Impressed with Michael Jung, CSIYH* Wiesbaden 2015"),
    documents: [
      { type: "XRAY", label: "X-rays", url: "#", downloadable: false },
      { type: "VETERINARY_EXAM", label: "Veterinary examination", url: "#", downloadable: false },
      { type: "PASSPORT", label: "FEI passport 104MM52", url: "#", downloadable: false }
    ],
    competitionResults: [
      { competition: "CSICh-A Big Tour 1.25 m Grand Prix", year: 2024, level: "1.25 m", result: "6th", rider: "Maya Edle von Braunmühl", location: "Kronenberg, NL" },
      { competition: "CSICh-A Big Tour 1.25 m", year: 2024, level: "1.25 m", result: "12th", rider: "Maya Edle von Braunmühl", location: "Kronenberg, NL" },
      { competition: "CSIYH* Youngster Tour", year: 2015, level: "1.35 m", result: "Placed", rider: "Michael Jung", location: "Wiesbaden, DE" }
    ],
    pedigree: [
      { position: "sire", name: "Cartani 4", breed: "Holsteiner", competitionNote: "International 1.60 m" },
      { position: "dam", name: "Impression", breed: "KWPN" },
      { position: "sire.sire", name: "Carthago", breed: "Holsteiner", competitionNote: "Olympic Games 1996 & 2000" },
      { position: "dam.sire", name: "Elcaro", breed: "KWPN" }
    ]
  },

  // ───────────────────────────── 1.30 m ─────────────────────────────
  {
    id: "lord-larry-4",
    slug: "lord-larry-4",
    breed: "Hanoverian",
    sex: "GELDING",
    dateOfBirth: "2007-02-18",
    color: "Bay",
    jumpHeightCm: 130,
    maxHeightJumpedCm: 145,
    competitionLevel: "1.30 m",
    registrationNo: "FEI 103VI59",
    priceAmount: 22000,
    priceCurrency: "EUR",
    priceOnRequest: false,
    status: "RESERVED",
    locationLabel: "Brittany, France",
    featuredOnHome: true,
    featuredStory: false,
    highlights: ["Won the 1.45 m Youngster Tour, Wiesbaden", "175 international starts", "Experienced 1.30 m campaigner"],
    trust: { vetDocs: true, xrays: true, pedigreeDocs: true, transport: true },
    translations: {
      en: {
        locale: "en",
        name: "Lord Larry 4",
        positioning: "A bay Hanoverian gelding with 175 international starts, from a 1.45 m Youngster Tour win to steady 1.30 m form.",
        experience: "Produced by Katharina Offel, with whom he won the CSIYH1* 1.45 m Youngster Tour at Wiesbaden. More recently campaigned at CSI1*–CSI3* level between 1.20 m and 1.30 m by Louisa Müller, including Lanaken CSI3* in 2022.",
        strengths: "Honest, straightforward and thoroughly experienced — the kind of horse that gives a rider confidence in the ring.",
        suitability: "An amateur or junior rider looking for a reliable 1.20 m – 1.30 m partner with international mileage."
      },
      fr: {
        locale: "fr",
        name: "Lord Larry 4",
        positioning: "Hongre bai Hanovrien, 175 départs internationaux, de la victoire en Youngster Tour 1,45 m à une régularité en 1,30 m.",
        experience: "Formé par Katharina Offel, avec qui il a remporté le Youngster Tour CSIYH1* 1,45 m de Wiesbaden. Plus récemment sorti en CSI1*–CSI3* entre 1,20 m et 1,30 m par Louisa Müller, dont Lanaken CSI3* en 2022."
      },
      ar: {
        locale: "ar",
        name: "لورد لاري 4",
        positioning: "خصي هانوفري كميت بـ175 مشاركة دولية، من الفوز بجولة الخيول الشابة 1.45 م إلى أداء ثابت على 1.30 م."
      }
    },
    media: photos("lord-larry-4", ["01.jpg", "03.jpg", "04.jpg"], KRAMER, "Lord Larry 4 with Katharina Offel, CSIYH* Wiesbaden 2015"),
    documents: [
      { type: "XRAY", label: "X-rays", url: "#", downloadable: false },
      { type: "VETERINARY_EXAM", label: "Veterinary examination", url: "#", downloadable: false },
      { type: "PASSPORT", label: "FEI passport 103VI59", url: "#", downloadable: false }
    ],
    competitionResults: [
      { competition: "CSI3* Table A", year: 2022, level: "1.30 m", result: "56th", rider: "Louisa Müller", location: "Lanaken, BE" },
      { competition: "CSI1* Two Phases", year: 2022, level: "1.20 m", result: "13th", rider: "Louisa Müller", location: "Lier, BE" },
      { competition: "CSIYH1* Youngster Tour", year: 2015, level: "1.45 m", result: "1st", rider: "Katharina Offel", location: "Wiesbaden, DE" }
    ],
    pedigree: [
      { position: "sire", name: "Böckmann's Lord Pezi", breed: "Oldenburg", competitionNote: "International 1.60 m" },
      { position: "dam", name: "Cora", breed: "Hanoverian" },
      { position: "dam.sire", name: "Böckmann's Cordalme Z", breed: "Zangersheide" }
    ]
  },

  // ───────────────────────────── 1.35 m ─────────────────────────────
  {
    id: "cicero-bareliere-z",
    slug: "cicero-bareliere-z",
    breed: "Selle Français",
    sex: "STALLION",
    dateOfBirth: "2008-01-01",
    color: "Bay",
    jumpHeightCm: 135,
    maxHeightJumpedCm: 140,
    competitionLevel: "1.35 m",
    priceAmount: 45000,
    priceCurrency: "EUR",
    priceOnRequest: false,
    status: "AVAILABLE",
    locationLabel: "Brittany, France",
    featuredOnHome: true,
    featuredStory: false,
    highlights: ["By Cicero Z out of a Concorde mare", "Produced by David Will", "Stallion — sport and breeding"],
    trust: { vetDocs: true, xrays: true, pedigreeDocs: true, transport: true },
    translations: {
      en: {
        locale: "en",
        name: "Cicero Bareliere Z",
        positioning: "A bay stallion by Cicero Z out of a Concorde mare, produced through the international young horse tours by David Will.",
        experience: "Competed in the CSIYH* Youngster Tour at Wiesbaden under David Will, one of Germany's most respected producers of young jumpers.",
        strengths: "A pedigree that reads like a who's who of modern jumping breeding — Cicero Z (by Carthago) over Concorde — with the type and scope to match.",
        suitability: "A rider competing at 1.35 m who also wants breeding value, or a stud seeking a proven jumping bloodline."
      },
      fr: {
        locale: "fr",
        name: "Cicero Bareliere Z",
        positioning: "Étalon bai par Cicero Z et une mère par Concorde, formé sur les circuits internationaux jeunes chevaux par David Will.",
        strengths: "Une généalogie qui réunit les grands noms de l'élevage de saut moderne — Cicero Z (par Carthago) sur Concorde."
      },
      ar: {
        locale: "ar",
        name: "سيسيرو باريليير زد",
        positioning: "فحل كميت من سيسيرو زد وأم من كونكورد، دربه ديفيد ويل في جولات الخيول الشابة الدولية."
      }
    },
    media: photos("cicero-bareliere-z", ["04.jpg", "01.jpg", "02.jpg", "03.jpg"], KRAMER, "Cicero Bareliere Z with David Will, CSIYH* Wiesbaden 2015"),
    documents: [
      { type: "XRAY", label: "X-rays", url: "#", downloadable: false },
      { type: "PEDIGREE_DOCUMENT", label: "Pedigree certificate", url: "#", downloadable: false },
      { type: "PASSPORT", label: "Passport", url: "#", downloadable: false }
    ],
    competitionResults: [
      { competition: "CSIYH* Youngster Tour", year: 2015, level: "1.35 m", result: "Placed", rider: "David Will", location: "Wiesbaden, DE" }
    ],
    pedigree: [
      { position: "sire", name: "Cicero Z van Paemel", breed: "Zangersheide", competitionNote: "Sire of Grand Prix horses worldwide" },
      { position: "sire.sire", name: "Carthago", breed: "Holsteiner", competitionNote: "Olympic Games 1996 & 2000" },
      { position: "sire.dam", name: "Randel Z", breed: "Zangersheide" },
      { position: "dam.sire", name: "Concorde", breed: "KWPN", competitionNote: "Olympic Games 1992" }
    ]
  },

  // ───────────────────────────── 1.40 m ─────────────────────────────
  {
    id: "quidman-denfer",
    slug: "quidman-denfer",
    breed: "Holsteiner",
    sex: "STALLION",
    dateOfBirth: "2008-05-22",
    color: "Bay",
    jumpHeightCm: 140,
    maxHeightJumpedCm: 145,
    competitionLevel: "1.40 m – 1.45 m",
    registrationNo: "FEI 104TK70",
    priceAmount: 60000,
    priceCurrency: "EUR",
    priceOnRequest: false,
    status: "AVAILABLE",
    locationLabel: "Brittany, France",
    featuredOnHome: true,
    featuredStory: false,
    highlights: ["By Quidam de Revel out of a Dobel's Cento mare", "1.45 m Grand Prix experience", "Produced by Simon Delestre"],
    trust: { vetDocs: true, xrays: true, pedigreeDocs: true, transport: true },
    translations: {
      en: {
        locale: "en",
        name: "Quidman Denfer",
        positioning: "A Holsteiner stallion by the legendary Quidam de Revel, with CSI2* Grand Prix experience at 1.45 m.",
        experience: "Started in the international young horse tours with Simon Delestre, then campaigned at CSI2* level in Denmark and Poland by Thomas Velin, including the 1.45 m Grand Prix at Ciekocinko in 2019 and 1.40 m classes at Aarhus in 2020.",
        strengths: "A direct son of Quidam de Revel — one of the most influential jumping sires of the last forty years — out of a Dobel's Cento mare.",
        suitability: "A rider targeting 1.40 m – 1.45 m who wants a stallion with a genuine breeding proposition alongside his sport career."
      },
      fr: {
        locale: "fr",
        name: "Quidman Denfer",
        positioning: "Étalon Holsteiner par le légendaire Quidam de Revel, avec de l'expérience en Grand Prix CSI2* à 1,45 m.",
        strengths: "Fils direct de Quidam de Revel — l'un des étalons de saut les plus influents des quarante dernières années — sur une mère par Dobel's Cento."
      },
      ar: {
        locale: "ar",
        name: "كويدمان دينفر",
        positioning: "فحل هولشتاينر من الأسطوري كويدام دو ريفيل، بخبرة في جوائز كبرى CSI2* على ارتفاع 1.45 م."
      }
    },
    media: photos("quidman-denfer", ["01.jpg", "02.jpg", "03.jpg"], KRAMER, "Quidman Denfer with Simon Delestre, CSIYH* Wiesbaden 2015"),
    documents: [
      { type: "XRAY", label: "X-rays", url: "#", downloadable: false },
      { type: "VETERINARY_EXAM", label: "Veterinary examination", url: "#", downloadable: false },
      { type: "PEDIGREE_DOCUMENT", label: "Holsteiner pedigree certificate", url: "#", downloadable: false }
    ],
    competitionResults: [
      { competition: "CSI2* Table A", year: 2020, level: "1.40 m", result: "19th", rider: "Thomas Velin", location: "Aarhus, DK" },
      { competition: "CSI2* Grand Prix", year: 2019, level: "1.45 m", result: "Competed", rider: "Thomas Velin", location: "Ciekocinko, PL" },
      { competition: "CSIYH* Youngster Tour", year: 2015, level: "1.35 m", result: "Placed", rider: "Simon Delestre", location: "Wiesbaden, DE" }
    ],
    pedigree: [
      { position: "sire", name: "Quidam de Revel", breed: "Selle Français", competitionNote: "4th individual, Olympic Games 1992" },
      { position: "dam", name: "Salina IV", breed: "Holsteiner" },
      { position: "sire.sire", name: "Jalisco B", breed: "Selle Français" },
      { position: "sire.dam", name: "Dirka", breed: "Selle Français" },
      { position: "dam.sire", name: "Dobel's Cento", breed: "Holsteiner", competitionNote: "Team gold, Olympic Games 2000" }
    ]
  },

  // ───────────────────────────── 1.45 m ─────────────────────────────
  {
    id: "caribis-z",
    slug: "caribis-z",
    breed: "Zangersheide",
    sex: "STALLION",
    dateOfBirth: "2007-05-31",
    color: "Grey",
    jumpHeightCm: 145,
    maxHeightJumpedCm: 150,
    competitionLevel: "1.45 m",
    registrationNo: "FEI 104HB80",
    priceOnRequest: true,
    priceCurrency: "EUR",
    status: "RESERVED",
    locationLabel: "Brittany, France",
    featuredOnHome: true,
    featuredStory: true,
    highlights: ["8th, World Championships for Young Horses, Lanaken 2014", "148 international starts · 10 wins", "Produced by Christian Ahlmann"],
    trust: { vetDocs: true, xrays: true, pedigreeDocs: true, transport: true },
    translations: {
      en: {
        locale: "en",
        name: "Caribis Z",
        positioning: "A grey Zangersheide stallion produced by Christian Ahlmann, eighth at the World Championships for Young Horses in Lanaken.",
        experience: "Ridden through his young horse career by Christian Ahlmann, finishing 8th individually in the seven-year-old final at the FEI/WBFSH World Championships for Young Horses in Lanaken in 2014, and going on to 148 international starts with 10 wins.",
        strengths: "Scope and technique proven against the best of his generation; a stallion whose competition record speaks for itself.",
        suitability: "A professional or ambitious amateur competing at 1.45 m, with the option of a breeding career alongside.",
        potential: "Approved stallion status makes him an asset beyond the arena."
      },
      fr: {
        locale: "fr",
        name: "Caribis Z",
        positioning: "Étalon gris Zangersheide formé par Christian Ahlmann, 8e du Championnat du Monde des jeunes chevaux à Lanaken.",
        experience: "Monté durant sa carrière de jeune cheval par Christian Ahlmann, 8e en individuel de la finale des 7 ans au Championnat du Monde FEI/WBFSH de Lanaken en 2014, puis 148 départs internationaux pour 10 victoires."
      },
      ar: {
        locale: "ar",
        name: "كاريبيس زد",
        positioning: "فحل رمادي من زانغرسهايده دربه كريستيان أهلمان، حل ثامناً في بطولة العالم للخيول الشابة في لاناكن."
      }
    },
    media: photos("caribis-z", ["03.jpg", "01.jpg", "02.jpg"], KRAMER, "Caribis Z with Christian Ahlmann, CSIYH* Wiesbaden 2015"),
    documents: [
      { type: "XRAY", label: "X-rays", url: "#", downloadable: false },
      { type: "VETERINARY_EXAM", label: "Veterinary examination", url: "#", downloadable: false },
      { type: "COMPETITION_RECORD", label: "FEI competition record", url: "#", downloadable: false }
    ],
    competitionResults: [
      { competition: "FEI/WBFSH World Championships for Young Horses (7yo)", year: 2014, level: "1.40 m", result: "8th", rider: "Christian Ahlmann", location: "Lanaken, BE" },
      { competition: "CSIYH* Youngster Tour", year: 2015, level: "1.40 m", result: "Placed", rider: "Christian Ahlmann", location: "Wiesbaden, DE" }
    ],
    pedigree: [
      { position: "sire", name: "Caritano", breed: "Holsteiner" },
      { position: "dam", name: "Canasta Z", breed: "Zangersheide" },
      { position: "dam.sire", name: "Canabis Z", breed: "Zangersheide", competitionNote: "International 1.60 m" }
    ]
  },

  // ───────────────────────────── 1.50 m + ─────────────────────────────
  {
    id: "clooney-51",
    slug: "clooney-51",
    breed: "Westphalian",
    sex: "GELDING",
    dateOfBirth: "2006-03-03",
    color: "Grey",
    jumpHeightCm: 160,
    maxHeightJumpedCm: 160,
    competitionLevel: "1.60 m · Championship",
    registrationNo: "FEI 103YD87",
    priceOnRequest: true,
    priceCurrency: "EUR",
    status: "SOLD",
    locationLabel: "Brittany, France",
    featuredOnHome: false,
    featuredStory: false,
    highlights: ["European Champion 2019, Rotterdam", "Individual silver, WEG Tryon 2018", "World Cup Final winner 2022"],
    trust: { vetDocs: true, xrays: true, pedigreeDocs: true, transport: true },
    translations: {
      en: {
        locale: "en",
        name: "Clooney 51",
        positioning: "Martin Fuchs' grey Westphalian — European Champion, World Cup Final winner and one of the great horses of his era.",
        experience: "With Martin Fuchs: individual silver at the 2018 World Equestrian Games in Tryon, individual gold at the 2019 European Championships in Rotterdam, winner of the 2022 FEI World Cup Final in Leipzig, and a member of the Swiss team at the Tokyo Olympic Games. 300 international starts, 20 wins.",
        strengths: "Carefulness and rideability at the very highest level, year after year."
      },
      fr: {
        locale: "fr",
        name: "Clooney 51",
        positioning: "Le gris Westphalien de Martin Fuchs — Champion d'Europe, vainqueur de la finale de Coupe du Monde et l'un des grands chevaux de son époque.",
        experience: "Avec Martin Fuchs : médaille d'argent individuelle aux Jeux Équestres Mondiaux de Tryon 2018, or individuel aux Championnats d'Europe de Rotterdam 2019, vainqueur de la finale de la Coupe du Monde FEI 2022 à Leipzig, et membre de l'équipe suisse aux Jeux Olympiques de Tokyo."
      },
      ar: {
        locale: "ar",
        name: "كلوني 51",
        positioning: "الحصان الرمادي الويستفالي لمارتن فوكس — بطل أوروبا، والفائز بنهائي كأس العالم، وأحد أعظم خيول جيله."
      }
    },
    media: photos("clooney-51", ["02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "01.jpg"], `${BUCCO} / ${MCFLY}`, "Clooney 51 with Martin Fuchs"),
    documents: [
      { type: "XRAY", label: "X-rays", url: "#", downloadable: false },
      { type: "COMPETITION_RECORD", label: "FEI competition record", url: "#", downloadable: false }
    ],
    competitionResults: [
      { competition: "FEI World Cup Final", year: 2022, level: "1.60 m", result: "1st", rider: "Martin Fuchs", location: "Leipzig, DE" },
      { competition: "Olympic Games — team", year: 2021, level: "1.60 m", result: "4th", rider: "Martin Fuchs", location: "Tokyo, JP" },
      { competition: "FEI European Championships — individual", year: 2019, level: "1.60 m", result: "Gold", rider: "Martin Fuchs", location: "Rotterdam, NL" },
      { competition: "World Equestrian Games — individual", year: 2018, level: "1.60 m", result: "Silver", rider: "Martin Fuchs", location: "Tryon, US" }
    ],
    pedigree: [
      { position: "sire", name: "Cornet Obolensky", breed: "BWP", competitionNote: "Olympic Games 2008" },
      { position: "dam", name: "Fraulein vom Moor", breed: "Westphalian" },
      { position: "sire.sire", name: "Clinton", breed: "Holsteiner", competitionNote: "Olympic Games 2004" },
      { position: "sire.dam", name: "Rabanna van Costersveld", breed: "BWP" },
      { position: "dam.sire", name: "Ferragamo", breed: "Westphalian" }
    ]
  },
  {
    id: "explosion-w",
    slug: "explosion-w",
    breed: "KWPN",
    sex: "GELDING",
    dateOfBirth: "2009-04-12",
    color: "Chestnut",
    jumpHeightCm: 160,
    maxHeightJumpedCm: 160,
    competitionLevel: "1.60 m · Olympic",
    priceOnRequest: true,
    priceCurrency: "EUR",
    status: "SOLD",
    locationLabel: "Brittany, France",
    featuredOnHome: false,
    featuredStory: false,
    highlights: ["Olympic individual gold, Tokyo 2021", "Nine five-star Grand Prix wins", "By Chacco-Blue out of a Baloubet du Rouet mare"],
    trust: { vetDocs: true, xrays: true, pedigreeDocs: true, transport: true },
    translations: {
      en: {
        locale: "en",
        name: "Explosion W",
        positioning: "Ben Maher's Olympic champion — a chestnut KWPN gelding by Chacco-Blue with nine five-star Grand Prix wins.",
        experience: "Individual Olympic gold in Tokyo (2021), individual silver and team bronze at the 2019 European Championships in Rotterdam, and nine CSI5* Grand Prix victories with Ben Maher. Retired from sport at the London International Horse Show in December 2025.",
        strengths: "Explosive power with a light, careful front end — the combination that made him the best horse in the world in his prime."
      },
      fr: {
        locale: "fr",
        name: "Explosion W",
        positioning: "Le champion olympique de Ben Maher — hongre alezan KWPN par Chacco-Blue, neuf victoires en Grand Prix 5*.",
        experience: "Or olympique individuel à Tokyo (2021), argent individuel et bronze par équipe aux Championnats d'Europe de Rotterdam 2019, et neuf victoires en Grand Prix CSI5* avec Ben Maher. Retraité lors du London International Horse Show en décembre 2025."
      },
      ar: {
        locale: "ar",
        name: "إكسبلوجن دبليو",
        positioning: "بطل بن ماهر الأولمبي — خصي أشقر KWPN من تشاكو-بلو بتسعة انتصارات في جوائز كبرى خمس نجوم."
      }
    },
    media: photos("explosion-w", ["05.jpg", "01.jpg", "02.jpg", "03.jpg"], VALREN, "Explosion W with Ben Maher, Paris Eiffel Jumping 2018"),
    documents: [
      { type: "XRAY", label: "X-rays", url: "#", downloadable: false },
      { type: "COMPETITION_RECORD", label: "FEI competition record", url: "#", downloadable: false }
    ],
    competitionResults: [
      { competition: "Olympic Games — individual", year: 2021, level: "1.60 m", result: "Gold", rider: "Ben Maher", location: "Tokyo, JP" },
      { competition: "FEI European Championships — individual", year: 2019, level: "1.60 m", result: "Silver", rider: "Ben Maher", location: "Rotterdam, NL" },
      { competition: "FEI European Championships — team", year: 2019, level: "1.60 m", result: "Bronze", rider: "Ben Maher", location: "Rotterdam, NL" },
      { competition: "Longines Global Champions Tour — series", year: 2018, level: "1.60 m", result: "Champion", rider: "Ben Maher", location: "Doha, QA" }
    ],
    pedigree: [
      { position: "sire", name: "Chacco-Blue", breed: "Mecklenburg", competitionNote: "World's no. 1 jumping sire (WBFSH)" },
      { position: "dam", name: "Untouchable (Uarina)", breed: "KWPN" },
      { position: "sire.sire", name: "Chambertin", breed: "Holsteiner" },
      { position: "sire.dam", name: "Contara", breed: "Holsteiner" },
      { position: "dam.sire", name: "Baloubet du Rouet", breed: "Selle Français", competitionNote: "Olympic gold 2004; 3× World Cup winner" }
    ]
  },
  {
    id: "hello-sanctos",
    slug: "hello-sanctos",
    breed: "sBs (Belgian Sport Horse)",
    sex: "GELDING",
    dateOfBirth: "2002-05-13",
    color: "Bay",
    jumpHeightCm: 160,
    maxHeightJumpedCm: 160,
    competitionLevel: "1.60 m · Olympic",
    priceOnRequest: true,
    priceCurrency: "EUR",
    status: "SOLD",
    locationLabel: "Brittany, France",
    featuredOnHome: false,
    featuredStory: false,
    highlights: ["Only horse to win the Rolex Grand Slam", "Olympic team gold, London 2012", "World no. 1, 2014–2015"],
    trust: { vetDocs: true, xrays: true, pedigreeDocs: true, transport: true },
    translations: {
      en: {
        locale: "en",
        name: "Hello Sanctos",
        positioning: "Scott Brash's bay Belgian gelding — Olympic team gold medallist and the only horse ever to complete the Rolex Grand Slam.",
        experience: "Team gold at the London 2012 Olympic Games and the 2013 European Championships. Winner of the Grands Prix of Geneva (2014), Aachen (2015) and Spruce Meadows (2015) in succession — the Rolex Grand Slam of Show Jumping, a feat no other horse has matched. Bred by Willy Taets in Lembeke, Belgium.",
        strengths: "Consistency at the very top: ranked the world's best show jumping horse through 2014 and 2015."
      },
      fr: {
        locale: "fr",
        name: "Hello Sanctos",
        positioning: "Le hongre bai belge de Scott Brash — médaillé d'or olympique par équipe et seul cheval à avoir réalisé le Rolex Grand Slam.",
        experience: "Or par équipe aux Jeux Olympiques de Londres 2012 et aux Championnats d'Europe 2013. Vainqueur successif des Grands Prix de Genève (2014), Aix-la-Chapelle (2015) et Spruce Meadows (2015) — le Rolex Grand Slam, un exploit qu'aucun autre cheval n'a égalé."
      },
      ar: {
        locale: "ar",
        name: "هيلو سانكتوس",
        positioning: "خصي بلجيكي كميت لسكوت براش — ذهبية أولمبية بالفرق، والحصان الوحيد الذي أكمل رولكس غراند سلام."
      }
    },
    media: photos("hello-sanctos", ["05.jpg", "03.jpg", "02.jpg", "04.jpg", "01.jpg", "06.jpg"], BUCCO, "Hello Sanctos with Scott Brash, CHI Geneva"),
    documents: [
      { type: "XRAY", label: "X-rays", url: "#", downloadable: false },
      { type: "COMPETITION_RECORD", label: "FEI competition record", url: "#", downloadable: false }
    ],
    competitionResults: [
      { competition: "Rolex Grand Prix, CSIO5* Spruce Meadows", year: 2015, level: "1.60 m", result: "1st — Grand Slam", rider: "Scott Brash", location: "Calgary, CA" },
      { competition: "Rolex Grand Prix, CHIO Aachen", year: 2015, level: "1.60 m", result: "1st", rider: "Scott Brash", location: "Aachen, DE" },
      { competition: "Rolex Grand Prix, CHI Geneva", year: 2014, level: "1.60 m", result: "1st", rider: "Scott Brash", location: "Geneva, CH" },
      { competition: "Olympic Games — team", year: 2012, level: "1.60 m", result: "Gold", rider: "Scott Brash", location: "London, GB" }
    ],
    pedigree: [
      { position: "sire", name: "Quasimodo van de Molendreef", breed: "BWP" },
      { position: "dam", name: "Nikita", breed: "sBs" },
      { position: "sire.sire", name: "Quasimodo Z", breed: "Zangersheide" },
      { position: "dam.sire", name: "Nabab de Rêve", breed: "BWP", competitionNote: "Sire of Vigo d'Arsouilles" }
    ]
  }
];

export function getHorseBySlug(slug: string) {
  return horses.find((h) => h.slug === slug);
}

export function getFeaturedHorses() {
  return horses.filter((h) => h.featuredOnHome);
}

export function getFeaturedStoryHorse() {
  return horses.find((h) => h.featuredStory) ?? horses[0];
}
