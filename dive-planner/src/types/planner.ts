export type GasMix = 'air' | 'eanx32' | 'eanx36';
export type DiveType = 'single' | 'repetitive' | 'multi';

export type SafetyState = 'safe' | 'caution' | 'not_allowed';

export interface DiveInput {
  depth: number;
  bottomTime: number;
  surfaceInterval?: number;
  previousPressureGroup?: string;
  gas: GasMix;
  safetyStop: boolean;
  conservative: boolean;
}

export interface DiveResult {
  depthBand: number;
  noDecoLimit: number;
  adjustedNoDecoLimit: number;
  residualNitrogenTime: number;
  totalBottomTime: number;
  endingPressureGroup: string;
  postSurfacePressureGroup?: string;
  allowed: boolean;
  state: SafetyState;
  messages: string[];
  ppo2: number;
  mod14: number;
  mod16: number;
  cnsPercent?: number;
}
