import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardCountComponent } from './user-card-count.component';

describe('UserCardCountComponent', () => {
  let component: UserCardCountComponent;
  let fixture: ComponentFixture<UserCardCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCardCountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
