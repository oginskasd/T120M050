import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmiForm } from './bmi-form';

describe('BmiForm', () => {
  let fixture: ComponentFixture<BmiForm>;
  let element: HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmiForm);
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  function enterValue(index: number, value: string): void {
    const input = element.querySelectorAll('input')[index];
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  async function submit(): Promise<void> {
    element.querySelector('button')!.click();
    await fixture.whenStable();
  }

  it('emits measurements when the form is valid', async () => {
    const submitted = vi.fn();
    fixture.componentInstance.submitted.subscribe(submitted);

    enterValue(0, '70');
    enterValue(1, '175');
    await submit();

    expect(submitted).toHaveBeenCalledWith({ weightKg: 70, heightCm: 175 });
  });

  it('shows errors and does not emit when fields are empty', async () => {
    const submitted = vi.fn();
    fixture.componentInstance.submitted.subscribe(submitted);

    await submit();

    expect(submitted).not.toHaveBeenCalled();
    expect(element.textContent).toContain('Įveskite svorį');
    expect(element.textContent).toContain('Įveskite ūgį');
  });

  it('shows an error when a value is out of range', async () => {
    enterValue(0, '70');
    enterValue(1, '10');
    await submit();

    expect(element.textContent).toContain('Ūgis turi būti ne mažesnis nei 50 cm');
  });
});
