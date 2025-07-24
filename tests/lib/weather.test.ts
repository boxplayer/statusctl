import { describe, it, expect, vi, beforeEach } from 'vitest';
import { weatherSummarySchema, fetchForecast } from '../../lib/weather';

// Mock fetch globally
global.fetch = vi.fn();

describe('weatherSummarySchema', () => {
  it('should validate correct weather summary data', () => {
    const validData = {
      current: 22.5,
      hourly: [
        { hour: '09', temp: 20, wind: 5, rainFlag: false },
        { hour: '12', temp: 25, wind: 8, rainFlag: true },
        { hour: '15', temp: 28, wind: 10, rainFlag: false },
      ],
    };

    const result = weatherSummarySchema.safeParse(validData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it('should reject invalid current temperature', () => {
    const invalidData = {
      current: 'not-a-number',
      hourly: [],
    };

    const result = weatherSummarySchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });

  it('should reject invalid hourly data structure', () => {
    const invalidData = {
      current: 22.5,
      hourly: [
        { hour: '09', temp: 'invalid', wind: 5, rainFlag: false },
      ],
    };

    const result = weatherSummarySchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });

  it('should reject missing required fields', () => {
    const invalidData = {
      current: 22.5,
    };

    const result = weatherSummarySchema.safeParse(invalidData);

    expect(result.success).toBe(false);
  });
});

describe('fetchForecast', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch and transform weather data successfully', async () => {
    const mockApiResponse = {
      current_weather: {
        temperature: 22.5,
      },
      hourly: {
        time: [
          '2024-07-15T09:00',
          '2024-07-15T12:00',
          '2024-07-15T15:00',
          '2024-07-15T18:00',
          '2024-07-15T21:00',
          '2024-07-16T00:00',
        ],
        temperature_2m: [20.1, 24.8, 27.5, 25.2, 22.0, 19.5],
        precipitation_probability: [10, 45, 20, 60, 35, 15],
        wind_speed_10m: [5.2, 7.8, 9.1, 6.5, 4.3, 3.8],
      },
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    // Mock date to ensure consistent testing
    const mockDate = new Date('2024-07-15T10:00:00Z');
    vi.setSystemTime(mockDate);

    const result = await fetchForecast();

    expect(result.current).toBe(22.5);
    expect(result.hourly).toHaveLength(5);
    expect(result.hourly[0]).toEqual({
      hour: '09',
      temp: 20,
      wind: 5,
      rainFlag: false,
    });
    expect(result.hourly[1]).toEqual({
      hour: '12',
      temp: 25,
      wind: 8,
      rainFlag: true, // 45% >= 40% threshold
    });
  });

  it('should throw error when API response is not ok', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchForecast()).rejects.toThrow('weather-api-fail');
  });

  it('should throw error when response data is invalid', async () => {
    const invalidApiResponse = {
      current_weather: {
        // missing temperature
      },
      hourly: {
        time: [],
        temperature_2m: [],
        precipitation_probability: [],
        wind_speed_10m: [],
      },
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(invalidApiResponse),
    });

    await expect(fetchForecast()).rejects.toThrow('weather-data-invalid');
  });

  it('should build correct API URL with custom parameters', async () => {
    const mockApiResponse = {
      current_weather: { temperature: 22.5 },
      hourly: {
        time: [],
        temperature_2m: [],
        precipitation_probability: [],
        wind_speed_10m: [],
      },
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    await fetchForecast(50.0, 14.0, 'Europe/Prague');

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('latitude=50'),
      expect.any(Object)
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('longitude=14'),
      expect.any(Object)
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('timezone=Europe/Prague'),
      expect.any(Object)
    );
  });

  it('should handle missing hourly data gracefully', async () => {
    const mockApiResponse = {
      current_weather: {
        temperature: 22.5,
      },
      hourly: {
        time: ['2024-07-15T09:00'],
        temperature_2m: [20.1],
        precipitation_probability: [10],
        wind_speed_10m: [5.2],
      },
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    const mockDate = new Date('2024-07-15T10:00:00Z');
    vi.setSystemTime(mockDate);

    const result = await fetchForecast();

    expect(result.current).toBe(22.5);
    expect(result.hourly).toHaveLength(1);
  });
});