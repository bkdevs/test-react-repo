import React, { useState, useRef, useEffect } from "react";
import Plot from 'react-plotly.js';

const fnMathjs = (fn, x) => {
  // mathjs import deferred to runtime for bundle optimization
  let result = null;
  try {
    // eslint-disable-next-line
    const math = window.require ? window.require('mathjs') : require('mathjs');
    result = math.evaluate(fn.replace(/([a-zA-Z]+)/g, '($1)'), { x });
  } catch {
    // ignore parse errors
  }
  return result;
};

function generateTable(fnStr, domain=[-10,10], step=1) {
  const [start, end] = domain;
  let table = [];
  for (let x = start; x <= end; x += step) {
    const y = fnMathjs(fnStr, x);
    table.push({ x, y: Number.isFinite(y) ? y : 'Err' });
  }
  return table;
}

export default function GraphingCalculator() {
  const [functions, setFunctions] = useState([]); // { equation, color }
  const [inputEq, setInputEq] = useState("");
  const [error, setError] = useState(null);
  const [domain, setDomain] = useState([-10, 10]);
  const [step, setStep] = useState(0.1);
  const [tableEqIdx, setTableEqIdx] = useState(null);
  const colors = ['red', 'blue', 'green', 'orange', 'purple', 'brown', 'black'];

  // Load from localStorage
  useEffect(() => {
    const saved = window.localStorage.getItem('graphingEquations');
    if (saved) setFunctions(JSON.parse(saved));
  }, []);
  useEffect(() => {
    window.localStorage.setItem('graphingEquations', JSON.stringify(functions));
  }, [functions]);

  const addEquation = () => {
    try {
      fnMathjs(inputEq, 0); // Validate!
      setFunctions(fns => ([...fns, { equation: inputEq, color: colors[fns.length % colors.length] }]));
      setInputEq("");
      setError(null);
    } catch {
      setError("Invalid equation");
    }
  };
  const removeEquation = idx => {
    setFunctions(fns => fns.filter((_, i) => i !== idx));
    if (tableEqIdx === idx) setTableEqIdx(null);
  };
  const clearAll = () => {
    setFunctions([]);
    setTableEqIdx(null);
  }
  const plotData = functions.map((fnObj, idx) => {
    let xs = [];
    let ys = [];
    for (let x = domain[0]; x <= domain[1]; x += step) {
      xs.push(x);
      const y = fnMathjs(fnObj.equation, x);
      ys.push(Number.isFinite(y) ? y : null);
    }
    return {
      x: xs,
      y: ys,
      type: 'scatter',
      mode: 'lines+markers',
      marker: {color: fnObj.color},
      line: {color: fnObj.color},
      name: fnObj.equation
    }
  });

  return (
    <div style={{padding:'1em'}}>
      <h2>Graphing Calculator (TI-84 Style)</h2>
      <div>
        <input
          value={inputEq}
          onChange={e => setInputEq(e.target.value)}
          placeholder="Enter equation, e.g. sin(x) + log(x)"
          size={32}
        />
        <button onClick={addEquation}>Plot</button>
        <button onClick={clearAll}>Clear All</button>
        <span style={{color:'crimson',marginLeft:10}}>{error}</span>
      </div>
      <div style={{marginTop:10}}>
        <label>Domain: from
          <input type="number" style={{width:50,marginLeft:4}} value={domain[0]}
              onChange={e=>setDomain([parseFloat(e.target.value), domain[1]])}/>
          to
          <input type="number" style={{width:50,marginLeft:4}} value={domain[1]}
              onChange={e=>setDomain([domain[0], parseFloat(e.target.value)])}/>
        </label>
        <label style={{marginLeft:16}}>Step:
          <input type="number" step="0.01" style={{width:60,marginLeft:4}} value={step}
              min={0.01} max={5} onChange={e=>setStep(parseFloat(e.target.value))}/>
        </label>
      </div>
      <div style={{margin:'1em 0em'}}>
        <ul>
          {functions.map((fn, idx) => (
            <li key={idx} style={{color:fn.color}}>
              <b>{fn.equation}</b>
              <button onClick={()=>removeEquation(idx)} style={{marginLeft:8}}>✕</button>
              <button onClick={()=>setTableEqIdx(idx)} style={{marginLeft:8}}>Table</button>
            </li>
          ))}
        </ul>
      </div>
      <Plot
        data={plotData}
        layout={{
          title: 'Function Plot',
          xaxis: {title:'x', range: domain},
          yaxis: {title:'y', autorange: true},
          margin: { t: 40, r: 20, b: 40, l: 50 },
          dragmode: 'pan',
          autosize: true,
          showlegend: true
        }}
        style={{ width: '100%', height: '400px' }}
        config={{responsive:true}}
      />
      {tableEqIdx !== null && functions[tableEqIdx] && (
        <div style={{marginTop:'2em',background:'#fafafa',padding:10,borderRadius:8}}>
          <h3>Table of Values for <b>{functions[tableEqIdx].equation}</b></h3>
          <button onClick={()=>setTableEqIdx(null)} style={{float:'right'}}>Close</button>
          <table border="1" cellPadding="3" style={{width:'100%',marginTop:8}}>
            <thead>
              <tr><th>x</th><th>y</th></tr>
            </thead>
            <tbody>
              {generateTable(functions[tableEqIdx].equation, domain, 1).map((row,i)=>(
                <tr key={i}><td>{row.x}</td><td>{row.y}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{marginTop:40}}>
        <b>Supported functions:</b> sin, cos, tan, asin, acos, atan, log, ln, exp, sqrt, abs, +, -, *, /, ^, and parenthesis.
        <br/>Use <b>x</b> as the variable. Example: <span style={{background:'#eee',padding:2}}>sin(x)+log(x)</span>
      </div>
    </div>
  );
}
