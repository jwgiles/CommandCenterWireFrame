# V1 Project Planning Tool — Build Prompts

Each prompt below is scoped to a single commit. Paste them sequentially into Claude Code. Each builds on the prior commit.

Reference document: `V1-PROJECT-PLANNING-APPROACH.md` in this same repo.

---

## Prompt 1 of 8 — Mock Data & Scaffold

```
Read the file `V1-PROJECT-PLANNING-APPROACH.md` in this repo for full context on what we're building. Then read `src/App.jsx` to understand the existing component patterns (Badge, KPI, DenseTable, Toolbar, GateBadge) and the mock component conventions used throughout (e.g., MockPrePopulation, MockClarityScoring, etc.).

YOUR TASK: Create the mock data layer and empty scaffold for `MockProjectPlanning` — the V1 replacement for `MockPrePopulation`.

1. **Mock data.** Above the component, create a `PROJECT_PLANNING_DATA` const. This is the heart of the wireframe — the data has to feel real and be internally consistent. Model it after the Disney Eastern PS project context from `MARGIN-PLAN-REDESIGN.md` (same repo). Structure:

```js
const PROJECT_PLANNING_DATA = {
  project: {
    name: 'Disney Eastern PS',
    jobNumber: '250030',
    contractValue: '$350M',
    market: 'Parking Structure',
    zone: 4,
    vpOps: 'Allen Lynn',
    opsDirector: 'Halverson',
    preconLead: 'Yoder',
  },
  packages: [
    {
      id: 'pkg-earthwork',
      name: 'Earthwork & Site Prep',
      items: [
        {
          id: 'li-001',
          type: 'Loaders',
          model: '950 Front End Loader',
          spec: null,                    // null = missing, string = confirmed
          qty: 2,
          qtyConfirmed: false,
          state: 'baseline',             // baseline | in-review | planned | flagged
          path: 'at-risk',              // happy | at-risk | constrained
          clarity: { qty: true, spec: false, schedule: true },
          costHappy: 10000,
          costConstrained: 14500,
          urgencyScore: 74,
          leadTimeRemaining: '5 weeks',
          scope: 'Phase 1 Mass Grading',
          crew: 'Civil Crew Alpha — 8 operators',
          utilization: [1.0, 1.0, 1.0, 0.5, 0, 0, 0, 0],
          rationale: null,
          flagReason: null,
          source: 'Template',
        },
        // ... more items
      ]
    },
    // ... more packages
  ]
};
```

Create 4 packages with 3–5 items each (~15 items total). Make the data tell a realistic story:
- "Earthwork & Site Prep" — mostly planned/happy path items, one at-risk missing spec
- "Structural Steel Support" — mixed states, includes a tower crane that is CONSTRAINED (urgency 95, spec missing, 2 weeks lead time, crew dependency on Iron Workers). This should be the loudest item in the whole table.
- "MEP Rough-In Equipment" — mostly baseline, several items missing schedule, moderate urgency
- "Temporary Facilities" — mostly planned, low urgency, a few items still baseline

Use realistic equipment types: tower cranes, crawler cranes, forklifts, manlifts, boom lifts, scissor lifts, welders, generators, light plants, compressors, connex boxes, temp power distribution units. Use realistic monthly rates ($600–$45,000 range). Utilization arrays are 8 months (Oct 2026 – May 2027).

Urgency scores: 0–100. Higher = more critical. The tower crane should be 95. Temp facilities connex boxes should be ~15. Spread the rest believably.

2. **Scaffold `MockProjectPlanning`.** Create the component shell:
   - Uses the existing `Toolbar` component with: project name + job number on the left, "Zone 4–5: Project Equipment Plan" label, and the existing `GateBadge` pattern.
   - A pillar tab bar below the toolbar: `Equipment (active)`, `Logistics`, `Prefabrication`, `Procurement`, `Professional Services`. Only Equipment is interactive; others show "(Coming Soon)" on click.
   - The main content area renders a placeholder `<div>` that says "Line items render here" for now.
   - At the bottom, render a `PillarFooter` strip showing: total items count, "Happy Path Total: $X" vs "Constrained Path Total: $Y" (computed from the mock data), and a disabled "Submit to Preflight" button.

3. **Wire it into the app.** In `renderWorkflowContent`, change the `case 'prepop': case 'prepop-ops':` to return `<MockProjectPlanning />` instead of `<MockPrePopulation />`. Keep `MockPrePopulation` defined in the file (don't delete it) — just stop routing to it.

4. **Update CARD_REGISTRY.** Change the `prepop` entry title from `'V0 Baseline Review'` to `'Project Equipment Plan'` and update description to: `'Plan, confirm, and refine project equipment needs. Wraps scope, crew, and schedule around each line item with live clarity tracking and path visibility.'`

Do NOT delete MockPrePopulation. Do NOT modify any other Mock components. Commit message: "feat: scaffold MockProjectPlanning with mock data and pillar tab shell"
```

