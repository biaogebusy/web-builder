import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { THEMKEY } from '@core/factory/factory';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { THEME } from '@core/token/token-providers';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(THEME) private theme: string,
    private storage: LocalStorageService
  ) {}

  initTheme(coreConfig: ICoreConfig): void {
    this.setTheme(this.theme);
  }

  setTheme(theme: string) {
    const root = this.document.getElementsByTagName('html')[0];
    root.removeAttribute('class');
    root.classList.add(theme);
  }
}
