import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { ILayoutBuilder } from '@core/interface/IBuilder';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { LayoutBuilderComponent } from './layout-builder.component';

const content: ILayoutBuilder = {
  type: 'layout-builder',
  fullWidth: false,
  horizontal: 'center',
  vertical: 'start',
  gap: { xs: 4 },
  elements: [
    {
      classes: '',
      row: { xs: 6 },
      horizontal: 'start',
      vertical: 'start',
      elements: [],
    },
    {
      classes: '',
      row: { xs: 6, md: 4 },
      horizontal: 'start',
      vertical: 'start',
      elements: [],
    },
  ],
};

describe('LayoutBuilderComponent', () => {
  let component: LayoutBuilderComponent;
  let fixture: ComponentFixture<LayoutBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutBuilderComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutBuilderComponent);
    fixture.componentRef.setInput('content', content);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render one .layout per element with data-path', () => {
    const layouts: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('.layout');
    expect(layouts.length).toBe(2);
    expect(layouts[0].getAttribute('data-path')).toBe('elements.0');
    expect(layouts[1].getAttribute('data-path')).toBe('elements.1');
  });

  it('should not render a hardcoded id on the layout wrapper', () => {
    expect(fixture.nativeElement.querySelector('#layout')).toBeNull();
  });

  it('should apply responsive classes only for configured breakpoints', () => {
    const inner: HTMLElement = fixture.nativeElement.querySelector('.layout-inner');
    expect(inner.classList).toContain('gap-4');
    expect(inner.className).not.toContain('gap-none');

    const layouts: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('.layout');
    expect(layouts[0].classList).toContain('col-span-6');
    expect(layouts[0].className).not.toContain('undefined');
    expect(layouts[1].classList).toContain('md:col-span-4');
    expect(layouts[1].className).not.toContain('undefined');
  });

  it('should render the empty state when there are no elements', () => {
    fixture.componentRef.setInput('content', { ...content, elements: [] });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.empty-state')).toBeTruthy();
  });
});
