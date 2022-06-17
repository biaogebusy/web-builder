import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavoriteComponent } from './user-favorite.component';

describe('UserFavoriteComponent', () => {
  let component: UserFavoriteComponent;
  let fixture: ComponentFixture<UserFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFavoriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
