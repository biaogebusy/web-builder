import { Component, OnInit, Input } from '@angular/core';
declare var window: any;

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  @Input() content: any;

  constructor() {}
  ngOnInit(): void {}

  open(): void {
    window.socialShare('.share-components');
  }
}
