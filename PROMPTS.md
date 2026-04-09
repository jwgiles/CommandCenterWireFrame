# O2S Command Center Wireframe — Claude Code Build Prompts

Paste these prompts into Claude Code **in order**. Each produces one commit-sized change. They build on each other sequentially.

---

> **⚠️ PRE-REQUISITE: Run all 7 Delta Correction Prompts (DELTA-PROMPTS.md) before executing these build prompts. The delta prompts fix CRM→FP&A references, add gate badges, duality callouts, the observed-lock indicator, and the data crosswalk footer.**

---

## Prompt 1 of 12 — Persona × Pillar Navigation Shell

```
We are rebuilding the O2S Command Center wireframe in src/App.jsx (React + Tailwind, Vite project). The current file is a flat grid of mock workflow cards. We need to restructure it with a top-level navigation architecture before adding any new screens.

**What to build:**

Add a persistent top navigation bar with two controls:

1. **Persona tabs** — four horizontal tabs:
   - "Project Teams" (icon: HardHat or Users)
   - "O2S Operations" (icon: Settings or Cog)
   - "Leadership" (icon: BarChart3 or TrendingUp)
   - "Finance & FP&A" (icon: DollarSign)

2. **Pillar selector** — a dropdown or segmented control with five options:
   - Equipment (active/selectable)
   - Logistics (disabled, shows "Coming Soon" badge)
   - Prefabrication (disabled, shows "Coming Soon" badge)
   - Procurement (disabled, shows "Coming Soon" badge)
   - Professional Services (disabled, shows "Coming Soon" badge)

Below the nav, the content area displays a **grid of cards grouped by zone phase**. The zone phases are column groups:
- Zones 1–3: "Forecast & Shape"
- Zones 4–5: "Baseline & Intent"
- Zones 6–7: "Validate & Request"
- Zones 8–9: "Execute & Learn"

Each zone group column header should display its zone numbers and label prominently.

**Card visibility rules for Equipment pillar:**

When "Project Teams" + "Equipment" is selected, show these cards:
- Z1–3: Quick Quotes (existing MockQuickQuotes)
- Z4–5: V0 Baseline Review (existing MockPrePopulation), Ad-Hoc Request Intake (existing MockAdHocIntake)
- Z6–7: (empty placeholder card: "Preflight Validation — Coming in Prompt 3")
- Z8–9: (empty placeholder card: "Execution Self-Service — Coming in Prompt 4")

When "O2S Operations" + "Equipment" is selected, show:
- Z1–3: Asset Demand Forecast (existing MockAssetDemandForecasting)
- Z4–5: Pre-Population & Constraint Alerts (existing MockPrePopulation)
- Z6–7: Owned vs Re-Rent Optimizer (existing MockOptimizer), Strategic Sourcing (existing MockStrategicSourcing)
- Z8–9: (empty placeholder: "Utilization Monitoring — Coming in Prompt 4")

When "Leadership" + "Equipment" is selected, show:
- Z1–3: (placeholder: "Portfolio Watchlists — Coming in Prompt 9")
- Z4–5: (placeholder: "Project Maturity Summary — Coming in Prompt 10")
- Z6–7: Asset Lifecycle Engine (existing MockAssetLifecycle)
- Z8–9: CapEx Plan (existing MockCapexPlan)

When "Finance & FP&A" + "Equipment" is selected, show:
- Z1–3: Margin Plan (existing MockMarginPlan), FP&A Sync (existing MockFinancialModel)
- Z4–5: (placeholder: "Cost Basis Roll-Up — Coming in Prompt 8")
- Z6–7: (placeholder: "Request Cost Validation — Coming in Prompt 8")
- Z8–9: Billing Anomaly Detection (existing MockBillingAnomaly)

For any non-Equipment pillar, show a centered message: "[Pillar Name] workflows are under development. The zone model, trigger engine, and persona-based views you see for Equipment will extend to this pillar."

**Implementation rules:**
- Keep ALL existing Mock* components exactly as they are — do not modify their internals.
- The current podcast tour overlay and the card click-to-expand modal must still work.
- Use React useState for persona and pillar selection.
- The placeholder cards should be styled consistently — light dashed border, gray text, zone label visible.
- The page title should update to show the active persona + pillar: e.g., "O2S Operations — Equipment"
- Maintain the existing dark bottom bar about the Custom Frontend / Platform Level.

> **DELTA AMENDMENT:** All CRM references have been corrected to FP&A by Delta Prompt 1. The persona-to-artifact mapping should follow the definitive matrix in DELTA.md section D4. Key rules: Fit Score (Zone 2) goes to O2S Operations + Leadership only. Margin Plan (Zone 3) goes to Finance + Project Teams. Clarity Scoring (Zone 4–5) goes to Project Teams + O2S Operations + Finance. Quick Quotes (Zone 1–3) stays with Project Teams. Project Maturity (Zone 4–5) goes to all three non-Finance personas.

Commit message: "feat: add persona × pillar navigation shell with zone-grouped grid"
```

---

## Prompt 2 of 12 — Zone Progression Spine

