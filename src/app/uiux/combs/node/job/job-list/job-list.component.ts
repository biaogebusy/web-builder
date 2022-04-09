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
    const obj = {
      index: i,
      item,
    };
    this.selected.emit(obj);
  }
  onScroll(event: number): void {
    this.scrolling = !!event;
    this.scroller.emit(true);
    this.cd.detectChanges();
  }
}
