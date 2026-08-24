import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { UserService } from '@core/service/user.service';
import { provideCoreMocks } from '@core/testing/mocks';
import { environment } from 'src/environments/environment';
import { vi } from 'vitest';

describe('UserService logout', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provideCoreMocks supplies a mocked UserService; provide the real implementation here
      providers: [provideRouter([]), ...provideCoreMocks(), UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    service['closeAuthChannel']();
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  const spyOnLogoutEffects = () => ({
    logoutUser: vi.spyOn(service, 'logoutUser'),
    navigateByUrl: vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true),
  });

  const expectLogoutRequest = () =>
    httpMock.expectOne(`${service.apiUrl}${environment.oauth.logoutPath}`);

  it('ends the Drupal session before dropping the local state', () => {
    const { logoutUser, navigateByUrl } = spyOnLogoutEffects();

    service.logout();

    const req = expectLogoutRequest();
    expect(req.request.method).toBe('POST');
    // The stored token authorizes the call, so forgetting the user first would leave the CMS
    // session alive and the next authorize request would hand out a code for the same account.
    expect(logoutUser).not.toHaveBeenCalled();

    req.flush(null, { status: 204, statusText: 'No Content' });

    expect(logoutUser).toHaveBeenCalled();
    expect(navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('still completes the logout when the backend rejects the request', () => {
    const { logoutUser, navigateByUrl } = spyOnLogoutEffects();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    service.logout();
    expectLogoutRequest().flush(null, { status: 403, statusText: 'Forbidden' });

    expect(logoutUser).toHaveBeenCalled();
    expect(navigateByUrl).toHaveBeenCalledWith('/home');
  });
});
