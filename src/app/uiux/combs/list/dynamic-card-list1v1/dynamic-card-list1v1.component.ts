import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-card-list1v1',
  templateUrl: './dynamic-card-list1v1.component.html',
  styleUrls: ['./dynamic-card-list1v1.component.scss'],
})
export class DynamicCardList1v1Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
