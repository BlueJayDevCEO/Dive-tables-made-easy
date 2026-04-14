import type { OxygenExposureRow } from '../types/tables';

/** DSAT oxygen exposure table keyed by ppO2 columns from uploaded image. */
export const OXYGEN_EXPOSURE: OxygenExposureRow[] = [
  { percent: 5, limitsByPpo2: { 0.6:36, 0.7:29, 0.8:23, 0.9:19, 1.0:15, 1.1:12, 1.2:11, 1.3:9, 1.4:8, 1.5:6, 1.6:3 } },
  { percent: 50, limitsByPpo2: { 0.6:360,0.7:285,0.8:225,0.9:180,1.0:150,1.1:120,1.2:105,1.3:90,1.4:75,1.5:60,1.6:23 } },
  { percent: 80, limitsByPpo2: { 0.6:576,0.7:456,0.8:360,0.9:288,1.0:240,1.1:192,1.2:168,1.3:144,1.4:120,1.5:96,1.6:36 } },
  { percent: 100, limitsByPpo2: { 0.6:720,0.7:570,0.8:450,0.9:360,1.0:300,1.1:240,1.2:210,1.3:180,1.4:150,1.5:120,1.6:45 } },
];
