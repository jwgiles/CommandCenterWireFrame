# Margin Plan Card — Stakeholder Feedback Prompts

**Source:** Meeting with Vernan Ibong & Maryia Petlich (April 10, 2026)
**Target:** `MockMarginPlan` component in `src/App.jsx` (starts at line 192, ends at line 586)

Paste these prompts into Claude Code **in order**. Each one is scoped to a single commit.

---

## Prompt 1 of 8 — Rename "Package Value" to "TAM Opportunity" everywhere

```
In src/App.jsx, find the MockMarginPlan component (starts around line 192).

Stakeholder feedback: The first column in the pillar table currently says "Pkg Value" in the header and uses a data key called `packageValue` on each pillar and `pkgValue` on each product line. The stakeholder wants this renamed to "TAM Opportunity" everywhere so the terminology is consistent between the KPI header tile (which already says "TAM Opportunity") and the table below it.

Changes needed:

1. In the table header array around line 480, change 'Pkg Value' to 'TAM Opportunity'.

2. In each pillar object inside the `pillars` array (lines ~223-293), rename the key `packageValue` to `tamOpportunity`.

3. In each product line object inside each pillar's `lines` array, rename the key `pkgValue` to `tamOpp`.

4. Update ALL references to these renamed keys throughout the component:
   - The pillar summary row that renders `fmt(pillar.packageValue)` should become `fmt(pillar.tamOpportunity)`
   - The expanded child rows that render `fmt(line.pkgValue)` should become `fmt(line.tamOpp)`
   - The totals row that sums `pillars.reduce((s, p) => s + p.packageValue, 0)` should use `tamOpportunity`

5. Do NOT change any other column names, KPI labels, or styling. Only the "Package Value" → "TAM Opportunity" rename.

Commit message: "rename Package Value to TAM Opportunity for terminology consistency"
```

---

## Prompt 2 of 8 — Fix the O2S Profit KPI display (Net Operating Profit clarity)

```
In src/App.jsx, find the MockMarginPlan component's margin-view KPI tiles (around line 406-413).

Stakeholder feedback: The current O2S Profit KPI tile shows `trend="+25.1%"` which looks like a delta/comparison to something else. The stakeholder clarified this is just a positive 25.1% net operating profit margin — it's not a comparison. Also, the profit shown must be understood as Net Operating Profit (inclusive of G&A), not gross profit. The "+25.1%" formatting confused the stakeholder.

Changes needed:

1. Find the KPI tile that currently reads:
   <KPI label="O2S Profit" value="$7.46M" trend="+25.1%" subtext="Operating Profit %" />

2. Replace it with:
   <KPI label="02S Net Operating Profit" value="$7.46M" subtext="25.1% NOP (incl. G&A)" />

   Remove the `trend` prop entirely — the percentage is not a trend, it's the margin rate. Move it into the subtext where it reads as a descriptor, not a delta.

3. Do NOT change the other three KPI tiles (TAM Opportunity, Capture Rate, O2S Revenue).

Commit message: "clarify O2S Profit KPI as Net Operating Profit, remove misleading trend indicator"
```

---

## Prompt 3 of 8 — Add Source Data tags to product lines in the margin table

