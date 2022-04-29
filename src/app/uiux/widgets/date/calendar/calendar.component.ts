import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  @Input() options: any;
  @Input() events: any;
  calendarOptions: CalendarOptions;
  default: CalendarOptions = {
    initialView: 'timeGridWeek',
    locale: 'zh-cn',
    handleWindowResize: true,
    eventClick: (data) => {
      this.handleDateClick(data);
    },
    headerToolbar: {
      start: 'prev today next',
      center: 'title',
      end: 'dayGridMonth timeGridWeek listWeek',
    },
  };
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.calendarOptions = Object.assign(this.default, this.options, {
      events: this.events,
    });
    console.log(this.calendarOptions);
  }

  handleDateClick(arg: any): void {
    console.log(arg.view.getCurrentData());
  }
}
