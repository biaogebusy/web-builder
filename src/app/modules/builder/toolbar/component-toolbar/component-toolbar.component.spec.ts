import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BuilderState } from '@core/state/BuilderState';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { ComponentToolbarComponent } from './component-toolbar.component';

describe('ComponentToolbarComponent', () => {
  let component: ComponentToolbarComponent;
  let fixture: ComponentFixture<ComponentToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentToolbarComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentToolbarComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should act on the rebound component when its slot is reused', () => {
    // generatePath() walks up to the nearest `.component-item`, so mirror the builder DOM
    const item = document.createElement('div');
    item.className = 'component-item';
    const slot = document.createElement('div');
    slot.setAttribute('data-path', '0');
    item.appendChild(slot);
    slot.appendChild(fixture.nativeElement);
    document.body.appendChild(item);

    // The builder `@for` blocks track by `$index`: inserting a component in front of
    // an existing one reuses this toolbar instance and only rebinds `content`.
    fixture.componentRef.setInput('content', { type: 'btn', label: '了解更多' });
    fixture.detectChanges();

    const chart = { type: 'chart', title: { text: '年度活动金额预算' } };
    fixture.componentRef.setInput('content', chart);
    fixture.detectChanges();

    const builder = TestBed.inject(BuilderState);
    component.onSetting();

    expect(component.type()).toBe('chart');
    expect(builder.showComponentSetting).toHaveBeenCalledWith(chart, expect.anything(), '0');

    item.remove();
  });
});
