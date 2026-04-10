# RSI & FSI Persona — Implementation Prompts

Each prompt below is scoped to a single commit. Paste them into Claude Code one at a time, in order. Each depends on the previous one completing.

---

## Prompt 1: Add the RSI & FSI persona tab and empty equipment grid

In `src/App.jsx`, add a fifth persona for RSI & FSI and wire up its empty equipment grid. This is the scaffolding commit — no new cards yet, just the tab and grid structure.

**Changes required:**

1. **Import a new icon.** Add `Users` to the lucide-react import on line 1-8. This will be the RSI & FSI tab icon (representing the bridge-role between teams).

2. **Add the persona to the `PERSONAS` array** (around line 1679-1684). Insert it as the second item — between `project-teams` and `o2s-ops` — since RSI & FSI conceptually sits between those two groups:
```js
{ id: 'rsi-fsi', label: 'RSI & FSI', icon: Users },
```

3. **Add an empty equipment grid entry to `PERSONA_EQUIPMENT_GRID`** (around line 1726-1751). Place it between `'project-teams'` and `'o2s-ops'`. For now, use only existing card IDs that are being duplicated from other personas — no new cards yet:
```js
'rsi-fsi': {
  'z1-3': { cards: ['quotes', 'fitscore', 'forecast'], placeholders: [] },
  'z4-5': { cards: ['prepop', 'adhoc', 'costofdelay', 'clarityscoring', 'projectmaturity'], placeholders: [] },
  'z6-7': { cards: ['preflight', 'formalrequest', 'regression'], placeholders: [] },
  'z8-9': { cards: ['execution', 'vendorscorecard', 'flywheel'], placeholders: [] },
},
```

4. **Add tour data for the RSI & FSI persona** in the `tourDataByPersona` object (around line 1826). Add this entry:
```js
'rsi-fsi': [
  { id: 0, title: "The Integration Layer", targetNodes: [], highlightSpine: true, transcript: "Welcome to the RSI & FSI command center. As Solutions Integration, you are the connective tissue between Project Teams and O2S Operations. RSIs engage during pursuit and pre-construction — shaping which O2S services apply, generating early estimates, and building engagement strategies. FSIs take over at award and stay through execution — facilitating baseline reviews, chasing clarity, managing handoffs, and closing the feedback loop. The Command Center gives you the tools to do this integration work inside the system rather than through phone calls and emails." },
  { id: 1, title: "Shape Engagement During Pursuit", targetNodes: ['quotes', 'fitscore', 'forecast'], highlightSpine: false, transcript: "In Zones 1–3, RSIs are the primary operators. Quick Quotes lets you generate directional equipment estimates using standardized O2S inputs to support go/no-go decisions. The Fit Score surfaces which FP&A committed forecast entries align with O2S capabilities — you use this to determine which projects warrant proactive outreach before designs lock. Asset Demand Forecast gives you portfolio-level demand visibility so you can prioritize regional engagement by project type and timing." },
  { id: 2, title: "Facilitate Baselines & Drive Clarity", targetNodes: ['prepop', 'adhoc', 'costofdelay', 'clarityscoring', 'projectmaturity'], highlightSpine: false, transcript: "At award, the FSI steps in. You facilitate the V0 Baseline Review with the project team — walking through the AI-generated equipment plan, confirming or adjusting each line item. Ad-Hoc Request Intake lets you enter requests on behalf of project teams who call or email. Clarity Scoring is your primary daily tool — monitoring how decision-ready each item is and targeting action to close gaps. Cost of Delay gives you the financial ammunition to push project teams for timely specifications. Project Maturity shows where every package sits so you can triage your day." },
  { id: 3, title: "Quality-Gate the Handoff", targetNodes: ['preflight', 'formalrequest', 'regression'], highlightSpine: false, transcript: "Before anything crosses into Zone 7, you're the quality assurance layer. Preflight Validation results flow through you — you work with the project team to resolve failures before resubmission. You facilitate the Formal Request & Handoff, ensuring the validated request pack is complete and properly routed to the right operations queue. When Regression Events fire — a schedule shift invalidates a preflight, a design reopens — you're the first person both sides call. Your view gives you immediate visibility into what regressed, why, and the downstream impact." },
  { id: 4, title: "Manage Exceptions & Close the Loop", targetNodes: ['execution', 'vendorscorecard', 'flywheel'], highlightSpine: false, transcript: "Through execution, you monitor exceptions across your assigned projects and coordinate resolution between the project team and operations. The Vendor Scorecard captures hard data automatically, but you contribute the qualitative on-the-ground review — how vendors actually performed from the project's perspective. The Learning Flywheel captures variance data, and you provide the narrative context behind the numbers — why a lead time was longer, why the constrained path was taken. Your insight makes the flywheel actionable, not just numerical." },
],
```

