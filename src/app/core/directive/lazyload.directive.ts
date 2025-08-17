import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[lazyload]',
  standalone: false,
})
export class LazyloadDirective implements AfterViewInit {
  private ele = inject(ElementRef);
  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = this.ele.nativeElement;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.01,
      }
    );

    observer.observe(this.ele.nativeElement);
  }
}
