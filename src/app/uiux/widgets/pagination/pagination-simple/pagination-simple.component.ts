import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-simple',
  templateUrl: './pagination-simple.component.html',
  styleUrls: ['./pagination-simple.component.scss'],
})
export class PaginationSimpleComponent implements OnInit {
  @Input() links: any;
  @Output() pageChange: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  loadPage(link: string): void {
    this.pageChange.emit(link);
  }
}
