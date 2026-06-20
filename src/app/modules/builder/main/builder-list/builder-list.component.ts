import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  afterEveryRender,
  effect,
  inject,
  signal,
  Injector,
  DOCUMENT,
  ChangeDetectionStrategy,
  viewChild
} from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { OtherModule } from '@uiux/combs/other/other.module';
import { IDynamicInputs, IPage } from '@core/interface/IAppConfig';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CONFIG, BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { map as each, throttle } from 'lodash-es';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilitiesService } from '@core/service/utilities.service';
import { IBuilderConfig } from '@core/interface/IBuilder';
import { BuilderService } from '@core/service/builder.service';
import { generatePath } from '@core/util/dom-path.util';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import { DefaultPageComponent } from '../default-page/default-page.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-builder-list',
  templateUrl: './builder-list.component.html',
  styleUrls: ['./builder-list.component.scss'],
  imports: [ShareModule, WidgetsModule, OtherModule, DragDropModule, DefaultPageComponent],
})
export class BuilderListComponent implements OnInit, AfterViewInit, OnDestroy {
  private doc = inject<Document>(DOCUMENT);
  public currentPage = inject(BUILDER_CURRENT_PAGE);
  public builderConfig$ = inject(BUILDER_CONFIG);

  readonly builderList = viewChild<ElementRef>('builderList');
  private markers: NodeListOf<Element>;
  public previewClass$: Observable<any>;
  private router = inject(Router);
  public builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);
  private builderService = inject(BuilderService);
  private storage = inject(LocalStorageService);
  private translate = inject(TranslateService);
  private injector = inject(Injector);
  private ele = inject(ElementRef);
  private scrollableContainer: Element;
  private disconnectAosObserver?: () => void;
  private pageChangeAosRefreshTimer?: ReturnType<typeof setTimeout>;
  private disabledLinks = new WeakSet<Element>();
  public bcData = signal(false);

  constructor() {
    afterEveryRender({
      read: throttle(() => {
        if (!this.scrollableContainer) {
          return;
        }
        this.refreshAosObserver();
        const links = this.scrollableContainer.querySelectorAll('a');
        if (links.length) {
          links.forEach((link: Element) => {
            if (this.disabledLinks.has(link)) {
              return;
            }
            this.disabledLinks.add(link);
            link.addEventListener('click', event => {
              event.preventDefault();
            });
          });
        }
      }, 200),
    });
  }

  ngOnInit(): void {
    this.storage
      .observe(this.builder.COPYCOMPONENTKEY)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.bcData.set(data);
      });
  }

  drop(event: CdkDragDrop<IDynamicInputs[]>): void {
    this.builder.onDrop(event);
  }

  ngAfterViewInit(): void {
    this.scrollableContainer = this.ele.nativeElement.querySelector('.builder-list');
    setTimeout(() => {
      this.markers = this.doc.querySelectorAll('div[class^="gsap-marker"]');
      Array.from(this.markers).forEach(marker => {
        this.builderList()!.nativeElement.append(marker);
      });
    }, 0);

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

    // loadPage 时 DynamicComponentComponent.loadComponent 是异步的，
    // `data-aos` 通常在 afterEveryRender 的 throttle 窗口外才被设置，
    // 导致 IntersectionObserver 没有挂到新元素上。这里在页面切换后再
    // 显式触发一次观察，确保 AOS 能够正常播放。
    let first = true;
    effect(() => {
      this.currentPage(); // subscribe to changes
      if (first) {
        first = false;
        return;
      }
      if (this.pageChangeAosRefreshTimer) {
        clearTimeout(this.pageChangeAosRefreshTimer);
      }
      this.pageChangeAosRefreshTimer = setTimeout(() => {
        if (this.scrollableContainer) {
          this.refreshAosObserver();
        }
      }, 500);
    }, { injector: this.injector });
  }

  addNewSection(target: any, type: 'widget' | 'section', newSection: any): void {
    this.router.navigate(['/builder']);
    const path = generatePath(target);
    if (type === 'section') {
      this.builder.updatePageContentByPath(path, newSection, 'add');
      this.builder.closeRightDrawer$.next(true);
      return;
    }

    if (type === 'widget') {
      this.builderService.addBlock(type, {}, path);
    }
  }

  onNewPage(): void {
    this.builder.onNewPage();
  }

  goBackUiux(): void {
    this.router.navigate(['/builder']);
  }

  onClearHistory(): void {
    this.builder.clearAllHistory();
  }

  onPasteData(target: any): void {
    if (!this.bcData()) {
      this.util.openSnackbar(this.translate.instant('BUILDER.LIST.COPY_FIRST'), 'ok');
      return;
    }
    const path = generatePath(target);
    this.builder.updatePageContentByPath(path, this.bcData(), 'add');
    this.storage.clear(this.builder.COPYCOMPONENTKEY);
  }

  private refreshAosObserver(): void {
    this.disconnectAosObserver?.();
    this.disconnectAosObserver = this.util.intersectionObserver(
      '#builder-list [data-aos]',
      this.scrollableContainer
    );
  }

  ngOnDestroy(): void {
    this.disconnectAosObserver?.();
    if (this.pageChangeAosRefreshTimer) {
      clearTimeout(this.pageChangeAosRefreshTimer);
    }
    each(this.markers, marker => {
      marker.remove();
    });
  }
}
