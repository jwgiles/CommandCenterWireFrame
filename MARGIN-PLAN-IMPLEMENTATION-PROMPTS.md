# Margin Plan — Implementation Prompts (Plan 2)

Each prompt below is scoped to a single commit. Execute them in order — each depends on the prior.

---

## Prompt 1 of 8 — Restructure the Data Model

```
In src/App.jsx inside the MockMarginPlan component (starts at line 193):

STEP 1: Add two new state variables immediately after `const [view, setView] = useState('margin');` (line 195):

  const [expandedLine, setExpandedLine] = useState(null);   // tracks which product line is open: 'Equipment-0', 'Procurement-2', etc.
  const [persona, setPersona] = useState('rsi');             // 'rsi' | 'leadership' | 'project'

STEP 2: Add a helper to toggle product line expansion, right after the existing togglePillar function (line 363):

  const toggleLine = (key) => setExpandedLine(prev => prev === key ? null : key);

STEP 3: On every product line object inside the `pillars[].lines[]` arrays (lines 231–292), add the following new fields. Use the values I provide below. Do NOT change any existing fields — only add new ones.

Equipment lines (lines 231–239):
  Fleet Vehicles:       state: 'confirmed', capacity: 'Available', deal: 'Strong', risk: 'Low', pursuitBasis: '12 fleet trucks × 24 mo @ $1,215/mo', rationale: 'Standard fleet package — fully committed per SOPAC yard schedule.'
  Owned-Equip GC/GR:   state: 'confirmed', capacity: 'Available', deal: 'Strong', risk: 'Low', pursuitBasis: 'Safety equip + VDC hardware, 24 mo on-site', rationale: 'Required for site safety compliance. Non-negotiable scope.'
  Owned-Equip Civil:    state: 'confirmed', capacity: 'Available', deal: 'Strong', risk: 'Low', pursuitBasis: '~14,000 production hrs civil earthwork @ $125/hr blended', rationale: 'Capacity confirmed via HCSS preliminary schedule. Nick Nolin assigned.'
  Owned-Equip Concrete: state: 'confirmed', capacity: 'Available', deal: 'Strong', risk: 'Low', pursuitBasis: '~21,000 production hrs concrete ops @ $125/hr blended', rationale: 'Deck, beam, vertical formwork all committed. Steve Lane running operations.'
  Owned-Equip Electrical: state: 'draft', capacity: 'Available', deal: 'Weak', risk: 'Low', pursuitBasis: 'Minimal electrical equip — scope TBD pending ductbank design', rationale: '0% capture — no owner commitment yet. Watching for RFP.'
  Vendor-sourced Re-rents: state: 'confirmed', capacity: 'Available', deal: 'Strong', risk: 'Low', pursuitBasis: 'Vendor bids received for crane, aerial, and specialty rentals', rationale: 'Vendor pricing locked. 30% margin target achievable.'
  Trade Partner Rental:    state: 'in-review', capacity: 'Available', deal: 'Moderate', risk: 'Low', pursuitBasis: 'CCERP/O2RP program — 75% capture of $3.5M TP rental volume', rationale: '75% capture assumes strong TP participation. Review with Johanna Gamboa.'
  IT / Computers:          state: 'confirmed', capacity: 'Available', deal: 'Strong', risk: 'Low', pursuitBasis: 'Jobsite IT infrastructure — computers, phones, network for 24 mo', rationale: 'Standard allocation. 70% margin on G&A pass-through.'
  Temporary Power:         state: 'draft', capacity: 'Available', deal: 'Moderate', risk: 'Low', pursuitBasis: 'Temp power scope — pending GC allocation decision', rationale: '0% capture currently. GC team evaluating self-perform vs 02S. Watching.'

Procurement lines (lines 248–250):
  EQUIP (EV Chargers):  state: 'in-review', capacity: 'Available', deal: 'Moderate', risk: 'Medium', pursuitBasis: '$17.5M EV charger spec — 20% capture target on procurement fee', rationale: 'Spec bid pending owner design finalization. Design interface risk on MEP coordination.'
  Commodity Purchase:    state: 'in-review', capacity: 'Available', deal: 'Moderate', risk: 'Low', pursuitBasis: 'Lumber + geofoam commodity buy — 75% capture on volume pricing', rationale: '75% probability — owner may direct-purchase some materials.'
  MEP Equipment (CFCI):  state: 'draft', capacity: 'Available', deal: 'Weak', risk: 'Medium', pursuitBasis: 'CFCI mechanical equipment procurement — $1.75M', rationale: '50% probability — design interface risk. CFCI scope depends on MEP subcontractor selection.'

Prefabrication lines (lines 259–261):
  Concrete Formwork:     state: 'confirmed', capacity: 'Constrained', deal: 'Strong', risk: 'Medium', pursuitBasis: '~42,000 production hrs formwork detailing + buildup @ $125/hr', rationale: 'Fully committed. Capacity constrained at $30M/yr plant throughput. Steel fab limited.'
  Steel Fabrication:     state: 'in-review', capacity: 'Constrained', deal: 'Strong', risk: 'Medium', pursuitBasis: 'Bollard fabrication — 50% capture of $7M scope', rationale: '75% probability. Plant capacity constrained. Need shop schedule confirmation from Dave Clarkson.'
  Electrical:            state: 'confirmed', capacity: 'Available', deal: 'Strong', risk: 'Low', pursuitBasis: '~2 miles 12kV ductbank prefab — conduit + encasement', rationale: 'Scope confirmed. Straightforward production run.'

Professional Services lines (lines 270–271):
  Mapping:    state: 'confirmed', capacity: 'Available', deal: 'Strong', risk: 'Low', pursuitBasis: 'Survey + mapping services — vendor bid received', rationale: 'Mapping confirmed. Sarah Jin assigned. Vendor pricing locked.'
  Controls:   state: 'draft', capacity: 'Available', deal: 'Weak', risk: 'Low', pursuitBasis: 'Controls scope TBD — awaiting owner RFP', rationale: '0% capture until owner RFP issued. Watching for scope definition.'

Logistics lines (lines 280–282):
  GC/GR Site Services:  state: 'confirmed', capacity: 'Available', deal: 'Strong', risk: 'Low', pursuitBasis: 'GC/GR site services — 75% capture of $875K scope', rationale: 'Straightforward logistics support. Fayad Faruk assigned.'
  Trucking / Freight:   state: 'confirmed', capacity: 'Available', deal: 'Strong', risk: 'Low', pursuitBasis: 'Freight hauling — vendor bid received, 75% capture', rationale: 'Vendor pricing locked. Low risk.'
  Fuel Depot:           state: 'confirmed', capacity: 'Available', deal: 'Strong', risk: 'Low', pursuitBasis: 'On-site fuel depot — vendor bid received, 75% capture', rationale: 'Johanna Gamboa managing. Vendor pricing locked.'

Other lines (line 291):
  Archive:  state: 'confirmed', capacity: 'N/A', deal: 'N/A', risk: 'None', pursuitBasis: 'Project archive — 100% pass-through', rationale: 'G&A allocation. No risk.'

STEP 4: Delete the entire `captureAnalysis` array (lines 297–304). This data is now embedded in the product line objects above.

Commit message: "refactor(margin-plan): restructure data model — embed risk/narrative/state into product lines, add persona and expandedLine state"
```

