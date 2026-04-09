import React, { useState } from 'react';
import {
  Calculator, Target, BarChart, Layers, PenTool, RotateCcw, Activity,
  Search, Box, DollarSign, Monitor, ArrowRight, ArrowDown, X,
  Filter, Download, Play, AlertTriangle, CheckCircle2, Clock,
  Settings, Database, ChevronRight, Zap, RefreshCw, ShoppingCart, ShieldAlert,
  HardHat, BarChart3, Lock, ChevronDown, TrendingUp,
  FileCheck, Send
} from 'lucide-react';

const Badge = ({ children, variant = 'gray' }) => {
  const colors = {
    green: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    yellow: 'bg-amber-100 text-amber-700 border-amber-200',
    red: 'bg-rose-100 text-rose-700 border-rose-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    gray: 'bg-slate-100 text-slate-700 border-slate-200'
  };
  return (
    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider border ${colors[variant]}`}>
      {children}
    </span>
  );
};

const KPI = ({ label, value, trend, subtext }) => (
  <div className="bg-white border border-slate-200 p-3 rounded-md shadow-sm">
    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">{label}</div>
    <div className="text-xl font-bold text-slate-800 font-mono">{value}</div>
    {trend && <div className={`text-xs mt-1 font-medium ${trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{trend} {subtext}</div>}
  </div>
);

const DenseTable = ({ headers, rows, actionBtn }) => (
  <div className="overflow-x-auto border border-slate-200 rounded-md bg-white">
    <table className="w-full text-left text-xs">
      <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500">
        <tr>
          {headers.map((h, i) => <th key={i} className="px-3 py-2 font-semibold">{h}</th>)}
          {actionBtn && <th className="px-3 py-2 text-right">Action</th>}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="px-3 py-2 text-slate-700">{cell}</td>
            ))}
            {actionBtn && (
              <td className="px-3 py-2 text-right">
                <button className="text-[10px] bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-semibold px-2 py-1 rounded transition-colors">
                  {actionBtn}
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Toolbar = ({ leftArea, rightArea }) => (
  <div className="bg-white border-b border-slate-200 px-6 py-2 flex justify-between items-center shrink-0 text-sm">
    <div className="flex items-center gap-4">{leftArea}</div>
    <div className="flex items-center gap-2">{rightArea}</div>
  </div>
);

const MockAssetLifecycle = () => (
  <div className="flex flex-col h-full bg-slate-50">
    <Toolbar 
      leftArea={<><Database className="w-4 h-4 text-slate-400"/> <span className="font-medium">Fleet Database</span> <span className="text-slate-400">|</span> <span>4,291 Active Assets</span></>}
      rightArea={<button className="flex items-center gap-2 bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-slate-700"><Play className="w-3 h-3"/> Run Replacement Model</button>}
    />
    <div className="p-6 overflow-auto">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPI label="Total Fleet Value" value="$142.5M" trend="+2.4%" subtext="YTD" />
        <KPI label="Avg Asset Age" value="4.2 YRS" />
        <KPI label="Assets in Warning" value="124" trend="+12" subtext="vs Last Month" />
        <KPI label="Replacement Cap Ex" value="$8.4M" trend="-1.2%" subtext="Projected" />
      </div>
      <h3 className="text-sm font-bold text-slate-800 mb-3">Replacement Candidates (Next 90 Days)</h3>
      <DenseTable 
        headers={['Asset ID', 'Category', 'Age', 'Health Score', 'Maintenance Cost (YTD)', 'Recommendation']}
        actionBtn="Review"
        rows={[
          [<span className="font-mono">CRN-0092</span>, 'Tower Crane', '8.5 Yrs', <Badge variant="red">Critical</Badge>, '$42,500', <strong>Dispose</strong>],
          [<span className="font-mono">EXC-1104</span>, 'Excavator', '6.2 Yrs', <Badge variant="yellow">Warning</Badge>, '$18,200', 'Overhaul'],
          [<span className="font-mono">LFT-4402</span>, 'Scissor Lift', '5.1 Yrs', <Badge variant="yellow">Warning</Badge>, '$4,100', 'Redeploy'],
          [<span className="font-mono">GEN-8821</span>, 'Generator', '4.9 Yrs', <Badge variant="green">Healthy</Badge>, '$1,200', 'Keep'],
        ]}
      />
    </div>
  </div>
);

const MockCapexPlan = () => (
  <div className="flex flex-col h-full bg-slate-50">
    <Toolbar 
      leftArea={<span className="font-medium text-slate-700">FY26 Q3 Planning Cycle</span>}
      rightArea={<button className="bg-indigo-600 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-indigo-700">Submit to Steering</button>}
    />
    <div className="p-6 overflow-auto">
      <div className="bg-white p-4 rounded-md border border-slate-200 mb-6 flex items-center justify-between shadow-sm">
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Gap Assessment</div>
          <div className="text-2xl font-bold font-mono text-slate-800">$24,500,000</div>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-xs text-slate-500 mb-1">Approved Supply</div>
            <div className="text-lg font-mono text-emerald-600">$18,200,000</div>
          </div>
          <div className="w-px bg-slate-200"></div>
          <div className="text-right">
            <div className="text-xs text-slate-500 mb-1">Net Shortfall</div>
            <div className="text-lg font-mono text-rose-600">$6,300,000</div>
          </div>
        </div>
      </div>
      <h3 className="text-sm font-bold text-slate-800 mb-3">Prioritized Procurement Waves</h3>
      <DenseTable 
        headers={['Wave ID', 'Asset Class', 'Volume', 'Est. CapEx', 'Strategic Priority', 'Status']}
        actionBtn="Edit"
        rows={[
          [<span className="font-mono text-indigo-600 font-semibold">WAV-26-01</span>, 'Earthmoving', '12 Units', '$2.4M', <Badge variant="red">P1 - Critical</Badge>, <Badge variant="green">Approved</Badge>],
          [<span className="font-mono text-indigo-600 font-semibold">WAV-26-02</span>, 'Power Gen', '20 Units', '$1.1M', <Badge variant="yellow">P2 - High</Badge>, <Badge variant="blue">Under Review</Badge>],
          [<span className="font-mono text-indigo-600 font-semibold">WAV-26-03</span>, 'Material Handling', '5 Units', '$0.8M', <Badge variant="gray">P3 - Routine</Badge>, <Badge variant="gray">Draft</Badge>],
        ]}
      />
    </div>
  </div>
);

const MockQuickQuotes = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  return (
    <div className="flex h-full bg-slate-50">
      <div className="w-1/3 bg-white border-r border-slate-200 p-6 flex flex-col gap-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2">Estimate Parameters</h3>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Project Type</label><select className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 outline-none focus:border-indigo-500"><option>Commercial High-Rise</option><option>Data Center</option><option>Healthcare</option></select></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Duration (Months)</label><input type="number" defaultValue="18" className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 outline-none focus:border-indigo-500"/></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Square Footage</label><input type="number" defaultValue="250000" className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 outline-none focus:border-indigo-500"/></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Location / Market</label><select className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50 outline-none focus:border-indigo-500"><option>Dallas, TX</option><option>Austin, TX</option><option>Phoenix, AZ</option></select></div>
        <button onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setResult(true); }, 1500); }} className="mt-4 bg-slate-900 text-white font-semibold text-sm py-2 rounded shadow flex justify-center items-center gap-2 hover:bg-slate-800">
          {loading ? <RefreshCw className="w-4 h-4 animate-spin"/> : <Zap className="w-4 h-4"/>} Generate Directional Quote
        </button>
      </div>
      <div className="w-2/3 p-6 bg-slate-50 flex items-center justify-center">
        {!result && !loading && <div className="text-slate-400 flex flex-col items-center gap-2"><Calculator className="w-8 h-8 opacity-50"/><p className="text-sm">Enter parameters to generate quote</p></div>}
        {loading && <div className="text-indigo-500 flex flex-col items-center gap-2"><RefreshCw className="w-8 h-8 animate-spin"/><p className="text-sm font-semibold">Running ML models...</p></div>}
        {result && !loading && (
          <div className="w-full h-full flex flex-col">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Generated Equipment Estimate</h3>
            <div className="bg-white border border-slate-200 rounded-md shadow-sm p-4 mb-4">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Total Estimated Cost</div>
              <div className="text-3xl font-mono font-bold text-slate-800">$1,245,000 <span className="text-sm text-slate-400 font-sans font-normal ml-2">{'\u00B1'} 12% CI</span></div>
            </div>
            <DenseTable headers={['Category', 'Phase', 'Est. Qty', 'Cost Allocation']} rows={[['Earthmoving', 'Site Prep', '4-6 units', '$180,000'],['Cranes & Hoists', 'Structure', '2 units', '$520,000'],['Aerial Lifts', 'MEP / Finish', '12-15 units', '$310,000'],['Generators & Temp Power', 'All Phases', '3 units', '$235,000']]}/>
            <div className="mt-4 flex justify-end"><button className="bg-indigo-50 text-indigo-600 font-semibold text-xs px-4 py-2 rounded border border-indigo-200 hover:bg-indigo-100">Export to CRM Opportunity</button></div>
          </div>
        )}
      </div>
    </div>
  );
};

