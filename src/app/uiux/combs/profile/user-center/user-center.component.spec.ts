import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCenterComponent } from './user-center.component';

describe('UserCenterComponent', () => {
  let component: UserCenterComponent;
  let fixture: ComponentFixture<UserCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