5. **Move Quick Quotes out of the `project-teams` grid.** In the `'project-teams'` section of `PERSONA_EQUIPMENT_GRID`, change the `z1-3` line from:
```js
'z1-3': { cards: ['quotes'], placeholders: [] },
```
to:
```js
'z1-3': { cards: [], placeholders: ['Quick Quotes — Moved to RSI & FSI'] },
```

After making these changes, run `npm run build` from the project root to verify there are no errors. Commit with message: "feat: add RSI & FSI persona tab with equipment grid and tour data"

---

## Prompt 2: Add 7 new card definitions to the CARD_REGISTRY

In `src/App.jsx`, add the 7 net-new cards to the `CARD_REGISTRY` object (around line 1701-1724) and add the `Handshake`, `FileText`, `ListChecks`, `ArrowRightLeft`, `ClipboardCheck`, `BookOpen`, `Flag` icons to the lucide-react import at the top of the file.

Add these 7 entries to the end of the `CARD_REGISTRY` object (before the closing `};`):

```js
pursuittracker: { title: 'Pursuit Engagement Tracker', description: 'Track RSI outreach status against FP&A-committed opportunities. Log engagement outcomes, project team feedback, and go/no-go decisions for O2S involvement.', icon: Handshake, colorClass: 'border-indigo-200 ring-2 ring-indigo-50', highlight: 'bg-indigo-500 text-white' },
valueproposal: { title: 'Pre-Construction Value Proposal', description: 'Generate structured value proposals showing project teams what O2S can deliver — prefab savings, equipment optimization, logistics coordination — and at what margin.', icon: FileText, colorClass: 'border-indigo-100', highlight: 'bg-indigo-100 text-indigo-600' },
clarityqueue: { title: 'Clarity Action Queue', description: 'Prioritized daily task list for FSIs generated from clarity scores, cost-of-delay thresholds, and approaching need dates across all assigned projects.', icon: ListChecks, colorClass: 'border-emerald-200 ring-2 ring-emerald-50', highlight: 'bg-emerald-500 text-white' },
handoffbrief: { title: 'RSI-to-FSI Handoff Brief', description: 'Structured handoff package at project award: original fit score, pre-construction commitments, margin plan context, and key project team contacts.', icon: ArrowRightLeft, colorClass: 'border-emerald-100', highlight: 'bg-emerald-100 text-emerald-600' },
handoffchecklist: { title: 'Handoff Readiness Checklist', description: 'Pre-Zone 7 quality gate: validate 100% clarity, all preflight items passed, cost-of-delay acknowledged, and SLA clock implications understood.', icon: ClipboardCheck, colorClass: 'border-amber-200 ring-2 ring-amber-50', highlight: 'bg-amber-500 text-white' },
closeout: { title: 'Project Closeout & Lessons Learned', description: 'Structured closeout capturing what worked, what didn\'t, which duality path was taken for each major item, and why. Feeds Zone 9 flywheel templates.', icon: BookOpen, colorClass: 'border-rose-100', highlight: 'bg-rose-100 text-rose-600' },
constrainedlog: { title: 'Constrained Path Escalation Log', description: 'Log root causes when items enter the constrained path — late client decisions, design iterations, regulatory holds — and track operational impact over time.', icon: Flag, colorClass: 'border-rose-200', highlight: 'bg-rose-100 text-rose-600' },
```

Then update the RSI & FSI equipment grid in `PERSONA_EQUIPMENT_GRID` to include the new card IDs:

