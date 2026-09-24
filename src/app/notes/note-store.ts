import { Service, signal } from '@angular/core';
import { Note, NoteDraft } from './note';

const STORAGE_KEY = 'notes';

@Service()
export class NoteStore {
  private readonly notesState = signal<Note[]>(this.load());
  readonly notes = this.notesState.asReadonly();

  add(draft: NoteDraft): void {
    this.save([{ id: crypto.randomUUID(), ...draft }, ...this.notes()]);
  }

  remove(id: string): void {
    this.save(this.notes().filter((note) => note.id !== id));
  }

  private load(): Note[] {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  private save(notes: Note[]): void {
    this.notesState.set(notes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }
}
