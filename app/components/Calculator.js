'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

// ─── Statistical Math Helpers ───────────────────────────────────
// Cumulative standard normal distribution N(x) — Abramowitz & Stegun approximation
function normCDF(x) {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.SQRT2;
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1.0 + sign * y);
}

// Standard normal PDF N'(x)
function normPDF(x) {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

// Inverse cumulative normal (rational approximation — Beasley-Springer-Moro)
function normINV(p) {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  if (p === 0.5) return 0;

  const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02,
             1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  const b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02,
             6.680131188771972e+01, -1.328068155288572e+01];
  const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00,
             -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
  const d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];

  const pLow = 0.02425, pHigh = 1 - pLow;
  let q, r;

  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
           ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  } else if (p <= pHigh) {
    q = p - 0.5;
    r = q * q;
    return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q /
           (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
            ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  }
}

export default function Calculator({ onClose }) {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [mode, setMode] = useState('standard'); // standard, financial, stats
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: -1, y: -1 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const calcRef = useRef(null);

  // Initialize position to center-right
  useEffect(() => {
    if (position.x === -1) {
      setPosition({
        x: Math.max(20, window.innerWidth - 380),
        y: Math.max(20, Math.floor(window.innerHeight * 0.1)),
      });
    }
  }, [position.x]);

  // Dragging logic
  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('.calc-btn') || e.target.closest('.calc-input')) return;
    setIsDragging(true);
    const rect = calcRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e) => {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 340, e.clientX - dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.y)),
      });
    };
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Touch dragging for mobile
  const handleTouchStart = useCallback((e) => {
    if (e.target.closest('.calc-btn') || e.target.closest('.calc-input')) return;
    const touch = e.touches[0];
    const rect = calcRef.current.getBoundingClientRect();
    setDragOffset({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 340, touch.clientX - dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - 100, touch.clientY - dragOffset.y)),
      });
    };
    const handleTouchEnd = () => setIsDragging(false);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset]);

  const appendToDisplay = (val) => {
    if (display === '0' && val !== '.') {
      setDisplay(val);
    } else if (val === '.' && display.includes('.')) {
      return;
    } else {
      setDisplay(display + val);
    }
  };

  const setOperator = (op) => {
    setExpression(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const fullExpr = expression + display;
      if (!fullExpr.trim()) return;

      const sanitized = fullExpr.replace(/[^0-9+\-*/.() ]/g, '');
      const result = Function('"use strict"; return (' + sanitized + ')')();

      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error');
        setExpression('');
        return;
      }

      const rounded = parseFloat(result.toPrecision(12));
      setHistory(prev => [...prev.slice(-9), { expr: fullExpr, result: rounded }]);
      setDisplay(String(rounded));
      setExpression('');
    } catch {
      setDisplay('Error');
      setExpression('');
    }
  };

  const clear = () => { setDisplay('0'); setExpression(''); };
  const backspace = () => setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  const toggleSign = () => setDisplay(String(-parseFloat(display)));
  const percent = () => setDisplay(String(parseFloat(display) / 100));

  // Scientific functions
  const sqrt = () => { const v = Math.sqrt(parseFloat(display)); setDisplay(String(parseFloat(v.toPrecision(12)))); };
  const square = () => { const v = Math.pow(parseFloat(display), 2); setDisplay(String(parseFloat(v.toPrecision(12)))); };
  const ln = () => { const v = Math.log(parseFloat(display)); setDisplay(String(parseFloat(v.toPrecision(12)))); };
  const exp = () => { const v = Math.exp(parseFloat(display)); setDisplay(String(parseFloat(v.toPrecision(12)))); };
  const power = () => setOperator('**');
  const inverse = () => { const v = 1 / parseFloat(display); setDisplay(String(parseFloat(v.toPrecision(12)))); };

  // Memory functions
  const mPlus = () => setMemory(memory + parseFloat(display));
  const mMinus = () => setMemory(memory - parseFloat(display));
  const mRecall = () => setDisplay(String(memory));
  const mClear = () => setMemory(0);

  // Financial functions
  const [finInputs, setFinInputs] = useState({ n: '', rate: '', pv: '', pmt: '', fv: '' });
  const [finResult, setFinResult] = useState('');
  const [finSolveFor, setFinSolveFor] = useState('pv');

  const solveFinancial = () => {
    const n = parseFloat(finInputs.n);
    const rate = parseFloat(finInputs.rate) / 100;
    const pv = parseFloat(finInputs.pv);
    const pmt = parseFloat(finInputs.pmt);
    const fv = parseFloat(finInputs.fv);

    try {
      let result;
      switch (finSolveFor) {
        case 'pv': {
          if (rate === 0) { result = -(pmt * n + fv); }
          else { result = -pmt * ((1 - Math.pow(1 + rate, -n)) / rate) - fv * Math.pow(1 + rate, -n); }
          break;
        }
        case 'fv': {
          if (rate === 0) { result = -(pv + pmt * n); }
          else { result = -pv * Math.pow(1 + rate, n) - pmt * ((Math.pow(1 + rate, n) - 1) / rate); }
          break;
        }
        case 'pmt': {
          if (rate === 0) { result = -(pv + fv) / n; }
          else { result = (-pv * Math.pow(1 + rate, n) - fv) * rate / (Math.pow(1 + rate, n) - 1); }
          break;
        }
        case 'n': {
          if (rate === 0) { result = -(pv + fv) / pmt; }
          else { result = Math.log((-fv * rate + pmt) / (pv * rate + pmt)) / Math.log(1 + rate); }
          break;
        }
        case 'rate': {
          let r = 0.1;
          for (let i = 0; i < 100; i++) {
            const pvCalc = -pmt * ((1 - Math.pow(1 + r, -n)) / r) - fv * Math.pow(1 + r, -n);
            const diff = pvCalc - pv;
            if (Math.abs(diff) < 0.0001) break;
            const r2 = r + 0.0001;
            const pvCalc2 = -pmt * ((1 - Math.pow(1 + r2, -n)) / r2) - fv * Math.pow(1 + r2, -n);
            const deriv = (pvCalc2 - pvCalc) / 0.0001;
            if (deriv === 0) break;
            r = r - diff / deriv;
          }
          result = r * 100;
          break;
        }
      }

      if (isNaN(result) || !isFinite(result)) {
        setFinResult('Error — check inputs');
      } else {
        setFinResult(`${finSolveFor.toUpperCase()} = ${parseFloat(result.toPrecision(10))}`);
        setDisplay(String(parseFloat(result.toPrecision(10))));
      }
    } catch {
      setFinResult('Error — check inputs');
    }
  };

  // ─── Statistics & BSM State ───────────────────────────────────
  const [statsTab, setStatsTab] = useState('norm'); // norm, bsm, data
  const [normInput, setNormInput] = useState('');
  const [normResult, setNormResult] = useState('');
  const [normMode, setNormMode] = useState('cdf'); // cdf, pdf, inv

  // BSM inputs
  const [bsmInputs, setBsmInputs] = useState({ s: '', k: '', r: '', t: '', sigma: '' });
  const [bsmResult, setBsmResult] = useState(null);

  // Data statistics
  const [dataInput, setDataInput] = useState('');
  const [dataResult, setDataResult] = useState(null);

  const computeNorm = () => {
    const x = parseFloat(normInput);
    if (isNaN(x)) { setNormResult('Enter a valid number'); return; }
    let val;
    if (normMode === 'cdf') {
      val = normCDF(x);
      setNormResult(`N(${x}) = ${val.toPrecision(10)}`);
    } else if (normMode === 'pdf') {
      val = normPDF(x);
      setNormResult(`N'(${x}) = ${val.toPrecision(10)}`);
    } else {
      if (x <= 0 || x >= 1) { setNormResult('p must be between 0 and 1'); return; }
      val = normINV(x);
      setNormResult(`N⁻¹(${x}) = ${val.toPrecision(10)}`);
    }
    setDisplay(String(parseFloat(val.toPrecision(10))));
  };

  const computeBSM = () => {
    const S = parseFloat(bsmInputs.s);
    const K = parseFloat(bsmInputs.k);
    const r = parseFloat(bsmInputs.r) / 100; // entered as %
    const T = parseFloat(bsmInputs.t);
    const sigma = parseFloat(bsmInputs.sigma) / 100; // entered as %

    if ([S, K, r, T, sigma].some(v => isNaN(v))) {
      setBsmResult({ error: 'Fill all fields with valid numbers' });
      return;
    }
    if (T <= 0 || sigma <= 0 || S <= 0 || K <= 0) {
      setBsmResult({ error: 'S, K, T, sigma must be positive' });
      return;
    }

    const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    const Nd1 = normCDF(d1);
    const Nd2 = normCDF(d2);
    const NnegD1 = normCDF(-d1);
    const NnegD2 = normCDF(-d2);

    const call = S * Nd1 - K * Math.exp(-r * T) * Nd2;
    const put = K * Math.exp(-r * T) * NnegD2 - S * NnegD1;

    // Greeks
    const delta_call = Nd1;
    const delta_put = Nd1 - 1;
    const gamma = normPDF(d1) / (S * sigma * Math.sqrt(T));
    const vega = S * normPDF(d1) * Math.sqrt(T) / 100; // per 1% change
    const theta_call = (-(S * normPDF(d1) * sigma) / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * Nd2) / 365;
    const theta_put = (-(S * normPDF(d1) * sigma) / (2 * Math.sqrt(T)) + r * K * Math.exp(-r * T) * NnegD2) / 365;
    const rho_call = K * T * Math.exp(-r * T) * Nd2 / 100;
    const rho_put = -K * T * Math.exp(-r * T) * NnegD2 / 100;

    setBsmResult({
      d1: d1.toPrecision(8),
      d2: d2.toPrecision(8),
      Nd1: Nd1.toPrecision(8),
      Nd2: Nd2.toPrecision(8),
      call: call.toPrecision(8),
      put: put.toPrecision(8),
      delta_call: delta_call.toPrecision(6),
      delta_put: delta_put.toPrecision(6),
      gamma: gamma.toPrecision(6),
      vega: vega.toPrecision(6),
      theta_call: theta_call.toPrecision(6),
      theta_put: theta_put.toPrecision(6),
      rho_call: rho_call.toPrecision(6),
      rho_put: rho_put.toPrecision(6),
    });
  };

  const computeStats = () => {
    const values = dataInput.split(/[,\s]+/).map(Number).filter(v => !isNaN(v));
    if (values.length === 0) { setDataResult({ error: 'Enter comma-separated numbers' }); return; }

    const n = values.length;
    const mean = values.reduce((a, b) => a + b, 0) / n;
    const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
    const sampleVar = n > 1 ? values.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1) : 0;
    const stdDev = Math.sqrt(variance);
    const sampleStd = Math.sqrt(sampleVar);
    const sorted = [...values].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[n - 1];
    const median = n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)];
    const sum = values.reduce((a, b) => a + b, 0);

    setDataResult({
      n, mean: mean.toPrecision(8), median: median.toPrecision(8),
      stdDev: stdDev.toPrecision(8), sampleStd: sampleStd.toPrecision(8),
      variance: variance.toPrecision(8), sampleVar: sampleVar.toPrecision(8),
      min, max, sum: sum.toPrecision(10),
    });
  };

  const btnClass = 'calc-btn px-0 py-2.5 rounded-lg text-sm font-semibold transition active:scale-95 select-none';
  const numBtn = `${btnClass} bg-white hover:bg-gray-100 text-gray-900 border border-gray-200`;
  const opBtn = `${btnClass} bg-blue-500 hover:bg-blue-600 text-white`;
  const funcBtn = `${btnClass} bg-gray-200 hover:bg-gray-300 text-gray-700`;
  const sciBtn = `${btnClass} bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs`;

  return (
    <div
      ref={calcRef}
      className="fixed z-50 select-none"
      style={{ left: position.x, top: position.y, touchAction: 'none' }}
    >
      <div
        className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        style={{ width: '340px', maxHeight: '90vh', overflowY: 'auto' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-gray-900 cursor-move sticky top-0 z-10">
          <div className="flex items-center gap-1.5">
            <span className="text-white text-xs font-bold">Calc</span>
            <div className="flex gap-1">
              <button
                onClick={() => setMode('standard')}
                className={`calc-btn text-xs px-2 py-0.5 rounded ${mode === 'standard' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                STD
              </button>
              <button
                onClick={() => setMode('financial')}
                className={`calc-btn text-xs px-2 py-0.5 rounded ${mode === 'financial' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                FIN
              </button>
              <button
                onClick={() => setMode('stats')}
                className={`calc-btn text-xs px-2 py-0.5 rounded ${mode === 'stats' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                STAT
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {mode === 'standard' && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="calc-btn text-gray-400 hover:text-white text-xs"
                title="History"
              >
                {showHistory ? 'KEYS' : 'HIST'}
              </button>
            )}
            <button onClick={onClose} className="calc-btn text-gray-400 hover:text-red-400 text-lg leading-none">&times;</button>
          </div>
        </div>

        {/* Display */}
        <div className="px-3 py-2 bg-gray-800">
          <div className="text-gray-400 text-xs text-right h-4 overflow-hidden">
            {expression || (memory !== 0 ? `M: ${memory}` : '')}
          </div>
          <div className="text-white text-2xl font-mono text-right overflow-hidden overflow-ellipsis whitespace-nowrap">
            {display}
          </div>
        </div>

        {/* History Panel */}
        {showHistory && mode === 'standard' && (
          <div className="px-3 pb-2 bg-gray-800 max-h-40 overflow-y-auto">
            {history.length === 0 ? (
              <div className="text-gray-500 text-xs text-center py-2">No history yet</div>
            ) : (
              history.slice().reverse().map((h, i) => (
                <div key={i} className="text-xs py-1 border-b border-gray-700">
                  <div className="text-gray-400">{h.expr}</div>
                  <div className="text-white text-right font-mono">= {h.result}</div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Standard Mode */}
        {mode === 'standard' && !showHistory && (
          <div className="p-2 bg-gray-800 space-y-1.5">
            {/* Scientific row */}
            <div className="grid grid-cols-6 gap-1">
              <button onClick={sqrt} className={sciBtn}>&#8730;x</button>
              <button onClick={square} className={sciBtn}>x&#178;</button>
              <button onClick={ln} className={sciBtn}>ln</button>
              <button onClick={exp} className={sciBtn}>e&#739;</button>
              <button onClick={power} className={sciBtn}>x&#696;</button>
              <button onClick={inverse} className={sciBtn}>1/x</button>
            </div>

            {/* Stats quick-access row */}
            <div className="grid grid-cols-6 gap-1">
              <button onClick={() => {
                const x = parseFloat(display);
                if (!isNaN(x)) { const v = normCDF(x); setDisplay(String(parseFloat(v.toPrecision(10)))); }
              }} className={sciBtn} title="Cumulative Normal N(x)">N(x)</button>
              <button onClick={() => {
                const x = parseFloat(display);
                if (!isNaN(x)) { const v = normPDF(x); setDisplay(String(parseFloat(v.toPrecision(10)))); }
              }} className={sciBtn} title="Normal PDF N'(x)">N&apos;(x)</button>
              <button onClick={() => {
                const x = parseFloat(display);
                if (!isNaN(x) && x > 0 && x < 1) { const v = normINV(x); setDisplay(String(parseFloat(v.toPrecision(10)))); }
              }} className={sciBtn} title="Inverse Normal">N⁻¹</button>
              <button onClick={() => {
                const x = parseFloat(display);
                if (!isNaN(x)) { setDisplay(String(parseFloat(Math.log10(x).toPrecision(12)))); }
              }} className={sciBtn}>log</button>
              <button onClick={() => {
                const x = parseFloat(display);
                if (!isNaN(x) && x >= 0) { setDisplay(String(parseFloat(Math.factorial ? 1 : Array.from({length: Math.round(x)}, (_, i) => i + 1).reduce((a, b) => a * b, 1)).toPrecision(12))); }
              }} className={sciBtn}>n!</button>
              <button onClick={() => {
                const x = parseFloat(display);
                if (!isNaN(x)) { setDisplay(String(parseFloat(Math.abs(x).toPrecision(12)))); }
              }} className={sciBtn}>|x|</button>
            </div>

            {/* Memory row */}
            <div className="grid grid-cols-6 gap-1">
              <button onClick={mClear} className={`${funcBtn} text-xs`}>MC</button>
              <button onClick={mRecall} className={`${funcBtn} text-xs`}>MR</button>
              <button onClick={mPlus} className={`${funcBtn} text-xs`}>M+</button>
              <button onClick={mMinus} className={`${funcBtn} text-xs`}>M&#8722;</button>
              <button onClick={percent} className={funcBtn}>%</button>
              <button onClick={backspace} className={funcBtn}>&#9003;</button>
            </div>

            {/* Number pad + operators */}
            <div className="grid grid-cols-4 gap-1">
              <button onClick={clear} className={`${funcBtn} text-red-600`}>AC</button>
              <button onClick={toggleSign} className={funcBtn}>&plusmn;</button>
              <button onClick={() => { setExpression(display + ' * '); setDisplay('0'); }} className={opBtn}>&times;</button>
              <button onClick={() => setOperator('/')} className={opBtn}>&divide;</button>

              <button onClick={() => appendToDisplay('7')} className={numBtn}>7</button>
              <button onClick={() => appendToDisplay('8')} className={numBtn}>8</button>
              <button onClick={() => appendToDisplay('9')} className={numBtn}>9</button>
              <button onClick={() => setOperator('-')} className={opBtn}>&minus;</button>

              <button onClick={() => appendToDisplay('4')} className={numBtn}>4</button>
              <button onClick={() => appendToDisplay('5')} className={numBtn}>5</button>
              <button onClick={() => appendToDisplay('6')} className={numBtn}>6</button>
              <button onClick={() => setOperator('+')} className={opBtn}>+</button>

              <button onClick={() => appendToDisplay('1')} className={numBtn}>1</button>
              <button onClick={() => appendToDisplay('2')} className={numBtn}>2</button>
              <button onClick={() => appendToDisplay('3')} className={numBtn}>3</button>
              <button onClick={calculate} className={`${btnClass} bg-green-500 hover:bg-green-600 text-white row-span-2`}>=</button>

              <button onClick={() => appendToDisplay('0')} className={`${numBtn} col-span-2`}>0</button>
              <button onClick={() => appendToDisplay('.')} className={numBtn}>.</button>
            </div>
          </div>
        )}

        {/* Financial Mode (TVM Calculator) */}
        {mode === 'financial' && (
          <div className="p-3 bg-gray-800 space-y-2">
            <div className="text-gray-400 text-xs mb-1">Time Value of Money (TVM)</div>

            {['n', 'rate', 'pv', 'pmt', 'fv'].map(field => (
              <div key={field} className="flex items-center gap-2">
                <label className="text-gray-300 text-xs font-mono w-10 text-right">
                  {field === 'rate' ? 'I/Y%' : field.toUpperCase()}
                </label>
                <input
                  type="number"
                  value={finInputs[field]}
                  onChange={(e) => setFinInputs(prev => ({ ...prev, [field]: e.target.value }))}
                  className="calc-input flex-1 bg-gray-700 text-white text-sm px-2 py-1.5 rounded border border-gray-600 focus:border-blue-400 outline-none font-mono"
                  placeholder={field === 'n' ? 'Periods' : field === 'rate' ? 'Annual rate %' : field === 'pv' ? 'Present value' : field === 'pmt' ? 'Payment' : 'Future value'}
                />
                <button
                  onClick={() => setFinInputs(prev => ({ ...prev, [field]: display !== '0' ? display : '' }))}
                  className="calc-btn text-xs bg-gray-700 text-gray-300 px-1.5 py-1 rounded hover:bg-gray-600"
                  title="Copy from display"
                >
                  &larr;
                </button>
              </div>
            ))}

            <div className="flex items-center gap-2 mt-2">
              <label className="text-gray-300 text-xs w-10 text-right">Solve</label>
              <select
                value={finSolveFor}
                onChange={(e) => setFinSolveFor(e.target.value)}
                className="calc-input flex-1 bg-gray-700 text-white text-sm px-2 py-1.5 rounded border border-gray-600 outline-none"
              >
                <option value="pv">PV (Present Value)</option>
                <option value="fv">FV (Future Value)</option>
                <option value="pmt">PMT (Payment)</option>
                <option value="n">N (Periods)</option>
                <option value="rate">I/Y (Interest Rate %)</option>
              </select>
              <button
                onClick={solveFinancial}
                className="calc-btn bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded font-bold"
              >
                Solve
              </button>
            </div>

            {finResult && (
              <div className="bg-gray-700 rounded-lg p-2 text-center">
                <div className="text-green-400 text-sm font-mono font-bold">{finResult}</div>
              </div>
            )}

            <div className="flex gap-1 mt-1">
              <button
                onClick={() => { setFinInputs({ n: '', rate: '', pv: '', pmt: '', fv: '' }); setFinResult(''); }}
                className="calc-btn flex-1 bg-gray-700 text-gray-300 text-xs py-1.5 rounded hover:bg-gray-600"
              >
                Clear All
              </button>
              <button
                onClick={() => setMode('standard')}
                className="calc-btn flex-1 bg-gray-700 text-gray-300 text-xs py-1.5 rounded hover:bg-gray-600"
              >
                Standard Calc
              </button>
            </div>

            <div className="text-gray-500 text-xs mt-1 leading-tight">
              Cash flow sign convention: outflows negative, inflows positive.
              Rate entered as annual percentage (e.g., 12 for 12%).
            </div>
          </div>
        )}

        {/* Statistics & BSM Mode */}
        {mode === 'stats' && (
          <div className="p-3 bg-gray-800 space-y-2">
            {/* Sub-tabs */}
            <div className="flex gap-1 mb-1">
              <button
                onClick={() => setStatsTab('norm')}
                className={`calc-btn flex-1 text-xs py-1 rounded ${statsTab === 'norm' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                N(d) / Dist
              </button>
              <button
                onClick={() => setStatsTab('bsm')}
                className={`calc-btn flex-1 text-xs py-1 rounded ${statsTab === 'bsm' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Black-Scholes
              </button>
              <button
                onClick={() => setStatsTab('data')}
                className={`calc-btn flex-1 text-xs py-1 rounded ${statsTab === 'data' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Data Stats
              </button>
            </div>

            {/* Normal Distribution Tab */}
            {statsTab === 'norm' && (
              <div className="space-y-2">
                <div className="text-gray-400 text-xs">Normal Distribution Calculator</div>

                <div className="flex gap-1">
                  <button
                    onClick={() => setNormMode('cdf')}
                    className={`calc-btn flex-1 text-xs py-1.5 rounded ${normMode === 'cdf' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                  >
                    N(d) CDF
                  </button>
                  <button
                    onClick={() => setNormMode('pdf')}
                    className={`calc-btn flex-1 text-xs py-1.5 rounded ${normMode === 'pdf' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                  >
                    N&apos;(d) PDF
                  </button>
                  <button
                    onClick={() => setNormMode('inv')}
                    className={`calc-btn flex-1 text-xs py-1.5 rounded ${normMode === 'inv' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                  >
                    N⁻¹(p) Inv
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-300 text-xs w-8">
                    {normMode === 'inv' ? 'p =' : 'd ='}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={normInput}
                    onChange={(e) => setNormInput(e.target.value)}
                    className="calc-input flex-1 bg-gray-700 text-white text-sm px-2 py-1.5 rounded border border-gray-600 focus:border-green-400 outline-none font-mono"
                    placeholder={normMode === 'inv' ? 'Probability (0-1)' : 'Enter d value'}
                  />
                  <button
                    onClick={() => setNormInput(display !== '0' ? display : '')}
                    className="calc-btn text-xs bg-gray-700 text-gray-300 px-1.5 py-1 rounded hover:bg-gray-600"
                  >
                    &larr;
                  </button>
                </div>

                <button
                  onClick={computeNorm}
                  className="calc-btn w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded font-bold"
                >
                  Calculate
                </button>

                {normResult && (
                  <div className="bg-gray-700 rounded-lg p-2 text-center">
                    <div className="text-green-400 text-sm font-mono font-bold">{normResult}</div>
                  </div>
                )}

                <div className="text-gray-500 text-xs leading-tight mt-1">
                  <strong>N(d)</strong> = cumulative probability P(Z &le; d) for BSM d1, d2.{' '}
                  <strong>N&apos;(d)</strong> = standard normal density (for Greeks).{' '}
                  <strong>N⁻¹(p)</strong> = inverse: given probability, find z-score.
                </div>

                {/* Quick reference table */}
                <div className="bg-gray-750 rounded-lg overflow-hidden mt-1">
                  <div className="text-gray-400 text-xs px-2 py-1 bg-gray-900">Quick Reference</div>
                  <div className="grid grid-cols-4 gap-0 text-xs font-mono">
                    {[
                      { d: '-2.00', n: '0.0228' }, { d: '-1.00', n: '0.1587' },
                      { d: '-0.50', n: '0.3085' }, { d: '0.00', n: '0.5000' },
                      { d: '0.50', n: '0.6915' }, { d: '1.00', n: '0.8413' },
                      { d: '1.50', n: '0.9332' }, { d: '2.00', n: '0.9772' },
                    ].map(item => (
                      <button
                        key={item.d}
                        onClick={() => { setNormInput(item.d); setNormMode('cdf'); }}
                        className="calc-btn py-1 text-center hover:bg-gray-600"
                      >
                        <div className="text-gray-400">{item.d}</div>
                        <div className="text-green-400">{item.n}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Black-Scholes Tab */}
            {statsTab === 'bsm' && (
              <div className="space-y-2">
                <div className="text-gray-400 text-xs">Black-Scholes Option Pricing</div>

                {[
                  { key: 's', label: 'S', ph: 'Spot price' },
                  { key: 'k', label: 'K', ph: 'Strike price' },
                  { key: 'r', label: 'r %', ph: 'Risk-free rate %' },
                  { key: 't', label: 'T', ph: 'Time to expiry (years)' },
                  { key: 'sigma', label: 'σ %', ph: 'Volatility %' },
                ].map(f => (
                  <div key={f.key} className="flex items-center gap-2">
                    <label className="text-gray-300 text-xs font-mono w-8 text-right">{f.label}</label>
                    <input
                      type="number"
                      step="any"
                      value={bsmInputs[f.key]}
                      onChange={(e) => setBsmInputs(prev => ({ ...prev, [f.key]: e.target.value }))}
                      className="calc-input flex-1 bg-gray-700 text-white text-sm px-2 py-1.5 rounded border border-gray-600 focus:border-green-400 outline-none font-mono"
                      placeholder={f.ph}
                    />
                    <button
                      onClick={() => setBsmInputs(prev => ({ ...prev, [f.key]: display !== '0' ? display : '' }))}
                      className="calc-btn text-xs bg-gray-700 text-gray-300 px-1.5 py-1 rounded hover:bg-gray-600"
                    >
                      &larr;
                    </button>
                  </div>
                ))}

                <button
                  onClick={computeBSM}
                  className="calc-btn w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded font-bold"
                >
                  Price Options
                </button>

                {bsmResult && bsmResult.error && (
                  <div className="bg-red-900/50 rounded-lg p-2 text-center">
                    <div className="text-red-400 text-xs">{bsmResult.error}</div>
                  </div>
                )}

                {bsmResult && !bsmResult.error && (
                  <div className="bg-gray-700 rounded-lg p-2 space-y-1.5">
                    {/* d1, d2 */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div><span className="text-gray-400">d1 = </span><span className="text-cyan-400">{bsmResult.d1}</span></div>
                      <div><span className="text-gray-400">d2 = </span><span className="text-cyan-400">{bsmResult.d2}</span></div>
                      <div><span className="text-gray-400">N(d1) = </span><span className="text-cyan-400">{bsmResult.Nd1}</span></div>
                      <div><span className="text-gray-400">N(d2) = </span><span className="text-cyan-400">{bsmResult.Nd2}</span></div>
                    </div>
                    <div className="border-t border-gray-600 pt-1.5 grid grid-cols-2 gap-2 text-xs font-mono">
                      <div><span className="text-gray-400">Call = </span><span className="text-green-400 font-bold">{bsmResult.call}</span></div>
                      <div><span className="text-gray-400">Put = </span><span className="text-red-400 font-bold">{bsmResult.put}</span></div>
                    </div>
                    {/* Greeks */}
                    <div className="border-t border-gray-600 pt-1.5">
                      <div className="text-gray-500 text-xs mb-1">Greeks</div>
                      <div className="grid grid-cols-2 gap-1 text-xs font-mono">
                        <div><span className="text-gray-400">Delta (C): </span><span className="text-yellow-400">{bsmResult.delta_call}</span></div>
                        <div><span className="text-gray-400">Delta (P): </span><span className="text-yellow-400">{bsmResult.delta_put}</span></div>
                        <div><span className="text-gray-400">Gamma: </span><span className="text-yellow-400">{bsmResult.gamma}</span></div>
                        <div><span className="text-gray-400">Vega: </span><span className="text-yellow-400">{bsmResult.vega}</span></div>
                        <div><span className="text-gray-400">Theta (C): </span><span className="text-yellow-400">{bsmResult.theta_call}</span></div>
                        <div><span className="text-gray-400">Theta (P): </span><span className="text-yellow-400">{bsmResult.theta_put}</span></div>
                        <div><span className="text-gray-400">Rho (C): </span><span className="text-yellow-400">{bsmResult.rho_call}</span></div>
                        <div><span className="text-gray-400">Rho (P): </span><span className="text-yellow-400">{bsmResult.rho_put}</span></div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-1 mt-1">
                  <button
                    onClick={() => { setBsmInputs({ s: '', k: '', r: '', t: '', sigma: '' }); setBsmResult(null); }}
                    className="calc-btn flex-1 bg-gray-700 text-gray-300 text-xs py-1.5 rounded hover:bg-gray-600"
                  >
                    Clear
                  </button>
                </div>

                <div className="text-gray-500 text-xs leading-tight">
                  European options. r and sigma entered as % (e.g., 5 for 5%).
                  Vega per 1% change. Theta per day.
                </div>
              </div>
            )}

            {/* Data Statistics Tab */}
            {statsTab === 'data' && (
              <div className="space-y-2">
                <div className="text-gray-400 text-xs">Descriptive Statistics</div>

                <textarea
                  value={dataInput}
                  onChange={(e) => setDataInput(e.target.value)}
                  className="calc-input w-full bg-gray-700 text-white text-sm px-2 py-1.5 rounded border border-gray-600 focus:border-green-400 outline-none font-mono h-16 resize-none"
                  placeholder="Enter numbers separated by commas or spaces&#10;e.g., 10, 20, 30, 25, 15"
                />

                <button
                  onClick={computeStats}
                  className="calc-btn w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded font-bold"
                >
                  Calculate Statistics
                </button>

                {dataResult && dataResult.error && (
                  <div className="bg-red-900/50 rounded-lg p-2 text-center">
                    <div className="text-red-400 text-xs">{dataResult.error}</div>
                  </div>
                )}

                {dataResult && !dataResult.error && (
                  <div className="bg-gray-700 rounded-lg p-2 space-y-1 text-xs font-mono">
                    <div className="grid grid-cols-2 gap-1">
                      <div><span className="text-gray-400">n = </span><span className="text-cyan-400">{dataResult.n}</span></div>
                      <div><span className="text-gray-400">Sum = </span><span className="text-cyan-400">{dataResult.sum}</span></div>
                      <div><span className="text-gray-400">Mean = </span><span className="text-green-400">{dataResult.mean}</span></div>
                      <div><span className="text-gray-400">Median = </span><span className="text-green-400">{dataResult.median}</span></div>
                      <div><span className="text-gray-400">Std (pop) = </span><span className="text-yellow-400">{dataResult.stdDev}</span></div>
                      <div><span className="text-gray-400">Std (samp) = </span><span className="text-yellow-400">{dataResult.sampleStd}</span></div>
                      <div><span className="text-gray-400">Var (pop) = </span><span className="text-yellow-400">{dataResult.variance}</span></div>
                      <div><span className="text-gray-400">Var (samp) = </span><span className="text-yellow-400">{dataResult.sampleVar}</span></div>
                      <div><span className="text-gray-400">Min = </span><span className="text-cyan-400">{dataResult.min}</span></div>
                      <div><span className="text-gray-400">Max = </span><span className="text-cyan-400">{dataResult.max}</span></div>
                    </div>
                  </div>
                )}

                <div className="flex gap-1 mt-1">
                  <button
                    onClick={() => { setDataInput(''); setDataResult(null); }}
                    className="calc-btn flex-1 bg-gray-700 text-gray-300 text-xs py-1.5 rounded hover:bg-gray-600"
                  >
                    Clear Data
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
