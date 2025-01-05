import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Inject,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import type { ILayoutBlock, ILayoutBuilder } from '@core/interface/IBuilder';
import { BUILDER_CURRENT_PAGE, IS_BUILDER_MODE } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderService } from '@core/service/builder.service';
import { IPage } from '@core/interface/IAppConfig';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScreenService } from '@core/service/screen.service';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-layout-builder',
  templateUrl: './layout-builder.component.html',
  styleUrls: ['./layout-builder.component.scss'],
})
export class LayoutBuilderComponent implements OnInit, AfterViewInit {
  @Input() content: ILayoutBuilder;
  @Input() pageIndex: number;
  @Input() uuid: string;

  util = inject(UtilitiesService);
  ele = inject(ElementRef);
  builder = inject(BuilderState);
  destroyRef = inject(DestroyRef);
  screenService = inject(ScreenService);
  builderSerivce = inject(BuilderService);
  constructor(
    @Inject(IS_BUILDER_MODE) public isBuilderMode$: Observable<boolean>,
    @Inject(BUILDER_CURRENT_PAGE) public currentPage$: Observable<IPage>
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.isBuilderMode$.subscribe(state => {
        if (state) {
          this.currentPage$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(page => {
            this.layoutAnimate();
          });
        }
      });
    }
  }

  addBlock(addType: string, content: any, target: any): void {
    this.builder.closeRightDrawer$.next(true);
    this.builderSerivce.addBlock(addType, content, this.util.generatePath(target));
  }

  layoutAnimate(): void {
    this.content.elements.map((item: ILayoutBlock, index) => {
      const animateEle = this.ele.nativeElement.querySelectorAll(
        `.layout-${index} .for-animate`
      )[0];
      this.util.initAnimate(item, animateEle, this.ele.nativeElement);
    });
  }
}
