import { HttpClient } from '@angular/common/http';
import { DOCUMENT, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { IUser } from '@core/interface/IUser';
import { CommentService } from '@core/service/comment.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { API_URL, USER } from '@core/token/token-providers';
import { firstValueFrom, of } from 'rxjs';

describe('NodeService access rules', () => {
  let service: NodeService;

  const userWith = (roles: string[], authenticated = true): IUser =>
    ({ authenticated, current_user: { roles, uid: '5' } }) as unknown as IUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NodeService,
        { provide: API_URL, useValue: '' },
        { provide: DOCUMENT, useValue: document },
        { provide: HttpClient, useValue: { post: vi.fn(() => of({})), get: vi.fn(() => of({})) } },
        { provide: USER, useValue: signal(false) },
        { provide: UtilitiesService, useValue: { openSnackbar: vi.fn() } },
        { provide: BuilderState, useValue: { currentPage: {} } },
        { provide: CommentService, useValue: {} },
      ],
    });
    service = TestBed.inject(NodeService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('denies anonymous users regardless of rules', () => {
    expect(service.checkReqRule(['editor'], userWith(['editor'], false))).toBe(false);
  });

  it('lets administrators pass any rule', () => {
    expect(service.checkReqRule(['editor'], userWith(['administrator']))).toBe(true);
  });

  it('matches when the user holds one of the required roles', () => {
    expect(service.checkReqRule(['editor', 'manager'], userWith(['authenticated', 'manager']))).toBe(
      true
    );
    expect(service.checkReqRule(['editor'], userWith(['authenticated']))).toBe(false);
  });

  it('grants access to restricted nodes only for allowed roles', async () => {
    const params = { require_rule: ['editor'] };

    await expect(
      firstValueFrom(service.checkNodeAccess(params, 'n-1', userWith(['editor'])))
    ).resolves.toEqual({ canAccess: true, isReqRoles: true });

    await expect(
      firstValueFrom(service.checkNodeAccess(params, 'n-1', userWith(['authenticated'])))
    ).resolves.toEqual({ canAccess: false, isReqRoles: false });
  });

  it('treats nodes without rules as public', async () => {
    await expect(
      firstValueFrom(service.checkNodeAccess({}, 'n-1', userWith([], false)))
    ).resolves.toEqual({ canAccess: true, isReqRoles: false });
  });
});
