# Walkthrough Implementation Prompts

> **Purpose:** Three sequential Claude Code prompts that replace the generic "Play 3.18 Podcast Walkthrough" tour with a persona-specific "Walkthrough" system. Run these in order — each builds on the previous commit.

---

## Prompt 1 of 3 — Replace tourData with tourDataByPersona

**File:** `src/App.jsx`

In the `App` component (around line 1826), there is a `const tourData = [...]` array containing 7 generic tour steps. **Delete the entire `tourData` array** (from `const tourData = [` through the closing `];`) and replace it with the following `tourDataByPersona` object. This object contains 4 keys — one per persona — each with 5 steps. Every step has `id`, `title`, `targetNodes` (card IDs to highlight), `highlightSpine` (boolean), and `transcript` (narrative text).

```js
const tourDataByPersona = {
  'project-teams': [
    { id: 0, title: "Your Equipment Starts Here", targetNodes: [], highlightSpine: true, transcript: "Welcome to your equipment command center. As a project team, you're used to requesting equipment through emails, phone calls, and spreadsheets — then waiting to find out if what you need is even available. This platform replaces that blind spot with a single demand funnel organized into nine zones. You don't need to manage these zones manually. The system observes your project's progress from system-of-record data and shows you exactly where every equipment need stands. Your job: provide clarity on what you need. The earlier you do, the better the pricing and availability you unlock." },
    { id: 1, title: "Get Early Pricing Confidence", targetNodes: ['quotes'], highlightSpine: false, transcript: "Before blueprints are finalized, you often need a rough sense of what equipment will cost. Quick Quotes lets you generate a directional equipment estimate by entering basic project parameters — type, duration, square footage, and market. The system runs ML models trained on historical O2S data to return a cost range with a confidence interval. Use this to inform pre-construction budgets, go/no-go decisions, and client conversations. You're not committing to anything here; you're getting early intelligence so you're not blindsided later." },
    { id: 2, title: "Review Your Baseline & Refine Intent", targetNodes: ['prepop', 'adhoc', 'costofdelay', 'clarityscoring', 'projectmaturity'], highlightSpine: false, transcript: "When your project is awarded, the system auto-generates a V0 equipment baseline — a time-phased draft of what you'll likely need, pulled from AI models, historical patterns, and your schedule. You don't start from scratch. Review the baseline, confirm or adjust quantities and timing, and submit ad-hoc requests for anything the model missed. Clarity Scoring shows you how 'decision-ready' each line item is across quantity, specification, and schedule dimensions. Cost of Delay puts a dollar figure on every week you haven't finalized specs — not to pressure you, but to give you ammunition when pushing your own clients and designers for answers. Project Maturity shows which line items are in which zones simultaneously, because your project isn't a single dot on a timeline." },
    { id: 3, title: "Validate Before It Leaves Your Hands", targetNodes: ['preflight'], highlightSpine: false, transcript: "Before anything crosses the execution threshold, Preflight Validation automatically checks every line item against business rules: Are lead times realistic given supply chain constraints? Do the specifications match your structural documents? Are there budget conflicts? Items that pass get packaged into a conflict-free request pack and handed off to O2S Operations. Items that fail get flagged with specific resolution steps so you can fix them before they become expensive downstream problems. This is your quality gate — it catches the crane-rated-for-40-tons-but-your-panels-weigh-60-tons mistakes before they hit the field." },
    { id: 4, title: "Track What's Happening on Your Site", targetNodes: ['execution'], highlightSpine: false, transcript: "Once equipment hits the dirt, the Execution Dashboard gives you real-time visibility into mobilization status, utilization rates, and exception flags across your active deployments. You'll see when a generator has been sitting idle for two weeks or when a delivery SLA has been breached — without waiting for a Friday status email. This is your window into the operational reality of your project's equipment, giving you the information you need to make decisions about extensions, returns, and change orders before costs compound." },
  ],

  'o2s-ops': [
    { id: 0, title: "See Demand Before It Becomes a Fire Drill", targetNodes: [], highlightSpine: true, transcript: "Welcome to your operations command center. Today, equipment requests arrive as urgent emails with no context about where they came from or how confident the project team is. This platform gives you forward visibility into the entire demand pipeline — organized into nine zones from earliest forecast through execution and learning. Zone state is observed from system-of-record data, so the progression you see is trustworthy and ungameable. The earlier you see demand forming, the more time you have to position fleet, negotiate vendor terms, and plan fulfillment from strength rather than scrambling at the last minute." },
    { id: 1, title: "Forecast Demand & Identify Opportunities Early", targetNodes: ['forecast', 'fitscore'], highlightSpine: false, transcript: "Asset Demand Forecasting aggregates probability-weighted demand by cat class across the entire portfolio, spanning Zones 1 through 7. You can see which asset categories are trending toward constraint and which have surplus capacity — months before requests arrive. The Fit Score evaluates FP&A committed forecast entries against O2S equipment capabilities, surfacing which projects are high-value engagement opportunities. Use this to approach project teams proactively: 'We see your data center will need tower cranes in Q3. Let's plan now so we can fulfill from owned fleet instead of paying spot-market premiums.'" },
    { id: 2, title: "Monitor Clarity & Prepare Both Paths", targetNodes: ['prepop-ops', 'costofdelay', 'clarityscoring', 'projectmaturity'], highlightSpine: false, transcript: "As projects move from forecast to intent, your concern shifts to fulfillment readiness. The V0 Baseline shows the AI-generated equipment plan — your early signal about what's coming. Clarity Scoring tells you exactly how decision-ready each line item is. When clarity is low, the duality principle kicks in: you'll see the happy path (project confirms specs early, you fulfill from MSA rates and owned fleet) and the constrained path (specs are late, you begin pre-positioning with baseline assumptions at higher cost). Cost of Delay quantifies the premium so project teams understand the financial impact of their timeline. Project Maturity shows the full zone distribution so you can identify which items need your attention now versus which are still forming." },
    { id: 3, title: "Optimize Fulfillment & Execute Requests", targetNodes: ['optimize', 'source', 'formalrequest', 'regression'], highlightSpine: false, transcript: "This is where your operational expertise meets data-driven decision support. The Owned vs. Re-Rent Optimizer evaluates enterprise-wide fleet capacity and recommends whether each request should be fulfilled from owned assets (lower cost, higher utilization) or external re-rent (faster availability, no fleet commitment). Strategic Sourcing pushes validated demand to procurement with full context. Formal Request packages everything with lineage traceability and SLA-tracked routing. And when conditions change — a project delays, specs get revised — the Regression Event engine detects backward movement automatically, pauses affected SLAs, and recalculates downstream impact so you're never blindsided by a silent schedule slip." },
    { id: 4, title: "Execute, Score Vendors & Feed the Flywheel", targetNodes: ['execution', 'vendorscorecard', 'flywheel'], highlightSpine: false, transcript: "Equipment hits the field. The Execution Dashboard tracks utilization, mobilization, and exceptions in real time. Triggers fire automatically when anomalies appear — underutilized assets get flagged for redeployment, vendor SLA breaches escalate to the right person. Every vendor interaction feeds the Vendor Scorecard: on-time delivery, damage rates, pricing accuracy. This is institutional memory that makes your next sourcing decision smarter. And the Learning Flywheel closes the loop — every actualized cost, duration, and outcome is compared against the V0 baseline. Variances are analyzed and written back into estimation templates, sourcing logic, and forecasting models. The next project like this one starts with a better baseline because of the work you did on this one." },
  ],

  'leadership': [
    { id: 0, title: "One View of Enterprise Equipment Health", targetNodes: [], highlightSpine: true, transcript: "Welcome to the strategic view. As a leader, your concern isn't individual line items — it's portfolio-level health, capital allocation, and organizational capability. The zone spine gives you a single, objective map of where demand sits across the entire enterprise. Because zone state is observed from system-of-record data (not manually reported), this view is ungameable. You're not seeing what people claim is happening; you're seeing what the data says is happening. Use this to identify systemic bottlenecks, measure operational velocity, and make investment decisions grounded in structural reality." },
    { id: 1, title: "Evaluate Portfolio Fit & Engagement Strategy", targetNodes: ['fitscore'], highlightSpine: false, transcript: "The Fit Score surfaces which FP&A committed forecast entries align with O2S equipment capabilities. At the leadership level, this is your strategic pipeline view: Which project types consistently generate high-value equipment demand? Which regions are trending toward capacity constraints? Where should O2S be engaging proactively during pre-construction rather than reactively at mobilization? Use this to direct your teams' attention toward the highest-impact opportunities before budgets lock." },
    { id: 2, title: "Track Maturity Across the Portfolio", targetNodes: ['projectmaturity'], highlightSpine: false, transcript: "Project Maturity gives you a cross-project view of zone distribution — how many line items sit in each zone across the active portfolio. This is your leading indicator dashboard. A healthy portfolio has demand flowing steadily through the zones. If you see accumulation in Zones 4–5 (baseline and intent), it means projects are stalling before reaching execution readiness. If Zone 8 is overloaded while Zones 1–3 are thin, you have a pipeline gap forming. This view lets you intervene at the structural level, not the firefighting level." },
    { id: 3, title: "Capital Strategy & Risk Monitoring", targetNodes: ['lifecycle', 'regression'], highlightSpine: false, transcript: "The Asset Lifecycle Engine translates forward demand and fleet condition data into keep/overhaul/redeploy/replace recommendations — the decisions that drive your multi-year capital strategy. When market conditions shift, you need to know how capital decisions made six months ago are holding up. Regression Events surface when projects move backward through zones — a signal that assumptions underpinning capital plans may need revisiting. Together, these give you a dynamic view of capital risk rather than a static annual budget that's stale by Q2." },
    { id: 4, title: "CapEx Planning & Organizational Learning", targetNodes: ['capex', 'flywheel'], highlightSpine: false, transcript: "The CapEx Plan translates aggregated demand signals, fleet utilization trends, and lifecycle data into a prioritized, timing-specific capital expenditure plan. This is where operational reality meets financial strategy. The Learning Flywheel is your mechanism for structural improvement — every execution cycle generates variance data that refines forecasting models, estimation templates, and sourcing logic. Over time, this means your planning accuracy improves, your capital efficiency increases, and your teams spend less time on reactive firefighting. The Command Center doesn't just track work; it compounds organizational learning." },
  ],

  'finance': [
    { id: 0, title: "The Financial Handshake Between O2S and FP&A", targetNodes: [], highlightSpine: true, transcript: "Welcome to the financial control view. As Finance and FP&A, your core concern is that operational forecasts align with enterprise financial plans — and that variances are visible before they become surprises. The Command Center's zone model gives you structural traceability from the FP&A committed forecast (your system of truth for Zones 1–3) through operational execution (Zones 4–8) and back through the learning flywheel (Zone 9). The FP&A forecast system — currently Smartsheet, transitioning to Anaplan — is the authoritative upstream data source. The Command Center reads from it; it never overwrites it." },
    { id: 1, title: "Margin Planning & Revenue Sync", targetNodes: ['margin', 'fpa'], highlightSpine: false, transcript: "The Margin Plan defines project-level O2S margin targets by pillar and product line, anchored to your AOP targets. This forces the handshake between what operations plans to spend and what finance expects to earn — before a single asset is committed. The FP&A Sync provides a risk-adjusted, time-phased view of revenue and margin forecasts. It shows the gap between gross pipeline revenue and risk-adjusted yield, weighted by zone progression. Zone 1–3 entries carry heavier probability discounts than Zone 6–7 validated requests. Use this to stress-test whether operational plans will deliver on financial commitments — or if adjustments are needed before quarterly close." },
    { id: 2, title: "Measure Clarity Risk on Financial Outcomes", targetNodes: ['clarityscoring'], highlightSpine: false, transcript: "Clarity Scoring quantifies how decision-ready each equipment need is. From a finance perspective, low clarity is a cost risk: every item below 50% clarity is likely to be fulfilled through constrained-path sourcing at premium rates. This view lets you model the financial exposure created by specification gaps. If 30% of your portfolio's line items are below the clarity threshold, you can quantify the projected cost premium and escalate to leadership with data, not anecdotes. Clarity isn't just an operational metric — it's a leading financial indicator." },
    { id: 3, title: "Catch Billing Errors Before They Post", targetNodes: ['anomaly'], highlightSpine: false, transcript: "Billing Anomaly Detection flags invoice discrepancies before they impact the bottom line. The system compares vendor invoices against contract terms, historical pricing patterns, and project-level commitments to surface rate deviations, duplicate charges, and quantity mismatches. In a high-volume equipment operation, even small per-unit billing errors compound into significant margin erosion over a portfolio. This is your automated first line of defense against revenue leakage — catching errors that would otherwise be buried in monthly reconciliation reports." },
    { id: 4, title: "Close the Loop: Actuals vs. Plan", targetNodes: ['flywheel'], highlightSpine: false, transcript: "The Learning Flywheel compares actualized costs, durations, and vendor outcomes against the original V0 baseline and financial projections. For Finance, this is your variance analysis engine. It answers: Did we earn the margin we planned? Where did assumptions break down? Were cost overruns driven by late clarity, vendor performance, or market conditions? The writeback mechanism feeds calibrated actuals back into upstream templates, which means your next cycle's forecasts start from a more accurate baseline. Over time, the gap between plan and actuals narrows structurally — not because people try harder, but because the models improve with every cycle." },
  ],
};
```

