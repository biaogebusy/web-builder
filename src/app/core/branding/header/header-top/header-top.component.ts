import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  inject,
  input
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import type { IHeaderTop } from '@core/interface/branding/IBranding';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { LinkComponent } from '@uiux/widgets/link/link.component';
import { GithubStarComponent } from '@uiux/widgets/github-star/github-star.component';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, IconComponent, LinkComponent, GithubStarComponent],
})
export class HeaderTopComponent implements OnInit {
  readonly content = input<IHeaderTop>();
  showNoXs: boolean;
  screen = inject(ScreenState);
  screenService = inject(ScreenService);
  private ele = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  constructor() {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen
        .mqAlias$()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(mq => {
          const visible = mq.includes('md') || mq.includes('lg') || mq.includes('xl');
          const classes = this.ele.nativeElement.classList;
          // Preserve the class attribute when the breakpoint keeps the same visibility.
          classes.toggle('block', visible);
          classes.toggle('hidden', !visible);
        });
    }
  }
}
