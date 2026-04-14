# Dive Plan

## Pre-implementation mapping from uploaded images

- **Image: Nitrox equivalent air depth card (gray, DSAT/PADI)**
  - Used for EANx32/EANx36 depth ranges and ppO2 at depth columns.
  - Backed `src/data/depthTables.ts` nitrox NDL depth entries and MOD checks in `src/lib/planner.ts`.
- **Image: Oxygen exposure table**
  - Used for CNS/O2 time limits by ppO2.
  - Backed `src/data/oxygen.ts` and CNS estimate logic in `src/lib/planner.ts`.
- **Image: EANx36 Table 1 + Table 3 (green/white)**
  - Used for pressure-group progression structure and repetitive-dive timetable layout.
  - Backed `src/data/repetitive.ts` and pressure group handling in `src/lib/planner.ts`.
- **Image: EANx36 Table 2 (surface interval credit table)**
  - Used for surface interval to pressure-group credit flow.
  - Backed `SURFACE_INTERVAL_CREDIT` in `src/data/repetitive.ts`.
- **Image: EANx32 Table 1 + Table 3 (yellow/green)**
  - Used for EANx32 no-deco depth row support and repetitive logic structure.
  - Backed `src/data/depthTables.ts` + `src/data/repetitive.ts`.
- **Image: EANx32 Table 2 (surface interval)**
  - Used to cross-check interval-group transition behavior.
- **Blue metric RDP images (French)**
  - Used for Air metric depth supports and no-deco limits.
  - Backed `AIR_DEPTH_TABLE` in `src/data/depthTables.ts`.

## Data structures created

- `DepthTableEntry[]`: explicit depth-to-NDL maps per gas.
- `RntEntry[]`: pressure-group keyed residual nitrogen table by repetitive depth.
- `SurfaceCreditRange[]`: interval windows mapping to new pressure groups.
- `OxygenExposureRow[]`: ppO2 columns with CNS/O2 time limits.
- `DiveInput`/`DiveResult`: typed planning input and deterministic output contracts.

## Planner rules encoded

- Round planned depth up to the next supported table depth band.
- Calculate repetitive dive total bottom time as `ABT + RNT`.
- Validate against adjusted NDL (optional conservative + safety-stop reductions).
- Surface interval transforms pressure group before next RNT lookup.
- Nitrox ppO2 computed from depth and gas fraction.
- MOD 1.4 and MOD 1.6 computed and warnings issued.
- CNS estimate computed from oxygen exposure table (100% row baseline).

## Run (Scuba Steve AI branded module)

```bash
npm install
npm run dev
```

## Notes

- Some card cells are hard to read in photos; all editable table values are centralized in `src/data/*` for easy correction without touching logic.
