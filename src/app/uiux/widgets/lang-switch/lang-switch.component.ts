import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { ILanguage } from '@core/interface/IEnvironment';
import { CORE_CONFIG, LANG } from '@core/token/token-providers';
import { getLangPrefix } from '@core/util/language.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lang-switch',
  templateUrl: './lang-switch.component.html',
  styleUrls: ['./lang-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
})
export class LangSwitchComponent implements OnInit {
  coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  lang = inject<ILanguage>(LANG);
  private router = inject(Router);
  private translateService = inject(TranslateService);

  currentLang: ILanguage;
  langs = environment?.langs;
  multiLang = environment?.multiLang;

  ngOnInit(): void {
    this.currentLang = this.lang;
    this.translateService.use(this.currentLang?.langCode || 'zh-hans');
  }

  onSwitchLanguage(lang: ILanguage): void {
    this.currentLang = lang;
    this.translateService.use(lang.langCode);
    const { pathname, search } = window.location;
    // The path keeps its leading slash so the prefix stays on a segment boundary:
    // `/zh-hant` + `about` would navigate to `/zh-hantabout`. The front page is the one
    // path that contributes nothing of its own, otherwise it would come out as `/en/`.
    const path = this.removeLangPrefix(pathname);
    const url = `${getLangPrefix(lang)}${path === '/' ? '' : path}`;
    this.router.navigateByUrl(`${url || '/'}${search}`);
  }

  /**
   * The path with its language prefix removed, leading slash included; empty when the
   * path is nothing but the prefix.
   *
   * Only a whole segment counts as a prefix, otherwise `/entertainment` would be read as
   * the English version of a page and truncated.
   */
  removeLangPrefix(urlPath: string): string {
    const langPage = this.langs?.find(lang => {
      const langPrefix = getLangPrefix(lang);
      return !!langPrefix && (urlPath === langPrefix || urlPath.startsWith(`${langPrefix}/`));
    });

    if (!langPage) {
      return urlPath;
    }
    return urlPath.slice(getLangPrefix(langPage).length);
  }
}
