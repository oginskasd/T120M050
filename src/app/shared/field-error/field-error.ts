import { Component, computed, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.html',
})
export class FieldError {
  readonly field = input.required<FieldTree<string>>();

  protected readonly message = computed(() => {
    const state = this.field()();
    return state.touched() ? state.errors()[0]?.message : undefined;
  });
}
