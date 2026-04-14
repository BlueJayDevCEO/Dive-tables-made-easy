import type { DepthTableEntry } from '../types/tables';

/**
 * Metric no-decompression limits transcribed from the uploaded card set.
 * When any single value is uncertain due to photo blur, keep edits here only.
 */
export const AIR_DEPTH_TABLE: DepthTableEntry[] = [
  { depth: 10, ndl: 219 },
  { depth: 12, ndl: 147 },
  { depth: 14, ndl: 98 },
  { depth: 16, ndl: 72 },
  { depth: 18, ndl: 56 },
  { depth: 20, ndl: 45 },
  { depth: 22, ndl: 37 },
  { depth: 25, ndl: 29 },
  { depth: 30, ndl: 20 },
  { depth: 35, ndl: 14 },
  { depth: 40, ndl: 9 },
  { depth: 42, ndl: 8 },
];

export const EANX32_DEPTH_TABLE: DepthTableEntry[] = [
  { depth: 14, ndl: 205 },
  { depth: 16, ndl: 130 },
  { depth: 18, ndl: 95 },
  { depth: 20, ndl: 75 },
  { depth: 22, ndl: 60 },
  { depth: 24, ndl: 50 },
  { depth: 26, ndl: 40 },
  { depth: 30, ndl: 29 },
  { depth: 36, ndl: 20 },
  { depth: 40, ndl: 16 },
];

export const EANX36_DEPTH_TABLE: DepthTableEntry[] = [
  { depth: 16, ndl: 185 },
  { depth: 18, ndl: 125 },
  { depth: 20, ndl: 95 },
  { depth: 22, ndl: 70 },
  { depth: 24, ndl: 60 },
  { depth: 26, ndl: 50 },
  { depth: 28, ndl: 40 },
  { depth: 30, ndl: 35 },
  { depth: 34, ndl: 24 },
];
