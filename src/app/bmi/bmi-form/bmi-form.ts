import { Component, output, signal } from '@angular/core';
import { form, FormRoot, max, min, required } from '@angular/forms/signals';
import { NumberField } from '../../shared/number-field/number-field';
import { BodyMeasurements } from '../bmi';

interface BmiFormModel {
  weightKg: number | null;
  heightCm: number | null;
}

@Component({
  selector: 'app-bmi-form',
  imports: [FormRoot, NumberField],
  templateUrl: './bmi-form.html',
})
export class BmiForm {
  readonly submitted = output<BodyMeasurements>();

  private readonly model = signal<BmiFormModel>({ weightKg: null, heightCm: null });

  protected readonly bmiForm = form(
    this.model,
    (path) => {
      required(path.weightKg, { message: 'Įveskite svorį' });
      min(path.weightKg, 1, { message: 'Svoris turi būti ne mažesnis nei 1 kg' });
      max(path.weightKg, 500, { message: 'Svoris turi būti ne didesnis nei 500 kg' });

      required(path.heightCm, { message: 'Įveskite ūgį' });
      min(path.heightCm, 50, { message: 'Ūgis turi būti ne mažesnis nei 50 cm' });
      max(path.heightCm, 300, { message: 'Ūgis turi būti ne didesnis nei 300 cm' });
    },
    {
      submission: {
        action: async (field) => {
          const { weightKg, heightCm } = field().value();
          if (weightKg !== null && heightCm !== null) {
            this.submitted.emit({ weightKg, heightCm });
          }
        },
      },
    },
  );
}
