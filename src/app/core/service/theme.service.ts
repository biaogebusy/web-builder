import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { THEME } from '@core/token/token-providers';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(THEME) private theme: string
  ) {}

  initTheme(): void {
    this.setTheme(this.theme);
  }

  setTheme(theme: string) {
    const root = this.document.getElementsByTagName('html')[0];
    root.removeAttribute('class');
    root.classList.add(theme);
  }
}