---

## Prompt 2 of 8 — Remove the Capture Analysis Tab

```
In src/App.jsx inside MockMarginPlan:

STEP 1: Change the view tab switcher from three tabs to two. Find the line that reads:
  {['margin', 'capture', 'utilization'].map(v => (
Replace it with:
  {['margin', 'utilization'].map(v => (

STEP 2: In the same button rendering block, the ternary that maps view keys to labels currently reads:
  {v === 'margin' ? 'Margin' : v === 'capture' ? 'Capture Analysis' : 'Utilization'}
Simplify it to:
  {v === 'margin' ? 'Margin Plan' : 'Utilization'}

STEP 3: In the KPI grid section (inside `<div className="grid grid-cols-4 gap-4">`), remove the entire `view === 'capture'` branch — the block that renders TAM Opportunity / Current Capture / Enterprise Goal / Gap to Goal KPI tiles.

Keep only the `view === 'margin'` and the else (utilization) branches.

STEP 4: Delete the entire `{view === 'capture' && ( ... )}` rendering block — this is the capture analysis table that shows Pillar / TAM / Capture Rate / Capacity / Deal Quality / Risk Flag / Narrative. Remove the entire block from the opening `{view === 'capture' && (` to its closing `)}`.

The margin view and utilization view blocks remain untouched.

Commit message: "refactor(margin-plan): remove Capture Analysis tab — risk/narrative data now lives in product line expansion panels"
```

