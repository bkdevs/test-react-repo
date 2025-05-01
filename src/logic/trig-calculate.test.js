import calculate from "./calculate";
import chai from "chai";
const expect = chai.expect;

describe("trigonometric functions (sin, cos, tan) via calculate", function() {
  const trigTests = [
    // [input, button, expected]
    ["0", "sin", "0"],
    ["30", "sin", "0.5"],
    ["45", "sin", "0.707106781"],
    ["60", "sin", "0.866025404"],
    ["90", "sin", "1"],
    ["180", "sin", "0"],
    ["270", "sin", "-1"],
    ["360", "sin", "0"],
    ["0", "cos", "1"],
    ["60", "cos", "0.5"],
    ["90", "cos", "0"],
    ["180", "cos", "-1"],
    ["270", "cos", "0"],
    ["360", "cos", "1"],
    ["0", "tan", "0"],
    ["45", "tan", "1"],
    ["135", "tan", "-1"],
    ["225", "tan", "1"],
    ["315", "tan", "-1"],
    ["90", "tan", "1633123935.8"], // Approximate large value due to tan(90) undefined
    ["270", "tan", "5443746451.6"], // Approximate large value due to tan(270) undefined
  ];
  trigTests.forEach(([deg, fn, expected]) => {
    it(`computes ${fn}(${deg})`, () => {
      const result = calculate({ next: deg, total: null, operation: null }, fn);
      if (fn === "tan" && (deg === "90" || deg === "270")) {
        expect(Math.abs(Number(result.total))).to.be.greaterThan(1e9);
      } else {
        expect(result.total).to.equal(expected);
      }
      expect(result.next).to.equal(null);
      expect(result.operation).to.equal(null);
    });
  });
  it('returns {} for sin/cos/tan with missing value', () => {
    expect(calculate({}, "sin")).to.deep.equal({});
    expect(calculate({ next: null, total: null, operation: null }, "cos")).to.deep.equal({});
    expect(calculate({ next: undefined, total: undefined, operation: undefined }, "tan")).to.deep.equal({});
  });
});
