import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private titleService: Title) {}

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }
}