```
In src/App.jsx, add a **zone progression bar** between the top navigation (persona/pillar tabs) and the card grid. This is the visual representation of the 9-zone lifecycle — the "spine" of the Command Center.

**What to build:**

A horizontal bar showing all 9 zones as connected segments:

Zone 1: Portfolio Forecast
Zone 2: Opportunity Correlation
Zone 3: Precon Decision Pack
Zone 4: Baseline Generation
Zone 5: Intent Refinement
Zone 6: Preflight Validation
Zone 7: Formal Request & Handoff
Zone 8: Execution & Exceptions
Zone 9: Learning Flywheel

**Visual design:**
- Render as a horizontal pipeline/flow with 9 numbered circles connected by lines.
- Group them visually into the 4 phases with subtle background color bands:
  - Z1–3: indigo tint (Forecast & Shape)
  - Z4–5: emerald tint (Baseline & Intent)
  - Z6–7: amber tint (Validate & Request)
  - Z8–9: rose tint (Execute & Learn)
- Each zone circle shows its number. On hover, show the zone name in a tooltip.
- Below the zone bar, add a single-line description that changes based on which zone group the user hovers over:
  - Z1–3: "What demand is coming, where does it align, and which opportunities deserve early engagement?"
  - Z4–5: "What do we need, when do we need it, and how confident are we in the plan?"
  - Z6–7: "Is this ready for submission, and is it being acted upon?"
  - Z8–9: "Is work happening as planned, what actually happened, and how do we get smarter?"

**Key philosophical note to display:**
Below the zone bar, add a small persistent label:
"Zone state is observed, never declared — progress is derived from system-of-record data, not manual status updates."
Style this as a subtle italic caption in slate-500.

**Interaction:** The zone bar is purely informational/navigational context. It does not filter the grid — the grid is already filtered by persona + pillar. But the zone bar should visually highlight which zone group(s) correspond to the cards currently visible, using a slightly brighter or bolder treatment on the active phase segments.

Do not modify any existing Mock* components.

Commit message: "feat: add zone progression spine with 9-zone lifecycle visualization"
```

---

## Prompt 3 of 12 — Zone 6 Preflight & Zone 7 Formal Request

```
In src/App.jsx, add two new mock components to fill the Zone 6–7 gaps for the Project Teams and O2S Operations personas under Equipment.

**Component 1: MockPreflightValidation (Zone 6)**

A preflight checklist screen that validates a request pack before formal submission. Layout:

- Toolbar: "Zone 6: Preflight Validation" label, project name "Data Center TX", a "Run Preflight" button.
- Below toolbar: A summary bar showing 3 KPIs:
  - "Line Items Checked" → "24 / 24"
  - "Conflicts Found" → "2" (red badge)
  - "Pass Rate" → "91.7%" (yellow badge)
- Main content: A table of line items being validated, with columns:
  - Line Item (e.g., "Tower Crane 60T", "Generator 200kW", "Boom Lift 80ft")
  - Taxonomy Check (green checkmark or red X)
  - Date Feasibility (green check, yellow warning "Lead time risk: 14 wks vs 10 wk request", or red X)
  - Specification Complete (green check or red X with "Missing: load chart")
  - Sourcing Path (badge: "Internal Fleet", "MSA Vendor", or red "No Path")
  - Status (Badge: "Pass", "Warning", "Fail")
- Below table: A conflict detail panel showing 2 detected conflicts:
  - "Conflict 1: Tower crane radius overlaps with temporary power placement on Site Plan Rev 3"
  - "Conflict 2: Requested boom lift delivery (Nov 3) is 4 weeks before structural steel completion per P6 schedule"
- At bottom: Two buttons — "Resolve Conflicts & Revalidate" and "Assemble Request Pack →"

**Component 2: MockFormalRequest (Zone 7)**

The formal request handoff screen. Layout:

- Toolbar: "Zone 7: Formal Request" label, status badge "Submitted — SLA Active", a timer showing "SLA: 3d 14h remaining"
- Summary bar KPIs:
  - "Request ID" → "REQ-2024-0847"
  - "Line Items" → "22"
  - "Total Estimated Value" → "$1.24M"
  - "Routing" → "Auto-routed to Equipment Ops"
- Main content: A table showing the request pack with columns:
  - Line Item, Pillar, Quantity, Delivery Date, Sourcing Path, SLA Status (badge: "On Track", "At Risk")
- Below the table: A "Lineage Trail" section showing the full traceability:
  - "Zone 2 Fit Score → Zone 3 Margin Plan → Zone 4 V0 Baseline → Zone 5 Refined Intent → Zone 6 Preflight Pass → Zone 7 Submitted"
  - Render as a horizontal breadcrumb with small zone-colored dots.
- A "Post-Submission Changes" section showing one example delta:
  - "Change #1: Quantity adjustment — Boom Lifts 80ft: 12 → 14 (Minor — within threshold, auto-approved)"

**Integration:**
- Register both components in the renderWorkflowContent switch statement.
- Update the persona × pillar card mapping from Prompt 1:
  - "Project Teams" + Z6–7: Show MockPreflightValidation card
  - "O2S Operations" + Z6–7: Keep MockOptimizer and MockStrategicSourcing, ALSO add MockFormalRequest as a third card
- Replace the placeholder cards from Prompt 1 with the real cards.
- Both new cards should be clickable and open in the existing modal overlay.

> **DELTA AMENDMENT:** MockFormalRequest must include a "Fulfillment Position" section showing how the clarity state at submission determines operations' sourcing strategy. Add: "Submitted at 68% avg clarity. 14 items fulfilling from strength (preferred sourcing). 8 items fulfilling from constraint (spot-market pricing)." Each line item should show a small badge: "Happy Path" (green) or "Constrained" (amber). This implements the Duality Principle requirement that every workflow card reflects the three-sided dynamic.

Commit message: "feat: add Zone 6 preflight validation and Zone 7 formal request screens"
```

