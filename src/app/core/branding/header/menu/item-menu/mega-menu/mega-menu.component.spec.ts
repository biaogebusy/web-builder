import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideCoreMocks } from '@core/testing/mocks';

import { MegaMenuComponent } from './mega-menu.component';

describe('MegaMenuComponent', () => {
  let component: MegaMenuComponent;
  let fixture: ComponentFixture<MegaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MegaMenuComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(MegaMenuComponent);
    fixture.componentRef.setInput('content', { child: [] });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
