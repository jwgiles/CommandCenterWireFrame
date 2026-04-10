# Margin Plan Card Redesign — Grounded in the 02S Project Plan

**Date:** April 10, 2026
**Source Document:** 02S Project Plan — Disney East PS.xlsx (Ver. 12/10/25)
**Target Component:** `MockMarginPlan` in `src/App.jsx` (lines 192–220)

---

## 1. What the Excel Actually Contains

The project plan reveals a Margin Plan that is far more structured and layered than what the wireframe currently shows. Here is the real data architecture:

### Margin Plan Sheet — Structure

The sheet is organized around a **project-level TAM opportunity** ($50.8M) that flows through a capture-rate filter to produce an **O2S Revenue Estimate** ($29.76M) and an **O2S Operating Profit** ($7.46M, ~25.1% margin). It then breaks this down across **six pillars**, each with their own product lines:

**Pillar → Product Line Hierarchy:**

- **Equipment** ($10.33M rev, $4.33M profit, ~42% OP margin) — Fleet Vehicles, Owned-Equipment (GC/GR, Civil, Concrete, Electrical), Vendor Re-rents, Trade Partner Rental (CCERP/O2RP), IT/Computers, Temporary Power
- **Procurement** ($6.56M rev, $831K profit, ~12.7% OP margin) — EQUIP (EV Chargers), Commodity Purchase, Furniture, MEP Equipment (CFCI)
- **Prefabrication** ($9.50M rev, $1.69M profit, ~17.8% OP margin) — Concrete Formwork, Steel Fabrication, Metal Stud Manufacturing, Low-Voltage Panels, Electrical, Mechanical, Process Piping
- **Professional Services** ($875K rev, $131K profit, ~15% OP margin) — Mapping, Controls, Thermography, Viz
- **Logistics** ($1.97M rev, $295K profit, ~15% OP margin) — GC/GR Site Services, Trucking/Freight, Fuel Depot, Charge Out Rate
- **Other** ($525K rev, $525K profit, 100% margin) — Archive

**Key financial columns per product line:** Package Value, % Capture, Revenue Estimate (O2S), Cost Estimate, Profit ($), % Profit, Probability %, Min/Probable/Max Profit Adjustments, and Comments.

**Critical concept:** The sheet uses a **three-tier profit range** — Minimum, Probable, and Maximum — driven by probability weighting. This is the risk-adjustment mechanism that should feed the FP&A Sync card downstream.

### Utilization Plan Sheet — Structure

This is a parallel operational view that maps each product line down to **specific personnel assignments, equipment categories, TAM capture values, status tracking, and timeline data**:

- **Point of Contact** per line item (e.g., Jocelyn Palafox → Fleet Vehicles, Nick Nolin → Civil equipment, Steve Lane → Concrete)
- **Status column:** Not Started, Started, etc.
- **Duration tracking:** Total Duration (Months), Remaining Duration (Months), % Complete
- **ETAM vs TAM Capture** per line (estimated TAM vs. what O2S actually captures)
- **Multi-project header:** The plan supports up to 5 concurrent projects (Disney Eastern PS + San Marcos MOB + Parking Structure + 2 TBD), suggesting this is a resource-sharing/utilization view across a portfolio

### Summary Sheet — Burn Curve

The Summary sheet provides a **Year-over-Year and Quarterly revenue/profit burn** (2026–2035), showing how this project's value flows through time. Q3 2026 starts at $1.5M rev, peaks Q2 2027 at $5.4M, and tails off through Q1 2028.

---

## 2. What the Wireframe Currently Shows

The existing `MockMarginPlan` component (lines 192–220) is a minimal placeholder:

- **3 KPI tiles:** Target Revenue ($4.50M), Planned Cost ($3.15M), O2S Margin % (30.0%)
- **A flat table** with 5 hardcoded rows using generic names: "Equipment Operations (Total)", "Heavy Machinery", "Small Tools", "Logistics Operations (Total)", "Prefabrication (Total)"
- **Columns:** Cost Center, Revenue, Cost, Margin $, Margin %
- **No pillar breakdown logic,** no probability/risk adjustment, no utilization overlay, no personnel, no three-tier profit range, no burn curve, no capture-rate mechanics

