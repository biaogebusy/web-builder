import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import type { IPage } from '@core/interface/IAppConfig';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import scss from 'highlight.js/lib/languages/scss';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import { DOCUMENT } from '@angular/common';
import { UtilitiesService } from '@core/service/utilities.service';
@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private titleService = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private util = inject(UtilitiesService);

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
    await this.util.loadStyle('/assets/injects/highlight.js/styles/atom-one-dark.css');
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('php', php);
    hljs.registerLanguage('scss', scss);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('json', json);
    this.document.querySelectorAll('pre').forEach(block => {
      // then highlight each
      if (block) {
        hljs.highlightElement(block);
      }
    });
  }
}
