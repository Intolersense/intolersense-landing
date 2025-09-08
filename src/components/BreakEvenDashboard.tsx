import React, { useMemo, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip } from "recharts";

// Population presets
const POPULATIONS = {
  // Combined Regions
  "North America + Europe": 1_252_900_000,
  
  // Continental Regions
  "North America": 502_900_000,
  "Europe": 750_000_000,
  "EU-27": 450_400_000,
  
  // Key Individual Countries
  "US": 334_900_000,
  "UK": 67_700_000,
  "Germany": 84_400_000,
};

// Scenario presets (based on ranges used in Monte Carlo; no tele, no Spec/ED components)
const SCENARIOS = {
  Low: {
    hsShare: 0.05, // 5% of population with food hypersensitivities
    seekCare: 0.30,
    adoption: 0.10,
    responseRate: 0.40,
    gpAvoided: 0.5,
    daysSaved: 1.0,
    platformCost: 30,
    unitGP: 40,
    valuePerDay: 120,
  },
  Medium: {
    hsShare: 0.20, // base at 20%
    seekCare: 0.40,
    adoption: 0.30,
    responseRate: 0.55,
    gpAvoided: 0.8,
    daysSaved: 2.0,
    platformCost: 20,
    unitGP: 50,
    valuePerDay: 180,
  },
  Best: {
    hsShare: 0.25, // 25%
    seekCare: 0.60,
    adoption: 0.50,
    responseRate: 0.70,
    gpAvoided: 1.5,
    daysSaved: 5.0,
    platformCost: 10,
    unitGP: 60,
    valuePerDay: 268,
  },
};

// Currency conversion rates (EUR as base)
const EXCHANGE_RATES = {
  EUR: 1.0,
  USD: 1.09,
  GBP: 0.84,
};

const CURRENCY_SYMBOLS = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

