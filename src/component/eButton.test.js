import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

it("inserts Euler's number (e) when 'e' button is clicked", () => {
  const { getByText } = render(<App />);
  const eButton = getByText("e");
  fireEvent.click(eButton);
  // Euler's number value as string
  const eValue = Math.E.toString();
  // At least the start of the value should be present in the display
  expect(document.body.textContent.includes(eValue.substring(0, 6))).toBe(true);
});
