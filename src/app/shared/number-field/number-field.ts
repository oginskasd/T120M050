import { Component, computed, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-number-field',
  imports: [FormField],
  templateUrl: './number-field.html',
  host: { class: 'block' },
})
export class NumberField {
  readonly field = input.required<FieldTree<number | null>>();
  readonly label = input.required<string>();
  readonly placeholder = input('');

  protected readonly errorMessage = computed(() => {
    const state = this.field()();
    return state.touched() ? state.errors()[0]?.message : undefined;
  });
}
