import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-bmi-result',
  imports: [DecimalPipe],
  templateUrl: './bmi-result.html',
  host: { class: 'block' },
})
export class BmiResult {
  readonly bmi = input.required<number>();
}
