import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '../../../mobx/AppState';

@Component({
  selector: 'app-dynamic-widgets',
  templateUrl: './dynamic-widgets.component.html',
  styleUrls: ['./dynamic-widgets.component.scss'],
})
export class DynamicWidgetsComponent implements OnInit {
  @Input() content: any;
  constructor(public appState: AppState) {}

  ngOnInit(): void {
    console.log(this.content);
  }
}
