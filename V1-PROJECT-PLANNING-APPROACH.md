# V1 Project Planning Tool — Wireframe Approach

**Date:** April 10, 2026
**Context:** Transition from `MockPrePopulation` (V0 Baseline Review) to a V1 Project Planning Tool
**Target:** New view in `src/App.jsx`
**Starting Pillar:** Equipment (architecture supports pillar tabs)

---

## 1. Where This Sits in the World

The Demand Funnel is a nine-zone lifecycle. Zones 1–3 are forecast and shaping — the project doesn't exist yet as real work. Zone 7 is the moment of truth where planning becomes a formal operational obligation. **Zones 4–6 are the heartbeat** — the window where a project team takes a rough, auto-generated draft (V0 baseline) and turns it into a validated, conflict-free, preflight-ready request that O2S can execute from a position of strength.

The current wireframe has a `MockPrePopulation` component that represents Zone 4. It's a flat utilization heatmap table with two summary cards at the bottom (Happy Path / Constrained Path). It works as a proof of concept for "here's what the system generated," but it stops there. There's no mechanism for the project team to *act* on it — to refine items, resolve unknowns, wrap their actual scope/crew/schedule reality around it, or understand which items are screaming for attention versus which can wait.

The V1 Project Planning Tool replaces this static review with the single most important working surface in the entire Command Center. This is where project teams live during the most consequential planning window. It must be:

- **The place you plan from** — not a dashboard you glance at, but the tool you *work in* to take a rough baseline and make it real
- **A clarity engine** — every element of the interface should make it obvious what information is still missing, how urgent that missing information is, and what it costs to not provide it
- **Honest about state** — every line item visibly declares whether it's still a Baseline assumption or a Project-confirmed plan, and whether the fulfillment path it's on is healthy or degraded
- **The bridge between project intent and O2S execution** — the planning that happens here directly determines whether O2S fulfills from strength or scrambles from constraint

---

## 2. What Changed from V0 to V1

### V0 (Current MockPrePopulation)
- Flat table of auto-generated equipment needs
- Time-phased utilization heatmap (months × items)
- Source badges (Template / Forecast / Rule-Based)
- Two summary cards: Happy Path savings estimate, Constrained Path premium estimate
- Single action: "Approve Baseline & Promote to Intent"
- No interactivity at the line-item level
- No visibility into what's missing per item
- No connection to scopes, labor crews, or schedule

### V1 (What We're Building)
- **Pillar-tabbed architecture** — Equipment tab active, others stubbed with consistent shell
- **Line-item level state tracking** — each row declares Baseline vs. Project Planned
- **Line-item level path indicators** — each row shows Happy Path / Constrained Path with its own cost delta
- **Clarity urgency sorting** — two-dimensional sort: (1) what clarity is missing, (2) how urgently that clarity is needed relative to other items
- **Scope / Crew / Schedule integration** — equipment items are anchored to project scopes and labor crew timelines, making utilization expectations plannable rather than abstract
- **Package grouping** — line items roll up into packages (e.g., "Site Prep Equipment," "Structural Steel Support"), packages roll up to the pillar
- **Inline refinement** — the table isn't read-only; it's the tool where project teams confirm, modify, or flag items
- **Progressive disclosure** — collapsed view shows the urgency and state at a glance; expanded view reveals full detail per item

---

## 3. The Data Model This View Consumes

