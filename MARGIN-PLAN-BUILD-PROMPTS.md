# Margin Plan Card Rebuild — Claude Code Prompts

Paste these prompts into Claude Code **in order**. Each produces one commit-sized change. They build on each other sequentially.

> **Context:** These prompts replace the existing `MockMarginPlan` component (currently lines 192–220 in `src/App.jsx`) with a production-faithful version grounded in the real 02S Project Plan for Disney Eastern PS. The reference spreadsheet is `02S Project Plan - Disney East PS.xlsx`. You do not need access to the spreadsheet — all required data is embedded in the prompts below.

---

## Prompt 1 of 5 — Data Model + Expandable Pillar Accordion Table

```
We are rebuilding the MockMarginPlan component in src/App.jsx. The current version (starts around line 192) is a minimal placeholder with 3 KPI tiles and a flat 5-row table using fake data. We need to replace it with a data-driven, expandable accordion table that mirrors the real O2S Margin Plan structure.

**What to change:**

Replace the entire MockMarginPlan component (from `const MockMarginPlan = () => (` through its closing `);`) with a new version built on the following real project data and structure.

**Data model — define this INSIDE the component as a const:**

```js
const marginData = {
  project: {
    jobNumber: '250030',
    name: 'Disney Eastern PS',
    contractValue: 350000000,
    market: 'Parking Structure',
    contractType: 'Lump-sum',
    deliveryMethod: 'Design / Build',
    constructionStart: '2026-06-01',
    constructionFinish: '2028-05-31',
    durationMonths: 24,
  },
  totals: {
    tamOpportunity: 50800000,
    captureRate: 0.5858,
    o2sRevenue: 29756250,
    o2sCost: 22293750,
    o2sProfit: 7462500,
    profitPct: 0.2508,
    baseFee: 10500000,
    baseFeePct: 0.03,
    selfPerformFee: 10500000,
    o2sShare: 7462500,
  },
  pillars: [
    {
      name: 'Equipment',
      packageValue: 11900000, captureRate: 0.8676, revenue: 10325000, cost: 5993750, profit: 4331250,
      profitPct: 0.4195,
      minProfit: 4331250, probableProfit: 4331250, maxProfit: 4331250,
      lines: [
        { name: 'Fleet Vehicles', pkgValue: 350000, capture: 1.0, rev: 350000, cost: 175000, profit: 175000, pct: 0.50, prob: 1.0, comment: 'Incl. job trucks' },
        { name: 'Owned-Equipment — GC / GR', pkgValue: 350000, capture: 1.0, rev: 350000, cost: 175000, profit: 175000, pct: 0.50, prob: 1.0, comment: 'Safety respect, VDC equipment' },
        { name: 'Owned-Equipment — Civil', pkgValue: 1750000, capture: 1.0, rev: 1750000, cost: 875000, profit: 875000, pct: 0.50, prob: 1.0 },
        { name: 'Owned-Equipment — Concrete', pkgValue: 2625000, capture: 1.0, rev: 2625000, cost: 1312500, profit: 1312500, pct: 0.50, prob: 1.0 },
        { name: 'Owned-Equipment — Electrical', pkgValue: 175000, capture: 0, rev: 0, cost: 0, profit: 0, pct: 0.50, prob: 0 },
        { name: 'Vendor-sourced Re-rents', pkgValue: 1750000, capture: 1.0, rev: 1750000, cost: 1225000, profit: 525000, pct: 0.30, prob: 1.0 },
        { name: 'Trade Partner Rental (CCERP / O2RP)', pkgValue: 3500000, capture: 0.75, rev: 2625000, cost: 1968750, profit: 656250, pct: 0.25, prob: 1.0 },
        { name: 'IT / Computers / Cell Phones', pkgValue: 875000, capture: 1.0, rev: 875000, cost: 262500, profit: 612500, pct: 0.70, prob: 1.0 },
        { name: 'Temporary Power', pkgValue: 525000, capture: 0, rev: 0, cost: 0, profit: 0, pct: 0.50, prob: 1.0 },
      ]
    },
    {
      name: 'Procurement',
      packageValue: 21000000, captureRate: 0.3125, revenue: 6562500, cost: 5731250, profit: 831250,
      profitPct: 0.1267,
      minProfit: 525000, probableProfit: 623437.5, maxProfit: 656250,
      lines: [
        { name: 'EQUIP (EV Chargers)', pkgValue: 17500000, capture: 0.20, rev: 3500000, cost: 2975000, profit: 525000, pct: 0.15, prob: 1.0, comment: 'EV Chargers' },
        { name: 'Commodity Purchase', pkgValue: 1750000, capture: 0.75, rev: 1312500, cost: 1181250, profit: 131250, pct: 0.10, prob: 0.75, comment: 'Lumber, geofoam' },
        { name: 'MEP Equipment (CFCI)', pkgValue: 1750000, capture: 1.0, rev: 1750000, cost: 1575000, profit: 175000, pct: 0.10, prob: 0.50 },
      ]
    },
    {
      name: 'Prefabrication',
      packageValue: 13000000, captureRate: 0.7308, revenue: 9500000, cost: 7812500, profit: 1687500,
      profitPct: 0.1776,
      minProfit: 1162500, probableProfit: 1556250, maxProfit: 1687500,
      lines: [
        { name: 'Concrete Formwork', pkgValue: 5250000, capture: 1.0, rev: 5250000, cost: 4200000, profit: 1050000, pct: 0.20, prob: 1.0 },
        { name: 'Steel Fabrication', pkgValue: 7000000, capture: 0.50, rev: 3500000, cost: 2975000, profit: 525000, pct: 0.15, prob: 0.75, comment: 'Bollards' },
        { name: 'Electrical', pkgValue: 750000, capture: 1.0, rev: 750000, cost: 637500, profit: 112500, pct: 0.15, prob: 1.0, comment: 'Approx. (2) miles of 12kV ductbank' },
      ]
    },
    {
      name: 'Professional Services',
      packageValue: 1750000, captureRate: 0.50, revenue: 875000, cost: 743750, profit: 131250,
      profitPct: 0.15,
      minProfit: 131250, probableProfit: 131250, maxProfit: 131250,
      lines: [
        { name: 'Mapping', pkgValue: 875000, capture: 1.0, rev: 875000, cost: 743750, profit: 131250, pct: 0.15, prob: 1.0 },
        { name: 'Controls', pkgValue: 875000, capture: 0, rev: 0, cost: 0, profit: 0, pct: 0.20, prob: 1.0 },
      ]
    },
    {
      name: 'Logistics',
      packageValue: 2625000, captureRate: 0.75, revenue: 1968750, cost: 1673437.5, profit: 295312.5,
      profitPct: 0.15,
      minProfit: 295312.5, probableProfit: 295312.5, maxProfit: 295312.5,
      lines: [
        { name: 'GC / GR Site Services', pkgValue: 875000, capture: 0.75, rev: 656250, cost: 557812.5, profit: 98437.5, pct: 0.15, prob: 1.0 },
        { name: 'Trucking / Freight', pkgValue: 875000, capture: 0.75, rev: 656250, cost: 557812.5, profit: 98437.5, pct: 0.15, prob: 1.0 },
        { name: 'Fuel Depot', pkgValue: 1750000, capture: 0.75, rev: 1312500, cost: 1115625, profit: 196875, pct: 0.15, prob: 1.0 },
      ]
    },
    {
      name: 'Other',
      packageValue: 525000, captureRate: 1.0, revenue: 525000, cost: 0, profit: 525000,
      profitPct: 1.0,
      minProfit: 525000, probableProfit: 525000, maxProfit: 525000,
      lines: [
        { name: 'Archive', pkgValue: 525000, capture: 1.0, rev: 525000, cost: 0, profit: 525000, pct: 1.0, prob: 1.0 },
      ]
    },
  ]
};
```

**Component structure:**

1. Use React `useState` to track which pillar rows are expanded: `const [expanded, setExpanded] = useState({});` — toggling a pillar name key between true/false.

2. **Toolbar** — use the existing `Toolbar` component:
   - leftArea: A `bg-indigo-600 text-white` badge showing the job number (`250030`), then the project name "Disney Eastern PS (Pursuit)", then a `GateBadge` with macro="Active Pursuit" micro="Pursuit Shaped".
   - rightArea: A small `text-xs font-mono text-slate-500` span: "Ver. 12/10/25"

3. **Project context strip** — immediately below the toolbar, a single horizontal bar (`bg-white border-b border-slate-200 px-6 py-2`) with small metadata chips: Contract Value: $350M | Market: Parking Structure | Lump-sum | Design / Build | Duration: 24 mo (Jun 2026 – May 2028). Style each as `text-[10px] text-slate-500` with the values in `font-semibold text-slate-700`.

4. **KPI row** — a `grid grid-cols-4 gap-4` using the existing `KPI` component:
   - TAM Opportunity: "$50.8M"
   - Capture Rate: "58.6%"
   - O2S Revenue: "$29.8M"
   - O2S Profit: "$7.46M" with trend="+25.1%" subtext="Operating Profit %"

5. **Pillar accordion table** — the main content area:
   - Table header row (styled like existing tables: `bg-slate-50 border-b text-[10px] uppercase tracking-wider text-slate-500`):
     Columns: Pillar / Product Line | Pkg Value | % Capture | O2S Revenue | O2S Cost | Profit ($) | Margin % | Probability

   - For each pillar in `marginData.pillars`, render a **summary row** that is clickable to toggle expansion:
     - Left cell: A `ChevronRight` icon (rotates 90° when expanded via `transition-transform`) + pillar name in `font-bold text-slate-800`
     - Financial cells: formatted with `font-mono` — dollar values as `$X.XXM` (divide by 1e6, 2 decimals), percentages as `XX.X%`
     - Profit cell: use `text-emerald-600` for positive values
     - The entire row has `cursor-pointer hover:bg-slate-100 bg-slate-50/50` styling

   - When expanded, render **child rows** for each `line` in that pillar:
     - Indented (add `pl-10` to the name cell)
     - Name in `text-slate-600` (not bold)
     - Same column alignment as parent
     - If the line has a `comment`, show it as a tiny `text-[9px] text-slate-400 italic` span after the name
     - Lines where `capture === 0` should show revenue/cost/profit cells as a dash "—" in `text-slate-300`

   - Below all pillars, a **totals row** with `border-t-2 border-slate-300 bg-slate-100 font-bold`:
     Show totals for Package Value ($50.8M), Revenue ($29.8M), Profit ($7.46M), and overall Margin % (25.1%)

6. **Helper for formatting:** Create a small inline helper:
   ```js
   const fmt = (v) => v === 0 ? '—' : `$${(v / 1e6).toFixed(2)}M`;
   const pct = (v) => v === 0 ? '—' : `${(v * 100).toFixed(1)}%`;
   ```

**Styling rules:**
- Match the existing wireframe's visual language exactly: slate backgrounds, mono fonts for numbers, emerald for profit, the existing Toolbar/KPI/Badge components.
- The table should be inside a `bg-white border border-slate-200 rounded-md shadow-sm` container.
- The entire component should be wrapped in `<div className="flex flex-col h-full bg-slate-50">` like every other mock component.
- Make sure the content area scrolls if needed: use `overflow-auto` on the main content `div`.

**Do NOT change:**
- The `renderWorkflowContent` switch case (`case 'margin': return <MockMarginPlan />;`)
- The `CARD_META` entry for margin
- The `WAVE_ASSIGNMENTS` entry for margin
- Any other component in the file

Commit message: "feat: rebuild MockMarginPlan with real Disney Eastern PS data model and expandable pillar accordion"
```

