import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import { map as each } from 'lodash-es';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-builder-list',
  templateUrl: './builder-list.component.html',
  styleUrls: ['./builder-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: any;
  @ViewChild('builderList', { static: false }) builderList: ElementRef;
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;
  markers: NodeListOf<Element>;
  opened = false;
  previewClass$: Observable<any>;

  constructor(
    public builder: BuilderState,
    @Inject(DOCUMENT) private doc: Document,
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    public screenState: ScreenState
  ) {}

  ngOnInit(): void {
    this.builder.builderContentDrawer$.subscribe(() => {
      this.drawer.toggle();
      this.cd.detectChanges();
    });
  }

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
        Array.from(this.markers).forEach((marker) => {
          this.builderList.nativeElement.append(marker);
        });
      }, 0);
    });

    this.previewClass$ = this.builder.switchPreivew$.pipe(
      map((media) => {
        return {
          preview: media !== 'none' && media !== undefined,
          'preview-xs': media === 'xs',
          'preview-sm': media === 'sm',
          'preview-md': media === 'md',
          'preview-lg': media === 'lg',
          'preview-xs-md': media === 'xs-md',
        };
      })
    );
  }

  onShowEditor(content: any, index: number): void {
    this.builder.dynamicContent$.next({
      mode: 'side',
      hasBackdrop: false,
      style: {
        width: '450px',
        'max-width': 'calc(100vw - 50px)',
      },
      elements: [
        {
          type: 'jsoneditor',
          index,
          isPreview: true,
          data: content,
          disableToolbar: true,
        },
      ],
    });
  }

  ngOnDestroy(): void {
    each(this.markers, (marker) => {
      marker.remove();
    });
  }
}
