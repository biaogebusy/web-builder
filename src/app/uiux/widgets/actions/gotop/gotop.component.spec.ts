import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GotopComponent } from './gotop.component';

describe('GotopComponent', () => {
  let component: GotopComponent;
  let fixture: ComponentFixture<GotopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GotopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GotopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
