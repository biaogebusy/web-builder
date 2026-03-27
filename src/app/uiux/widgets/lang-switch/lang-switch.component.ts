import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { ILanguage } from '@core/interface/IEnvironment';
import { CORE_CONFIG, LANG } from '@core/token/token-providers';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-lang-switch',
    templateUrl: './lang-switch.component.html',
    styleUrls: ['./lang-switch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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
    const { pathname } = window.location;
    const url = this.removeLangPrefix(pathname);
    const langPrefix = lang.prefix === '/' ? '' : lang.prefix;
    this.router.navigateByUrl(`${langPrefix}${url}`);
  }

  removeLangPrefix(urlPath: string): string {
    const pathParts = urlPath.split('/');
    // check if the path is like /en/some/path
    const isLangPage = this.langs?.find(lang => urlPath.startsWith(`/${lang.langCode}`));

    if (isLangPage) {
      const remainingPath = pathParts.slice(2).join('/');
      return remainingPath;
    } else {
      return urlPath;
    }
  }
}
