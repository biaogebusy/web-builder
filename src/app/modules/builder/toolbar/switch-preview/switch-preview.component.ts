import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-switch-preview',
  templateUrl: './switch-preview.component.html',
  styleUrls: ['./switch-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchPreviewComponent implements OnInit, OnDestroy {
  currentPage: IPage;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private builder: BuilderState,
    private cd: ChangeDetectorRef,
    private util: UtilitiesService,
    @Inject(BUILDER_CURRENT_PAGE) public currentPage$: Observable<IPage>
  ) {}
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
    {
      icon: {
        svg: 'monitor',
      },
      value: 'lg',
      label: '桌面',
    },
  ];
  ngOnInit(): void {
    this.currentPage$.pipe(takeUntil(this.destroy$)).subscribe((page) => {
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
    this.builder.closeBuilderRightDrawer$.next(true);
    this.builder.switchPreivew$.next(preview.value);
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
