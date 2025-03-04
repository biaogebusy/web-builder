import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  afterRender,
  inject,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CONFIG, BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { map as each, throttle } from 'lodash-es';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilitiesService } from '@core/service/utilities.service';
import { IBuilderConfig } from '@core/interface/IBuilder';
import { BuilderService } from '@core/service/builder.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
@Component({
  selector: 'app-builder-list',
  templateUrl: './builder-list.component.html',
  styleUrls: ['./builder-list.component.scss'],
})
export class BuilderListComponent implements OnInit, AfterViewInit, OnDestroy {
  private doc = inject<Document>(DOCUMENT);
  public currentPage$ = inject<Observable<IPage>>(BUILDER_CURRENT_PAGE);
  public builderConfig$ = inject<Observable<IBuilderConfig>>(BUILDER_CONFIG);

  @ViewChild('builderList', { static: false }) builderList: ElementRef;
  private markers: NodeListOf<Element>;
  public previewClass$: Observable<any>;
  private router = inject(Router);
  private zone = inject(NgZone);
  private dialog = inject(MatDialog);
  public builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);
  private builderService = inject(BuilderService);

  private ele = inject(ElementRef);
  private animateElement: Element[] = [];
  private scrollableContainer: Element;

  constructor() {
    afterRender({
      read: throttle(() => {
        this.intersectionObserver(this.animateElement);
      }, 600),
    });
  }

  ngOnInit(): void {}

  intersectionObserver(animateElement: Element[]): void {
    if (animateElement.length === 0) {
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry: any) => {
          const { top } = entry.boundingClientRect;
          const viewportHeight = entry.rootBounds.height; // 滚动容器的高度
          const bottomOffset = 150;
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          }

          if (top > viewportHeight - bottomOffset) {
            // 当元素准备离开底部一定距离
            entry.target.classList.remove('aos-animate');
          }
        });
      },
      {
        root: this.scrollableContainer, // 设置滚动容器
        threshold: 0.1, // 元素进入视口的触发比例
      }
    );
    animateElement.forEach((el: any) => observer.observe(el));
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.builder.onDrop(event);
  }

  ngAfterViewInit(): void {
    this.scrollableContainer = this.ele.nativeElement.querySelector('.builder-list');
    this.util.animateElement$
      .pipe(delay(1000), takeUntilDestroyed(this.destroyRef))
      .subscribe(animateEle => {
        this.animateElement = [...this.animateElement, animateEle];
      });
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.markers = this.doc.querySelectorAll('div[class^="gsap-marker"]');
        Array.from(this.markers).forEach(marker => {
          this.builderList.nativeElement.append(marker);
        });
      }, 0);
    });

    this.previewClass$ = this.builder.switchPreivew$.pipe(
      takeUntilDestroyed(this.destroyRef),
      map(media => {
        return {
          'preview': media !== 'none' && media !== undefined,
          'preview-xs': media === 'xs',
          'preview-sm': media === 'sm',
          'preview-md': media === 'md',
          'preview-xs-md': media === 'xs-md',
        };
      })
    );
  }

  addNewSection(target: any, type: 'widget' | 'section', newSection: any): void {
    this.builder.widgetsPicker$.next(false);
    this.router.navigate(['/builder']);
    const path = this.util.generatePath(target);
    if (type === 'section') {
      this.builder.updatePageContentByPath(path, newSection, 'add');
    }

    if (type === 'widget') {
      this.builderService.addBlock(type, {}, this.util.generatePath(target));
    }
    this.builder.closeRightDrawer$.next(true);
  }

  onNewPage(): void {
    this.builder.onNewPage();
  }

  onClearHistory() {
    this.builder.clearAllHistory();
  }

  ngOnDestroy(): void {
    each(this.markers, marker => {
      marker.remove();
    });
  }
}
