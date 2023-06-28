import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import type { IBuilderComponent, IUiux } from '@core/interface/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { UIUX } from '@core/token/token-providers';
import { map } from 'lodash-es';

@Component({
  selector: 'app-builder-generater',
  templateUrl: './builder-generater.component.html',
  styleUrls: ['./builder-generater.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderGeneraterComponent implements OnInit {
  fields: any[];
  form = new FormGroup({});
  model: any = {};
  constructor(
    private builder: BuilderState,
    private util: UtilitiesService,
    @Inject(UIUX) public tabs: IUiux[]
  ) {}

  ngOnInit(): void {
    this.fields = [
      {
        type: 'select',
        key: 'hero',
        defaultValue: 1,
        className: 'display-block m-bottom-sm',
        templateOptions: {
          label: '选择 Hero 个数',
          description: '一般一个页面只需要一个 Hero',
          options: [
            {
              label: '1',
              value: 1,
            },
            {
              label: '2',
              value: 2,
            },
            {
              label: '3',
              value: 3,
            },
            {
              label: '4',
              value: 4,
            },
            {
              label: '5',
              value: 5,
            },
            {
              label: '6',
              value: 6,
            },
          ],
        },
      },
      {
        type: 'select',
        key: 'showcase',
        defaultValue: 3,
        className: 'display-block m-bottom-sm',
        templateOptions: {
          label: '选择 Showcase 个数',
          description: '一般一个页面会有多个 Showcase 组件',
          options: [
            {
              label: '1',
              value: 1,
            },
            {
              label: '2',
              value: 2,
            },
            {
              label: '3',
              value: 3,
            },
            {
              label: '4',
              value: 4,
            },
            {
              label: '5',
              value: 5,
            },
            {
              label: '6',
              value: 6,
            },
            {
              label: '7',
              value: 7,
            },
            {
              label: '8',
              value: 8,
            },
            {
              label: '9',
              value: 9,
            },
            {
              label: '10',
              value: 10,
            },
          ],
        },
      },
      {
        type: 'select',
        key: 'carousel',
        defaultValue: 1,
        className: 'display-block m-bottom-sm',
        templateOptions: {
          label: '选择幻灯片个数',
          description: '幻灯片不宜太多，生成后可拖动重排',
          options: [
            {
              label: '1',
              value: 1,
            },
            {
              label: '2',
              value: 2,
            },
            {
              label: '3',
              value: 3,
            },
            {
              label: '4',
              value: 4,
            },
            {
              label: '5',
              value: 5,
            },
            {
              label: '6',
              value: 6,
            },
          ],
        },
      },
      {
        type: 'select',
        key: 'drupal',
        defaultValue: 0,
        className: 'display-block m-bottom-sm',
        templateOptions: {
          label: '使用Drupal API 组件个数',
          description: '列表，分类，日历等等',
          options: [
            {
              label: '0',
              value: 0,
            },
            {
              label: '1',
              value: 1,
            },
            {
              label: '2',
              value: 2,
            },
            {
              label: '3',
              value: 3,
            },
            {
              label: '4',
              value: 4,
            },
          ],
        },
      },
      {
        key: 'action',
        type: 'checkbox',
        className: 'display-block m-bottom-sm',
        defaultValue: true,
        templateOptions: {
          label: '底部包含 Action',
          description: '一般页面底部引导用户下一步要做的事情',
          pattern: 'true',
          required: true,
        },
      },
    ];
  }

  onGenerate(value: any): void {
    let items: IBuilderComponent[] = [];
    map(this.tabs, (item) => {
      items.push(...item.elements);
    });
    const heros = this.builder.getRandomElements(items, 'hero', value.hero);
    const showcases = this.builder.getRandomElements(
      items,
      'showcase',
      value.showcase
    );
    const carousel = this.builder.getRandomElements(
      items,
      'carousel',
      value.carousel
    );
    const drupal = this.builder.getRandomElements(
      items,
      'drupal',
      value.drupal
    );
    let action = [];
    if (value.action) {
      let base = this.tabs.filter((item) => item.type === 'base')[0];
      action.push(base.elements[0].elements[0]);
    }

    this.builder.page.body = [
      ...heros,
      ...showcases,
      ...carousel,
      ...drupal,
      ...action,
    ];
    this.util.openSnackbar('正在为您生成页面，加载中...', 'ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1000,
    });
    setTimeout(() => {
      this.builder.updatePage();
    }, 1200);
  }
}
