import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import type { IHeaderTop } from '@core/interface/branding/IBranding';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTopComponent implements OnInit {
  @Input() content: IHeaderTop | undefined;
  showNoXs: boolean;
  screen = inject(ScreenState);
  screenService = inject(ScreenService);
  private ele = inject(ElementRef);

  constructor() {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.mqAlias$().subscribe((mq) => {
        if (mq.includes('md') || mq.includes('lg') || mq.includes('xl')) {
          this.ele.nativeElement.classList.remove('hidden');
          this.ele.nativeElement.classList.add('block');
        } else {
          this.ele.nativeElement.classList.remove('block');
          this.ele.nativeElement.classList.add('hidden');
        }
      });
    }
  }
}
