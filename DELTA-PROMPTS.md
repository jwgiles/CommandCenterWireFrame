# Delta Correction Prompts — Paste into Claude Code in order

These prompts fix deviations found between the wireframe codebase and the three principal documents (updated PRD, Authority Gate Matrix, Duality Principle). Run these BEFORE executing the 12 build prompts in PROMPTS.md.

---

## Delta Prompt 1 of 7 — Replace CRM with FP&A as upstream authority

```
In src/App.jsx, the updated PRD specifies that FP&A (currently Smartsheet, transitioning to Anaplan) is the authoritative data source for Zones 1–3 — NOT CRM. CRM is no longer referenced as a primary upstream system. The data flow is: FP&A feeds Zones 1–3 gates → Command Center orchestrates → ERP is system of record for Zones 4+.

Find and replace every CRM reference in src/App.jsx. Here are the specific changes:

1. In MockQuickQuotes, find the button text "Export to CRM Opportunity" and change it to "Sync to FP&A Record".

2. In MockFinancialModel:
   - Find the KPI subtext "Unadjusted CRM Rev" and change to "FP&A Gross Revenue".
   - Find the table column header "CRM Gross Revenue" and change to "FP&A Gross Revenue".
   - Find the button text "Sync to Anaplan" and change to "Sync to FP&A".
   - Find the heading text "Anaplan Sync Payload (Time-Phased Output)" and change to "FP&A Sync Payload (Time-Phased Output)".
   - Find the heading text "Financial Handshake Simulator (O2S ↔ FP&A)" — this one is fine, keep it.

3. In the tourData array, find any transcript text referencing "CRM" and replace:
   - "CRM stage changes" → "FP&A commitment status changes"
   - "CRM opportunities" → "FP&A forecast entries"
   - Any other CRM references in tour transcripts → replace with FP&A

4. In the dark footer bar at the bottom, find any text like "ERP, CRM, or telematics systems" and change to "FP&A, ERP, scheduling, and dispatch systems".

5. Search the entire file for any remaining instances of the string "CRM" (case-sensitive). For each one found:
   - If it refers to upstream Zones 1–3 data source → replace with "FP&A"
   - If it refers to the actual CRM system as a downstream/transactional tool → leave it, but these should be rare

Do NOT modify any component names, state variable names, or structural logic. Only change user-facing label text and descriptions.

After making changes, verify there are no remaining "CRM" strings used as upstream authority labels by searching the file.

Commit message: "fix: replace CRM with FP&A as authoritative upstream source for Zones 1-3"
```

---

## Delta Prompt 2 of 7 — Add Smartsheet/Anaplan transition indicator

```
In src/App.jsx, the PRD states: "The FP&A system is currently maintained in Smartsheet as an interim solution. The enterprise has committed to maintaining the Smartsheet-based FP&A tool while Anaplan is being stood up as the permanent FP&A platform."

The wireframe needs to reflect this transition state rather than implying Anaplan is already live.

In MockFinancialModel, add a small transition indicator badge. Find the toolbar area of MockFinancialModel and add — next to the existing toolbar content — a small inline element:

```jsx
<div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded">
  <span>FP&A Source:</span>
  <span className="font-bold">Smartsheet</span>
  <span className="text-amber-400">→</span>
  <span className="text-amber-500">Anaplan (future)</span>
</div>
```

This badge should appear in the toolbar's rightArea, before or after the "Sync to FP&A" button (which was renamed in Delta Prompt 1).

Do not modify any other components.

Commit message: "fix: add Smartsheet-to-Anaplan transition indicator on FP&A sync view"
```

---

## Delta Prompt 3 of 7 — Add gate condition badges to all zone component toolbars

