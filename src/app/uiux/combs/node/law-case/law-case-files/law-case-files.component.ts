import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-law-case-files',
  templateUrl: './law-case-files.component.html',
  styleUrls: ['./law-case-files.component.scss'],
})
export class LawCaseFilesComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
