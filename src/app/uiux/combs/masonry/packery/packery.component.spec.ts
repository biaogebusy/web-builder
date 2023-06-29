import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackeryComponent } from './packery.component';

describe('PackeryComponent', () => {
  let component: PackeryComponent;
  let fixture: ComponentFixture<PackeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackeryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