```js
'rsi-fsi': {
  'z1-3': { cards: ['quotes', 'fitscore', 'forecast', 'pursuittracker', 'valueproposal'], placeholders: [] },
  'z4-5': { cards: ['prepop', 'adhoc', 'costofdelay', 'clarityscoring', 'projectmaturity', 'clarityqueue', 'handoffbrief'], placeholders: [] },
  'z6-7': { cards: ['preflight', 'formalrequest', 'regression', 'handoffchecklist'], placeholders: [] },
  'z8-9': { cards: ['execution', 'vendorscorecard', 'flywheel', 'closeout', 'constrainedlog'], placeholders: [] },
},
```

Also update the RSI & FSI tour data to reference the new card IDs. In the `tourDataByPersona['rsi-fsi']` array:
- Step 1 `targetNodes`: change to `['quotes', 'fitscore', 'forecast', 'pursuittracker', 'valueproposal']`
- Step 2 `targetNodes`: change to `['prepop', 'adhoc', 'costofdelay', 'clarityscoring', 'projectmaturity', 'clarityqueue', 'handoffbrief']`
- Step 3 `targetNodes`: change to `['preflight', 'formalrequest', 'regression', 'handoffchecklist']`
- Step 4 `targetNodes`: change to `['execution', 'vendorscorecard', 'flywheel', 'closeout', 'constrainedlog']`

Run `npm run build` to verify no errors. Commit with message: "feat: add 7 new RSI & FSI card definitions to CARD_REGISTRY"

---

## Prompt 3: Build the Pursuit Engagement Tracker mock simulation

In `src/App.jsx`, create a new `MockPursuitTracker` component and wire it into the `renderWorkflowContent` switch. Follow the exact patterns used by existing mock components (like `MockFitScore` or `MockProjectMaturity`) — use the shared `Toolbar`, `GateBadge`, `Badge`, `KPI`, and `DenseTable` components that already exist in the file.

**Component spec for `MockPursuitTracker`:**

- **Toolbar:** Left area shows a Handshake icon (indigo), title "Zone 2: Pursuit Engagement Tracker", and a GateBadge with macro="FP&A Forecast Committed" micro="Fit Score ≥ 60".
- **KPI row (4 KPIs):**
  - "Active Pursuits" → "14" with trend "+3" subtext "vs last quarter"
  - "Engaged by RSI" → "9 / 14" with trend "64%" subtext "engagement rate"
  - "Avg Days to First Contact" → "11" with trend "-4" subtext "vs prior period"
  - "Conversion to Award" → "41%" with trend "+6%" subtext "vs 12mo avg"
- **DenseTable** with headers: `['Project', 'Region', 'Fit Score', 'RSI Status', 'Days Since Signal', 'Action']`
  - Row 1: `['Phoenix Hyperscale DC', 'Southwest', '94', <Badge variant="green">Engaged</Badge>, '3', '']` with actionBtn "View Brief"
  - Row 2: `['Methodist Hospital Expansion', 'Central', '87', <Badge variant="green">Engaged</Badge>, '7', '']` with actionBtn "View Brief"
  - Row 3: `['DFW Logistics Hub', 'Southwest', '72', <Badge variant="yellow">Pending Outreach</Badge>, '12', '']` with actionBtn "Schedule Call"
  - Row 4: `['Atlanta Mixed-Use Tower', 'Southern', '68', <Badge variant="yellow">Pending Outreach</Badge>, '18', '']` with actionBtn "Schedule Call"
  - Row 5: `['Sacramento Biotech Campus', 'Pacific', '61', <Badge variant="red">No Response</Badge>, '31', '']` with actionBtn "Escalate"
- **Footer note** (italic, small, slate-400): "Opportunities sourced from FP&A committed forecast. Fit scores generated by Zone 2 correlation engine."

**Wiring:** In the `renderWorkflowContent` switch, add: `case 'pursuittracker': return <MockPursuitTracker />;`

Run `npm run build` to verify. Commit with message: "feat: add Pursuit Engagement Tracker mock simulation"

---

## Prompt 4: Build the Pre-Construction Value Proposal mock simulation

