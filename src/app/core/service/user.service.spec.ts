import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
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
