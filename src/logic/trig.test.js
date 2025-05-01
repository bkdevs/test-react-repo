import calculate from "./calculate";
import chai from "chai";

chai.config.truncateThreshold = 0;
const expect = chai.expect;

function pressButtons(buttons) {
  const value = {};
  buttons.forEach((button) => {
    Object.assign(value, calculate(value, button));
  });
  Object.keys(value).forEach((key) => {
    if (value[key] === null) {
      delete value[key];
    }
  });
  return value;
}

describe("trigonometric functions (sin, cos, tan)", function () {
  it("sin(0) = 0", function () {
    const result = pressButtons(["0", "sin"]);
    expect(result).to.deep.equal({ total: "0" });
  });
  it("sin(90) ≈ 1", function () {
    const result = pressButtons(["90", "sin"]);
    expect(result.total).to.be.closeTo(1, 1e-9);
  });
  it("cos(0) = 1", function () {
    const result = pressButtons(["0", "cos"]);
    expect(result.total).to.be.closeTo(1, 1e-9);
  });
  it("cos(180) = -1", function () {
    const result = pressButtons(["180", "cos"]);
    expect(result.total).to.be.closeTo(-1, 1e-9);
  });
  it("tan(0) = 0", function () {
    const result = pressButtons(["0", "tan"]);
    expect(result).to.deep.equal({ total: "0" });
  });
  it("tan(45) ≈ 1", function () {
    const result = pressButtons(["45", "tan"]);
    expect(Number(result.total)).to.be.closeTo(1, 1e-9);
  });
  it("tan(90) = Infinity (should have large value)", function () {
    const result = pressButtons(["90", "tan"]);
    expect(Math.abs(Number(result.total))).to.be.greaterThan(1e8);
  });
  it("sin(-90) ≈ -1", function () {
    const result = pressButtons(["-90", "sin"]);
    expect(Number(result.total)).to.be.closeTo(-1, 1e-9);
  });
  it("cos(360) ≈ 1", function () {
    const result = pressButtons(["360", "cos"]);
    expect(Number(result.total)).to.be.closeTo(1, 1e-9);
  });
});