---

## Prompt 4 of 12 — Zone 8 Execution Dashboard

```
In src/App.jsx, add two new mock components for Zone 8 execution under Equipment.

**Component 1: MockExecutionDashboard (Zone 8)**

An execution tracking screen showing active work-in-process. Layout:

- Toolbar: "Zone 8: Execution & Exceptions" label, "12 Active Orders" count, a filter dropdown for status (All / On Track / Exception / Overdue).
- KPI bar:
  - "Active Deployments" → "47 assets"
  - "On-Time Delivery" → "89%" with trend "-3% vs last month"
  - "Avg Days on Rent" → "34"
  - "Cost vs Plan" → "+4.2%" in red
- Main table — Active equipment orders with columns:
  - Order ID (monospace), Asset Description, Project, Deploy Date, Off-Rent Date, Status (Badge: "Active", "Exception", "Overdue Closeout"), Days on Site, Utilization % (render as a small inline bar)
- Include one row where Utilization is 12% with a red "Underutilized" badge — this demonstrates the redeployment trigger concept from the podcast.
- Self-Serve Actions panel at the bottom:
  - Three buttons styled as action cards: "Extend Rental", "Swap Asset", "Request Early Return"
  - Each button has a subtitle: "(Creates auditable change record)"

**Component 2: MockVendorScorecard (Zone 8–9)**

A vendor performance scorecard compiled from execution actuals. Layout:

- Toolbar: "Vendor Performance Scorecard" label, vendor name "Sunbelt Rentals — Texas Region"
- KPI bar:
  - "Engagements (12mo)" → "142"
  - "On-Time Delivery" → "87%"
  - "Billing Accuracy" → "91%"
  - "Safety Incidents" → "2" (yellow badge)
- A summary table of recent engagements with columns:
  - Project, Asset, Planned Delivery, Actual Delivery, Variance (days), Billing Accuracy, Damage/Safety Flag
- At bottom: "Scorecard auto-compiled from Zone 8 closeout data. Final qualitative review required from project team." in italic gray.
- Button: "Approve & Publish to Enterprise Vendor Registry"

**Integration:**
- Register both in renderWorkflowContent switch.
- "Project Teams" + Equipment Z8–9: Show MockExecutionDashboard card (self-serve actions perspective)
- "O2S Operations" + Equipment Z8–9: Show MockExecutionDashboard card AND MockVendorScorecard card
- Replace any remaining Z8–9 placeholder cards.

> **DELTA AMENDMENT:** MockExecutionDashboard must include a "Clarity Origin" tooltip on exception rows linking execution issues to upstream clarity gaps. Example: on the underutilized crane row, tooltip reads "Spec mismatch traces to Zone 5 clarity gap: load chart not provided until 3 weeks after deadline." This closes the loop from execution back to the duality dynamic and feeds the Zone 9 flywheel.

Commit message: "feat: add Zone 8 execution dashboard and vendor performance scorecard"
```

---

## Prompt 5 of 12 — Zone 9 Learning Flywheel

```
In src/App.jsx, add a new MockLearningFlywheel component and expand the Zone 9 representation. The current MockBillingAnomaly is a narrow slice — we need to show the full flywheel.

**Component: MockLearningFlywheel (Zone 9)**

The data flywheel that captures actuals and feeds them back upstream. Layout:

- Toolbar: "Zone 9: Learning Flywheel" label, "Feedback cycle: Q3 FY26" text, "Export Flywheel Report" button.
- At top: A visual flywheel diagram. Render this as a horizontal flow with arrows:
  - "Zone 4 Assumptions" → "Zone 8 Actuals" → "Variance Analysis" → "Template Writeback" → loops back with arrow to "Zone 4 (Next Project)"
  - Style as colored boxes connected by arrows. This is the single most important diagram in the wireframe.

- Section 1 — "Variance Analysis" table:
  - Columns: Item Category, Zone 4 Assumed Lead Time, Zone 8 Actual Lead Time, Variance, Zone 4 Assumed Cost, Zone 8 Actual Cost, Cost Variance, Cause Code
  - Sample rows:
    - "Switchgear 480V": 12 wks → 16 wks (+4 wks, red), $42K → $51K (+21%, red), Cause: "Supply chain delay"
    - "Tower Crane 60T": 8 wks → 7 wks (-1 wk, green), $180K → $175K (-3%, green), Cause: "Early sourcing"
    - "Boom Lift 80ft": 2 wks → 2 wks (0, gray), $4.8K → $6.2K (+29%, red), Cause: "Spot market premium"

- Section 2 — "Template Writeback Recommendations":
  - A list of 3 recommended updates, each with:
    - What changed: "Switchgear 480V default lead time: 12 weeks → 15 weeks"
    - Evidence: "Based on 8 project actuals, median lead time is 15.2 weeks (σ = 1.4 weeks)"
    - Calibration indicator: Badge "High confidence — 8 samples" or "Low confidence — 2 samples"
    - Status: "Pending Review" with button "Approve Writeback" and "Reject with Rationale"
  - Add a note below: "Writebacks produce recommendations for template owner review — not automatic overwrites."

- Section 3 — "Happy Path vs. Constrained Path Outcomes" summary:
  - Two columns side by side:
    - Happy Path: "14 items sourced with early clarity. Avg cost savings: 18%. Avg lead time buffer: +3.2 weeks."
    - Constrained Path: "8 items sourced under constraint. Avg cost premium: 34%. 3 schedule delays attributed to late clarity."
  - Caption: "Every completed project builds the evidence that makes the clarity signal harder to ignore."

**Integration:**
- Register in renderWorkflowContent.
- "O2S Operations" + Equipment Z8–9: Add MockLearningFlywheel alongside existing cards.
- "Leadership" + Equipment Z8–9: Show MockLearningFlywheel alongside CapEx Plan.
- "Finance & FP&A" + Equipment Z8–9: Show MockBillingAnomaly AND MockLearningFlywheel.

Commit message: "feat: add Zone 9 learning flywheel with variance analysis and template writeback"
```