In `src/App.jsx`, create a new `MockValueProposal` component and wire it into `renderWorkflowContent`.

**Component spec for `MockValueProposal`:**

- **Toolbar:** Left area shows a FileText icon (indigo), title "Zone 3: Pre-Construction Value Proposal", GateBadge with macro="Pursuit Active" micro="RSI Engaged".
- **Layout:** Two-column split (1/3 left panel, 2/3 right panel), same pattern as MockQuickQuotes.
- **Left panel — "Proposal Parameters":**
  - Static form fields (display-only, not interactive): Project Name: "Phoenix Hyperscale DC", Project Type: "Data Center", Estimated Duration: "18 months", Region: "Southwest", Fit Score: "94"
- **Right panel — "O2S Value Summary":**
  - A section header "Recommended O2S Services" with 3 rows styled as mini-cards (border, rounded, padding):
    - Equipment: "Owned fleet deployment for tower cranes, generators, and earth-moving. Est. savings vs spot rental: $1.2M"
    - Prefabrication: "Electrical rack manufacturing for 4,200 repetitive runs. Est. labor savings: $890K"  
    - Logistics: "Centralized mob/demob coordination. Est. savings vs fragmented sourcing: $340K"
  - A summary bar at the bottom: "Total Projected O2S Value: $2.43M | Target Margin: 12.5% | Proposal Status: Draft"
- **Footer note** (italic, small): "Value estimates generated from historical project actuals via Zone 9 flywheel data. Subject to pre-construction refinement."

**Wiring:** `case 'valueproposal': return <MockValueProposal />;`

Run `npm run build`. Commit: "feat: add Pre-Construction Value Proposal mock simulation"

---

## Prompt 5: Build the Clarity Action Queue mock simulation

In `src/App.jsx`, create `MockClarityQueue` and wire it into `renderWorkflowContent`.

**Component spec for `MockClarityQueue`:**

- **Toolbar:** Left area: ListChecks icon (emerald), "Zone 4–5: Clarity Action Queue", GateBadge macro="Baselines Generated" micro="Clarity < 100%".
- **KPI row (4 KPIs):**
  - "Open Actions Today" → "23" 
  - "Critical (< 7 days)" → "6" with trend (red) "Requires immediate attention"
  - "Avg Clarity Score" → "62%" with trend "+4%" subtext "vs last week"
  - "Items Closed This Week" → "11" with trend "+3" subtext "vs prior week"
- **DenseTable** with headers: `['Priority', 'Project', 'Item', 'Clarity', 'Need Date', 'Gap', 'Action']`
  - Row 1: `[<Badge variant="red">CRITICAL</Badge>, 'Phoenix DC', '400T Crawler Crane', '34%', 'May 12', 'Spec Missing', '']` actionBtn "Send Request"
  - Row 2: `[<Badge variant="red">CRITICAL</Badge>, 'Phoenix DC', 'Switchgear 480V', '28%', 'May 18', 'Qty + Spec', '']` actionBtn "Schedule Mtg"
  - Row 3: `[<Badge variant="yellow">URGENT</Badge>, 'Methodist Hosp', 'Temp Power 2MW', '51%', 'Jun 03', 'Schedule TBD', '']` actionBtn "Send Request"
  - Row 4: `[<Badge variant="yellow">URGENT</Badge>, 'DFW Logistics', 'Scissor Lifts (x12)', '55%', 'Jun 10', 'Qty Unconfirmed', '']` actionBtn "Send Request"
  - Row 5: `[<Badge variant="green">STANDARD</Badge>, 'Atlanta Tower', 'Tower Crane TC-1', '71%', 'Jul 15', 'Spec Pending', '']` actionBtn "Track"
- **Footer note**: "Queue auto-generated from Clarity Scoring engine. Priority = f(clarity score, days to need date, cost-of-delay magnitude)."

**Wiring:** `case 'clarityqueue': return <MockClarityQueue />;`

Run `npm run build`. Commit: "feat: add Clarity Action Queue mock simulation"

---

## Prompt 6: Build the RSI-to-FSI Handoff Brief mock simulation

In `src/App.jsx`, create `MockHandoffBrief` and wire it into `renderWorkflowContent`.

