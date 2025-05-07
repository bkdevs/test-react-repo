import Big from "big.js";

import operate from "./operate";
import isNumber from "./isNumber";

/**
 * Given a button name and a calculator data object, return an updated
 * calculator data object.
 *
 * Calculator data object contains:
 *   total:String      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 */
export default function calculate(obj, buttonName) {
  if (buttonName === "e") {
    // Insert Euler's number
    const E_VALUE = Math.E;
    if (obj.operation) {
      // Currently entering the right operand
      return { ...obj, next: E_VALUE.toString() };
    } else {
      // Entering a number before any operator
      return { total: null, next: E_VALUE.toString(), operation: null };
    }
  }
  if (["sin", "cos", "tan", "√"].includes(buttonName)) {
    // Supported scientific functions. Trig use radians; input is degrees. √ operates on present value.
    let value = null;
    if (obj.next !== null && obj.next !== undefined) {
      value = parseFloat(obj.next);
    } else if (obj.total !== null && obj.total !== undefined) {
      value = parseFloat(obj.total);
    }
    if (value === null || isNaN(value)) {
      return {};
    }
    let result = "";
    if (buttonName === "sin" || buttonName === "cos" || buttonName === "tan") {
      const radians = value * (Math.PI / 180);
      if (buttonName === "sin") {
        result = Math.sin(radians);
      } else if (buttonName === "cos") {
        result = Math.cos(radians);
      } else if (buttonName === "tan") {
        result = Math.tan(radians);
      }
      // Round trig result to avoid long decimals
      result = Math.round((result + Number.EPSILON) * 1000000000) / 1000000000;
    } else if (buttonName === "√") {
      if (value < 0) {
        result = "Error";
      } else {
        result = Math.sqrt(value);
        // Round root result to avoid long decimals
        result = Math.round((result + Number.EPSILON) * 1000000000) / 1000000000;
      }
    }
    return {
      total: result.toString(),
      next: null,
      operation: null,
    };
  }
  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null,
    };
  }

  if (isNumber(buttonName)) {
    if (buttonName === "0" && obj.next === "0") {
      return {};
    }
    // If there is an operation, update next
    if (obj.operation) {
      if (obj.next) {
        return { next: obj.next + buttonName };
      }
      return { next: buttonName };
    }
    // If there is no operation, update next and clear the value
    if (obj.next) {
      const next = obj.next === "0" ? buttonName : obj.next + buttonName;
      return {
        next,
        total: null,
      };
    }
    return {
      next: buttonName,
      total: null,
    };
  }

  if (buttonName === "%") {
    if (obj.operation && obj.next) {
      const result = operate(obj.total, obj.next, obj.operation);
      return {
        total: Big(result)
          .div(Big("100"))
          .toString(),
        next: null,
        operation: null,
      };
    }
    if (obj.next) {
      return {
        next: Big(obj.next)
          .div(Big("100"))
          .toString(),
      };
    }
    return {};
  }

  if (buttonName === ".") {
    if (obj.next) {
      // ignore a . if the next number already has one
      if (obj.next.includes(".")) {
        return {};
      }
      return { next: obj.next + "." };
    }
    return { next: "0." };
  }

  if (buttonName === "=") {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null,
      };
    } else {
      // '=' with no operation, nothing to do
      return {};
    }
  }

  if (buttonName === "+/-") {
    if (obj.next) {
      return { next: (-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { total: (-1 * parseFloat(obj.total)).toString() };
    }
    return {};
  }

  // Button must be an operation

  // When the user presses an operation button without having entered
  // a number first, do nothing.
  // if (!obj.next && !obj.total) {
  //   return {};
  // }

  // User pressed an operation button and there is an existing operation
  if (obj.operation) {
    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName,
    };
  }

  // no operation yet, but the user typed one

  // The user hasn't typed a number yet, just save the operation
  if (!obj.next) {
    return { operation: buttonName };
  }

  // save the operation and shift 'next' into 'total'
  return {
    total: obj.next,
    next: null,
    operation: buttonName,
  };
}
