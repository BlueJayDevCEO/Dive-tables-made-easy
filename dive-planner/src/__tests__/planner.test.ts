import { describe, expect, it } from 'vitest';
import { calculateMod, calculatePpo2, lookupRnt, planDive, surfaceIntervalToGroup } from '../lib/planner';

describe('planner core', () => {
  it('maps SI to lower group', () => {
    expect(surfaceIntervalToGroup('Z', 10)).toBe('X');
  });

  it('looks up RNT for pressure group/depth', () => {
    expect(lookupRnt('J', 18)).toBe(10);
  });

  it('checks MOD and ppO2', () => {
    expect(calculateMod('eanx32', 1.4)).toBe(33);
    expect(calculatePpo2('eanx32', 34)).toBeGreaterThan(1.4);
  });

  it('rejects plan beyond adjusted limit', () => {
    const result = planDive({
      depth: 30,
      bottomTime: 24,
      surfaceInterval: 30,
      previousPressureGroup: 'S',
      gas: 'air',
      safetyStop: false,
      conservative: false,
    });
    expect(result.allowed).toBe(false);
  });
});
