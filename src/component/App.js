import React from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import HistoryPanel from "./HistoryPanel";
import calculate from "../logic/calculate";
import "./App.css";

export default class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
    history: [], // Array of {expression, result}
    previousState: null, // To help with tracking completed calculations
  };

  handleClick = buttonName => {
    this.setState(prevState => {
      const newState = calculate(prevState, buttonName);
      // Check if calculation is finished (i.e. '=' pressed and total updated)
      if (
        buttonName === '=' &&
        prevState.next !== null &&
        (newState.total !== null || newState.next !== null)
      ) {
        // Try to reconstruct the expression
        let expression = `${prevState.total || ''}${prevState.operation || ''}${prevState.next || ''}`;
        // Fallback if no operation (just number)
        if (!prevState.operation) {
          expression = prevState.next || prevState.total || '';
        }
        const result = newState.total || newState.next || '';
        // Add to history, limit to last 10
        const newHistory = [
          { expression, result },
          ...prevState.history,
        ].slice(0, 10);
        return { ...newState, history: newHistory, previousState: { ...prevState } };
      }
      // Reset on 'AC' (All Clear)
      if (buttonName === 'AC') {
        return { ...newState, history: [], previousState: { ...prevState } };
      }
      return { ...newState, previousState: { ...prevState } };
    });
  };

  render() {
    return (
      <div className="component-app">
        <Display value={this.state.next || this.state.total || "0"} />
        <ButtonPanel clickHandler={this.handleClick} />
        <HistoryPanel history={this.state.history} />
      </div>
    );
  }
}
