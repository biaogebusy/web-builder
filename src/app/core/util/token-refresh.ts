import { HttpErrorResponse } from '@angular/common/http';
import type { IUser } from '@core/interface/IUser';
import type { UserService } from '@core/service/user.service';
import {
  Observable,
  ReplaySubject,
  catchError,
  defer,
  filter,
  finalize,
  map,
  merge,
  share,
  switchMap,
  take,
  tap,
  throwError,
  throwIfEmpty,
} from 'rxjs';

/** Credentials that own a request and its refresh attempt. */
export interface TokenSession {
  /** Original account identity. */
  readonly uid: string | undefined;
  /** Access token used by the original request. */
  readonly accessToken: string;
  /** Refresh token belonging to the original credentials. */
  readonly refreshToken: string;
}

interface RefreshRound {
  session: TokenSession;
  result: Observable<TokenSession>;
}

const rounds = new WeakMap<UserService, RefreshRound>();

/** Capture primitives so later credential mutation cannot change request ownership. */
export function captureTokenSession(user: IUser | null): TokenSession | null {
  return user?.access_token
    ? {
        uid: user.current_user?.uid,
        accessToken: user.access_token,
        refreshToken: user.refresh_token,
      }
    : null;
}

function sameSession(a: TokenSession | null, b: TokenSession): boolean {
  return a?.uid === b.uid && a?.accessToken === b.accessToken && a?.refreshToken === b.refreshToken;
}

/** Check ownership before saving credentials or retrying an application request. */
export function isTokenSessionCurrent(userService: UserService, session: TokenSession): boolean {
  return sameSession(captureTokenSession(userService.getStoredUser()), session);
}

/** Share one cancellable refresh among callers with the same original credentials. */
export function refreshSessionToken(
  userService: UserService,
  session: TokenSession
): Observable<string> {
  return defer(() => {
    if (!session.refreshToken || !isTokenSessionCurrent(userService, session)) {
      return throwError(() => new Error('Authentication session changed'));
    }
    let round = rounds.get(userService);
    if (!round || !sameSession(round.session, session)) {
      round = createRound(userService, session);
      rounds.set(userService, round);
    }
    return round.result.pipe(
      map(refreshed => {
        // Each delivery can run user code before the next waiting caller receives its token.
        if (!isTokenSessionCurrent(userService, refreshed)) {
          throw new Error('Authentication session changed');
        }
        return refreshed.accessToken;
      })
    );
  });
}

function createRound(userService: UserService, session: TokenSession): RefreshRound {
  let expected = session;
  let invalidated = false;
  const release = () => {
    if (rounds.get(userService) === round) rounds.delete(userService);
  };
  const changes = userService.userSub$.pipe(
    // User events precede cookie updates, so inspect the event instead of the old cookie.
    filter(
      user => !sameSession(captureTokenSession(typeof user === 'object' ? user : null), expected)
    ),
    tap(() => {
      invalidated = true;
    }),
    switchMap(() => throwError(() => new Error('Authentication session changed')))
  );
  const refresh = defer(() => userService.refreshAccessToken()).pipe(
    take(1),
    throwIfEmpty(() => new Error('Token refresh failed')),
    map(token => {
      if (invalidated || !isTokenSessionCurrent(userService, session)) {
        throw new Error('Authentication session changed');
      }
      if (!token?.access_token) throw new Error('Token refresh failed');
      expected = {
        ...session,
        accessToken: token.access_token,
        refreshToken: token.refresh_token ?? session.refreshToken,
      };
      userService.applyRefreshedToken(token);
      if (invalidated || !isTokenSessionCurrent(userService, expected)) {
        throw new Error('Authentication session changed');
      }
      release();
      return expected;
    })
  );
  const round: RefreshRound = {
    session,
    result: merge(changes, refresh).pipe(
      take(1),
      catchError(error => {
        release();
        // Temporary endpoint failures do not establish that the session was rejected.
        const temporaryFailure = error instanceof HttpErrorResponse &&
          (error.status === 0 || error.status === 408 || error.status === 429 ||
            error.status >= 500 && error.status < 600);
        if (!temporaryFailure && !invalidated && isTokenSessionCurrent(userService, session)) {
          userService.logoutUser();
        }
        return throwError(() => error);
      }),
      finalize(release),
      share({
        connector: () => new ReplaySubject<TokenSession>(1),
        resetOnError: false,
        resetOnComplete: false,
        resetOnRefCountZero: true,
      })
    ),
  };
  return round;
}
