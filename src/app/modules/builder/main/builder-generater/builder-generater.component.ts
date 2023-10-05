import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IBuilderComponent, IUiux } from '@core/interface/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { CORE_CONFIG, UIUX } from '@core/token/token-providers';
import { map } from 'lodash-es';

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
      if (item.type === 'base' || item.type === 'component') {
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
    const drupal = this.builder.getRandomElements(
      items,
      'drupal',
      value.drupal
    );
    let action = [];
    if (value.action) {
      let base = this.uiux.filter((item) => item.type === 'base')[0];
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
