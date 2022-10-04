import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import type { IMark } from '@core/interface/IAmap';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobListComponent implements OnInit {
  @Input() content: any;
  @Input() selectedId: string;
  @Output() selected = new EventEmitter();
  @Output() scroller = new EventEmitter();

  scrolling = false;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onClick(item: any, i: number): void {
    const obj: IMark = {
      index: i,
      item,
      marker: this.getMarker(item),
    };
    this.selected.emit(obj);
  }

  getMarker(item: any): any {
    return `
    <div class="mark-card p-y-xs p-x-xs">
      <div class="media">
        <img src="${item.company.logo.src}" />
      </div>
      <div class="media-body m-left-xs">
        <div class="mat-h4 m-bottom-xs text-base">${item.company.title}</div>
        <div class="mat-h4 m-bottom-xs text-dark title">${item.title}</div>
        <div class="mat-h3 m-bottom-0 text-primary">
        ${item.salary.from} - ${item.salary.to} k
        </div>
      </div>
      <div class="top arrow"></div>
    </div>
    `;
  }

  onScroll(event: number): void {
    this.scrolling = !!event;
    this.scroller.emit(true);
    this.cd.detectChanges();
  }
}
