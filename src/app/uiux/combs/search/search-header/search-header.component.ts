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

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  @Output() searchChange = new EventEmitter();
  @ViewChild('input') input: ElementRef;

  subscribe: Subscription;
  subscription: Subscription;
  key = '';
  constructor(
    private router: ActivatedRoute,
    private routerService: RouteService
  ) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe((query: any) => {
      console.log(query);
      if (query.keys) {
        this.key = query.keys;
        this.searchChange.emit(this.key);
      }
    });
  }

  ngAfterViewInit(): void {
    const input$ = fromEvent<any>(this.input.nativeElement, 'input').pipe(
      map((event) => event.target.value),
      startWith(''),
      debounceTime(500),
      distinctUntilChanged()
    );

    this.subscription = input$.subscribe((key) => {
      this.searchChange.emit(key);
      if (key) {
        const query: Params = { keys: key };
        this.routerService.updateQueryParams(query);
      }
    });
  }

  onSubmit(key: string): void {
    this.searchChange.emit(key);
  }
}
