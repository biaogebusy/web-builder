import { Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss'],
})
export class JobFilterComponent implements OnInit, AfterViewInit {

  @Input() content: any;
  @Output() regionChange = new EventEmitter();
  selectedValue = '';
  @ViewChild('search', { read: ElementRef }) search: ElementRef;
  subscription: Subscription;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const $input = fromEvent<any>(this.search.nativeElement, 'input').pipe(
      map(event => event.target.value),
      startWith(''),
      debounceTime(200),
      distinctUntilChanged()
    );

    this.subscription = $input.subscribe(key => {
      console.log(key);
    });
  }
  onSelectRegion(event: any): void {
    console.log(event);
    this.regionChange.emit(event.value);
  }
}
