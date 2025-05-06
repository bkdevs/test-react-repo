import calculate from "./calculate";
import chai from "chai";

chai.config.truncateThreshold = 0;
const expect = chai.expect;

function pressButtons(buttons) {
  const value = {};
  buttons.forEach(button => {
    Object.assign(value, calculate(value, button));
  });
  Object.keys(value).forEach(key => {
    if (value[key] === null) delete value[key];
  });
  return value;
}

describe("calculate e button", function() {
  it('pressing e sets next to Math.E', () => {
    expect(pressButtons(["e"])).to.deep.equal({ next: "2.718281828459045", total: null });
  });

  it('inserts e after an operation', () => {
    expect(pressButtons(["6", "+", "e"])).to.deep.equal({ next: "2.718281828459045", total: "6", operation: "+" });
  });

  it('concats e if next already started', () => {
    expect(pressButtons(["1", "e"])).to.deep.equal({ next: "12.718281828459045", total: null });
  });

  it('concats e to next if in operation', () => {
    expect(pressButtons(["1", "+", "2", "e"])).to.deep.equal({ next: "22.718281828459045", total: "1", operation: "+" });
  });

  it('equals works when using e', () => {
    expect(pressButtons(["1", "+", "e", "="])).to.deep.equal({ total: (1+Math.E).toString() });
  });
});
