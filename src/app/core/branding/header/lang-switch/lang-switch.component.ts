import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { ILanguage } from '@core/interface/IEnvironment';
import { CORE_CONFIG, LANG } from '@core/token/token-providers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lang-switch',
  templateUrl: './lang-switch.component.html',
  styleUrls: ['./lang-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSwitchComponent implements OnInit {
  currentLang: ILanguage;
  langs = environment?.langs;
  multiLang = environment?.multiLang;
  constructor(
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
    @Inject(LANG) public lang: ILanguage
  ) {}

  ngOnInit(): void {
    this.currentLang = this.lang;
  }

  onSwitchLanguage(lang: ILanguage): void {
    this.currentLang = lang;
    const { origin, pathname } = window.location;
    const url = this.removeLangPrefix(pathname);
    window.open(`${origin}${lang.prefix}${url}`, '_self');
  }

  removeLangPrefix(urlPath: string): string {
    const pathParts = urlPath.split('/');
    if (pathParts.length === 2) {
      return `/${pathParts[1]}`;
    } else {
      const remainingPath = pathParts.slice(2).join('/');
      return remainingPath;
    }
  }
}