export default function BreakEvenDashboard() {
  // --- Controls ---
  const [populationKey, setPopulationKey] = useState("EU-27");
  const [scenarioKey, setScenarioKey] = useState("Medium");
  const [currency, setCurrency] = useState("EUR");

  // Core parameters (start with Medium preset)
  const [hsShare, setHsShare] = useState(SCENARIOS.Medium.hsShare); // Food hypersensitivities share (5–25%)
  const [seekCare, setSeekCare] = useState(SCENARIOS.Medium.seekCare);
  const [adoption, setAdoption] = useState(SCENARIOS.Medium.adoption);
  const [responseRate, setResponseRate] = useState(SCENARIOS.Medium.responseRate);
  const [gpAvoided, setGpAvoided] = useState(SCENARIOS.Medium.gpAvoided);
  const [daysSaved, setDaysSaved] = useState(SCENARIOS.Medium.daysSaved);

  // Costs/values
  const [platformCost, setPlatformCost] = useState(SCENARIOS.Medium.platformCost);
  const [unitGP, setUnitGP] = useState(SCENARIOS.Medium.unitGP);
  const [valuePerDay, setValuePerDay] = useState(SCENARIOS.Medium.valuePerDay);

  // Apply scenario preset
  const applyScenario = (key: string) => {
    const s = SCENARIOS[key as keyof typeof SCENARIOS];
    setScenarioKey(key);
    setHsShare(s.hsShare);
    setSeekCare(s.seekCare);
    setAdoption(s.adoption);
    setResponseRate(s.responseRate);
    setGpAvoided(s.gpAvoided);
    setDaysSaved(s.daysSaved);
    setPlatformCost(s.platformCost);
    setUnitGP(s.unitGP);
    setValuePerDay(s.valuePerDay);
  };

  const POP = POPULATIONS[populationKey as keyof typeof POPULATIONS];

  // --- Model (no Specialist or ED components; no tele) ---
  const results = useMemo(() => {
    const popHS = POP * hsShare; // People with food hypersensitivities
    const seekers = popHS * seekCare; // who seek care for symptoms
    const activeUsers = seekers * adoption; // adopt the app
    const responders = activeUsers * responseRate; // improve with app

    // Savings components
    const gpSavings = responders * gpAvoided * unitGP; // fewer GP visits
    const prodSavings = responders * daysSaved * valuePerDay; // productivity (optional in payer view)

    // Program costs (no tele)
    const programCosts = activeUsers * platformCost;

    const totalGross = gpSavings + prodSavings;
    const net = totalGross - programCosts;

    return {
      popHS,
      seekers,
      activeUsers,
      responders,
      gpSavings,
      prodSavings,
      programCosts,
      totalGross,
      net,
      grossPerUser: activeUsers > 0 ? totalGross / activeUsers : 0,
      costPerUser: activeUsers > 0 ? programCosts / activeUsers : 0,
    };
  }, [POP, hsShare, seekCare, adoption, responseRate, gpAvoided, unitGP, daysSaved, valuePerDay, platformCost]);

  // Currency conversion and formatting
  const convertCurrency = (value: number) => value * EXCHANGE_RATES[currency as keyof typeof EXCHANGE_RATES];
  const fmt = (v: number) => {
    const converted = convertCurrency(v || 0);
    return new Intl.NumberFormat("en-GB", { 
      style: "currency", 
      currency: currency, 
      maximumFractionDigits: 0 
    }).format(converted);
  };
  const fmtInt = (n: number) => new Intl.NumberFormat().format(Math.round(n || 0));

  // Adoption sensitivity chart (net savings in millions)
  const sensitivityData = Array.from({ length: 11 }).map((_, i) => {
    const a = i * 0.1; // adoption 0..1
    const popHS = POP * hsShare;
    const seekers = popHS * seekCare;
    const activeUsers = seekers * a;
    const responders = activeUsers * responseRate;
    const gpSavings = responders * gpAvoided * unitGP;
    const prodSavings = responders * daysSaved * valuePerDay;
    const programCosts = activeUsers * platformCost;
    const net = (gpSavings + prodSavings - programCosts) * EXCHANGE_RATES[currency as keyof typeof EXCHANGE_RATES];
    return { adoption: Math.round(a * 100), net: Math.round(net / 1e6) };
  });

  return (
    <div className="p-6 max-w-7xl mx-auto pt-20">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Break-even Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Interactive model. Adjust population, scenario, and parameters to find break-even points.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="col-span-2 bg-white p-4 rounded shadow">
          <div className="flex flex-wrap gap-3 mb-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Population</label>
              <select className="border rounded p-2 text-sm text-gray-900" value={populationKey} onChange={(e)=>setPopulationKey(e.target.value)}>
                {Object.keys(POPULATIONS).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Currency</label>
              <select className="border rounded p-2 text-sm text-gray-900" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                {Object.keys(EXCHANGE_RATES).map(k => <option key={k} value={k}>{k} ({CURRENCY_SYMBOLS[k as keyof typeof CURRENCY_SYMBOLS]})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Scenario preset</label>
              <select className="border rounded p-2 text-sm text-gray-900" value={scenarioKey} onChange={(e)=>applyScenario(e.target.value)}>
                {Object.keys(SCENARIOS).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>

          <h2 className="font-semibold text-gray-900">Key outputs</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="p-3 border rounded">
              <div className="text-xs text-gray-500">Active users (annual)</div>
              <div className="text-xl font-medium text-gray-900">{fmtInt(results.activeUsers)}</div>
            </div>
            <div className="p-3 border rounded">
              <div className="text-xs text-gray-500">Responders (symptom improved)</div>
              <div className="text-xl font-medium text-gray-900">{fmtInt(results.responders)}</div>
            </div>
            <div className="p-3 border rounded">
              <div className="text-xs text-gray-500">Total gross savings (annual)</div>
              <div className="text-xl font-medium text-gray-900">{fmt(results.totalGross)}</div>
            </div>
            <div className="p-3 border rounded">
              <div className="text-xs text-gray-500">Program costs (annual)</div>
              <div className="text-xl font-medium text-gray-900">{fmt(results.programCosts)}</div>
            </div>
            <div className="p-3 border rounded col-span-2">
              <div className="text-xs text-gray-500">Net annual savings</div>
              <div className={`text-2xl font-bold ${results.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>{fmt(results.net)}</div>
              <div className="text-sm text-gray-500">Net per active user: {fmt(results.activeUsers ? results.net / results.activeUsers : 0)}</div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-gray-900">Adoption sensitivity (net savings in {CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS]} millions)</h3>
            <div style={{ height: 220 }} className="mt-2">
              <ResponsiveContainer>
                <BarChart data={sensitivityData}>
                  <XAxis dataKey="adoption" label={{ value: 'Adoption %', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: `Net (${CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS]}M)`, angle: -90, position: 'insideLeft' }} />
                  <RTooltip formatter={(v) => `${v} M${CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS]}`} />
                  <Bar dataKey="net" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <aside className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-gray-900">Model controls</h3>

          <div className="mt-3 space-y-3 text-sm">
            <div>
              <label className="block text-xs text-gray-600">Food hypersensitivity share of population</label>
              <input type="range" min={0.05} max={0.25} step={0.005} value={hsShare} onChange={(e)=>setHsShare(parseFloat(e.target.value))} className="w-full" />
              <div className="text-xs text-gray-700">{(hsShare*100).toFixed(1)}%</div>
            </div>

            <div>
              <label className="block text-xs text-gray-600">Care-seeking rate (among those with symptoms)</label>
              <input type="range" min={0.10} max={0.80} step={0.01} value={seekCare} onChange={(e)=>setSeekCare(parseFloat(e.target.value))} className="w-full" />
              <div className="text-xs text-gray-700">{(seekCare*100).toFixed(0)}%</div>
            </div>

            <div>
              <label className="block text-xs text-gray-600">App adoption (among care-seekers)</label>
              <input type="range" min={0.01} max={0.80} step={0.01} value={adoption} onChange={(e)=>setAdoption(parseFloat(e.target.value))} className="w-full" />
              <div className="text-xs text-gray-700">{(adoption*100).toFixed(0)}%</div>
            </div>

            <div>
              <label className="block text-xs text-gray-600">Response rate (symptom improvement)</label>
              <input type="range" min={0.20} max={0.90} step={0.01} value={responseRate} onChange={(e)=>setResponseRate(parseFloat(e.target.value))} className="w-full" />
              <div className="text-xs text-gray-700">{(responseRate*100).toFixed(0)}%</div>
            </div>

            <div>
              <label className="block text-xs text-gray-600">GP visits avoided per responder (per year)</label>
              <input type="range" min={0} max={3} step={0.1} value={gpAvoided} onChange={(e)=>setGpAvoided(parseFloat(e.target.value))} className="w-full" />
              <div className="text-xs text-gray-700">{gpAvoided.toFixed(1)} visits</div>
            </div>

            <div>
              <label className="block text-xs text-gray-600">Workdays saved per responder (per year)</label>
              <input type="range" min={0} max={7} step={0.1} value={daysSaved} onChange={(e)=>setDaysSaved(parseFloat(e.target.value))} className="w-full" />
              <div className="text-xs text-gray-700">{daysSaved.toFixed(1)} days</div>
            </div>

            <div className="pt-3 border-t">
              <label className="block text-xs text-gray-600">Platform cost per active user ({currency})</label>
              <input type="range" min={5} max={60} step={1} value={platformCost} onChange={(e)=>setPlatformCost(parseFloat(e.target.value))} className="w-full" />
              <div className="text-xs text-gray-700">{CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS]}{Math.round(convertCurrency(platformCost))}/user</div>
            </div>

            <div className="pt-3 border-t">
              <div className="text-xs text-gray-500">Unit costs & value</div>
              <div className="text-xs mt-1 text-gray-700">GP {CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS]}<input className="w-16 inline border p-1 rounded text-gray-900" value={Math.round(convertCurrency(unitGP))} onChange={(e)=>setUnitGP(Number(e.target.value) / EXCHANGE_RATES[currency as keyof typeof EXCHANGE_RATES])} /> &nbsp;Value/day {CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS]}<input className="w-20 inline border p-1 rounded text-gray-900" value={Math.round(convertCurrency(valuePerDay))} onChange={(e)=>setValuePerDay(Number(e.target.value) / EXCHANGE_RATES[currency as keyof typeof EXCHANGE_RATES])} /></div>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-gray-900">Parameters explanation</h3>
        <ul className="list-disc pl-5 text-sm mt-2 space-y-1 text-gray-700">
          <li><strong>Food hypersensitivity share:</strong> percent of population with food-related hypersensitivities. Litrature suggests 5-25%.</li>
          <li><strong>Care-seeking & adoption:</strong> define scale that drives costs/savings through engagement.</li>
          <li><strong>Response, GP visits avoided & days saved:</strong> translate symptom relief into healthcare and productivity savings.</li>
          <li><strong>Platform cost & GP unit cost:</strong> key levers for payer break-even; productivity is optional for payer-only views.</li>
          <li><strong>Removed:</strong> tele-dietitian, specialist, and ED components — excluded per your request.</li>
        </ul>
      </section>

      <footer className="mt-6 text-sm text-gray-500">This dashboard is a planning tool. Use scenario presets (Low/Medium/Best) — derived from 10.000 Monte Carlo simulations — to explore break-even thresholds before piloting.</footer>
    </div>
  );
}
