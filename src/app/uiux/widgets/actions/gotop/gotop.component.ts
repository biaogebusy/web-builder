import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  inject,
  DOCUMENT,
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

  @ViewChild('goTop') goTop: ElementRef;


  gotoTop(): void {
    this.screenService.gotoTop();
  }

  onScroll(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.scroll$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        if (this.goTop) {
          if (this.document.body.getBoundingClientRect().top < -100) {
            this.goTop.nativeElement.style.bottom = '3rem';
          } else {
            this.goTop.nativeElement.style.bottom = '-10rem';
          }
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.onScroll();
  }
}
