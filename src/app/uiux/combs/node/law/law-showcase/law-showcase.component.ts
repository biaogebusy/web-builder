import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'law-showcase',
  templateUrl: './law-showcase.component.html',
  styleUrls: ['./law-showcase.component.scss'],
})
export class LawShowcaseComponent implements OnInit {
  @Input() content: any;
  @Input() form: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
