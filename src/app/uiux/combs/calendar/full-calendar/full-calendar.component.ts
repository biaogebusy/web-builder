import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScreenService } from '@core/service/screen.service';
import { FormService } from '@core/service/form.service';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppState } from '@core/mobx/AppState';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullCalendarComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @Input() content: any;
  selected: Date | null;
  events: any[];
  form: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public appState: AppState,
    private screenService: ScreenService,
    private formService: FormService,
    private nodeService: NodeService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.initForm();
      this.getEvents();
    }
  }

  initForm(): void {
    this.form = this.formService.toFormGroup(this.content.sidebar);
    this.form.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        console.log(value);
        this.getEvents(value);
      });
  }

  getEvents(options?: any): void {
    const type = 'content';
    const state = this.getParamsState(this.form.value, options);
    const params = this.getApiParams(state);
    this.nodeService
      .search(type, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log(data);
        this.events = data.rows.map((item: any) => {
          return {
            title: item.title,
            start: item.created,
            url: item.url,
          };
        });
        this.appState.calendarChange$.next(this.events);
        this.cd.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
