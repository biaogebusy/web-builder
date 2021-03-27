import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { AppState } from '../../../mobx/AppState';

@Component({
  selector: 'app-dynamic-widgets',
  templateUrl: './dynamic-widgets.component.html',
  styleUrls: ['./dynamic-widgets.component.scss'],
})
export class DynamicWidgetsComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  public ready = false;
  constructor(public appState: AppState) {}

  ngOnInit(): void {
    console.log(this.content);
  }

  ngAfterViewInit(): void {
    this.ready = true;
  }
}
