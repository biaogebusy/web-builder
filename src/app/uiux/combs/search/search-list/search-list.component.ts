import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit {
  @Input() content: any;
  @Input() loading: boolean;
  p = 1;
  constructor() {}

  ngOnInit(): void {}
}