```
In src/App.jsx, the Authority Gate Matrix defines specific macro and micro gate names per zone. Every zone component toolbar should display the relevant gate condition so reviewers can trace each screen back to the governance framework.

Create a small reusable GateBadge component:

```jsx
const GateBadge = ({ macro, micro }) => (
  <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-mono">
    <Database className="w-3 h-3" />
    <span>Gate: <span className="text-slate-600 font-semibold">{macro}</span></span>
    {micro && <><span className="text-slate-300">|</span><span>{micro}</span></>}
  </div>
);
```

Then add GateBadge to the toolbar of every zone-specific mock component. Use these exact gate names from the Authority Gate Matrix:

| Component | Macro Gate | Micro Gate |
|-----------|-----------|------------|
| MockQuickQuotes | Forecast Exists | Demand Signal Categorized |
| MockMarginPlan | Active Pursuit | Pursuit Shaped |
| MockAssetDemandForecasting | Opportunity Created | Opportunity Qualified |
| MockFinancialModel | (no gate — cross-funnel output) | (omit GateBadge) |
| MockPrePopulation | Project Awarded | Baseline Populated |
| MockAdHocIntake | Plan Endorsed | Intent Refined |
| MockOptimizer | Preflight Passed | Request Pack Assembled |
| MockStrategicSourcing | Request Submitted | Request Routed & Acknowledged |
| MockBillingAnomaly | Closeout Recorded | Flywheel Feedback Complete |
| MockAssetLifecycle | (portfolio strategy — no zone gate) | (omit GateBadge) |
| MockCapexPlan | (portfolio strategy — no zone gate) | (omit GateBadge) |

Place the GateBadge in each component's Toolbar, typically in the leftArea after the existing zone/title label, or below the title as a second line. It should be subtle — not competing with the main title.

Commit message: "feat: add Authority Gate Matrix badge to all zone component toolbars"
```

---

## Delta Prompt 4 of 7 — Add duality callout to MockPrePopulation (Zone 4)

```
In src/App.jsx, the Duality Principle document states: "Every workflow card must reflect this three-sided dynamic." MockPrePopulation (Zone 4, V0 Baseline Review) currently shows a time-phased equipment grid but has NO representation of the happy path vs. constrained path consequences.

Add a duality callout bar BELOW the existing table in MockPrePopulation, inside the same container. The callout should appear after the table's tfoot and before the closing div of the main content area.

Design the callout as a two-column split:

```jsx
<div className="mx-4 mb-4 grid grid-cols-2 gap-4">
  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
      <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Happy Path</h4>
    </div>
    <p className="text-xs text-emerald-700 leading-relaxed">
      If project team confirms baseline within 10 business days, O2S secures preferred sourcing at MSA rates. Estimated savings vs. constrained path: <span className="font-bold font-mono">$21,400</span>.
    </p>
  </div>
  <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      <AlertTriangle className="w-4 h-4 text-rose-600" />
      <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider">Constrained Path</h4>
    </div>
    <p className="text-xs text-rose-700 leading-relaxed">
      If baseline remains unconfirmed, O2S begins constrained sourcing prep using baseline assumptions. Projected premium: <span className="font-bold font-mono">+22%</span> based on 14 similar historical projects.
    </p>
  </div>
</div>
<div className="px-4 pb-4">
  <p className="text-[10px] text-slate-400 italic">O2S operations will execute regardless. Early confirmation determines the cost position from which fulfillment occurs.</p>
</div>
```

Make sure CheckCircle2 and AlertTriangle are imported from lucide-react (they should already be in the imports).

Do not modify the existing table or toolbar in MockPrePopulation.

Commit message: "feat: add duality principle callout to Zone 4 V0 baseline review"
```

---

## Delta Prompt 5 of 7 — Add "Observed, not declared" lock indicator to shared Toolbar

```
In src/App.jsx, the Toolbar component is a shared component used by most mock screens. Add a persistent "Observed" indicator to reinforce the core principle that zone state is derived from system-of-record data, never manually declared.

Find the Toolbar component definition. It currently renders a flex container with leftArea and rightArea.

Modify it to include a small lock indicator between the left and right areas. Add Lock to the lucide-react import if not already present.

Updated Toolbar component:

```jsx
const Toolbar = ({ leftArea, rightArea, showObserved = true }) => (
  <div className="bg-white border-b border-slate-200 px-6 py-2 flex justify-between items-center shrink-0 text-sm">
    <div className="flex items-center gap-4">{leftArea}</div>
    <div className="flex items-center gap-3">
      {showObserved && (
        <div className="flex items-center gap-1 text-[9px] text-slate-400 italic" title="Zone state derived from system-of-record data — not manual status updates">
          <Lock className="w-3 h-3" />
          <span>Observed</span>
        </div>
      )}
      {rightArea}
    </div>
  </div>
);
```

Import Lock from lucide-react at the top of the file — add it to the existing import statement:

```jsx
import { ..., Lock, ... } from 'lucide-react';
```

For the portfolio-strategy components (MockAssetLifecycle, MockCapexPlan) that don't represent zone-gated screens, pass `showObserved={false}` to their Toolbar instances so the lock icon doesn't appear there.

All other components should show the lock icon by default (no prop change needed since default is true).

Commit message: "feat: add 'Observed, not declared' lock indicator to shared Toolbar"
```

---

## Delta Prompt 6 of 7 — Add FP&A → Command Center → ERP crosswalk to footer

