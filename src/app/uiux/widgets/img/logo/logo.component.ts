import { Component, Input, OnInit } from '@angular/core';
import type { ILogo } from '@core/interface/branding/IBranding';
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() content: ILogo | undefined;
  constructor() {}

  ngOnInit(): void {}
}
