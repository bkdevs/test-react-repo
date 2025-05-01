import calculate from './calculate';

describe('Trigonometric functions in calculate()', () => {
  test('sin(0) = 0', () => {
    const result = calculate({ next: '0' }, 'sin');
    expect(result.total).toBe('0');
  });

  test('sin(30) ≈ 0.5', () => {
    const result = calculate({ next: '30' }, 'sin');
    expect(result.total).toBe('0.5');
  });

  test('sin(90) ≈ 1', () => {
    const result = calculate({ next: '90' }, 'sin');
    expect(result.total).toBe('1');
  });

  test('cos(0) = 1', () => {
    const result = calculate({ next: '0' }, 'cos');
    expect(result.total).toBe('1');
  });

  test('cos(60) ≈ 0.5', () => {
    const result = calculate({ next: '60' }, 'cos');
    expect(result.total).toBe('0.5');
  });

  test('cos(90) = 0', () => {
    const result = calculate({ next: '90' }, 'cos');
    expect(result.total).toBe('0');
  });

  test('tan(0) = 0', () => {
    const result = calculate({ next: '0' }, 'tan');
    expect(result.total).toBe('0');
  });

  test('tan(45) = 1', () => {
    const result = calculate({ next: '45' }, 'tan');
    expect(result.total).toBe('1');
  });

  test('tan(90) returns a large value (simulate infinity)', () => {
    const result = calculate({ next: '90' }, 'tan');
    // Math.tan(90deg) in JS is a huge number, not Infinity
    expect(parseFloat(result.total)).toBeGreaterThan(1e9);
  });

  test('Handles next as undefined, uses total', () => {
    const result = calculate({ total: '30', next: undefined }, 'sin');
    expect(result.total).toBe('0.5');
  });

  test('Returns empty object if both next and total missing', () => {
    const result = calculate({}, 'sin');
    expect(result).toEqual({});
  });

  test('Handles non-numeric input safely', () => {
    const result = calculate({ next: 'foo' }, 'sin');
    expect(result).toEqual({});
  });
});