---

## Prompt 6 of 12 — Trigger Engine & Action Catalog

```
In src/App.jsx, add a MockTriggerPanel component. This represents the core "engine of action" in the Command Center — the mechanism that turns signals into execution.

**Component: MockTriggerPanel**

A trigger notification and action panel. This is NOT a full-screen view — it's a **slide-out side panel** that can be opened from a persistent "Triggers" button in the top nav bar (add a bell icon with a red badge "3" next to the persona tabs).

Panel layout (slides in from the right, ~400px wide, full height):

- Header: "Active Triggers" with count badge, close button.
- Filter bar: Small pills to filter by priority: "Critical" (red), "Action Required" (amber), "Informational" (gray). Default: show all.

- Trigger cards (show 3 sample triggers stacked vertically):

  **Trigger 1 (Critical):**
  - Red left border accent
  - Title: "Long-Lead Detected: Switchgear 480V"
  - Zone badge: "Zone 4 → Zone 5"
  - Subtitle: "Project: Data Center TX | Detected: 2 hours ago"
  - "What happened:" section: "V0 baseline includes switchgear with 16-week lead time. Current schedule shows 10-week window."
  - "Clarity Status:" — a small indicator: "❌ Project team has NOT provided final specifications"
  - Because clarity is missing, show **Constrained Path Actions:**
    - Button: "Send Clarity Demand to Project Team" (primary indigo button) — subtitle: "Includes deadline + cost-of-delay summary"
    - Button: "Begin Constrained Sourcing with Baseline Specs" (outline button)
    - Button: "Escalate to Ops Director with Risk Summary" (outline button)
  - Cost of delay callout (amber background box): "Each week of delay increases projected cost by $4,200 based on historical spot-market premium for this asset class."

  **Trigger 2 (Action Required):**
  - Amber left border
  - Title: "Underutilized Asset: Crawler Crane CRN-0092"
  - Zone badge: "Zone 8"
  - "What happened:" — "Telematics show 12% utilization over 14 days. Daily cost: $2,800."
  - "Redeployment Match Found:" — "Project Healthcare Facility C (AZ) has open demand for same crane class."
  - **Happy Path Actions** (clarity IS available):
    - Button: "Initiate Cross-Regional Transfer" (primary) — "Pre-calculated: Transfer cost $18K vs rental savings $67K"
    - Button: "Extend Current Deployment with Justification" (outline)
    - Button: "Begin Off-Rent Process" (outline)

  **Trigger 3 (Informational):**
  - Gray left border
  - Title: "Preflight Passed: REQ-2024-0847"
  - Zone badge: "Zone 6 → Zone 7"
  - "22 line items validated. Ready for formal submission."
  - Button: "View Request Pack" (link style)

- At the bottom of the panel: "Triggers serve two audiences simultaneously. O2S Operations sees action options. Project Teams see clarity demands with downstream cost consequences."

**Integration:**
- Add the trigger bell icon + badge to the top nav bar from Prompt 1.
- Clicking the bell opens/closes the panel.
- The panel overlays on top of the grid content (position fixed, right side).
- Trigger cards should be context-aware: if the user is in "Project Teams" persona, Trigger 1 should show the PROJECT TEAM version (they see the clarity demand: "Specifications required for Switchgear 480V. Delay cost: $4,200/week. Provide specs →"). If in "O2S Operations" persona, show the ops version with the constrained-path actions.

This is the duality principle in action — same trigger, different recommended actions based on persona.

Commit message: "feat: add trigger engine side panel with dual-persona action catalog"
```

---

## Prompt 7 of 12 — Duality Principle: Cost-of-Delay Visualization

