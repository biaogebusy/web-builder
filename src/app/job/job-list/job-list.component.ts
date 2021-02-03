import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {
  @Input() content: any;
  @Input() relation: any;
  @Input() selectedId: string;
  @Output() selected = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClick(item: any, i: number): void {
    const obj = {
      index: i,
      item: item,
    };
    this.selected.emit(obj);
  }
}
