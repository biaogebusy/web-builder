import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-law-case',
  templateUrl: './law-case.component.html',
  styleUrls: ['./law-case.component.scss'],
})
export class LawCaseComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
