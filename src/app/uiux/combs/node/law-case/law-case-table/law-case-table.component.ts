import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-law-case-table',
  templateUrl: './law-case-table.component.html',
  styleUrls: ['./law-case-table.component.scss'],
})
export class LawCaseTableComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