---

## Prompt 3 of 8 — Build Click-to-Expand Expansion Panels on Product Line Rows

```
In src/App.jsx inside MockMarginPlan, this is the most significant change. The product line rows currently render as flat <tr> elements (the block starting with `{expanded[pillar.name] && pillar.lines.map((line, li) => (`). Transform each product line row into a clickable row that expands into a two-column planning panel — following the same structural pattern used by PlanningLineItem (the component starting around line 1220).

STEP 1: Replace the entire product line row rendering. Currently each line renders as a single <tr> with cells for name/source/tam/capture/revenue/cost/profit/margin/probability. Replace with:

For the COLLAPSED state — a <tr> that is clickable (onClick toggles expandedLine to `${pillar.name}-${li}`). The row should show:
  - Column 1 (name cell): The product line name. After the name, show a SMALL colored planning state dot:
    - 'confirmed' → green dot (bg-emerald-500)
    - 'in-review' → blue dot (bg-blue-500)
    - 'draft' → amber dot (bg-amber-500)
    - 'flagged' → rose dot (bg-rose-500)
    Also show a small risk indicator dot if risk is 'Medium' (amber) or 'High' (rose), positioned after the state dot.
    Do NOT show the source badge on the collapsed row (it moves into the expansion panel).
    Do NOT show the comment inline (it moves into the expansion panel).
  - Columns 2-8: Same financial columns as now (TAM, Capture, Revenue, Cost, Profit, Margin, Probability) — keep them unchanged.
  - Add a subtle expand affordance: a ChevronRight icon (w-3 h-3) at the far right of column 1 that rotates 90° when expanded.

For the EXPANDED state — when `expandedLine === '${pillar.name}-${li}'`, render a <tr> immediately after the collapsed row containing a single <td colSpan={8}> with the expansion panel inside:

The expansion panel has two columns side by side (flex, gap-6):

LEFT COLUMN (w-[60%]) — "Pursuit Planning":
  - Section header: "Pursuit Planning" in text-[10px] uppercase tracking-wider text-slate-500 font-semibold
  - Pursuit Basis field: A read-only styled block showing `line.pursuitBasis` in a bg-indigo-50 border border-indigo-100 rounded px-3 py-2 block. Label: "Pursuit Basis" in text-[10px] uppercase. This is the high-level "hours that create production" data.
  - Source Context: Below pursuit basis, a small line: "Initial estimate: {line.source}" in text-[9px] text-slate-400 — this replaces the old source badge.
  - Editable fields (following PlanningLineItem's form pattern):
    - TAM Opportunity: number input, defaultValue from line.tamOpp, with a label "TAM ($)"
    - Capture Rate: number input (percentage), defaultValue from line.capture * 100, label "Capture %"
    - Probability: number input (percentage), defaultValue from line.prob * 100, label "Probability %"
    - Profit Margin: number input (percentage), defaultValue from line.pct * 100, label "NOP Margin %"
  - Rationale field: A textarea (rows={3}), defaultValue from `line.rationale`, placeholder: "Why is this probability level set? What assumptions drive the capture rate?"
  - Use the same input styling as PlanningLineItem: text-xs border border-slate-200 rounded px-2 py-1.5 bg-slate-50 outline-none focus:border-indigo-400 font-mono (for numbers)

RIGHT COLUMN (w-[40%]) — "Risk & Opportunity":
  - Section header: "Risk & Opportunity" in same style
  - Three horizontal stat badges in a row:
    - Capacity: colored badge — Available (green), Constrained (amber), N/A (gray)
    - Deal Quality: colored badge — Strong (green), Moderate (amber), Weak (rose)
    - Risk: colored badge — Low (green), Medium (amber), High (rose), None (gray)
  - Three-tier NOP range block (styled like PlanningLineItem's Path Economics):
    - "Min NOP" row: show line.profit * 0.7 formatted with fmt() — left-bordered green
    - "Probable NOP" row: show line.profit formatted — left-bordered indigo
    - "Max NOP" row: show line.profit * 1.15 formatted — left-bordered emerald
    (These are illustrative ranges. Use 0.7× and 1.15× multipliers as wireframe placeholders.)
  - If line.comment exists, show it in a small italic note: text-[10px] text-slate-500 italic

ACTION BUTTONS (below both columns, border-t border-slate-100 pt-3 mt-3):
  - "Confirm Estimate" — px-4 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded
  - "Flag for Review" — px-4 py-1.5 bg-white text-rose-600 text-xs font-semibold rounded border border-rose-300
  - "Save Draft" — px-4 py-1.5 bg-white text-blue-600 text-xs font-semibold rounded border border-blue-300
  - Spacer (flex-grow)
  - "Cancel" — px-4 py-1.5 text-slate-500 text-xs font-semibold, onClick collapses the panel

All buttons should call e.stopPropagation() in their onClick. For the wireframe, the Confirm/Flag/Save buttons don't need to do anything beyond preventing propagation — no state mutation required yet.

Phase-aware note: At the bottom of the left column, add a small contextual note:
  <p className="text-[9px] text-indigo-400 italic mt-2">Pursuit Phase — High-level production estimates. Detailed specs expected at Pre-Award.</p>

IMPORTANT: The expansion panel should render inside a <tr><td colSpan={8}> so it spans the full table width. Give the outer td: className="p-0" and the inner panel div: className="bg-white px-6 py-4 border-l-4 border-indigo-200".

Commit message: "feat(margin-plan): add click-to-expand planning panels on product line rows — pursuit data, risk/opportunity, action buttons"
```

---

## Prompt 4 of 8 — Persona-Gate the Fee Structure Bar

```
In src/App.jsx inside MockMarginPlan:

STEP 1: The persona state variable was already added in Prompt 1. Now add a persona toggle to the toolbar. Find the rightArea prop of the <Toolbar> component. Inside the `<div className="flex items-center gap-3">` wrapper, BEFORE the view tab switcher, add a small persona selector:

  <div className="flex items-center gap-1.5 mr-2">
    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">View as:</span>
    <div className="flex bg-slate-100 p-0.5 rounded">
      {['rsi', 'leadership', 'project'].map(p => (
        <button key={p} onClick={() => setPersona(p)} className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded transition-all ${persona === p ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
          {p === 'rsi' ? 'RSI' : p === 'leadership' ? 'Leadership' : 'Project'}
        </button>
      ))}
    </div>
  </div>

STEP 2: Find the fee structure bar — it's the `<div className="bg-indigo-50 border border-indigo-100 rounded-md px-4 py-2 ...">` block. Wrap the ENTIRE fee structure div in a conditional:

  {(persona === 'rsi' || persona === 'leadership') && (
    <div className="bg-indigo-50 border border-indigo-100 rounded-md px-4 py-2 flex items-center justify-between">
      ... existing fee bar content ...
    </div>
  )}

STEP 3: Inside the fee bar, remove the amber "02S Only" badge. Find and delete this element:
  <span className="text-[8px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded font-semibold uppercase tracking-wider">02S Only</span>

The fee bar now renders clean and confident — no warning labels. It simply doesn't appear for the 'project' persona.

Commit message: "feat(margin-plan): persona-gate fee structure — visible to RSI/Leadership only, remove amber warning badge"
```

---

## Prompt 5 of 8 — Enrich Pillar Rows with Risk Indicators and Planning State

```
In src/App.jsx inside MockMarginPlan:

STEP 1: Modify the pillar-level collapsed row (the <tr> with onClick={() => togglePillar(pillar.name)}). Currently the first <td> shows only a chevron and the pillar name. After the pillar name text, add:

  a) Average probability badge: Calculate avgProb from pillar.lines and show it inline:
    const avgProb = pillar.lines.length > 0 ? pillar.lines.reduce((s, l) => s + l.prob, 0) / pillar.lines.length : 0;
    Render: <span className={`ml-2 text-[9px] font-bold px-1.5 py-0.5 rounded ${avgProb >= 0.9 ? 'bg-emerald-50 text-emerald-700' : avgProb >= 0.7 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>{Math.round(avgProb * 100)}% avg</span>

  b) Risk indicator: Find the worst risk among child lines. Use the new `risk` field on each line.
    const worstRisk = pillar.lines.some(l => l.risk === 'High') ? 'High' : pillar.lines.some(l => l.risk === 'Medium') ? 'Medium' : 'Low';
    Show a small dot: <span className={`w-2 h-2 rounded-full inline-block ml-1 ${worstRisk === 'High' ? 'bg-rose-500' : worstRisk === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />

  c) Planning state composition: Count lines in each state and show a tiny stacked indicator:
    const stateCounts = { confirmed: 0, 'in-review': 0, draft: 0, flagged: 0 };
    pillar.lines.forEach(l => { if (l.state && stateCounts[l.state] !== undefined) stateCounts[l.state]++; });
    Render right after the risk dot, a set of tiny blocks:
    <span className="flex items-center gap-px ml-2">
      {stateCounts.confirmed > 0 && <span className="w-1.5 h-3 bg-emerald-500 rounded-sm" title={`${stateCounts.confirmed} confirmed`} />}
      {stateCounts['in-review'] > 0 && <span className="w-1.5 h-3 bg-blue-500 rounded-sm" title={`${stateCounts['in-review']} in review`} />}
      {stateCounts.draft > 0 && <span className="w-1.5 h-3 bg-amber-400 rounded-sm" title={`${stateCounts.draft} draft`} />}
      {stateCounts.flagged > 0 && <span className="w-1.5 h-3 bg-rose-500 rounded-sm" title={`${stateCounts.flagged} flagged`} />}
    </span>

STEP 2: Replace the pillar row's Probability column value. Currently line 563 shows `—`. Replace it with:
  <td className="px-3 py-2 text-right font-mono">{pct(avgProb)}</td>
  (You'll need to compute avgProb inline or in the map callback. Move the avgProb calculation to be available at that point — you can compute it at the top of the pillars.map callback.)

STEP 3: Delete the entire "Pillar Probability Summary" section — the <div> that starts with <h3 className="text-sm font-bold text-slate-800 mb-3">Pillar Probability Summary</h3> and its parent container with the 3-column grid of SVG circular gauges. This entire block (from the <div> containing the h3 down through the closing </div> of the grid container) should be removed. The information is now inline on the pillar rows.

Commit message: "feat(margin-plan): enrich pillar rows — inline avg probability, risk dot, planning state bars; remove redundant probability summary gauges"
```

---

## Prompt 6 of 8 — Rename Profit/Margin Columns to NOP Terminology

```
In src/App.jsx inside MockMarginPlan:

STEP 1: In the margin table's <thead>, find the column headers array:
  {['Pillar / Product Line', 'TAM Opportunity', '% Capture', '02S Revenue', '02S Cost', 'Profit ($)', 'Margin %', 'Probability'].map(...)
Change it to:
  {['Pillar / Product Line', 'TAM Opportunity', '% Capture', '02S Revenue', '02S Cost', 'NOP ($)', 'NOP %', 'Probability'].map(...)

STEP 2: In the Totals row at the bottom of the table, no text changes needed — the values are computed the same way. The column header change handles the terminology.

That's it — small but important for consistency with the KPI tile that already says "Net Operating Profit."

Commit message: "fix(margin-plan): rename Profit/Margin columns to NOP terminology for consistency with KPI tile"
```

---

## Prompt 7 of 8 — Enhance the Utilization Tab with Financial Context

```
In src/App.jsx inside MockMarginPlan:

STEP 1: In the utilization table's <thead>, add a "Revenue" column. Change the headers array from:
  {['Product Line', 'Point of Contact', 'Status', 'Start', 'Finish', 'Duration', '% Complete'].map(...)
to:
  {['Product Line', 'Point of Contact', 'Revenue', 'Status', 'Start', 'Finish', 'Duration', '% Complete'].map(...)

STEP 2: Update the pillar group header row's colSpan from 7 to 8:
  <tr><td colSpan={8} className="bg-slate-100 font-bold ...">

STEP 3: In each utilization line row, add a Revenue cell after the POC cell. To get the revenue, cross-reference the utilization line name against the margin data. Since this is a wireframe, use a simple lookup approach:

  Before the utilizationData rendering block, build a lookup map:
    const revenueByLine = {};
    pillars.forEach(p => p.lines.forEach(l => { revenueByLine[l.name] = l.rev; }));

  Then in each line's <tr>, after the POC <td>, add:
    <td className="px-3 py-2 text-[10px] font-mono text-slate-500">{revenueByLine[line.name] ? fmt(revenueByLine[line.name]) : '—'}</td>

  The name matching won't be perfect for all lines (utilization has more granular names than margin in some cases), so the fallback '—' is fine for the wireframe.

STEP 4: In the subItem rows, update colSpan from 4 to 5 to account for the new column.

Commit message: "feat(margin-plan): add revenue column to utilization tab — connects financial weight to operational status"
```

---

## Prompt 8 of 8 — Phase-Aware Visual Cue on the Pursuit Stepper

```
In src/App.jsx inside MockMarginPlan:

STEP 1: Find the pursuit phase stepper in the toolbar leftArea (the block that maps over ['Go/No-Go', 'Pursuit', 'Pre-Award', 'Committed', 'Execution']). Currently `const activeIdx = 1;` is hardcoded. Keep it hardcoded at 1 for now (this is the Pursuit phase).

STEP 2: Below the stepper (still inside leftArea, after the closing </div> of the stepper flex container), add a small phase context note:

  <span className="text-[9px] text-indigo-400 font-medium ml-1 italic">High-level estimates — detail at Pre-Award</span>

This gives the RSI an always-visible reminder of what level of planning precision is expected at this phase. It's subtle — 9px italic indigo — and won't compete with the stepper itself.

STEP 3: The expansion panels built in Prompt 3 already include a phase note at the bottom of the left column. No additional changes needed there — this prompt just adds the global toolbar-level cue.

Commit message: "feat(margin-plan): add phase-aware context note to pursuit stepper — signals expected planning precision level"
```

---

## Execution Order Summary

| # | Commit | What Changes |
|---|--------|-------------|
| 1 | Data model restructuring | Adds state/capacity/deal/risk/pursuitBasis/rationale to every product line, adds persona + expandedLine state, deletes captureAnalysis array |
| 2 | Remove Capture Analysis tab | Two-tab switcher (Margin Plan / Utilization), delete capture KPIs and capture table |
| 3 | Click-to-expand panels | Product line rows become clickable → expansion panel with pursuit planning + risk/opportunity + action buttons |
| 4 | Persona-gate fee structure | Persona toggle in toolbar, fee bar hidden for 'project' persona, amber badge removed |
| 5 | Enrich pillar rows | Inline avg probability, risk dot, state composition bars; delete probability summary gauges section |
| 6 | NOP terminology | Rename "Profit ($)" → "NOP ($)", "Margin %" → "NOP %" in table headers |
| 7 | Utilization financial context | Add Revenue column cross-referenced from margin data |
| 8 | Phase-aware cue | Small italic note next to pursuit stepper |
