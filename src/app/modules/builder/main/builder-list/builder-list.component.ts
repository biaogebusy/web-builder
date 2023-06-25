import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BuilderState } from '@core/state/BuilderState';
import { map as each } from 'lodash-es';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-builder-list',
  templateUrl: './builder-list.component.html',
  styleUrls: ['./builder-list.component.scss'],
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
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {
    this.builder.builderContentDrawer$.subscribe(() => {
      this.drawer.toggle();
    });
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.builder.onDrop(event);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.markers = this.doc.querySelectorAll('div[class^="gsap-marker"]');
      Array.from(this.markers).forEach((marker) => {
        this.builderList.nativeElement.append(marker);
      });
    }, 0);

    this.previewClass$ = this.builder.switchPreivew$.pipe(
      map((media) => {
        return {
          preview: media !== 'none' && media !== undefined,
          'preview-xs': media === 'xs',
          'preview-sm': media === 'sm',
          'preview-md': media === 'md',
        };
      })
    );
  }

  ngOnDestroy(): void {
    each(this.markers, (marker) => {
      marker.remove();
    });
  }
}
