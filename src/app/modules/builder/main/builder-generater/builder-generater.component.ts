import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  form = new FormGroup({});
  model: any = {};
  constructor(
    private builder: BuilderState,
    private util: UtilitiesService,
    @Inject(UIUX) public uiux: IUiux[],
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig
  ) {}

  ngOnInit(): void {}

  onGenerate(value: any): void {
    let items: IBuilderComponent[] = [];
    map(this.uiux, (item) => {
      if (item.type === 'component') {
        items.push(...item.elements);
      }
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
    const masonry = this.builder.getRandomElements(
      items,
      'masonry',
      value.masonry
    );
    const shuffleShowcaseCarousel = shuffle([...showcases, ...carousel]);
    let action = [];
    if (value.action) {
      let text = items.filter((item) => item.id === 'base')[0].elements[0];
      action.push(text);
    }

    const blocks = [
      ...heros,
      ...shuffleShowcaseCarousel,
      ...masonry,
      ...action,
    ];

    this.builder.version.forEach((page) => (page.current = false));
    const page: IPage = {
      title: '快速生成',
      body: [],
      current: true,
      time: new Date(),
    };
    page.body = blocks.map((item) => {
      if (item.type) {
        return item;
      } else {
        return item.content;
      }
    });

    this.builder.version.unshift(page);

    this.util.openSnackbar('正在为您生成页面，加载中...', 'ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1000,
    });
    setTimeout(() => {
      this.builder.closeBuilderRightDrawer$.next(true);
      this.builder.saveLocalVersions();
    }, 1200);
  }
}
