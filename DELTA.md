# O2S Command Center — Delta File

Cross-reference of Authority Gate Matrix, Duality Principle, and updated PRD against the wireframe codebase (App.jsx) and build plan (PROMPTS.md). All needed corrections below.

---

## CRITICAL — Fix before any new build prompts run

### D1. CRM replaced by FP&A as upstream authority (Zones 1–3)

The updated PRD explicitly states: "The enterprise FP&A forecast system is the authoritative data source for upstream demand signals (Zones 1–3). The FP&A system is currently maintained in Smartsheet as an interim solution... transitioning to Anaplan when available."

Every reference to "CRM" as the upstream source for Zones 1–3 is now wrong. The crosswalk is: **FP&A (Smartsheet/Anaplan) feeds Zones 1–3 gates → Command Center orchestrates → ERP is system of record for Zones 4+.**

**App.jsx corrections (8 changes):**

| Location | Current text | Corrected text |
|----------|-------------|----------------|
| MockQuickQuotes — export button | "Export to CRM Opportunity" | "Sync to FP&A Record" |
| MockFitScore subtitle (Prompt 9) | "Opportunities originate in CRM but are evaluated here against the FP&A committed forecast" | "Opportunities flow from the FP&A committed forecast — the enterprise's one version of truth — and are evaluated here against O2S pillar capabilities." |
| MockFitScore KPI | "Correlated to CRM Opportunities" | "Correlated to FP&A Entries" |
| MockFinancialModel KPI subtext | "Unadjusted CRM Rev" | "FP&A Gross Revenue" |
| MockFinancialModel table column | "CRM Gross Revenue" | "FP&A Gross Revenue" |
| Tour Step 2 transcript | "CRM stage changes" | "FP&A commitment status changes" |
| Tour Step 3 transcript | "correlates CRM opportunities" | "correlates FP&A forecast entries" |
| Footer text | "ERP, CRM, or telematics systems" | "FP&A, ERP, scheduling, and dispatch systems" |

**PROMPTS.md corrections (3 changes):**

| Prompt | Current text | Corrected text |
|--------|-------------|----------------|
| Prompt 9, subtitle text | "Opportunities originate in CRM but are evaluated here..." | Match corrected App.jsx text above |
| Prompt 12, Tour Step 3 | If it references CRM | Replace with FP&A |
| Prompt 12, Footer polish | References CRM | Replace with FP&A |

**Authority_Gate_Matrix.docx corrections (6 rows):**

The Authority Gate Matrix document itself still lists "CRM" as the Authoritative Data Source for all Zone 1–3 gates. These need updating to align with the PRD:

| Zone | Gate | Current Source | Corrected Source |
|------|------|---------------|-----------------|
| Zone 1 Macro | Forecast Exists | CRM + Regional Forecast Systems | FP&A (Smartsheet/Anaplan) + Regional Forecast Systems |
| Zone 1 Micro | Demand Signal Categorized | CRM Pipeline Data | FP&A Forecast Data |
| Zone 2 Macro | Opportunity Created | CRM (Opportunity/Pipeline) | FP&A (Committed Forecast / Opportunity) |
| Zone 2 Micro | Opportunity Qualified | CRM (Stage/Substage) | FP&A (Commitment Stage) |
| Zone 3 Macro | Active Pursuit | CRM (Pursuit Stage) | FP&A (Pursuit Stage Commitment) |
| Zone 3 Micro | Pursuit Shaped | CRM + Fit Score Engine | FP&A + Fit Score Engine |

---

### D2. Duality principle missing from four core mock components

The Duality Principle document is unambiguous: "Every workflow card must reflect this three-sided dynamic: (1) the O2S signal, (2) the project team's response window with both paths, (3) the O2S operations obligation." Four existing or planned components fail this test.

**MockPrePopulation (Zone 4, V0 Baseline Review):**
- Currently shows: A time-phased equipment grid with source badges. No duality framing.
- Missing: What happens if project team confirms vs. doesn't confirm this baseline.
- Fix: Add a duality callout bar below the table:
  - Left side (green): "If confirmed within 10 business days → O2S secures preferred sourcing at MSA rates"
  - Right side (red): "If unconfirmed → O2S begins constrained sourcing prep. Projected premium: +22% based on historical data."
  - Caption: "O2S will execute regardless. Early confirmation determines the cost position."

