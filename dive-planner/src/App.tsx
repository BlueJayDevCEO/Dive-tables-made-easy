import { useMemo, useState } from 'react';
import { DiveSequenceList } from './components/DiveSequenceList';
import { EducationAccordion } from './components/EducationAccordion';
import { PlannerForm } from './components/PlannerForm';
import { ResultsCard } from './components/ResultsCard';
import { SafetyWarningsPanel } from './components/SafetyWarningsPanel';
import { planDive } from './lib/planner';
import type { DiveInput, DiveType, GasMix } from './types/planner';

const baseDive: DiveInput = {
  depth: 18,
  bottomTime: 40,
  surfaceInterval: 60,
  previousPressureGroup: 'A',
  gas: 'air',
  safetyStop: true,
  conservative: false,
};

function App() {
  const [form, setForm] = useState({ ...baseDive, diveType: 'single' as DiveType });
  const [multiDives, setMultiDives] = useState<DiveInput[]>([baseDive]);

  const result = useMemo(() => planDive(form), [form]);

  const multiResults = useMemo(() => {
    let previous = 'A';
    return multiDives.map((d, i) => {
      const res = planDive({ ...d, previousPressureGroup: i === 0 ? 'A' : previous });
      previous = res.endingPressureGroup;
      return res;
    });
  }, [multiDives]);

  const onChange = (name: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addDive = () => setMultiDives((prev) => [...prev, { ...baseDive, gas: form.gas }]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,#0f3a5a_0,#031524_40%,#020617_100%)] px-4 py-6 text-slate-50">
      <div className="mx-auto max-w-5xl space-y-5">
        <header className="rounded-3xl border border-cyan-300/20 bg-slate-900/45 p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
            🌊 Dive planning suite
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Dive Plan</h1>
          <p className="mt-1 text-cyan-100/90">Table-based recreational dive planning</p>
          <p className="mt-3 text-sm text-slate-300">Built for the <span className="font-medium text-cyan-200">Scuba Steve AI</span> ecosystem with styling cues from Abyssal Vision.</p>
        </header>

        <PlannerForm
          gas={form.gas as GasMix}
          diveType={form.diveType}
          depth={form.depth}
          bottomTime={form.bottomTime}
          surfaceInterval={form.surfaceInterval ?? 0}
          previousPressureGroup={form.previousPressureGroup ?? 'A'}
          safetyStop={form.safetyStop}
          conservative={form.conservative}
          onChange={onChange}
        />

        <ResultsCard result={result} />
        <SafetyWarningsPanel />

        {form.diveType === 'multi' && (
          <div className="space-y-3">
            <button className="rounded-xl border border-cyan-300/40 bg-cyan-400/20 px-4 py-2 font-semibold text-cyan-100 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-300/25" onClick={addDive}>＋ Add Dive Segment</button>
            <DiveSequenceList dives={multiDives} results={multiResults} />
          </div>
        )}

        <EducationAccordion />
      </div>
    </div>
  );
}

export default App;
