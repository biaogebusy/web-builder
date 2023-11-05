import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { THEMKEY } from '@core/factory/factory';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storage: LocalStorageService
  ) {}

  initTheme(coreConfig: ICoreConfig): void {
    if (this.storage.retrieve(THEMKEY)) {
      const theme = this.storage.retrieve(THEMKEY);
      this.setTheme(theme);
    } else {
      const defTheme = coreConfig.defaultTheme || 'blue-theme';
      this.setTheme(defTheme);
    }
  }

  setTheme(theme: string) {
    const root = this.document.getElementsByTagName('html')[0];
    root.removeAttribute('class');
    root.classList.add(theme);
  }
}