**Component spec for `MockHandoffBrief`:**

- **Toolbar:** Left area: ArrowRightLeft icon (emerald), "Zone 4: RSI-to-FSI Handoff Brief", GateBadge macro="Project Awarded" micro="Zone 4 Entry".
- **Layout:** Full-width scrollable content area (no split columns).
- **Content — structured brief with sections separated by subtle borders:**
  - **Section 1 — "Project Overview"**: Static display fields in a 2x3 grid: Project: "Phoenix Hyperscale DC", Region: "Southwest", Award Date: "Mar 15, 2026", RSI Lead: "Marcus Chen", Estimated Value: "$420M", O2S Fit Score: "94"
  - **Section 2 — "Pre-Construction Commitments"**: A small table with 3 rows, headers `['Pillar', 'Commitment', 'Status']`:
    - Equipment | Owned fleet deployment — tower cranes, generators | <Badge variant="green">Confirmed</Badge>
    - Prefab | Electrical rack manufacturing — 4,200 runs | <Badge variant="green">Confirmed</Badge>
    - Logistics | Full mob/demob coordination | <Badge variant="yellow">Pending Scope</Badge>
  - **Section 3 — "Key Contacts"**: Small table, headers `['Role', 'Name', 'Notes']`:
    - Project Manager | Sarah Mitchell | Primary decision-maker. Prefers Teams over email.
    - Superintendent | James Rodriguez | On-site lead. Handles equipment day-to-day.
    - Client Rep | David Kim | Drives design decisions. Often delays spec finalization.
  - **Section 4 — "RSI Notes"**: A gray box with italic text: "Client is aggressive on schedule but historically slow on design sign-off. Expect constrained path on switchgear and mechanical systems. Prefab commitment is strong — Sarah championed it during pursuit. Logistics scope still needs mob date confirmation from the client."
- **Footer note**: "Handoff brief auto-generated at Zone 4 entry. RSI qualitative notes added manually."

**Wiring:** `case 'handoffbrief': return <MockHandoffBrief />;`

Run `npm run build`. Commit: "feat: add RSI-to-FSI Handoff Brief mock simulation"

---

## Prompt 7: Build the Handoff Readiness Checklist mock simulation

In `src/App.jsx`, create `MockHandoffChecklist` and wire it into `renderWorkflowContent`.

**Component spec for `MockHandoffChecklist`:**

- **Toolbar:** Left area: ClipboardCheck icon (amber), "Zone 6–7: Handoff Readiness Checklist", GateBadge macro="Preflight Complete" micro="Pre-Handoff QA".
- **Layout:** Full-width with a checklist-style interface.
- **Content:**
  - Header bar: Project selector showing "Phoenix Hyperscale DC — Equipment Pack #1 (14 items)"
  - **Checklist table** with headers `['Check', 'Status', 'Detail']`:
    - All items at 100% clarity | <Badge variant="green">PASS</Badge> | 14/14 items confirmed
    - Preflight validation — zero failures | <Badge variant="green">PASS</Badge> | All specs validated against structural docs
    - Cost-of-delay items acknowledged | <Badge variant="green">PASS</Badge> | PM signed off on 3 delay-risk items
    - Lead time feasibility confirmed | <Badge variant="yellow">WARN</Badge> | Switchgear at 15wk — 1wk buffer only
    - Budget alignment verified | <Badge variant="green">PASS</Badge> | Within 2.1% of Zone 3 margin plan
    - SLA clock implications reviewed with PM | <Badge variant="red">PENDING</Badge> | Meeting scheduled Apr 14
  - **Summary bar:** "5 of 6 checks passed. 1 pending action required before Zone 7 handoff."
  - A prominent button: "Complete Checklist & Authorize Handoff" (disabled/grayed since not all checks pass)
- **Footer note**: "Checklist auto-populated from Preflight Validation and Clarity Scoring. Final FSI review required before Zone 7 threshold."

**Wiring:** `case 'handoffchecklist': return <MockHandoffChecklist />;`

Run `npm run build`. Commit: "feat: add Handoff Readiness Checklist mock simulation"

---

