import { menuHoverState } from '../menu-hover';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Component,
  DestroyRef,
  OnInit,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  input
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ScreenState } from '@core/state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import type { IMainMenu } from '@core/interface/branding/IBranding';
import { LinkComponent } from '@uiux/widgets/link/link.component';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDividerModule, LinkComponent],
})
export class MegaMenuComponent implements OnInit {
  readonly content = input.required<IMainMenu>();
  active: boolean;
  private eleRef = inject(ElementRef);
  private screenState = inject(ScreenState);
  private screenService = inject(ScreenService);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.initActionEvent();
    }
  }

  initActionEvent(): void {
    menuHoverState(this.eleRef.nativeElement, this.screenState.stickyMenu$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(active => {
        this.active = active;
        this.cd.detectChanges();
      });
  }
}
