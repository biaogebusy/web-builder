import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import type { IPage } from '@core/interface/IAppConfig';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import scss from 'highlight.js/lib/languages/scss';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(
    private titleService: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

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
      pageValue.meta.forEach((item) => {
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

  highlightCode(): void {
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('php', php);
    hljs.registerLanguage('scss', scss);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('json', json);
    this.document.querySelectorAll('pre').forEach((block) => {
      // then highlight each
      hljs.highlightElement(block);
    });
  }
}
