import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { DashboardBoxComponent } from './dashboard-box.component';

describe('DashboardBoxComponent', () => {
  let component: DashboardBoxComponent;
  let fixture: ComponentFixture<DashboardBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBoxComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardBoxComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
