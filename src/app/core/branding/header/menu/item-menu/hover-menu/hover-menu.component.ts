import { menuHoverState } from '../menu-hover';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  inject,
  input
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import type { IMainMenu } from '@core/interface/branding/IBranding';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { ScreenService } from '@core/service/screen.service';
import { ScreenState } from '@core/state/screen/ScreenState';
import { BaseComponent } from '@uiux/base/base.widget';
import { LinkComponent } from '@uiux/widgets/link/link.component';

@Component({
  selector: 'app-hover-menu',
  templateUrl: './hover-menu.component.html',
  styleUrls: ['./hover-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, MatButtonModule, ReqRolesDirective, LinkComponent],
})
export class HoverMenuComponent extends BaseComponent implements OnInit {
  private eleRef = inject(ElementRef);
  private cd = inject(ChangeDetectorRef);
  private screenService = inject(ScreenService);
  private screenState = inject(ScreenState);
  private destroyRef = inject(DestroyRef);

  readonly content = input.required<IMainMenu>();
  active: boolean;

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
