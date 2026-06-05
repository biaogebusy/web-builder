import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  DOCUMENT,
  viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { ScreenService } from '@core/service/screen.service';
import { ScreenState } from '@core/state/screen/ScreenState';

@Component({
  selector: 'app-gotop',
  templateUrl: './gotop.component.html',
  styleUrls: ['./gotop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
})
export class GotopComponent {
  private screenService = inject(ScreenService);
  private screen = inject(ScreenState);
  private document = inject<Document>(DOCUMENT);
  private destroyRef = inject(DestroyRef);

  readonly goTop = viewChild<ElementRef>('goTop');


  gotoTop(): void {
    this.screenService.gotoTop();
  }

  onScroll(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.scroll$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        const goTop = this.goTop();
        if (goTop) {
          if (this.document.body.getBoundingClientRect().top < -100) {
            goTop.nativeElement.style.bottom = '3rem';
          } else {
            goTop.nativeElement.style.bottom = '-10rem';
          }
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.onScroll();
  }
}
