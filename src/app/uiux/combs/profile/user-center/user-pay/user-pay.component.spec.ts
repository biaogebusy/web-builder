import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPayComponent } from './user-pay.component';

describe('UserPayComponent', () => {
  let component: UserPayComponent;
  let fixture: ComponentFixture<UserPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
