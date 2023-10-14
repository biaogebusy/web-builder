import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-switch-preview',
  templateUrl: './switch-preview.component.html',
  styleUrls: ['./switch-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchPreviewComponent implements OnInit {
  @LocalStorage('page')
  page: IPage;
  constructor(
    private builderState: BuilderState,
    private cd: ChangeDetectorRef,
    private util: UtilitiesService
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
  ngOnInit(): void {}

  onSwitch(preview: any): void {
    if (!this.page.body.length) {
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
    this.builderState.switchPreivew$.next(preview.value);
  }
}
