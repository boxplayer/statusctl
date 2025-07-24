import { describe, it, expect } from 'vitest';
import { prepTodayBars, prepTrend, type PollenDaily } from '../../lib/pollen';

describe('prepTodayBars', () => {
  it('should filter and transform pollen data for today bars', () => {
    const mockDaily: PollenDaily = {
      date: { year: 2024, month: 7, day: 15 },
      pollenTypeInfo: [
        {
          code: 'GRASS',
          displayName: 'Grass',
          inSeason: true,
          indexInfo: {
            code: 'UPI',
            displayName: 'Universal Pollen Index',
            value: 3,
            category: 'Moderate',
            indexDescription: 'Moderate pollen levels',
            color: { red: 251, green: 191, blue: 36 },
          },
        },
        {
          code: 'TREE',
          displayName: 'Tree',
          inSeason: true,
          indexInfo: {
            code: 'UPI',
            displayName: 'Universal Pollen Index',
            value: 1,
            category: 'Low',
            indexDescription: 'Low pollen levels',
            color: { red: 52, green: 211, blue: 153 },
          },
        },
        {
          code: 'WEED',
          displayName: 'Weed',
          inSeason: false,
          indexInfo: {
            code: 'UPI',
            displayName: 'Universal Pollen Index',
            value: 0,
            category: 'None',
            indexDescription: 'No pollen',
            color: { red: 209, green: 213, blue: 219 },
          },
        },
        {
          code: 'OTHER',
          displayName: 'Other',
          inSeason: true,
          indexInfo: {
            code: 'UPI',
            displayName: 'Universal Pollen Index',
            value: 2,
            category: 'Low',
            indexDescription: 'Low pollen levels',
            color: { red: 52, green: 211, blue: 153 },
          },
        },
      ],
      plantInfo: [],
    };

    const result = prepTodayBars(mockDaily);

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      {
        name: 'Grass',
        value: 3,
        category: 'Moderate',
        color: '#fbbf24',
      },
      {
        name: 'Tree',
        value: 1,
        category: 'Low',
        color: '#34d399',
      },
      {
        name: 'Weed',
        value: 0,
        category: 'None',
        color: '#d1d5db',
      },
    ]);
  });

  it('should handle missing pollenTypeInfo', () => {
    const mockDaily: PollenDaily = {
      date: { year: 2024, month: 7, day: 15 },
      pollenTypeInfo: [],
      plantInfo: [],
    };

    const result = prepTodayBars(mockDaily);

    expect(result).toEqual([]);
  });

  it('should handle null daily data', () => {
    const result = prepTodayBars(null as any);

    expect(result).toEqual([]);
  });

  it('should filter out entries without indexInfo', () => {
    const mockDaily: PollenDaily = {
      date: { year: 2024, month: 7, day: 15 },
      pollenTypeInfo: [
        {
          code: 'GRASS',
          displayName: 'Grass',
          inSeason: true,
          indexInfo: {
            code: 'UPI',
            displayName: 'Universal Pollen Index',
            value: 3,
            category: 'Moderate',
            indexDescription: 'Moderate pollen levels',
            color: { red: 251, green: 191, blue: 36 },
          },
        },
        {
          code: 'TREE',
          displayName: 'Tree',
          inSeason: true,
          indexInfo: null as any,
        },
      ],
      plantInfo: [],
    };

    const result = prepTodayBars(mockDaily);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Grass');
  });

  it('should use default color for unknown categories', () => {
    const mockDaily: PollenDaily = {
      date: { year: 2024, month: 7, day: 15 },
      pollenTypeInfo: [
        {
          code: 'GRASS',
          displayName: 'Grass',
          inSeason: true,
          indexInfo: {
            code: 'UPI',
            displayName: 'Universal Pollen Index',
            value: 3,
            category: 'Unknown Category' as any,
            indexDescription: 'Unknown levels',
            color: { red: 251, green: 191, blue: 36 },
          },
        },
      ],
      plantInfo: [],
    };

    const result = prepTodayBars(mockDaily);

    expect(result[0].color).toBe('#d1d5db');
  });
});

