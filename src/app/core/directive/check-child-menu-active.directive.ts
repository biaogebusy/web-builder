import { AfterViewInit, DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';

@Directive({
  selector: '[checkChildMenuActive]',
})
export class CheckChildMenuActiveDirective implements AfterViewInit {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateClasses();
    }, 0);

    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.updateClasses();
        }, 0);
      }
    });
  }

  updateClasses(): void {
    const el = this.el.nativeElement;
    // Preserve the class attribute when navigation leaves the active state unchanged.
    el.classList.toggle('active', el.querySelector('a[class~=active]') !== null);
  }
}
