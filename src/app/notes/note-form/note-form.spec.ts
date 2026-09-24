import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteForm } from './note-form';

describe('NoteForm', () => {
  let fixture: ComponentFixture<NoteForm>;
  let element: HTMLElement;
  let titleInput: HTMLInputElement;
  let textInput: HTMLTextAreaElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(NoteForm);
    element = fixture.nativeElement;
    await fixture.whenStable();
    titleInput = element.querySelector('input')!;
    textInput = element.querySelector('textarea')!;
  });

  function enterValue(field: HTMLInputElement | HTMLTextAreaElement, value: string): void {
    field.value = value;
    field.dispatchEvent(new Event('input'));
  }

  async function submit(): Promise<void> {
    element.querySelector('button')!.click();
    await fixture.whenStable();
  }

  it('emits the note and clears the form when submitted', async () => {
    const added = vi.fn();
    fixture.componentInstance.added.subscribe(added);

    enterValue(titleInput, 'Shopping');
    enterValue(textInput, 'Milk, bread');
    await submit();

    expect(added).toHaveBeenCalledWith({ title: 'Shopping', text: 'Milk, bread' });
    expect(titleInput.value).toBe('');
    expect(textInput.value).toBe('');
    expect(element.querySelector('[role="alert"]')).toBeNull();
  });

  it('shows errors and does not emit when fields are empty', async () => {
    const added = vi.fn();
    fixture.componentInstance.added.subscribe(added);

    await submit();

    expect(added).not.toHaveBeenCalled();
    expect(element.textContent).toContain('Įveskite antraštę');
    expect(element.textContent).toContain('Įveskite tekstą');
  });
});
