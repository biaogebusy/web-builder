import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
@Injectable({
  providedIn: 'root',
})
export class GsapService {
  constructor() {
    console.log(gsap);
  }

  change(element: any) {
    gsap.to(element, { width: 0, duration: 1 });
  }
}
