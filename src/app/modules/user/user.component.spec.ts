import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WritableSignal } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { USER } from '@core/token/token-providers';
import { provideCoreMocks } from '@core/testing/mocks';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('returns to login without reading the user collection when authentication is absent', () => {
    const service = TestBed.inject(UserService);
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    component.getUser();

    expect(service.getUserById).not.toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(['/me/login']);
  });

  it('keeps the profile read scoped to the current authenticated UID', () => {
    const current = TestBed.inject(USER) as WritableSignal<IUser | boolean>;
    current.set({ current_user: { uid: '29' } } as IUser);
    const service = TestBed.inject(UserService);
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    component.getUser();

    expect(service.getUserById).toHaveBeenCalledWith('29');
    expect(navigate).not.toHaveBeenCalled();
  });
});
