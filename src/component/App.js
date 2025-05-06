import React from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import GraphingCalculator from "./GraphingCalculator";
import calculate from "../logic/calculate";
import "./App.css";

export default class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
    mode: 'basic', // 'basic' or 'graphing'
  };

  handleClick = buttonName => {
    this.setState(calculate(this.state, buttonName));
  };

  setMode = mode => this.setState({ mode });

  render() {
    return (
      <div className="component-app">
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <button
            style={{ marginRight: 8, fontWeight: this.state.mode === 'basic' ? 'bold' : 'normal' }}
            onClick={() => this.setMode('basic')}
          >
            Basic Calculator
          </button>
          <button
            style={{ fontWeight: this.state.mode === 'graphing' ? 'bold' : 'normal' }}
            onClick={() => this.setMode('graphing')}
          >
            Graphing Calculator
          </button>
        </div>
        {this.state.mode === 'basic' ? (
          <>
            <Display value={this.state.next || this.state.total || "0"} />
            <ButtonPanel clickHandler={this.handleClick} />
          </>
        ) : (
          <GraphingCalculator />
        )}
      </div>
    );
  }
}
