import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  afterEveryRender,
  inject,
  signal,
  DOCUMENT,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CONFIG, BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { map as each, throttle } from 'lodash-es';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilitiesService } from '@core/service/utilities.service';
import { IBuilderConfig } from '@core/interface/IBuilder';
import { BuilderService } from '@core/service/builder.service';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-builder-list',
  templateUrl: './builder-list.component.html',
  styleUrls: ['./builder-list.component.scss'],
  standalone: false,
})
export class BuilderListComponent implements OnInit, AfterViewInit, OnDestroy {
  private doc = inject<Document>(DOCUMENT);
  public currentPage$ = inject<Observable<IPage>>(BUILDER_CURRENT_PAGE);
  public builderConfig$ = inject<Observable<IBuilderConfig>>(BUILDER_CONFIG);

  @ViewChild('builderList', { static: false }) builderList: ElementRef;
  @ViewChild('widgetPicker') widgetPicker: ElementRef;
  private markers: NodeListOf<Element>;
  public previewClass$: Observable<any>;
  private router = inject(Router);
  public builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);
  private builderService = inject(BuilderService);
  private storage = inject(LocalStorageService);
  private ele = inject(ElementRef);
  private scrollableContainer: Element;
  public bcData = signal(false);

  constructor() {
    afterEveryRender({
      read: throttle(() => {
        if (!this.scrollableContainer) {
          return;
        }
        this.util.intersectionObserver('#builder-list [data-aos]', this.scrollableContainer);
        const links = this.scrollableContainer.querySelectorAll('a');
        if (links.length) {
          links.forEach((link: Element) => {
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

  drop(event: CdkDragDrop<string[]>): void {
    this.builder.onDrop(event);
  }

  ngAfterViewInit(): void {
    this.scrollableContainer = this.ele.nativeElement.querySelector('.builder-list');
    setTimeout(() => {
      this.markers = this.doc.querySelectorAll('div[class^="gsap-marker"]');
      Array.from(this.markers).forEach(marker => {
        this.builderList.nativeElement.append(marker);
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
  }

  addNewSection(target: any, type: 'widget' | 'section', newSection: any): void {
    this.builder.widgetsPicker$.next(false);
    this.router.navigate(['/builder']);
    const path = this.util.generatePath(target);
    if (type === 'section') {
      this.builder.updatePageContentByPath(path, newSection, 'add');
    }

    if (type === 'widget') {
      this.builderService.addBlock(type, {}, this.util.generatePath(target), target);
    }
    this.builder.closeRightDrawer$.next(true);
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
      this.util.openSnackbar('请先复制组件', 'ok');
      return;
    }
    const path = this.util.generatePath(target);
    this.builder.updatePageContentByPath(path, this.bcData(), 'add');
    this.storage.clear(this.builder.COPYCOMPONENTKEY);
  }

  ngOnDestroy(): void {
    each(this.markers, marker => {
      marker.remove();
    });
  }
}
