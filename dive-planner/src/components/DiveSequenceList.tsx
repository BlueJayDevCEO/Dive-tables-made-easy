import type { DiveInput, DiveResult } from '../types/planner';

export function DiveSequenceList({ dives, results }: { dives: DiveInput[]; results: DiveResult[] }) {
  return (
    <div className="rounded-3xl border border-cyan-300/20 bg-slate-900/45 p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
      <h3 className="mb-1 text-white">Dive sequence timeline</h3>
      <p className="mb-3 text-sm text-slate-300">Each segment carries pressure group impact forward to the next dive.</p>
      <div className="space-y-2 text-sm text-slate-200">
        {dives.map((d, i) => (
          <div key={i} className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-3">
            <p className="font-medium text-cyan-100">Dive {i + 1}</p>
            <p>{d.depth}m for {d.bottomTime}min</p>
            <p className="text-slate-300">Resulting pressure group: <span className="font-semibold text-white">{results[i]?.endingPressureGroup ?? '-'}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