```
In src/App.jsx, the wireframe needs to make the data flow architecture explicit. The updated PRD defines the crosswalk: FP&A is upstream authority for Zones 1–3, Command Center is the orchestration layer, ERP is the system of record for Zones 4+.

Find the dark footer bar at the bottom of the main layout (the one with the Monitor icon that says "Custom Frontend / Platform Level"). Replace its content with a more comprehensive architecture footer that includes the data flow crosswalk.

Replace the existing footer content with:

```jsx
<div className="mt-8 border-t-4 border-t-sky-500 bg-sky-900 text-white p-5 rounded-b-2xl shadow-lg">
  <div className="flex items-start gap-6">
    <div className="bg-sky-800 p-3 rounded-xl shrink-0"><Monitor className="w-6 h-6 text-sky-300" /></div>
    <div className="flex-1">
      <h3 className="font-bold text-lg text-sky-100 tracking-tight">O2S Command Center — Orchestration Layer</h3>
      <p className="text-sm text-sky-200 mt-1 leading-relaxed">Sits above FP&A, ERP, scheduling, and dispatch systems. Does not replace them. Doing the work creates the data.</p>
    </div>
  </div>
  <div className="mt-4 pt-4 border-t border-sky-700/50 grid grid-cols-5 gap-2 text-center">
    <div className="bg-sky-800/60 rounded-lg p-2.5">
      <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Zones 1–3</div>
      <div className="text-[10px] text-sky-300 font-semibold">FP&A</div>
      <div className="text-[9px] text-sky-400 mt-0.5">Smartsheet → Anaplan</div>
      <div className="text-[9px] text-sky-500 italic mt-1">READ forecast data</div>
    </div>
    <div className="bg-sky-800/60 rounded-lg p-2.5">
      <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-1">Zones 4–6</div>
      <div className="text-[10px] text-sky-300 font-semibold">ERP + P6</div>
      <div className="text-[9px] text-sky-400 mt-0.5">Award, Schedule, Finance</div>
      <div className="text-[9px] text-sky-500 italic mt-1">READ project data</div>
    </div>
    <div className="bg-sky-800/60 rounded-lg p-2.5">
      <div className="text-[10px] font-bold text-amber-300 uppercase tracking-widest mb-1">Zone 7</div>
      <div className="text-[10px] text-sky-300 font-semibold">ERP / Dispatch</div>
      <div className="text-[9px] text-sky-400 mt-0.5">Request Handoff</div>
      <div className="text-[9px] text-sky-500 italic mt-1">WRITE requests + orders</div>
    </div>
    <div className="bg-sky-800/60 rounded-lg p-2.5">
      <div className="text-[10px] font-bold text-rose-300 uppercase tracking-widest mb-1">Zone 8</div>
      <div className="text-[10px] text-sky-300 font-semibold">Dispatch / Logistics</div>
      <div className="text-[9px] text-sky-400 mt-0.5">Execution Systems</div>
      <div className="text-[9px] text-sky-500 italic mt-1">READ status + actuals</div>
    </div>
    <div className="bg-sky-800/60 rounded-lg p-2.5">
      <div className="text-[10px] font-bold text-purple-300 uppercase tracking-widest mb-1">Zone 9</div>
      <div className="text-[10px] text-sky-300 font-semibold">Flywheel</div>
      <div className="text-[9px] text-sky-400 mt-0.5">Templates + Scoring</div>
      <div className="text-[9px] text-sky-500 italic mt-1">WRITE recommendations</div>
    </div>
  </div>
</div>
```

This replaces the existing footer entirely. Do not modify any other part of the layout.

Commit message: "feat: add FP&A → Command Center → ERP data crosswalk to architecture footer"
```

---

## Delta Prompt 7 of 7 — Update PROMPTS.md build plan with delta amendments

