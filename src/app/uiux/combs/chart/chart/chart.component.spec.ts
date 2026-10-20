import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import { vi } from 'vitest';
import * as echarts from 'echarts/core';
import { Subject } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';
import { ConfigService } from '@core/service/config.service';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // The mocked ScreenService reports the server platform, so echarts.init never runs
  // and the instance can be stubbed to observe what the component would paint.
  function stubChart(): ReturnType<typeof vi.fn> {
    const setOption = vi.fn();
    fixture.detectChanges();
    (component as any).chart = { setOption };
    return setOption;
  }

  it('re-applies the option when the builder replaces the chart config', () => {
    const setOption = stubChart();

    fixture.componentRef.setInput('content', { series: [{ type: 'pie', data: [1] }] });
    fixture.detectChanges();

    expect(setOption).toHaveBeenNthCalledWith(
      1,
      { series: [{ type: 'pie', data: [1] }] },
      { notMerge: true }
    );
  });

  it('drops the cartesian axes when the series switches to a non-cartesian type', () => {
    const setOption = stubChart();

    fixture.componentRef.setInput('content', {
      series: [{ type: 'pie' }],
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },
    });
    fixture.detectChanges();

    const [option] = setOption.mock.calls[0];
    expect(option.xAxis).toBeUndefined();
    expect(option.yAxis).toBeUndefined();
  });
});

describe('ChartComponent lifecycle', () => {
  it('resizes its container and releases the chart and pending theme update', async () => {
    let resized!: ResizeObserverCallback;
    const disconnect = vi.fn();
    const observe = vi.fn();
    vi.stubGlobal('ResizeObserver', class {
      constructor(callback: ResizeObserverCallback) { resized = callback; }
      observe = observe;
      disconnect = disconnect;
    });
    const themes = new Subject<void>();
    TestBed.configureTestingModule({
      imports: [ChartComponent],
      providers: [
        provideRouter([]), ...provideUiuxMocks(),
        { provide: ScreenService, useValue: { isPlatformBrowser: () => true } },
        { provide: ConfigService, useValue: { switchChange$: themes } },
      ],
    });
    const fixture = TestBed.createComponent(ChartComponent);
    fixture.componentRef.setInput('content', {});
    fixture.componentRef.setInput('style', { width: '400px', height: '400px' });
    try {
      fixture.detectChanges();
      const element = fixture.nativeElement.querySelector('.chart');
      const chart = echarts.getInstanceByDom(element)!;
      const setOption = vi.spyOn(chart, 'setOption');
      const resize = vi.spyOn(chart, 'resize');
      const dispose = vi.spyOn(chart, 'dispose');
      expect(observe).toHaveBeenCalledWith(element);
      resized([], {} as ResizeObserver);
      expect(resize).toHaveBeenCalledOnce();
      themes.next();
      fixture.destroy();
      const calls = setOption.mock.calls.length;
      await new Promise(resolve => setTimeout(resolve, 10));
      expect(setOption).toHaveBeenCalledTimes(calls);
      expect(disconnect).toHaveBeenCalledOnce();
      expect(dispose).toHaveBeenCalledOnce();
    } finally {
      fixture.destroy();
      vi.unstubAllGlobals();
    }
  });
});
