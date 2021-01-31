import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private titleService: Title) {}

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }
}
