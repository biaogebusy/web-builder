import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocloseComponent } from './autoclose.component';

describe('AutocloseComponent', () => {
  let component: AutocloseComponent;
  let fixture: ComponentFixture<AutocloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocloseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