## Prompt 8: Build the Project Closeout & Lessons Learned mock simulation

In `src/App.jsx`, create `MockCloseout` and wire it into `renderWorkflowContent`.

**Component spec for `MockCloseout`:**

- **Toolbar:** Left area: BookOpen icon (rose), "Zone 9: Project Closeout & Lessons Learned", GateBadge macro="Execution Complete" micro="Closeout Initiated".
- **KPI row (4 KPIs):**
  - "Equipment Items Closed" → "47 / 47"
  - "Happy Path %" → "68%" with trend "+8%" subtext "vs enterprise avg"
  - "Constrained Path %" → "32%" with trend "-8%" subtext "vs enterprise avg"
  - "Avg Clarity at Handoff" → "89%" with trend "+11%" subtext "vs baseline"
- **Section: "Duality Path Analysis"** — a DenseTable with headers `['Category', 'Items', 'Path', 'Outcome', 'Root Cause']`:
  - Tower Cranes | 2 | <Badge variant="green">Happy</Badge> | MSA pricing secured. 22% under budget. | Early spec from structural team
  - Generators | 3 | <Badge variant="red">Constrained</Badge> | Spot rental. 31% over budget. | Client delayed electrical design 6 wks
  - Scissor Lifts | 12 | <Badge variant="green">Happy</Badge> | Owned fleet deployed. Zero rental cost. | FSI pushed clarity in week 2
  - Switchgear | 4 | <Badge variant="red">Constrained</Badge> | Expedited freight. 18% over budget. | Regulatory review delayed specs
  - Temp Power | 3 | <Badge variant="yellow">Mixed</Badge> | Partial MSA. 7% over budget. | Scope changed mid-execution
- **Section: "FSI Narrative"** — gray background box with italic text: "Strong project overall. Sarah's team was responsive on most items but got caught on electrical design delays driven by the client. The constrained-path generator sourcing cost $180K in premiums that early clarity could have prevented. Recommending updated lead-time defaults for switchgear in Texas region — actual was 16wk vs 12wk template."
- **Section: "Flywheel Writebacks"** — small table with headers `['Template Update', 'Old Value', 'New Value', 'Confidence']`:
  - Switchgear lead time (TX) | 12 weeks | 16 weeks | <Badge variant="green">High</Badge>
  - Generator spot premium (SW) | +22% | +31% | <Badge variant="yellow">Medium</Badge>
  - Scissor lift utilization rate | 74% | 81% | <Badge variant="green">High</Badge>
- **Footer note**: "Closeout data auto-compiled from Zone 8 execution actuals. FSI narrative and flywheel recommendations require manual review before writeback."

**Wiring:** `case 'closeout': return <MockCloseout />;`

Run `npm run build`. Commit: "feat: add Project Closeout & Lessons Learned mock simulation"

---

## Prompt 9: Build the Constrained Path Escalation Log mock simulation

In `src/App.jsx`, create `MockConstrainedLog` and wire it into `renderWorkflowContent`.

**Component spec for `MockConstrainedLog`:**

- **Toolbar:** Left area: Flag icon (rose), "Zone 8–9: Constrained Path Escalation Log", GateBadge macro="Constrained Path Detected" micro="Root Cause Required".
- **KPI row (4 KPIs):**
  - "Active Escalations" → "8"
  - "Top Root Cause" → "Late Design" with subtext "38% of constrained items"
  - "Avg Cost Premium" → "+24%" with trend (red) "vs happy path baseline"
  - "Chronic Delay Teams" → "3" with subtext "flagged for leadership review"
- **DenseTable** with headers `['Date', 'Project', 'Item', 'Root Cause', 'Cost Impact', 'Ops Response']`:
  - Mar 28 | Phoenix DC | 480V Switchgear | <Badge variant="red">Late Design</Badge> | +$47K | Expedited freight from alternate vendor
  - Mar 22 | Phoenix DC | Backup Generators (x3) | <Badge variant="red">Client Decision</Badge> | +$180K | Spot market sourcing — 3 vendors contacted
  - Mar 15 | Methodist Hosp | Mechanical Skid #4 | <Badge variant="yellow">Regulatory Hold</Badge> | +$22K | Rescheduled fab slot — 2wk delay
  - Mar 10 | DFW Logistics | Forklift Fleet (x6) | <Badge variant="yellow">Scope Change</Badge> | +$15K | Re-sourced from regional fleet
  - Mar 03 | Atlanta Tower | Tower Crane Foundation | <Badge variant="red">Late Design</Badge> | +$63K | Emergency permit application
