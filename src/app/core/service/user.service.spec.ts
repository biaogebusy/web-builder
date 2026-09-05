import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HttpTestingController } from '@angular/common/http/testing';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { provideCoreMocks } from '@core/testing/mocks';

describe('UserService auth channel', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provideCoreMocks supplies a mocked UserService; provide the real implementation here
      providers: [provideRouter([]), ...provideCoreMocks(), UserService],
    });
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    service['closeAuthChannel']();
    TestBed.resetTestingModule();
  });

  const dispatchPageshow = (persisted: boolean): void => {
    const event = new Event('pageshow');
    Object.defineProperty(event, 'persisted', { value: persisted });
    window.dispatchEvent(event);
  };

  it('opens the auth channel on construction', () => {
    expect(service['authChannel']).not.toBeNull();
  });

  it('closes the channel on pagehide so the page can enter bfcache', () => {
    window.dispatchEvent(new Event('pagehide'));

    expect(service['authChannel']).toBeNull();
  });

  it('reopens the channel and re-syncs auth state on bfcache restore', () => {
    const emitted: (IUser | boolean)[] = [];
    service.userSub$.subscribe(value => emitted.push(value));

    window.dispatchEvent(new Event('pagehide'));
    dispatchPageshow(true);

    expect(service['authChannel']).not.toBeNull();
    // Without a login cookie, sync as logged out
    expect(emitted).toEqual([false]);
  });

  it('ignores the initial pageshow of a normal load', () => {
    window.dispatchEvent(new Event('pagehide'));
    dispatchPageshow(false);

    expect(service['authChannel']).toBeNull();
  });
});

describe('UserService profile mapping', () => {
  let service: UserService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provideCoreMocks supplies a mocked UserService; provide the real implementation here
      providers: [provideRouter([]), ...provideCoreMocks(), UserService],
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    TestBed.resetTestingModule();
  });

  it('prefers the full_name nickname over the core display_name field', () => {
    service
      .getCurrentUserById('1', { access_token: 'token' } as any)
      .subscribe(profile => {
        expect(profile.display_name).toBe('roottest');
        expect(profile.mail).toBe('a@b.co');
      });

    const req = http.expectOne(r => r.url.includes('/api/v1/user/user'));
    req.flush({
      data: [{ id: 'u-1', display_name: 'root', full_name: 'roottest', mail: 'a@b.co' }],
    });
  });

  it('falls back to the core display_name when full_name is empty', () => {
    service
      .getCurrentUserById('1', { access_token: 'token' } as any)
      .subscribe(profile => {
        expect(profile.display_name).toBe('root');
      });

    const req = http.expectOne(r => r.url.includes('/api/v1/user/user'));
    req.flush({ data: [{ id: 'u-1', display_name: 'root', full_name: '', mail: 'a@b.co' }] });
  });

  it('emits a fresh object with the refreshed profile after updateUser', () => {
    const emitted: (IUser | boolean)[] = [];
    service.userSub$.subscribe(u => emitted.push(u));

    const tokenUser = {
      access_token: 'token',
      current_user: { uid: '1', name: 'root', roles: [] },
    };
    let refreshed: IUser | undefined;
    service.updateUser(tokenUser as any).subscribe(u => (refreshed = u));

    const req = http.expectOne(r => r.url.includes('/api/v1/user/user'));
    req.flush({ data: [{ id: 'u-1', display_name: 'root', full_name: 'new-name', mail: 'a@b.co' }] });

    const last = emitted[emitted.length - 1] as IUser;
    expect(last.display_name).toBe('new-name');
    // Same-reference emission would not notify the USER signal, leaving the UI stale
    expect(last).not.toBe(tokenUser);
    // Callers resync from the returned user, so it has to carry the refreshed profile
    expect(refreshed).toBe(last);
  });
});
