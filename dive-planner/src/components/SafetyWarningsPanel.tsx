export function SafetyWarningsPanel() {
  return (
    <div className="rounded-3xl border border-cyan-300/20 bg-slate-900/45 p-5 text-sm text-slate-200 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
      <h3 className="mb-2 font-semibold text-cyan-100">🫧 Safety guidance</h3>
      <ul className="list-disc space-y-1 pl-5">
        <li>Planner supports recreational no-decompression table logic only.</li>
        <li>ppO2 &gt; 1.4 ata is marked caution; &gt; 1.6 ata is not allowed.</li>
        <li>Use conservative mode in cold water, workload, or fatigue conditions.</li>
      </ul>
    </div>
  );
}