```
In src/App.jsx, add a MockCostOfDelay component that makes the financial consequences of late clarity visible and specific. This is the mechanism the podcast describes: "putting a literal price tag on the information gap."

**Component: MockCostOfDelay**

A split-screen comparison of happy path vs. constrained path outcomes for a specific equipment need. Layout:

- Toolbar: "Duality View: Tower Crane Sourcing" label, project "Data Center TX", zone badge "Zone 5 — Intent Refinement"
- Subtitle: "This view shows the financial impact of the current clarity state on fulfillment options."

- Top section — Clarity Status Dashboard:
  - Three metric cards in a row, each showing a pillar-specific clarity dimension:
    - "Quantity/Count" → Green check, "Confirmed: 1 unit" + rationale preview: "Per structural package Rev 4"
    - "Full Taxonomy (Specification)" → Red X, "Missing: Load chart & radius requirements" + "Last requested: 3 days ago"
    - "Schedule" → Yellow warning, "Partial: Structural completion TBD per P6 update pending"
  - Overall clarity score: "33% — 1 of 3 dimensions confirmed"

- Main section — Two-column comparison:

  **Left column: "Happy Path" (green header)**
  - Subheader: "If project team provides specifications within 5 business days"
  - Cost: "$175,000 (MSA rate from preferred vendor)"
  - Lead time: "8 weeks — arrives 3 weeks before structural milestone"
  - Source: "Internal owned fleet — unit available in adjacent region"
  - Risk: "Low — confirmed specifications enable precise matching"
  - Financial impact: "Saves $47,000 vs. constrained path"

  **Right column: "Constrained Path" (red header)**
  - Subheader: "If clarity window closes without specifications"
  - Cost: "$222,000 (spot market rate + expedite premium)"
  - Lead time: "4 weeks — but higher risk of mismatch requiring remobilization"
  - Source: "Spot market — best available from 3rd party vendor"
  - Risk: "High — unconfirmed specs may require swap + additional mobilization"
  - Financial impact: "+$47,000 premium cost absorbed by O2S"

- Bottom section — "Historical Evidence" callout:
  - "Across 23 similar tower crane procurements in the last 18 months:"
  - "Happy path avg cost: $168K | Constrained path avg cost: $231K | Avg premium: 37%"
  - "This evidence is sourced from the Zone 9 flywheel."
  - Small badge: "Sample size: 23 — High Confidence"

**Integration:**
- Register in renderWorkflowContent.
- "Project Teams" + Equipment Z4–5: Add this as an additional card alongside V0 Baseline. Title the card "Cost of Delay Visibility". Description: "See the financial impact of providing or withholding clarity on each equipment need."
- "O2S Operations" + Equipment Z4–5: Also show this card — but when opened from Ops persona, the right column (constrained path) should have an additional sub-section: "O2S Operations Prep Actions" with two buttons: "Pre-position sourcing with baseline specs" and "Alert regional fleet manager of potential demand."

Commit message: "feat: add happy-path vs constrained-path cost-of-delay visualization"
```

---

## Prompt 8 of 12 — Clarity & Confidence Scoring

```
In src/App.jsx, add a MockClarityScoring component that shows the pillar-specific clarity and confidence scoring system at the line-item level.

**Component: MockClarityScoring**

An interactive scoring view for a project's equipment needs. Layout:

- Toolbar: "Clarity & Confidence Assessment" label, project "Data Center TX", zone "Zone 5", button "Recalculate Scores"
- Subtitle: "Scores are computed from field completeness and supplemented with user-provided assessment and rationale."

- KPI bar:
  - "Overall Clarity" → "68%" (rendered as a circular progress indicator, amber)
  - "Overall Confidence" → "54%" (circular, amber)
  - "Lines at Full Clarity" → "8 / 22"
  - "Calibration" → Badge: "Rule-Based (Low Sample)" — indicating the bootstrapping phase

- Main table — Line item scoring with columns:
  - Line Item (e.g., "Tower Crane 60T", "Generator 200kW", "Boom Lift 80ft", "Switchgear 480V")
  - **Quantity Score** — small progress bar (green/yellow/red) + label: "✓ Confirmed" or "? Estimated"
  - **Taxonomy Score** — progress bar + label: "✓ Full Spec" or "✗ Missing load chart"
  - **Schedule Score** — progress bar + label: "✓ P6 Linked" or "~ Partial"
  - **Clarity Composite** — percentage with color coding
  - **Confidence** — percentage with color coding
  - **User Rationale** — truncated text preview, e.g., "Confirmed per structural package" or "Waiting on client MEP decision"

- Expanded row detail (show one row expanded):
  - For "Tower Crane 60T": Show three dimension cards side by side:
    - Quantity: Score 100%, System-computed. "1 unit confirmed in V0 baseline."
    - Taxonomy: Score 30%, User-assessed. Rationale: "Structural package under revision. Load chart unavailable until Rev 5." (with a text input showing the rationale)
    - Schedule: Score 50%, User-assessed. Rationale: "Structural milestone dependent on foundation permit — expected mid-November."
  - Below dimensions: "Combined clarity: 60% | Confidence: 45%"
  - Note: "System-computed score based on field completeness: 40%. User has assessed higher (60%) with rationale. Both scores stored for flywheel calibration."

- Bottom callout: "Confidence scores derived from limited data are marked with calibration indicators. As Zone 9 actuals accumulate, scoring transitions from rule-based to data-driven."

**Integration:**
- Register in renderWorkflowContent.
- "Project Teams" + Equipment Z4–5: Add as a card. Title: "Clarity & Confidence Scoring." Description: "Assess and track how complete and confident each equipment need is across quantity, specification, and schedule."
- "O2S Operations" + Equipment Z4–5: Also show this card.
- "Finance & FP&A" + Equipment Z4–5: Replace the "Cost Basis Roll-Up" placeholder with this card (Finance sees the scoring to understand risk-adjustment basis).

> **DELTA AMENDMENT (3 additions):**
> 1. When a line item has clarity <50%, show an O2S Operations prep action: "O2S Response: Pre-positioning sourcing with baseline specs (constrained path). Estimated premium if clarity not provided by [date]: $X,XXX."
> 2. When a confidence penalty exists from a skipped upstream zone artifact (e.g., no Zone 3 Margin Plan), show a penalty badge: "Zone 3 Margin Plan not created — confidence penalty: -15%" with a resolution path: "Provide margin-relevant inputs in this tool to clear penalty. Forward resolution — Zone 4–5 captures at higher resolution." Do NOT show a "go back to Zone 3" link.
> 3. Add a visual distinction between soft gates (Zones 1–5, confidence penalty but no block) and the hard gate (Zone 6, must pass or remediate). Use a callout at the bottom: "Zones 1–5 apply confidence penalties for incomplete data. Zone 6 is a hard validation gate — items must pass preflight or be remediated before submission."

Commit message: "feat: add clarity/confidence scoring with pillar-specific dimensions and rationale"
```

