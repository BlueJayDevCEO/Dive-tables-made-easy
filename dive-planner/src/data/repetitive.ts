import type { RntEntry, SurfaceCreditRange } from '../types/tables';

/**
 * RNT table shape follows DSAT Table 3 (group + next depth).
 * Values are a concise deterministic set for main planning depths.
 */
export const RNT_TABLE: RntEntry[] = [
  { group: 'A', byDepth: { 10:0,12:0,14:0,16:0,18:0,20:0,22:0,25:0,30:0,35:0,40:0 } },
  { group: 'D', byDepth: { 10:21,12:15,14:11,16:8,18:6,20:5,22:4,25:3,30:2,35:1,40:1 } },
  { group: 'G', byDepth: { 10:35,12:25,14:18,16:13,18:10,20:8,22:6,25:5,30:3,35:2,40:2 } },
  { group: 'J', byDepth: { 10:49,12:35,14:26,16:19,18:14,20:12,22:9,25:7,30:5,35:4,40:3 } },
  { group: 'M', byDepth: { 10:65,12:47,14:35,16:25,18:19,20:16,22:12,25:10,30:7,35:5,40:4 } },
  { group: 'P', byDepth: { 10:82,12:59,14:45,16:32,18:24,20:20,22:15,25:12,30:9,35:7,40:5 } },
  { group: 'S', byDepth: { 10:102,12:75,14:57,16:40,18:30,20:25,22:19,25:15,30:11,35:8,40:6 } },
  { group: 'V', byDepth: { 10:130,12:98,14:75,16:52,18:39,20:32,22:24,25:19,30:14,35:10,40:8 } },
  { group: 'Y', byDepth: { 10:171,12:127,14:95,16:67,18:50,20:41,22:31,25:24,30:18,35:13,40:10 } },
  { group: 'Z', byDepth: { 10:205,12:147,14:109,16:77,18:57,20:46,22:35,25:27,30:20,35:14,40:11 } },
];

/** Simple minute windows to new pressure groups (editable). */
export const SURFACE_INTERVAL_CREDIT: Record<string, SurfaceCreditRange[]> = {
  Z: [
    { min: 0, max: 2, resultGroup: 'Z' },
    { min: 3, max: 8, resultGroup: 'Y' },
    { min: 9, max: 20, resultGroup: 'X' },
    { min: 21, max: 40, resultGroup: 'V' },
    { min: 41, max: 70, resultGroup: 'S' },
    { min: 71, max: 120, resultGroup: 'N' },
    { min: 121, max: 180, resultGroup: 'H' },
    { min: 181, max: 720, resultGroup: 'A' },
  ],
};
