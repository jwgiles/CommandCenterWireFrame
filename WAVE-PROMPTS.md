# Wave Sequencing — Claude Code Prompts

Each prompt below is scoped to a single commit. Paste them in order.

---

## Prompt 1: Add Wave Data Structures

```
In src/App.jsx, add the wave sequencing data structures. This is a pure data commit — no UI changes yet.

1. Add `Rocket` to the lucide-react import at the top of the file (line ~9, alongside `Users`).

2. Immediately AFTER the `CARD_REGISTRY` object (which ends around the line `anomaly: { title: 'Billing Anomaly Detection'...}` with a closing `};`), and BEFORE the `PERSONA_EQUIPMENT_GRID` object, insert these three new constants:

```js
const WAVE_META = [
  { id: 'all', label: 'See All', shortLabel: 'All', color: 'slate', description: 'View all workflow cards across every build wave.' },
  { id: 1, label: 'Wave 1', shortLabel: 'W1', color: 'indigo', description: 'Foundation — No prerequisites. Stand up core intake and margin planning to unlock project team experience immediately.' },
  { id: 2, label: 'Wave 2', shortLabel: 'W2', color: 'emerald', description: 'Demand Intelligence — Builds on Wave 1 baselines. Aggregate demand signals, score clarity, and surface cost-of-delay.' },
  { id: 3, label: 'Wave 3', shortLabel: 'W3', color: 'amber', description: 'Decision Engines — Builds on Wave 2 demand signals. Fit scoring, lifecycle analysis, quick quotes, and owned-vs-rent optimization.' },
  { id: 4, label: 'Wave 4', shortLabel: 'W4', color: 'rose', description: 'Validate & Fulfill — Builds on Wave 3 decisions. Preflight validation, formal handoff, strategic sourcing, and CapEx planning.' },
  { id: 5, label: 'Wave 5', shortLabel: 'W5', color: 'violet', description: 'Execute & Monitor — Builds on Wave 4 requests. Track deployments, score vendors, detect billing anomalies, and monitor regressions.' },
  { id: 6, label: 'Wave 6', shortLabel: 'W6', color: 'sky', description: 'Learn & Compound — Builds on Wave 5 actuals. Close the loop with flywheel learning and calibrated FP&A sync.' },
];