---

## Prompt 9 of 12 — Fit Score & Opportunity Correlation (Zones 1–3)

```
In src/App.jsx, add a MockFitScore component for Zone 2 opportunity correlation.

**Component: MockFitScore**

The fit score engine that evaluates FP&A forecast data against O2S pillar capabilities. Layout:

- Toolbar: "Zone 2: Opportunity Correlation & Fit Scoring" label, "FP&A Committed Forecast — Q3 FY26" text, "Refresh Fit Scores" button.
- Subtitle: "Opportunities originate in CRM but are evaluated here against the FP&A committed forecast — the enterprise's one version of truth."

- KPI bar:
  - "FP&A Forecast Entries" → "41"
  - "Correlated to CRM Opportunities" → "28"
  - "High Fit (Equipment)" → "6 opportunities"
  - "Estimated O2S Revenue at Stake" → "$18.4M"

- Main table — Opportunity fit scoring:
  - Columns: Opportunity (from FP&A), Region, Project Type, Est. Value, Equipment Fit Score (rendered as a horizontal bar + percentage), Key Fit Drivers, Recommended Play, Zone
  - Sample rows:
    - "Hospital Expansion — Phoenix": Southwest, Healthcare, $85M, Fit: **92%** (green bar), Drivers: "Repetitive patient rooms → prefab, heavy MEP → crane + lifts", Play: "Early design-in meeting with prefab + equipment", Zone 2
    - "Data Center — Dallas": South, Data Center, $400M, Fit: **88%**, Drivers: "Long-lead power gen, high crane utilization, temp power demand", Play: "Engage estimating for Quick Quote", Zone 2
    - "Office TI — Chicago": Midwest, Office, $12M, Fit: **24%** (gray bar), Drivers: "Light equipment needs, short duration", Play: "Standard catalog only", Zone 1
    - "Warehouse — Atlanta": Southeast, Industrial, $45M, Fit: **61%** (amber bar), Drivers: "Earthmoving + material handling demand", Play: "Monitor — engage at Zone 3 if awarded", Zone 2

- Below the table: An "Indicator Alert" panel:
  - "⚡ Elevated Attention: Hospital Expansion — Phoenix"
  - "High fit score (92%) + long-lead crane risk + strategic client. Recommended: Pillar lead engagement before pursuit milestone."

- Bottom note: "Fit scores are computed using pillar-specific criteria: Hero Product Lines, Capacity Lulls, High-ROI Equipment categories, and historical project-type demand patterns."

**Integration:**
- Register in renderWorkflowContent.
- "O2S Operations" + Equipment Z1–3: Add as a card alongside the existing Demand Forecast. Title: "Fit Score & Opportunity Correlation." Description: "Evaluate FP&A committed forecast against equipment capabilities. Surface recommended engagement strategies before designs lock."
- "Leadership" + Equipment Z1–3: Replace the "Portfolio Watchlists" placeholder with this card (leadership wants to see where O2S can add value early).

> **DELTA AMENDMENT:** All references to CRM as data source have been corrected to FP&A by Delta Prompt 1. Ensure the subtitle reads: "Opportunities flow from the FP&A committed forecast — the enterprise's one version of truth — and are evaluated here against O2S pillar capabilities." Not "originate in CRM."

Commit message: "feat: add Zone 2 fit score engine and opportunity correlation"
```

---

## Prompt 10 of 12 — Multi-Zone Coexistence & Project Maturity

