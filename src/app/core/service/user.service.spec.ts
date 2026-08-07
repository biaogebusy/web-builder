import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { provideCoreMocks } from '@core/testing/mocks';

describe('UserService auth channel', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provideCoreMocks 提供的 UserService 是 mock,这里重新提供真实实现
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
    // 无登录 cookie 时按未登录同步
    expect(emitted).toEqual([false]);
  });

  it('ignores the initial pageshow of a normal load', () => {
    window.dispatchEvent(new Event('pagehide'));
    dispatchPageshow(false);

    expect(service['authChannel']).toBeNull();
  });
});
