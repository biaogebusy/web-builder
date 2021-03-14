import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
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
  @Input() relation: any;
  @Input() selectedId: string;
  @Output() selected = new EventEmitter();

  scrolling = false;
  constructor() {}

  ngOnInit(): void {}

  onClick(item: any, i: number): void {
    const obj = {
      index: i,
      item: item,
    };
    console.log(obj);
    this.selected.emit(obj);
  }
  scroll(event: number): void {
    this.scrolling = !!event;
  }
}