const WAVE_ASSIGNMENTS = {
  // Wave 1: Foundation — no prerequisites, can be executed immediately
  prepop:           { wave: 1, rationale: 'Starting point — no prerequisites. Pre-populating baselines from templates and forecasts enables project teams to engage early and builds the data foundation for all downstream waves.' },
  adhoc:            { wave: 1, rationale: 'No prerequisites. Giving project teams a structured intake channel early creates immediate value and captures demand signals that feed Wave 2 aggregation.' },
  margin:           { wave: 1, rationale: 'Starting point for Finance & FP&A. Margin planning at pursuit stage anchors all downstream cost and revenue visibility.' },
  'prepop-ops':     { wave: 1, rationale: 'Operations view of V0 Baseline — same Wave 1 foundation as project team view, with constraint alerting layered on.' },
  // Wave 2: Demand Intelligence — builds on Wave 1 baseline data
  forecast:         { wave: 2, rationale: 'Dependent on Wave 1 baselines and intakes to have demand data flowing. Aggregates project-level needs into portfolio-wide cat-class demand vs. supply.' },
  clarityscoring:   { wave: 2, rationale: 'Needs baseline data from Wave 1 to score. Quantifies how complete each equipment need is — the scoring engine that powers cost-of-delay and preflight.' },
  costofdelay:      { wave: 2, rationale: 'Dependent on demand forecasting and clarity scoring. Makes the financial consequence of late clarity visible — the behavioral nudge engine.' },
  projectmaturity:  { wave: 2, rationale: 'Needs zone lifecycle data flowing from Wave 1 intakes. Shows where every package sits across zones — the portfolio-level progress view.' },
  // Wave 3: Decision Engines — builds on Wave 2 demand signals
  fitscore:         { wave: 3, rationale: 'Needs forecast data from Wave 2. Evaluates FP&A entries against equipment capabilities to recommend engagement strategy before designs lock.' },
  lifecycle:        { wave: 3, rationale: 'Dependent on multiple data inputs (telematics, maintenance, etc.). Creates the unified asset view that feeds CapEx planning in Wave 4.' },
  quotes:           { wave: 3, rationale: 'Same ML logic as demand forecasting but at lower fidelity for quick directional estimates. Feeds quick quotes to RSIs for early customer engagement.' },
  optimize:         { wave: 3, rationale: 'Needs demand signals from Wave 2 plus fleet data. Determines owned vs. re-rent for each request — critical cost optimization before fulfillment.' },
  // Wave 4: Validate & Fulfill — builds on Wave 3 decisions
  preflight:        { wave: 4, rationale: 'Needs upstream clarity scoring and optimization from Waves 2-3. The hard validation gate — items must pass before formal submission.' },
  formalrequest:    { wave: 4, rationale: 'Needs preflight validation. Submits validated request packs with full lineage — the handoff from planning to execution.' },
  source:           { wave: 4, rationale: 'Needs optimizer output from Wave 3. Enables strategic vendor selection using demand signals and performance data.' },
  capex:            { wave: 4, rationale: 'Needs lifecycle engine and demand-supply gap from Wave 3. Translates forward demand into prioritized CapEx waves for steering committee.' },
  // Wave 5: Execute & Monitor — builds on Wave 4 submitted requests
  execution:        { wave: 5, rationale: 'Needs formal requests flowing from Wave 4. Tracks active deployments, monitors utilization, flags exceptions — the operational cockpit.' },
  vendorscorecard:  { wave: 5, rationale: 'Needs execution actuals accumulating. Auto-compiles vendor performance from delivery, billing accuracy, and safety data.' },
  anomaly:          { wave: 5, rationale: 'Triggered post-fulfillment from Wave 4. Detects billing anomalies using project-level patterns before invoice posting.' },
  regression:       { wave: 5, rationale: 'Needs gate conditions established across Waves 1-4. Monitors when gate conditions become false and fires regression-specific triggers.' },
  // Wave 6: Learn & Compound — builds on Wave 5 execution actuals
  flywheel:         { wave: 6, rationale: 'Needs actuals vs. assumptions from Wave 5 execution. Captures variance, analyzes patterns, and writes back calibrated defaults to upstream templates.' },
  fpa:              { wave: 6, rationale: 'Needs calibrated data from flywheel learning. Syncs risk-adjusted, time-phased revenue and margin forecasts back to FP&A tools.' },
};

