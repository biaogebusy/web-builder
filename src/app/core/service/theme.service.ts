import { Injectable, inject, DOCUMENT } from '@angular/core';
import { THEME } from '@core/token/token-providers';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject<Document>(DOCUMENT);
  private theme = inject(THEME);

  initTheme(): void {
    this.setTheme(this.theme);
  }

  setTheme(theme: string): void {
    const root = this.document.getElementsByTagName('html')[0];
    root.removeAttribute('class');
    root.classList.add(theme);
  }
}