```
In src/App.jsx, find the MockMarginPlan component's margin data model and table rendering.

Stakeholder feedback: Each equipment product line's data originates from a known source system (GCGR template, HCSS estimate, WinEst, etc.). The stakeholder wants a visible indicator showing where the data comes from, so project teams are reminded they're already doing the work in these systems. Display this as a small tag/badge next to each product line name in the expanded rows.

Changes needed:

1. Add a `source` key to each product line object in the `lines` arrays inside the pillar data. Use these source assignments:

   Equipment pillar lines:
   - Fleet Vehicles → 'GCGR'
   - Owned-Equipment — GC / GR → 'GCGR'
   - Owned-Equipment — Civil → 'HCSS'
   - Owned-Equipment — Concrete → 'WinEst'
   - Owned-Equipment — Electrical → 'Estimate'
   - Vendor-sourced Re-rents → 'Vendor Bid'
   - Trade Partner Rental (CCERP / O2RP) → 'CCERP'
   - IT / Computers / Cell Phones → 'G&A'
   - Temporary Power → 'GCs'

   Procurement pillar lines:
   - EQUIP (EV Chargers) → 'Spec Bid'
   - Commodity Purchase → 'Estimate'
   - MEP Equipment (CFCI) → 'CFCI'

   Prefabrication pillar lines:
   - Concrete Formwork → 'WinEst'
   - Steel Fabrication → 'Shop Bid'
   - Electrical → 'Estimate'

   Professional Services pillar lines:
   - Mapping → 'Vendor Bid'
   - Controls → 'TBD'

   Logistics pillar lines:
   - GC / GR Site Services → 'GCGR'
   - Trucking / Freight → 'Vendor Bid'
   - Fuel Depot → 'Vendor Bid'

   Other pillar lines:
   - Archive → 'G&A'

2. In the expanded product line rows (around line 504-518), right after the line name and comment display, add the source tag. Render it as:
   {line.source && (
     <span className="ml-2 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-slate-200 text-slate-500 rounded">
       {line.source}
     </span>
   )}

   Place this inside the first <td> cell, after the comment span, still within the same cell.

3. Do NOT add a source column header — this is an inline badge, not a new column.

Commit message: "add source data tags to product lines per stakeholder request"
```

---

## Prompt 4 of 8 — Add Capture Analysis as a third tab/view

```
In src/App.jsx, find the MockMarginPlan component.

Stakeholder feedback: The percent capture rate is driven by two factors — (1) capacity to service, and (2) deal quality (owner agreement, commercial terms, risk appetite). The stakeholder wants a way to see and eventually capture the *narrative* behind why capture is what it is. He suggested percent capture gets its own dedicated view. This also addresses his request for a Risks & Opportunities section.

Changes needed:

1. The component currently has `const [view, setView] = useState('margin');` and toggles between 'margin' and 'utilization'. Add a third view option: 'capture'.

2. In the view toggle buttons (around line 368-373), add the third option. The toggle currently maps over `['margin', 'utilization']`. Change it to `['margin', 'capture', 'utilization']` and use these labels:
   - 'margin' → 'Margin'
   - 'capture' → 'Capture Analysis'
   - 'utilization' → 'Utilization'

3. Add a KPI row for the capture view. When `view === 'capture'`, show these 4 KPIs:
   - "TAM Opportunity" → "$50.8M"
   - "Current Capture" → "58.6%"
   - "Enterprise Goal" → "45.0%" with subtext "5-Year Target"
   - "Gap to Goal" → "+13.6pp" with subtext "Above target on this project"

4. Below the KPIs, render a new capture analysis table. Use a `<div>` with the same white bg / border / shadow pattern as the margin table. The table should have these columns:
   - Pillar (left-aligned)
   - TAM Opportunity (right-aligned, use fmt())
   - Capture Rate (right-aligned, use pct())
   - Capacity (right-aligned — hardcode as a text assessment)
   - Deal Quality (right-aligned — hardcode as a text assessment)
   - Risk Flag (right-aligned)
   - Narrative (left-aligned, wider column)

5. Add a `captureAnalysis` array to the data model with one entry per pillar. Use this data:

   { pillar: 'Equipment', capacity: 'Available', deal: 'Strong', risk: 'Low', narrative: 'Full fleet deployment supported by SOPAC yard. Civil capacity confirmed via HCSS.' },
   { pillar: 'Procurement', capacity: 'Available', deal: 'Moderate', risk: 'Medium', narrative: 'EV Charger spec bid pending owner design finalization. MEP equipment CFCI at 50% probability — design interface risk.' },
   { pillar: 'Prefabrication', capacity: 'Constrained', deal: 'Strong', risk: 'Medium', narrative: 'Steel fab limited to $30M/yr plant capacity. Concrete formwork fully committed. Electrical ductbank scope confirmed.' },
   { pillar: 'Professional Services', capacity: 'Available', deal: 'Weak', risk: 'Low', narrative: 'Mapping confirmed. Controls scope not yet defined — 0% capture until owner RFP.' },
   { pillar: 'Logistics', capacity: 'Available', deal: 'Strong', risk: 'Low', narrative: 'Site services and freight straightforward. Fuel depot vendor pricing locked.' },
   { pillar: 'Other', capacity: 'N/A', deal: 'N/A', risk: 'None', narrative: 'Archive — pass-through at 100% margin.' },

6. Pull the TAM Opportunity and Capture Rate values from the existing `pillars` array data (tamOpportunity and captureRate keys) so the table stays in sync.

7. Style the Capacity column values with color coding:
   - 'Available' → text-emerald-600
   - 'Constrained' → text-amber-600
   - 'N/A' → text-slate-400

8. Style the Deal Quality column:
   - 'Strong' → text-emerald-600
   - 'Moderate' → text-amber-600
   - 'Weak' → text-rose-500
   - 'N/A' → text-slate-400

9. Style the Risk Flag column:
   - 'Low' → green Badge
   - 'Medium' → yellow/amber Badge
   - 'High' → red Badge
   - 'None' → gray Badge

10. Make the narrative column use `whitespace-normal` so it wraps, and set a `max-w-xs` on it.

Commit message: "add Capture Analysis tab with capacity, deal quality, and risk narrative"
```

