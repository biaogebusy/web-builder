import { Component, Input, OnInit, Output } from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-font-change',
  templateUrl: './font-change.component.html',
  styleUrls: ['./font-change.component.scss'],
})
export class FontChangeComponent implements OnInit {
  constructor(public appState: AppState) {}
  @Input() content: any;
  @Input() form: FormGroup;

  ngOnInit(): void {}
}
