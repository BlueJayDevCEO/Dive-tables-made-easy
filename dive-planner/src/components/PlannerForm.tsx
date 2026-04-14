import type { DiveType, GasMix } from '../types/planner';

interface Props {
  gas: GasMix;
  diveType: DiveType;
  depth: number;
  bottomTime: number;
  surfaceInterval: number;
  previousPressureGroup: string;
  safetyStop: boolean;
  conservative: boolean;
  onChange: (name: string, value: string | number | boolean) => void;
}

export function PlannerForm(props: Props) {
  return (
    <div className="space-y-5 rounded-3xl border border-cyan-300/20 bg-slate-900/45 p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
      <div>
        <h2 className="text-lg font-semibold text-white">Plan setup</h2>
        <p className="text-sm text-slate-300">Choose gas and dive profile. Values update your safety status instantly.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="text-sm text-slate-100">Gas mode
          <select className="mt-1 w-full rounded-xl border border-slate-600/70 bg-slate-900/80 p-2.5 text-cyan-50 outline-none ring-cyan-300/40 transition focus:ring" value={props.gas} onChange={(e) => props.onChange('gas', e.target.value)}>
            <option value="air">Air</option>
            <option value="eanx32">EANx 32</option>
            <option value="eanx36">EANx 36</option>
          </select>
        </label>
        <label className="text-sm text-slate-100">Dive type
          <select className="mt-1 w-full rounded-xl border border-slate-600/70 bg-slate-900/80 p-2.5 text-cyan-50 outline-none ring-cyan-300/40 transition focus:ring" value={props.diveType} onChange={(e) => props.onChange('diveType', e.target.value)}>
            <option value="single">Single dive</option>
            <option value="repetitive">Repetitive dive</option>
            <option value="multi">Multi-dive planner</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm text-slate-100">Depth (m)
          <input type="number" className="mt-1 w-full rounded-xl border border-slate-600/70 bg-slate-900/80 p-2.5 text-cyan-50 outline-none ring-cyan-300/40 transition focus:ring" value={props.depth} onChange={(e) => props.onChange('depth', Number(e.target.value))} />
        </label>
        <label className="text-sm text-slate-100">Bottom time (min)
          <input type="number" className="mt-1 w-full rounded-xl border border-slate-600/70 bg-slate-900/80 p-2.5 text-cyan-50 outline-none ring-cyan-300/40 transition focus:ring" value={props.bottomTime} onChange={(e) => props.onChange('bottomTime', Number(e.target.value))} />
        </label>
      </div>

      {(props.diveType !== 'single') && (
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm text-slate-100">Surface interval (min)
            <input type="number" className="mt-1 w-full rounded-xl border border-slate-600/70 bg-slate-900/80 p-2.5 text-cyan-50 outline-none ring-cyan-300/40 transition focus:ring" value={props.surfaceInterval} onChange={(e) => props.onChange('surfaceInterval', Number(e.target.value))} />
          </label>
          <label className="text-sm text-slate-100">Previous pressure group
            <input maxLength={1} className="mt-1 w-full rounded-xl border border-slate-600/70 bg-slate-900/80 p-2.5 text-cyan-50 uppercase outline-none ring-cyan-300/40 transition focus:ring" value={props.previousPressureGroup} onChange={(e) => props.onChange('previousPressureGroup', e.target.value.toUpperCase())} />
          </label>
        </div>
      )}

      <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-700/70 bg-slate-900/60 p-3 text-sm text-slate-100">
        <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded border-slate-500 bg-slate-800 text-cyan-400" checked={props.safetyStop} onChange={(e) => props.onChange('safetyStop', e.target.checked)} /> 🛟 Include safety stop</label>
        <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded border-slate-500 bg-slate-800 text-cyan-400" checked={props.conservative} onChange={(e) => props.onChange('conservative', e.target.checked)} /> 🧭 Conservative mode</label>
      </div>
    </div>
  );
}
