import { Injectable, inject, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';

import { UtilitiesService } from '@core/service/utilities.service';
import { CORE_CONFIG } from '@core/token/token-providers';
@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private titleService = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private util = inject(UtilitiesService);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  public addMeta(metas: any[]): void {
    this.meta.addTags(metas);
  }

  public updateMeta(meta: any): void {
    this.meta.updateTag(meta);
  }

  public updateTages(pageValue: IPage): void {
    this.setTitle(pageValue.title);
    if (pageValue.meta) {
      pageValue.meta.forEach(item => {
        this.updateMeta(item);
      });
    } else {
      this.updateMeta({
        name: 'description',
        content: '',
      });
      this.updateMeta({
        name: 'keywords',
        content: '',
      });
    }
  }

  async highlightCode(): Promise<void> {
    const pres = this.document.querySelectorAll('pre');
    if (pres?.length > 0) {
      const {
        default: { registerLanguage, highlightElement },
      } = await import('highlight.js/lib/core');
      const javascript = await import('highlight.js/lib/languages/javascript');
      const php = await import('highlight.js/lib/languages/php');
      const scss = await import('highlight.js/lib/languages/scss');
      const xml = await import('highlight.js/lib/languages/xml');
      const json = await import('highlight.js/lib/languages/json');
      if (this.coreConfig.librariesUseLocal) {
        await this.util.loadStyle('/assets/injects/highlight.js/styles/atom-one-dark.css');
      } else {
        const highlightStyle = this.util.getLibraries('highlight', 'cdn', 'style');
      }
      registerLanguage('javascript', javascript.default);
      registerLanguage('php', php.default);
      registerLanguage('scss', scss.default);
      registerLanguage('xml', xml.default);
      registerLanguage('json', json.default);
      pres?.forEach(block => {
        // then highlight each
        if (block) {
          highlightElement(block);
        }
      });
    }
  }
}
