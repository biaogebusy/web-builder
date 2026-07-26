import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideCoreMocks } from '@core/testing/mocks';

import { LightComponent } from './light.component';

describe('LightComponent', () => {
  let component: LightComponent;
  let fixture: ComponentFixture<LightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(LightComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
