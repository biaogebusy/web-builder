import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import type { ICoreConfig, IPage } from '@core/interface/IAppConfig';
import type { IBuilderComponent, IUiux } from '@core/interface/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { CORE_CONFIG, UIUX } from '@core/token/token-providers';
import { map, shuffle } from 'lodash-es';

@Component({
  selector: 'app-builder-generater',
  templateUrl: './builder-generater.component.html',
  styleUrls: ['./builder-generater.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderGeneraterComponent implements OnInit {
  form = new UntypedFormGroup({});
  model: any = {};
  builder = inject(BuilderState);
  util = inject(UtilitiesService);
  constructor(
    @Inject(UIUX) public uiux: IUiux[],
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig,
  ) {}

  ngOnInit(): void {}

  onGenerate(value: any): void {
    const items: IBuilderComponent[] = [];
    let blocks: any[] = [];
    const page: IPage = {
      title: '快速生成',
      body: [],
      current: true,
      time: new Date(),
    };
    if (value === 'all') {
      map(this.uiux, (item) => {
        items.push(...item.elements);
      });
      blocks = this.builder.getAllComponents(items);
      this.util.openSnackbar(
        `正在加载${blocks.length}个组件，这通常仅用来做组件全量测试，可能会存在性能问题`,
        'ok',
        {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
        },
      );
      page.title = '组件全量测试';
    } else {
      map(this.uiux, (item) => {
        if (item.type === 'component') {
          items.push(...item.elements);
        }
      });
      const heros = this.builder.getRandomElements(items, 'hero', value.hero);
      const showcases = this.builder.getRandomElements(
        items,
        'showcase',
        value.showcase,
      );
      const layout = this.builder.getRandomElements(items, 'layout', 1);
      const section = this.builder.getRandomElements(items, 'section', 2);
      const carousel = this.builder.getRandomElements(
        items,
        'carousel',
        value.carousel,
      );
      const masonry = this.builder.getRandomElements(
        items,
        'masonry',
        value.masonry,
      );
      const shuffleComponents = shuffle([
        ...layout,
        ...section,
        ...showcases,
        ...carousel,
      ]);
      const action = [];
      const text = items
        .filter((item) => item.id === 'base')[0]
        .elements.find((item) => item.id === 'text');
      action.push(text);

      blocks = [...heros, ...shuffleComponents, ...masonry, ...action];
      this.util.openSnackbar('正在为您生成页面，加载中...', 'ok', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 1000,
      });
      page.title = '快速生成';
    }

    this.builder.version.forEach((page) => (page.current = false));

    page.body = blocks.map((item) => {
      if (item.type) {
        return item;
      } else {
        return item.content;
      }
    });

    this.builder.version.unshift(page);

    setTimeout(() => {
      this.builder.closeRightDrawer$.next(true);
      this.builder.saveLocalVersions();
      this.builder.cancelFixedShowcase();
    }, 1200);
  }
}