It reads as a generic margin summary that could belong to any business. It doesn't reflect the actual O2S margin planning process at all.

---

## 3. The Gap — What Needs to Change

| Dimension | Current Wireframe | Real 02S Project Plan | Gap Severity |
|-----------|------------------|----------------------|--------------|
| Project context | Generic "Project Alpha" | Named project, job number, contract value, market type, delivery method, key personnel | Critical — no identity |
| Revenue logic | Flat hardcoded dollar amounts | TAM → Capture Rate → Revenue Estimate pipeline | Critical — hides the mechanism |
| Profit model | Single margin % | Three-tier (Min/Probable/Max) with probability weighting | Critical — no risk framing |
| Pillar hierarchy | 5 generic rows | 6 pillars with 20+ product lines, expandable | High — loses operational detail |
| Personnel / ownership | None | VP Ops, Ops Director, Precon Lead + per-line POCs | High — no accountability thread |
| Utilization linkage | None | Full utilization plan with status, duration, % complete | High — the "bundled" data is invisible |
| Time-phased burn | None | YOY + Quarterly revenue/profit burn curve | Medium — exists in FP&A Sync but not linked here |
| Fee structure | None | Base Fee (3%), Self Perform increment, total fee potential | Medium — business model not visible |
| Multi-project context | Single project | Supports portfolio view (5 project slots in Utilization Plan) | Medium — portfolio angle missing |
| Comments / notes | None | Per-line comments (e.g., "Incl. job trucks", "EV Chargers", "Approx. (2) miles of 12kV ductbank") | Low — helpful context |

---

## 4. Proposed Redesign

### 4A. Restructured Header — Project Identity + Financial Summary

Replace the 3 generic KPI tiles with a **project identity bar** and a **financial summary strip**:

**Project Identity Bar:**
- Job Number badge (e.g., `250030`)
- Project Name: Disney Eastern PS
- Contract Value: $350M | Market: Parking Structure | Type: Lump-sum | Method: Design/Build
- Key Personnel: VP Ops (Allen Lynn), Ops Director (Halverson), Precon Lead (Yoder)
- Gate Badge: Current zone state (observed, as per existing convention)

**Financial Summary Strip (4 KPIs replacing 3):**
- **TAM Opportunity:** $50.8M (total addressable market for O2S on this project)
- **TAM Capture Rate:** 58.6% (what portion O2S expects to win)
- **O2S Revenue Estimate:** $29.76M (the captured slice)
- **O2S Operating Profit:** $7.46M @ 25.1% (the money O2S actually makes)

This immediately tells the story: here's how big the project is, here's how much of it O2S touches, and here's what O2S earns from it.

### 4B. Pillar Breakdown Table — Expandable Hierarchy

Replace the flat 5-row table with an **expandable accordion table** that mirrors the real structure:

**Top-level rows (one per pillar):** Equipment, Procurement, Prefabrication, Professional Services, Logistics, Other

**Columns:**
- Pillar / Product Line (name)
- Package Value (total addressable for that line)
- % Capture (how much O2S wins)
- O2S Revenue
- O2S Cost
- O2S Profit ($)
- Profit Margin (%)
- Probability (%)

**Expandable child rows** reveal the product lines underneath each pillar. For example, expanding "Equipment" shows Fleet Vehicles, Owned-Equipment (GC/GR), Owned-Equipment (Civil), Owned-Equipment (Concrete), etc. — each with their own financials.

**Subtotal rows** per pillar should be visually distinct (bold, slight background tint).

### 4C. Three-Tier Profit Visualization — The Risk Ribbon

Add a **risk-adjusted profit range** visualization below or alongside the table. The Excel contains Min, Probable, and Max profit adjustments per line — this is the probability-weighted spread that defines the risk envelope.

