import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderState } from '@core/state/BuilderState';
import { ContentState } from '@core/state/ContentState';
import { ScreenState } from '@core/state/screen/ScreenState';
import { BUILDER_CONFIG, BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { map as each } from 'lodash-es';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilitiesService } from '@core/service/utilities.service';
import { IBuilderConfig } from '@core/interface/IBuilder';
import { BuilderService } from '@core/service/builder.service';

@Component({
  selector: 'app-builder-list',
  templateUrl: './builder-list.component.html',
  styleUrls: ['./builder-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('builderList', { static: false }) builderList: ElementRef;
  markers: NodeListOf<Element>;
  opened = false;
  previewClass$: Observable<any>;
  router = inject(Router);
  private zone = inject(NgZone);
  public builder = inject(BuilderState);
  public screenState = inject(ScreenState);
  private util = inject(UtilitiesService);
  private destroyRef = inject(DestroyRef);
  public contentState = inject(ContentState);
  private builderService = inject(BuilderService);

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(BUILDER_CURRENT_PAGE) public currentPage$: Observable<IPage>,
    @Inject(BUILDER_CONFIG) public builderConfig$: Observable<IBuilderConfig>
  ) {}

  ngOnInit(): void {}

  trackByFn(index: number, item: any): number {
    return index;
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.builder.onDrop(event);
  }

  ngAfterViewInit(): void {
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

  addNewSection(event: any, type: 'widget' | 'section', newSection: any): void {
    this.router.navigate(['/builder']);
    const path = this.util.generatePath(event.target);
    if (type === 'section') {
      this.builder.updatePageContentByPath(path, newSection, 'add');
    }

    if (type === 'widget') {
      this.builderService.addBlock(type, {}, this.util.generatePath(event.target));
    }
  }

  ngOnDestroy(): void {
    each(this.markers, marker => {
      marker.remove();
    });
  }
}
