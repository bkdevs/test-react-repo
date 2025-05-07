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

  render() {
    return (
      <div className="component-app">
        <button 
          className="special-button"
          onClick={() => this.handleClick("e")}
          style={{
            margin: "0 auto 10px auto",
            display: "block",
            fontSize: "1.2em",
            width: "48px",
            height: "48px"
          }}
        >
          e
        </button>
        <Display value={this.state.next || this.state.total || "0"} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}
