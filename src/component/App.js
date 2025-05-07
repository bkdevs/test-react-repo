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

  render() {
    return (
      <div className="component-app">
        <div className="pi-button-wrapper" style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
          <Button name="π" clickHandler={() => this.handleClick('π')} />
        </div>
        <Display value={this.state.next || this.state.total || "0"} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}