Each line item in the planning table is a **Need Line Item** (per the PRD's entity model). The V1 view wraps several data dimensions around each item:

### Per Line Item
| Dimension | Source | Example |
|-----------|--------|---------|
| Equipment taxonomy | V0 Baseline (template/forecast) | Tower Crane — 200T Luffing |
| Quantity / Count | Baseline assumption → refined by team | 1 unit |
| Full Taxonomy (spec) | Baseline placeholder → refined to exact spec | Liebherr 280 EC-H, 197ft HUH, 12T tip |
| Schedule (need dates) | P6 integration / scope timeline | Mobilize Oct 2026, demob Apr 2027 |
| Utilization profile | Time-phased from schedule | 1.0 Oct–Mar, 0.5 Apr |
| Scope linkage | Project scope/WBS | Structural Steel — Phase 2 Superstructure |
| Labor crew dependency | Crew planning data | Iron Workers — 14-person crew, Phase 2 |
| Sourcing path | O2S operations / fleet data | Internal fleet available (CRN-0044) OR external rental |
| Clarity score | Pillar-specific (Qty, Spec, Schedule) | Qty: ✓ | Spec: ⚠ partial | Schedule: ✓ |
| Confidence score | User-provided + system-computed | 72% — "Schedule depends on structural completion" |
| Happy/Constrained status | Derived from clarity + time remaining | Happy Path — 6 weeks of lead time remaining |
| Cost delta | Historical model | Happy: $18K/mo MSA | Constrained: $26K/mo spot (+44%) |
| State | Observed | Baseline (unconfirmed) → Project Planned (confirmed) |

### Rollup Logic
- **Line items → Packages:** A package (e.g., "Earthwork Equipment") groups related items. Package-level path status = worst-case of its children. Package-level clarity = composite of children's clarity scores.
- **Packages → Pillar:** Pillar-level summary shows total cost under Happy Path vs. Constrained Path, % of items in Baseline vs. Planned state, and aggregate clarity gaps.

---

## 4. The "Sort by Critical Information Needed" Metric

This is the core UX innovation for the V1 tool. The user doesn't want to stare at 40 line items and figure out where to start. The tool should answer: **"What do I need to act on RIGHT NOW, and why does THIS item matter more than THAT one?"**

### Two Dimensions of Criticality

**Dimension 1: Clarity Gap** — What information is missing?
Each equipment line item has pillar-defined clarity fields (per the PRD: Quantity/Count, Full Taxonomy/Spec, Schedule). A "clarity gap" exists when any of these fields are unresolved. The system tags each gap by type:

- `MISSING_SPEC` — Equipment specification not confirmed (still using baseline placeholder)
- `MISSING_SCHEDULE` — Need dates not anchored to P6 / scope timeline
- `MISSING_QTY` — Quantity still an assumption, not confirmed by project team
- `MISSING_SCOPE_LINK` — Item not tied to a specific scope / WBS element
- `MISSING_CREW_LINK` — Item not associated with a labor crew timeline

**Dimension 2: Clarity Urgency** — How critical is it that THIS gap gets closed NOW?
Not all missing information is equally urgent. A forklift missing its spec is less urgent than a tower crane missing its spec. The urgency score is a composite of:

- **Lead time pressure:** How many weeks until O2S must begin sourcing to hit the happy path? Items with short remaining lead time and unresolved clarity are the most critical.
- **Cost-of-delay severity:** What's the dollar premium per week of delay? Derived from historical actuals (Zone 9 flywheel data, or bootstrapped defaults).
- **Dependency chain depth:** Does this item block other items? A crane that gates structural steel erection which gates MEP rough-in has higher dependency urgency than a standalone storage connex.
- **Path degradation risk:** How close is this item to tipping from Happy Path to Constrained Path? An item with 2 weeks of lead time cushion is more urgent than one with 8 weeks.

### The Sort Experience

The default view sorts by a **composite criticality score** (urgency × gap severity). This puts the "loudest" items at the top — the ones where the information gap is the most consequential and time-sensitive.

Users can also filter/sort by:
- **Gap type** — "Show me everything missing a spec" or "Show me everything without a schedule anchor"
- **Path status** — "Show me everything on the Constrained Path" or "Show me everything at risk of tipping"
- **State** — "Show me everything still in Baseline" vs. "Show me what I've already confirmed"
- **Package** — Collapse to package-level view and drill in

The sort isn't just a convenience — it's the system tapping the project team on the shoulder and saying "this crane is 3 weeks from tipping to constrained path and it'll cost you $47K in premium if you don't confirm the spec."

---

## 5. The Baseline → Project Planned State Transition

Every line item starts life as **Baseline** — the V0 auto-generated assumption. The V1 tool makes it visually unambiguous which items have been touched by the project team and which haven't.

### Visual Language

| State | Indicator | Meaning |
|-------|-----------|---------|
| **Baseline** | Left border: dashed amber | V0 assumption — system-generated, unconfirmed by project team |
| **In Review** | Left border: solid blue | Project team has opened/modified but not confirmed |
| **Project Planned** | Left border: solid green | Project team has confirmed all clarity fields with rationale |
| **Flagged** | Left border: solid red | Project team has flagged an issue (e.g., "client hasn't decided," "design in flux") |

The header bar shows a **state composition strip** — a segmented progress bar showing what percentage of line items are in each state. Something like: `[████████░░░░░░] 35% Planned | 15% In Review | 42% Baseline | 8% Flagged`

This strip appears at both the pillar level (in the toolbar) and per package (in the package header row).

### What "Confirming" an Item Means

When a project team member acts on a Baseline item, they're not just clicking a checkbox. The interface expands the row to show the pillar-defined clarity fields and asks them to:

1. **Confirm or modify** the quantity, spec, and schedule
2. **Link to scope** — select the WBS element / scope item this equipment serves
3. **Link to crew** — associate with the labor crew that will use this equipment
4. **Provide rationale** — a short text field explaining their confidence level ("Specs confirmed per structural package Rev 3" or "Schedule dependent on client's concrete decision — expected by Oct 15")

This is the "doing the work creates the data" principle in action. The act of planning IS the status update.

---

## 6. Happy Path / Constrained Path at the Line Item Level

Currently, the wireframe shows two summary cards at the bottom. In V1, every single line item carries its own path indicator.

### Per-Item Path Display

Each row shows a small inline indicator:

- **Happy Path** `🟢 HP` — Lead time is sufficient, clarity is provided or on track. O2S can source from strength. Shows the MSA/preferred rate.
- **At Risk** `🟡 AR` — Lead time is eroding. Clarity not yet provided but still within window. Shows the projected premium if it tips.
- **Constrained** `🔴 CP` — Lead time has passed the happy path threshold. O2S must begin constrained sourcing. Shows the actual premium being incurred.

Next to the indicator: a **cost delta chip** — e.g., `+$0` (happy), `+$4,200 projected` (at risk), `+$11,800 premium` (constrained).

### Rollup Mechanics

- **Package level:** Shows a mini summary — e.g., "4/6 items Happy Path | 1 At Risk | 1 Constrained | Package premium: +$11,800"
- **Pillar level (toolbar):** Shows aggregate — "Equipment: 68% Happy Path | Total portfolio premium exposure: +$47,200"

This makes the cost of delayed clarity impossible to ignore without making the interface feel punitive. The numbers are just facts — observed from system data.

---

## 7. Scope / Crew / Schedule Integration

This is what makes the V1 tool a *planning* tool rather than a review screen. The V0 baseline gives you a list of equipment. The V1 tool lets you wrap that equipment around the actual work.

### Scope Column
Each line item can be linked to a project scope element (WBS code + description). This answers: "Why do we need this piece of equipment?" When a scope element is linked, the schedule for that equipment auto-anchors to the scope's timeline from P6.

### Crew Column
Each line item can be associated with a labor crew. This answers: "Who uses this equipment?" When a crew is linked, the utilization profile aligns to the crew's mobilization/demobilization dates. A forklift linked to "Concrete Crew — Phase 1" inherits that crew's start/end dates as its utilization window.

### Schedule Heatmap (Preserved from V0, Enhanced)
The time-phased utilization heatmap from MockPrePopulation is preserved — it's a strong visual. But in V1:
- Cells tied to confirmed scope/crew dates show as **solid fills**
- Cells still based on baseline assumptions show as **hatched/striped fills**
- This makes it instantly visible where the utilization plan is anchored to reality vs. still floating on assumptions

---

## 8. Pillar Tab Architecture

The V1 tool is pillar-tabbed. The tab bar sits directly below the toolbar:

```
[ Equipment (active) ] [ Logistics ] [ Prefabrication ] [ Procurement ] [ Professional Services ]
```

Each pillar tab loads a planning view specific to that pillar's data model. Equipment is the first build. The other tabs show a "Coming Soon" shell with the pillar's clarity dimensions listed.

Why tabs instead of a single unified table: because the planning tool IS different for each pillar. Equipment planning is about utilization profiles and sourcing paths. Prefab planning is about fab slot reservations and cross-discipline production sequencing. Procurement is about volume aggregation and MSA leverage. Forcing them into one table would create an unusable sprawl. The pillar tab architecture respects domain specificity while the rollup mechanics provide cross-pillar visibility.

The toolbar (above the tabs) always shows the **project-level summary** — total % baseline vs. planned across ALL pillars, aggregate path exposure, composite clarity score. The tab content shows pillar-specific detail.

---

## 9. Wireframe Component Architecture

### New Component: `MockProjectPlanning`

**Replaces:** `MockPrePopulation` in the navigation/view map (or sits alongside it as the V1 evolution)

**Structure:**
```
MockProjectPlanning
├── Toolbar (project-level summary: state composition, aggregate path exposure)
├── PillarTabBar (Equipment | Logistics | Prefab | Procurement | Pro Services)
├── PillarPlanningView (content area, switches per active tab)
│   ├── PillarSummaryStrip (pillar-level: clarity score, path breakdown, cost delta)
│   ├── SortFilterBar (Sort by: Criticality | Gap Type | Path Status | State | Package)
│   ├── PackageGroup (collapsible, shows package-level rollup)
│   │   ├── PackageHeader (name, item count, state composition mini-bar, path summary)
│   │   └── LineItemRow (one per need line item)
│   │       ├── State indicator (left border color)
│   │       ├── Equipment info (type, model, spec)
│   │       ├── Clarity chips (Qty ✓ | Spec ⚠ | Schedule ✓)
│   │       ├── Path indicator + cost delta (🟢 HP +$0 / 🟡 AR +$4.2K / 🔴 CP +$11.8K)
│   │       ├── Scope link (WBS element)
│   │       ├── Crew link (labor crew)
│   │       ├── Utilization mini-bar (compressed heatmap)
│   │       └── Expandable detail panel (full refinement form, rationale, history)
│   └── PillarFooter (total cost: happy path vs. constrained, action buttons)
```

### Data Shape (Mock)
```javascript
const packages = [
  {
    id: 'pkg-earthwork',
    name: 'Earthwork & Site Prep',
    items: [
      {
        id: 'li-001',
        type: 'Loaders', model: '950 Front End Loader',
        state: 'baseline',          // baseline | in-review | planned | flagged
        path: 'happy',              // happy | at-risk | constrained
        clarity: { qty: true, spec: false, schedule: true },
        costHappy: 10000, costConstrained: 14500,
        urgencyScore: 87,           // composite criticality (0-100)
        leadTimeRemaining: '3 weeks',
        scope: 'Earthwork — Phase 1 Mass Grading',
        crew: 'Civil Crew Alpha — 8 operators',
        utilization: [1.0, 1.0, 1.0, 0.5, 0, 0, 0, 0],
        rationale: null,            // null until project team provides
        flagReason: null,
      },
      // ... more items
    ]
  },
  // ... more packages
];
```

---

## 10. Interaction Patterns

### Default Load
- Sort by criticality score (highest urgency at top)
- All packages expanded
- Toolbar shows project-level state composition and path exposure

### Sorting
- Click "Sort by Criticality" → composite score (default)
- Click "Sort by Gap Type" → groups by missing field type (all MISSING_SPEC items together, etc.)
- Click "Sort by Path" → Constrained first, then At Risk, then Happy
- Click "Sort by State" → Baseline first (most work to do), then In Review, then Planned

### Confirming an Item (Inline Refinement)
1. User clicks a Baseline item row → row expands
2. Expansion shows: editable qty, spec selector, schedule date pickers, scope dropdown, crew dropdown, rationale text field
3. User fills in fields → clarity chips update live
4. User clicks "Confirm" → state transitions from Baseline to Project Planned
5. Path indicator recalculates based on new clarity + remaining lead time
6. Package and pillar rollups update automatically

### Flagging an Item
1. User clicks flag icon on a row → modal with reason codes: "Client undecided," "Design in flux," "Regulatory hold," "Other"
2. State transitions to Flagged
3. Flagged items carry a note that's visible to O2S operations via the trigger engine
4. The trigger engine can use flag reasons to begin constrained-path preparation with context

---

## 11. What Makes This "The Best Planning Tool Ever"

The aspiration in the brief is that this becomes THE critical heartbeat of Demand — the best project and RSI/FSI planning tool ever made. Here's how this approach earns that:

**It respects the duality principle.** The interface doesn't pretend the happy path is the only path. It makes both paths visible at every level of granularity, with real dollars attached. This is what the PRD and podcast describe as the fundamental philosophical departure from traditional enterprise software.

**It sorts by what matters, not by alphabet.** The criticality sort means the first thing a PM sees when they open this tool is the single most consequential decision they need to make today. Not a wall of data they have to interpret — a clear, prioritized action queue.

**It makes state unambiguous.** You can never be confused about whether an item has been touched by the project team. The visual language (dashed amber → solid green) is instant recognition.

**It connects equipment to work.** Linking to scopes and crews is what turns a list of equipment into a plan. A "950 Front End Loader" by itself is abstract. A "950 Front End Loader for Earthwork Phase 1, used by Civil Crew Alpha, mobilizing Oct 2026" is a plan you can execute.

**It rolls up without losing detail.** The line-item → package → pillar hierarchy means operations leads see portfolio exposure while project teams see their specific next action. Same data, different zoom level.

**It embodies "doing the work creates the data."** The act of confirming a line item, linking it to a scope, providing a rationale — that IS the planning. There's no separate status report. The tool's state IS the status.

**The pillar tab architecture scales.** Equipment is first. But the same shell — packages, line items, clarity fields, path indicators, criticality sort — works for every pillar with pillar-specific field definitions. The framework is universal; the content is specialized.

---

## 12. Build Sequence

1. **Scaffold the component** — `MockProjectPlanning` with toolbar, pillar tab bar, and Equipment tab active
2. **Build the line item row** — state indicator, clarity chips, path indicator, cost delta, utilization mini-bar, scope/crew columns
3. **Build the package grouping** — collapsible with rollup summary header
4. **Implement the sort/filter bar** — criticality sort as default, gap type / path / state as alternatives
5. **Build the inline expansion** — refinement form with clarity fields, scope/crew selectors, rationale input
6. **Wire state transitions** — baseline → in-review → planned → flagged with visual updates
7. **Build the pillar-level and project-level rollups** — state composition strip, aggregate path exposure
8. **Stub the other pillar tabs** — "Coming Soon" shells with pillar-specific clarity dimension previews
9. **Polish** — interactions, transitions, responsive collapse for dense data
