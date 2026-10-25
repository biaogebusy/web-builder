import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { DynamicTableComponent } from './dynamic-table.component';

describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent;
  let fixture: ComponentFixture<DynamicTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicTableComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicTableComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders zero and false in ordinary cells', async () => {
    fixture.componentRef.setInput('content', {
      header: [{ key: 'value', label: 'Value' }],
      elements: [{ value: 0 }, { value: false }],
    });
    await fixture.whenStable();
    const cells = [...fixture.nativeElement.querySelectorAll('td')]
      .map((cell: HTMLElement) => cell.textContent?.trim());
    expect(cells).toEqual(['0', 'false']);
  });

  it('keeps plain cells inert, names the table, sorts numbers, and updates data', async () => {
    fixture.componentRef.setInput('plainText', true);
    fixture.componentRef.setInput('content', {
      caption: 'Measured values',
      header: [{ key: 'value', label: '<b>Value</b>', dialog: { label: 'Open' } }],
      elements: [{ value: 10 }, { value: 0 }, { value: '<img src=x onerror=alert(1)>' }],
    });
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;
    expect(host.querySelector('caption')?.textContent).toBe('Measured values');
    expect(host.querySelector('th')?.textContent).toContain('<b>Value</b>');
    expect(host.querySelector('td img, td a, td [role="button"], th b')).toBeNull();
    host.querySelector<HTMLElement>('.mat-sort-header-container')!.click();
    await fixture.whenStable();
    expect(host.querySelector('td')?.textContent?.trim()).toBe('0');
    fixture.componentRef.setInput('content', {
      header: [{ key: 'value', label: 'Value' }], elements: [{ value: 7 }],
    });
    await fixture.whenStable();
    expect(host.querySelectorAll('td')).toHaveLength(1);
    expect(host.querySelector('td')?.textContent?.trim()).toBe('7');
  });
});
