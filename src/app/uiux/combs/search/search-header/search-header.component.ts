import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent implements OnInit {
  @Input() content: any;
  searchControl = new FormControl();
  subscribe: Subscription;
  subscription: Subscription;
  @Output() searchChange = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    const $input = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged()
    );

    this.subscription = $input.subscribe((key) => {
      this.searchChange.emit(key);
    });
  }
}
