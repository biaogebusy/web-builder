import { Component, OnInit } from '@angular/core';
import { AppState } from '../../mobx/AppState';

@Component({
  selector: 'app-dynamic',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {
  content: any;
  constructor(public appState: AppState) {}

  ngOnInit(): void {
    this.appState.setPageContent();
  }
}