```
In src/App.jsx, add a MockProjectMaturity component showing how a project's packages occupy different zones simultaneously.

**Component: MockProjectMaturity**

A project health and maturity summary view. Layout:

- Toolbar: "Project Maturity Summary" label, project "Data Center TX", "Last refreshed: Real-time from systems of record"
- Subtitle: "A project is rarely in a single zone. This view shows the distribution of packages and line items across the zone lifecycle."

- Top section — Maturity Profile Bar:
  - A single horizontal stacked bar chart showing zone distribution:
    - Zone 7+ (green): 60% — "13 line items submitted & in execution"
    - Zone 5–6 (amber): 25% — "6 line items in refinement/preflight"
    - Zone 3–4 (gray): 15% — "3 line items still in early planning"
  - Below the bar: "Trailing Edge: Zone 3 — Temp power specifications pending client MEP decision"
  - "Leading Edge: Zone 8 — 8 items actively deployed on site"

- Section — Zone Distribution Drill-Down (a table grouped by zone):
  - Zone 8 group header (green): "8 items — Execution Active"
    - Rows: "Generator 200kW (×3)" — deployed, "Boom Lift 60ft (×5)" — deployed
  - Zone 7 group header (green): "5 items — Formally Submitted"
    - Rows: "Tower Crane 60T (×1)" — SLA: 2d remaining, "Excavator 30T (×4)" — SLA: On Track
  - Zone 5 group header (amber): "4 items — Intent Refinement"
    - Rows: "Switchgear 480V (×2)" — Clarity: 60%, "Scissor Lift (×2)" — Clarity: 85%
  - Zone 6 group header (amber): "2 items — Preflight"
    - Rows: "Light Tower (×2)" — Preflight: 1 conflict pending
  - Zone 3 group header (gray): "3 items — Early Planning"
    - Rows: "Temp Power Distribution (×3)" — Waiting on: MEP design package

- Section — "Blocked Items" callout:
  - "2 items blocked from zone progression:"
  - "Switchgear 480V — Gate condition not met: Full taxonomy (specification) incomplete"
  - "Temp Power Distribution — Gate condition not met: MEP design package not released in document management system"
  - Each shows a "What would advance this?" link that describes the specific gate condition.

- Section — "Ready-to-Act" summary:
  - "✅ 2 items ready for preflight submission"
  - "⚠️ 4 items need planning refinement"
  - "🔴 2 items blocked by missing gate conditions"

**Integration:**
- Register in renderWorkflowContent.
- "Leadership" + Equipment Z4–5: Replace placeholder with this card. Title: "Project Maturity & Zone Distribution." Description: "See where every package sits in the zone lifecycle. Identify trailing edges and blocked items."
- "O2S Operations" + Equipment: Also add to Z4–5 zone group — operations needs this view for capacity planning.
- "Project Teams" + Equipment: Also add to Z4–5 — project managers need to see their own maturity profile.

Commit message: "feat: add multi-zone coexistence view with project maturity summary"
```

---

## Prompt 11 of 12 — Zone Regression Handling

```
In src/App.jsx, add a MockRegressionEvent component showing how backward zone movement is handled as a first-class workflow.

**Component: MockRegressionEvent**

A regression event detail view showing a Zone 7 → Zone 6 regression. Layout:

- Toolbar with a distinct visual treatment (use a rose/red accent instead of the usual indigo to signal regression). Label: "⚠️ Zone Regression Detected". Badge: "Zone 7 → Zone 6".
- Event summary box (rose-tinted background):
  - "Request REQ-2024-0847 has regressed from Zone 7 to Zone 6."
  - "Triggering condition: Schedule change in P6 invalidated preflight date feasibility for 4 line items."
  - "Detected: Automatically via P6 schedule data sync — no manual reporting required."
  - "Timestamp: Nov 12, 2026, 2:14 PM CST"

- Impact Propagation section:
  - "Affected Line Items: 4 of 22"
  - A small table showing:
    - "Tower Crane 60T" — Prior zone: 7, New zone: 6, Reason: "Structural milestone shifted +3 weeks"
    - "Boom Lift 80ft (×2)" — Prior zone: 7, New zone: 6, Reason: "Dependent on crane erection date"
    - "Generator 200kW" — Prior zone: 7, New zone: 6, Reason: "Temp power schedule linked to crane mobilization"
  - Note: "Remaining 18 line items unaffected — zone state preserved."

- SLA Impact section:
  - "Downstream SLA clocks PAUSED for affected items."
  - "Original SLA deadline: Nov 18 → Clock stopped at 3d 14h remaining"
  - "SLA will resume upon re-preflight pass."

- Regression-Specific Actions (these are distinct from forward triggers):
  - Button: "Notify Request Owner — Re-Validation Required" (primary)
  - Button: "View Updated P6 Schedule Data" (outline)
  - Button: "Escalate to Operations Director" (outline)
  - Button: "View Preserved Zone 7 Artifacts" (link) — with note: "Original request pack preserved with 'superseded' status for audit trail."

- Bottom section — "Regression Analytics" (flywheel connection):
  - "This is the 3rd regression event for Data Center TX."
  - "Enterprise regression frequency (trailing 90 days): 12 events"
  - "Top cause: Schedule volatility (58%) | Design instability (25%) | Client changes (17%)"
  - "This data feeds Zone 9 flywheel for systemic intervention analysis."

**Integration:**
- Register in renderWorkflowContent.
- Add a new card visible from "O2S Operations" + Equipment in the Z6–7 zone group. Title: "Regression Events." Description: "When gate conditions become false, the system re-evaluates zone state and fires regression-specific triggers."
- Also show in "Leadership" + Equipment Z6–7 — leadership needs regression visibility.

Commit message: "feat: add zone regression handling with impact propagation and SLA pause"
```

---

## Prompt 12 of 12 — Updated Podcast Tour & Polish

