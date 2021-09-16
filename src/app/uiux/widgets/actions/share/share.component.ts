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
  url: string;
  constructor(private appState: AppState) {}
  ngOnInit(): void {
    this.url = `${this.appState.origin}${this.content.params.url}`;
  }

  open(): void {
    window.socialShare('.share-components');
  }
}