---

## Prompt 2 of 5 — Fee Structure Callout + Personnel Bar

```
We are enhancing the MockMarginPlan component that was rebuilt in the previous commit. We need to add two elements: a fee structure callout and a personnel accountability bar.

**What to add (inside the existing MockMarginPlan component):**

1. **Fee Structure Callout** — Add this between the KPI row and the pillar accordion table. It should be a single horizontal bar styled as a subtle callout:

   - Container: `bg-indigo-50 border border-indigo-100 rounded-md px-4 py-2 flex items-center justify-between`
   - Left side: A label "Fee Structure" in `text-[10px] uppercase tracking-wider font-semibold text-indigo-400`
   - Right side: Three inline metrics separated by a `w-px h-4 bg-indigo-200` divider:
     - "Base Fee: 3.0%" in `text-xs text-indigo-600 font-mono`
     - "Self Perform: 3.0%" in `text-xs text-indigo-600 font-mono`
     - "Total Fee Potential: $10.5M" in `text-xs font-bold text-indigo-700 font-mono`

2. **Personnel Bar** — Add this between the project context strip and the KPI row. It should show the three key roles:

   - Container: `flex items-center gap-6 px-6 py-1.5 bg-slate-50 border-b border-slate-100`
   - Three role chips, each as a `flex items-center gap-1.5` group:
     - A `Users` icon (size `w-3 h-3 text-slate-400`)
     - Role label in `text-[10px] text-slate-400 uppercase tracking-wider`: "VP Ops", "Ops Director", "Precon Lead"
     - Name in `text-[10px] font-semibold text-slate-600`: "Allen Lynn", "Halverson", "Yoder"
   - Separate each role chip with a `w-px h-3 bg-slate-200` divider (only between chips, not after the last one)

**Styling rules:**
- These are lightweight, informational elements — they should NOT compete visually with the KPI tiles or the main table
- Keep them compact; they add context without adding bulk
- Make sure `Users` is imported from lucide-react (it should already be imported; verify and add if missing)

**Do NOT change:**
- The pillar accordion table structure or data model
- The Toolbar or project context strip
- Any other component in the file

Commit message: "feat: add fee structure callout and personnel accountability bar to MarginPlan"
```

