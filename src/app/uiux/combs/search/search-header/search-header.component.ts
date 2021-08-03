import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent implements OnInit {
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
