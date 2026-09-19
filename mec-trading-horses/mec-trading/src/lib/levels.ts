/**
 * Show-jumping height bands. Every horse is placed in a band by its
 * `jumpHeightCm`. Band ids double as URL params (?level=140) so the home page
 * can deep-link into the catalogue.
 */
export interface HeightBand {
  id: string;
  minCm: number;
  maxCm: number;
  /** Display label, identical in every language (metric heights are universal). */
  label: string;
}

export const HEIGHT_BANDS: HeightBand[] = [
  { id: "120", minCm: 0, maxCm: 125, label: "1.20 m" },
  { id: "130", minCm: 126, maxCm: 132, label: "1.30 m" },
  { id: "135", minCm: 133, maxCm: 137, label: "1.35 m" },
  { id: "140", minCm: 138, maxCm: 142, label: "1.40 m" },
  { id: "145", minCm: 143, maxCm: 147, label: "1.45 m" },
  { id: "150", minCm: 148, maxCm: 999, label: "1.50 m +" }
];

export function bandFor(jumpHeightCm: number): HeightBand {
  return HEIGHT_BANDS.find((b) => jumpHeightCm >= b.minCm && jumpHeightCm <= b.maxCm) ?? HEIGHT_BANDS[HEIGHT_BANDS.length - 1];
}

export function bandById(id: string | undefined): HeightBand | undefined {
  return HEIGHT_BANDS.find((b) => b.id === id);
}

/** 145 -> "1.45 m" */
export function formatJumpHeight(cm: number): string {
  return `${(cm / 100).toFixed(2)} m`;
}
