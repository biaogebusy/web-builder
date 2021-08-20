import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent implements OnInit {
  @Input() content: any;
  @Input() keys: string;
  @Output() searchChange = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}

  onSubmit(key: string): void {
    this.searchChange.emit(key);
  }
}
