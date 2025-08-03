import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  DOCUMENT,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import { ScreenState } from '@core/state/screen/ScreenState';

@Component({
  selector: 'app-gotop',
  templateUrl: './gotop.component.html',
  styleUrls: ['./gotop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class GotopComponent implements OnInit {
  private screenService = inject(ScreenService);
  private screen = inject(ScreenState);
  private document = inject<Document>(DOCUMENT);

  @ViewChild('goTop') goTop: ElementRef;

  ngOnInit(): void {}

  gotoTop(): void {
    this.screenService.gotoTop();
  }

  onScroll(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.scroll$.subscribe(() => {
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