---

## Prompt 2 of 8 — State Composition Strip & Pillar Summary

```
Read `V1-PROJECT-PLANNING-APPROACH.md` for context, then read the current `MockProjectPlanning` component in `src/App.jsx`.

YOUR TASK: Build the **state composition strip** and **pillar summary bar** that sit between the pillar tab bar and the line item content area.

1. **State Composition Strip.** A horizontal segmented bar (full width, ~8px tall, rounded) showing the proportion of line items in each state. Calculate counts from the mock data:
   - Baseline → dashed-style segment, amber-500
   - In Review → solid segment, blue-500
   - Planned → solid segment, emerald-500
   - Flagged → solid segment, rose-500

   Below the bar, render small labels: "X Baseline · Y In Review · Z Planned · W Flagged" using matching colors. This should feel like a progress indicator — how much of the plan is still assumptions vs. confirmed.

2. **Pillar Summary KPIs.** A row of 4 compact KPI tiles (reuse the existing `KPI` component pattern or create a similar compact variant):
   - **Items Planned:** "X / Y" (confirmed vs total) with a % subtext
   - **Happy Path Exposure:** Dollar total of all items currently on happy path. Green text.
   - **Constrained Premium:** Dollar total of (costConstrained - costHappy) for all constrained + at-risk items. Rose text. This is the cost of the information gaps.
   - **Avg Clarity Score:** Computed as % of all clarity fields that are true across all items. E.g., if 15 items × 3 fields = 45 total, and 30 are true, show "67%".

3. **Sort/Filter Bar.** Below the KPIs, render a toolbar-style row with:
   - Left side: "Sort by:" label followed by toggle-style buttons: `Criticality` (default/active), `Gap Type`, `Path Status`, `State`
   - Right side: A filter dropdown stub labeled "All Packages ▾" (non-functional for now — just visual)

   The active sort button should have the indigo highlight style used elsewhere in the app (`bg-indigo-100 text-indigo-600 font-semibold`). Inactive buttons: `bg-white text-slate-500 border border-slate-200`.

   Wire the sort buttons to a `useState` for `activeSort`. When `activeSort` changes, the mock data should actually re-sort:
   - `criticality`: sort by `urgencyScore` descending (default)
   - `gap-type`: group items by which clarity field is false (MISSING_SPEC items first, then MISSING_SCHEDULE, then MISSING_QTY, then all-clear)
   - `path`: constrained first, then at-risk, then happy
   - `state`: baseline first, then in-review, then flagged, then planned

   The sort operates across ALL packages — meaning in "criticality" mode, the tower crane from "Structural Steel Support" should appear at the very top of the entire list regardless of its package, and packages should be ordered by their highest-urgency child.

Commit message: "feat: add state composition strip, pillar KPIs, and sort/filter bar to Project Planning"
```

---

## Prompt 3 of 8 — Line Item Rows

