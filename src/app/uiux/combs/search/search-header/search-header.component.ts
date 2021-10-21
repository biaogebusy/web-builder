import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent implements OnInit {
  @Input() content: any;
  @Input() filterForm: any;
  @Input() form: FormGroup;

  formControl: any;

  constructor() {}

  ngOnInit(): void {}
}