```
In src/App.jsx, update the podcast tour (the tourData array and the tour overlay) to reflect the new architecture. Also add final polish.

**Tour Updates:**

Replace the current 5-step tour with a 7-step tour that matches the podcast narrative and uses the new components:

Step 1: "The Fragmentation Problem"
- targetNodes: [] (no highlight — just the intro)
- Transcript: "Imagine Sarah, a senior PM running a $400M data center. She relies on O2S — five distinct service pillars under one roof: Equipment, Logistics, Prefabrication, Procurement, and Professional Services. The problem? Each pillar evolved its own processes, tools, and language. No shared view of reality. The O2S Command Center is the cure."

Step 2: "The Zone Model — An Ungameable Spine"
- Highlight the zone progression bar (you'll need to give it a ref or id)
- Transcript: "The spine of the Command Center is the 9-zone model. It spans the full lifecycle from the earliest forecast to organizational learning. The critical principle: zone state is observed from system-of-record data, never manually declared. You cannot fake progress. The system surfaces reality automatically."

Step 3: "Early Demand Shaping (Zones 1–3)"
- targetNodes: ['fitScore', 'quotes', 'forecast', 'margin', 'fpa']
- Transcript: "Before a project is even won, the Command Center correlates FP&A committed forecasts against O2S capabilities through fit scoring. It generates directional Quick Quotes, builds risk-adjusted demand forecasts, and establishes margin plans — all feeding a structured handshake with FP&A."

Step 4: "Baseline, Intent & Clarity (Zones 4–5)"
- targetNodes: ['prepop', 'adhoc', 'clarity', 'costDelay', 'maturity']
- Transcript: "At award, the system auto-generates a V0 baseline. Project teams refine intents while the system tracks clarity and confidence at the line-item level. The duality principle emerges: early clarity unlocks the happy path. Late clarity forces the constrained path. The Command Center makes the cost of that gap mathematically visible."

Step 5: "Validation, Request & Triggers (Zones 6–7)"
- targetNodes: ['preflight', 'formalRequest', 'optimize', 'source', 'regression']
- Transcript: "Zone 6 runs automated preflight validation — catching conflicts before submission. Zone 7 is the moment of truth: validated requests enter systems of record and become O2S's live work-in-process. The trigger engine fires, serving dual audiences: operations gets action options, project teams get clarity demands. And when conditions change, regression is handled as a structural reality, not an error."

Step 6: "Execution & Exceptions (Zone 8)"
- targetNodes: ['execution', 'vendorScore']
- Transcript: "In Zone 8, the system shifts to exception management. It monitors telematics for underutilized assets, initiates cross-regional redeployment, and auto-compiles vendor performance scorecards from execution actuals. The system actively hunts for deviations from the plan."

Step 7: "The Learning Flywheel (Zone 9)"
- targetNodes: ['anomaly', 'flywheel']
- Transcript: "Zone 9 is what elevates this from a status tracker to a self-improving learning system. It captures variance between assumptions and actuals, generates template writeback recommendations, and builds undeniable evidence that early clarity produces better outcomes. Every completed project makes the next one smarter. The flywheel compounds."

**Additional Polish:**

1. Add a small "Observed, not declared" watermark/badge on every mock component toolbar — a tiny lock icon with tooltip: "Zone state derived from system-of-record data."

2. On the main grid page, when no card is selected, add a subtle footer below the grid:
   "The O2S Command Center is an orchestration layer — it sits above CRM, ERP, FP&A, and scheduling systems. It does not replace them. Doing the work creates the data."

3. Make sure every placeholder card for non-Equipment pillars shows the 4 zone group columns with the message: "[Pillar] workflows follow the same zone model, trigger engine, and persona-based views. Equipment is the first pillar fully mapped."

4. Update the page title from "Demand Funnel Concept" to "O2S Command Center — Demand Funnel Zones"

5. Ensure all new component IDs used in the tour (fitScore, clarity, costDelay, maturity, preflight, formalRequest, execution, vendorScore, flywheel, regression) match the IDs used when registering cards and in renderWorkflowContent.

> **DELTA AMENDMENT (3 additions):**
> 1. All CRM references in tour transcripts already corrected by Delta Prompt 1. Verify no CRM strings remain in tourData.
> 2. The "Observed" lock icon is already in the shared Toolbar via Delta Prompt 5. No additional work needed.
> 3. For non-Equipment pillar placeholder messages, include the pillar-specific duality example from the Duality Principle document: Equipment = "premium rental rates", Logistics = "compressed mobilization and higher GC/GR costs", Prefabrication = "lost fab slots and field rework", Procurement = "spot pricing and longer lead times", Professional Services = "rescheduled crews and delayed deliverables."

Commit message: "feat: update podcast tour to 7-step narrative and add final polish"
```

---

## Summary

| # | Prompt | What it builds | Key PRD/Podcast concept |
|---|--------|---------------|------------------------|
| 1 | Navigation Shell | Persona × pillar toggle + zone-grouped grid | Dual-audience views, cross-pillar architecture |
| 2 | Zone Spine | 9-zone progression bar | "Observed, not declared" zone model |
| 3 | Z6–7 Screens | Preflight validation + formal request | Gate validation, lineage tracking, SLA |
| 4 | Z8 Execution | Execution dashboard + vendor scorecards | Exception management, utilization monitoring |
| 5 | Z9 Flywheel | Variance analysis + template writeback | Self-improving learning system |
| 6 | Trigger Engine | Side panel with action catalog | Dual-audience triggers, writeback options |
| 7 | Duality View | Happy path vs. constrained path costs | Cost of delayed clarity, mirror effect |
| 8 | Scoring | Clarity/confidence at line-item level | Pillar-specific metrics, rationale, calibration |
| 9 | Fit Score | Zone 2 opportunity correlation | FP&A integration, recommended plays |
| 10 | Maturity | Multi-zone coexistence view | Composite project health, trailing edge |
| 11 | Regression | Backward zone movement handling | Regression triggers, SLA pause, artifact preservation |
| 12 | Tour & Polish | Updated 7-step tour + finishing touches | Full podcast narrative alignment |