```
Read `V1-PROJECT-PLANNING-APPROACH.md` (sections 5 and 6 especially) and the current `MockProjectPlanning` in `src/App.jsx`.

YOUR TASK: Replace the placeholder content area with the actual **line item table rows** — the core of the planning tool.

Each line item row is a single table row (or flex row) that is information-dense but scannable. Left to right, each row contains:

1. **State Indicator** — a 4px left border on the row:
   - `baseline`: dashed left border, amber-400 (use a CSS trick: `border-left: 4px dashed` via inline style or a utility class)
   - `in-review`: solid left border, blue-400
   - `planned`: solid left border, emerald-400
   - `flagged`: solid left border, rose-400

2. **Urgency Score** — a compact circular badge (24×24px) showing the numeric score (0–100). Color it:
   - 80–100: rose-500 bg, white text
   - 50–79: amber-500 bg, white text
   - 0–49: slate-200 bg, slate-600 text

3. **Equipment Info** — two lines:
   - Line 1: `type` in font-medium + `model` in text-slate-500 (e.g., "Loaders — 950 Front End Loader")
   - Line 2: `scope` in text-[10px] text-slate-400 italic (e.g., "Phase 1 Mass Grading")

4. **Clarity Chips** — three small inline chips for Qty, Spec, Schedule:
   - True: emerald chip with checkmark icon (use CheckCircle2 at w-3 h-3)
   - False: amber chip with AlertTriangle icon (w-3 h-3), slightly bolder/louder to draw the eye
   - Format: `Qty ✓` or `Spec ⚠` — the text label + icon, 10px font, tight padding

5. **Path Indicator + Cost Delta** — a compact cell showing:
   - Happy: green dot + "HP" + "$0" in slate-400
   - At Risk: amber dot + "AR" + "+$X projected" in amber-600 font-mono
   - Constrained: rose dot + "CP" + "+$X premium" in rose-600 font-mono font-bold
   - The cost delta = `costConstrained - costHappy` for at-risk and constrained items

6. **Crew** — text-[10px] showing the crew name, or "—" with slate-300 if null

7. **Utilization Mini-Bar** — a compressed inline heatmap (8 tiny cells, ~12px each, inline-flex). Same color logic as the existing MockPrePopulation heatmap:
   - 1.0 = emerald-200 fill
   - 0.5 = amber-200 fill
   - 0 = no fill (slate-50 or transparent)
   - If the item's state is `baseline`, render the fills with a subtle diagonal stripe pattern (CSS `background: repeating-linear-gradient(...)`) to visually distinguish baseline assumptions from confirmed utilization

8. **State Label** — a small `Badge` (reuse existing Badge component):
   - baseline: gray variant, text "BASELINE"
   - in-review: blue variant, text "IN REVIEW"
   - planned: green variant, text "PLANNED"
   - flagged: red variant, text "FLAGGED"

Build this as a sub-component `PlanningLineItem` that takes an item object as a prop. Render all items from the sorted data (respecting the activeSort state from Prompt 2).

Do NOT add expand/collapse yet — that comes in Prompt 5. These are collapsed rows only.

The table header row should label the columns: (empty for state border) | # | Equipment | Clarity | Path / Delta | Crew | Utilization | Status

Commit message: "feat: build PlanningLineItem rows with state, clarity, path, and utilization"
```

---

## Prompt 4 of 8 — Package Grouping with Rollup Headers

```
Read the current `MockProjectPlanning` in `src/App.jsx`, particularly the line item rows from the previous commit.

YOUR TASK: Wrap line items in **collapsible package groups** with summary rollup headers.

1. **Package Header Row.** Each package renders a clickable header row that is visually distinct from line items (slightly darker bg, `bg-slate-50 border-b-2 border-slate-200`). The header contains:

   Left side:
   - Chevron icon (ChevronRight when collapsed, ChevronDown when expanded) — 16px, slate-400
   - Package name in `font-semibold text-sm text-slate-800` (e.g., "Structural Steel Support")
   - Item count badge: "5 items" in a subtle `Badge` gray variant

   Center:
   - **Mini state composition bar** — same segmented bar pattern from the pillar-level strip, but tiny (100px wide, 4px tall), showing the state distribution for THIS package's items only

   Right side:
   - **Package path summary** — compact text: "3 HP · 1 AR · 1 CP" using green/amber/rose colored text respectively
   - **Package premium exposure** — the sum of (costConstrained - costHappy) for all non-happy items in this package, displayed as "+$X,XXX" in rose-600 font-mono if > 0, or "$0 exposure" in emerald-600 if all items are happy

2. **Collapse behavior.** Use a `useState` map keyed by package id to track which packages are expanded. Default: all expanded. Clicking the header toggles. When collapsed, line items within that package are hidden. The header is always visible.

3. **Sort interaction with packages.** This is critical:
   - When sorting by `criticality`, packages themselves are ordered by the HIGHEST urgency score among their children. Within each package, items are sorted by urgency descending. This means "Structural Steel Support" (which has the 95-urgency tower crane) appears first.
   - When sorting by `gap-type`, `path`, or `state`, packages are still ordered by their most-critical child under that lens (e.g., sorting by `path` puts the package with constrained items first).
   - The package rollup numbers always reflect the FULL package regardless of sort — never hide items within a package due to sort. Sort only controls ordering.

4. **Visual rhythm.** Add 12px vertical spacing between package groups. The first package should have no top margin. The last package should have 12px bottom margin before the footer.

Commit message: "feat: add collapsible package groups with rollup headers and sort-aware ordering"
```

