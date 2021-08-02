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
import { ActivatedRoute, Params } from '@angular/router';
import { RouteService } from 'src/app/service/route.service';
import { FormControl } from '@angular/forms';

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
  constructor(private routerService: RouteService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const input$ = fromEvent<any>(this.input.nativeElement, 'input').pipe(
      map((event) => event.target.value),
      startWith(''),
      debounceTime(500),
      distinctUntilChanged()
    );

    this.subscription = input$.subscribe((key) => {
      if (key) {
        this.searchChange.emit(key);
        const query: Params = { keys: key };
        this.routerService.updateQueryParams(query);
      }
    });
  }

  onSubmit(key: string): void {
    this.searchChange.emit(key);
  }
}
