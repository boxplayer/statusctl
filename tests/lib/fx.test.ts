import { describe, it, expect } from 'vitest';
import { normaliseNbp, type NBPRate } from '../../lib/fx';

describe('normaliseNbp', () => {
  it('should normalize NBP response to FxSeries format', () => {
    const mockNbpData: NBPRate = {
      table: 'A',
      currency: 'British Pound',
      code: 'GBP',
      rates: [
        { no: '001/A/NBP/2024', effectiveDate: '2024-01-01', mid: 4.85 },
        { no: '002/A/NBP/2024', effectiveDate: '2024-01-02', mid: 4.87 },
        { no: '003/A/NBP/2024', effectiveDate: '2024-01-03', mid: 4.90 },
      ],
    };

    const result = normaliseNbp(mockNbpData);

    expect(result.pair).toBe('GBP/PLN');
    expect(result.latest).toEqual({ date: '2024-01-03', rate: 4.90 });
    expect(result.history).toEqual([
      { date: '2024-01-01', rate: 4.85 },
      { date: '2024-01-02', rate: 4.87 },
      { date: '2024-01-03', rate: 4.90 },
    ]);
  });

  it('should sort rates by date chronologically', () => {
    const mockNbpData: NBPRate = {
      table: 'A',
      currency: 'US Dollar',
      code: 'USD',
      rates: [
        { no: '003/A/NBP/2024', effectiveDate: '2024-01-03', mid: 4.20 },
        { no: '001/A/NBP/2024', effectiveDate: '2024-01-01', mid: 4.15 },
        { no: '002/A/NBP/2024', effectiveDate: '2024-01-02', mid: 4.18 },
      ],
    };

    const result = normaliseNbp(mockNbpData);

    expect(result.history).toEqual([
      { date: '2024-01-01', rate: 4.15 },
      { date: '2024-01-02', rate: 4.18 },
      { date: '2024-01-03', rate: 4.20 },
    ]);
    expect(result.latest).toEqual({ date: '2024-01-03', rate: 4.20 });
  });

  it('should handle single rate entry', () => {
    const mockNbpData: NBPRate = {
      table: 'A',
      currency: 'Euro',
      code: 'EUR',
      rates: [
        { no: '001/A/NBP/2024', effectiveDate: '2024-01-01', mid: 4.55 },
      ],
    };

    const result = normaliseNbp(mockNbpData);

    expect(result.pair).toBe('EUR/PLN');
    expect(result.latest).toEqual({ date: '2024-01-01', rate: 4.55 });
    expect(result.history).toEqual([{ date: '2024-01-01', rate: 4.55 }]);
  });

  it('should handle different currency codes', () => {
    const mockNbpData: NBPRate = {
      table: 'A',
      currency: 'Swiss Franc',
      code: 'CHF',
      rates: [
        { no: '001/A/NBP/2024', effectiveDate: '2024-01-01', mid: 4.75 },
      ],
    };

    const result = normaliseNbp(mockNbpData);

    expect(result.pair).toBe('CHF/PLN');
  });

  it('should preserve original rate values without modification', () => {
    const mockNbpData: NBPRate = {
      table: 'A',
      currency: 'Japanese Yen',
      code: 'JPY',
      rates: [
        { no: '001/A/NBP/2024', effectiveDate: '2024-01-01', mid: 0.02756 },
        { no: '002/A/NBP/2024', effectiveDate: '2024-01-02', mid: 0.02789 },
      ],
    };

    const result = normaliseNbp(mockNbpData);

    expect(result.history[0].rate).toBe(0.02756);
    expect(result.history[1].rate).toBe(0.02789);
    expect(result.latest.rate).toBe(0.02789);
  });
});