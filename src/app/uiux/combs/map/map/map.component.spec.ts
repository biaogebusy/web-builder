import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
