export type Locale = "en" | "fr" | "ar";

export type HorseStatus = "AVAILABLE" | "RESERVED" | "SOLD";
export type HorseSex = "MARE" | "STALLION" | "GELDING";

/**
 * Every horse in the collection is a show jumper. Horses are categorised by
 * the height they jump (see src/lib/levels.ts for the bands).
 */
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
  /** Attribution line, e.g. "Michael Kramer · CC BY-SA 3.0" (required for Creative Commons photos). */
  credit?: string;
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

export interface XrayImage {
  /** Full-size image URL */
  url: string;
  /** Thumbnail URL for the filmstrip */
  thumbUrl: string;
  /** Radiographic view, e.g. "Hock DLPMO LH" */
  label: string;
  bodyPart?: string;
}

export interface XraySet {
  takenOn: string; // ISO date
  clinic?: string;
  images: XrayImage[];
  /** ZIP of every view — only present when the admin has enabled "download all" */
  zipUrl?: string;
  zipSizeMb?: number;
}

export interface Horse {
  id: string;
  slug: string;
  breed: string;
  sex: HorseSex;
  dateOfBirth: string;
  heightCm?: number;
  color: string;
  /** Height the horse is currently offered / competing at, in cm (e.g. 140). Drives the catalogue bands. */
  jumpHeightCm: number;
  /** Highest obstacle height on record, in cm. */
  maxHeightJumpedCm?: number;
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
  /** Short, buyer-facing facts shown in hover previews (max ~3). */
  highlights: string[];
  /** Set when the gallery shows stand-in photos rather than the horse itself. */
  photosAreRepresentative?: boolean;
  trust: {
    vetDocs: boolean;
    xrays: boolean;
    pedigreeDocs: boolean;
    transport: boolean;
  };
  translations: Record<Locale, HorseTranslation>;
  media: MediaItem[];
  documents: DocumentItem[];
  xrays?: XraySet;
  competitionResults: CompetitionResult[];
  pedigree: PedigreeEntry[];
}
