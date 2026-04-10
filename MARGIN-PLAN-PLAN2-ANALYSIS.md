# Plan 2 — Intent vs. Code: Where the Current Implementation Falls Short

**Date:** April 10, 2026  
**Scope:** MockMarginPlan (lines 192–653) evaluated against Vernan's intent as re-interpreted in Plan 1, incorporating Joshua's three corrections.

---

## Method

Each section below takes one intent thread from the meeting, states what the code currently does, identifies the gap, and proposes the specific structural change needed. The PlanningLineItem pattern (lines 1220–1456) is the interaction reference model throughout.

---

## 1. The Margin Table Rows Must Be Click-to-Open Planning Surfaces

### Intent
Vernan's core feedback was that the margin plan needs to show where the numbers come from, what assumptions drive them, and what risks or opportunities surround each line. He said risks and opportunities need to be "part of the consideration of margin" — not a separate analysis. Joshua's correction confirms: follow the PlanningLineItem pattern. The collapsed row shows the overview; clicking opens an editable refinement panel with the underlying pursuit data.

### What the Code Does Now
Product line rows (lines 565–584) are flat, read-only table rows. They show: name, comment, source badge, TAM, capture%, revenue, cost, profit, margin%, probability. Clicking a pillar row expands to show these child rows — but clicking a child row does nothing. The narrative/risk data lives in a completely separate `captureAnalysis` array (lines 297–304) rendered only on the "Capture Analysis" tab (lines 457–488). There is zero connection between a product line row and its risk/narrative context.

### The Gap
**Critical.** The current design forces the RSI user to mentally stitch together information across two separate views. Vernan's whole point was that margin IS the integration of financial numbers + risk assessment + opportunity narrative. Separating them defeats the purpose.

### What Needs to Change

**Remove the Capture Analysis tab entirely.** The three-tab switcher (margin / capture / utilization) should become two views: **Margin Plan** and **Utilization**. All capture/risk/narrative data moves INTO the margin table rows.

**Add a click-to-expand panel on each product line row**, modeled on PlanningLineItem's expansion panel structure:

**Left column (~60%) — Pursuit Data (editable):**
- High-level pursuit inputs: Hours that create production, TAM package value, capture rate assumption
- Probability justification: Why is this line at 75%? At 50%? Free-text rationale field
- Key assumptions: What scope elements drive this line? What's confirmed vs. assumed?
- Source context: Where did the initial estimate come from (not as a badge, but as context — "Based on HCSS preliminary schedule" or "Vendor bid received 11/15/25")
- Comments field (already exists in data as `line.comment`, but currently rendered as an inline italic snippet — should be a full editable field in the expansion)

**Right column (~40%) — Risk & Opportunity Economics:**
- Capacity status: Available / Constrained / At Risk (currently in captureAnalysis)
- Deal quality: Strong / Moderate / Weak (currently in captureAnalysis)
- Risk flag with narrative (currently in captureAnalysis)
- Three-tier profit range for this specific line: Min / Probable / Max (data exists in pillar-level `minProfit`/`probableProfit`/`maxProfit` but not yet at line level)
- Downstream impact note: What happens to the pillar total if this line moves to min? To max?

**Action buttons** (following PlanningLineItem pattern):
- "Confirm Estimate" — locks the line as the RSI's validated number
- "Flag for Review" — marks it as needing pursuit team input
- "Save Draft" — preserves edits without changing state
- "Cancel" — collapses without saving

This is the single highest-impact change. It transforms the margin plan from a read-only financial summary into the active planning instrument Vernan needs.

---

## 2. The Capture Analysis Tab Should Not Exist as a Separate View

### Intent
Vernan explicitly said the risks and opportunities need to be "part of the consideration of margin." He did not ask for a separate risk analysis view — he asked for margin context to be richer.

