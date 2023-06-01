import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-showcase-1v4',
  templateUrl: './showcase1v4.component.html',
  styleUrls: ['./showcase1v4.component.scss'],
})
export class Showcase1v4Component extends BaseComponent implements OnInit {
  @Input() content: any;
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
