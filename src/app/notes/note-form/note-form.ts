import { Component, output, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { FieldError } from '../../shared/field-error/field-error';
import { NoteDraft } from '../note';

const EMPTY_DRAFT: NoteDraft = { title: '', text: '' };

@Component({
  selector: 'app-note-form',
  imports: [FieldError, FormField, FormRoot],
  templateUrl: './note-form.html',
})
export class NoteForm {
  readonly added = output<NoteDraft>();

  private readonly draft = signal<NoteDraft>(EMPTY_DRAFT);

  protected readonly noteForm = form(
    this.draft,
    (path) => {
      required(path.title, { message: 'Įveskite antraštę' });
      required(path.text, { message: 'Įveskite tekstą' });
    },
    {
      submission: {
        action: async (field) => {
          this.added.emit(field().value());
          field().reset(EMPTY_DRAFT);
        },
      },
    },
  );
}
