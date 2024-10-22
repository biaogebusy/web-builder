import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import introJs from 'intro.js';
@Injectable({
  providedIn: 'root',
})
export class TourService {
  private doc = inject(DOCUMENT);
  init(config: any): void {
    const { steps, delay, ...args } = config;
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
