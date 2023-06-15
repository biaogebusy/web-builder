import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';
import { THEMKEY } from '@core/factory/factory';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private style: HTMLLinkElement;
  private cssFile: string;
  private themeCSSID: string = 'themeCSS';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storage: LocalStorageService
  ) {}

  initTheme(coreConfig: ICoreConfig, render2: Renderer2): void {
    if (this.storage.retrieve(THEMKEY)) {
      const theme = this.storage.retrieve(THEMKEY);
      this.setTheme(theme, render2);
    } else {
      const defTheme = coreConfig.defaultTheme || 'light-theme';
      this.setTheme(defTheme, render2);
    }
  }

  setTheme(theme: string, renderer2: Renderer2) {
    this.cssFile = `${theme}.css`;
    this.removeExistingThemeStyle(renderer2, this.themeCSSID);

    // Create a link element via Angular's renderer to avoid SSR troubles
    this.style = renderer2.createElement('link') as HTMLLinkElement;

    // Set type of the link item and path to the css file
    renderer2.setProperty(this.style, 'rel', 'stylesheet');
    renderer2.setProperty(this.style, 'href', this.cssFile);
    renderer2.setProperty(this.style, 'className', this.themeCSSID);
    const root = this.document.getElementsByTagName('html')[0];
    root.removeAttribute('class');
    root.classList.add(theme);

    // Add the style to the head section
    renderer2.appendChild(this.document.head, this.style);
  }

  removeExistingThemeStyle(renderer2: Renderer2, themeCSSID: string) {
    const themeIDHTMlElem = this.document.getElementsByClassName(themeCSSID);
    Array.from(themeIDHTMlElem).forEach((child) => {
      if (child) {
        renderer2.removeChild(this.document.head, child);
      }
    });
  }
}
