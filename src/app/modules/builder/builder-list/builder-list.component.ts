import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';
import { map } from 'lodash-es';

@Component({
  selector: 'app-builder-list',
  templateUrl: './builder-list.component.html',
  styleUrls: ['./builder-list.component.scss'],
})
export class BuilderListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: any;
  @Input() isPreview: boolean;
  @Output() dropChange: EventEmitter<CdkDragDrop<string[]>> =
    new EventEmitter();
  @ViewChild('builderList', { static: false }) builderList: ElementRef;
  markers: NodeListOf<Element>;
  opened = false;
  constructor(
    public builder: BuilderState,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {}

  trackByFn(index: number, item: any): number {
    return index;
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.dropChange.emit(event);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.markers = this.doc.querySelectorAll('div[class^="gsap-marker"]');
      map(this.markers, (marker) => {
        this.builderList.nativeElement.append(marker);
      });
    }, 0);
  }

  ngOnDestroy(): void {
    map(this.markers, (marker) => {
      marker.remove();
    });
  }
}
