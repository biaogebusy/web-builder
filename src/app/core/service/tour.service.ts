import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import introJs from 'intro.js';
@Injectable({
  providedIn: 'root',
})
export class TourService {
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  init(config: any): void {
    const { path, steps, delay, ...args } = config;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === path) {
          setTimeout(() => {
            const stepsConfig = steps.map((item: any) => {
              if (item.element) {
                return {
                  element: this.doc.querySelector(item.element),
                  intro: item.intro,
                };
              } else {
                return item;
              }
            });
            introJs()
              .setOptions({
                steps: stepsConfig,
                ...args,
              })
              .start();
          }, delay);
        }
      }
    });
  }
}