Display this as a **horizontal bar or ribbon per pillar** showing:
- Left edge: Minimum Profit (probability-floored)
- Center marker: Probable Profit (expected case)
- Right edge: Maximum Profit (best case)
- A vertical "Entry" line showing the Entry Profit % (25.1%)

This makes the risk posture visible at a glance, which is essential for the Finance & FP&A persona.

### 4D. Utilization Plan Overlay — The Bundled View

Since the Utilization Plan is "bundled inside" the margin plan, integrate it as a **toggle or tab** within the same card. When activated, each product line row gains additional columns or an inline expansion:

**Utilization columns:**
- Point of Contact (named person)
- Status (Not Started / Started / Complete — use existing badge patterns)
- Start → Finish dates
- % Complete (progress bar)
- Remaining Duration

This is where accountability lives. The margin plan says "we expect $1.75M from Civil Equipment." The utilization overlay says "Nick Nolin owns it, it starts June 2026, and it's 0% complete."

### 4E. Fee Structure Callout

Add a small **fee summary bar** (perhaps in the header area) showing:
- Base Fee: 3%
- Self Perform Premium: 3%
- Total Fee Potential: $10.5M (the management fee O2S earns regardless of execution margins)
- O2S Share: $7.46M (the portion attributed to this business unit)

This is a detail the current wireframe completely ignores but is central to how O2S's business model works.

### 4F. Burn Curve Sparkline (Optional)

Add a small **quarterly burn sparkline** in the header area or as a collapsible section. The Summary sheet provides quarterly revenue and profit data — showing the shape of the project's cash flow makes the margin plan feel alive rather than static.

---

## 5. Data Flow Implications

The redesigned Margin Plan card should be understood as the **source of truth that feeds downstream cards:**

- **FP&A Sync card** (MockFinancialModel): The three-tier profit range and time-phased burn from the Margin Plan should be what the FP&A card reconciles against. Currently the FP&A card uses independent mock data. After redesign, it should reference the margin plan's output.
- **Clarity/Confidence Scoring** (Zone 4–5): The per-line probability percentages in the margin plan are effectively the "confidence" inputs. A product line with 50% probability should map to a confidence penalty in the clarity card.
- **Execution Dashboard** (Zone 8–9): The Utilization Plan data (status, % complete, remaining duration) is the operational reality that the execution dashboard should eventually consume.

---

## 6. Implementation Approach

**Phase 1 — Data & Structure (do first):**
Replace the hardcoded mock data array with a structured data model that mirrors the real Excel hierarchy. Use the Disney Eastern PS numbers directly as the mock data — this makes the wireframe a credible demo.

**Phase 2 — Expandable Table:**
Build the accordion table with pillar-level summary rows and expandable product-line detail rows. Keep the same visual language (slate backgrounds, mono fonts, emerald for positive values) already established in the wireframe.

**Phase 3 — Header Redesign:**
Replace the 3 KPI tiles with the project identity bar + 4-KPI financial strip + fee callout. Maintain the existing Toolbar component pattern.

**Phase 4 — Risk Ribbon:**
Add the three-tier profit visualization. This is the highest-impact visual change — it communicates risk posture instantly.

**Phase 5 — Utilization Toggle:**
Add the utilization overlay as a view toggle. This is the "bundled" element the user specifically called out.

**Phase 6 — Downstream Alignment:**
Update the FP&A Sync card's mock data to reference the margin plan's output numbers, ensuring the two cards tell a coherent story.

---

## 7. What NOT to Change

- The card's **position** in the wireframe (Finance & FP&A persona, Zones 1–3) stays the same
- The **zone-based gate system** and duality principle remain untouched
- The card's **title and description** in the navigation metadata stay as-is
- The **Toolbar component pattern** (left area = identity, right area = metadata/actions) is preserved
- The **color language** (indigo for margin plan, emerald for FP&A) is preserved