**MockClarityScoring (Zone 4–5, Prompt 8):**
- Currently planned: Shows scoring dimensions and rationale. No link to operational consequences.
- Missing: What O2S operations does when clarity is low.
- Fix: When a line item has clarity <50%, show an additional row detail section:
  - "O2S Operations Response: Pre-positioning sourcing with baseline specs (constrained path). Estimated premium if clarity not provided by [date]: $X,XXX."
  - This directly implements the duality doc's mandate that every workflow show the operations obligation.

**MockFormalRequest (Zone 7, Prompt 3):**
- Currently planned: Shows request pack with SLA tracking and lineage. No clarity-state impact.
- Missing: How the clarity level at submission time determines operations' fulfillment position.
- Fix: Add a "Fulfillment Position" section to the request view:
  - "Submitted at 68% average clarity. O2S fulfilling 14 items from strength (preferred sourcing). 8 items from constraint (widened search, spot-market pricing)."
  - Badge per line item: "Happy Path" (green) or "Constrained" (amber)

**MockExecutionDashboard (Zone 8, Prompt 4):**
- Currently planned: Shows active deployments with utilization and self-serve actions. No connection to upstream clarity.
- Missing: Root-cause visibility linking execution exceptions back to late clarity.
- Fix: Add a "Clarity Origin" column or tooltip to exception rows:
  - Example: Underutilized crane row → tooltip: "Spec mismatch traces to Zone 5 clarity gap: load chart not provided until 3 weeks after deadline."
  - This closes the loop from execution exceptions back to the duality dynamic, which feeds the Zone 9 flywheel.

---

## HIGH — Address in the build prompts before implementation

### D3. Gate condition badges missing from zone component toolbars

The Authority Gate Matrix defines specific macro and micro gate names per zone. None of the wireframe component toolbars reference these gate names, making it impossible for a reviewer to trace a screen back to the gate framework.

**Fix:** Every zone component's toolbar should display a gate badge:
- Zone 4 V0 Baseline: "Gate: Project Awarded (Macro) | Baseline Populated (Micro)"
- Zone 5 Clarity Scoring: "Gate: Plan Endorsed (Macro) | Intent Refined (Micro)"
- Zone 6 Preflight: "Gate: Preflight Passed (Macro) | Request Pack Assembled (Micro)"
- Zone 7 Formal Request: "Gate: Request Submitted (Macro) | Request Routed & Acknowledged (Micro)"
- Zone 8 Execution: "Gate: Execution In Progress (Macro) | Execution Milestones Met (Micro)"
- Zone 9 Flywheel: "Gate: Closeout Recorded (Macro) | Flywheel Feedback Complete (Micro)"

Implement as a small monospace badge with a database icon, styled consistently across all zone screens.

### D4. Persona-to-artifact assignment matrix

The Authority Gate Matrix lists Key Artifacts per zone. The Prompt 1 persona mapping needs a definitive crosswalk to ensure each artifact lands in the correct persona view. Here is the authoritative mapping:

**Zone 1–3 Artifacts:**
| Artifact | Project Teams | O2S Operations | Leadership | Finance & FP&A |
|----------|:---:|:---:|:---:|:---:|
| Portfolio Forecast Aggregate | | x | x | |
| Capacity/Constraint Watchlist | | x | x | |
| Fit Score by Pillar | | x | x | |
| Cross-Project Demand Aggregation | | x | x | |
| Precon Decision Pack | x | x | | |
| Margin Plan / Utilization Plan | x | | | x |

**Zone 4–5 Artifacts:**
| Artifact | Project Teams | O2S Operations | Leadership | Finance & FP&A |
|----------|:---:|:---:|:---:|:---:|
| V0 Baseline (Time-Phased Needs) | x | x | | |
| Make-Ready Trigger Actions | | x | | |
| Approved Intent / Refined Plan | x | x | | |
| Constraint/Profit Nudge Report | x | x | x | |
| Project Maturity Summary | x | x | x | |
| Clarity/Confidence Scoring | x | x | | x |