---

## Prompt 5 of 8 — Add pursuit phase indicator to the card header

```
In src/App.jsx, find the MockMarginPlan component's Toolbar leftArea (around line 357-364).

Stakeholder feedback: The margin plan evolves through pursuit phases — from quick fit score at go/no-go, through detailed planning during pursuit, to committed margin at bid day, then execution tracking post-award. The wireframe should show where this plan currently sits in that lifecycle.

Changes needed:

1. After the GateBadge in the Toolbar's leftArea, add a pursuit phase step indicator. Use this markup:

   <div className="flex items-center gap-0.5 ml-2">
     {['Go/No-Go', 'Pursuit', 'Pre-Award', 'Committed', 'Execution'].map((phase, i) => {
       const activeIdx = 1; // "Pursuit" is active for Disney Eastern PS
       const isActive = i === activeIdx;
       const isPast = i < activeIdx;
       return (
         <React.Fragment key={phase}>
           {i > 0 && <div className={`w-3 h-px ${isPast ? 'bg-indigo-400' : 'bg-slate-300'}`} />}
           <div className={`px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded ${
             isActive ? 'bg-indigo-600 text-white' : isPast ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'
           }`}>
             {phase}
           </div>
         </React.Fragment>
       );
     })}
   </div>

2. This goes INSIDE the leftArea fragment, after the existing GateBadge component and before the closing </>.

3. Do NOT remove or modify any existing elements in the leftArea.

Commit message: "add pursuit phase step indicator to margin plan header"
```

---

## Prompt 6 of 8 — Simplify the Profit Risk Envelope into a Probability gauge

```
In src/App.jsx, find the MockMarginPlan component's "Profit Risk Envelope" section (around lines 435-475).

Stakeholder feedback: The min/probable/max horizontal ribbon visualization was confusing. The stakeholder said "I don't understand what the bars mean." He wants to keep things simple — probability is the metric people already know. Don't introduce new terminology like "risk envelope." Replace it with a straightforward per-pillar probability indicator.

Changes needed:

1. Replace the entire "Profit Risk Envelope" section (the <div> starting with `<h3 className="text-sm font-bold text-slate-800 mb-3">Profit Risk Envelope</h3>` through its closing </div> around line 475) with a simpler "Pillar Probability Summary" section:

   <div>
     <h3 className="text-sm font-bold text-slate-800 mb-3">Pillar Probability Summary</h3>
     <div className="bg-white border border-slate-200 rounded-md shadow-sm p-4">
       <div className="grid grid-cols-3 gap-3">
         {pillars.map((p) => {
           const avgProb = p.lines.length > 0
             ? p.lines.reduce((s, l) => s + l.prob, 0) / p.lines.length
             : 0;
           const linesWithRisk = p.lines.filter(l => l.prob < 1.0);
           return (
             <div key={p.name} className="flex items-center gap-3 p-2 rounded-md bg-slate-50">
               <div className="relative w-10 h-10 shrink-0">
                 <svg viewBox="0 0 36 36" className="w-10 h-10 -rotate-90">
                   <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                   <circle cx="18" cy="18" r="15.9" fill="none" stroke={avgProb >= 0.9 ? '#10b981' : avgProb >= 0.7 ? '#f59e0b' : '#ef4444'} strokeWidth="3" strokeDasharray={`${avgProb * 100} ${100 - avgProb * 100}`} strokeLinecap="round" />
                 </svg>
                 <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-slate-700">{Math.round(avgProb * 100)}%</span>
               </div>
               <div>
                 <div className="text-xs font-semibold text-slate-700">{p.name}</div>
                 <div className="text-[9px] text-slate-400">
                   {linesWithRisk.length === 0
                     ? 'All lines at 100%'
                     : `${linesWithRisk.length} line${linesWithRisk.length > 1 ? 's' : ''} below 100%`
                   }
                 </div>
               </div>
             </div>
           );
         })}
       </div>
     </div>
   </div>

2. This replaces the entire Risk Envelope block. Do NOT change the table or any other section.

Commit message: "replace confusing Risk Envelope with simple Pillar Probability Summary gauges"
```

