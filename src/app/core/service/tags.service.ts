import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { IPage } from '../../mobx/IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private titleService: Title, private meta: Meta) {}

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
}
