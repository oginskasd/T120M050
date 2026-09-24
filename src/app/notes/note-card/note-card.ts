import { Component, input, output } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.html',
})
export class NoteCard {
  readonly note = input.required<Note>();
  readonly removed = output<void>();
}
