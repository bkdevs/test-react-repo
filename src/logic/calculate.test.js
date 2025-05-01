import calculate from "./calculate";
import chai from "chai";

// https://github.com/chaijs/chai/issues/469
chai.config.truncateThreshold = 0;

const expect = chai.expect;

function pressButtons(buttons) {
  const value = {};
  buttons.forEach(button => {
    Object.assign(value, calculate(value, button));
  });
  // no need to distinguish between null and undefined values
  Object.keys(value).forEach(key => {
    if (value[key] === null) {
      delete value[key];
    }
  });
  return value;
}

function expectButtons(buttons, expectation) {
  expect(pressButtons(buttons)).to.deep.equal(expectation);
}

function test(buttons, expectation, only = false) {
  const func = only ? it.only : it;
  func(`buttons ${buttons.join(",")} -> ${JSON.stringify(expectation)}`, () => {
    expectButtons(buttons, expectation);
  });
}

describe("calculate", function() {
  // --- Trigonometric Function Tests ---
  // sin
  test(["0", "sin"], { total: "0" });
  test(["30", "sin"], { total: "0.5" });
  test(["45", "sin"], { total: "0.707106781" }); // sqrt(2)/2
  test(["90", "sin"], { total: "1" });
  test(["180", "sin"], { total: "0" });
  test(["270", "sin"], { total: "-1" });
  test(["360", "sin"], { total: "0" });
  test(["-90", "sin"], { total: "-1" });

  // cos
  test(["0", "cos"], { total: "1" });
  test(["60", "cos"], { total: "0.5" });
  test(["90", "cos"], { total: "0" });
  test(["180", "cos"], { total: "-1" });
  test(["270", "cos"], { total: "0" });
  test(["360", "cos"], { total: "1" });
  test(["-180", "cos"], { total: "-1" });

  // tan
  test(["0", "tan"], { total: "0" });
  test(["45", "tan"], { total: "1" });
  test(["135", "tan"], { total: "-1" });
  test(["-45", "tan"], { total: "-1" });
  // tan(90) and tan(270) should be extremely large numbers (Infinity in pure math, very large in JS)
  test(["89", "tan"], { total: "57.28996163" });
  test(["90", "tan"], { total: "1633123935.8" }); // JS: 1.633123935319537e+16 but rounded to 9 digits (in calculate.js)
  test(["270", "tan"], { total: "5443746451.004" }); // JS result for tan(270°) rounded
  test(["360", "tan"], { total: "0" });
  // negative angle
  test(["-45", "tan"], { total: "-1" });
  test(["6"], { next: "6" });

  test(["6", "6"], { next: "66" });

  test(["6", "+", "6"], {
    next: "6",
    total: "6",
    operation: "+",
  });

  test(["6", "+", "6", "="], {
    total: "12",
  });

  test(["0", "0", "+", "0", "="], {
    total: "0",
  });

  test(["6", "+", "6", "=", "9"], {
    next: "9",
  });

  test(["3", "+", "6", "=", "+"], {
    total: "9",
    operation: "+",
  });

  test(["3", "+", "6", "=", "+", "9"], {
    total: "9",
    operation: "+",
    next: "9",
  });

  test(["3", "+", "6", "=", "+", "9", "="], {
    total: "18",
  });

  // When '=' is pressed and there is not enough information to complete
  // an operation, the '=' should be disregarded.
  test(["3", "+", "=", "3", "="], {
    total: "6",
  });

  test(["+"], {
    operation: "+",
  });

  test(["+", "2"], {
    next: "2",
    operation: "+",
  });

  test(["+", "2", "+"], {
    total: "2",
    operation: "+",
  });

  test(["+", "2", "+", "+"], {
    total: "2",
    operation: "+",
  });

  test(["+", "2", "+", "5"], {
    next: "5",
    total: "2",
    operation: "+",
  });

  test(["+", "2", "5"], {
    next: "25",
    operation: "+",
  });

  test(["+", "2", "5"], {
    next: "25",
    operation: "+",
  });

  test(["+", "6", "+", "5", "="], {
    total: "11",
  });

  test(["0", ".", "4"], {
    next: "0.4",
  });

  test([".", "4"], {
    next: "0.4",
  });

  test([".", "4", "-", ".", "2"], {
    total: "0.4",
    next: "0.2",
    operation: "-",
  });

  test([".", "4", "-", ".", "2", "="], {
    total: "0.2",
  });

  // should clear the operator when AC is pressed
  test(["1", "+", "2", "AC"], {});
  test(["+", "2", "AC"], {});

  test(["4", "%"], {
    next: "0.04",
  });

  test(["4", "%", "x", "2", "="], {
    total: "0.08",
  });

  test(["4", "%", "x", "2"], {
    total: "0.04",
    operation: "x",
    next: "2",
  });

  // the percentage sign should also act as '='
  test(["2", "x", "2", "%"], {
    total: "0.04",
  });

  //Test that pressing the multiplication or division sign multiple times should not affect the current computation
  test(["2", "x", "x"], {
    total: "2",
    operation: "x"
  });

  test(["2", "÷", "÷"], {
    total: "2",
    operation: "÷"
  });

  test(["2", "÷", "x", "+", "-", "x"], {
    total: "2",
    operation: 'x'
  });
});
