import { Component, OnInit } from '@angular/core';
import { AppState } from '../../mobx/AppState';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
})
export class DynamicComponent implements OnInit {
  content: any;
  constructor(public appState: AppState) { }

  ngOnInit(): void {
    this.appState.setPageContent();
  }
}
