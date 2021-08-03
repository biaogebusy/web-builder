import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  @Input() key: string;
  @Output() searchChange = new EventEmitter();
  @ViewChild('input') input: ElementRef;

  subscribe: Subscription;
  subscription: Subscription;
  constructor() {}

  ngOnInit(): void {}

  onSubmit(key: string): void {
    this.searchChange.emit(key);
  }
}
