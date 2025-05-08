import React from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import calculate from "../logic/calculate";
import "./App.css";

export default class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
  };

  handleClick = buttonName => {
    this.setState(calculate(this.state, buttonName));
  };

  handleConstantClick = value => {
    this.setState({ next: value, total: null, operation: null });
  };

  render() {
    return (
      <div className="component-app">
        <div className="constant-buttons" style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          <button onClick={() => this.handleConstantClick(Math.PI.toString())}>π</button>
          <button onClick={() => this.handleConstantClick(Math.E.toString())}>e</button>
        </div>
        <Display value={this.state.next || this.state.total || "0"} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}
