export type Locale = "en" | "fr" | "ar";

export type HorseStatus = "AVAILABLE" | "RESERVED" | "SOLD";
export type HorseSex = "MARE" | "STALLION" | "GELDING";
export type Discipline =
  | "SHOW_JUMPING"
  | "DRESSAGE"
  | "EVENTING"
  | "BREEDING"
  | "ARABIAN"
  | "YOUNG_HORSE"
  | "COMPETITION"
  | "PROSPECT";

export interface HorseTranslation {
  locale: Locale;
  name: string;
  positioning: string;
  personality?: string;
  training?: string;
  strengths?: string;
  experience?: string;
  suitability?: string;
  potential?: string;
  idealRider?: string;
}

export interface PedigreeEntry {
  position: string; // "sire" | "dam" | "sire.sire" | "dam.dam.sire" ...
  name: string;
  breed?: string;
  photoUrl?: string;
  competitionNote?: string;
}

export interface CompetitionResult {
  competition: string;
  year: number;
  level: string;
  result: string;
  rider?: string;
  location?: string;
}

export interface MediaItem {
  type: "PHOTO" | "VIDEO_GENERAL" | "VIDEO_COMPETITION" | "VIDEO_TRAINING";
  url: string;
  alt?: string;
  isCover?: boolean;
}

export interface DocumentItem {
  type:
    | "VETERINARY_EXAM"
    | "XRAY"
    | "VACCINATION"
    | "PASSPORT"
    | "REGISTRATION"
    | "COMPETITION_RECORD"
    | "PEDIGREE_DOCUMENT";
  label: string;
  url: string;
  downloadable: boolean;
}

export interface Horse {
  id: string;
  slug: string;
  breed: string;
  sex: HorseSex;
  dateOfBirth: string;
  heightCm: number;
  color: string;
  discipline: Discipline;
  competitionLevel?: string;
  registrationNo?: string;
  passportNo?: string;
  priceAmount?: number;
  priceCurrency: string;
  priceOnRequest: boolean;
  status: HorseStatus;
  locationLabel: string;
  featuredOnHome: boolean;
  featuredStory: boolean;
  trust: {
    vetDocs: boolean;
    xrays: boolean;
    pedigreeDocs: boolean;
    transport: boolean;
  };
  translations: Record<Locale, HorseTranslation>;
  media: MediaItem[];
  documents: DocumentItem[];
  competitionResults: CompetitionResult[];
  pedigree: PedigreeEntry[];
}
