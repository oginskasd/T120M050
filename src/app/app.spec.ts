import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { appConfig } from './app.config';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: appConfig.providers,
    }).compileComponents();
  });

  it('shows the calculated BMI after the form is submitted', async () => {
    const fixture = TestBed.createComponent(App);
    const element: HTMLElement = fixture.nativeElement;
    await fixture.whenStable();

    const [weightInput, heightInput] = Array.from(element.querySelectorAll('input'));
    weightInput.value = '70';
    weightInput.dispatchEvent(new Event('input'));
    heightInput.value = '175';
    heightInput.dispatchEvent(new Event('input'));
    element.querySelector('button')!.click();
    await fixture.whenStable();

    expect(element.querySelector('app-bmi-result')?.textContent).toContain('22,9');
  });
});
