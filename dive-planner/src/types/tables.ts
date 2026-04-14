export interface DepthTableEntry {
  depth: number;
  ndl: number;
}

export interface RntEntry {
  group: string;
  byDepth: Record<number, number>;
}

export interface SurfaceCreditRange {
  min: number;
  max: number;
  resultGroup: string;
}

export interface OxygenExposureRow {
  percent: number;
  limitsByPpo2: Record<number, number>;
}
