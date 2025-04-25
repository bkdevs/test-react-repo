import Big from "big.js";

export default function operate(numberOne, numberTwo, operation) {
  const one = Big(numberOne || "0");
  const two = Big(numberTwo || (operation === "÷" || operation === 'x' ? "1": "0")); //If dividing or multiplying, then 1 maintains current value in cases of null
  if (operation === "+") {
    return one.plus(two).toString();
  }
  if (operation === "-") {
    return one.minus(two).toString();
  }
  if (operation === "x") {
    return one.times(two).toString();
  }
  if (operation === "÷") {
    if (two === "0") {
      alert("Divide by 0 error");
      return "0";
    } else {
      return one.div(two).toString();
    }
  }
  // Trigonometric functions (expect input in degrees)
  if (operation === "sin") {
    // Convert degrees to radians
    const radians = one.times(Math.PI).div(180).toNumber();
    return Math.sin(radians).toString();
  }
  if (operation === "cos") {
    const radians = one.times(Math.PI).div(180).toNumber();
    return Math.cos(radians).toString();
  }
  if (operation === "tan") {
    // For tan(90 + k*180) degrees, handle infinity (undefined)
    const degrees = one.mod(180).toNumber();
    if (Math.abs(degrees - 90) < 1e-9) {
      return "Error";
    }
    const radians = one.times(Math.PI).div(180).toNumber();
    return Math.tan(radians).toString();
  }
  throw Error(`Unknown operation '${operation}'`);
}
