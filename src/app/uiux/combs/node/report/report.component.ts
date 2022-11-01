import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  @Input() content: any;
  @Input() form = new FormGroup({});
  @Input() model: any = {};
  constructor() {}

  ngOnInit(): void {}
}
