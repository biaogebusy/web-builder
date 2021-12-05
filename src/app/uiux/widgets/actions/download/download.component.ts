import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '@core/mobx/AppState';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
})
export class DownloadComponent implements OnInit {
  @Input() content: any;
  config: any;
  constructor(public appState: AppState) {}

  ngOnInit(): void {
    this.config = this.appState?.actions?.download;
  }
}
