import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/uiux/base/base.widget';

@Component({
  selector: 'app-showcase3v6',
  templateUrl: './showcase3v6.component.html',
  styleUrls: ['./showcase3v6.component.scss'],
})
export class Showcase3v6Component extends BaseComponent implements OnInit {
  @Input() content: any;
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
