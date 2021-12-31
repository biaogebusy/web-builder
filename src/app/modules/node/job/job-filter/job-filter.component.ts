import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  startWith,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobFilterComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: any;
  @Input() autoList: any[];
  @Input() skills: any[];
  @Output() selectedChange = new EventEmitter();
  @Output() skillChange = new EventEmitter();
  @Output() searchChange = new EventEmitter();
  @Output() clear = new EventEmitter();

  selectedValue = '';
  titleControl = new FormControl();

  @ViewChild('search', { read: ElementRef }) search: ElementRef;
  @ViewChild('input', { read: ElementRef }) input: ElementRef;
  subscription: Subscription;

  constructor(
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onSelected(auto: any): void {
    this.selectedChange.emit(auto.option.value);
  }

  onClear(): void {
    this.input.nativeElement.value = '';
    this.clear.emit();
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      const $input = fromEvent<any>(this.search.nativeElement, 'input').pipe(
        map((event) => event.target.value),
        startWith(''),
        debounceTime(200),
        distinctUntilChanged()
      );

      this.subscription = $input.subscribe((key) => {
        this.searchChange.emit(key);
      });
    }
  }

  onSelectSkill(event: any): void {
    this.skillChange.emit(event.value);
  }

  ngOnDestroy(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.subscription.unsubscribe();
    }
  }
}
