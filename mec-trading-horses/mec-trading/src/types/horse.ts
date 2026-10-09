export type Locale = "en" | "fr" | "ar" | "de" | "nl";

export type HorseStatus = "AVAILABLE" | "RESERVED" | "SOLD";
export type HorseSex = "MARE" | "STALLION" | "GELDING";

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
  position: string;
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
  url: string;
  thumbUrl: string;
  label: string;
  bodyPart?: string;
}

export interface XraySet {
  takenOn: string;
  clinic?: string;
  images: XrayImage[];
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
  jumpHeightCm: number;
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
  highlights: string[];
  photosAreRepresentative?: boolean;
  trust: {
    vetDocs: boolean;
    xrays: boolean;
    pedigreeDocs: boolean;
    transport: boolean;
  };
  translations: Partial<Record<Locale, HorseTranslation>> & Record<"en" | "fr" | "ar", HorseTranslation>;
  media: MediaItem[];
  documents: DocumentItem[];
  xrays?: XraySet;
  competitionResults: CompetitionResult[];
  pedigree: PedigreeEntry[];
}
