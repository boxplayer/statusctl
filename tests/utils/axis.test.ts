import { describe, it, expect } from 'vitest';
import { makeFxAxis } from '../../utils/axis';

describe('makeFxAxis', () => {
  it('should create axis with proper domain and ticks for simple values', () => {
    const values = [4.85, 4.87, 4.90];
    const result = makeFxAxis(values);
    
    expect(result.domain).toEqual([4.84, 4.90]);
    expect(result.ticks).toContain(4.85);
    expect(result.ticks).toContain(4.86);
    expect(result.ticks).toContain(4.87);
    expect(result.ticks).toContain(4.88);
    expect(result.ticks).toContain(4.89);
    expect(result.ticks).toContain(4.90);
  });

  it('should snap floor and ceiling to nearest 0.01', () => {
    const values = [4.856, 4.894];
    const result = makeFxAxis(values);
    
    expect(result.domain[0]).toBeCloseTo(4.85, 2);
    expect(result.domain[1]).toBe(4.90);
  });

  it('should handle single value', () => {
    const values = [4.87];
    const result = makeFxAxis(values);
    
    expect(result.domain).toEqual([4.87, 4.87]);
    expect(result.ticks).toEqual([4.87]);
  });

  it('should handle values requiring rounding', () => {
    const values = [1.234, 1.267];
    const result = makeFxAxis(values);
    
    expect(result.domain[0]).toBe(1.23);
    expect(result.domain[1]).toBe(1.27);
    expect(result.ticks).toEqual([1.23, 1.24, 1.25, 1.26, 1.27]);
  });

  it('should handle negative values', () => {
    const values = [-0.015, -0.005];
    const result = makeFxAxis(values);
    
    expect(result.domain[0]).toBe(-0.02);
    expect(result.domain[1]).toBeCloseTo(0.00, 2);
    expect(result.ticks).toEqual([-0.02, -0.01, 0.00]);
  });

  it('should handle large range', () => {
    const values = [1.00, 2.00];
    const result = makeFxAxis(values);
    
    expect(result.domain).toEqual([1.00, 2.00]);
    expect(result.ticks).toHaveLength(101); // 1.00 to 2.00 in 0.01 steps
    expect(result.ticks[0]).toBe(1.00);
    expect(result.ticks[result.ticks.length - 1]).toBe(2.00);
  });
});