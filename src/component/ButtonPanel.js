import Button from "./Button";
import React from "react";
import PropTypes from "prop-types";

import "./ButtonPanel.css";

export default class ButtonPanel extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
  };

  handleClick = buttonName => {
    if (buttonName === "Rand9") {
      const rand = Math.floor(Math.random() * 10).toString();
      this.props.clickHandler(rand);
      return;
    }
    if (buttonName === "Rand99") {
      const rand = Math.floor(Math.random() * 100).toString();
      this.props.clickHandler(rand);
      return;
    }
    if (buttonName === "Rand999") {
      const rand = Math.floor(Math.random() * 1000).toString();
      this.props.clickHandler(rand);
      return;
    }
    this.props.clickHandler(buttonName);
  };

  render() {
    return (
      <div className="component-button-panel">
        <div>
          <Button name="Rand9" clickHandler={this.handleClick} />
          <Button name="Rand99" clickHandler={this.handleClick} />
          <Button name="Rand999" clickHandler={this.handleClick} />
        </div>
        <div>
          <Button name="sin" clickHandler={this.handleClick} />
          <Button name="cos" clickHandler={this.handleClick} />
          <Button name="tan" clickHandler={this.handleClick} />
        </div>
        <div>
          <Button name="AC" clickHandler={this.handleClick} />
          <Button name="+/-" clickHandler={this.handleClick} />
          <Button name="%" clickHandler={this.handleClick} />
          <Button name="÷" clickHandler={this.handleClick} orange />
        </div>
        <div>
          <Button name="7" clickHandler={this.handleClick} />
          <Button name="8" clickHandler={this.handleClick} />
          <Button name="9" clickHandler={this.handleClick} />
          <Button name="x" clickHandler={this.handleClick} orange />
        </div>
        <div>
          <Button name="4" clickHandler={this.handleClick} />
          <Button name="5" clickHandler={this.handleClick} />
          <Button name="6" clickHandler={this.handleClick} />
          <Button name="-" clickHandler={this.handleClick} orange />
        </div>
        <div>
          <Button name="1" clickHandler={this.handleClick} />
          <Button name="2" clickHandler={this.handleClick} />
          <Button name="3" clickHandler={this.handleClick} />
          <Button name="+" clickHandler={this.handleClick} orange />
        </div>
        <div>
          <Button name="0" clickHandler={this.handleClick} wide />
          <Button name="." clickHandler={this.handleClick} />
          <Button name="=" clickHandler={this.handleClick} orange />
        </div>
      </div>
    );
  }
}
