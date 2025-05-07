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
    if (value[key] === null) {
      delete value[key];
    }
  });
  return value;
}

describe('calculate e button', function() {
  it('inserts e as next if no operator', function() {
    expect(pressButtons(['e'])).to.deep.equal({ next: String(Math.E) });
  });

  it('starts new input with e after operation', function() {
    expect(pressButtons(['5', '+', 'e'])).to.deep.equal({ total: '5', operation: '+', next: String(Math.E) });
  });

  it('overwrites next with e', function() {
    expect(pressButtons(['7', 'e'])).to.deep.equal({ next: String(Math.E) });
  });
});
