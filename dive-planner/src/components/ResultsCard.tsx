import type { DiveResult } from '../types/planner';

export function ResultsCard({ result }: { result: DiveResult }) {
  const status = result.state === 'safe'
    ? { border: 'border-emerald-400/60', chip: 'bg-emerald-400/20 text-emerald-100', label: '✅ Safe' }
    : result.state === 'caution'
      ? { border: 'border-amber-400/60', chip: 'bg-amber-400/20 text-amber-100', label: '⚠️ Caution' }
      : { border: 'border-rose-500/70', chip: 'bg-rose-500/20 text-rose-100', label: '⛔ Not allowed' };

  return (
    <div className={`rounded-3xl border ${status.border} bg-slate-900/45 p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Dive assessment</h2>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${status.chip}`}>{status.label}</span>
      </div>
      <p className="mb-3 text-sm text-slate-300">This result is table-driven and updates as soon as your profile changes.</p>
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-700/60 bg-slate-900/55 p-3 text-sm text-slate-100">
        <p>Depth band: {result.depthBand} m</p><p>NDL: {result.noDecoLimit} min</p>
        <p>Adj. NDL: {result.adjustedNoDecoLimit} min</p><p>RNT: {result.residualNitrogenTime} min</p>
        <p>Total BT: {result.totalBottomTime} min</p><p>End group: {result.endingPressureGroup}</p>
        <p>Post-SI group: {result.postSurfacePressureGroup ?? '-'}</p><p>ppO2: {result.ppo2} ata</p>
        <p>MOD 1.4: {result.mod14} m</p><p>MOD 1.6: {result.mod16} m</p>
        <p>CNS est.: {result.cnsPercent ?? 0}%</p><p>Eligibility: {result.allowed ? 'Dive profile allowed' : 'Revise profile'}</p>
      </div>
      {result.messages.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 rounded-2xl border border-amber-500/30 bg-amber-400/10 p-3 pl-8 text-sm text-amber-100">
          {result.messages.map((m) => <li key={m}>{m}</li>)}
        </ul>
      )}
    </div>
  );
}
