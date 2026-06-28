import {
  type EnvironmentProviders,
  type Provider,
  provideZonelessChangeDetection,
} from '@angular/core';

const testProviders: (Provider | EnvironmentProviders)[] = [provideZonelessChangeDetection()];

export default testProviders;