**Do not change anything else in this commit.** The app will temporarily break because other code still references `tourData` — that is fixed in Prompt 2.

Commit message: `feat: replace generic tourData with persona-specific tourDataByPersona`

---

## Prompt 2 of 3 — Update all tourData references to tourDataByPersona[activePersona]

**File:** `src/App.jsx`

The previous commit replaced the `tourData` array with a `tourDataByPersona` object. Now update every reference so the app resolves the active persona's walkthrough at runtime. There are exactly **7 references** to update. For each one, add a local derived variable near the top of the App component (just after the state declarations around line 1818) and then update the references:

**Step A — Add derived variable (insert after the `useState` declarations, before the `renderWorkflowContent` switch):**

```js
const tourData = tourDataByPersona[activePersona] || tourDataByPersona['project-teams'];
```

This single line means every existing `tourData` reference now automatically resolves to the active persona's steps with zero additional edits needed — the fallback ensures it never crashes if a persona key is somehow missing.

That's it. Because `tourData` is now a `const` derived from `tourDataByPersona[activePersona]`, every existing reference (`tourData[tourStep]`, `tourData.length`, the `isHighlighted` function, the spine highlight check) all work as-is without any further edits.

**Step B — Rename the button label.** Find the button (around line 1970-1971) that currently reads:

