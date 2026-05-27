import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  ChangeDetectionStrategy,
  input
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { ILayoutBlock, ILayoutBuilder } from '@core/interface/IBuilder';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderService } from '@core/service/builder.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { generatePath } from '@core/util/dom-path.util';
import { createPopper } from '@popperjs/core';
import { Observable } from 'rxjs';
import { BgImgComponent } from '../../bg-img/bg-img.component';
import { BtnComponent } from '../../btn/btn.component';
import { IconComponent } from '../../icon/icon.component';
import { DynamicComponentComponent } from '../dynamic-component/dynamic-component.component';
import { LayoutToolbarComponent } from './layout-toolbar/layout-toolbar.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-layout-builder',
  templateUrl: './layout-builder.component.html',
  styleUrls: ['./layout-builder.component.scss'],
  imports: [
    MatButtonModule,
    MatTooltipModule,
    BgImgComponent,
    BtnComponent,
    IconComponent,
    DynamicComponentComponent,
    LayoutToolbarComponent,
  ],
})
export class LayoutBuilderComponent implements AfterViewInit {
  currentPage$ = inject<Observable<IPage>>(BUILDER_CURRENT_PAGE);

  readonly content = input.required<ILayoutBuilder>();
  public showToolbar = signal(false);

  private util = inject(UtilitiesService);
  private ele = inject(ElementRef);
  private builder = inject(BuilderState);
  private destroyRef = inject(DestroyRef);
  private screenService = inject(ScreenService);
  private builderSerivce = inject(BuilderService);
  private popup: any;


  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.ele.nativeElement.closest('.component-item')) {
        this.showToolbar.set(true);
      }
      if (this.showToolbar()) {
        this.currentPage$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(page => {
          this.layoutAnimate();
        });
      }
    }
  }

  addBlock(addType: string, content: any, target: any): void {
    this.builderSerivce.addBlock(addType, content, generatePath(target));
  }

  layoutAnimate(): void {
    this.content().elements.map((item: ILayoutBlock, index) => {
      const animateEle = this.ele.nativeElement.querySelectorAll(
        `.layout-${index} .for-animate`
      )[0];
      this.util.initAnimate(item, animateEle, this.ele.nativeElement);
    });
  }

  onHoverWidget(widget: any): void {
    if (this.showToolbar()) {
      const component = widget.querySelector('.component');
      const popup = widget.querySelector('.block-toolbar');
      this.popup = createPopper(component, popup, {
        placement: 'bottom',
        strategy: 'fixed',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 0],
            },
          },
        ],
      });
      this.popup.update();
    }
  }

  onLeaveWidget(): void {
    if (this.showToolbar()) {
      this.popup?.destroy();
    }
  }
}
