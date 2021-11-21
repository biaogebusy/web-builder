import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixBarPopupComponent } from './fix-bar-popup.component';

describe('FixBarPopupComponent', () => {
  let component: FixBarPopupComponent;
  let fixture: ComponentFixture<FixBarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixBarPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixBarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
