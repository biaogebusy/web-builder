import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-law-table',
  templateUrl: './law-table.component.html',
  styleUrls: ['./law-table.component.scss'],
})
export class LawTableComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
