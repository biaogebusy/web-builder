import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GotopComponent } from './gotop.component';

describe('GotopComponent', () => {
  let component: GotopComponent;
  let fixture: ComponentFixture<GotopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GotopComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GotopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an accessible name on the button', () => {
    const button = fixture.nativeElement.querySelector('[role="button"]');
    expect(button.getAttribute('aria-label')).toBe('返回顶部');
  });
});
