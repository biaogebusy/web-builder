import { Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx-angular';

@Injectable({
  providedIn: 'root',
})
export class ThemeState {
  @observable themeMode = 'primary';
  constructor() {}

  @action
  switchTheme(theme: string): void {
    this.themeMode = theme;
  }
}