const MockMarginPlan = () => (
  <div className="flex flex-col h-full bg-slate-50">
    <Toolbar leftArea={<><div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">OPP-9921</div><span className="font-semibold text-slate-800">Project Alpha (Pursuit)</span></>} rightArea={<span className="text-xs font-mono text-slate-500">Last updated: Today, 09:41 AM</span>}/>
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <KPI label="Target Revenue" value="$4.50M" />
        <KPI label="Planned Cost" value="$3.15M" />
        <KPI label="O2S Margin %" value="30.0%" trend="+2.0%" subtext="vs AOP Target" />
      </div>
      <h3 className="text-sm font-bold text-slate-800 mb-3">Pillar & Product Line Breakdown</h3>
      <div className="border border-slate-200 rounded bg-white">
        <div className="flex font-semibold text-[10px] uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200 p-3">
          <div className="w-1/3">Cost Center</div><div className="w-1/6 text-right">Revenue</div><div className="w-1/6 text-right">Cost</div><div className="w-1/6 text-right">Margin $</div><div className="w-1/6 text-right">Margin %</div>
        </div>
        {[
          { name: 'Equipment Operations (Total)', rev: '2.00M', cost: '1.40M', mar: '0.60M', pct: '30.0%', isGroup: true },
          { name: '\u21B3 Heavy Machinery', rev: '1.20M', cost: '0.80M', mar: '0.40M', pct: '33.3%', isGroup: false },
          { name: '\u21B3 Small Tools', rev: '0.80M', cost: '0.60M', mar: '0.20M', pct: '25.0%', isGroup: false },
          { name: 'Logistics Operations (Total)', rev: '1.50M', cost: '1.10M', mar: '0.40M', pct: '26.6%', isGroup: true },
          { name: 'Prefabrication (Total)', rev: '1.00M', cost: '0.65M', mar: '0.35M', pct: '35.0%', isGroup: true },
        ].map((row, i) => (
          <div key={i} className={`flex text-xs p-3 border-b border-slate-100 ${row.isGroup ? 'font-bold bg-slate-50/50 text-slate-800' : 'text-slate-600 pl-6'}`}>
            <div className="w-1/3">{row.name}</div><div className="w-1/6 text-right font-mono">${row.rev}</div><div className="w-1/6 text-right font-mono">${row.cost}</div><div className="w-1/6 text-right font-mono text-emerald-600">${row.mar}</div><div className="w-1/6 text-right font-mono">{row.pct}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MockAssetDemandForecasting = () => {
  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  const [filter, setFilter] = useState('All');
  const breakdownData = [
    { project: 'Project Alpha (HQ Build)', zone: 'Zone 2', conf: '30%', timeline: [6, 6, 12, 16, 12, 6], isEarly: true },
    { project: 'Data Center TX', zone: 'Zone 6', conf: '95%', timeline: [4, 6, 8, 8, 6, 4], isEarly: false },
    { project: 'Healthcare Facility C', zone: 'Zone 5', conf: '80%', timeline: [2, 2, 2, 2, 2, 2], isEarly: false },
  ];
  const filteredBreakdown = breakdownData.map(bd => {
    let show = filter === 'All' || (filter === 'Z1-Z3' && bd.isEarly) || (filter === 'Z4-Z7' && !bd.isEarly);
    const confDec = parseFloat(bd.conf) / 100;
    const adjustedTimeline = bd.timeline.map(val => Math.round(val * confDec));
    return { ...bd, show, adjustedTimeline };
  });
  const summedTimeline = months.map((_, colIdx) => filteredBreakdown.reduce((sum, bd) => sum + (bd.show ? bd.adjustedTimeline[colIdx] : 0), 0));
  const data = [
    { id: 'CAT-110', name: 'Excavator 30T Tracked', category: 'Earthmoving', capacity: 25, timeline: [18, 22, 28, 24, 15, 10], hasConstraint: true },
    { id: 'CAT-450', name: 'RT Crane 50T', category: 'Cranes & Hoists', capacity: 12, timeline: summedTimeline, hasConstraint: true, expanded: true },
    { id: 'CAT-820', name: 'Articulating Boom 60ft', category: 'Aerial Lifts', capacity: 40, timeline: [20, 25, 35, 38, 42, 30], hasConstraint: true },
    { id: 'CAT-905', name: 'Generator 100kW', category: 'Power', capacity: 15, timeline: [5, 8, 10, 12, 12, 10], hasConstraint: false },
    { id: 'CAT-312', name: 'Telehandler 10K', category: 'Material Handling', capacity: 30, timeline: [25, 28, 29, 25, 20, 15], hasConstraint: false },
  ];
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Toolbar leftArea={<><div className="w-2 h-2 rounded-full bg-indigo-500"></div><span className="font-semibold text-slate-800">Portfolio Aggregation: Cat Class Demand vs Supply</span></>} rightArea={
        <div className="flex bg-slate-200 p-0.5 rounded-md">
          {['All', 'Z1-Z3', 'Z4-Z7'].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all ${filter === f ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{f === 'All' ? 'All (Z1-Z7)' : f === 'Z1-Z3' ? 'Early Forecasts (Z1-Z3)' : 'Intent & Planning (Z4-Z7)'}</button>)}
        </div>
      }/>
      <div className="p-6 flex flex-col flex-grow overflow-hidden gap-4">
        <div className="grid grid-cols-3 gap-4 shrink-0">
          <KPI label="Tracked Cat Classes" value="184" subtext="Across 12 Categories" />
          <KPI label="Risk-Adjusted Constraints" value="3" trend="+1" subtext="Demand > Supply (Adjusted)" />
          <KPI label="Projects Included" value={filter === 'Z1-Z3' ? '41' : filter === 'Z4-Z7' ? '142' : '183'} subtext="Based on active zone filter" />
        </div>
        <div className="bg-white border border-slate-200 rounded-md shadow-sm flex flex-col flex-grow overflow-hidden">
          <div className="p-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2"><Database className="w-4 h-4 text-indigo-500"/> Risk-Adjusted Fleet Constraint Matrix</h3>
            <div className="flex items-center gap-4 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              <div className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-100 border border-slate-300 rounded-sm"></div> Within Capacity</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 bg-rose-100 border border-rose-300 text-rose-700 flex justify-center items-center font-bold">!</div> Shortfall</div>
            </div>
          </div>
          <div className="flex-grow overflow-auto relative">
            <table className="w-full text-left text-[10px] whitespace-nowrap">
              <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm border-b border-slate-200">
                <tr>
                  <th className="px-3 py-2 font-semibold text-slate-600 w-8"></th>
                  <th className="px-3 py-2 font-semibold text-slate-600">Cat Class ID</th>
                  <th className="px-3 py-2 font-semibold text-slate-600">Description</th>
                  <th className="px-3 py-2 font-semibold text-slate-600 border-r border-slate-200 text-right">Max Owned Fleet</th>
                  {months.map(m => <th key={m} className="px-3 py-2 font-semibold text-slate-600 text-center">{m}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((row, i) => (
                  <React.Fragment key={i}>
                    <tr className={`hover:bg-slate-50 transition-colors cursor-pointer ${row.expanded ? 'bg-slate-50' : ''}`}>
                      <td className="px-3 py-2 text-slate-400 text-center">{row.hasConstraint && <ChevronRight className={`w-4 h-4 transition-transform ${row.expanded ? 'rotate-90 text-indigo-500' : ''}`} />}</td>
                      <td className="px-3 py-2 text-slate-800 font-mono font-semibold">{row.id}</td>
                      <td className="px-3 py-2 text-slate-600">{row.name}</td>
                      <td className="px-3 py-2 text-slate-600 font-mono text-right border-r border-slate-200">{row.capacity}</td>
                      {row.timeline.map((demand, j) => {
                        const isConstrained = demand > row.capacity;
                        return <td key={j} className="p-1 text-center"><div className={`mx-auto w-full max-w-[40px] py-1 rounded-sm font-mono font-bold ${isConstrained ? 'bg-rose-100 text-rose-700 border border-rose-300' : 'bg-slate-100 text-slate-600'}`}>{demand}</div></td>;
                      })}
                    </tr>
                    {row.expanded && (
                      <tr className="bg-slate-50 border-b-2 border-slate-200 shadow-inner">
                        <td colSpan={4} className="p-0 border-r border-slate-200">
                          <div className="pl-12 py-2 pr-3 flex flex-col gap-1 h-full justify-center min-h-[120px]">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Project Intakes (Confidence Adjusted)</div>
                            {filteredBreakdown.map((bd, bIdx) => {
                              if (!bd.show) return null;
                              return (
                                <div key={bIdx} className="flex justify-between items-center bg-white border border-slate-200 px-2 py-1.5 rounded-sm shadow-sm group">
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-slate-700 truncate">{bd.project}</span>
                                    <span className="text-[9px] text-slate-400 font-mono">Conf: <span className={bd.isEarly ? 'text-amber-600 font-bold' : 'text-emerald-600 font-bold'}>{bd.conf}</span></span>
                                  </div>
                                  <Badge variant={bd.isEarly ? 'yellow' : 'green'}>{bd.zone}</Badge>
                                </div>
                              );
                            })}
                            {!filteredBreakdown.some(bd => bd.show) && <div className="text-xs text-slate-400 italic py-4">No projects match the current zone filter.</div>}
                          </div>
                        </td>
                        {months.map((_, colIdx) => (
                          <td key={colIdx} className="p-1 align-top text-center border-l border-slate-100 bg-white/40">
                            <div className="flex flex-col gap-1 mt-6">
                              {filteredBreakdown.map((bd, bIdx) => {
                                if (!bd.show) return null;
                                return (
                                  <div key={bIdx} className="py-0.5 font-mono text-[9px] bg-white border border-slate-100 rounded-sm shadow-sm flex flex-col items-center">
                                    <span className="text-slate-400 line-through decoration-slate-300">{bd.timeline[colIdx]}</span>
                                    <span className={bd.isEarly ? 'text-amber-700 font-bold' : 'text-emerald-700 font-bold'}>{bd.adjustedTimeline[colIdx]}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        ))}
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const MockPrePopulation = () => {
  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  const data = [
    { type: 'Forklifts', model: 'Skid Steer', task: 'Site Prep', rate: 2200, source: 'Template', timeline: [0, 0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], cost: 13200 },
    { type: 'Manlift', model: "40' Manlift", task: 'Boom Lift', rate: 2600, source: 'Forecast', timeline: [0, 0, 0, 0, 0.5, 1.0, 1.0, 0], cost: 6500 },
    { type: 'Manlift', model: "80' Manlift", task: 'Boom Lift', rate: 4750, source: 'Forecast', timeline: [0, 0, 0, 0, 1.0, 1.0, 1.0, 1.0], cost: 19000 },
    { type: 'Loaders', model: '950 Front End', task: 'Earthwork', rate: 10000, source: 'Template', timeline: [1.0, 1.0, 1.0, 1.0, 0.5, 0, 0, 0], cost: 45000 },
    { type: 'Light Plant', model: '4-kW Tower', task: 'Temp Power', rate: 700, source: 'Rule-Based', timeline: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], cost: 5600 },
    { type: 'Welders', model: '300 Amp Welder', task: 'Structural', rate: 700, source: 'Template', timeline: [0, 1.0, 1.0, 1.0, 1.0, 1.0, 0, 0], cost: 3500 },
    { type: 'Connex Box', model: "20' Storage", task: 'Site Setup', rate: 600, source: 'Template', timeline: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0], cost: 4800 },
  ];
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Toolbar leftArea={<><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="font-semibold text-slate-800">Zone 4: V0 Baseline Review</span></>} rightArea={<button className="bg-indigo-600 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-indigo-700">Approve Baseline & Promote to Intent</button>}/>
      <div className="p-4 flex-grow overflow-hidden flex flex-col">
        <div className="bg-white border border-slate-200 rounded-md shadow-sm flex flex-col h-full overflow-hidden">
          <div className="p-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2"><Layers className="w-4 h-4 text-indigo-500"/> AI-Generated Time-Phased Equipment Baseline</h3>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-100 border border-emerald-300 rounded-sm"></div> Full Util (1.0)</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded-sm"></div> Partial Util (0.5)</div>
            </div>
          </div>
          <div className="flex-grow overflow-auto relative">
            <table className="w-full text-left text-[10px] whitespace-nowrap">
              <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm border-b border-slate-200">
                <tr>
                  <th className="px-3 py-2 font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200" colSpan="4">Equipment Requirements</th>
                  <th className="px-3 py-1 font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 text-center" colSpan="4">2026</th>
                  <th className="px-3 py-1 font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 text-center" colSpan="4">2027</th>
                  <th className="px-3 py-2 font-bold text-slate-500 uppercase tracking-wider" colSpan="2">Financials</th>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-100">
                  <th className="px-3 py-2 font-semibold text-slate-600">Equipment Type</th>
                  <th className="px-3 py-2 font-semibold text-slate-600">Model / Size</th>
                  <th className="px-3 py-2 font-semibold text-slate-600">Task Desc</th>
                  <th className="px-3 py-2 font-semibold text-slate-600 border-r border-slate-200">Source</th>
                  {months.map(m => <th key={m} className="px-2 py-2 font-semibold text-slate-600 text-center border-r border-slate-200 w-12">{m}</th>)}
                  <th className="px-3 py-2 font-semibold text-slate-600 text-right">Mo. Rate</th>
                  <th className="px-3 py-2 font-semibold text-slate-600 text-right">Est Cost to Complete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 py-2 text-slate-800 font-medium">{row.type}</td>
                    <td className="px-3 py-2 text-slate-600">{row.model}</td>
                    <td className="px-3 py-2 text-slate-600">{row.task}</td>
                    <td className="px-3 py-2 border-r border-slate-200"><Badge variant={row.source === 'Template' ? 'blue' : row.source === 'Forecast' ? 'green' : 'gray'}>{row.source}</Badge></td>
                    {row.timeline.map((val, j) => (
                      <td key={j} className="p-0 border-r border-slate-100 text-center">
                        {val > 0 ? <div className={`mx-auto w-full h-full min-h-[28px] flex items-center justify-center font-mono font-bold ${val === 1.0 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{val.toFixed(1)}</div> : null}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-slate-600 font-mono text-right">${row.rate.toLocaleString()}</td>
                    <td className="px-3 py-2 text-slate-800 font-mono font-bold text-right">${row.cost.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-200 sticky bottom-0 z-10">
                <tr>
                  <td colSpan="12" className="px-3 py-3 text-right font-bold text-slate-600 uppercase tracking-wider text-xs border-r border-slate-200">Total V0 Baseline Projected Cost</td>
                  <td colSpan="2" className="px-3 py-3 text-right font-mono font-bold text-slate-900 text-sm">$97,600</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const MockAdHocIntake = () => (
  <div className="flex flex-col h-full bg-slate-50">
    <div className="p-6 flex gap-6 h-full">
      <div className="w-2/3 flex flex-col gap-4">
        <div className="relative"><Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input type="text" placeholder="Search equipment catalog (e.g. 'Excavator 30T')..." className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"/></div>
        <div className="grid grid-cols-3 gap-4 overflow-auto pb-4">
          {['Skid Steer Loader', 'Articulating Boom Lift 60ft', 'Light Tower', 'Generator 100kW', 'Water Truck', 'Compactor'].map((item, i) => (
            <div key={i} className="bg-white border border-slate-200 p-4 rounded-md shadow-sm hover:border-indigo-300 cursor-pointer flex flex-col">
              <div className="w-full h-20 bg-slate-100 rounded flex items-center justify-center text-slate-300 mb-3"><Box className="w-8 h-8"/></div>
              <h4 className="text-xs font-bold text-slate-800 flex-grow">{item}</h4>
              <div className="text-[10px] text-slate-500 font-mono mt-1 mb-2">CAT-{100+i}</div>
              <button className="w-full py-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider hover:bg-slate-100">Add to Intent</button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3 bg-white border border-slate-200 rounded-md shadow-sm flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-slate-600"/><h3 className="font-bold text-slate-800 text-sm">Ad-Hoc Request Cart</h3></div>
        <div className="p-4 flex-grow flex items-center justify-center text-slate-400 text-sm italic">Cart is empty. Select items to define intent.</div>
      </div>
    </div>
  </div>
);

const MockOptimizer = () => (
  <div className="flex flex-col h-full bg-slate-50">
    <Toolbar leftArea={<><ShieldAlert className="w-4 h-4 text-amber-500"/><span className="font-bold text-slate-800">Zone 6 Constraint Detected: Telehandler Need</span></>} rightArea={<span className="text-xs text-slate-500">Run Optimizer v2.4</span>}/>
    <div className="p-6 overflow-auto">
      <p className="text-sm text-slate-600 mb-6">The system has identified two fulfillment paths for Request <span className="font-mono bg-slate-200 px-1 rounded">REQ-0922</span>. Select the optimal scenario to proceed to Zone 7.</p>
      <div className="grid grid-cols-2 gap-6 h-64">
        <div className="bg-white border-2 border-emerald-500 rounded-xl p-5 shadow flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-br-lg">Recommended</div>
          <h3 className="text-lg font-bold text-slate-800 mt-4 mb-1">Fulfill via Owned Fleet</h3>
          <p className="text-xs text-slate-500 mb-4">Transfer idle asset from adjacent region (200 mi).</p>
          <div className="flex-grow space-y-3">
            <div className="flex justify-between text-sm border-b border-slate-100 pb-1"><span className="text-slate-600">Fulfillment Cost</span><span className="font-mono font-bold text-emerald-600">$1,200 (Freight)</span></div>
            <div className="flex justify-between text-sm border-b border-slate-100 pb-1"><span className="text-slate-600">Availability</span><span className="font-mono font-bold text-slate-800">Immediate</span></div>
            <div className="flex justify-between text-sm border-b border-slate-100 pb-1"><span className="text-slate-600">Utilization Impact</span><span className="font-mono font-bold text-emerald-600">+4.2%</span></div>
          </div>
          <button className="mt-4 w-full bg-emerald-600 text-white font-bold py-2 rounded shadow hover:bg-emerald-700 transition-colors">Select Scenario A</button>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mt-4 mb-1">Fulfill via Re-Rent</h3>
          <p className="text-xs text-slate-500 mb-4">Source from external preferred vendor locally.</p>
          <div className="flex-grow space-y-3">
            <div className="flex justify-between text-sm border-b border-slate-100 pb-1"><span className="text-slate-600">Estimated Cost</span><span className="font-mono font-bold text-rose-600">$4,800 / mo</span></div>
            <div className="flex justify-between text-sm border-b border-slate-100 pb-1"><span className="text-slate-600">Availability</span><span className="font-mono font-bold text-slate-800">T+3 Days</span></div>
            <div className="flex justify-between text-sm border-b border-slate-100 pb-1"><span className="text-slate-600">Utilization Impact</span><span className="font-mono font-bold text-slate-400">None</span></div>
          </div>
          <button className="mt-4 w-full bg-slate-100 text-slate-700 font-bold py-2 rounded border border-slate-200 hover:bg-slate-200 transition-colors">Select Scenario B</button>
        </div>
      </div>
    </div>
  </div>
);

const MockStrategicSourcing = () => (
  <div className="flex flex-col h-full bg-slate-50">
    <Toolbar leftArea={<span className="font-bold text-slate-800 text-sm">Zone 7: Active Sourcing Events</span>} rightArea={<Badge variant="blue">4 Open RFQs</Badge>}/>
    <div className="p-6">
      <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider text-[11px]">Vendor Comparison Matrix - RFQ-8812 (Generators)</h3>
      <div className="overflow-x-auto border border-slate-200 rounded-md bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
            <tr><th className="px-4 py-3">Vendor</th><th className="px-4 py-3">Quote Price</th><th className="px-4 py-3">Lead Time</th><th className="px-4 py-3">Reliability Index</th><th className="px-4 py-3">Compliance</th><th className="px-4 py-3 text-right">Action</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="px-4 py-3 font-medium text-slate-800">Sunbelt Rentals</td><td className="px-4 py-3 font-mono">$12,400</td><td className="px-4 py-3 text-emerald-600 font-medium">2 Days</td>
              <td className="px-4 py-3"><div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full w-[95%]"></div></div></td>
              <td className="px-4 py-3"><CheckCircle2 className="w-4 h-4 text-emerald-500"/></td>
              <td className="px-4 py-3 text-right"><button className="bg-indigo-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-indigo-700">Award</button></td>
            </tr>
            <tr className="bg-slate-50/50">
              <td className="px-4 py-3 font-medium text-slate-800">United Rentals</td><td className="px-4 py-3 font-mono">$11,900</td><td className="px-4 py-3 text-amber-600 font-medium">5 Days</td>
              <td className="px-4 py-3"><div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full w-[82%]"></div></div></td>
              <td className="px-4 py-3"><CheckCircle2 className="w-4 h-4 text-emerald-500"/></td>
              <td className="px-4 py-3 text-right"><button className="bg-white border border-slate-300 text-slate-600 px-3 py-1 rounded text-xs font-bold hover:bg-slate-100">Award</button></td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-800">Local Supply Co.</td><td className="px-4 py-3 font-mono">$10,500</td><td className="px-4 py-3 text-rose-600 font-medium">14 Days</td>
              <td className="px-4 py-3"><div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-rose-500 h-2 rounded-full w-[60%]"></div></div></td>
              <td className="px-4 py-3"><AlertTriangle className="w-4 h-4 text-amber-500"/></td>
              <td className="px-4 py-3 text-right"><button className="bg-white border border-slate-300 text-slate-600 px-3 py-1 rounded text-xs font-bold hover:bg-slate-100">Award</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const MockBillingAnomaly = () => (
  <div className="flex flex-col h-full bg-slate-50">
    <Toolbar leftArea={<><div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div><span className="font-bold text-slate-800">Zone 9: Post-Fulfillment Audit</span></>} rightArea={<span className="text-xs text-slate-500 font-medium tracking-wide">3 Anomalies Detected</span>}/>
    <div className="p-6">
      <DenseTable headers={['Invoice ID', 'Vendor', 'Project', 'Expected', 'Actual Billed', 'Anomaly Type', 'Confidence']} actionBtn="Investigate" rows={[
        [<span className="font-mono text-xs">INV-992-A</span>, 'Sunbelt', 'Project Alpha', '$4,200', <span className="font-bold text-rose-600">$5,800</span>, <Badge variant="red">Rate Variance</Badge>, '98%'],
        [<span className="font-mono text-xs">INV-441-B</span>, 'United', 'Data Ctr TX', '$1,100', <span className="font-bold text-rose-600">$2,400</span>, <Badge variant="yellow">Duration Extension</Badge>, '85%'],
        [<span className="font-mono text-xs">INV-112-C</span>, 'Herc', 'HQ Build', '$800', <span className="font-bold text-rose-600">$1,050</span>, <Badge variant="gray">Freight Surcharge</Badge>, '60%'],
      ]}/>
      <div className="mt-6 bg-white p-4 border border-slate-200 rounded-md shadow-sm">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-indigo-500"/> Flywheel Recommendation</h4>
        <p className="text-sm text-slate-600">Model suggests updating Zone 3 Margin Plan defaults for 'Sunbelt Rate Card' in Texas region based on a 14% sustained variance over the last 90 days.</p>
        <button className="mt-3 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-200">Review Parameter Writeback</button>
      </div>
    </div>
  </div>
);

const MockPreflightValidation = () => {
  const lineItems = [
    { item: 'Tower Crane 60T', taxonomy: 'pass', dateFeasibility: 'warn', dateNote: 'Lead time risk: 14 wks vs 10 wk request', specComplete: 'fail', specNote: 'Missing: load chart', sourcing: 'Internal Fleet', status: 'Warning' },
    { item: 'Generator 200kW', taxonomy: 'pass', dateFeasibility: 'pass', dateNote: null, specComplete: 'pass', specNote: null, sourcing: 'MSA Vendor', status: 'Pass' },
    { item: 'Boom Lift 80ft', taxonomy: 'pass', dateFeasibility: 'pass', dateNote: null, specComplete: 'pass', specNote: null, sourcing: 'Internal Fleet', status: 'Pass' },
    { item: 'Telehandler 10K', taxonomy: 'pass', dateFeasibility: 'fail', dateNote: 'Vendor confirmed 6 wk delay', specComplete: 'pass', specNote: null, sourcing: 'No Path', status: 'Fail' },
    { item: 'Light Tower 4kW', taxonomy: 'pass', dateFeasibility: 'pass', dateNote: null, specComplete: 'pass', specNote: null, sourcing: 'MSA Vendor', status: 'Pass' },
    { item: 'Skid Steer Loader', taxonomy: 'pass', dateFeasibility: 'pass', dateNote: null, specComplete: 'pass', specNote: null, sourcing: 'Internal Fleet', status: 'Pass' },
  ];
  const statusVariant = { Pass: 'green', Warning: 'yellow', Fail: 'red' };
  const sourcingVariant = (s) => s === 'No Path' ? 'red' : s === 'Internal Fleet' ? 'green' : 'blue';
  const icon = (val, note) => {
    if (val === 'pass') return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    if (val === 'warn') return <div className="flex items-center gap-1"><AlertTriangle className="w-4 h-4 text-amber-500" />{note && <span className="text-[9px] text-amber-600 max-w-[140px] leading-tight">{note}</span>}</div>;
    return <div className="flex items-center gap-1"><X className="w-4 h-4 text-rose-500" />{note && <span className="text-[9px] text-rose-600 max-w-[140px] leading-tight">{note}</span>}</div>;
  };
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Toolbar
        leftArea={<><ShieldAlert className="w-4 h-4 text-amber-500"/><span className="font-bold text-slate-800">Zone 6: Preflight Validation</span><span className="text-slate-400">|</span><span className="text-slate-600">Data Center TX</span></>}
        rightArea={<button className="flex items-center gap-2 bg-amber-600 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-amber-700"><Play className="w-3 h-3"/> Run Preflight</button>}
      />
      <div className="p-6 overflow-auto flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-4">
          <KPI label="Line Items Checked" value="24 / 24" />
          <div className="bg-white border border-slate-200 p-3 rounded-md shadow-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Conflicts Found</div>
            <div className="text-xl font-bold font-mono text-rose-600">2</div>
          </div>
          <div className="bg-white border border-slate-200 p-3 rounded-md shadow-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Pass Rate</div>
            <div className="text-xl font-bold font-mono text-amber-600">91.7%</div>
          </div>
        </div>
        <div className="overflow-x-auto border border-slate-200 rounded-md bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2 font-semibold">Line Item</th>
                <th className="px-3 py-2 font-semibold">Taxonomy</th>
                <th className="px-3 py-2 font-semibold">Date Feasibility</th>
                <th className="px-3 py-2 font-semibold">Spec Complete</th>
                <th className="px-3 py-2 font-semibold">Sourcing Path</th>
                <th className="px-3 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lineItems.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-2.5 text-slate-800 font-medium">{row.item}</td>
                  <td className="px-3 py-2.5">{icon(row.taxonomy, null)}</td>
                  <td className="px-3 py-2.5">{icon(row.dateFeasibility, row.dateNote)}</td>
                  <td className="px-3 py-2.5">{icon(row.specComplete, row.specNote)}</td>
                  <td className="px-3 py-2.5"><Badge variant={sourcingVariant(row.sourcing)}>{row.sourcing}</Badge></td>
                  <td className="px-3 py-2.5"><Badge variant={statusVariant[row.status]}>{row.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white border border-rose-200 rounded-md p-4 shadow-sm">
          <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Detected Conflicts</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm text-slate-700 bg-rose-50 border border-rose-100 rounded p-3">
              <span className="font-mono text-rose-500 font-bold shrink-0">1.</span>
              <span>Tower crane radius overlaps with temporary power placement on Site Plan Rev 3.</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-slate-700 bg-rose-50 border border-rose-100 rounded p-3">
              <span className="font-mono text-rose-500 font-bold shrink-0">2.</span>
              <span>Requested boom lift delivery (Nov 3) is 4 weeks before structural steel completion per P6 schedule.</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button className="bg-white border border-slate-300 text-slate-700 font-semibold text-xs px-4 py-2 rounded hover:bg-slate-50 transition-colors">Resolve Conflicts & Revalidate</button>
          <button className="bg-amber-600 text-white font-semibold text-xs px-4 py-2 rounded hover:bg-amber-700 transition-colors flex items-center gap-2">Assemble Request Pack <ArrowRight className="w-3 h-3"/></button>
        </div>
      </div>
    </div>
  );
};

const MockFormalRequest = () => {
  const lineItems = [
    { item: 'Tower Crane 60T', pillar: 'Equipment', qty: 2, delivery: 'Nov 15, 2026', sourcing: 'Internal Fleet', sla: 'On Track' },
    { item: 'Generator 200kW', pillar: 'Equipment', qty: 3, delivery: 'Nov 1, 2026', sourcing: 'MSA Vendor', sla: 'On Track' },
    { item: 'Boom Lift 80ft', pillar: 'Equipment', qty: 14, delivery: 'Dec 3, 2026', sourcing: 'Internal Fleet', sla: 'On Track' },
    { item: 'Telehandler 10K', pillar: 'Equipment', qty: 4, delivery: 'Nov 20, 2026', sourcing: 'MSA Vendor', sla: 'At Risk' },
    { item: 'Light Tower 4kW', pillar: 'Equipment', qty: 8, delivery: 'Oct 28, 2026', sourcing: 'MSA Vendor', sla: 'On Track' },
    { item: 'Skid Steer Loader', pillar: 'Equipment', qty: 3, delivery: 'Nov 8, 2026', sourcing: 'Internal Fleet', sla: 'On Track' },
  ];
  const lineageSteps = [
    { zone: 2, label: 'Fit Score', color: 'bg-indigo-500' },
    { zone: 3, label: 'Margin Plan', color: 'bg-indigo-500' },
    { zone: 4, label: 'V0 Baseline', color: 'bg-emerald-500' },
    { zone: 5, label: 'Refined Intent', color: 'bg-emerald-500' },
    { zone: 6, label: 'Preflight Pass', color: 'bg-amber-500' },
    { zone: 7, label: 'Submitted', color: 'bg-amber-500' },
  ];
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Toolbar
        leftArea={<><Send className="w-4 h-4 text-indigo-500"/><span className="font-bold text-slate-800">Zone 7: Formal Request</span><span className="text-slate-400">|</span><Badge variant="green">Submitted — SLA Active</Badge></>}
        rightArea={<div className="flex items-center gap-2 text-xs font-semibold text-slate-600"><Clock className="w-4 h-4 text-amber-500"/><span className="font-mono">SLA: 3d 14h remaining</span></div>}
      />
      <div className="p-6 overflow-auto flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-4">
          <KPI label="Request ID" value="REQ-2024-0847" />
          <KPI label="Line Items" value="22" />
          <KPI label="Total Estimated Value" value="$1.24M" />
          <KPI label="Routing" value="Equipment Ops" subtext="Auto-routed" />
        </div>
        <div className="overflow-x-auto border border-slate-200 rounded-md bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2 font-semibold">Line Item</th>
                <th className="px-3 py-2 font-semibold">Pillar</th>
                <th className="px-3 py-2 font-semibold text-right">Quantity</th>
                <th className="px-3 py-2 font-semibold">Delivery Date</th>
                <th className="px-3 py-2 font-semibold">Sourcing Path</th>
                <th className="px-3 py-2 font-semibold">SLA Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lineItems.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-2.5 text-slate-800 font-medium">{row.item}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.pillar}</td>
                  <td className="px-3 py-2.5 text-slate-700 font-mono text-right">{row.qty}</td>
                  <td className="px-3 py-2.5 text-slate-600 font-mono">{row.delivery}</td>
                  <td className="px-3 py-2.5"><Badge variant={row.sourcing === 'Internal Fleet' ? 'green' : 'blue'}>{row.sourcing}</Badge></td>
                  <td className="px-3 py-2.5"><Badge variant={row.sla === 'On Track' ? 'green' : 'yellow'}>{row.sla}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2"><Database className="w-4 h-4 text-indigo-500"/> Lineage Trail</h4>
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {lineageSteps.map((step, i) => (
              <React.Fragment key={step.zone}>
                {i > 0 && <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />}
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${step.color} shrink-0`} />
                  <span className="text-[10px] font-bold text-slate-500">Z{step.zone}</span>
                  <span className="text-[10px] text-slate-600 font-medium">{step.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="bg-white border border-amber-200 rounded-md p-4 shadow-sm">
          <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3 flex items-center gap-2"><Zap className="w-4 h-4"/> Post-Submission Changes</h4>
          <div className="bg-amber-50 border border-amber-100 rounded p-3 text-sm text-slate-700">
            <span className="font-semibold text-amber-700">Change #1:</span> Quantity adjustment — Boom Lifts 80ft: <span className="font-mono line-through text-slate-400">12</span> → <span className="font-mono font-bold text-slate-800">14</span> <Badge variant="gray">Minor — within threshold, auto-approved</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

const MockFinancialModel = () => {
  const data = [
    { id: 'OPP-901', name: 'Project Alpha (HQ Build)', zone: 'Zone 2', stage: 'Early Pursuit', gross: 12500000, conf: 0.30, cost: 2600000 },
    { id: 'OPP-822', name: 'Data Center TX', zone: 'Zone 6', stage: 'Preflight', gross: 8200000, conf: 0.90, cost: 5400000 },
    { id: 'OPP-441', name: 'Healthcare Facility C', zone: 'Zone 5', stage: 'Intent Refinement', gross: 4500000, conf: 0.70, cost: 2300000 },
    { id: 'OPP-210', name: 'Logistics Hub NV', zone: 'Zone 3', stage: 'Margin Plan', gross: 6800000, conf: 0.45, cost: 2200000 },
  ];
  const timePhased = [
    { month: 'Oct 2026', gross: 7200000, adj: 2340000, cost: 1500000 },
    { month: 'Nov 2026', gross: 8500000, adj: 3000000, cost: 2200000 },
    { month: 'Dec 2026', gross: 9100000, adj: 3500000, cost: 2600000 },
    { month: 'Jan 2027', gross: 4000000, adj: 4000000, cost: 2900000 },
    { month: 'Feb 2027', gross: 3200000, adj: 4500000, cost: 3300000 },
  ];
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Toolbar leftArea={<><Database className="w-4 h-4 text-emerald-600"/><span className="font-semibold text-slate-800">Financial Handshake Simulator (O2S ↔ FP&A)</span></>} rightArea={<button className="flex items-center gap-2 bg-emerald-600 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-emerald-700"><RefreshCw className="w-3 h-3"/> Sync to Anaplan</button>}/>
      <div className="p-6 flex flex-col flex-grow overflow-hidden gap-4">
        <div className="grid grid-cols-4 gap-4 shrink-0">
          <KPI label="Total Pipeline (Gross)" value="$32.00M" subtext="Unadjusted CRM Rev" />
          <KPI label="Risk-Adjusted Revenue" value="$17.34M" trend="-45.8%" subtext="Zone-weighted yield" />
          <KPI label="O2S Planned Cost Basis" value="$12.50M" subtext="From V0 & Intent Plans" />
          <KPI label="Blended Adj. Margin" value="27.9%" trend="+1.2%" subtext="vs AOP Target" />
        </div>
        <div className="bg-white border border-slate-200 rounded-md shadow-sm flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2"><Target className="w-4 h-4 text-emerald-500"/> Pipeline Revenue Risk Adjustment</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px] whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-3 py-2 font-semibold">Opportunity ID</th><th className="px-3 py-2 font-semibold">Project Name</th><th className="px-3 py-2 font-semibold">Zone & Stage</th>
                  <th className="px-3 py-2 font-semibold text-right">CRM Gross Revenue</th><th className="px-3 py-2 font-semibold text-center border-l border-r border-slate-200">Zone Confidence Multiplier</th>
                  <th className="px-3 py-2 font-semibold text-right text-emerald-700">Risk-Adjusted Revenue</th><th className="px-3 py-2 font-semibold text-right text-rose-700">O2S Planned Cost</th><th className="px-3 py-2 font-semibold text-right text-indigo-700">Adj. Margin $</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((row, i) => {
                  const adjRev = row.gross * row.conf;
                  const margin = adjRev - row.cost;
                  return (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-2 font-mono text-slate-500">{row.id}</td>
                      <td className="px-3 py-2 font-semibold text-slate-800">{row.name}</td>
                      <td className="px-3 py-2"><div className="flex items-center gap-2"><Badge variant={row.conf > 0.8 ? 'green' : row.conf > 0.5 ? 'yellow' : 'gray'}>{row.zone}</Badge><span className="text-slate-500">{row.stage}</span></div></td>
                      <td className="px-3 py-2 font-mono text-right text-slate-500">${(row.gross / 1000000).toFixed(2)}M</td>
                      <td className="px-3 py-2 font-mono text-center font-bold border-l border-r border-slate-200 text-slate-700">{(row.conf * 100).toFixed(0)}%</td>
                      <td className="px-3 py-2 font-mono text-right font-bold text-emerald-700">${(adjRev / 1000000).toFixed(2)}M</td>
                      <td className="px-3 py-2 font-mono text-right text-rose-600">${(row.cost / 1000000).toFixed(2)}M</td>
                      <td className="px-3 py-2 font-mono text-right font-bold text-indigo-600">${(margin / 1000000).toFixed(2)}M</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-md shadow-sm flex flex-col flex-grow overflow-hidden">
          <div className="p-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-500"/> Anaplan Sync Payload (Time-Phased Output)</h3>
          </div>
          <div className="overflow-auto flex-grow">
            <table className="w-full text-left text-[10px] whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 sticky top-0">
                <tr><th className="px-3 py-2 font-semibold">Fiscal Period</th><th className="px-3 py-2 font-semibold text-right">Adjusted Revenue Output</th><th className="px-3 py-2 font-semibold text-right">Planned Cost Output</th><th className="px-3 py-2 font-semibold text-right">Net Margin Output</th><th className="px-3 py-2 font-semibold text-right">Margin %</th><th className="px-3 py-2 font-semibold text-center">Sync Status</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {timePhased.map((row, i) => {
                  const margin = row.adj - row.cost;
                  const pct = (margin / row.adj) * 100;
                  return (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-2 font-bold text-slate-700">{row.month}</td>
                      <td className="px-3 py-2 font-mono text-right text-slate-700">${(row.adj / 1000000).toFixed(2)}M</td>
                      <td className="px-3 py-2 font-mono text-right text-slate-700">${(row.cost / 1000000).toFixed(2)}M</td>
                      <td className="px-3 py-2 font-mono text-right font-bold text-slate-800">${(margin / 1000000).toFixed(2)}M</td>
                      <td className="px-3 py-2 font-mono text-right text-slate-600">{pct.toFixed(1)}%</td>
                      <td className="px-3 py-2 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ id, title, description, icon: Icon, colorClass, highlight, connectionLabel, onClick, zone, isTourActive, isHighlighted }) => (
  <div onClick={() => !isTourActive && onClick({ id, title, description, icon: Icon, colorClass, highlight, zone })}
    className={`p-4 rounded-xl shadow-sm border bg-white flex flex-col relative transition-all ${isTourActive ? '' : 'cursor-pointer'} ${colorClass} 
      ${isTourActive ? (isHighlighted ? 'ring-4 ring-indigo-500 shadow-2xl scale-105 z-20' : 'opacity-30 grayscale blur-[1px] pointer-events-none') : 'hover:shadow-md hover:ring-2 hover:ring-slate-300 hover:-translate-y-1 z-10'}`}>
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
        <div className={`p-2 rounded-lg ${highlight}`}><Icon className="w-4 h-4" /></div>
        <h3 className="leading-tight">{title}</h3>
      </div>
    </div>
    <p className="text-xs text-slate-600 leading-relaxed flex-grow">{description}</p>
    {connectionLabel && <div className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1"><ArrowRight className="w-3 h-3" /> {connectionLabel}</div>}
  </div>
);

const PlaceholderCard = ({ label }) => (
  <div className="p-5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center text-center min-h-[120px] gap-2">
    <Lock className="w-5 h-5 text-slate-300" />
    <p className="text-sm font-medium text-slate-400 leading-snug">{label}</p>
  </div>
);

const PERSONAS = [
  { id: 'project-teams', label: 'Project Teams', icon: HardHat },
  { id: 'o2s-ops', label: 'O2S Operations', icon: Settings },
  { id: 'leadership', label: 'Leadership', icon: BarChart3 },
  { id: 'finance', label: 'Finance & FP&A', icon: DollarSign },
];

const PILLARS = [
  { id: 'equipment', label: 'Equipment', enabled: true },
  { id: 'logistics', label: 'Logistics', enabled: false },
  { id: 'prefabrication', label: 'Prefabrication', enabled: false },
  { id: 'procurement', label: 'Procurement', enabled: false },
  { id: 'professional-services', label: 'Professional Services', enabled: false },
];

const ZONE_GROUPS = [
  { id: 'z1-3', zones: 'Zones 1–3', label: 'Forecast & Shape', color: 'indigo' },
  { id: 'z4-5', zones: 'Zones 4–5', label: 'Baseline & Intent', color: 'emerald' },
  { id: 'z6-7', zones: 'Zones 6–7', label: 'Validate & Request', color: 'amber' },
  { id: 'z8-9', zones: 'Zones 8–9', label: 'Execute & Learn', color: 'rose' },
];

const CARD_REGISTRY = {
  quotes: { title: 'Quick Quotes', description: 'Enable RSIs to generate fast, directional equipment estimates using standardized O2S inputs.', icon: Calculator, colorClass: 'border-indigo-100', highlight: 'bg-indigo-100 text-indigo-600' },
  prepop: { title: 'V0 Baseline Review', description: 'Pre-populate project-level equipment requests using demand forecasts, schedules, and historical patterns.', icon: Layers, colorClass: 'border-emerald-100', highlight: 'bg-emerald-100 text-emerald-600' },
  adhoc: { title: 'Ad-Hoc Request Intake', description: 'Give project teams a structured way to submit ad-hoc equipment requests outside the pre-populated plan.', icon: PenTool, colorClass: 'border-emerald-100', highlight: 'bg-emerald-100 text-emerald-600' },
  forecast: { title: 'Asset Demand Forecast', description: 'Generate a probability-weighted demand forecast by asset class spanning early pipeline through execution readiness.', icon: BarChart, colorClass: 'border-indigo-200 ring-2 ring-indigo-50', highlight: 'bg-indigo-500 text-white' },
  'prepop-ops': { title: 'Pre-Population & Constraint Alerts', description: 'Pre-populate project-level equipment requests using demand forecasts, schedules, and historical patterns.', icon: Layers, colorClass: 'border-emerald-100', highlight: 'bg-emerald-100 text-emerald-600', resolveId: 'prepop' },
  optimize: { title: 'Owned vs Re-Rent Optimizer', description: 'Use enterprise-wide owned fleet visibility to recommend whether each request should be fulfilled with owned equipment or re-rent.', icon: Search, colorClass: 'border-amber-200 ring-2 ring-amber-50', highlight: 'bg-amber-500 text-white' },
  source: { title: 'Strategic Sourcing', description: 'Enable O2S to source from the right vendors at the right time using demand signals and supplier performance.', icon: Box, colorClass: 'border-amber-100', highlight: 'bg-amber-100 text-amber-600' },
  preflight: { title: 'Preflight Validation', description: 'Validate request packs against taxonomy, date feasibility, specifications, and sourcing paths before formal submission.', icon: FileCheck, colorClass: 'border-amber-200', highlight: 'bg-amber-100 text-amber-600' },
  formalrequest: { title: 'Formal Request & Handoff', description: 'Submit validated request packs with full lineage traceability and SLA-tracked routing to fulfillment teams.', icon: Send, colorClass: 'border-amber-100', highlight: 'bg-amber-100 text-amber-600' },
  lifecycle: { title: 'Asset Lifecycle Engine', description: 'Create a unified asset lifecycle view and support better keep / overhaul / redeploy / replace decisions.', icon: RotateCcw, colorClass: 'border-slate-300', highlight: 'bg-slate-200 text-slate-700' },
  capex: { title: 'CapEx Plan', description: 'Translate forward demand and available fleet supply into a prioritized, timing-specific CAPEX plan.', icon: Activity, colorClass: 'border-slate-300', highlight: 'bg-slate-200 text-slate-700' },
  margin: { title: 'Margin Plan', description: 'Define project-level O2S margin pre-go/no-go by pillar and product line, anchored to AOP targets.', icon: Target, colorClass: 'border-indigo-100', highlight: 'bg-indigo-100 text-indigo-600' },
  fpa: { title: 'FP&A Sync', description: 'Risk-adjusted, time-phased revenue and margin forecasts synced to FP&A tools like Anaplan.', icon: DollarSign, colorClass: 'border-emerald-200 ring-2 ring-emerald-50', highlight: 'bg-emerald-500 text-white' },
  anomaly: { title: 'Billing Anomaly Detection', description: 'Detect and flag billing anomalies using project-level patterns before invoice posting.', icon: DollarSign, colorClass: 'border-rose-200 ring-2 ring-rose-50', highlight: 'bg-rose-500 text-white' },
};

const PERSONA_EQUIPMENT_GRID = {
  'project-teams': {
    'z1-3': { cards: ['quotes'], placeholders: [] },
    'z4-5': { cards: ['prepop', 'adhoc'], placeholders: [] },
    'z6-7': { cards: ['preflight'], placeholders: [] },
    'z8-9': { cards: [], placeholders: ['Execution Self-Service — Coming in Prompt 4'] },
  },
  'o2s-ops': {
    'z1-3': { cards: ['forecast'], placeholders: [] },
    'z4-5': { cards: ['prepop-ops'], placeholders: [] },
    'z6-7': { cards: ['optimize', 'source', 'formalrequest'], placeholders: [] },
    'z8-9': { cards: [], placeholders: ['Utilization Monitoring — Coming in Prompt 4'] },
  },
  'leadership': {
    'z1-3': { cards: [], placeholders: ['Portfolio Watchlists — Coming in Prompt 9'] },
    'z4-5': { cards: [], placeholders: ['Project Maturity Summary — Coming in Prompt 10'] },
    'z6-7': { cards: ['lifecycle'], placeholders: [] },
    'z8-9': { cards: ['capex'], placeholders: [] },
  },
  'finance': {
    'z1-3': { cards: ['margin', 'fpa'], placeholders: [] },
    'z4-5': { cards: [], placeholders: ['Cost Basis Roll-Up — Coming in Prompt 8'] },
    'z6-7': { cards: [], placeholders: ['Request Cost Validation — Coming in Prompt 8'] },
    'z8-9': { cards: ['anomaly'], placeholders: [] },
  },
};

const ZONE_SPINE = [
  { phaseId: 'z1-3', color: 'indigo', label: 'Forecast & Shape', zones: [
    { num: 1, name: 'Portfolio Forecast' },
    { num: 2, name: 'Opportunity Correlation' },
    { num: 3, name: 'Precon Decision Pack' },
  ]},
  { phaseId: 'z4-5', color: 'emerald', label: 'Baseline & Intent', zones: [
    { num: 4, name: 'Baseline Generation' },
    { num: 5, name: 'Intent Refinement' },
  ]},
  { phaseId: 'z6-7', color: 'amber', label: 'Validate & Request', zones: [
    { num: 6, name: 'Preflight Validation' },
    { num: 7, name: 'Formal Request & Handoff' },
  ]},
  { phaseId: 'z8-9', color: 'rose', label: 'Execute & Learn', zones: [
    { num: 8, name: 'Execution & Exceptions' },
    { num: 9, name: 'Learning Flywheel' },
  ]},
];

const PHASE_DESCRIPTIONS = {
  'z1-3': 'What demand is coming, where does it align, and which opportunities deserve early engagement?',
  'z4-5': 'What do we need, when do we need it, and how confident are we in the plan?',
  'z6-7': 'Is this ready for submission, and is it being acted upon?',
  'z8-9': 'Is work happening as planned, what actually happened, and how do we get smarter?',
};

const SPINE_STYLES = {
  indigo: {
    activeBand: 'bg-indigo-50/80',
    inactiveBand: 'bg-slate-50/50',
    activeCircle: 'bg-indigo-500 text-white shadow-md ring-2 ring-indigo-200',
    inactiveCircle: 'border-2 border-indigo-200 text-indigo-300 bg-white',
    activeLine: 'bg-indigo-300',
    inactiveLine: 'bg-indigo-200/50',
  },
  emerald: {
    activeBand: 'bg-emerald-50/80',
    inactiveBand: 'bg-slate-50/50',
    activeCircle: 'bg-emerald-500 text-white shadow-md ring-2 ring-emerald-200',
    inactiveCircle: 'border-2 border-emerald-200 text-emerald-300 bg-white',
    activeLine: 'bg-emerald-300',
    inactiveLine: 'bg-emerald-200/50',
  },
  amber: {
    activeBand: 'bg-amber-50/80',
    inactiveBand: 'bg-slate-50/50',
    activeCircle: 'bg-amber-500 text-white shadow-md ring-2 ring-amber-200',
    inactiveCircle: 'border-2 border-amber-200 text-amber-300 bg-white',
    activeLine: 'bg-amber-300',
    inactiveLine: 'bg-amber-200/50',
  },
  rose: {
    activeBand: 'bg-rose-50/80',
    inactiveBand: 'bg-slate-50/50',
    activeCircle: 'bg-rose-500 text-white shadow-md ring-2 ring-rose-200',
    inactiveCircle: 'border-2 border-rose-200 text-rose-300 bg-white',
    activeLine: 'bg-rose-300',
    inactiveLine: 'bg-rose-200/50',
  },
};

const App = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [activePersona, setActivePersona] = useState('project-teams');
  const [activePillar, setActivePillar] = useState('equipment');
  const [pillarDropdownOpen, setPillarDropdownOpen] = useState(false);
  const [hoveredPhase, setHoveredPhase] = useState(null);

  const tourData = [
    { id: 0, title: "Step 1: The Pipeline Handshake", targetNodes: ['fpa', 'margin'], transcript: "Welcome to the O2S Console tour. For years, the biggest gap in our operations was the disconnect between our CRM pipeline and FP&A systems. Opportunity data sat in one silo, and financial planning in another. By implementing the O2S Project Margin Plan in Zones 1 through 3, we force a handshake. We establish a pre-go/no-go baseline anchored to our annual operating targets, which directly feeds a risk-adjusted, time-phased payload back to Anaplan." },
    { id: 1, title: "Step 2: Early Demand Shaping", targetNodes: ['forecast', 'quotes'], transcript: "But a financial target isn't an operational plan. We need to know what physical assets are actually required. That's where early demand shaping comes in. We take those early pipeline signals and generate a probability-weighted Asset-Level Demand Forecast spanning Zones 1 through 7. This early visibility is what allows our estimators to generate Quick Quotes for project teams with high confidence, long before the final blueprints are drawn." },
    { id: 2, title: "Step 3: Translating Forecasts to Intents", targetNodes: ['prepop', 'adhoc'], transcript: "As a project matures into Zones 4 and 5, the abstract forecast must become a concrete operational intent. The system doesn't make project teams start from scratch; it uses AI to pre-populate request intakes based on the V0 baseline and historical patterns. However, we know reality on the ground changes. That's why we pair it with an Ad-Hoc Request Intake tool, giving project teams the flexibility to refine quantities, adjust schedules, and officially declare what they actually need." },
    { id: 3, title: "Step 4: Fulfillment & Sourcing", targetNodes: ['optimize', 'source'], transcript: "Now we hit the execution threshold in Zones 6 and 7: Preflight Validation. We have a validated intent, but how do we fulfill it profitably? The Owned vs. Re-rent Optimizer evaluates our enterprise-wide fleet visibility. It makes a ruthless, margin-optimized recommendation. And when internal capacity falls short, the system automatically triggers Strategic Sourcing workflows, pushing the demand signal directly to our procurement teams." },
    { id: 4, title: "Step 5: Execution & The Flywheel", targetNodes: ['anomaly', 'lifecycle', 'capex'], transcript: "Finally, the equipment hits the dirt. In Zones 8 and 9, the data flywheel completes its circuit. As invoices roll in, Billing Anomaly Detection models flag discrepancies before they impact the bottom line. More importantly, every actualized cost and duration is fed back into the Asset Lifecycle decision engine. This closed-loop system continually refines our CAPEX planning and makes the next V0 baseline even more accurate." }
  ];

  const renderWorkflowContent = (id) => {
    switch(id) {
      case 'lifecycle': return <MockAssetLifecycle />;
      case 'capex': return <MockCapexPlan />;
      case 'quotes': return <MockQuickQuotes />;
      case 'margin': return <MockMarginPlan />;
      case 'forecast': return <MockAssetDemandForecasting />;
      case 'prepop': case 'prepop-ops': return <MockPrePopulation />;
      case 'adhoc': return <MockAdHocIntake />;
      case 'optimize': return <MockOptimizer />;
      case 'source': return <MockStrategicSourcing />;
      case 'preflight': return <MockPreflightValidation />;
      case 'formalrequest': return <MockFormalRequest />;
      case 'anomaly': return <MockBillingAnomaly />;
      case 'fpa': return <MockFinancialModel />;
      default: return <div className="p-10 flex justify-center items-center h-full text-slate-400">Workflow simulation not mapped for this node.</div>;
    }
  };

  const isHighlighted = (nodeId) => isTourActive && tourData[tourStep].targetNodes.includes(nodeId);

  const activePersonaObj = PERSONAS.find(p => p.id === activePersona);
  const activePillarObj = PILLARS.find(p => p.id === activePillar);
  const isEquipment = activePillar === 'equipment';
  const grid = isEquipment ? PERSONA_EQUIPMENT_GRID[activePersona] : null;

  const activePhases = new Set();
  if (grid) {
    ZONE_GROUPS.forEach(zg => {
      if (grid[zg.id].cards.length > 0) activePhases.add(zg.id);
    });
  }

  const zoneColorMap = { indigo: 'border-t-indigo-500 bg-indigo-50', emerald: 'border-t-emerald-500 bg-emerald-50', amber: 'border-t-amber-500 bg-amber-50', rose: 'border-t-rose-500 bg-rose-50' };
  const zoneTextMap = { indigo: 'text-indigo-600', emerald: 'text-emerald-600', amber: 'text-amber-600', rose: 'text-rose-600' };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 relative flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-700 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Persona Tabs */}
            <div className="flex items-center gap-1">
              {PERSONAS.map(persona => {
                const Icon = persona.icon;
                const isActive = activePersona === persona.id;
                return (
                  <button
                    key={persona.id}
                    onClick={() => setActivePersona(persona.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {persona.label}
                  </button>
                );
              })}
            </div>

            {/* Pillar Selector */}
            <div className="relative">
              <button
                onClick={() => setPillarDropdownOpen(!pillarDropdownOpen)}
                className="flex items-center gap-2 bg-slate-800 border border-slate-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors"
              >
                <Box className="w-4 h-4 text-indigo-400" />
                {activePillarObj.label}
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${pillarDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {pillarDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setPillarDropdownOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50">
                    {PILLARS.map(pillar => (
                      <button
                        key={pillar.id}
                        onClick={() => { if (pillar.enabled) { setActivePillar(pillar.id); setPillarDropdownOpen(false); } }}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between ${
                          pillar.enabled
                            ? pillar.id === activePillar
                              ? 'bg-indigo-50 text-indigo-700 font-semibold'
                              : 'text-slate-700 hover:bg-slate-50'
                            : 'text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <span>{pillar.label}</span>
                        {!pillar.enabled && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full border border-slate-200">Coming Soon</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 md:p-8 overflow-x-auto">
        <div className={`transition-all duration-500 ${selectedNode ? 'blur-sm scale-95 opacity-50' : 'blur-0 scale-100 opacity-100'} min-w-[1000px] max-w-7xl mx-auto space-y-6`}>
          {/* Page Title */}
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                {activePersonaObj.label} — {activePillarObj.label}
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-1">Click any workflow card to explore its interactive simulation.</p>
            </div>
            <button onClick={() => { setIsTourActive(true); setTourStep(0); setSelectedNode(null); }} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold shadow-sm transition-colors shrink-0">
              <Play className="w-4 h-4" /> Play 3.18 Podcast Walkthrough
            </button>
          </div>

          {/* Zone Progression Spine */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-5">
            <div className="flex items-center gap-1">
              {ZONE_SPINE.map((phase, phaseIdx) => {
                const styles = SPINE_STYLES[phase.color];
                const isActive = activePhases.has(phase.phaseId);
                return (
                  <React.Fragment key={phase.phaseId}>
                    {phaseIdx > 0 && <div className="w-3 h-0.5 bg-slate-300 shrink-0" />}
                    <div
                      className={`flex items-center rounded-lg px-3 py-2.5 transition-colors ${
                        isActive ? styles.activeBand : styles.inactiveBand
                      } ${phase.zones.length === 3 ? 'flex-[3]' : 'flex-[2]'}`}
                      onMouseEnter={() => setHoveredPhase(phase.phaseId)}
                      onMouseLeave={() => setHoveredPhase(null)}
                    >
                      {phase.zones.map((zone, zoneIdx) => (
                        <React.Fragment key={zone.num}>
                          {zoneIdx > 0 && (
                            <div className={`flex-grow h-0.5 mx-1 ${isActive ? styles.activeLine : styles.inactiveLine}`} />
                          )}
                          <div className="relative group shrink-0">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all cursor-default ${
                              isActive ? styles.activeCircle : styles.inactiveCircle
                            }`}>
                              {zone.num}
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-800 text-white text-[11px] font-medium rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                              <div className="font-bold">Zone {zone.num}</div>
                              <div className="text-slate-300">{zone.name}</div>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-800" />
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            <div className="mt-3 text-center h-5">
              <p className={`text-sm text-slate-600 transition-opacity ${hoveredPhase ? 'opacity-100' : 'opacity-0'}`}>
                {hoveredPhase ? PHASE_DESCRIPTIONS[hoveredPhase] : '\u00A0'}
              </p>
            </div>
            <p className="text-center text-[11px] italic text-slate-400 mt-1">
              Zone state is observed, never declared — progress is derived from system-of-record data, not manual status updates.
            </p>
          </div>

          {isEquipment ? (
            /* Zone-Grouped Grid */
            <div className="grid grid-cols-4 gap-5">
              {/* Zone Column Headers */}
              {ZONE_GROUPS.map(zg => (
                <div key={zg.id} className={`rounded-t-xl border-t-4 ${zoneColorMap[zg.color]} p-4 text-center`}>
                  <div className={`text-[11px] font-bold uppercase tracking-widest ${zoneTextMap[zg.color]} mb-1`}>{zg.zones}</div>
                  <div className="text-sm font-bold text-slate-800 leading-tight">{zg.label}</div>
                </div>
              ))}

              {/* Card Cells */}
              {ZONE_GROUPS.map(zg => {
                const cell = grid[zg.id];
                return (
                  <div key={zg.id + '-cards'} className="flex flex-col gap-4">
                    {cell.cards.map(cardKey => {
                      const meta = CARD_REGISTRY[cardKey];
                      const workflowId = meta.resolveId || cardKey;
                      return (
                        <Card
                          key={cardKey}
                          id={workflowId}
                          title={meta.title}
                          description={meta.description}
                          icon={meta.icon}
                          colorClass={meta.colorClass}
                          highlight={meta.highlight}
                          zone={zg.zones}
                          onClick={setSelectedNode}
                          isTourActive={isTourActive}
                          isHighlighted={isHighlighted(workflowId)}
                        />
                      );
                    })}
                    {cell.placeholders.map((label, i) => (
                      <PlaceholderCard key={i} label={label} />
                    ))}
                    {cell.cards.length === 0 && cell.placeholders.length === 0 && (
                      <div className="min-h-[120px]" />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Non-Equipment Pillar Message */
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-16 text-center">
              <Lock className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-700 mb-2">{activePillarObj.label} workflows are under development.</h2>
              <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                The zone model, trigger engine, and persona-based views you see for Equipment will extend to this pillar.
              </p>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="mt-8 border-t-4 border-t-sky-500 bg-sky-900 text-white p-5 rounded-b-2xl shadow-lg flex items-center gap-4">
            <div className="bg-sky-800 p-3 rounded-xl shrink-0"><Monitor className="w-6 h-6 text-sky-300" /></div>
            <div>
              <h3 className="font-bold text-lg text-sky-100 tracking-tight">Custom Frontend / Platform Level</h3>
              <p className="text-sm text-sky-200 mt-1 leading-relaxed">Provide one shared interface for project teams, O2S Equipment, Finance & Controls, and RSI teams across O2S workflows. Replaces fragmented point solutions to create a unified data flywheel.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Overlay */}
      {isTourActive && (
        <div className="fixed bottom-8 right-8 w-96 bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 z-[100] flex flex-col overflow-hidden">
          <div className="bg-slate-900 p-4 flex justify-between items-start text-white">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1 flex items-center gap-2"><Play className="w-3 h-3"/> Podcast Tour - Step {tourStep + 1} of 5</div>
              <h3 className="font-bold text-sm leading-tight">{tourData[tourStep].title}</h3>
            </div>
            <button onClick={() => setIsTourActive(false)} className="p-1 hover:bg-slate-800 rounded transition-colors"><X className="w-4 h-4 text-slate-400 hover:text-white"/></button>
          </div>
          <div className="p-5 text-sm text-slate-700 leading-relaxed max-h-[40vh] overflow-y-auto border-b border-slate-100">{tourData[tourStep].transcript}</div>
          <div className="bg-slate-50 p-4 flex justify-between items-center">
            <button disabled={tourStep === 0} onClick={() => setTourStep(s => s - 1)} className="text-xs font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-colors">Previous</button>
            <div className="flex gap-1.5">{tourData.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === tourStep ? 'bg-indigo-500' : 'bg-slate-300'}`}/>)}</div>
            <button onClick={() => { if (tourStep === tourData.length - 1) setIsTourActive(false); else setTourStep(s => s + 1); }} className="text-xs font-bold bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700 shadow-sm transition-colors">{tourStep === tourData.length - 1 ? 'Finish Tour' : 'Next'}</button>
          </div>
        </div>
      )}

      {/* Card Expand Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-slate-900/60 p-6">
          <div className="w-full max-w-6xl h-full max-h-[85vh] bg-slate-200 rounded-lg shadow-2xl flex flex-col overflow-hidden border border-slate-700">
            <div className="bg-slate-900 flex justify-between items-center p-4 border-b border-slate-700 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-slate-800 border border-slate-700"><selectedNode.icon className="w-5 h-5 text-indigo-400" /></div>
                <div>
                  <h2 className="font-bold text-white leading-none mb-1 text-sm">{selectedNode.title}</h2>
                  <div className="flex items-center gap-2"><p className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">{selectedNode.zone}</p><span className="text-slate-600">{'\u2022'}</span><p className="text-[10px] text-slate-500">Interactive Simulation</p></div>
                </div>
              </div>
              <button onClick={() => setSelectedNode(null)} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-grow overflow-hidden flex flex-col bg-slate-100">{renderWorkflowContent(selectedNode.id)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;