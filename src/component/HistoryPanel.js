import React from "react";
import "./HistoryPanel.css";

export default function HistoryPanel({ history }) {
  return (
    <div className="history-panel">
      <h3>History</h3>
      {history.length === 0 ? (
        <div className="history-empty">No calculations yet.</div>
      ) : (
        <ul className="history-list">
          {history.map((item, idx) => (
            <li key={idx} className="history-item">
              <span className="expression">{item.expression}</span>
              <span className="equals"> = </span>
              <span className="result">{item.result}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