const WAVE_COLORS = {
  1: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200', dot: 'bg-indigo-500' },
  2: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  3: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  4: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-500' },
  5: { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200', dot: 'bg-violet-500' },
  6: { bg: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-200', dot: 'bg-sky-500' },
};
```

Do NOT modify any existing code. This is an additive-only commit. Commit message: "feat: add wave sequencing data structures (WAVE_META, WAVE_ASSIGNMENTS, WAVE_COLORS)"
```

---

## Prompt 2: Add WaveBadge Component and Update Card to Show Badges

```
In src/App.jsx, add a WaveBadge component and update the Card component to display wave badges and accept a waveFilter prop. This commit changes two components but no layout.

1. Find the existing `Card` component (starts with `const Card = ({ id, title, description, icon: Icon, colorClass, highlight, connectionLabel, onClick, zone, isTourActive, isHighlighted }) =>`).

2. IMMEDIATELY BEFORE the Card component, add this new WaveBadge component:

```js
const WaveBadge = ({ wave }) => {
  const colors = WAVE_COLORS[wave];
  if (!colors) return null;
  return (
    <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text} ${colors.border} border`}>
      <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      W{wave}
    </div>
  );
};
```

3. Replace the entire existing Card component with this updated version that:
   - Adds `waveFilter` to its props
   - Looks up the card's wave from WAVE_ASSIGNMENTS
   - Dims cards that don't match the active wave filter (unless filter is 'all')
   - Renders a WaveBadge in the top-right of every card

```js
const Card = ({ id, title, description, icon: Icon, colorClass, highlight, connectionLabel, onClick, zone, isTourActive, isHighlighted, waveFilter }) => {
  const waveInfo = WAVE_ASSIGNMENTS[id];
  const cardWave = waveInfo ? waveInfo.wave : null;
  const isWaveFiltered = waveFilter !== 'all' && cardWave !== waveFilter;
  return (
    <div onClick={() => !isTourActive && !isWaveFiltered && onClick({ id, title, description, icon: Icon, colorClass, highlight, zone })}
      className={`p-4 rounded-xl shadow-sm border bg-white flex flex-col relative transition-all duration-300 ${isTourActive ? '' : isWaveFiltered ? '' : 'cursor-pointer'} ${colorClass}
        ${isWaveFiltered ? 'opacity-20 grayscale scale-95 pointer-events-none' : ''}
        ${isTourActive ? (isHighlighted ? 'ring-4 ring-indigo-500 shadow-2xl scale-105 z-20' : 'opacity-30 grayscale blur-[1px] pointer-events-none') : isWaveFiltered ? '' : 'hover:shadow-md hover:ring-2 hover:ring-slate-300 hover:-translate-y-1 z-10'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
          <div className={`p-2 rounded-lg ${highlight}`}><Icon className="w-4 h-4" /></div>
          <h3 className="leading-tight">{title}</h3>
        </div>
        {cardWave && <WaveBadge wave={cardWave} />}
      </div>
      <p className="text-xs text-slate-600 leading-relaxed flex-grow">{description}</p>
      {connectionLabel && <div className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1"><ArrowRight className="w-3 h-3" /> {connectionLabel}</div>}
    </div>
  );
};
```

4. Find where the Card component is rendered inside the zone-grouped grid (search for `<Card` with `key={cardKey}`). Add the `waveFilter={activeWave}` prop. The call should look like:

```jsx
<Card
  key={cardKey}
  id={workflowId}
  title={meta.title}
  description={meta.description}
  icon={meta.icon}
  colorClass={meta.colorClass}
  highlight={meta.highlight}
  zone={zg.zones}
  onClick={setSelectedNode}
  isTourActive={isTourActive}
  isHighlighted={isHighlighted(workflowId)}
  waveFilter={activeWave}
/>
```

NOTE: `activeWave` state doesn't exist yet — it will be added in Prompt 3. For this commit, add it as a temporary default at the top of the App component: `const activeWave = 'all';` (just a const, not useState). This ensures the build doesn't break. Prompt 3 will replace this with proper state.

Commit message: "feat: add WaveBadge component and wire wave filtering into Card"
```

---

## Prompt 3: Add Wave Selector Bar at the Top of the Board

```
In src/App.jsx, add the wave sequencing selector bar at the VERY TOP of the page (above the persona nav bar), add the `activeWave` state, and add a wave description panel directly below the selector when a specific wave is selected.

1. In the App component, find the temporary `const activeWave = 'all';` from Prompt 2 and replace it with proper state:
```js
const [activeWave, setActiveWave] = useState('all');
```
Place it alongside the other useState declarations (near `triggerFilter`, `triggerPanelOpen`, etc.).

2. Find the return statement's outermost div (`<div className="min-h-screen bg-slate-100...`). IMMEDIATELY INSIDE that div, BEFORE the existing "Top Navigation Bar" comment/div, insert the Wave Sequencing Bar:

```jsx
{/* Wave Sequencing Bar */}
<div className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    <div className="flex items-center h-9 gap-1">
      <div className="flex items-center gap-1.5 mr-3">
        <Rocket className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Build Wave</span>
      </div>
      {WAVE_META.map((wave) => {
        const isActive = activeWave === wave.id;
        const waveColors = wave.id === 'all' ? null : WAVE_COLORS[wave.id];
        return (
          <button
            key={wave.id}
            onClick={() => setActiveWave(wave.id)}
            className={`relative px-3 py-1 rounded-md text-[11px] font-bold tracking-wide transition-all ${
              isActive
                ? wave.id === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : `${waveColors.bg} ${waveColors.text} shadow-sm`
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
            }`}
            title={wave.description}
          >
            {wave.id === 'all' ? (
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                See All
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${isActive ? waveColors.dot : 'bg-slate-600'}`} />
                {wave.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
</div>
```

3. The existing "Top Navigation Bar" div has `sticky top-0 z-40`. Change it to `sticky top-9 z-40` so it stacks below the wave bar (the wave bar is h-9 = 2.25rem).

4. BETWEEN the wave bar and the existing top nav bar, insert the wave description panel that only shows when a specific wave (not 'See All') is selected:

```jsx
{/* Wave Description Panel */}
{activeWave !== 'all' && (() => {
  const waveMeta = WAVE_META.find(w => w.id === activeWave);
  const waveColor = WAVE_COLORS[activeWave];
  const waveCards = Object.entries(WAVE_ASSIGNMENTS)
    .filter(([, v]) => v.wave === activeWave)
    .map(([key]) => {
      const resolvedKey = CARD_REGISTRY[key]?.resolveId || key;
      return CARD_REGISTRY[resolvedKey] || CARD_REGISTRY[key];
    })
    .filter(Boolean);
  return (
    <div className={`border-b ${waveColor.border} ${waveColor.bg} bg-opacity-50`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-sm font-bold ${waveColor.text}`}>{waveMeta.label}: {waveMeta.description.split(' — ')[0]}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              {waveMeta.description.includes(' — ') ? waveMeta.description.split(' — ').slice(1).join(' — ') : waveMeta.description}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4 shrink-0">
            <span className={`text-xs font-bold ${waveColor.text}`}>{waveCards.length} cards</span>
            <button
              onClick={() => setActiveWave('all')}
              className="text-xs text-slate-500 hover:text-slate-700 underline"
            >
              See All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
})()}
```

5. Also update the Trigger Panel's fixed positioning. Find the trigger panel div that starts with `<div className="fixed top-0 right-0 h-full w-[420px]...`. Change `top-0` to `top-9` and `h-full` to `h-[calc(100%-2.25rem)]` so it doesn't overlap the wave bar.

Verify the build compiles. Commit message: "feat: add wave selector bar above persona nav with description panel"
```

---

## Prompt 4: Gate the Walkthrough Behind 'See All'

```
In src/App.jsx, make the Walkthrough button only functional when the wave selector is set to 'See All'. When a specific wave is selected, the Walkthrough button should appear disabled with a tooltip explaining why.

1. Find the Walkthrough button (search for `Walkthrough` in the JSX). It currently looks like:

```jsx
<button onClick={() => { setIsTourActive(true); setTourStep(0); setSelectedNode(null); }} className="btn-interactive flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold shadow-sm transition-colors shrink-0">
  <Play className="w-4 h-4" /> Walkthrough
</button>
```

2. Replace it with this version that checks `activeWave === 'all'`:

```jsx
<div className="relative group shrink-0">
  <button
    onClick={() => {
      if (activeWave !== 'all') return;
      setIsTourActive(true);
      setTourStep(0);
      setSelectedNode(null);
    }}
    className={`btn-interactive flex items-center gap-2 px-4 py-2 rounded-lg font-bold shadow-sm transition-colors ${
      activeWave === 'all'
        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
    }`}
  >
    <Play className="w-4 h-4" /> Walkthrough
  </button>
  {activeWave !== 'all' && (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-[11px] font-medium rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
      Select "See All" to use the walkthrough
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-800" />
    </div>
  )}
</div>
```

3. Also add a safety check: if a user switches to a specific wave while a tour is active, cancel the tour. Find where `setActiveWave` is called in the wave selector buttons (`onClick={() => setActiveWave(wave.id)`) and change it to:

```jsx
onClick={() => {
  setActiveWave(wave.id);
  if (wave.id !== 'all' && isTourActive) {
    setIsTourActive(false);
    setTourStep(0);
  }
}}
```

Verify the build compiles. Commit message: "feat: gate walkthrough behind See All wave selection"
```

---

## Prompt 5: Move Wave Bar Content Above Page Title Inside the Board

```
In src/App.jsx, restructure so the wave selector and wave description appear at the VERY TOP of the main content area (inside the board), not as a sticky global bar. This puts it above the page title and zone spine, directly on the canvas where the user interacts with the cards.

1. REMOVE the entire "Wave Sequencing Bar" sticky div from the top-level layout (the `<div className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">...</div>` block).

2. REMOVE the "Wave Description Panel" block that conditionally renders between the wave bar and the top nav (the `{activeWave !== 'all' && (() => {...})()}` block).

3. Revert the "Top Navigation Bar" div back from `sticky top-9 z-40` to `sticky top-0 z-40`.

4. Revert the Trigger Panel positioning from `top-9` / `h-[calc(100%-2.25rem)]` back to `top-0` / `h-full`.

5. Inside the main content area, find the "Page Title" section (the `<div className="mb-6 flex justify-between items-end">` block). IMMEDIATELY BEFORE that Page Title div, insert the new on-canvas wave selector + description:

```jsx
{/* Wave Sequencing — Build Roadmap */}
<div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
  {/* Wave Selector Row */}
  <div className="bg-slate-900 px-6 py-3 flex items-center justify-between">
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-1.5 mr-3">
        <Rocket className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Build Wave</span>
      </div>
      {WAVE_META.map((wave) => {
        const isActive = activeWave === wave.id;
        const waveColors = wave.id === 'all' ? null : WAVE_COLORS[wave.id];
        return (
          <button
            key={wave.id}
            onClick={() => {
              setActiveWave(wave.id);
              if (wave.id !== 'all' && isTourActive) {
                setIsTourActive(false);
                setTourStep(0);
              }
            }}
            className={`relative px-3 py-1.5 rounded-md text-[11px] font-bold tracking-wide transition-all ${
              isActive
                ? wave.id === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : `${waveColors.bg} ${waveColors.text} shadow-sm`
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
            }`}
          >
            {wave.id === 'all' ? (
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                See All
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${isActive ? waveColors.dot : 'bg-slate-600'}`} />
                {wave.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
    <div className="text-[10px] text-slate-500 italic">
      {activeWave === 'all' ? '21 cards across 6 build waves' : `${Object.values(WAVE_ASSIGNMENTS).filter(v => v.wave === activeWave).length} cards in this wave`}
    </div>
  </div>

  {/* Wave Description (only when a specific wave is selected) */}
  {activeWave !== 'all' && (() => {
    const waveMeta = WAVE_META.find(w => w.id === activeWave);
    const waveColor = WAVE_COLORS[activeWave];
    return (
      <div className={`px-6 py-3 ${waveColor.bg} border-t ${waveColor.border}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2.5 h-2.5 rounded-full ${waveColor.dot}`} />
              <span className={`text-sm font-bold ${waveColor.text}`}>
                {waveMeta.label}: {waveMeta.description.split(' — ')[0]}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl pl-[18px]">
              {waveMeta.description.includes(' — ') ? waveMeta.description.split(' — ').slice(1).join(' — ') : waveMeta.description}
            </p>
          </div>
          <button
            onClick={() => setActiveWave('all')}
            className={`text-xs font-semibold ${waveColor.text} hover:underline shrink-0 ml-4`}
          >
            ← See All Waves
          </button>
        </div>
      </div>
    );
  })()}
</div>
```

This puts the wave selector as the first visual element on the board canvas, above the page title, zone spine, and card grid. The dark wave selector bar + colored description panel are contained inside a single rounded card.

Verify the build compiles and that the layout order from top to bottom is:
1. Persona tabs (sticky nav)
2. Wave selector card (on canvas, scrolls with content)
3. Page title + Walkthrough button
4. Zone progression spine
5. Card grid

Commit message: "feat: move wave selector into main board canvas above page title"
```

---

## Prompt 6: Final Polish — Wave Progress Indicator and Card Count

```
In src/App.jsx, add a small wave progress indicator to the wave selector bar showing how many waves are "complete" (conceptual visual only — not functional state). Also ensure the 'See All' button in the wave description panel actually works, and add a subtle connector line between the wave buttons to show progression.

1. In the wave selector row (the dark `bg-slate-900` bar), between adjacent wave buttons (W1 through W6, NOT before 'See All'), add small connector arrows. Wrap the WAVE_META.map in a fragment and after each wave button (except the last and except 'See All'), add:

```jsx
{wave.id !== 'all' && wave.id < 6 && (
  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0 -mx-0.5" />
)}
```

This shows: [See All] [W1] > [W2] > [W3] > [W4] > [W5] > [W6]

2. Add a subtle tooltip on each wave button that shows the cards in that wave when hovered. Use the same tooltip pattern already used on the zone spine circles:

For each wave button (where `wave.id !== 'all'`), wrap the button in a `<div className="relative group">` and add a tooltip div:

```jsx
<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-[10px] rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 max-w-xs">
  <div className="font-bold mb-1">{waveMeta.label}: {waveMeta.description.split(' — ')[0]}</div>
  {Object.entries(WAVE_ASSIGNMENTS)
    .filter(([, v]) => v.wave === wave.id)
    .map(([key]) => CARD_REGISTRY[CARD_REGISTRY[key]?.resolveId || key] || CARD_REGISTRY[key])
    .filter(Boolean)
    .map((card, i) => (
      <div key={i} className="text-slate-300">• {card.title}</div>
    ))
  }
  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-800" />
</div>
```

(where `waveMeta` is `WAVE_META.find(w => w.id === wave.id)`)

Verify the build compiles. Commit message: "feat: add wave connector arrows and hover tooltips with card lists"
```