---

## Prompt 3 of 5 — Three-Tier Profit Risk Ribbon

```
We are adding a risk-adjusted profit visualization to the MockMarginPlan component. The real margin plan uses three profit tiers — Minimum, Probable, and Maximum — per pillar, driven by probability weighting. We need to make this visible.

**What to add:**

Add a new section between the fee structure callout and the pillar accordion table. This section visualizes the three-tier profit range.

1. **Section header**: `text-sm font-bold text-slate-800 mb-3` — "Profit Risk Envelope"

2. **Risk ribbon container**: `bg-white border border-slate-200 rounded-md shadow-sm p-4`

3. **For each pillar** in `marginData.pillars`, render a horizontal risk ribbon row:
   - Left label: Pillar name in `text-xs font-semibold text-slate-700 w-36 shrink-0`
   - Ribbon visualization: A horizontal bar area (the remaining width) that shows Min → Probable → Max as a range:
     - Calculate the global max across all pillars' `maxProfit` values. Use this as the 100% width reference.
     - For each pillar:
       - Render a `h-5 bg-slate-100 rounded-full relative` container at full width
       - Inside it, an `absolute` bar from the min position to max position: `bg-indigo-100 rounded-full h-full`
       - The left edge of the colored bar = `(minProfit / globalMax) * 100` %
       - The right edge = `(maxProfit / globalMax) * 100` %
       - A solid dot or marker at the probable position: a `w-2 h-2 rounded-full bg-indigo-600 absolute top-1/2 -translate-y-1/2` at `left: ${(probableProfit / globalMax) * 100}%`
       - If min === max (no spread), still show the bar but as a solid indigo line
   - Right labels: Three values in a `flex gap-4 text-[10px] font-mono shrink-0 w-64`:
     - "Min: $X.XXM" in `text-slate-400`
     - "Probable: $X.XXM" in `text-indigo-600 font-semibold`
     - "Max: $X.XXM" in `text-slate-800`
   - Each row should have `flex items-center gap-3 py-1.5 border-b border-slate-50 last:border-0`

4. **Totals row** below all pillar ribbons:
   - Sum of all minProfits, probableProfits, maxProfits
   - Display as: "Total Envelope: $X.XXM — $X.XXM — $X.XXM" in `text-xs font-semibold text-slate-700 pt-2 border-t border-slate-200 mt-1`
   - Add a small legend below: three inline items showing the dot (indigo circle), "Min" (slate), "Probable" (indigo), "Max" (dark) in `text-[9px] text-slate-400 flex items-center gap-4 mt-2`

**Interaction with the accordion table:**
- The risk ribbon is a separate section above the table, not embedded inside it
- They share the same data model (`marginData.pillars`) so they are always in sync

**Styling rules:**
- This should feel like a compact analytical visualization, not a chart
- Use the existing indigo color language associated with the Margin Plan card
- The ribbons should be visually proportional — Equipment's ribbon should be visibly wider than Professional Services because its profit is ~33x larger

**Do NOT change:**
- The pillar accordion table
- The data model
- Any other component

Commit message: "feat: add three-tier profit risk ribbon visualization to MarginPlan"
```

