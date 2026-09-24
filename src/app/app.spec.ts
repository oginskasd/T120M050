import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let element: HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    fixture = TestBed.createComponent(App);
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  async function addNote(title: string, text: string): Promise<void> {
    const titleInput = element.querySelector('input')!;
    const textInput = element.querySelector('textarea')!;
    titleInput.value = title;
    titleInput.dispatchEvent(new Event('input'));
    textInput.value = text;
    textInput.dispatchEvent(new Event('input'));
    element.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();
  }

  it('shows a message when there are no notes', () => {
    expect(element.textContent).toContain('Užrašų dar nėra');
  });

  it('adds a note to the list', async () => {
    await addNote('Shopping', 'Milk, bread');

    const card = element.querySelector('app-note-card');
    expect(card?.textContent).toContain('Shopping');
    expect(card?.textContent).toContain('Milk, bread');
  });

  it('removes a note from the list', async () => {
    await addNote('Shopping', 'Milk, bread');

    element.querySelector<HTMLButtonElement>('app-note-card button')!.click();
    await fixture.whenStable();

    expect(element.querySelector('app-note-card')).toBeNull();
    expect(element.textContent).toContain('Užrašų dar nėra');
  });
});
