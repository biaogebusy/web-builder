import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { IPage } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-switch-preview',
  templateUrl: './switch-preview.component.html',
  styleUrls: ['./switch-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS],
})
export class SwitchPreviewComponent implements OnInit {
  public currentPage = inject(BUILDER_CURRENT_PAGE);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  public previews = [
    {
      icon: {
        svg: 'undo-variant',
      },
      value: 'none',
      label: 'BUILDER.SWITCH_PREVIEW.RESTORE',
    },
    {
      icon: {
        svg: 'tablet-cellphone',
      },
      value: 'xs-md',
      label: 'BUILDER.SWITCH_PREVIEW.PHONE',
    },
    {
      icon: {
        svg: 'tablet',
      },
      value: 'sm',
      label: 'BUILDER.SWITCH_PREVIEW.TABLET',
    },
    {
      icon: {
        svg: 'laptop',
      },
      value: 'md',
      label: 'BUILDER.SWITCH_PREVIEW.LAPTOP',
    },
  ];
  // Derived from the shared stream: the full-screen toolbar renders two instances, and the
  // builder panel also switches or resets the breakpoint
  public currentPreview = toSignal(this.builder.switchPreview$, { initialValue: 'none' });
  public currentIcon = computed(() => {
    const value = this.currentPreview();
    const preview = value === 'none' ? undefined : this.previews.find(p => p.value === value);
    return preview?.icon.svg ?? 'cellphone-link';
  });

  ngOnInit(): void {  }

  onSwitch(preview: any): void {
    const { pathname } = window.location;
    const page = this.currentPage();
    if (!(page && typeof page === 'object' && page.body?.length) && !pathname.includes('/builder/chat/render')) {
      this.util.openSnackbar(this.translate.instant('BUILDER.SWITCH_PREVIEW.EMPTY_PAGE'));
      return;
    }
    this.builder.closeRightDrawer$.next(true);
    this.builder.switchPreview$.next(preview.value);
  }
}
