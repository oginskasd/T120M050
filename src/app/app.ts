import { Component, signal } from '@angular/core';
import { BodyMeasurements, calculateBmi } from './bmi/bmi';
import { BmiForm } from './bmi/bmi-form/bmi-form';
import { BmiResult } from './bmi/bmi-result/bmi-result';

@Component({
  selector: 'app-root',
  imports: [BmiForm, BmiResult],
  templateUrl: './app.html',
})
export class App {
  protected readonly bmi = signal<number | null>(null);

  protected showBmi(measurements: BodyMeasurements): void {
    this.bmi.set(calculateBmi(measurements));
  }
}
