import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertComponent } from './advert.component';

describe('AdvertComponent', () => {
  let component: AdvertComponent;
  let fixture: ComponentFixture<AdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