- **Section: "Root Cause Distribution"** — simple visual using 4 labeled bars or a text summary:
  - Late Design Sign-Off: 38% | Client Decision Delay: 28% | Regulatory Hold: 19% | Scope Change: 15%
- **Footer note**: "Escalation log feeds Zone 9 flywheel for systemic intervention analysis. Leadership review triggered when a project or region exceeds 3 constrained-path escalations in a 30-day window."

**Wiring:** `case 'constrainedlog': return <MockConstrainedLog />;`

Run `npm run build`. Commit: "feat: add Constrained Path Escalation Log mock simulation"

---

## Prompt 10: Update the RSI & FSI tour transcripts to reference all new cards

In `src/App.jsx`, update the `tourDataByPersona['rsi-fsi']` tour step transcripts to explicitly name and describe the new cards. Replace the existing transcripts with these updated versions:

- **Step 1 transcript** (targetNodes already updated in Prompt 2): "In Zones 1–3, RSIs are the primary operators. Quick Quotes lets you generate directional equipment estimates to support go/no-go decisions before blueprints are finalized. The Fit Score surfaces which FP&A forecast entries align with O2S capabilities — use this to prioritize proactive outreach. Asset Demand Forecast gives portfolio-level demand visibility for regional engagement planning. The Pursuit Engagement Tracker is your CRM for O2S engagement — it tracks which opportunities you've contacted, which are pending outreach, and logs go/no-go outcomes. When a fit score is high, the Pre-Construction Value Proposal generates a structured summary of what O2S can deliver and at what margin — the artifact that turns a fit score into a real commitment during Zone 3."

- **Step 2 transcript**: "At award, the FSI takes the lead. The RSI-to-FSI Handoff Brief packages everything the RSI learned during pursuit — fit score, pre-construction commitments, margin context, key contacts, and qualitative notes — so you don't start cold. You facilitate the V0 Baseline Review with the project team, handle Ad-Hoc Request Intake for teams that call or email instead of using the system, and monitor Clarity Scoring across all your assigned projects. Cost of Delay gives you the financial ammunition to push for timely specs. Project Maturity shows where every package sits so you can triage your day. And the Clarity Action Queue is your daily command center — a prioritized task list generated from clarity gaps, cost-of-delay thresholds, and approaching need dates. It tells you exactly what to work on today and gives you one-click actions to do it."

- **Step 3 transcript**: "Before anything crosses into Zone 7, you're the quality assurance layer. Preflight Validation results flow through you — you work with the project team to resolve failures before resubmission. The Handoff Readiness Checklist is your final gate: a structured checklist confirming 100% clarity, all preflight items passed, cost-of-delay acknowledged, and the project team understands the SLA clock that starts at handoff. Only when all checks pass do you authorize the Formal Request & Handoff into O2S Operations' queue. When Regression Events fire, you're the first person both sides call — your view gives immediate visibility into what regressed, why, and the full downstream impact."

- **Step 4 transcript**: "Through execution, you manage exceptions and close the feedback loop. The Execution Dashboard gives you real-time visibility across your assigned projects. Vendor Scorecards are auto-compiled from execution data, but you add the qualitative review — how vendors actually performed from the project's perspective. The Constrained Path Escalation Log is where you document root causes when items hit the constrained path — late client decisions, design delays, regulatory holds. Over time, this builds the evidence base that lets leadership see which patterns chronically force premium-cost execution. The Project Closeout & Lessons Learned card captures the full project story: which duality path was taken for each major item and why. And the Learning Flywheel writes your variance data and narrative context back into upstream templates — making the next project's baseline smarter because of the work you did on this one."

Run `npm run build`. Commit: "feat: finalize RSI & FSI tour transcripts with all new card references"
