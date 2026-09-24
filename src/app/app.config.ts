import { registerLocaleData } from '@angular/common';
import localeLt from '@angular/common/locales/lt';
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';

registerLocaleData(localeLt);

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), { provide: LOCALE_ID, useValue: 'lt' }],
};
