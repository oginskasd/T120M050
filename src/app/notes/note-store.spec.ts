import { TestBed } from '@angular/core/testing';
import { NoteStore } from './note-store';

describe('NoteStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with no notes', () => {
    expect(TestBed.inject(NoteStore).notes()).toEqual([]);
  });

  it('adds new notes to the top of the list', () => {
    const store = TestBed.inject(NoteStore);

    store.add({ title: 'First', text: 'One' });
    store.add({ title: 'Second', text: 'Two' });

    expect(store.notes().map((note) => note.title)).toEqual(['Second', 'First']);
  });

  it('removes a note by id', () => {
    const store = TestBed.inject(NoteStore);
    store.add({ title: 'Keep', text: 'Stay' });
    store.add({ title: 'Delete', text: 'Go' });

    store.remove(store.notes()[0].id);

    expect(store.notes().map((note) => note.title)).toEqual(['Keep']);
  });

  it('saves notes to localStorage', () => {
    const store = TestBed.inject(NoteStore);

    store.add({ title: 'Saved', text: 'Stored' });

    expect(JSON.parse(localStorage.getItem('notes')!)).toEqual(store.notes());
  });

  it('loads saved notes from localStorage', () => {
    const saved = [{ id: '1', title: 'Saved', text: 'Stored' }];
    localStorage.setItem('notes', JSON.stringify(saved));

    expect(TestBed.inject(NoteStore).notes()).toEqual(saved);
  });
});
