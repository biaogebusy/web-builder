import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-law-case-showcase',
  templateUrl: './law-case-showcase.component.html',
  styleUrls: ['./law-case-showcase.component.scss'],
})
export class LawCaseShowcaseComponent implements OnInit {
  @Input() content: any;
  @Input() form: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
