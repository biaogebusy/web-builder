import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import type { ILayoutBlock, ILayoutBuilder } from '@core/interface/IBuilder';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderService } from '@core/service/builder.service';
import { IPage } from '@core/interface/IAppConfig';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';
import { createPopper } from '@popperjs/core';

@Component({
    selector: 'app-layout-builder',
    templateUrl: './layout-builder.component.html',
    styleUrls: ['./layout-builder.component.scss'],
    standalone: false
})
export class LayoutBuilderComponent implements OnInit, AfterViewInit {
  currentPage$ = inject<Observable<IPage>>(BUILDER_CURRENT_PAGE);

  @Input() content: ILayoutBuilder;
  public showToolbar = signal(false);

  private util = inject(UtilitiesService);
  private ele = inject(ElementRef);
  private builder = inject(BuilderState);
  private destroyRef = inject(DestroyRef);
  private screenService = inject(ScreenService);
  private builderSerivce = inject(BuilderService);
  private popup: any;

  ngOnInit(): void {}

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
    this.builder.closeRightDrawer$.next(true);
    this.builderSerivce.addBlock(addType, content, this.util.generatePath(target), target);
  }

  layoutAnimate(): void {
    this.content.elements.map((item: ILayoutBlock, index) => {
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
