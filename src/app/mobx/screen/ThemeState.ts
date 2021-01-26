import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx-angular';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
@Injectable({
  providedIn: 'root',
})
export class ThemeState {
  private readonly DARK_THEME_CLASS = 'dark-theme';
  private readonly MODE = 'themeMode';
  @observable theme = 'light-theme';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) {
    this.initTheme();
  }

  @action
  initTheme(): void{
    if (this.storage.get(this.MODE)){
      this.theme = this.storage.get(this.MODE);
      const body = this.document.getElementsByTagName('body')[0];
      body.classList.add(this.theme);
    }
  }

  @action
  switchTheme(theme: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    body.removeAttribute('class');
    body.classList.add(theme);
    this.theme = theme;
    this.storage.set(this.MODE, theme);
  }
}
