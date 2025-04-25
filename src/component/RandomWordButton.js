import React from "react";

// Example set of words to randomly select from.
const WORD_LIST = [
  "apple",
  "banana",
  "orange",
  "grapefruit",
  "strawberry",
  "pear",
  "peach",
  "mango",
  "kiwi",
  "plum",
];

function getRandomWord() {
  const idx = Math.floor(Math.random() * WORD_LIST.length);
  return WORD_LIST[idx];
}

export default class RandomWordButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { word: "" };
  }

  handleClick = () => {
    this.setState({ word: getRandomWord() });
  };

  render() {
    return (
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button onClick={this.handleClick} style={{ fontSize: 16, padding: '8px 20px', cursor: 'pointer' }}>
          Generate Random Word
        </button>
        <div style={{ marginTop: 10, minHeight: 28, fontWeight: 'bold', fontSize: 18 }}>
          {this.state.word}
        </div>
      </div>
    );
  }
}
