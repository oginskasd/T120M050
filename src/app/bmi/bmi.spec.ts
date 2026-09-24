import { calculateBmi } from './bmi';

describe('calculateBmi', () => {
  it('divides weight in kilograms by height in metres squared', () => {
    expect(calculateBmi({ weightKg: 70, heightCm: 175 })).toBeCloseTo(22.86, 2);
  });

  it('returns weight when height is one metre', () => {
    expect(calculateBmi({ weightKg: 50, heightCm: 100 })).toBe(50);
  });
});