### What the Code Does Now
Lines 395–398 render a three-way tab switcher: `['margin', 'capture', 'utilization']`. The capture tab (lines 457–488) shows a separate table with columns: Pillar, TAM Opportunity, Capture Rate, Capacity, Deal Quality, Risk Flag, Narrative. This is a pillar-level summary — it doesn't even break down to product lines.

### The Gap
**This tab shouldn't exist.** It fragments the RSI's workflow. The data it contains (capacity, deal quality, risk, narrative) belongs inside the product-line expansion panels described in §1.

### What Needs to Change
- Remove `'capture'` from the view switcher. Keep only `['margin', 'utilization']`.
- Delete the `captureAnalysis` data array (lines 297–304) and the capture tab rendering block (lines 457–488).
- Migrate the capacity/deal/risk/narrative data INTO each product line's data model, so it's accessible from the expansion panel.
- At the pillar level, the collapsed pillar row could show a small inline risk indicator (a colored dot or mini-badge) that summarizes the worst-case risk across its child lines. This gives the RSI a glanceable signal without needing a separate tab.

---

## 3. Source Data Framing: This Is the Planning Tool, Not a Data Provenance Tracker

### Intent
Joshua's second correction: "We should be viewing this tool as the eventual tool that people will want to plan in. The source data has high level pursuit data which is more around 'Hours that create production' and less about the counts, schedule duration, etc."

### What the Code Does Now
Source data appears as small grey badges on each product line row (line 571–573): `GCGR`, `HCSS`, `WinEst`, `Estimate`, `Vendor Bid`, `Spec Bid`, `CFCI`, `G&A`, `GCs`, `TBD`, `Shop Bid`. These are rendered as system-of-record labels — they look like metadata provenance tags.

### The Gap
**Moderate.** The badges aren't wrong, but their framing is. They read as "here's where this number was imported from," which positions the Command Center as a reporting layer that aggregates from other systems. The intent is the opposite: this IS the planning tool. Source data represents the high-level pursuit inputs (production hours, package values) that the RSI refines here.

### What Needs to Change
- In the collapsed product line row, the source badge can remain but should be reframed. Instead of a standalone provenance tag, it should read as "initial basis" context — e.g., appearing within the expansion panel's pursuit data section as "Initial estimate basis: HCSS preliminary schedule" rather than a floating badge.
- The expansion panel's editable fields should be the primary content. The source badge is secondary context — it tells you where the starting point came from, but the planning tool is where the number gets refined.
- The collapsed row should emphasize the CURRENT planned values (which the RSI has confirmed or is refining), not the source system. Source becomes a footnote, not a headline.
- In the expansion panel, include a field like "Pursuit Basis" that shows the original high-level input (e.g., "2,400 production hours @ $125/hr blended") and then the refined planning values below it.

---

## 4. Fee Structure: Persona-Gate It, Don't Warning-Label It

### Intent
Joshua's third correction: "We can call out that this is a number that is viewable to RSI and Leadership only so that the gamification isn't happening at the pursuit/project level. We shouldn't change our best in class operations, because of human behavior.. we just need to verify the humans that can understand the nuance are the only ones that see it."

### What the Code Does Now
Lines 491–503 render a fee structure bar with an amber `02S Only` badge. The bar shows Base Fee (3%), Self Perform (3%), Total Fee Potential ($10.5M). The amber badge reads as a warning — "be careful with this information."

### The Gap
**Moderate.** The amber badge sends the wrong signal. It says "this is sensitive, handle with care" rather than "this is gated to the right audience." The right approach is persona-gating: RSI and Leadership personas see the fee bar; project-level personas don't see it at all. No warning needed — if you can see it, you're authorized to see it.

### What Needs to Change
- Remove the amber `02S Only` badge.
- Add a persona-gating mechanism. In the wireframe context, this means:
  - Add a `persona` state variable (or prop) to MockMarginPlan: `const [persona, setPersona] = useState('rsi');` with options like `['rsi', 'leadership', 'project']`.
  - Conditionally render the fee structure bar only when `persona === 'rsi' || persona === 'leadership'`.
  - Add a small persona toggle in the toolbar (for demo purposes) so stakeholders can see how the view changes for different audiences.
