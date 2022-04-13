import { Component, OnInit } from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {
  content: any;
  constructor(public appState: AppState, private router: Router) {}

  ngOnInit(): void {
    this.appState.setPageContent();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
      }
    });
  }
}
