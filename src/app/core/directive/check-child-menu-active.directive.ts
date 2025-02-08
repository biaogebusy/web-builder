import { AfterViewInit, Directive, ElementRef, NgZone, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Directive({
  selector: '[checkChildMenuActive]',
})
export class CheckChildMenuActiveDirective implements AfterViewInit {
  private el = inject(ElementRef);
  private router = inject(Router);
  private zone = inject(NgZone);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateClasses();
    }, 0);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.updateClasses();
        }, 0);
      }
    });
  }

  updateClasses(): void {
    this.zone.runOutsideAngular(() => {
      const el = this.el.nativeElement;
      if (el.classList.contains('active')) {
        el.classList.remove('active');
      }
      const isChildActive = el.querySelectorAll('a[class~=active]');
      if (isChildActive.length > 0) {
        el.classList.add('active');
      }
    });
  }
}
