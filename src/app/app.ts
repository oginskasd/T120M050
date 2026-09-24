import { Component, inject } from '@angular/core';
import { NoteForm } from './notes/note-form/note-form';
import { NoteList } from './notes/note-list/note-list';
import { NoteStore } from './notes/note-store';

@Component({
  selector: 'app-root',
  imports: [NoteForm, NoteList],
  templateUrl: './app.html',
})
export class App {
  protected readonly noteStore = inject(NoteStore);
}