```jsx
<Play className="w-4 h-4" /> Play 3.18 Podcast Walkthrough
```

Change it to:

```jsx
<Play className="w-4 h-4" /> Walkthrough
```

**Step C — Verify the build passes** by running `npm run build` (or `npx vite build`). Fix any errors. The app should now show persona-specific walkthrough content when the tour is activated — switching personas changes which steps appear.

Commit message: `feat: wire tourDataByPersona to active persona, rename button to Walkthrough`

---

## Prompt 3 of 3 — Reset tour step on persona switch & polish

**File:** `src/App.jsx`

When a user switches personas while the tour is active, the tour should reset to step 0 of the new persona's walkthrough (since step counts and content differ per persona). Additionally, apply the `btn-interactive` breathing animation to the Walkthrough button so users know it's functional.

**Step A — Reset tour on persona switch.** Find the persona tab buttons (around line 1894) where `onClick` calls `setActivePersona(persona.id)`. Wrap that in a handler that also resets the tour step:

Change:
```jsx
onClick={() => setActivePersona(persona.id)}
```

To:
```jsx
onClick={() => { setActivePersona(persona.id); if (isTourActive) setTourStep(0); }}
```

**Step B — Add btn-interactive class to the Walkthrough button.** Find the walkthrough button (the one you renamed in Prompt 2) and add the `btn-interactive` class to its `className` string. Change:

```jsx
className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold shadow-sm transition-colors shrink-0"
```

To:
```jsx
className="btn-interactive flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold shadow-sm transition-colors shrink-0"
```

**Step C — Verify end-to-end.** Run `npx vite build` and confirm the build passes. Then run `npx vite` and manually test:
1. Select "Project Teams" → click Walkthrough → confirm 5 steps with project-team language, highlighting Quick Quotes, V0 Baseline, Preflight, Execution Dashboard.
2. Switch to "O2S Operations" → tour resets to step 1 → confirm ops-specific language, highlighting Forecast, Fit Score, Optimizer, Vendor Scorecard, Flywheel.
3. Switch to "Leadership" → confirm leadership language and cards (Fit Score, Project Maturity, Lifecycle, CapEx, Flywheel).
4. Switch to "Finance & FP&A" → confirm finance language and cards (Margin, FP&A Sync, Clarity Scoring, Anomaly, Flywheel).
5. Close tour → reopen → confirm it starts at step 1 of whichever persona is active.

Commit message: `feat: reset tour on persona switch, add breathing animation to Walkthrough button`
