import { AIR_DEPTH_TABLE, EANX32_DEPTH_TABLE, EANX36_DEPTH_TABLE } from '../data/depthTables';
import { OXYGEN_EXPOSURE } from '../data/oxygen';
import { PRESSURE_GROUPS } from '../data/common';
import { RNT_TABLE, SURFACE_INTERVAL_CREDIT } from '../data/repetitive';
import type { DiveInput, DiveResult, GasMix } from '../types/planner';
import type { DepthTableEntry } from '../types/tables';

const gasFio2: Record<GasMix, number> = { air: 0.21, eanx32: 0.32, eanx36: 0.36 };

export function getDepthTable(gas: GasMix): DepthTableEntry[] {
  if (gas === 'eanx32') return EANX32_DEPTH_TABLE;
  if (gas === 'eanx36') return EANX36_DEPTH_TABLE;
  return AIR_DEPTH_TABLE;
}

export function normalizeDepth(depth: number, gas: GasMix): DepthTableEntry | undefined {
  return getDepthTable(gas).find((d) => depth <= d.depth);
}

export function calculatePressureGroup(_depthBand: number, time: number, ndl: number): string {
  const ratio = Math.max(0, Math.min(1, time / ndl));
  const idx = Math.min(PRESSURE_GROUPS.length - 1, Math.ceil(ratio * (PRESSURE_GROUPS.length - 1)));
  return PRESSURE_GROUPS[idx];
}

export function lookupRnt(group: string, depthBand: number): number {
  const row = [...RNT_TABLE].reverse().find((entry) => group >= entry.group) ?? RNT_TABLE[0];
  return row.byDepth[depthBand] ?? 0;
}

export function surfaceIntervalToGroup(previousGroup: string, minutes: number): string {
  const ranges = SURFACE_INTERVAL_CREDIT[previousGroup] ?? SURFACE_INTERVAL_CREDIT.Z;
  const match = ranges.find((r) => minutes >= r.min && minutes <= r.max);
  return match?.resultGroup ?? 'A';
}

export function calculatePpo2(gas: GasMix, depth: number): number {
  const ata = depth / 10 + 1;
  return Number((ata * gasFio2[gas]).toFixed(2));
}

export function calculateMod(gas: GasMix, ppo2Limit: number): number {
  return Math.floor(((ppo2Limit / gasFio2[gas]) - 1) * 10);
}

export function estimateCnsPercent(ppo2: number, bottomTime: number): number | undefined {
  if (ppo2 < 0.6) return 0;
  const rounded = Number(Math.min(1.6, Math.max(0.6, Math.round(ppo2 * 10) / 10)).toFixed(1));
  const row100 = OXYGEN_EXPOSURE.find((r) => r.percent === 100);
  const limit = row100?.limitsByPpo2[rounded];
  if (!limit) return undefined;
  return Number(((bottomTime / limit) * 100).toFixed(1));
}

export function planDive(input: DiveInput): DiveResult {
  const messages: string[] = [];
  const depthRow = normalizeDepth(input.depth, input.gas);
  if (!depthRow) {
    return {
      depthBand: input.depth,
      noDecoLimit: 0,
      adjustedNoDecoLimit: 0,
      residualNitrogenTime: 0,
      totalBottomTime: input.bottomTime,
      endingPressureGroup: input.previousPressureGroup ?? 'A',
      allowed: false,
      state: 'not_allowed',
      messages: ['Depth is outside supported table range for this gas.'],
      ppo2: calculatePpo2(input.gas, input.depth),
      mod14: calculateMod(input.gas, 1.4),
      mod16: calculateMod(input.gas, 1.6),
    };
  }

  const ppo2 = calculatePpo2(input.gas, depthRow.depth);
  const mod14 = calculateMod(input.gas, 1.4);
  const mod16 = calculateMod(input.gas, 1.6);

  const previousGroup = input.previousPressureGroup ?? 'A';
  const postSurfaceGroup = typeof input.surfaceInterval === 'number'
    ? surfaceIntervalToGroup(previousGroup, input.surfaceInterval)
    : previousGroup;

  const rnt = lookupRnt(postSurfaceGroup, depthRow.depth);
  const totalBottomTime = input.bottomTime + rnt;
  let adjustedNoDecoLimit = depthRow.ndl;
  if (input.conservative) adjustedNoDecoLimit -= 3;
  if (input.safetyStop) adjustedNoDecoLimit -= 2;

  const allowed = totalBottomTime <= adjustedNoDecoLimit;
  const endingPressureGroup = calculatePressureGroup(depthRow.depth, totalBottomTime, depthRow.ndl);

  if (!allowed) messages.push('Planned total bottom time exceeds no-decompression limit for this depth band.');
  if (ppo2 > 1.4) messages.push('ppO2 exceeds 1.4 ata normal planning limit (contingency-only zone).');
  if (ppo2 > 1.6) messages.push('ppO2 exceeds 1.6 ata: not allowed.');
  if (input.surfaceInterval !== undefined && input.surfaceInterval < 0) messages.push('Surface interval cannot be negative.');

  const cnsPercent = estimateCnsPercent(ppo2, input.bottomTime);
  if (cnsPercent && cnsPercent > 100) messages.push('Estimated CNS oxygen exposure exceeds 100% for this segment.');

  const state = !allowed || ppo2 > 1.6 ? 'not_allowed' : ppo2 > 1.4 || (cnsPercent ?? 0) > 80 ? 'caution' : 'safe';

  return {
    depthBand: depthRow.depth,
    noDecoLimit: depthRow.ndl,
    adjustedNoDecoLimit,
    residualNitrogenTime: rnt,
    totalBottomTime,
    endingPressureGroup,
    postSurfacePressureGroup: postSurfaceGroup,
    allowed: state !== 'not_allowed',
    state,
    messages,
    ppo2,
    mod14,
    mod16,
    cnsPercent,
  };
}
