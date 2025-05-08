import React from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import Button from "./Button";
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

  handleSpecialInput = value => {
    // If an operation is in progress, place value in "next"; otherwise, start a new calculation
    this.setState(prevState => ({
      ...prevState,
      next: value,
      // Optionally: if you want to clear operation when special is pressed standalone
      // total: prevState.operation ? prevState.total : null,
    }));
  };

  render() {
    return (
      <div className="component-app">
        {/* Special constants above display */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <Button name="π" clickHandler={() => this.handleSpecialInput("3.141592653589793")} />
          <Button name="e" clickHandler={() => this.handleSpecialInput("2.718281828459045")} />
        </div>
        <Display value={this.state.next || this.state.total || "0"} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}