---

## Prompt 5 of 8 — Inline Expansion & Refinement Panel

```
Read `V1-PROJECT-PLANNING-APPROACH.md` (section 10: Interaction Patterns) and the current `MockProjectPlanning` in `src/App.jsx`.

YOUR TASK: Add the **inline expansion panel** that appears when a user clicks a line item row. This is the core planning interaction — where the project team confirms, refines, or flags an item.

1. **Expand/collapse.** Add a `useState` tracking which line item ID is currently expanded (only one at a time). Clicking a line item row toggles its expansion. Clicking a different row collapses the previous and expands the new one.

2. **Expansion panel layout.** When expanded, a panel slides open below the row (same width, indented slightly with 16px left padding to align under the equipment info column). The panel has a white background with a subtle left border matching the item's state color. It contains:

   **Left column (60% width) — Refinement Form:**
   - **Quantity:** A row with label "Qty" + a small numeric input (pre-filled with item.qty) + a toggle/checkbox "Confirmed" (checked if item.qtyConfirmed)
   - **Specification:** A row with label "Spec" + a text input (pre-filled with item.spec or placeholder "Enter exact specification...") + clarity indicator (green check if item.spec is non-null, amber warning if null)
   - **Schedule:** A row with label "Need Date" + a date-style text input (placeholder "YYYY-MM-DD") + label "Demob Date" + date-style text input. These are display-only mock inputs, not functional date pickers.
   - **Scope Link:** A row with label "Scope" + a mock dropdown showing item.scope (or "Select scope element..." placeholder). Just render it as a styled div that looks like a select — no real dropdown.
   - **Crew Link:** Same pattern as scope: label "Crew" + mock dropdown showing item.crew or placeholder "Assign labor crew..."
   - **Rationale:** A textarea (3 rows, full width) with placeholder "Explain your confidence level... (e.g., 'Specs confirmed per structural package Rev 3')" Pre-filled with item.rationale if non-null.

   **Right column (40% width) — Path Economics:**
   - A compact card showing the item's path economics:
     - "Happy Path" row: monthly rate at MSA pricing (`$${item.costHappy.toLocaleString()}/mo`), source "MSA / Internal Fleet", with a green left border
     - "Constrained Path" row: monthly rate at spot pricing (`$${item.costConstrained.toLocaleString()}/mo`), source "Spot Market / Rush", with a rose left border
     - "Monthly Premium" row: the delta, bold, rose text if > 0
     - "Lead Time Remaining" row: item.leadTimeRemaining in a badge (green if > 4 weeks, amber if 2–4, rose if < 2)
   - Below the card: a small text note: "O2S operations will execute regardless. Early confirmation determines the cost position." — italic, 10px, slate-400 (this echoes the PRD's core philosophy)

3. **Action buttons.** At the bottom of the expansion panel, a row of buttons:
   - "Confirm & Plan" — emerald bg, white text. This is the primary action (transitions to `planned` state).
   - "Save as In Review" — blue outline. Saves progress without full confirmation.
   - "Flag Issue" — rose outline. Opens a reason selector (mock: just show a text like "Client undecided | Design in flux | Regulatory hold").
   - "Cancel" — slate text, no bg.

   These buttons don't need to actually mutate state (that's Prompt 6). For now, just render them styled correctly.

Commit message: "feat: add inline expansion panel with refinement form and path economics"
```

---

## Prompt 6 of 8 — Wire State Transitions

