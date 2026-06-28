import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
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
  imports: [ShareModule, WidgetsModule],
})
export class SwitchPreviewComponent implements OnInit {
  public currentPage = inject(BUILDER_CURRENT_PAGE);
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  public currentPreview = signal<string>('none');
  public currentIcon = signal<string>('cellphone-link');
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

  ngOnInit(): void {  }

  onSwitch(preview: any): void {
    const { pathname } = window.location;
    const page = this.currentPage();
    if (!(page && typeof page === 'object' && page.body?.length) && !pathname.includes('/builder/chat/render')) {
      this.util.openSnackbar(this.translate.instant('BUILDER.SWITCH_PREVIEW.EMPTY_PAGE'));
      return;
    }
    this.currentPreview.set(preview.value);
    if (preview.value === 'none') {
      this.currentIcon.set('cellphone-link');
    } else {
      this.currentIcon.set(preview.icon.svg);
    }
    this.builder.closeRightDrawer$.next(true);
    this.builder.switchPreivew$.next(preview.value);
  }
}
