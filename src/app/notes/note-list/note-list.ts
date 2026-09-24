import { Component, input, output } from '@angular/core';
import { Note } from '../note';
import { NoteCard } from '../note-card/note-card';

@Component({
  selector: 'app-note-list',
  imports: [NoteCard],
  templateUrl: './note-list.html',
})
export class NoteList {
  readonly notes = input.required<Note[]>();
  readonly removed = output<string>();
}
