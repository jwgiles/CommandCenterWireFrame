import React, { useState } from 'react';
import {
  Calculator, Target, BarChart, Layers, PenTool, RotateCcw, Activity,
  Search, Box, DollarSign, Monitor, ArrowRight, ArrowDown, X,
  Filter, Download, Play, AlertTriangle, CheckCircle2, Clock,
  Settings, Database, ChevronRight, Zap, RefreshCw, ShoppingCart, ShieldAlert,
  HardHat, BarChart3, Lock, ChevronDown, TrendingUp,
  FileCheck, Send, Truck, Star, Repeat, GitBranch, Bell, Eye, Gauge, Crosshair, ClipboardList
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

const MockExecutionDashboard = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const orders = [
    { id: 'ORD-4410', asset: 'Tower Crane 60T', project: 'Data Center TX', deploy: 'Sep 12', offRent: 'Dec 15', status: 'Active', days: 42, util: 78 },
    { id: 'ORD-4411', asset: 'Generator 200kW', project: 'Data Center TX', deploy: 'Sep 20', offRent: 'Nov 30', status: 'Active', days: 34, util: 91 },
    { id: 'ORD-4398', asset: 'Boom Lift 80ft', project: 'HQ Build', deploy: 'Aug 28', offRent: 'Nov 10', status: 'Exception', days: 57, util: 12 },
    { id: 'ORD-4415', asset: 'Skid Steer Loader', project: 'Healthcare C', deploy: 'Oct 1', offRent: 'Jan 15', status: 'Active', days: 22, util: 65 },
    { id: 'ORD-4389', asset: 'Light Tower 4kW', project: 'Logistics Hub NV', deploy: 'Aug 15', offRent: 'Oct 1', status: 'Overdue Closeout', days: 69, util: 44 },
    { id: 'ORD-4420', asset: 'Telehandler 10K', project: 'Data Center TX', deploy: 'Oct 8', offRent: 'Feb 28', status: 'Active', days: 15, util: 82 },
  ];
  const filtered = statusFilter === 'All' ? orders : orders.filter(o => o.status === statusFilter);
  const statusVariant = { Active: 'green', Exception: 'yellow', 'Overdue Closeout': 'red' };
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Toolbar
        leftArea={<><Truck className="w-4 h-4 text-rose-500"/><span className="font-bold text-slate-800">Zone 8: Execution & Exceptions</span><span className="text-slate-400">|</span><span className="text-slate-600">12 Active Orders</span></>}
        rightArea={
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="text-xs border border-slate-200 rounded px-2 py-1.5 bg-white outline-none focus:border-indigo-500">
            <option>All</option><option>Active</option><option>Exception</option><option>Overdue Closeout</option>
          </select>
        }
      />
      <div className="p-6 overflow-auto flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-4">
          <KPI label="Active Deployments" value="47 assets" />
          <KPI label="On-Time Delivery" value="89%" trend="-3%" subtext="vs last month" />
          <KPI label="Avg Days on Rent" value="34" />
          <div className="bg-white border border-slate-200 p-3 rounded-md shadow-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Cost vs Plan</div>
            <div className="text-xl font-bold font-mono text-rose-600">+4.2%</div>
          </div>
        </div>
        <div className="overflow-x-auto border border-slate-200 rounded-md bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2 font-semibold">Order ID</th>
                <th className="px-3 py-2 font-semibold">Asset Description</th>
                <th className="px-3 py-2 font-semibold">Project</th>
                <th className="px-3 py-2 font-semibold">Deploy Date</th>
                <th className="px-3 py-2 font-semibold">Off-Rent Date</th>
                <th className="px-3 py-2 font-semibold">Status</th>
                <th className="px-3 py-2 font-semibold text-right">Days on Site</th>
                <th className="px-3 py-2 font-semibold">Utilization %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-2.5 font-mono text-indigo-600 font-semibold">{row.id}</td>
                  <td className="px-3 py-2.5 text-slate-800 font-medium">{row.asset}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.project}</td>
                  <td className="px-3 py-2.5 text-slate-600 font-mono">{row.deploy}</td>
                  <td className="px-3 py-2.5 text-slate-600 font-mono">{row.offRent}</td>
                  <td className="px-3 py-2.5">
                    <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
                    {row.util <= 20 && <Badge variant="red">Underutilized</Badge>}
                  </td>
                  <td className="px-3 py-2.5 text-slate-700 font-mono text-right">{row.days}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${row.util >= 60 ? 'bg-emerald-500' : row.util >= 30 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${row.util}%` }} />
                      </div>
                      <span className={`font-mono text-[10px] font-bold ${row.util >= 60 ? 'text-emerald-600' : row.util >= 30 ? 'text-amber-600' : 'text-rose-600'}`}>{row.util}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-indigo-500"/> Self-Serve Actions</h4>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Extend Rental', icon: Clock, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
              { label: 'Swap Asset', icon: Repeat, color: 'text-amber-600 bg-amber-50 border-amber-200' },
              { label: 'Request Early Return', icon: RotateCcw, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
            ].map((action, i) => (
              <button key={i} className={`flex flex-col items-center gap-1.5 p-4 rounded-lg border ${action.color} hover:shadow-md transition-shadow`}>
                <action.icon className="w-5 h-5" />
                <span className="text-xs font-bold">{action.label}</span>
                <span className="text-[9px] text-slate-400 italic">(Creates auditable change record)</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MockVendorScorecard = () => {
  const engagements = [
    { project: 'Data Center TX', asset: 'Generator 200kW', planned: 'Sep 20', actual: 'Sep 22', variance: 2, billing: '94%', flag: null },
    { project: 'HQ Build', asset: 'Boom Lift 80ft', planned: 'Aug 28', actual: 'Aug 28', variance: 0, billing: '100%', flag: null },
    { project: 'Healthcare C', asset: 'Light Tower 4kW', planned: 'Oct 1', actual: 'Oct 8', variance: 7, billing: '82%', flag: 'Billing Dispute' },
    { project: 'Logistics Hub NV', asset: 'Skid Steer Loader', planned: 'Aug 15', actual: 'Aug 16', variance: 1, billing: '97%', flag: null },
    { project: 'Data Center TX', asset: 'Telehandler 10K', planned: 'Oct 8', actual: 'Oct 8', variance: 0, billing: '100%', flag: 'Minor Damage' },
  ];
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Toolbar
        leftArea={<><Star className="w-4 h-4 text-amber-500"/><span className="font-bold text-slate-800">Vendor Performance Scorecard</span><span className="text-slate-400">|</span><span className="text-slate-600">Sunbelt Rentals — Texas Region</span></>}
        rightArea={<span className="text-xs text-slate-500 font-mono">Last compiled: Today, 06:00 AM</span>}
      />
      <div className="p-6 overflow-auto flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-4">
          <KPI label="Engagements (12mo)" value="142" />
          <KPI label="On-Time Delivery" value="87%" />
          <KPI label="Billing Accuracy" value="91%" />
          <div className="bg-white border border-slate-200 p-3 rounded-md shadow-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Safety Incidents</div>
            <div className="text-xl font-bold font-mono text-amber-600">2</div>
          </div>
        </div>
        <div className="overflow-x-auto border border-slate-200 rounded-md bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2 font-semibold">Project</th>
                <th className="px-3 py-2 font-semibold">Asset</th>
                <th className="px-3 py-2 font-semibold">Planned Delivery</th>
                <th className="px-3 py-2 font-semibold">Actual Delivery</th>
                <th className="px-3 py-2 font-semibold text-right">Variance (days)</th>
                <th className="px-3 py-2 font-semibold text-right">Billing Accuracy</th>
                <th className="px-3 py-2 font-semibold">Damage / Safety</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {engagements.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-2.5 text-slate-800 font-medium">{row.project}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.asset}</td>
                  <td className="px-3 py-2.5 text-slate-600 font-mono">{row.planned}</td>
                  <td className="px-3 py-2.5 text-slate-600 font-mono">{row.actual}</td>
                  <td className="px-3 py-2.5 text-right font-mono">
                    <span className={row.variance === 0 ? 'text-emerald-600 font-bold' : row.variance <= 2 ? 'text-amber-600 font-bold' : 'text-rose-600 font-bold'}>{row.variance === 0 ? '—' : `+${row.variance}`}</span>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono">
                    <span className={parseInt(row.billing) >= 95 ? 'text-emerald-600' : parseInt(row.billing) >= 85 ? 'text-amber-600' : 'text-rose-600'}>{row.billing}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    {row.flag ? <Badge variant={row.flag === 'Minor Damage' ? 'yellow' : 'red'}>{row.flag}</Badge> : <span className="text-slate-400">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs italic text-slate-400 text-center">Scorecard auto-compiled from Zone 8 closeout data. Final qualitative review required from project team.</p>
        <div className="flex justify-center">
          <button className="bg-indigo-600 text-white font-semibold text-xs px-5 py-2 rounded hover:bg-indigo-700 transition-colors">Approve & Publish to Enterprise Vendor Registry</button>
        </div>
      </div>
    </div>
  );
};

const MockFitScore = () => {
  const opportunities = [
    { name: 'Hospital Expansion — Phoenix', region: 'Southwest', type: 'Healthcare', value: '$85M', fit: 92, drivers: 'Repetitive patient rooms → prefab, heavy MEP → crane + lifts', play: 'Early design-in meeting with prefab + equipment', zone: 'Zone 2' },
    { name: 'Data Center — Dallas', region: 'South', type: 'Data Center', value: '$400M', fit: 88, drivers: 'Long-lead power gen, high crane utilization, temp power demand', play: 'Engage estimating for Quick Quote', zone: 'Zone 2' },
    { name: 'Office TI — Chicago', region: 'Midwest', type: 'Office', value: '$12M', fit: 24, drivers: 'Light equipment needs, short duration', play: 'Standard catalog only', zone: 'Zone 1' },
    { name: 'Warehouse — Atlanta', region: 'Southeast', type: 'Industrial', value: '$45M', fit: 61, drivers: 'Earthmoving + material handling demand', play: 'Monitor — engage at Zone 3 if awarded', zone: 'Zone 2' },
  ];
  const fitColor = (v) => v >= 75 ? 'bg-emerald-500' : v >= 50 ? 'bg-amber-500' : 'bg-slate-400';
  const fitText = (v) => v >= 75 ? 'text-emerald-600' : v >= 50 ? 'text-amber-600' : 'text-slate-500';
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Toolbar
        leftArea={<><Crosshair className="w-4 h-4 text-indigo-500"/><span className="font-bold text-slate-800">Zone 2: Opportunity Correlation & Fit Scoring</span><span className="text-slate-400">|</span><span className="text-slate-600">FP&A Committed Forecast — Q3 FY26</span></>}
        rightArea={<button className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-indigo-700"><RefreshCw className="w-3 h-3"/> Refresh Fit Scores</button>}
      />
      <div className="px-6 py-2 bg-white border-b border-slate-200 shrink-0">
        <p className="text-xs text-slate-500 italic">Opportunities originate in CRM but are evaluated here against the FP&A committed forecast — the enterprise's one version of truth.</p>
      </div>
      <div className="p-6 overflow-auto flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-4">
          <KPI label="FP&A Forecast Entries" value="41" />
          <KPI label="Correlated to CRM Opportunities" value="28" />
          <KPI label="High Fit (Equipment)" value="6 opportunities" />
          <KPI label="Est. O2S Revenue at Stake" value="$18.4M" />
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-md bg-white">
          <table className="w-full text-left text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-3 py-2 font-semibold">Opportunity (from FP&A)</th>
                <th className="px-3 py-2 font-semibold">Region</th>
                <th className="px-3 py-2 font-semibold">Project Type</th>
                <th className="px-3 py-2 font-semibold text-right">Est. Value</th>
                <th className="px-3 py-2 font-semibold">Equipment Fit Score</th>
                <th className="px-3 py-2 font-semibold">Key Fit Drivers</th>
                <th className="px-3 py-2 font-semibold">Recommended Play</th>
                <th className="px-3 py-2 font-semibold">Zone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {opportunities.map((opp, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-2.5 text-slate-800 font-semibold">{opp.name}</td>
                  <td className="px-3 py-2.5 text-slate-600">{opp.region}</td>
                  <td className="px-3 py-2.5 text-slate-600">{opp.type}</td>
                  <td className="px-3 py-2.5 text-slate-700 font-mono text-right font-semibold">{opp.value}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${fitColor(opp.fit)}`} style={{ width: `${opp.fit}%` }} />
                      </div>
                      <span className={`font-mono font-bold text-[10px] ${fitText(opp.fit)}`}>{opp.fit}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-slate-500 max-w-[200px]"><span className="leading-snug">{opp.drivers}</span></td>
                  <td className="px-3 py-2.5 text-indigo-600 font-medium max-w-[180px]">{opp.play}</td>
                  <td className="px-3 py-2.5"><Badge variant={opp.zone === 'Zone 2' ? 'blue' : 'gray'}>{opp.zone}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-indigo-200 rounded-md p-4 shadow-sm">
          <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2 flex items-center gap-2"><Zap className="w-4 h-4"/> Elevated Attention: Hospital Expansion — Phoenix</h4>
          <p className="text-sm text-slate-700">High fit score (92%) + long-lead crane risk + strategic client. <strong>Recommended:</strong> Pillar lead engagement before pursuit milestone.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-sm">
          <p className="text-[11px] italic text-slate-400 text-center">Fit scores are computed using pillar-specific criteria: Hero Product Lines, Capacity Lulls, High-ROI Equipment categories, and historical project-type demand patterns.</p>
        </div>
      </div>
    </div>
  );
};

