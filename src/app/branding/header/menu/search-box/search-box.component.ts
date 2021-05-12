import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  @Input() content: any;

  searchControl = new FormControl();
  options: string[] = ['one', 'two', 'three'];
  constructor() {}

  ngOnInit(): void {}
}
