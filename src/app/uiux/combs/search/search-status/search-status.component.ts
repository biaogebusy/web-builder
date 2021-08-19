import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-status',
  templateUrl: './search-status.component.html',
  styleUrls: ['./search-status.component.scss'],
})
export class SearchStatusComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
