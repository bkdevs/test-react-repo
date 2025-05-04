import calculate from "./calculate";
import chai from "chai";

const expect = chai.expect;

function pressButtonSequence(buttons) {
  let state = {};
  buttons.forEach((btn) => {
    state = { ...state, ...calculate(state, btn) };
  });
  Object.keys(state).forEach((key) => {
    if (state[key] === null) delete state[key];
  });
  return state;
}

describe("Euler's constant 'e' button", function() {
  it("inserts e as next if pressed on a fresh calculator", function() {
    expect(pressButtonSequence(["e"]))
      .to.deep.equal({ next: Math.E.toString(), total: null });
  });
  it("inserts e as next after operation", function() {
    expect(pressButtonSequence(["5", "+", "e"]))
      .to.deep.equal({ total: "5", next: Math.E.toString(), operation: "+" });
  });
  it("replaces next value with e after operation + number", function() {
    expect(pressButtonSequence(["5", "+", "2", "e"]))
      .to.deep.equal({ total: "5", next: Math.E.toString(), operation: "+" });
  });
  it("allows calculation with e after + operation", function() {
    expect(pressButtonSequence(["2", "+", "e", "="]))
      .to.deep.equal({ total: (2 + Math.E).toString() });
  });
  it("allows replacing after calculation", function() {
    expect(pressButtonSequence(["2", "+", "e", "=", "e"]))
      .to.deep.equal({ next: Math.E.toString() });
  });
});