**Zone 6–7 Artifacts:**
| Artifact | Project Teams | O2S Operations | Leadership | Finance & FP&A |
|----------|:---:|:---:|:---:|:---:|
| Preflight Checklist (Pass/Fail) | x | x | | |
| Request Pack (One-Click Assembly) | x | | | |
| Formal Request with Full Lineage | x | x | | |
| Auto-Translated Work Orders | | x | | |
| Regression Events | | x | x | |

**Zone 8–9 Artifacts:**
| Artifact | Project Teams | O2S Operations | Leadership | Finance & FP&A |
|----------|:---:|:---:|:---:|:---:|
| Execution Status Dashboard | x | x | | |
| Closeout Capture Record | x | x | | |
| Vendor Performance Scorecard | | x | | |
| Cleaned Actuals Dataset | | x | x | x |
| Variance Analysis / Flywheel | | x | x | x |
| Billing Anomaly Detection | | | | x |
| Asset Lifecycle / CapEx Plan | | | x | |

**Fix:** Update PROMPTS.md Prompt 1 persona-pillar mapping to match this matrix exactly. Where the current mapping diverges (e.g., Quick Quotes currently assigned to Project Teams Z1–3 but not listed as a gate artifact), either add the artifact to the authority matrix as a pillar-specific tool or reassign the component.

### D5. FP&A → Command Center → ERP crosswalk visualization

The updated PRD defines a clear data flow that the wireframe never makes explicit:

```
FP&A (Smartsheet → Anaplan)
  │ READ: Forecast, Opportunity, Pursuit Stage, Product Family
  ▼
Command Center (Orchestration Layer — Zones 1–9)
  │ READ from ERP: Award status, job numbers, financial data (Zone 4+)
  │ WRITE to ERP: Request objects, work orders (Zone 7)
  │ READ from P6: Schedule milestones, phase dependencies
  │ READ from Dispatch/Logistics: Execution status, delivery confirmations
  │ READ from Procurement: Vendor catalogs, lead times, order status
  │ READ from Financial Systems: Actuals, billing, reconciliation
  ▼
Zone 9 Flywheel
  │ WRITE: Template updates, lead-time calibration, scoring weight adjustments
  │ (recommendations, not auto-overwrites — governance reviewed)
  ▼
Loops back to Zone 1 planning defaults
```

**Fix:** Add this crosswalk as a visible element in the wireframe. Options:
- A data flow diagram in the platform footer (replacing or supplementing the current dark bar)
- A dedicated "Architecture" card accessible from a help/info icon in the top nav
- An info tooltip on the zone progression spine showing which system feeds each zone group

### D6. Smartsheet → Anaplan transition indicator

The PRD specifies that FP&A currently runs on Smartsheet and will transition to Anaplan. The wireframe's "Sync to Anaplan" button and "Anaplan Sync Payload" table header imply Anaplan is already live.

**Fix:** In MockFinancialModel:
- Change "Sync to Anaplan" button to "Sync to FP&A" (system-agnostic)
- Change "Anaplan Sync Payload" header to "FP&A Sync Payload (Time-Phased Output)"
- Add a small badge: "Current: Smartsheet | Future: Anaplan" to indicate transition state

---

## MEDIUM — Incorporate during implementation

### D7. "Observed, not declared" watermark on all zone screens

PROMPTS.md Prompt 12 specifies adding a lock icon with tooltip to every mock component toolbar, but this needs to be baked into the shared Toolbar component from Prompt 1 so it's structural, not cosmetic.

**Fix:** Modify the Toolbar component to include:
```jsx
<Lock className="w-3 h-3 text-slate-400" />
<span className="text-[9px] text-slate-400 italic">Observed from system data</span>
```

### D8. Duality doc says pattern applies across ALL five pillars

The Duality Principle document explicitly maps the mirror effect to each pillar:
- Equipment: Late specs → premium rental rates
- Logistics: Late mob timing → compressed mobilization, higher GC/GR costs
- Prefabrication: Late design packages → lost fab slots, field rework
- Procurement: Late quantities → spot pricing
- Professional Services: Late scope → rescheduled crews, delayed deliverables

