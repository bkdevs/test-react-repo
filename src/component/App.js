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
    // Handle random number buttons
    if (buttonName === "Rand 1" || buttonName === "Rand 2" || buttonName === "Rand 3") {
      let digits = 1;
      if (buttonName === "Rand 2") digits = 2;
      if (buttonName === "Rand 3") digits = 3;
      // Generate a random number with the specified digits
      // First digit should not be zero if digits > 1
      let min = Math.pow(10, digits - 1);
      let max = Math.pow(10, digits) - 1;
      if (digits === 1) min = 0;
      const randNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      // Set this random number as the current input (next)
      this.setState({
        total: null,
        next: randNumber.toString(),
        operation: null,
      });
    } else {
      this.setState(calculate(this.state, buttonName));
    }
  };

  render() {
    return (
      <div className="component-app">
        <Display value={this.state.next || this.state.total || "0"} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}
