import { AfterViewInit, DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter, startWith } from 'rxjs';

@Directive({
  selector: '[checkChildMenuActive]',
})
export class CheckChildMenuActiveDirective implements AfterViewInit {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        startWith(null),
        delay(0),
        // Cancel queued updates as well as the event subscription when the menu is removed.
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.updateClasses());
  }

  updateClasses(): void {
    const el = this.el.nativeElement;
    // Preserve the class attribute when navigation leaves the active state unchanged.
    el.classList.toggle('active', el.querySelector('a[class~=active]') !== null);
  }
}
