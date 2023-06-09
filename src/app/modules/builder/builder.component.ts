import { Component, Input, OnInit } from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements OnInit {
  @Input() content: IPage;
  constructor() {}

  ngOnInit(): void {}
}
