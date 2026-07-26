import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideCoreMocks } from '@core/testing/mocks';

import { SubMenuComponent } from './sub-menu.component';

describe('SubMenuComponent', () => {
  let component: SubMenuComponent;
  let fixture: ComponentFixture<SubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubMenuComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(SubMenuComponent);
    fixture.componentRef.setInput('content', { child: [] });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