const MockProjectMaturity = () => {
  const zoneGroups = [
    { zone: 8, label: 'Execution Active', color: 'emerald', items: [
      { name: 'Generator 200kW (×3)', detail: 'Deployed', badge: 'green' },
      { name: 'Boom Lift 60ft (×5)', detail: 'Deployed', badge: 'green' },
    ]},
    { zone: 7, label: 'Formally Submitted', color: 'emerald', items: [
      { name: 'Tower Crane 60T (×1)', detail: 'SLA: 2d remaining', badge: 'yellow' },
      { name: 'Excavator 30T (×4)', detail: 'SLA: On Track', badge: 'green' },
    ]},
    { zone: 5, label: 'Intent Refinement', color: 'amber', items: [
      { name: 'Switchgear 480V (×2)', detail: 'Clarity: 60%', badge: 'yellow' },
      { name: 'Scissor Lift (×2)', detail: 'Clarity: 85%', badge: 'green' },
    ]},
    { zone: 6, label: 'Preflight', color: 'amber', items: [
      { name: 'Light Tower (×2)', detail: 'Preflight: 1 conflict pending', badge: 'yellow' },
    ]},
    { zone: 3, label: 'Early Planning', color: 'slate', items: [
      { name: 'Temp Power Distribution (×3)', detail: 'Waiting on: MEP design package', badge: 'gray' },
    ]},
  ];
  const headerColors = { emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800', amber: 'bg-amber-50 border-amber-200 text-amber-800', slate: 'bg-slate-50 border-slate-200 text-slate-700' };
  const dotColors = { emerald: 'bg-emerald-500', amber: 'bg-amber-500', slate: 'bg-slate-400' };
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Toolbar
        leftArea={<><ClipboardList className="w-4 h-4 text-indigo-500"/><span className="font-bold text-slate-800">Project Maturity Summary</span><span className="text-slate-400">|</span><span className="text-slate-600">Data Center TX</span></>}
        rightArea={<span className="text-xs text-slate-500 font-mono">Last refreshed: Real-time from systems of record</span>}
      />
      <div className="px-6 py-2 bg-white border-b border-slate-200 shrink-0">
        <p className="text-xs text-slate-500 italic">A project is rarely in a single zone. This view shows the distribution of packages and line items across the zone lifecycle.</p>
      </div>
      <div className="p-6 overflow-auto flex flex-col gap-5">
        {/* Maturity Profile Bar */}
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Zone Distribution</h4>
          <div className="flex h-8 rounded-lg overflow-hidden border border-slate-200 mb-3">
            <div className="bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold" style={{ width: '60%' }}>Zone 7+ — 60%</div>
            <div className="bg-amber-400 flex items-center justify-center text-amber-900 text-[10px] font-bold" style={{ width: '25%' }}>Z5–6 — 25%</div>
            <div className="bg-slate-300 flex items-center justify-center text-slate-700 text-[10px] font-bold" style={{ width: '15%' }}>Z3–4</div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-[10px]">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" /><span className="text-slate-600"><strong>13 line items</strong> submitted & in execution</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" /><span className="text-slate-600"><strong>6 line items</strong> in refinement / preflight</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0" /><span className="text-slate-600"><strong>3 line items</strong> still in early planning</span></div>
          </div>
          <div className="mt-3 flex gap-6 text-xs text-slate-500">
            <div><span className="font-semibold text-slate-700">Trailing Edge:</span> Zone 3 — Temp power specifications pending client MEP decision</div>
            <div><span className="font-semibold text-slate-700">Leading Edge:</span> Zone 8 — 8 items actively deployed on site</div>
          </div>
        </div>

        {/* Zone Distribution Drill-Down */}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
          <div className="p-3 border-b border-slate-200 bg-slate-50">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2"><Database className="w-4 h-4 text-indigo-500"/> Zone Distribution Drill-Down</h4>
          </div>
          <div className="divide-y divide-slate-100">
            {zoneGroups.map((group, gi) => (
              <div key={gi}>
                <div className={`px-4 py-2.5 flex items-center gap-2 border-l-4 ${headerColors[group.color]} border-l-${group.color === 'emerald' ? 'emerald' : group.color === 'amber' ? 'amber' : 'slate'}-500`}>
                  <div className={`w-6 h-6 rounded-full ${dotColors[group.color]} text-white text-[10px] font-bold flex items-center justify-center`}>{group.zone}</div>
                  <span className="text-xs font-bold">{group.items.length} item{group.items.length !== 1 ? 's' : ''} — {group.label}</span>
                </div>
                {group.items.map((item, ii) => (
                  <div key={ii} className="px-4 py-2 pl-14 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                    <span className="text-slate-700 font-medium">{item.name}</span>
                    <Badge variant={item.badge}>{item.detail}</Badge>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Blocked Items */}
        <div className="bg-white border border-rose-200 rounded-md p-4 shadow-sm">
          <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> 2 Items Blocked from Zone Progression</h4>
          <div className="space-y-3">
            <div className="bg-rose-50 border border-rose-100 rounded p-3">
              <p className="text-sm text-slate-800 font-medium">Switchgear 480V</p>
              <p className="text-xs text-slate-600 mt-1">Gate condition not met: <strong>Full taxonomy (specification) incomplete</strong></p>
              <p className="text-[10px] text-indigo-600 font-semibold mt-1.5 cursor-pointer hover:underline">What would advance this? → Project team provides load chart and voltage requirements</p>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded p-3">
              <p className="text-sm text-slate-800 font-medium">Temp Power Distribution</p>
              <p className="text-xs text-slate-600 mt-1">Gate condition not met: <strong>MEP design package not released in document management system</strong></p>
              <p className="text-[10px] text-indigo-600 font-semibold mt-1.5 cursor-pointer hover:underline">What would advance this? → Client releases MEP package Rev 2 into Procore / ACC</p>
            </div>
          </div>
        </div>

        {/* Ready-to-Act Summary */}
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Ready-to-Act Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /><span className="text-slate-700"><strong>2 items</strong> ready for preflight submission</span></div>
            <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" /><span className="text-slate-700"><strong>4 items</strong> need planning refinement</span></div>
            <div className="flex items-center gap-2"><X className="w-4 h-4 text-rose-500 shrink-0" /><span className="text-slate-700"><strong>2 items</strong> blocked by missing gate conditions</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MockRegressionEvent = () => {
  const affected = [
    { item: 'Tower Crane 60T', prior: 7, now: 6, reason: 'Structural milestone shifted +3 weeks' },
    { item: 'Boom Lift 80ft (×2)', prior: 7, now: 6, reason: 'Dependent on crane erection date' },
    { item: 'Generator 200kW', prior: 7, now: 6, reason: 'Temp power schedule linked to crane mobilization' },
  ];
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-rose-600 border-b border-rose-700 px-6 py-2.5 flex justify-between items-center shrink-0 text-sm">
        <div className="flex items-center gap-3 text-white">
          <AlertTriangle className="w-4 h-4" />
          <span className="font-bold">Zone Regression Detected</span>
          <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">Zone 7 → Zone 6</span>
        </div>
        <span className="text-rose-200 text-xs font-mono">Nov 12, 2026, 2:14 PM CST</span>
      </div>
      <div className="p-6 overflow-auto flex flex-col gap-5">
        {/* Event Summary */}
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
          <p className="text-sm text-rose-900 font-semibold mb-2">Request REQ-2024-0847 has regressed from Zone 7 to Zone 6.</p>
          <div className="space-y-1.5 text-xs text-rose-800">
            <p><span className="font-semibold">Triggering condition:</span> Schedule change in P6 invalidated preflight date feasibility for 4 line items.</p>
            <p><span className="font-semibold">Detected:</span> Automatically via P6 schedule data sync — no manual reporting required.</p>
          </div>
        </div>

        {/* Impact Propagation */}
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-rose-500"/> Impact Propagation</h3>
          <p className="text-xs text-slate-600 mb-3">Affected Line Items: <strong>4 of 22</strong></p>
          <div className="overflow-x-auto border border-slate-200 rounded-md bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-3 py-2 font-semibold">Line Item</th>
                  <th className="px-3 py-2 font-semibold text-center">Prior Zone</th>
                  <th className="px-3 py-2 font-semibold text-center">New Zone</th>
                  <th className="px-3 py-2 font-semibold">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {affected.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 py-2.5 text-slate-800 font-medium">{row.item}</td>
                    <td className="px-3 py-2.5 text-center"><span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{row.prior}</span></td>
                    <td className="px-3 py-2.5 text-center"><span className="font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">{row.now}</span></td>
                    <td className="px-3 py-2.5 text-slate-600">{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 italic">Remaining 18 line items unaffected — zone state preserved.</p>
        </div>

        {/* SLA Impact */}
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
          <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-2"><Clock className="w-4 h-4"/> SLA Impact</h4>
          <div className="space-y-1.5 text-xs text-amber-900">
            <p>Downstream SLA clocks <strong>PAUSED</strong> for affected items.</p>
            <p>Original SLA deadline: <span className="font-mono">Nov 18</span> → Clock stopped at <span className="font-mono font-bold">3d 14h remaining</span></p>
            <p>SLA will resume upon re-preflight pass.</p>
          </div>
        </div>

        {/* Regression-Specific Actions */}
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Regression-Specific Actions</h4>
          <div className="space-y-2">
            <button className="w-full bg-rose-600 text-white text-xs font-bold py-2.5 rounded hover:bg-rose-700 transition-colors">Notify Request Owner — Re-Validation Required</button>
            <button className="w-full bg-white border border-slate-300 text-slate-700 text-xs font-bold py-2.5 rounded hover:bg-slate-50 transition-colors">View Updated P6 Schedule Data</button>
            <button className="w-full bg-white border border-slate-300 text-slate-700 text-xs font-bold py-2.5 rounded hover:bg-slate-50 transition-colors">Escalate to Operations Director</button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">View Preserved Zone 7 Artifacts <ArrowRight className="w-3 h-3"/></button>
            <span className="text-[10px] text-slate-400 italic">— Original request pack preserved with 'superseded' status for audit trail.</span>
          </div>
        </div>

        {/* Regression Analytics */}
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2"><Database className="w-4 h-4 text-indigo-500"/> Regression Analytics</h4>
          <div className="space-y-1.5 text-xs text-slate-600">
            <p>This is the <strong>3rd regression event</strong> for Data Center TX.</p>
            <p>Enterprise regression frequency (trailing 90 days): <strong>12 events</strong></p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="bg-slate-50 border border-slate-200 rounded p-2.5 text-center">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Schedule Volatility</div>
              <div className="text-lg font-bold font-mono text-slate-800">58%</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-2.5 text-center">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Design Instability</div>
              <div className="text-lg font-bold font-mono text-slate-800">25%</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-2.5 text-center">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Client Changes</div>
              <div className="text-lg font-bold font-mono text-slate-800">17%</div>
            </div>
          </div>
          <p className="text-[11px] italic text-slate-400 mt-3">This data feeds Zone 9 flywheel for systemic intervention analysis.</p>
        </div>
      </div>
    </div>
  );
};

const CircularProgress = ({ value, size = 56, color = 'text-amber-500' }) => {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" strokeWidth="4" className="text-slate-200" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" className={color} />
      </svg>
      <span className="absolute text-xs font-bold font-mono text-slate-800">{value}%</span>
    </div>
  );
};

const MockClarityScoring = () => {
  const [expandedRow, setExpandedRow] = useState(0);
  const lineItems = [
    { item: 'Tower Crane 60T', qty: { score: 100, label: '✓ Confirmed' }, tax: { score: 30, label: '✗ Missing load chart' }, sched: { score: 50, label: '~ Partial' }, clarity: 60, confidence: 45, rationale: 'Confirmed per structural package' },
    { item: 'Generator 200kW', qty: { score: 100, label: '✓ Confirmed' }, tax: { score: 100, label: '✓ Full Spec' }, sched: { score: 100, label: '✓ P6 Linked' }, clarity: 100, confidence: 92, rationale: 'Complete — ready for sourcing' },
    { item: 'Boom Lift 80ft', qty: { score: 80, label: '? Estimated' }, tax: { score: 100, label: '✓ Full Spec' }, sched: { score: 70, label: '~ Partial' }, clarity: 83, confidence: 68, rationale: 'Qty depends on floor count finalization' },
    { item: 'Switchgear 480V', qty: { score: 100, label: '✓ Confirmed' }, tax: { score: 20, label: '✗ Missing load chart' }, sched: { score: 30, label: '~ Partial' }, clarity: 33, confidence: 25, rationale: 'Waiting on client MEP decision' },
    { item: 'Light Tower 4kW', qty: { score: 100, label: '✓ Confirmed' }, tax: { score: 100, label: '✓ Full Spec' }, sched: { score: 100, label: '✓ P6 Linked' }, clarity: 100, confidence: 88, rationale: 'Standard item — template-sourced' },
    { item: 'Telehandler 10K', qty: { score: 60, label: '? Estimated' }, tax: { score: 80, label: '✓ Full Spec' }, sched: { score: 40, label: '~ Partial' }, clarity: 55, confidence: 40, rationale: 'Pending site logistics plan' },
  ];
  const dimBar = (score) => {
    const color = score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500';
    return <div className="w-16 bg-slate-200 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${color}`} style={{ width: `${score}%` }} /></div>;
  };
  const compositeColor = (v) => v >= 80 ? 'text-emerald-600' : v >= 50 ? 'text-amber-600' : 'text-rose-600';
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Toolbar
        leftArea={<><Gauge className="w-4 h-4 text-indigo-500"/><span className="font-bold text-slate-800">Clarity & Confidence Assessment</span><span className="text-slate-400">|</span><span className="text-slate-600">Data Center TX</span><span className="text-slate-400">|</span><span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Zone 5</span></>}
        rightArea={<button className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-indigo-700"><RefreshCw className="w-3 h-3"/> Recalculate Scores</button>}
      />
      <div className="px-6 py-2 bg-white border-b border-slate-200 shrink-0">
        <p className="text-xs text-slate-500 italic">Scores are computed from field completeness and supplemented with user-provided assessment and rationale.</p>
      </div>
      <div className="p-6 overflow-auto flex flex-col gap-5">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-3 rounded-md shadow-sm flex items-center gap-3">
            <CircularProgress value={68} color="text-amber-500" />
            <div><div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Overall Clarity</div><div className="text-sm font-bold text-slate-800">68%</div></div>
          </div>
          <div className="bg-white border border-slate-200 p-3 rounded-md shadow-sm flex items-center gap-3">
            <CircularProgress value={54} color="text-amber-500" />
            <div><div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Overall Confidence</div><div className="text-sm font-bold text-slate-800">54%</div></div>
          </div>
          <KPI label="Lines at Full Clarity" value="8 / 22" />
          <div className="bg-white border border-slate-200 p-3 rounded-md shadow-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Calibration</div>
            <Badge variant="yellow">Rule-Based (Low Sample)</Badge>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 font-semibold w-6"></th>
                  <th className="px-3 py-2 font-semibold">Line Item</th>
                  <th className="px-3 py-2 font-semibold">Quantity</th>
                  <th className="px-3 py-2 font-semibold">Taxonomy</th>
                  <th className="px-3 py-2 font-semibold">Schedule</th>
                  <th className="px-3 py-2 font-semibold text-center">Clarity</th>
                  <th className="px-3 py-2 font-semibold text-center">Confidence</th>
                  <th className="px-3 py-2 font-semibold">User Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {lineItems.map((row, i) => (
                  <React.Fragment key={i}>
                    <tr className={`hover:bg-slate-50 transition-colors cursor-pointer ${expandedRow === i ? 'bg-slate-50' : ''}`} onClick={() => setExpandedRow(expandedRow === i ? -1 : i)}>
                      <td className="px-3 py-2.5 text-slate-400"><ChevronRight className={`w-3.5 h-3.5 transition-transform ${expandedRow === i ? 'rotate-90 text-indigo-500' : ''}`} /></td>
                      <td className="px-3 py-2.5 text-slate-800 font-medium">{row.item}</td>
                      <td className="px-3 py-2.5"><div className="flex items-center gap-1.5">{dimBar(row.qty.score)}<span className="text-[9px] text-slate-500 whitespace-nowrap">{row.qty.label}</span></div></td>
                      <td className="px-3 py-2.5"><div className="flex items-center gap-1.5">{dimBar(row.tax.score)}<span className="text-[9px] text-slate-500 whitespace-nowrap">{row.tax.label}</span></div></td>
                      <td className="px-3 py-2.5"><div className="flex items-center gap-1.5">{dimBar(row.sched.score)}<span className="text-[9px] text-slate-500 whitespace-nowrap">{row.sched.label}</span></div></td>
                      <td className="px-3 py-2.5 text-center"><span className={`font-mono font-bold ${compositeColor(row.clarity)}`}>{row.clarity}%</span></td>
                      <td className="px-3 py-2.5 text-center"><span className={`font-mono font-bold ${compositeColor(row.confidence)}`}>{row.confidence}%</span></td>
                      <td className="px-3 py-2.5 text-slate-500 max-w-[180px] truncate">{row.rationale}</td>
                    </tr>
                    {expandedRow === i && i === 0 && (
                      <tr className="bg-indigo-50/30">
                        <td colSpan={8} className="p-4">
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="bg-white border border-emerald-200 rounded-md p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Quantity</span>
                                <span className="font-mono font-bold text-emerald-600 text-sm">100%</span>
                              </div>
                              <Badge variant="blue">System-computed</Badge>
                              <p className="text-xs text-slate-600 mt-2">1 unit confirmed in V0 baseline.</p>
                            </div>
                            <div className="bg-white border border-rose-200 rounded-md p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Taxonomy</span>
                                <span className="font-mono font-bold text-rose-600 text-sm">30%</span>
                              </div>
                              <Badge variant="yellow">User-assessed</Badge>
                              <p className="text-xs text-slate-600 mt-2">Structural package under revision. Load chart unavailable until Rev 5.</p>
                              <textarea readOnly defaultValue="Structural package under revision. Load chart unavailable until Rev 5." className="mt-2 w-full text-[10px] border border-slate-200 rounded p-2 bg-slate-50 text-slate-600 resize-none h-12" />
                            </div>
                            <div className="bg-white border border-amber-200 rounded-md p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Schedule</span>
                                <span className="font-mono font-bold text-amber-600 text-sm">50%</span>
                              </div>
                              <Badge variant="yellow">User-assessed</Badge>
                              <p className="text-xs text-slate-600 mt-2">Structural milestone dependent on foundation permit — expected mid-November.</p>
                              <textarea readOnly defaultValue="Structural milestone dependent on foundation permit — expected mid-November." className="mt-2 w-full text-[10px] border border-slate-200 rounded p-2 bg-slate-50 text-slate-600 resize-none h-12" />
                            </div>
                          </div>
                          <div className="bg-white border border-slate-200 rounded p-3 flex items-center justify-between">
                            <div className="text-xs text-slate-700"><span className="font-semibold">Combined clarity: </span><span className="font-mono font-bold text-amber-600">60%</span><span className="mx-2 text-slate-300">|</span><span className="font-semibold">Confidence: </span><span className="font-mono font-bold text-amber-600">45%</span></div>
                            <div className="text-[10px] text-slate-400 italic max-w-sm text-right">System-computed score based on field completeness: 40%. User has assessed higher (60%) with rationale. Both scores stored for flywheel calibration.</div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-3 shadow-sm">
          <p className="text-[11px] italic text-slate-400 text-center">Confidence scores derived from limited data are marked with calibration indicators. As Zone 9 actuals accumulate, scoring transitions from rule-based to data-driven.</p>
        </div>
      </div>
    </div>
  );
};

const MockCostOfDelay = ({ persona = 'project-teams' }) => {
  const isOps = persona === 'o2s-ops';
  const clarityDims = [
    { label: 'Quantity / Count', status: 'pass', detail: 'Confirmed: 1 unit', rationale: 'Per structural package Rev 4' },
    { label: 'Full Taxonomy (Specification)', status: 'fail', detail: 'Missing: Load chart & radius requirements', rationale: 'Last requested: 3 days ago' },
    { label: 'Schedule', status: 'warn', detail: 'Partial: Structural completion TBD', rationale: 'Per P6 update pending' },
  ];
  const confirmed = clarityDims.filter(d => d.status === 'pass').length;
  const statusIcon = (s) => {
    if (s === 'pass') return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (s === 'warn') return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    return <X className="w-5 h-5 text-rose-500" />;
  };
  const statusBorder = (s) => s === 'pass' ? 'border-emerald-200 bg-emerald-50/50' : s === 'warn' ? 'border-amber-200 bg-amber-50/50' : 'border-rose-200 bg-rose-50/50';
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Toolbar
        leftArea={<><Eye className="w-4 h-4 text-indigo-500"/><span className="font-bold text-slate-800">Duality View: Tower Crane Sourcing</span><span className="text-slate-400">|</span><span className="text-slate-600">Data Center TX</span></>}
        rightArea={<span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">Zone 5 — Intent Refinement</span>}
      />
      <div className="px-6 py-2 bg-white border-b border-slate-200 shrink-0">
        <p className="text-xs text-slate-500 italic">This view shows the financial impact of the current clarity state on fulfillment options.</p>
      </div>
      <div className="p-6 overflow-auto flex flex-col gap-6">
        {/* Clarity Status Dashboard */}
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Clarity Status</h3>
          <div className="grid grid-cols-3 gap-4 mb-3">
            {clarityDims.map((dim, i) => (
              <div key={i} className={`border rounded-md p-3 ${statusBorder(dim.status)}`}>
                <div className="flex items-center gap-2 mb-1.5">
                  {statusIcon(dim.status)}
                  <span className="text-xs font-bold text-slate-800">{dim.label}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{dim.detail}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{dim.rationale}</p>
              </div>
            ))}
          </div>
          <div className="bg-white border border-slate-200 rounded-md p-3 flex items-center justify-between shadow-sm">
            <span className="text-xs font-semibold text-slate-700">Overall Clarity Score</span>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-slate-200 rounded-full h-2.5">
                <div className="h-2.5 rounded-full bg-amber-500" style={{ width: '33%' }} />
              </div>
              <span className="text-sm font-bold font-mono text-amber-600">33%</span>
              <span className="text-[10px] text-slate-400">{confirmed} of {clarityDims.length} dimensions confirmed</span>
            </div>
          </div>
        </div>

        {/* Two-Column Comparison */}
        <div className="grid grid-cols-2 gap-5">
          {/* Happy Path */}
          <div className="border-2 border-emerald-300 rounded-xl overflow-hidden">
            <div className="bg-emerald-500 text-white p-3">
              <h4 className="font-bold text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Happy Path</h4>
              <p className="text-[10px] opacity-80 mt-0.5">If project team provides specifications within 5 business days</p>
            </div>
            <div className="p-4 space-y-3 bg-white">
              {[
                ['Cost', '$175,000', 'MSA rate from preferred vendor'],
                ['Lead Time', '8 weeks', 'Arrives 3 weeks before structural milestone'],
                ['Source', 'Internal owned fleet', 'Unit available in adjacent region'],
                ['Risk', 'Low', 'Confirmed specifications enable precise matching'],
              ].map(([label, value, note], i) => (
                <div key={i} className="flex justify-between items-start text-xs border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                  <span className="text-slate-500 font-semibold w-20 shrink-0">{label}</span>
                  <div className="text-right"><div className="font-mono font-bold text-slate-800">{value}</div><div className="text-[10px] text-slate-400">{note}</div></div>
                </div>
              ))}
              <div className="bg-emerald-50 border border-emerald-200 rounded p-2.5 text-center">
                <span className="text-xs font-bold text-emerald-700">Saves $47,000 vs. constrained path</span>
              </div>
            </div>
          </div>

          {/* Constrained Path */}
          <div className="border-2 border-rose-300 rounded-xl overflow-hidden">
            <div className="bg-rose-500 text-white p-3">
              <h4 className="font-bold text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Constrained Path</h4>
              <p className="text-[10px] opacity-80 mt-0.5">If clarity window closes without specifications</p>
            </div>
            <div className="p-4 space-y-3 bg-white">
              {[
                ['Cost', '$222,000', 'Spot market rate + expedite premium'],
                ['Lead Time', '4 weeks', 'Higher risk of mismatch requiring remobilization'],
                ['Source', 'Spot market', 'Best available from 3rd party vendor'],
                ['Risk', 'High', 'Unconfirmed specs may require swap + additional mobilization'],
              ].map(([label, value, note], i) => (
                <div key={i} className="flex justify-between items-start text-xs border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                  <span className="text-slate-500 font-semibold w-20 shrink-0">{label}</span>
                  <div className="text-right"><div className="font-mono font-bold text-slate-800">{value}</div><div className="text-[10px] text-slate-400">{note}</div></div>
                </div>
              ))}
              <div className="bg-rose-50 border border-rose-200 rounded p-2.5 text-center">
                <span className="text-xs font-bold text-rose-700">+$47,000 premium cost absorbed by O2S</span>
              </div>
              {isOps && (
                <div className="border-t border-slate-200 pt-3 mt-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">O2S Operations Prep Actions</div>
                  <div className="space-y-2">
                    <button className="w-full bg-indigo-600 text-white text-xs font-bold py-2 rounded hover:bg-indigo-700 transition-colors">Pre-position sourcing with baseline specs</button>
                    <button className="w-full bg-white border border-slate-300 text-slate-700 text-xs font-bold py-2 rounded hover:bg-slate-50 transition-colors">Alert regional fleet manager of potential demand</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Historical Evidence */}
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2"><Database className="w-4 h-4 text-indigo-500"/> Historical Evidence</h4>
          <p className="text-sm text-slate-700 mb-2">Across 23 similar tower crane procurements in the last 18 months:</p>
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-center">
              <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Happy Path Avg</div>
              <div className="text-lg font-bold font-mono text-emerald-700">$168K</div>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded p-3 text-center">
              <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Constrained Path Avg</div>
              <div className="text-lg font-bold font-mono text-rose-700">$231K</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded p-3 text-center">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avg Premium</div>
              <div className="text-lg font-bold font-mono text-slate-800">37%</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[11px] italic text-slate-400">This evidence is sourced from the Zone 9 flywheel.</p>
            <Badge variant="green">Sample size: 23 — High Confidence</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

const MockLearningFlywheel = () => {
  const varianceData = [
    { item: 'Switchgear 480V', leadAssumed: '12 wks', leadActual: '16 wks', leadVar: '+4 wks', leadColor: 'text-rose-600', costAssumed: '$42K', costActual: '$51K', costVar: '+21%', costColor: 'text-rose-600', cause: 'Supply chain delay' },
    { item: 'Tower Crane 60T', leadAssumed: '8 wks', leadActual: '7 wks', leadVar: '-1 wk', leadColor: 'text-emerald-600', costAssumed: '$180K', costActual: '$175K', costVar: '-3%', costColor: 'text-emerald-600', cause: 'Early sourcing' },
    { item: 'Boom Lift 80ft', leadAssumed: '2 wks', leadActual: '2 wks', leadVar: '0', leadColor: 'text-slate-400', costAssumed: '$4.8K', costActual: '$6.2K', costVar: '+29%', costColor: 'text-rose-600', cause: 'Spot market premium' },
  ];
  const writebacks = [
    { change: 'Switchgear 480V default lead time: 12 weeks → 15 weeks', evidence: 'Based on 8 project actuals, median lead time is 15.2 weeks (σ = 1.4 weeks)', confidence: 'High confidence — 8 samples', confVariant: 'green' },
    { change: 'Boom Lift 80ft re-rent rate: $4,800/mo → $5,600/mo', evidence: 'Based on 6 project actuals, median spot rate is $5,540/mo (σ = $420)', confidence: 'High confidence — 6 samples', confVariant: 'green' },
    { change: 'Generator 200kW mobilization buffer: 1 week → 2 weeks', evidence: 'Based on 2 project actuals, both showed 2-week mobilization', confidence: 'Low confidence — 2 samples', confVariant: 'yellow' },
  ];
  const FlywheelArrow = () => <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />;
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Toolbar
        leftArea={<><GitBranch className="w-4 h-4 text-rose-500"/><span className="font-bold text-slate-800">Zone 9: Learning Flywheel</span><span className="text-slate-400">|</span><span className="text-slate-600">Feedback cycle: Q3 FY26</span></>}
        rightArea={<button className="flex items-center gap-2 bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-slate-700"><Download className="w-3 h-3"/> Export Flywheel Report</button>}
      />
      <div className="p-6 overflow-auto flex flex-col gap-6">
        {/* Flywheel Diagram */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 text-center">Closed-Loop Feedback Cycle</h4>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="bg-emerald-100 border border-emerald-300 rounded-lg px-4 py-3 text-center shrink-0">
              <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Zone 4</div>
              <div className="text-xs font-bold text-emerald-800 mt-0.5">Assumptions</div>
            </div>
            <FlywheelArrow />
            <div className="bg-rose-100 border border-rose-300 rounded-lg px-4 py-3 text-center shrink-0">
              <div className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Zone 8</div>
              <div className="text-xs font-bold text-rose-800 mt-0.5">Actuals</div>
            </div>
            <FlywheelArrow />
            <div className="bg-indigo-100 border border-indigo-300 rounded-lg px-4 py-3 text-center shrink-0">
              <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Analysis</div>
              <div className="text-xs font-bold text-indigo-800 mt-0.5">Variance</div>
            </div>
            <FlywheelArrow />
            <div className="bg-amber-100 border border-amber-300 rounded-lg px-4 py-3 text-center shrink-0">
              <div className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Writeback</div>
              <div className="text-xs font-bold text-amber-800 mt-0.5">Templates</div>
            </div>
            <FlywheelArrow />
            <div className="bg-emerald-500 text-white rounded-lg px-4 py-3 text-center shrink-0 shadow-md ring-2 ring-emerald-200">
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">Zone 4</div>
              <div className="text-xs font-bold mt-0.5">Next Project</div>
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 italic">
              <RotateCcw className="w-3 h-3" /> Every project completion sharpens the next project's starting point
            </div>
          </div>
        </div>

        {/* Variance Analysis */}
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-indigo-500"/> Variance Analysis</h3>
          <div className="overflow-x-auto border border-slate-200 rounded-md bg-white">
            <table className="w-full text-left text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 font-semibold">Item Category</th>
                  <th className="px-3 py-2 font-semibold text-right">Z4 Lead Time</th>
                  <th className="px-3 py-2 font-semibold text-right">Z8 Lead Time</th>
                  <th className="px-3 py-2 font-semibold text-right">Variance</th>
                  <th className="px-3 py-2 font-semibold text-right">Z4 Cost</th>
                  <th className="px-3 py-2 font-semibold text-right">Z8 Cost</th>
                  <th className="px-3 py-2 font-semibold text-right">Cost Var</th>
                  <th className="px-3 py-2 font-semibold">Cause Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {varianceData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 py-2.5 text-slate-800 font-medium">{row.item}</td>
                    <td className="px-3 py-2.5 text-slate-500 font-mono text-right">{row.leadAssumed}</td>
                    <td className="px-3 py-2.5 text-slate-700 font-mono text-right font-semibold">{row.leadActual}</td>
                    <td className={`px-3 py-2.5 font-mono text-right font-bold ${row.leadColor}`}>{row.leadVar}</td>
                    <td className="px-3 py-2.5 text-slate-500 font-mono text-right">{row.costAssumed}</td>
                    <td className="px-3 py-2.5 text-slate-700 font-mono text-right font-semibold">{row.costActual}</td>
                    <td className={`px-3 py-2.5 font-mono text-right font-bold ${row.costColor}`}>{row.costVar}</td>
                    <td className="px-3 py-2.5 text-slate-600">{row.cause}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Template Writeback Recommendations */}
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500"/> Template Writeback Recommendations</h3>
          <div className="space-y-3">
            {writebacks.map((wb, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow">
                    <p className="text-sm font-semibold text-slate-800">{wb.change}</p>
                    <p className="text-xs text-slate-500 mt-1">{wb.evidence}</p>
                    <div className="mt-2"><Badge variant={wb.confVariant}>{wb.confidence}</Badge></div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-emerald-700 transition-colors">Approve Writeback</button>
                    <button className="bg-white border border-slate-300 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded hover:bg-slate-50 transition-colors">Reject with Rationale</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] italic text-slate-400 mt-3">Writebacks produce recommendations for template owner review — not automatic overwrites.</p>
        </div>

        {/* Happy Path vs Constrained Path */}
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Happy Path vs. Constrained Path Outcomes</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5"/> Happy Path</div>
              <p className="text-sm text-emerald-900 leading-relaxed"><strong>14 items</strong> sourced with early clarity. Avg cost savings: <strong>18%</strong>. Avg lead time buffer: <strong>+3.2 weeks</strong>.</p>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
              <div className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mb-2 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5"/> Constrained Path</div>
              <p className="text-sm text-rose-900 leading-relaxed"><strong>8 items</strong> sourced under constraint. Avg cost premium: <strong>34%</strong>. <strong>3 schedule delays</strong> attributed to late clarity.</p>
            </div>
          </div>
          <p className="text-[11px] italic text-slate-400 mt-3 text-center">Every completed project builds the evidence that makes the clarity signal harder to ignore.</p>
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
  costofdelay: { title: 'Cost of Delay Visibility', description: 'See the financial impact of providing or withholding clarity on each equipment need.', icon: Eye, colorClass: 'border-emerald-200 ring-2 ring-emerald-50', highlight: 'bg-emerald-500 text-white' },
  clarityscoring: { title: 'Clarity & Confidence Scoring', description: 'Assess and track how complete and confident each equipment need is across quantity, specification, and schedule.', icon: Gauge, colorClass: 'border-emerald-200', highlight: 'bg-emerald-100 text-emerald-600' },
  forecast: { title: 'Asset Demand Forecast', description: 'Generate a probability-weighted demand forecast by asset class spanning early pipeline through execution readiness.', icon: BarChart, colorClass: 'border-indigo-200 ring-2 ring-indigo-50', highlight: 'bg-indigo-500 text-white' },
  fitscore: { title: 'Fit Score & Opportunity Correlation', description: 'Evaluate FP&A committed forecast against equipment capabilities. Surface recommended engagement strategies before designs lock.', icon: Crosshair, colorClass: 'border-indigo-200', highlight: 'bg-indigo-100 text-indigo-600' },
  projectmaturity: { title: 'Project Maturity & Zone Distribution', description: 'See where every package sits in the zone lifecycle. Identify trailing edges and blocked items.', icon: ClipboardList, colorClass: 'border-emerald-200', highlight: 'bg-emerald-100 text-emerald-600' },
  regression: { title: 'Regression Events', description: 'When gate conditions become false, the system re-evaluates zone state and fires regression-specific triggers.', icon: AlertTriangle, colorClass: 'border-rose-200', highlight: 'bg-rose-100 text-rose-600' },
  'prepop-ops': { title: 'Pre-Population & Constraint Alerts', description: 'Pre-populate project-level equipment requests using demand forecasts, schedules, and historical patterns.', icon: Layers, colorClass: 'border-emerald-100', highlight: 'bg-emerald-100 text-emerald-600', resolveId: 'prepop' },
  optimize: { title: 'Owned vs Re-Rent Optimizer', description: 'Use enterprise-wide owned fleet visibility to recommend whether each request should be fulfilled with owned equipment or re-rent.', icon: Search, colorClass: 'border-amber-200 ring-2 ring-amber-50', highlight: 'bg-amber-500 text-white' },
  source: { title: 'Strategic Sourcing', description: 'Enable O2S to source from the right vendors at the right time using demand signals and supplier performance.', icon: Box, colorClass: 'border-amber-100', highlight: 'bg-amber-100 text-amber-600' },
  preflight: { title: 'Preflight Validation', description: 'Validate request packs against taxonomy, date feasibility, specifications, and sourcing paths before formal submission.', icon: FileCheck, colorClass: 'border-amber-200', highlight: 'bg-amber-100 text-amber-600' },
  formalrequest: { title: 'Formal Request & Handoff', description: 'Submit validated request packs with full lineage traceability and SLA-tracked routing to fulfillment teams.', icon: Send, colorClass: 'border-amber-100', highlight: 'bg-amber-100 text-amber-600' },
  lifecycle: { title: 'Asset Lifecycle Engine', description: 'Create a unified asset lifecycle view and support better keep / overhaul / redeploy / replace decisions.', icon: RotateCcw, colorClass: 'border-slate-300', highlight: 'bg-slate-200 text-slate-700' },
  capex: { title: 'CapEx Plan', description: 'Translate forward demand and available fleet supply into a prioritized, timing-specific CAPEX plan.', icon: Activity, colorClass: 'border-slate-300', highlight: 'bg-slate-200 text-slate-700' },
  margin: { title: 'Margin Plan', description: 'Define project-level O2S margin pre-go/no-go by pillar and product line, anchored to AOP targets.', icon: Target, colorClass: 'border-indigo-100', highlight: 'bg-indigo-100 text-indigo-600' },
  fpa: { title: 'FP&A Sync', description: 'Risk-adjusted, time-phased revenue and margin forecasts synced to FP&A tools like Anaplan.', icon: DollarSign, colorClass: 'border-emerald-200 ring-2 ring-emerald-50', highlight: 'bg-emerald-500 text-white' },
  execution: { title: 'Execution Dashboard', description: 'Track active deployments, monitor utilization, flag exceptions, and take self-serve actions on in-process equipment orders.', icon: Truck, colorClass: 'border-rose-200', highlight: 'bg-rose-100 text-rose-600' },
  vendorscorecard: { title: 'Vendor Performance Scorecard', description: 'Auto-compiled vendor scorecards from execution actuals covering delivery, billing accuracy, and safety.', icon: Star, colorClass: 'border-rose-100', highlight: 'bg-rose-100 text-rose-600' },
  flywheel: { title: 'Learning Flywheel', description: 'Capture actuals vs assumptions, analyze variance, and write back calibrated defaults to upstream templates.', icon: GitBranch, colorClass: 'border-rose-200 ring-2 ring-rose-50', highlight: 'bg-rose-500 text-white' },
  anomaly: { title: 'Billing Anomaly Detection', description: 'Detect and flag billing anomalies using project-level patterns before invoice posting.', icon: DollarSign, colorClass: 'border-rose-200 ring-2 ring-rose-50', highlight: 'bg-rose-500 text-white' },
};

const PERSONA_EQUIPMENT_GRID = {
  'project-teams': {
    'z1-3': { cards: ['quotes'], placeholders: [] },
    'z4-5': { cards: ['prepop', 'adhoc', 'costofdelay', 'clarityscoring', 'projectmaturity'], placeholders: [] },
    'z6-7': { cards: ['preflight'], placeholders: [] },
    'z8-9': { cards: ['execution'], placeholders: [] },
  },
  'o2s-ops': {
    'z1-3': { cards: ['forecast', 'fitscore'], placeholders: [] },
    'z4-5': { cards: ['prepop-ops', 'costofdelay', 'clarityscoring', 'projectmaturity'], placeholders: [] },
    'z6-7': { cards: ['optimize', 'source', 'formalrequest', 'regression'], placeholders: [] },
    'z8-9': { cards: ['execution', 'vendorscorecard', 'flywheel'], placeholders: [] },
  },
  'leadership': {
    'z1-3': { cards: ['fitscore'], placeholders: [] },
    'z4-5': { cards: ['projectmaturity'], placeholders: [] },
    'z6-7': { cards: ['lifecycle', 'regression'], placeholders: [] },
    'z8-9': { cards: ['capex', 'flywheel'], placeholders: [] },
  },
  'finance': {
    'z1-3': { cards: ['margin', 'fpa'], placeholders: [] },
    'z4-5': { cards: ['clarityscoring'], placeholders: [] },
    'z6-7': { cards: [], placeholders: ['Request Cost Validation — Coming in Prompt 8'] },
    'z8-9': { cards: ['anomaly', 'flywheel'], placeholders: [] },
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
  const [triggerPanelOpen, setTriggerPanelOpen] = useState(false);
  const [triggerFilter, setTriggerFilter] = useState('all');

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
      case 'fitscore': return <MockFitScore />;
      case 'projectmaturity': return <MockProjectMaturity />;
      case 'regression': return <MockRegressionEvent />;
      case 'prepop': case 'prepop-ops': return <MockPrePopulation />;
      case 'costofdelay': return <MockCostOfDelay persona={activePersona} />;
      case 'clarityscoring': return <MockClarityScoring />;
      case 'adhoc': return <MockAdHocIntake />;
      case 'optimize': return <MockOptimizer />;
      case 'source': return <MockStrategicSourcing />;
      case 'preflight': return <MockPreflightValidation />;
      case 'formalrequest': return <MockFormalRequest />;
      case 'execution': return <MockExecutionDashboard />;
      case 'vendorscorecard': return <MockVendorScorecard />;
      case 'flywheel': return <MockLearningFlywheel />;
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

            <div className="flex items-center gap-3">
              {/* Trigger Bell */}
              <button
                onClick={() => setTriggerPanelOpen(!triggerPanelOpen)}
                className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-slate-900">3</span>
              </button>

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

      {/* Trigger Panel */}
      {triggerPanelOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-slate-900/20" onClick={() => setTriggerPanelOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200">
            {/* Header */}
            <div className="bg-slate-900 p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-400" />
                <h2 className="font-bold text-white text-sm">Active Triggers</h2>
                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
              </div>
              <button onClick={() => setTriggerPanelOpen(false)} className="p-1 hover:bg-slate-800 rounded transition-colors"><X className="w-4 h-4 text-slate-400 hover:text-white" /></button>
            </div>

            {/* Filter Bar */}
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex gap-2 shrink-0">
              {[
                { id: 'all', label: 'All', color: 'bg-slate-200 text-slate-700' },
                { id: 'critical', label: 'Critical', color: 'bg-rose-100 text-rose-700 border-rose-200' },
                { id: 'action', label: 'Action Required', color: 'bg-amber-100 text-amber-700 border-amber-200' },
                { id: 'info', label: 'Informational', color: 'bg-slate-100 text-slate-500 border-slate-200' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setTriggerFilter(f.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                    triggerFilter === f.id ? f.color + ' ring-2 ring-offset-1 ring-slate-300' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
                  }`}
                >{f.label}</button>
              ))}
            </div>

            {/* Trigger Cards */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {/* Trigger 1: Critical — Long-Lead */}
              {(triggerFilter === 'all' || triggerFilter === 'critical') && (
                <div className="border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="border-l-4 border-l-rose-500 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-bold text-slate-800">Long-Lead Detected: Switchgear 480V</h4>
                      <Badge variant="red">Critical</Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Zone 4 → Zone 5</span>
                      <span className="text-[10px] text-slate-400">Data Center TX | 2 hours ago</span>
                    </div>
                    <div className="text-xs text-slate-600 mb-3">
                      <span className="font-semibold text-slate-700">What happened:</span> V0 baseline includes switchgear with 16-week lead time. Current schedule shows 10-week window.
                    </div>

                    {activePersona === 'project-teams' ? (
                      /* Project Teams see clarity demand */
                      <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                        <div className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5"/> Specifications Required</div>
                        <p className="text-xs text-amber-900 mb-3">Final specifications for Switchgear 480V are needed to unlock sourcing. Each week of delay increases projected cost by <strong>$4,200</strong>.</p>
                        <button className="w-full bg-indigo-600 text-white text-xs font-bold py-2 rounded hover:bg-indigo-700 transition-colors">Provide Specifications →</button>
                      </div>
                    ) : (
                      /* All other personas see ops version */
                      <>
                        <div className="text-xs text-slate-600 mb-2">
                          <span className="font-semibold text-slate-700">Clarity Status:</span> <span className="text-rose-600 font-semibold">❌ Project team has NOT provided final specifications</span>
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Constrained Path Actions</div>
                        <div className="space-y-2 mb-3">
                          <button className="w-full bg-indigo-600 text-white text-xs font-bold py-2 rounded hover:bg-indigo-700 transition-colors flex flex-col items-center">
                            <span>Send Clarity Demand to Project Team</span>
                            <span className="text-[9px] font-normal opacity-70 mt-0.5">Includes deadline + cost-of-delay summary</span>
                          </button>
                          <button className="w-full bg-white border border-slate-300 text-slate-700 text-xs font-bold py-2 rounded hover:bg-slate-50 transition-colors">Begin Constrained Sourcing with Baseline Specs</button>
                          <button className="w-full bg-white border border-slate-300 text-slate-700 text-xs font-bold py-2 rounded hover:bg-slate-50 transition-colors">Escalate to Ops Director with Risk Summary</button>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded p-2.5 text-xs text-amber-800">
                          <span className="font-bold">Cost of delay:</span> Each week increases projected cost by $4,200 based on historical spot-market premium for this asset class.
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Trigger 2: Action Required — Underutilized Asset */}
              {(triggerFilter === 'all' || triggerFilter === 'action') && (
                <div className="border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="border-l-4 border-l-amber-500 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-bold text-slate-800">Underutilized Asset: Crawler Crane CRN-0092</h4>
                      <Badge variant="yellow">Action Required</Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Zone 8</span>
                      <span className="text-[10px] text-slate-400">Detected via telematics | 6 hours ago</span>
                    </div>
                    <div className="text-xs text-slate-600 mb-2">
                      <span className="font-semibold text-slate-700">What happened:</span> Telematics show 12% utilization over 14 days. Daily cost: $2,800.
                    </div>
                    <div className="text-xs text-slate-600 mb-3">
                      <span className="font-semibold text-emerald-700">Redeployment Match Found:</span> Project Healthcare Facility C (AZ) has open demand for same crane class.
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Happy Path Actions</div>
                    <div className="space-y-2">
                      <button className="w-full bg-emerald-600 text-white text-xs font-bold py-2 rounded hover:bg-emerald-700 transition-colors flex flex-col items-center">
                        <span>Initiate Cross-Regional Transfer</span>
                        <span className="text-[9px] font-normal opacity-70 mt-0.5">Transfer cost $18K vs rental savings $67K</span>
                      </button>
                      <button className="w-full bg-white border border-slate-300 text-slate-700 text-xs font-bold py-2 rounded hover:bg-slate-50 transition-colors">Extend Current Deployment with Justification</button>
                      <button className="w-full bg-white border border-slate-300 text-slate-700 text-xs font-bold py-2 rounded hover:bg-slate-50 transition-colors">Begin Off-Rent Process</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Trigger 3: Informational — Preflight Passed */}
              {(triggerFilter === 'all' || triggerFilter === 'info') && (
                <div className="border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="border-l-4 border-l-slate-300 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-bold text-slate-800">Preflight Passed: REQ-2024-0847</h4>
                      <Badge variant="gray">Info</Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Zone 6 → Zone 7</span>
                      <span className="text-[10px] text-slate-400">1 hour ago</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-3">22 line items validated. Ready for formal submission.</p>
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">View Request Pack <ArrowRight className="w-3 h-3"/></button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 shrink-0">
              <p className="text-[11px] text-slate-400 italic leading-relaxed text-center">
                Triggers serve two audiences simultaneously. O2S Operations sees action options. Project Teams see clarity demands with downstream cost consequences.
              </p>
            </div>
          </div>
        </>
      )}

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