import { useState } from 'react';

export function EducationAccordion() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-3xl border border-cyan-300/20 bg-slate-900/45 p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
      <button className="flex w-full items-center justify-between text-left text-white" onClick={() => setOpen((v) => !v)}>
        <span className="font-medium">How Dive Plan works</span>
        <span className="text-cyan-200">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="mt-3 space-y-2 rounded-2xl border border-slate-700/60 bg-slate-900/55 p-3 text-sm text-slate-200">
          <p><b>Pressure groups:</b> letters A–Z showing remaining nitrogen after a dive.</p>
          <p><b>Residual nitrogen time:</b> extra equivalent minutes added for repetitive dives.</p>
          <p><b>Surface intervals:</b> time out of water lowers your pressure group.</p>
          <p><b>No-decompression limits:</b> max minutes you can stay at depth without deco stops.</p>
          <p><b>Nitrox MOD:</b> max operating depth before oxygen partial pressure gets too high.</p>
        </div>
      )}
    </div>
  );
}
