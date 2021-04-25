import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InverseComponent } from './inverse.component';

describe('InverseComponent', () => {
  let component: InverseComponent;
  let fixture: ComponentFixture<InverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InverseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