```
Read the current `MockProjectPlanning` in `src/App.jsx`. This prompt makes the planning tool interactive.

YOUR TASK: Wire the action buttons from the expansion panel to actually mutate item state, and make the entire view respond to those changes.

1. **Lift mock data into state.** Convert `PROJECT_PLANNING_DATA` from a const into a `useState` within `MockProjectPlanning`. The initial value is a deep clone of the const data. All reads now come from state; all mutations use the setter.

2. **"Confirm & Plan" button handler:**
   - Sets item.state to `'planned'`
   - Sets item.path to `'happy'` (confirming clarity puts the item on the best path)
   - Sets all item.clarity fields to `true`
   - Collapses the expansion panel
   - The row should immediately re-render with a solid emerald left border, green clarity chips, and "HP" path indicator

3. **"Save as In Review" button handler:**
   - Sets item.state to `'in-review'`
   - Collapses the expansion panel
   - Row re-renders with solid blue left border and "IN REVIEW" badge

4. **"Flag Issue" button handler:**
   - Sets item.state to `'flagged'`
   - Sets item.flagReason to a hardcoded "Client undecided" (we're not building a real picker)
   - Sets item.path to `'constrained'`
   - Collapses the expansion panel
   - Row re-renders with solid rose left border, "FLAGGED" badge, and "CP" path indicator

5. **Rollup recalculation.** After any state change:
   - The state composition strip recalculates
   - The pillar KPIs recalculate (items planned count, happy path exposure, constrained premium, avg clarity)
   - Package headers recalculate their mini-bars and path summaries
   - Sort order recalculates (a newly-planned item's urgency drops; a flagged item's urgency might increase)

6. **Visual feedback.** When an item transitions state, add a brief visual pulse: the row should briefly flash with a bg highlight color matching its new state (emerald-50 for planned, rose-50 for flagged, blue-50 for in-review), then fade back to normal. Use a simple CSS transition or a brief className toggle with a setTimeout.

7. **"Cancel" button:** Simply collapses the expansion panel without any state change.

Test the flow: open the highest-urgency item (the tower crane), click "Confirm & Plan," watch it drop in the sort order and the KPIs update. Then open a baseline item, click "Flag Issue," watch it turn rose with the constrained path indicator.

Commit message: "feat: wire state transitions with live rollup recalculation and visual feedback"
```

---

## Prompt 7 of 8 — Project-Level Toolbar & Pillar Tab Stubs

```
Read the current `MockProjectPlanning` in `src/App.jsx`.

YOUR TASK: Enhance the toolbar with project-level context and build out the non-Equipment pillar tab stubs.

1. **Enhanced Toolbar.** Replace the current toolbar content with a two-row header:

   **Row 1 — Project Identity Bar** (compact, single line):
   - Left: Job Number badge (`250030` in a monospace indigo badge), Project Name ("Disney Eastern PS"), Contract Value ("$350M"), Market badge ("Parking Structure" in gray Badge)
   - Right: Key Personnel in small text: "VP Ops: Lynn · Ops Dir: Halverson · Precon: Yoder", followed by the existing zone observed lock icon

   **Row 2 — Zone Context Bar** (below Row 1, slightly different bg `bg-emerald-50 border-b border-emerald-200`):
   - Left: A green dot + "Zone 4–5: Baseline & Intent" in emerald-700 font-semibold + the GateBadge showing macro: "Project Awarded" and micro: "Baseline Populated"
   - Right: The aggregate cross-pillar summary: "Equipment: 68% planned · Logistics: — · Prefab: — · Procurement: — · ProSvcs: —" (only equipment has a real number, others show dashes since they're not active yet)

2. **Pillar Tab Stubs.** When any non-Equipment tab is clicked, replace the content area with a "Coming Soon" panel for that pillar. Each stub should show:
   - Pillar name as a heading
   - "Planning tool for [Pillar] is in development."
   - A section titled "Clarity Dimensions for [Pillar]:" followed by a list of that pillar's specific clarity metrics:
     - **Logistics:** Site Services Scope, Mobilization Timeline, Transport Requirements, Permit Status
     - **Prefabrication:** Design Package Status, Fab Slot Availability, Cross-Discipline Dependencies, Material Lead Times
     - **Procurement:** Material Quantities, Specification Completeness, Vendor Sourcing Path, Aggregation Eligibility
     - **Professional Services:** Survey Scope Definition, Site Access Windows, Deliverable Format, Crew Scheduling

   - A note at the bottom: "The planning tool will use the same sort-by-criticality, Happy Path / Constrained Path, and Baseline → Planned state model as the Equipment tab — tailored to these pillar-specific clarity dimensions."

3. **Active tab styling.** The active tab should have: `border-b-2 border-emerald-500 text-emerald-700 font-semibold bg-white`. Inactive tabs: `text-slate-500 hover:text-slate-700 hover:bg-slate-50`. Non-Equipment tabs should show a small `(Soon)` label in slate-400 next to their name.

Commit message: "feat: add project identity toolbar, zone context bar, and pillar tab stubs"
```

