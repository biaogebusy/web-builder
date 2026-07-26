import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideCoreMocks } from '@core/testing/mocks';

import { DynamicMenuComponent } from './dynamic-menu.component';

describe('DynamicMenuComponent', () => {
  let component: DynamicMenuComponent;
  let fixture: ComponentFixture<DynamicMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicMenuComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
