import { Component, OnInit, Input } from '@angular/core';
import { AppState } from 'src/app/mobx/AppState';
declare var window: any;

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  @Input() content: any;
  config: any;
  url: string;
  constructor(public appState: AppState) {}
  ngOnInit(): void {
    this.config = this.appState.actions?.share;
    this.url = `${this.appState.origin}${this.content.params.url}`;
  }

  open(): void {
    window.socialShare('.share-components');
  }
}
