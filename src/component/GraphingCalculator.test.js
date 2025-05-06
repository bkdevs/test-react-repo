import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import GraphingCalculator from './GraphingCalculator';

describe('GraphingCalculator', () => {
  test('renders input and plot button', () => {
    render(<GraphingCalculator />);
    expect(screen.getByPlaceholderText(/enter equation/i)).toBeInTheDocument();
    expect(screen.getByText(/plot/i)).toBeInTheDocument();
  });
  test('plots a valid equation', () => {
    render(<GraphingCalculator />);
    const input = screen.getByPlaceholderText(/enter equation/i);
    fireEvent.change(input, {target:{value:'sin(x)'}});
    fireEvent.click(screen.getByText(/plot/i));
    expect(screen.getByText(/sin\(x\)/i)).toBeInTheDocument();
  });
  test('shows error for invalid equation', () => {
    render(<GraphingCalculator />);
    const input = screen.getByPlaceholderText(/enter equation/i);
    fireEvent.change(input, {target:{value:'$$$'}});
    fireEvent.click(screen.getByText(/plot/i));
    expect(screen.getByText(/invalid equation/i)).toBeInTheDocument();
  });
  test('can clear all plotted equations', () => {
    render(<GraphingCalculator />);
    const input = screen.getByPlaceholderText(/enter equation/i);
    fireEvent.change(input, {target:{value:'x^2'}});
    fireEvent.click(screen.getByText(/plot/i));
    fireEvent.click(screen.getByText(/clear all/i));
    expect(screen.queryByText(/x\^2/)).not.toBeInTheDocument();
  });
});
