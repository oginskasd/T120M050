export interface BodyMeasurements {
  weightKg: number;
  heightCm: number;
}

export function calculateBmi({ weightKg, heightCm }: BodyMeasurements): number {
  const heightM = heightCm / 100;
  return weightKg / heightM ** 2;
}
