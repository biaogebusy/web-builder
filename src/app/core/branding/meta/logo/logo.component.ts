import { Component, Input, OnInit } from '@angular/core';
import { version } from '../../../../../../package.json';
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}

  get version(): string {
    return version;
  }
}
