import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPage } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-switch-preview',
    templateUrl: './switch-preview.component.html',
    styleUrls: ['./switch-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SwitchPreviewComponent implements OnInit {
  currentPage$ = inject<Observable<IPage>>(BUILDER_CURRENT_PAGE);

  currentPage: IPage;
  private destroyRef = inject(DestroyRef);
  currentPreview = 'none';
  currentIcon = 'cellphone-link';
  previews = [
    {
      icon: {
        svg: 'undo-variant',
      },
      value: 'none',
      label: '恢复',
    },
    {
      icon: {
        svg: 'tablet-cellphone',
      },
      value: 'xs-md',
      label: '手机',
    },
    {
      icon: {
        svg: 'tablet',
      },
      value: 'sm',
      label: '平板',
    },
    {
      icon: {
        svg: 'laptop',
      },
      value: 'md',
      label: '笔记本',
    },
  ];

  builder = inject(BuilderState);
  cd = inject(ChangeDetectorRef);
  util = inject(UtilitiesService);

  ngOnInit(): void {
    this.currentPage$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(page => {
      this.currentPage = page;
    });
  }

  onSwitch(preview: any): void {
    if (!this.currentPage.body.length) {
      this.util.openSnackbar('当前页面没有内容，请先拖动组件到编辑区创作');
      return;
    }
    this.currentPreview = preview.value;
    if (preview.value === 'none') {
      this.currentIcon = 'cellphone-link';
    } else {
      this.currentIcon = preview.icon.svg;
    }
    this.cd.detectChanges();
    this.builder.closeRightDrawer$.next(true);
    this.builder.switchPreivew$.next(preview.value);
  }
}
