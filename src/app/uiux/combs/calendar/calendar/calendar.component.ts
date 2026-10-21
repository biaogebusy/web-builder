import {
  Component, OnInit, inject, ChangeDetectionStrategy, input, computed, afterRenderEffect,
  ElementRef, viewChild,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import type { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import luxonPlugin from '@fullcalendar/luxon3';
import zhLocale from '@fullcalendar/core/locales/zh-cn';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [FullCalendarModule, LoadingComponent],
})
export class CalendarComponent implements OnInit {
  readonly content = input<any>();
  readonly options = input<CalendarOptions>();
  readonly loading = input<boolean>();
  /** Show a read-only month, using a list when the container is narrower than 640px. */
  readonly responsive = input(false);
  private readonly translate = inject(TranslateService, { optional: true });
  private readonly language = this.translate ? toSignal(this.translate.onLangChange) : undefined;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly calendar = viewChild(FullCalendarComponent);
  private readonly initialDate = computed(() => this.options()?.initialDate);
  readonly calendarOptions = computed<CalendarOptions | undefined>(() => {
    const options = this.options();
    if (!this.responsive()) return options;
    const lang = this.language?.()?.lang || this.translate?.currentLang || 'en';
    return {
      ...options, plugins: [dayGridPlugin, listPlugin, luxonPlugin],
      locale: lang.startsWith('zh') ? 'zh-cn' : 'en', locales: [zhLocale],
      initialView: 'listMonth', headerToolbar: { start: 'title', end: 'prev,next' },
      height: 'auto', handleWindowResize: false, editable: false, selectable: false,
      navLinks: false, eventInteractive: false, dayMaxEvents: false, fixedWeekCount: false,
      eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
      displayEventEnd: true,
    };
  });
  isBrowser = false;
  eventGuid = 0;
  screenService = inject(ScreenService);

  constructor() {
    afterRenderEffect(onCleanup => {
      const calendar = this.calendar();
      if (!calendar || !this.responsive()) return;
      const api = calendar.getApi();
      let frame = 0;
      let previousWidth = -1;
      const observer = new ResizeObserver(([entry]) => {
        const width = Math.floor(entry.contentRect.width);
        if (width <= 0 || width === previousWidth) return;
        previousWidth = width;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const view = width < 640 ? 'listMonth' : 'dayGridMonth';
          // Keep the browsed month when a panel resize or a portal changes available space.
          if (api.view.type !== view) api.changeView(view, api.getDate());
          api.updateSize();
        });
      });
      observer.observe(this.host.nativeElement);
      onCleanup(() => { observer.disconnect(); cancelAnimationFrame(frame); });
    });
    afterRenderEffect(() => {
      const date = this.initialDate();
      const calendar = this.calendar();
      if (this.responsive() && date && calendar) calendar.getApi().gotoDate(date);
    });
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.isBrowser = true;
    }
  }
}