---

## Prompt 7 of 8 — Add enterprise TAM capture goal to the Capture Rate KPI

```
In src/App.jsx, find the MockMarginPlan component's margin-view KPI tiles (around line 406-413).

Stakeholder feedback: The stakeholder wants the enterprise TAM capture goal (45%) visible alongside the project-level capture rate (58.6%) so RSIs always see the target they're building toward. Like a meeting agenda that always starts with the completion date — it's a constant reminder of the goal.

Changes needed:

1. Find the KPI tile that currently reads:
   <KPI label="Capture Rate" value="58.6%" />

2. Replace it with:
   <KPI label="Capture Rate" value="58.6%" subtext="Enterprise Goal: 45%" />

3. That's it — one line change. Do NOT modify any other KPI tiles.

Commit message: "add enterprise TAM capture goal to Capture Rate KPI"
```

---

## Prompt 8 of 8 — Add caution note to Fee Structure bar

```
In src/App.jsx, find the MockMarginPlan component's Fee Structure bar (around lines 425-434).

Stakeholder feedback: The stakeholder flagged the fee structure display and said "we've got to be really careful on how we show this" — specifically whether it's an enterprise fee structure or an 02S fee structure, and that it could lead to gaming behavior. We need to add a clarifying label and consider persona-gating it in the future.

Changes needed:

1. Find the Fee Structure bar. It currently starts with:
   <div className="bg-indigo-50 border border-indigo-100 rounded-md px-4 py-2 flex items-center justify-between">

2. Add a small info/caution indicator after the "Fee Structure" label. Change the left side from:
   <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-400">Fee Structure</span>

   To:
   <div className="flex items-center gap-2">
     <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-400">Fee Structure</span>
     <span className="text-[8px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded font-semibold uppercase tracking-wider">02S Only</span>
   </div>

3. This clarifies that the fee structure shown is 02S-specific, not enterprise-wide, addressing the stakeholder's concern. The amber color signals "pay attention to scope."

4. Do NOT change any of the fee values or the right side of the bar.

Commit message: "add 02S scope clarifier to fee structure bar per stakeholder caution"
```

---

## Summary of All Commits (in order)

| # | Commit | Addresses |
|---|--------|-----------|
| 1 | Rename Package Value → TAM Opportunity | Vernan: terminology consistency, full volume capture |
| 2 | Clarify O2S Profit as NOP | Vernan: "+25.1%" confused as delta, must be net operating profit |
| 3 | Add Source Data tags | Vernan: show where data comes from (GCGR, HCSS, WinEst, etc.) |
| 4 | Add Capture Analysis tab | Vernan: capture narrative, risks & opportunities, capacity vs deal quality |
| 5 | Add pursuit phase indicator | Vernan: margin plan evolves through phases |
| 6 | Replace Risk Envelope with Probability gauges | Vernan: "I don't understand what the bars mean" — simplify |
| 7 | Add enterprise goal to Capture Rate | Vernan: always remind teams of the 45% stretch target |
| 8 | Add scope clarifier to Fee Structure | Vernan: "be careful how we show this" — clarify 02S vs enterprise |
