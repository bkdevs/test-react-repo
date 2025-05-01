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
    if (buttonName === "Rand") {
      // Generate a random integer between 0 and 9999
      const randomNum = Math.floor(Math.random() * 10000);
      this.setState({
        total: null,
        next: String(randomNum),
        operation: null
      });
      return;
    }
    this.setState(calculate(this.state, buttonName));
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
