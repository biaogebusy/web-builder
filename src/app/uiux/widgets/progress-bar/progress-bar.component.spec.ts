import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('names the progress indicator and retains zero progress', async () => {
    fixture.componentRef.setInput('content', { label: 'Completed: 0 of 10', value: 0 });
    await fixture.whenStable();
    const progress = fixture.nativeElement.querySelector('[role="progressbar"]');
    expect(progress.getAttribute('aria-label')).toBe('Completed: 0 of 10');
    expect(progress.getAttribute('aria-valuenow')).toBe('0');
  });
});