**Fix for non-Equipment pillar placeholders:** When displaying the "coming soon" state for non-Equipment pillars, include the pillar-specific duality example from this document. E.g., for Logistics:
> "Logistics workflows follow the same duality: Late clarity on mob/demob timing → O2S scrambles site services setup → project gets compressed mobilization and higher GC/GR costs."

This makes the pattern tangible even before those pillars are built out.

### D9. Risk adjustment descriptions missing from wireframe

The Authority Gate Matrix defines specific risk adjustments per zone that the wireframe doesn't surface:
- Zones 1–5: Confidence penalties for incomplete data (graceful degradation)
- Zone 6: Hard validation gate — no confidence penalty, items must pass
- Zones 7–8: SLA/escalation tracking
- Zone 9: Variance/flywheel analysis

**Fix:** The clarity/confidence scoring view (Prompt 8) should visually distinguish between:
- Zones where incomplete data applies a penalty but doesn't block (green/amber treatment)
- Zone 6 where items must pass or be remediated (red/hard-stop treatment)
- This distinction is what makes Zone 6 the "moment of truth" in the gate framework

### D10. "Confidence penalties resolve forward" principle not shown

The Authority Gate Matrix states: "If a Zone 3 tool was skipped, the Zones 4–6 refinement tools provide a path to supply the same information at higher resolution."

**Fix:** In the Zone 4–5 clarity scoring view, when a confidence penalty exists from a skipped Zone 3 artifact (e.g., no Margin Plan was created during pursuit), show:
- A penalty badge: "Zone 3 Margin Plan not created — confidence penalty applied (-15%)"
- A resolution path: "Provide margin-relevant inputs here to clear penalty. Zone 4–5 tools capture this at higher resolution than Zone 3 snapshot."
- Do NOT show a "Go back to Zone 3" link — the principle is forward-only resolution.

---

## LOW — Polish items

### D11. Terminology standardization

The PRD calls the product "Demand Funnel Zones, delivered as a core capability within the 02S Console." The wireframe calls it "O2S Command Center." The podcast calls it "O2S Command Center."

**Fix:** Use both: "O2S Command Center" as the product name in the UI, with "Demand Funnel Zones" as the framework subtitle. Page title: "O2S Command Center — Demand Funnel Zones"

### D12. Authority Gate Matrix is a standalone governance document

The wireframe should reference the Authority Gate Matrix as the definitive source for gate conditions, not embed gate logic directly. Every gate badge (D3) should link to the relevant row in the matrix.

**Fix:** Add a small "View Gate Definition" link on each gate badge that could eventually link to the governance document or an in-app gate reference panel.

---

## Summary: Impact on PROMPTS.md Build Plan

The 12 existing prompts need these amendments before execution:

| Prompt | Amendments Needed |
|--------|-------------------|
| **Prompt 1** | Replace all CRM references. Update persona-artifact mapping per D4 matrix. Add Smartsheet/Anaplan transition note to FP&A card. |
| **Prompt 2** | Add data source labels to zone spine (FP&A feeds Z1–3, ERP feeds Z4+). |
| **Prompt 3** | Add "Fulfillment Position" duality section to MockFormalRequest (D2). Add gate condition badges (D3). |
| **Prompt 4** | Add "Clarity Origin" tooltip to MockExecutionDashboard exception rows (D2). Add gate badges. |
| **Prompt 5** | No changes needed — flywheel design already aligns. |
| **Prompt 6** | Add explicit persona-conditional rendering logic for trigger duality (already specified, just emphasize). |
| **Prompt 7** | No changes needed — cost-of-delay view is correctly designed. |
| **Prompt 8** | Add O2S operations prep actions for low-clarity scenarios (D2). Add "confidence penalty resolves forward" indicator (D10). Add risk adjustment distinction for Zone 6 hard gate (D9). |
| **Prompt 9** | Replace all CRM references with FP&A. |
| **Prompt 10** | No changes needed. |
| **Prompt 11** | No changes needed. |
| **Prompt 12** | Replace CRM references in tour. Add "Observed" lock icon to shared Toolbar (D7). Add pillar-specific duality examples to non-Equipment placeholders (D8). Add FP&A→CC→ERP crosswalk to footer or info panel (D5). |