- The fee bar itself stays clean and confident — no warning badges, no cautionary language. It's a business metric for people who understand it.

---

## 5. Probability Summary Gauges: Simplify or Integrate

### Intent
Vernan said "too many concepts" when looking at the card. The Pillar Probability Summary section (lines 504–536) adds six circular gauges — one per pillar — showing average probability with a "lines below 100%" subtext. This is a new visual concept layered on top of the table.

### What the Code Does Now
Lines 504–536 render a 3-column grid of pillar cards, each with an SVG circular progress gauge showing average probability across that pillar's lines. The gauge changes color (green >90%, amber >70%, red otherwise). Below each gauge is a count of how many lines are below 100%.

### The Gap
**Medium.** The gauges aren't wrong, but they add visual weight to information that should be visible inline. If the product line rows have click-to-expand panels with probability rationale (§1), and if the pillar rows show an inline risk indicator (§2), the separate probability summary section becomes redundant.

### What Needs to Change
- **Option A (Recommended): Remove the Pillar Probability Summary section entirely.** Instead, add a small probability indicator directly on each pillar's collapsed row — e.g., a colored dot or mini-bar in the Probability column that shows average probability at a glance. The detail lives in the expansion panels.
- **Option B:** Keep the summary section but move it below the table as a "risk posture" footer — a single horizontal strip showing all six pillars side-by-side with min/probable/max ranges, acting as a dashboard summary rather than a header element.

Option A is cleaner and aligns with Vernan's "too many concepts" feedback. The click-to-expand pattern puts the detail where it belongs — on the line itself.

---

## 6. The Pillar Row Collapse/Expand Should Be More Than a Table Accordion

### Intent
The current pillar expand/collapse (lines 547–586) is a standard table accordion: click the pillar name, child rows appear. This is fine for data browsing, but the margin plan needs to function as a planning instrument. The pillar row itself should communicate the pillar's health and planning state at a glance.

### What the Code Does Now
Pillar rows show: chevron, pillar name (bold), TAM, capture%, revenue, cost, profit (emerald), margin%, and a dash for probability. No health indicator, no state indicator, no visual signal about whether the pillar's lines are confirmed or still in draft.

### The Gap
**Medium.** The pillar row doesn't tell the RSI "how much of this pillar is planned vs. still at baseline." If 8 out of 9 Equipment lines are confirmed but 1 is flagged, the pillar row should signal that.

### What Needs to Change
- Add a small **planning state composition indicator** on each pillar row — similar to the "state composition strip" in MockProjectPlanning (baseline/in-review/planned/flagged counts). This could be a tiny stacked bar or a set of dot indicators showing how many child lines are in each state.
- Add the **average probability** to the pillar row's Probability column instead of the current dash (`—` on line 563).
- Add a **risk indicator** — a small colored dot (green/amber/red) based on the worst-risk child line, giving the RSI a glanceable alert without needing to expand.

---

## 7. The Utilization Tab Needs Tighter Integration

### Intent
Vernan described utilization as "bundled inside" the margin plan. The current implementation puts it in a separate tab, which is acceptable — utilization is a different lens on the same data. But the two views should feel connected, not independent.

### What the Code Does Now
The utilization tab (lines 602–649) renders a completely separate table with different columns (POC, Status, Start, Finish, Duration, % Complete). There's no cross-reference between a utilization row and its corresponding margin row.

### The Gap
**Low-Medium.** The utilization tab is structurally fine, but it should reference the financial data from the margin view so the RSI can see both dimensions. "Nick Nolin owns Civil Equipment, it's 0% complete, and it represents $1.75M in revenue."

### What Needs to Change
- Add a **Revenue** or **Profit** column to the utilization table so the financial weight of each line is visible alongside the operational status.
- Consider adding a **click-to-expand** on utilization rows that shows the same expansion panel as the margin view — or at minimum, a link/button that jumps the user to that line's margin expansion. The two views should be navigably connected.

