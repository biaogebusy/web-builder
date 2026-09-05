import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NotifyService } from '@core/service/notify.service';
import { NodeService } from '@core/service/node.service';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { IUser } from '@core/interface/IUser';
import { firstValueFrom, of } from 'rxjs';

/** Resolves when the source either emits or completes, capturing which happened. */
const trackOutcome = (source: any) =>
  new Promise<{ emitted: boolean; completed: boolean; value?: unknown }>(resolve => {
    const outcome = { emitted: false, completed: false };
    source.subscribe({
      next: (value: unknown) => {
        outcome.emitted = true;
        resolve({ ...outcome, value });
      },
      complete: () => {
        outcome.completed = true;
        resolve(outcome);
      },
    });
  });

describe('NotifyService', () => {
  const createUser = (roles: string[]): IUser =>
    ({
      current_user: { roles, uid: '42' },
      roles,
      authenticated: true,
      login: 'testuser',
      id: '42',
    }) as unknown as IUser;

  const setup = (
    user: IUser | false,
    apiList: any[] | undefined,
    getNodesResult: any = of({ data: [] })
  ) => {
    const getNodes = vi.fn(
      (_path: string, _type: string, _params: any) => getNodesResult
    );
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        NotifyService,
        { provide: NodeService, useValue: { getNodes } },
        { provide: CORE_CONFIG, useValue: { notify: { api: apiList } } },
        { provide: USER, useValue: signal(user) },
      ],
    });
    return { service: TestBed.inject(NotifyService), getNodes };
  };

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('returns false when no user is logged in', async () => {
    const { service, getNodes } = setup(false, [{ get: '/api/x' }]);
    expect(await firstValueFrom(service.getWatchList())).toBe(false);
    expect(getNodes).not.toHaveBeenCalled();
  });

  it('completes without emitting when the notify config has no api list', async () => {
    const { service, getNodes } = setup(createUser(['editor']), undefined);
    // forkJoin of an empty object completes without emitting.
    const outcome = await trackOutcome(service.getWatchList());
    expect(outcome.emitted).toBe(false);
    expect(outcome.completed).toBe(true);
    expect(getNodes).not.toHaveBeenCalled();
  });

  it('completes without emitting when the api list is empty after filtering', async () => {
    const { service } = setup(createUser(['viewer']), [
      { get: '/api/x', reqRoles: ['admin'] },
    ]);
    const outcome = await trackOutcome(service.getWatchList());
    expect(outcome.emitted).toBe(false);
    expect(outcome.completed).toBe(true);
  });

  it('fetches each configured api with noCache and merges results by index', async () => {
    const results = [of({ total: 1 }), of({ total: 2 })];
    const { service, getNodes } = setup(
      createUser(['editor']),
      [{ get: '/api/notify-a' }, { get: '/api/notify-b' }]
    );
    getNodes.mockReturnValueOnce(results[0]).mockReturnValueOnce(results[1]);

    const watchList = await firstValueFrom(service.getWatchList());

    expect(getNodes).toHaveBeenCalledTimes(2);
    expect(getNodes).toHaveBeenNthCalledWith(1, '/api/notify-a', '', { noCache: 1 });
    expect(getNodes).toHaveBeenNthCalledWith(2, '/api/notify-b', '', { noCache: 1 });
    expect(watchList).toEqual({ 0: { total: 1 }, 1: { total: 2 } });
  });

  it('includes apis without reqRoles for any logged-in user', async () => {
    const { service, getNodes } = setup(createUser(['viewer']), [
      { get: '/api/open' },
    ]);

    await firstValueFrom(service.getWatchList());

    expect(getNodes).toHaveBeenCalledWith('/api/open', '', { noCache: 1 });
  });

  it('includes role-gated apis when the user has a matching role', async () => {
    const { service, getNodes } = setup(createUser(['admin']), [
      { get: '/api/admin-only', reqRoles: ['admin'] },
    ]);

    await firstValueFrom(service.getWatchList());

    expect(getNodes).toHaveBeenCalledWith('/api/admin-only', '', { noCache: 1 });
  });

  it('excludes role-gated apis when the user lacks the role', async () => {
    const { service, getNodes } = setup(createUser(['viewer']), [
      { get: '/api/admin-only', reqRoles: ['admin'] },
      { get: '/api/open' },
    ]);

    await firstValueFrom(service.getWatchList());

    expect(getNodes).toHaveBeenCalledTimes(1);
    expect(getNodes).toHaveBeenCalledWith('/api/open', '', { noCache: 1 });
  });

  it('treats an empty reqRoles array as unrestricted', async () => {
    const { service, getNodes } = setup(createUser(['viewer']), [
      { get: '/api/anyone', reqRoles: [] },
    ]);

    await firstValueFrom(service.getWatchList());

    expect(getNodes).toHaveBeenCalledWith('/api/anyone', '', { noCache: 1 });
  });
});