---

## Prompt 8 of 8 — Polish & Utilization Detail

```
Read the current `MockProjectPlanning` in `src/App.jsx`. This is the final polish pass.

YOUR TASK: Refine the visual density, add the utilization schedule detail, and ensure the whole component feels like a production planning tool.

1. **Utilization Schedule (expanded view enhancement).** In the expansion panel (right column), below the path economics card, add a "Utilization Schedule" section showing the full 8-month heatmap with month labels:

   ```
   Oct  Nov  Dec  Jan  Feb  Mar  Apr  May
   [1.0][1.0][1.0][0.5][ — ][ — ][ — ][ — ]
   ```

   - Each cell is 36×28px with the utilization value inside (font-mono, 10px)
   - Color logic matches the mini-bar but larger: 1.0 = emerald-100 with emerald-700 text, 0.5 = amber-100 with amber-700 text, 0 = slate-50 with slate-300 dash
   - If item.state === 'baseline', overlay cells with diagonal stripes (subtle CSS pattern) and add a small legend: "▤ Baseline assumption — not yet confirmed against scope/schedule"
   - If item.state === 'planned', cells are solid fills and legend says: "Confirmed utilization — anchored to scope & crew schedule"

2. **Empty state handling.** If somehow all items are `planned` (user clicked Confirm on everything), show a celebratory state in the content area:
   - A large CheckCircle2 icon in emerald-500 (48px)
   - "All equipment needs are confirmed and on Happy Path."
   - "Ready for Preflight Validation →" as a link-style text (non-functional)
   - "Submit to Preflight" button in the footer becomes enabled (emerald bg instead of disabled gray)

3. **Row hover states.** Ensure every line item row has a clear hover state (`hover:bg-slate-50`) and a subtle cursor pointer. The currently expanded row should have `bg-indigo-50/30` to distinguish it.

4. **Keyboard hint.** Add a tiny text in the sort bar: "Click any row to expand planning details" — text-[9px] italic text-slate-400, right-aligned.

5. **Footer enhancement.** The PillarFooter should now show live-updating numbers:
   - Left: "15 items · 4 packages · Equipment Pillar"
   - Center: "Happy Path Total: $XX,XXX/mo" (green) vs "Current Blended: $XX,XXX/mo" (computed as costHappy for happy items + costConstrained for constrained/at-risk items) vs "Premium Exposure: +$X,XXX/mo" (rose)
   - Right: "Submit to Preflight" button — disabled with tooltip "All items must be Planned or Flagged" if any items are still `baseline` or `in-review`. Enabled (emerald) when all items are in terminal state.

6. **Responsive table.** Ensure the content area scrolls independently (the toolbar, tabs, summary strip, and footer are fixed/sticky). The table body is the only scrollable region. Use `overflow-auto` and appropriate `sticky top-0` on the table header.

7. **Final consistency check.** Make sure:
   - All font sizes match the existing wireframe conventions (10px for dense data, 11-12px for labels, 13-14px for headings)
   - All color usage matches existing Tailwind patterns in the file (emerald for good, amber for warning, rose for bad, indigo for interactive, slate for neutral)
   - The `Lock` icon + "Observed" indicator appears in the toolbar (existing convention — zone state is derived, not manually declared)

Commit message: "feat: polish Project Planning tool with utilization detail, empty state, and footer KPIs"
```

---

## Post-Build: Verification Checklist

After all 8 prompts are committed, run `npm run build` from the repo root and verify in browser:

1. Click "V0 Baseline Review" card (now titled "Project Equipment Plan") — should load MockProjectPlanning
2. Default view sorts by criticality — tower crane (urgency 95) is first item visible
3. State composition strip shows correct proportions
4. Click the tower crane row — expansion panel opens with refinement form and path economics
5. Click "Confirm & Plan" — row transitions to green, KPIs update, sort order changes
6. Click "Flag Issue" on another item — row turns rose, constrained path activates
7. Pillar tabs switch correctly — Logistics/Prefab/Procurement/ProServices show stubs
8. All packages collapse and expand correctly
9. Sort buttons actually re-order the items (try Path Status — constrained items should surface)
10. Footer numbers update live as you confirm/flag items
