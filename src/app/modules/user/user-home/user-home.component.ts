import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppState } from '@core/mobx/AppState';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  content: any[] = [];
  constructor(public appState: AppState) {}

  ngOnInit(): void {
    this.appState.setPageContent();
  }
}