describe('prepTrend', () => {
  it('should transform outlook data to trend format', () => {
    const mockOutlook: PollenDaily[] = [
      {
        date: { year: 2024, month: 7, day: 15 },
        pollenTypeInfo: [
          {
            code: 'GRASS',
            displayName: 'Grass',
            inSeason: true,
            indexInfo: {
              code: 'UPI',
              displayName: 'Universal Pollen Index',
              value: 3,
              category: 'Moderate',
              indexDescription: 'Moderate pollen levels',
              color: { red: 251, green: 191, blue: 36 },
            },
          },
          {
            code: 'TREE',
            displayName: 'Tree',
            inSeason: true,
            indexInfo: {
              code: 'UPI',
              displayName: 'Universal Pollen Index',
              value: 1,
              category: 'Low',
              indexDescription: 'Low pollen levels',
              color: { red: 52, green: 211, blue: 153 },
            },
          },
          {
            code: 'WEED',
            displayName: 'Weed',
            inSeason: false,
            indexInfo: {
              code: 'UPI',
              displayName: 'Universal Pollen Index',
              value: 2,
              category: 'Low',
              indexDescription: 'Low pollen levels',
              color: { red: 52, green: 211, blue: 153 },
            },
          },
        ],
        plantInfo: [],
      },
      {
        date: { year: 2024, month: 7, day: 16 },
        pollenTypeInfo: [
          {
            code: 'GRASS',
            displayName: 'Grass',
            inSeason: true,
            indexInfo: {
              code: 'UPI',
              displayName: 'Universal Pollen Index',
              value: 4,
              category: 'High',
              indexDescription: 'High pollen levels',
              color: { red: 248, green: 113, blue: 113 },
            },
          },
        ],
        plantInfo: [],
      },
    ];

    const result = prepTrend(mockOutlook);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      day: '2024-07-14T22:00:00.000Z',
      GRASS: 3,
      WEED: 2,
      TREE: 1,
    });
    expect(result[1]).toEqual({
      day: '2024-07-15T22:00:00.000Z',
      GRASS: 4,
      WEED: 0,
      TREE: 0,
    });
  });

  it('should handle null outlook data', () => {
    const result = prepTrend(null as any);

    expect(result).toEqual([]);
  });

  it('should filter out entries without valid date or indexInfo', () => {
    const mockOutlook: PollenDaily[] = [
      {
        date: null as any,
        pollenTypeInfo: [],
        plantInfo: [],
      },
      {
        date: { year: 2024, month: 7, day: 15 },
        pollenTypeInfo: [],
        plantInfo: [],
      },
      {
        date: { year: 2024, month: 7, day: 16 },
        pollenTypeInfo: [
          {
            code: 'GRASS',
            displayName: 'Grass',
            inSeason: true,
            indexInfo: {
              code: 'UPI',
              displayName: 'Universal Pollen Index',
              value: 3,
              category: 'Moderate',
              indexDescription: 'Moderate pollen levels',
              color: { red: 251, green: 191, blue: 36 },
            },
          },
        ],
        plantInfo: [],
      },
    ];

    const result = prepTrend(mockOutlook);

    expect(result).toHaveLength(1);
    expect(result[0].day).toBe('2024-07-15T22:00:00.000Z');
  });

  it('should default to 0 for missing pollen types', () => {
    const mockOutlook: PollenDaily[] = [
      {
        date: { year: 2024, month: 7, day: 15 },
        pollenTypeInfo: [
          {
            code: 'GRASS',
            displayName: 'Grass',
            inSeason: true,
            indexInfo: {
              code: 'UPI',
              displayName: 'Universal Pollen Index',
              value: 3,
              category: 'Moderate',
              indexDescription: 'Moderate pollen levels',
              color: { red: 251, green: 191, blue: 36 },
            },
          },
        ],
        plantInfo: [],
      },
    ];

    const result = prepTrend(mockOutlook);

    expect(result[0]).toEqual({
      day: '2024-07-14T22:00:00.000Z',
      GRASS: 3,
      WEED: 0,
      TREE: 0,
    });
  });
});