```
In PROMPTS.md, we need to add amendment notes to the build prompts so that when they are executed later, they incorporate the corrections from the delta analysis. Do NOT rewrite the prompts — just add an amendment block at the top of each affected prompt.

Add the following amendments:

**At the very top of PROMPTS.md, before Prompt 1, add:**

---
> **⚠️ PRE-REQUISITE: Run all 7 Delta Correction Prompts (DELTA-PROMPTS.md) before executing these build prompts. The delta prompts fix CRM→FP&A references, add gate badges, duality callouts, the observed-lock indicator, and the data crosswalk footer.**
---

**Inside Prompt 1 (Navigation Shell), add at the end before the commit message:**

> **DELTA AMENDMENT:** All CRM references have been corrected to FP&A by Delta Prompt 1. The persona-to-artifact mapping should follow the definitive matrix in DELTA.md section D4. Key rules: Fit Score (Zone 2) goes to O2S Operations + Leadership only. Margin Plan (Zone 3) goes to Finance + Project Teams. Clarity Scoring (Zone 4–5) goes to Project Teams + O2S Operations + Finance. Quick Quotes (Zone 1–3) stays with Project Teams. Project Maturity (Zone 4–5) goes to all three non-Finance personas.

**Inside Prompt 3 (Zone 6–7), add at the end before the commit message:**

> **DELTA AMENDMENT:** MockFormalRequest must include a "Fulfillment Position" section showing how the clarity state at submission determines operations' sourcing strategy. Add: "Submitted at 68% avg clarity. 14 items fulfilling from strength (preferred sourcing). 8 items fulfilling from constraint (spot-market pricing)." Each line item should show a small badge: "Happy Path" (green) or "Constrained" (amber). This implements the Duality Principle requirement that every workflow card reflects the three-sided dynamic.

**Inside Prompt 4 (Zone 8), add at the end before the commit message:**

> **DELTA AMENDMENT:** MockExecutionDashboard must include a "Clarity Origin" tooltip on exception rows linking execution issues to upstream clarity gaps. Example: on the underutilized crane row, tooltip reads "Spec mismatch traces to Zone 5 clarity gap: load chart not provided until 3 weeks after deadline." This closes the loop from execution back to the duality dynamic and feeds the Zone 9 flywheel.

**Inside Prompt 8 (Clarity Scoring), add at the end before the commit message:**

> **DELTA AMENDMENT (3 additions):**
> 1. When a line item has clarity <50%, show an O2S Operations prep action: "O2S Response: Pre-positioning sourcing with baseline specs (constrained path). Estimated premium if clarity not provided by [date]: $X,XXX."
> 2. When a confidence penalty exists from a skipped upstream zone artifact (e.g., no Zone 3 Margin Plan), show a penalty badge: "Zone 3 Margin Plan not created — confidence penalty: -15%" with a resolution path: "Provide margin-relevant inputs in this tool to clear penalty. Forward resolution — Zone 4–5 captures at higher resolution." Do NOT show a "go back to Zone 3" link.
> 3. Add a visual distinction between soft gates (Zones 1–5, confidence penalty but no block) and the hard gate (Zone 6, must pass or remediate). Use a callout at the bottom: "Zones 1–5 apply confidence penalties for incomplete data. Zone 6 is a hard validation gate — items must pass preflight or be remediated before submission."

**Inside Prompt 9 (Fit Score), add at the end before the commit message:**

> **DELTA AMENDMENT:** All references to CRM as data source have been corrected to FP&A by Delta Prompt 1. Ensure the subtitle reads: "Opportunities flow from the FP&A committed forecast — the enterprise's one version of truth — and are evaluated here against O2S pillar capabilities." Not "originate in CRM."

**Inside Prompt 12 (Tour & Polish), add at the end before the commit message:**

> **DELTA AMENDMENT (3 additions):**
> 1. All CRM references in tour transcripts already corrected by Delta Prompt 1. Verify no CRM strings remain in tourData.
> 2. The "Observed" lock icon is already in the shared Toolbar via Delta Prompt 5. No additional work needed.
> 3. For non-Equipment pillar placeholder messages, include the pillar-specific duality example from the Duality Principle document: Equipment = "premium rental rates", Logistics = "compressed mobilization and higher GC/GR costs", Prefabrication = "lost fab slots and field rework", Procurement = "spot pricing and longer lead times", Professional Services = "rescheduled crews and delayed deliverables."

Do not modify the actual prompt content — only add the amendment blocks as described above, clearly marked with "> **DELTA AMENDMENT:**" formatting.

Commit message: "docs: add delta amendment notes to PROMPTS.md build plan"
```

---

## Execution Order

Run these 7 delta prompts FIRST, then proceed with the 12 build prompts from PROMPTS.md.

```
Delta Prompt 1 → CRM→FP&A text corrections (App.jsx)
Delta Prompt 2 → Smartsheet/Anaplan transition badge (App.jsx)
Delta Prompt 3 → Gate condition badges on all zone toolbars (App.jsx)
Delta Prompt 4 → Duality callout on Zone 4 baseline (App.jsx)
Delta Prompt 5 → "Observed" lock icon on shared Toolbar (App.jsx)
Delta Prompt 6 → FP&A→CC→ERP crosswalk footer (App.jsx)
Delta Prompt 7 → Amendment notes added to PROMPTS.md
         ↓
Then: Build Prompt 1 → 2 → 3 → ... → 12
```
