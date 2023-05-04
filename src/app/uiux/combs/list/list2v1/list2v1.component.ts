import { Component, Input, OnInit } from '@angular/core';
import { ScreenState } from '@core/state/screen/ScreenState';

@Component({
  selector: 'app-list-2v1',
  templateUrl: './list2v1.component.html',
  styleUrls: ['./list2v1.component.scss'],
})
export class List2v1Component implements OnInit {
  @Input() content: any;
  lists: any[];
  constructor(public screen: ScreenState) {}

  ngOnInit(): void {}
}
