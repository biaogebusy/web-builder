import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapListV1Component } from './map-list-v1.component';

describe('MapListV1Component', () => {
  let component: MapListV1Component;
  let fixture: ComponentFixture<MapListV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapListV1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapListV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
