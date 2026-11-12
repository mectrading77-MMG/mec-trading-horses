/**
 * Show-jumping height bands. Band ids are used by catalogue URL filters.
 */
export interface HeightBand {
  id: string;
  minCm: number;
  maxCm: number;
  label: string;
}

export const HEIGHT_BANDS: HeightBand[] = [
  { id: "80", minCm: 80, maxCm: 89, label: "80 cm" },
  { id: "90", minCm: 90, maxCm: 99, label: "90 cm" },
  { id: "100", minCm: 100, maxCm: 109, label: "1.00 m" },
  { id: "110", minCm: 110, maxCm: 114, label: "1.10 m" },
  { id: "115", minCm: 115, maxCm: 119, label: "1.15 m" },
  { id: "120", minCm: 120, maxCm: 129, label: "1.20 m" },
  { id: "130", minCm: 130, maxCm: 134, label: "1.30 m" },
  { id: "135", minCm: 135, maxCm: 139, label: "1.35 m" },
  { id: "140", minCm: 140, maxCm: 144, label: "1.40 m" },
  { id: "145", minCm: 145, maxCm: 149, label: "1.45 m" },
  { id: "150", minCm: 150, maxCm: 999, label: "1.50 m +" }
];

export function bandFor(jumpHeightCm: number): HeightBand {
  return HEIGHT_BANDS.find((band) => jumpHeightCm >= band.minCm && jumpHeightCm <= band.maxCm) ?? HEIGHT_BANDS[HEIGHT_BANDS.length - 1];
}

export function bandById(id: string | undefined): HeightBand | undefined {
  return HEIGHT_BANDS.find((band) => band.id === id);
}

/** 145 -> "1.45 m" */
export function formatJumpHeight(cm: number): string {
  return `${(cm / 100).toFixed(2)} m`;
}
