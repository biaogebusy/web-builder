import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@uiux/base/base.widget';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  @Input() form = new FormGroup({});
  @Input() model: any = {};
  constructor() {
    super();
  }

  ngOnInit(): void {}

  clear(): void {
    this.form.reset();
  }
}