---

## Prompt 4 of 5 — Utilization Plan Toggle Overlay

```
We are adding the utilization plan as a toggleable view layer inside the MockMarginPlan component. The margin plan spreadsheet bundles a utilization plan alongside it — this prompt makes that visible.

**What to add:**

1. **View toggle** — Add a segmented control in the Toolbar's rightArea (alongside the existing version text). Two options:
   - "Margin" (default active)
   - "Utilization"
   Use `useState` to track the active view: `const [view, setView] = useState('margin');`
   Style the toggle as a `flex bg-slate-200 p-0.5 rounded-md` container with two buttons, each `px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all`. Active state: `bg-white text-indigo-700 shadow-sm`. Inactive: `text-slate-500 hover:text-slate-700`.

2. **Utilization data** — Add this data model alongside the existing `marginData` const:

```js
const utilizationData = [
  { pillar: 'Equipment', lines: [
    { name: 'Fleet Vehicles', poc: 'Jocelyn Palafox', status: 'Not Started', start: '2026-06-01', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'Owned-Equipment — GC / GR', poc: null, status: 'Not Started', start: '2026-06-01', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0,
      subItems: [
        { name: 'Water Truck', poc: 'Ismael Delgado', tamCapture: 150000 },
        { name: 'UTV', poc: 'Ismael Delgado', tamCapture: 250000 },
      ]
    },
    { name: 'Owned-Equipment — Civil', poc: 'Nick Nolin', status: 'Not Started', start: '2026-06-01', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0, tamCapture: 1750000 },
    { name: 'Owned-Equipment — Concrete', poc: 'Steve Lane', status: 'Started', start: '2026-06-01', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0,
      subItems: [
        { name: 'Deck & Beam Rental', poc: 'Steve Lane', tamCapture: 1000000 },
        { name: 'Vertical Formwork', poc: 'Steve Lane', tamCapture: 750000 },
        { name: 'Place & Finish', poc: 'Mario Delgado', tamCapture: 250000 },
      ]
    },
    { name: 'Vendor-sourced Re-rents', poc: 'Nichole Gutierrez', status: 'Not Started', start: '2026-06-01', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'Trade Partner Rental (CCERP / O2RP)', poc: 'Johanna Gamboa', status: 'Not Started', start: '2026-06-01', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'IT / Computers / Cell Phones', poc: 'Jocelyn Palafox', status: 'Not Started', start: '2026-06-01', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'Temporary Power', poc: 'Fayad Faruk', status: 'Not Started', start: '2026-06-01', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
  ]},
  { pillar: 'Logistics', lines: [
    { name: 'GC / GR Site Services', poc: 'Fayad Faruk', status: 'Not Started', start: '2026-05-31', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'Trucking / Freight', poc: 'Fayad Faruk', status: 'Not Started', start: '2026-06-01', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'Fuel Depot', poc: 'Johanna Gamboa', status: 'Not Started', start: '2026-06-01', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
  ]},
  { pillar: 'Procurement', lines: [
    { name: 'EV Chargers', poc: 'TBD', status: 'Not Started', start: '2026-06-01', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'Lumber', poc: 'Alex Nieves', status: 'Not Started', start: '2026-06-02', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'High Density Foam', poc: 'Alex Nieves', status: 'Not Started', start: '2026-06-03', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'MEP Equipment (CFCI)', poc: null, status: 'Not Started', start: '2026-06-01', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'Small Tools', poc: 'Carlos Jimenez', status: 'Not Started', start: '2026-06-02', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
  ]},
  { pillar: 'Prefabrication', lines: [
    { name: 'Concrete Formwork — Detailing', poc: 'Jeff Rambo', status: 'Not Started', start: '2026-06-02', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'Concrete Formwork — Deck & Beam Buildup', poc: 'Steve Lane', status: 'Not Started', start: '2026-06-02', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'Concrete Formwork — Capitols', poc: 'Steve Lane', status: 'Not Started', start: '2026-06-03', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'Concrete Formwork — Spandrel', poc: 'Steve Lane', status: 'Not Started', start: '2026-06-04', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'Steel Fabrication — Bollards', poc: 'Dave Clarkson', status: 'Not Started', start: '2026-06-02', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'Electrical — 12kV Ductbank', poc: 'TBD', status: 'Not Started', start: '2026-06-03', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
  ]},
  { pillar: 'Professional Services', lines: [
    { name: 'Mapping', poc: 'Sarah Jin', status: 'Not Started', start: '2026-06-01', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
    { name: 'Controls', poc: null, status: 'Not Started', start: '2026-06-01', finish: '2028-05-31', durationMo: 24, remainingMo: 24, pctComplete: 0 },
  ]},
];
```

3. **Utilization view rendering** — When `view === 'utilization'`, replace the risk ribbon + accordion table area with a utilization-focused table. Keep the project context strip, personnel bar, and KPI row visible in both views.

   The utilization table structure:
   - Header columns: `Product Line | Point of Contact | Status | Start | Finish | Duration | % Complete`
   - Group rows by pillar (use pillar name as a section header row: `bg-slate-100 font-bold text-xs text-slate-700 px-3 py-2 border-b border-slate-200`)
   - For each line:
     - Product Line: `text-xs text-slate-700`
     - POC: `text-xs font-semibold text-slate-600` — if null, show "TBD" in `text-slate-400 italic`; if "TBD", show in `text-amber-600 italic`
     - Status: Use the existing `Badge` component:
       - "Not Started" → `variant="gray"`
       - "Started" → `variant="blue"`
       - "Complete" → `variant="green"`
     - Start / Finish: `text-[10px] font-mono text-slate-500` — format as "Jun 2026" (month abbreviation + year)
     - Duration: `text-[10px] font-mono text-slate-500` — show as "24 mo"
     - % Complete: Render as a mini progress bar:
       - Container: `w-16 h-1.5 bg-slate-200 rounded-full`
       - Fill: `bg-indigo-500 rounded-full h-full` at the appropriate width percentage
       - Value label to the right: `text-[10px] font-mono text-slate-500 ml-1` showing "0%", "50%", etc.
     - If a line has `subItems`, show them as indented child rows (`pl-8`) with just name, poc, and tamCapture (formatted as `$XXXk`)

   - Table container: Same styling as the margin table — `bg-white border border-slate-200 rounded-md shadow-sm`

4. **KPI row adaptation** — When in utilization view, swap the 4 KPI tiles for utilization-relevant ones:
   - "Total Product Lines": count of all lines across all pillar groups (e.g., "28")
   - "Assigned POCs": count of lines where poc is not null and not "TBD" (e.g., "18")
   - "In Progress": count of lines where status === "Started" (e.g., "1")
   - "Avg % Complete": average of all pctComplete values (e.g., "0%")

**Styling rules:**
- The view toggle should feel like a native tab switch — the card content area smoothly swaps
- Both views should scroll independently if content overflows
- The utilization table should feel operational / tracking-oriented vs. the financial tone of the margin view

**Do NOT change:**
- The data model for `marginData`
- The risk ribbon or accordion table (they just hide when utilization view is active)
- Any other component in the file

Commit message: "feat: add utilization plan toggle view to MarginPlan with personnel and status tracking"
```

---

## Prompt 5 of 5 — Downstream FP&A Sync Alignment

```
We are aligning the MockFinancialModel (FP&A Sync) component's mock data with the Margin Plan data that was rebuilt in the previous commits. Currently the two cards use independent fake data — they should tell a coherent story using the same project.

**What to change in MockFinancialModel (starts around line 1567):**

1. **Replace the `data` array** (the pipeline table rows, currently around line 1568–1573) with this data that includes the Disney Eastern PS project as the anchor row:

```js
const data = [
  { id: '250030', name: 'Disney Eastern PS', zone: 'Zone 3', stage: 'Active Pursuit', gross: 29756250, conf: 0.80, cost: 22293750 },
  { id: 'OPP-822', name: 'Data Center TX', zone: 'Zone 6', stage: 'Preflight', gross: 8200000, conf: 0.90, cost: 5400000 },
  { id: 'OPP-441', name: 'Healthcare Facility C', zone: 'Zone 5', stage: 'Intent Refinement', gross: 4500000, conf: 0.70, cost: 2300000 },
  { id: 'OPP-210', name: 'Logistics Hub NV', zone: 'Zone 3', stage: 'Margin Plan', gross: 6800000, conf: 0.45, cost: 2200000 },
];
```

Note: The Disney project's `gross` is $29.76M (O2S Revenue from the margin plan), `conf` is 0.80 (reflecting Zone 3 Active Pursuit confidence), and `cost` is $22.29M (from the margin plan).

2. **Replace the `timePhased` array** (currently around line 1574–1580) with data grounded in the Disney project's actual quarterly burn from the Summary sheet:

```js
const timePhased = [
  { month: 'Q3 2026', gross: 4825366, adj: 1519795, cost: 1138300 },
  { month: 'Q4 2026', gross: 8028196, adj: 3202830, cost: 2399000 },
  { month: 'Q1 2027', gross: 11441580, adj: 4569244, cost: 3422200 },
  { month: 'Q2 2027', gross: 13634808, adj: 5446335, cost: 4079000 },
  { month: 'Q3 2027', gross: 14168508, adj: 5661403, cost: 4239400 },
  { month: 'Q4 2027', gross: 12604362, adj: 5041745, cost: 3775000 },
];
```

3. **Update the 4 KPI tiles** at the top of MockFinancialModel (currently around line 1585–1589):
   - "Total Pipeline (Gross)": Update value to "$49.26M" and subtext to "FP&A Gross Revenue (4 projects)"
   - "Risk-Adjusted Revenue": Update value to "$34.97M" and trend to "-29.0%" and subtext to "Zone-weighted yield"
   - "O2S Planned Cost Basis": Update value to "$32.19M" and subtext to "From Margin Plans & Intent"
   - "Blended Adj. Margin": Update value to "7.9%" and trend to "-2.1%" and subtext to "vs AOP Target (10%)"

4. **Update the FP&A Source badge** in the Toolbar (currently around line 1583): No change needed — "Smartsheet → Anaplan (future)" is still correct.

5. **Update the time-phased table header** (currently line 1632): Change "Fiscal Period" to "Quarter" since we're now showing quarterly data instead of monthly.

**Visual cue for the anchor project:**
In the pipeline table, add a visual highlight to the Disney Eastern PS row: give the `<tr>` a `bg-indigo-50/50 border-l-2 border-indigo-400` styling to visually connect it to the Margin Plan card's indigo color language. This signals "this row is the one you just saw in the Margin Plan."

**Do NOT change:**
- The MockMarginPlan component
- The structure or layout of MockFinancialModel — only swap data values
- Any other component in the file
- The table column structure (keep Opportunity ID, Project Name, Zone & Stage, FP&A Gross Revenue, Zone Confidence Multiplier, Risk-Adjusted Revenue, O2S Planned Cost, Adj. Margin $)

Commit message: "feat: align FP&A Sync mock data with Margin Plan actuals for Disney Eastern PS"
```

---

## Post-Build Verification

After running all 5 prompts, verify in the browser:

1. **Margin Plan card** (Finance & FP&A persona → Equipment → Zones 1–3): Should show the full Disney Eastern PS project with expandable pillar accordion, fee callout, personnel bar, risk ribbon, and utilization toggle.
2. **FP&A Sync card** (same persona/zone group): Should show Disney Eastern PS as the highlighted anchor row in the pipeline table, with quarterly burn data in the time-phased table.
3. **Cross-card coherence**: The Margin Plan's O2S Revenue ($29.76M) should match the FP&A Sync's gross revenue for the Disney row. The profit story should be consistent.