---

## 8. NOP vs. Operating Profit Language

### Intent
Vernan specifically discussed Net Operating Profit (NOP) as distinct from operating profit — NOP includes G&A allocation, which matters for regional rollups. This is the metric RSI leadership cares about because it reflects the true cost of delivering the service.

### What the Code Does Now
Line 439: `<KPI label="02S Net Operating Profit" value="$7.46M" subtext="25.1% NOP (incl. G&A)" />` — this is correct. The KPI tile uses "Net Operating Profit" and the subtext clarifies it includes G&A.

### The Gap
**None at KPI level.** The tile is right. However, the table columns (lines 541–543) still say "Profit ($)" and "Margin %" — these should be consistent with the NOP framing. If the KPI says NOP, the table should say NOP.

### What Needs to Change
- Rename table column "Profit ($)" → "NOP ($)" and "Margin %" → "NOP %" for consistency.
- In the expansion panel (§1), the right-column economics section should use NOP terminology as well.

---

## 9. The Pursuit Phase Stepper Should Affect What's Editable

### Intent
The pursuit lifecycle (Go/No-Go → Pursuit → Pre-Award → Committed → Execution) is rendered as a visual stepper in the toolbar (lines 373–389). Vernan discussed how the margin plan evolves through these phases — early phases have more assumptions, later phases have more confirmed data.

### What the Code Does Now
The stepper is purely visual. It shows "Pursuit" as the active phase. It has no effect on what data is editable, what fields appear in expansion panels, or what level of detail is expected.

### The Gap
**Low for wireframe, high for intent.** In a wireframe, it's acceptable that the stepper is visual-only. But the intent should be clear: when the expansion panels are built (§1), the editable fields should eventually vary by phase. Early pursuit shows high-level "hours that create production" fields. Pre-Award shows more detailed cost breakdowns. Committed locks most fields and shows confirmed values.

### What Needs to Change
- For now, no code change needed — the stepper is fine as a visual indicator.
- **But:** the expansion panel design (§1) should acknowledge phase sensitivity. Include a small note or visual cue in the expansion panel that says which phase the project is in and what refinement is expected at this stage. E.g., "Pursuit Phase — High-level estimates expected. Detailed specs not required until Pre-Award."

---

## Summary: Priority-Ordered Change List

| # | Change | Severity | Effort |
|---|--------|----------|--------|
| 1 | Add click-to-expand panels on product line rows (pursuit data + risk economics) | Critical | High |
| 2 | Remove Capture Analysis tab; migrate data into expansion panels | Critical | Medium |
| 3 | Persona-gate the fee structure bar (remove amber badge) | Moderate | Low |
| 4 | Reframe source badges as "pursuit basis" context in expansion panels | Moderate | Low |
| 5 | Remove or relocate Pillar Probability Summary gauges | Moderate | Low |
| 6 | Enrich pillar rows with avg probability, risk dot, planning state indicators | Medium | Medium |
| 7 | Add financial column to utilization tab; connect views | Low-Med | Low |
| 8 | Rename Profit/Margin columns to NOP terminology | Low | Trivial |
| 9 | Phase-aware expansion panel cues | Low | Low |

---

## Next Step

These nine changes should be distilled into discrete, single-commit Claude Code prompts. The implementation order should follow the dependency chain:

1. **First:** Data model restructuring — move captureAnalysis data into product line objects, add line-level states, add persona variable
2. **Second:** Build the click-to-expand expansion panel on product line rows
3. **Third:** Remove the Capture Analysis tab and three-way switcher
4. **Fourth:** Persona-gate the fee structure
5. **Fifth:** Enrich pillar rows (probability, risk dot, state composition)
6. **Sixth:** Reframe source badges
7. **Seventh:** Utilization tab enhancements
8. **Eighth:** NOP terminology alignment
9. **Ninth:** Phase-aware expansion panel cues
