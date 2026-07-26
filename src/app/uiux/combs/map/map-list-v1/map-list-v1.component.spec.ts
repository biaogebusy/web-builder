import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { MapListV1Component } from './map-list-v1.component';

describe('MapListV1Component', () => {
  let component: MapListV1Component;
  let fixture: ComponentFixture<MapListV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapListV1Component],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(MapListV1Component);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
