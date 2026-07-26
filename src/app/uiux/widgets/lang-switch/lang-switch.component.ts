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
    const { pathname } = window.location;
    const url = this.removeLangPrefix(pathname);
    const langPrefix = getLangPrefix(lang);
    this.router.navigateByUrl(`${langPrefix}${url}`);
  }

  removeLangPrefix(urlPath: string): string {
    const pathParts = urlPath.split('/');
    // check if the path is like /en/some/path
    const isLangPage = this.langs?.find(lang => {
      const langPrefix = getLangPrefix(lang);
      return !!langPrefix && urlPath.startsWith(langPrefix);
    });

    if (isLangPage) {
      const remainingPath = pathParts.slice(2).join('/');
      return remainingPath;
    } else {
      return urlPath;
    }
  }
}
