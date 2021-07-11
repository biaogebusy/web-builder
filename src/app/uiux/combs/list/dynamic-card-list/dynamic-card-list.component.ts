import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-card-list',
  templateUrl: './dynamic-card-list.component.html',
  styleUrls: ['./dynamic-card-list.component.scss'],
})
export class DynamicCardListComponent implements OnInit {
  @Input() content: any;
  list: any;
  loading: true;
  constructor() {}

  ngOnInit(): void {}
}
