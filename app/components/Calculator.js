'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export default function Calculator({ onClose }) {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [mode, setMode] = useState('standard'); // standard, financial
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

      // Safe evaluation — only allow numbers and basic operators
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
    const rate = parseFloat(finInputs.rate) / 100; // Convert percentage to decimal
    const pv = parseFloat(finInputs.pv);
    const pmt = parseFloat(finInputs.pmt);
    const fv = parseFloat(finInputs.fv);

    try {
      let result;
      switch (finSolveFor) {
        case 'pv': {
          // PV = -PMT * ((1-(1+r)^-n)/r) - FV*(1+r)^-n
          if (rate === 0) { result = -(pmt * n + fv); }
          else { result = -pmt * ((1 - Math.pow(1 + rate, -n)) / rate) - fv * Math.pow(1 + rate, -n); }
          break;
        }
        case 'fv': {
          // FV = -PV*(1+r)^n - PMT*((1+r)^n - 1)/r
          if (rate === 0) { result = -(pv + pmt * n); }
          else { result = -pv * Math.pow(1 + rate, n) - pmt * ((Math.pow(1 + rate, n) - 1) / rate); }
          break;
        }
        case 'pmt': {
          // PMT = (-PV*(1+r)^n - FV) * r / ((1+r)^n - 1)
          if (rate === 0) { result = -(pv + fv) / n; }
          else { result = (-pv * Math.pow(1 + rate, n) - fv) * rate / (Math.pow(1 + rate, n) - 1); }
          break;
        }
        case 'n': {
          // N = ln((-FV*r + PMT) / (PV*r + PMT)) / ln(1+r)
          if (rate === 0) { result = -(pv + fv) / pmt; }
          else { result = Math.log((-fv * rate + pmt) / (pv * rate + pmt)) / Math.log(1 + rate); }
          break;
        }
        case 'rate': {
          // Iterative solution (Newton-Raphson)
          let r = 0.1;
          for (let i = 0; i < 100; i++) {
            const pvCalc = -pmt * ((1 - Math.pow(1 + r, -n)) / r) - fv * Math.pow(1 + r, -n);
            const diff = pvCalc - pv;
            if (Math.abs(diff) < 0.0001) break;
            // Numerical derivative
            const r2 = r + 0.0001;
            const pvCalc2 = -pmt * ((1 - Math.pow(1 + r2, -n)) / r2) - fv * Math.pow(1 + r2, -n);
            const deriv = (pvCalc2 - pvCalc) / 0.0001;
            if (deriv === 0) break;
            r = r - diff / deriv;
          }
          result = r * 100; // Convert back to percentage
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
        style={{ width: '320px' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-gray-900 cursor-move">
          <div className="flex items-center gap-2">
            <span className="text-white text-xs font-bold">Calculator</span>
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
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="calc-btn text-gray-400 hover:text-white text-xs"
              title="History"
            >
              {showHistory ? 'KEYS' : 'HIST'}
            </button>
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
      </div>
    </div>
  );
}
