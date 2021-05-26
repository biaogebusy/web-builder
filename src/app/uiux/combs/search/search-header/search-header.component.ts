import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from 'src/app/service/route.service';

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
  key: string;
  @Output() searchChange = new EventEmitter();
  constructor(
    private router: ActivatedRoute,
    private routerService: RouteService
  ) {}

  ngOnInit(): void {
    this.router.queryParamMap.subscribe((query: any) => {
      console.log(query);
      this.key = query.params.keys;
    });

    const $input = this.searchControl.valueChanges.pipe(
      startWith(this.key || ''),
      debounceTime(500),
      distinctUntilChanged()
    );

    this.subscription = $input.subscribe((key) => {
      this.searchChange.emit(key);
      if (!this.key && key) {
        this.routerService.updateQueryParams(key);
      }
    });
  }
}
