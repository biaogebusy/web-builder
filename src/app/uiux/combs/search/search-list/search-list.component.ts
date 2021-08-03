import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Event } from '@angular/router';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit {
  @Input() content: any;
  @Input() pager: any;
  @Input() loading: boolean;

  @Output() pageChange = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onPageChange(page: number): void {
    this.pageChange.emit(page - 1);
  }
}
