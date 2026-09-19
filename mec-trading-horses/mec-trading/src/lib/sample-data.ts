import type { Horse } from "@/types/horse";

/**
 * Prototype data. Once Prisma + the database are connected, replace calls to
 * this module with `db.horse.findMany(...)` / `findUnique(...)` — the shape
 * returned by `src/lib/horses.ts` is designed to match this type exactly, so
 * pages don't need to change.
 */
export const horses: Horse[] = [
  {
    id: "1",
    slug: "orphee-des-forges",
    breed: "Selle Français",
    sex: "GELDING",
    dateOfBirth: "2017-04-12",
    heightCm: 168,
    color: "Bay",
    discipline: "SHOW_JUMPING",
    competitionLevel: "1.45m",
    registrationNo: "FR-2017-SF-04821",
    priceOnRequest: true,
    priceCurrency: "EUR",
    status: "AVAILABLE",
    locationLabel: "Brittany, France",
    featuredOnHome: true,
    featuredStory: true,
    trust: { vetDocs: true, xrays: true, pedigreeDocs: true, transport: true },
    translations: {
      en: {
        locale: "en",
        name: "Orphée des Forges",
        positioning: "A scopey, careful 1.45m partner with the temperament for a first international season.",
        personality: "Calm in the stable, sharp in the ring. Orphée is a thinking horse who tries for his rider.",
        training: "Produced through the young horse classes and stepped up methodically; schooled on the flat three times a week.",
        strengths: "Exceptional technique over oxers, reliable in the twisty time-faults classes, sound record.",
        experience: "Winner at 1.40m, placed in three 1.45m grands prix in the last season.",
        suitability: "A professional or ambitious amateur ready to campaign at 1.45m–1.50m.",
        potential: "Correct type and jump for a move to 1.50m within eighteen months.",
        idealRider: "Confident, tactful rider comfortable with a forward-thinking horse."
      },
      fr: {
        locale: "fr",
        name: "Orphée des Forges",
        positioning: "Un partenaire ample et prudent au 1,45 m, au tempérament idéal pour une première saison internationale.",
        personality: "Calme à l'écurie, vif en piste. Orphée réfléchit et se bat pour son cavalier.",
        training: "Formé à travers les épreuves jeunes chevaux puis monté en puissance méthodiquement ; travail de plat trois fois par semaine.",
        strengths: "Technique remarquable à l'oxer, fiable sur les parcours au chrono, dossier sanitaire sain.",
        experience: "Vainqueur en 1,40 m, placé dans trois Grand Prix 1,45 m la saison dernière.",
        suitability: "Un professionnel ou un amateur ambitieux prêt à concourir en 1,45–1,50 m.",
        potential: "Type et technique corrects pour envisager le 1,50 m sous dix-huit mois.",
        idealRider: "Cavalier confiant et fin, à l'aise avec un cheval qui va de l'avant."
      },
      ar: {
        locale: "ar",
        name: "أورفيه دي فورج",
        positioning: "حصان قفز بارتفاع 1.45 م يتميز بالحذر والاتساع، وطبع مثالي لموسم دولي أول.",
        personality: "هادئ في الإسطبل، نشيط في الحلبة، يفكر ويبذل جهده من أجل فارسه.",
        training: "تدرّب عبر فئات الخيول الشابة ثم ارتقى تدريجيًا، مع تدريب أرضي ثلاث مرات أسبوعيًا.",
        strengths: "تقنية استثنائية فوق الحواجز العريضة، ثبات في المسارات السريعة، وسجل صحي سليم.",
        experience: "فائز في مستوى 1.40 م، وحقق مراكز متقدمة في ثلاث جوائز كبرى بمستوى 1.45 م الموسم الماضي.",
        suitability: "مناسب لفارس محترف أو هاوٍ طموح مستعد للمنافسة بمستوى 1.45–1.50 م.",
        potential: "يتمتع بالنوعية والقفزة المناسبتين للانتقال إلى 1.50 م خلال ثمانية عشر شهرًا.",
        idealRider: "فارس واثق وحسّاس، مرتاح مع حصان يميل إلى التقدم للأمام."
      }
    },
    media: [
      { type: "PHOTO", url: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1600", isCover: true, alt: "Orphée des Forges jumping" },
      { type: "PHOTO", url: "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?q=80&w=1600" },
      { type: "PHOTO", url: "https://images.unsplash.com/photo-1553284966-19b8815c7817?q=80&w=1600" }
    ],
    documents: [
      { type: "VETERINARY_EXAM", label: "Pre-purchase veterinary exam, June 2026", url: "#", downloadable: false },
      { type: "XRAY", label: "Full radiographic set", url: "#", downloadable: false },
      { type: "PASSPORT", label: "FEI passport", url: "#", downloadable: false }
    ],
    competitionResults: [
      { competition: "CSI3* Grand Prix", year: 2026, level: "1.45m", result: "3rd", rider: "House rider", location: "Deauville, FR" },
      { competition: "National Grand Prix", year: 2025, level: "1.40m", result: "1st", rider: "House rider", location: "Fontainebleau, FR" }
    ],
    pedigree: [
      { position: "sire", name: "Diamant de Semilly", breed: "Selle Français", competitionNote: "Olympic sire line" },
      { position: "dam", name: "Ulane des Forges", breed: "Selle Français" },
      { position: "sire.sire", name: "Le Tot de Semilly", breed: "Selle Français" },
      { position: "dam.sire", name: "Quidam de Revel", breed: "Selle Français" }
    ]
  },
  {
    id: "2",
    slug: "amira-el-shams",
    breed: "Arabian",
    sex: "MARE",
    dateOfBirth: "2019-02-01",
    heightCm: 152,
    color: "Grey",
    discipline: "ARABIAN",
    competitionLevel: "Breeding / Halter",
    priceAmount: 45000,
    priceCurrency: "EUR",
    priceOnRequest: false,
    status: "AVAILABLE",
    locationLabel: "Brittany, France",
    featuredOnHome: true,
    featuredStory: false,
    trust: { vetDocs: true, xrays: false, pedigreeDocs: true, transport: true },
    translations: {
      en: {
        locale: "en",
        name: "Amira El Shams",
        positioning: "Straight Egyptian breeding mare from a documented desert bloodline, exceptional head and carriage.",
        personality: "Affectionate and expressive, easy to handle for grooms and family alike.",
        strengths: "Classic Egyptian type — dished profile, level croup, high tail carriage.",
        suitability: "A breeding programme seeking authenticated Egyptian bloodlines, or a halter and in-hand career.",
        potential: "Proven producer; foals to date show strong type transmission."
      },
      fr: {
        locale: "fr",
        name: "Amira El Shams",
        positioning: "Jument de race arabe pur-sang égyptien, lignée désertique documentée, tête et port exceptionnels.",
        personality: "Affectueuse et expressive, facile à manipuler pour les palefreniers comme pour la famille.",
        strengths: "Type égyptien classique : profil concave, croupe horizontale, port de queue élevé.",
        suitability: "Un programme d'élevage recherchant des lignées égyptiennes authentifiées, ou une carrière en main.",
        potential: "Poulinière confirmée ; les poulains obtenus montrent une forte transmission du type."
      },
      ar: {
        locale: "ar",
        name: "أميرة الشمس",
        positioning: "فرس عربية أصيلة مصرية من نسل صحراوي موثّق، برأس وقامة استثنائيين.",
        personality: "ودودة ومعبّرة، سهلة القيادة سواء للسائسين أو للعائلة.",
        strengths: "النوعية المصرية الكلاسيكية: تقعّر الجبهة، مؤخرة مستوية، وذيل مرفوع.",
        suitability: "مناسبة لبرنامج تربية يبحث عن سلالات مصرية موثّقة، أو لمسيرة عرض في اليد.",
        potential: "منتجة مؤكدة؛ المهور حتى الآن تُظهر انتقالًا قويًا للنوعية."
      }
    },
    media: [
      { type: "PHOTO", url: "https://images.unsplash.com/photo-1548783300-70b7654a2b6f?q=80&w=1600", isCover: true },
      { type: "PHOTO", url: "https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?q=80&w=1600" }
    ],
    documents: [
      { type: "PEDIGREE_DOCUMENT", label: "WAHO-endorsed pedigree", url: "#", downloadable: true },
      { type: "PASSPORT", label: "Breed passport", url: "#", downloadable: false }
    ],
    competitionResults: [],
    pedigree: [
      { position: "sire", name: "Ansata Halim Shah (line)", breed: "Arabian" },
      { position: "dam", name: "Bint El Bataa", breed: "Arabian" }
    ]
  },
  {
    id: "3",
    slug: "quintessence-de-riverdale",
    breed: "KWPN",
    sex: "MARE",
    dateOfBirth: "2016-05-20",
    heightCm: 170,
    color: "Black",
    discipline: "DRESSAGE",
    competitionLevel: "Grand Prix in training",
    priceOnRequest: true,
    priceCurrency: "EUR",
    status: "RESERVED",
    locationLabel: "Brittany, France",
    featuredOnHome: true,
    featuredStory: false,
    trust: { vetDocs: true, xrays: true, pedigreeDocs: true, transport: true },
    translations: {
      en: {
        locale: "en",
        name: "Quintessence de Riverdale",
        positioning: "A striking black mare with Grand Prix changes and piaffe already installed.",
        strengths: "Exceptional collection, three correct and expressive gaits, established one-tempi changes.",
        suitability: "A Grand Prix rider seeking a mare ready for the top of sport.",
        potential: "Confirmed for CDI Grand Prix debut within the year."
      },
      fr: {
        locale: "fr",
        name: "Quintessence de Riverdale",
        positioning: "Jument noire racée, changements de pied au Grand Prix et piaffer déjà installés.",
        strengths: "Rassembler exceptionnel, trois allures correctes et expressives, changements au temps confirmés.",
        suitability: "Un cavalier Grand Prix en recherche d'une jument prête pour le haut niveau.",
        potential: "Confirmée pour un début en CDI Grand Prix dans l'année."
      },
      ar: {
        locale: "ar",
        name: "كوينتيسنس دي ريفرديل",
        positioning: "فرس سوداء لافتة، مستوى غراند بري مع تغييرات الأقدام والتمايل مكتسبَين بالفعل.",
        strengths: "تجميع استثنائي، وثلاث حركات صحيحة ومعبّرة، وتغييرات إيقاعية مؤكدة.",
        suitability: "مناسبة لفارس غراند بري يبحث عن فرس جاهزة لأعلى مستويات المنافسة.",
        potential: "مؤهلة لبداية منافسات غراند بري الدولية خلال العام."
      }
    },
    media: [
      { type: "PHOTO", url: "https://images.unsplash.com/photo-1553284965-2ffef2ad2f65?q=80&w=1600", isCover: true }
    ],
    documents: [
      { type: "VETERINARY_EXAM", label: "Pre-purchase veterinary exam, March 2026", url: "#", downloadable: false }
    ],
    competitionResults: [
      { competition: "CDI3* Intermediate II", year: 2026, level: "Inter II", result: "2nd", location: "Compiègne, FR" }
    ],
    pedigree: [
      { position: "sire", name: "Vivaldi", breed: "KWPN" },
      { position: "dam", name: "Ricarda", breed: "KWPN" }
    ]
  },
  {
    id: "4",
    slug: "brio-de-lune",
    breed: "Anglo-Arabe",
    sex: "GELDING",
    dateOfBirth: "2021-03-08",
    heightCm: 160,
    color: "Chestnut",
    discipline: "YOUNG_HORSE",
    competitionLevel: "Unstarted — young horse classes",
    priceAmount: 22000,
    priceCurrency: "EUR",
    priceOnRequest: false,
    status: "AVAILABLE",
    locationLabel: "Brittany, France",
    featuredOnHome: true,
    featuredStory: false,
    trust: { vetDocs: true, xrays: true, pedigreeDocs: false, transport: true },
    translations: {
      en: {
        locale: "en",
        name: "Brio de Lune",
        positioning: "A five-year-old prospect with the frame and mind for eventing at the top level.",
        strengths: "Natural balance, bold to new fences, exceptional walk and canter for the breed.",
        suitability: "A young-horse programme or an owner developing a future team horse.",
        potential: "Correct conformation and temperament to progress through the levels without rush."
      },
      fr: {
        locale: "fr",
        name: "Brio de Lune",
        positioning: "Espoir de cinq ans, au modèle et au mental faits pour le concours complet de haut niveau.",
        strengths: "Équilibre naturel, hardi face aux obstacles inconnus, pas et galop remarquables pour la race.",
        suitability: "Un programme jeunes chevaux ou un propriétaire construisant un futur cheval d'équipe.",
        potential: "Conformation et tempérament corrects pour progresser dans les niveaux sans précipitation."
      },
      ar: {
        locale: "ar",
        name: "بريو دي لون",
        positioning: "واعد عمره خمس سنوات، ببنية وعقلية تؤهلانه للفروسية الثلاثية على أعلى مستوى.",
        strengths: "توازن طبيعي، جرأة أمام الحواجز الجديدة، ومشية وركض متميزان بالنسبة للسلالة.",
        suitability: "مناسب لبرنامج الخيول الشابة أو لمالك يبني حصان فريق مستقبلي.",
        potential: "بنية جسدية وطبع سليمان للتقدم عبر المستويات دون تسرّع."
      }
    },
    media: [
      { type: "PHOTO", url: "https://images.unsplash.com/photo-1544535830-52d3ad5b1c3f?q=80&w=1600", isCover: true }
    ],
    documents: [
      { type: "VETERINARY_EXAM", label: "Vetting report, January 2026", url: "#", downloadable: false }
    ],
    competitionResults: [],
    pedigree: [
      { position: "sire", name: "Nervoso Michelet", breed: "Anglo-Arabe" },
      { position: "dam", name: "Lune Grise", breed: "Anglo-Arabe" }
    ]
  },
  {
    id: "5",
    slug: "capitaine-du-val",
    breed: "Selle Français",
    sex: "STALLION",
    dateOfBirth: "2015-06-11",
    heightCm: 172,
    color: "Grey",
    discipline: "EVENTING",
    competitionLevel: "CCI4*",
    priceOnRequest: true,
    priceCurrency: "EUR",
    status: "SOLD",
    locationLabel: "Brittany, France",
    featuredOnHome: false,
    featuredStory: false,
    trust: { vetDocs: true, xrays: true, pedigreeDocs: true, transport: true },
    translations: {
      en: {
        locale: "en",
        name: "Capitaine du Val",
        positioning: "A CCI4* campaigner with a proven cross-country record, now placed with a national squad rider.",
        strengths: "Bold and economical across country, competitive dressage scores for the type."
      },
      fr: {
        locale: "fr",
        name: "Capitaine du Val",
        positioning: "Cheval de CCI4* au dossier de cross confirmé, désormais confié à un cavalier d'équipe nationale.",
        strengths: "Hardi et économique en cross, notes de dressage compétitives pour le type."
      },
      ar: {
        locale: "ar",
        name: "كابيتان دو فال",
        positioning: "حصان بمستوى CCI4* بسجل قوي في سباق الضاحية، انتقل الآن إلى فارس في المنتخب الوطني.",
        strengths: "جريء واقتصادي في سباق الضاحية، ونتائج ترويض تنافسية بالنسبة لنوعيته."
      }
    },
    media: [
      { type: "PHOTO", url: "https://images.unsplash.com/photo-1516947486033-15e9c3b3d2d3?q=80&w=1600", isCover: true }
    ],
    documents: [],
    competitionResults: [
      { competition: "CCI4*-L", year: 2025, level: "4*-L", result: "6th", location: "Pau, FR" }
    ],
    pedigree: [
      { position: "sire", name: "Jarnac", breed: "Selle Français" },
      { position: "dam", name: "Belle du Val", breed: "Selle Français" }
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
