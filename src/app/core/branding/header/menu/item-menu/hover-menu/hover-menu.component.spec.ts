import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideCoreMocks } from '@core/testing/mocks';

import { HoverMenuComponent } from './hover-menu.component';

describe('HoverMenuComponent', () => {
  let component: HoverMenuComponent;
  let fixture: ComponentFixture<HoverMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoverMenuComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(HoverMenuComponent);
    fixture.componentRef.setInput('content', { child: [] });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
