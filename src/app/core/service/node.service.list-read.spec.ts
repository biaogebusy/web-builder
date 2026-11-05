import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_URL, CORE_CONFIG } from '@core/token/token-providers';
import { firstValueFrom } from 'rxjs';
import { CommentService } from './comment.service';
import { MediaUploadService } from './media-upload.service';
import { NodeService, type ApiQueryParams } from './node.service';

describe('Content and comment list HTTP requests', () => {
  const apiUrl = 'https://cms.example.test';
  const nodeUrl = `${apiUrl}/api/v1/node/article`;
  const commentUrl = `${apiUrl}/api/v1/comment/discussion`;
  const commentFields = 'include=uid%2Cuid.user_picture%2Cpid' +
    '&fields[user--user]=name%2Cuser_picture&fields[file--file]=uri%2Curl' +
    '&sort=-created&jsonapi_include=1&timeStamp=5';
  const rootUrl = `${commentUrl}?filter[entity_id.id]=node-1&${commentFields}`;
  const childUrl = (id: string) => `${commentUrl}?filter[pid.id]=${id}&${commentFields}`;
  const content = {
    params: { comment: {
      type: 'comment--discussion',
      relationships: { entity_id: { data: { id: 'node-1' } } },
    } },
  };
  let nodes: NodeService;
  let comments: CommentService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      { provide: API_URL, useValue: apiUrl },
      { provide: CORE_CONFIG, useValue: { defaultAvatar: '/default-avatar.png' } },
      { provide: MediaUploadService, useValue: {} },
    ] });
    nodes = TestBed.inject(NodeService);
    comments = TestBed.inject(CommentService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    try {
      http.verify();
    } finally {
      TestBed.resetTestingModule();
    }
  });

  function expectGet(url: string) {
    const request = http.expectOne(url);
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.headers.keys().sort()).toEqual(['Accept', 'Content-Type']);
    expect(request.request.headers.get('Accept')).toBe('application/json');
    expect(request.request.headers.get('Content-Type')).toBe('application/json');
    expect(request.request.withCredentials).toBe(false);
    return request;
  }

  function comment(id: string, parent: string | null = null) {
    return {
      id, pid: { id: parent }, uid: { id: 'user-1', name: 'Reader' },
      changed: '2026-01-02T03:04:05Z', content: { processed: `<p>${id}</p>` },
    };
  }

  it.each<[ApiQueryParams, string]>([
    [undefined, ''], [null, ''], ['', ''], [{}, ''],
    [' ?&filter[title]=a%2Bb&include=uid%2Cuid.user_picture ',
      '?filter[title]=a%2Bb&include=uid%2Cuid.user_picture'],
    [Object.freeze({
      'filter[type]': Object.freeze(['news', 'how to']),
      'filter[status]': false, 'page[offset]': 0, 'title': 'A+B & C', 'empty': '', 'absent': null,
    }), '?filter[type]=news+how%20to&filter[status]=false&page[offset]=0&title=A%2BB%20%26%20C'],
  ])('preserves node query encoding for %j', async (params, suffix) => {
    const result = firstValueFrom(nodes.getNodes('/api/v1/node', 'article', params));
    const response = { data: [{ id: 'node-1' }], links: { next: '/next' } };
    expectGet(nodeUrl + suffix).flush(response);
    await expect(result).resolves.toBe(response);
  });

  it('accepts omitted parameters and retains the slash for an empty type', async () => {
    const result = firstValueFrom(nodes.getNodes('/api/v1/notifications', ''));
    expectGet(`${apiUrl}/api/v1/notifications/`).flush({ data: [] });
    await expect(result).resolves.toEqual({ data: [] });
  });

  it('appends parameters to an existing query without adding a second question mark', async () => {
    const result = firstValueFrom(nodes.getNodes('/api/v1/node', 'article?include=uid', {
      'page[offset]': 20,
    }));
    expectGet(`${nodeUrl}?include=uid&page[offset]=20`).flush({ data: [] });
    await result;
  });

  it('forwards a node read failure without retrying', async () => {
    const result = firstValueFrom(nodes.getNodes('/api/v1/node', 'article'));
    const failure = expect(result).rejects.toMatchObject({ status: 403, error: { denied: true } });
    expectGet(nodeUrl).flush({ denied: true }, { status: 403, statusText: 'Forbidden' });
    await failure;
  });

  it('starts node requests on subscription and cancels them on unsubscription', () => {
    const next = vi.fn();
    const result = nodes.getNodes('/api/v1/node', 'article');
    http.expectNone(() => true);
    const subscription = result.subscribe(next);
    const request = expectGet(nodeUrl);
    subscription.unsubscribe();
    expect(request.cancelled).toBe(true);
    expect(next).not.toHaveBeenCalled();
  });

  it('loads children after roots and preserves root order when children finish out of order', () => {
    const next = vi.fn();
    const complete = vi.fn();
    const result = comments.getCommentsWitchChild(content, 5);
    http.expectNone(() => true);
    result.subscribe({ next, complete });
    const root = expectGet(rootUrl);
    http.expectNone(() => true);
    root.flush({ data: [comment('root-1'), comment('ignored', 'root-1'), comment('root-2')] });
    const first = expectGet(childUrl('root-1'));
    const second = expectGet(childUrl('root-2'));
    second.flush({ data: [comment('child-2', 'root-2')] });
    expect(next).not.toHaveBeenCalled();
    expect(complete).not.toHaveBeenCalled();
    first.flush({ data: [comment('child-1', 'root-1')] });
    expect(next).toHaveBeenCalledExactlyOnceWith([
      expect.objectContaining({ id: 'root-1', level: 1, content: '<p>root-1</p>',
        child: [expect.objectContaining({ id: 'child-1', level: 2 })] }),
      expect.objectContaining({ id: 'root-2', level: 1,
        child: [expect.objectContaining({ id: 'child-2', level: 2 })] }),
    ]);
    expect(complete).toHaveBeenCalledOnce();
  });

  it.each([{ data: [] }, { data: [comment('child-1', 'root-1')] }])(
    'completes without emitting when the root response contains no roots: %j', body => {
      const next = vi.fn();
      const complete = vi.fn();
      comments.getCommentsWitchChild(content, 5).subscribe({ next, complete });
      expectGet(rootUrl).flush(body);
      expect(next).not.toHaveBeenCalled();
      expect(complete).toHaveBeenCalledOnce();
    }
  );

  it.each([{}, { data: [] }])('maps missing or empty child data to an empty list: %j', async body => {
    const result = firstValueFrom(comments.getCommentsWitchChild(content, 5));
    expectGet(rootUrl).flush({ data: [comment('root-1')] });
    expectGet(childUrl('root-1')).flush(body);
    await expect(result).resolves.toEqual([expect.objectContaining({ id: 'root-1', child: [] })]);
  });

  it.each(['root', 'child'] as const)('forwards a failed %s read without retrying', async stage => {
    const result = firstValueFrom(comments.getCommentsWitchChild(content, 5));
    const failure = expect(result).rejects.toMatchObject({
      status: 503, error: { unavailable: true },
    });
    let request = expectGet(rootUrl);
    if (stage === 'child') {
      request.flush({ data: [comment('root-1'), comment('root-2')] });
      request = expectGet(childUrl('root-1'));
    }
    request.flush({ unavailable: true }, { status: 503, statusText: 'Unavailable' });
    if (stage === 'child') {
      expect(expectGet(childUrl('root-2')).cancelled).toBe(true);
    }
    await failure;
  });

  it.each(['root', 'children'] as const)('cancels pending %s reads on unsubscription', stage => {
    const next = vi.fn();
    const subscription = comments.getCommentsWitchChild(content, 5).subscribe(next);
    const root = expectGet(rootUrl);
    let pending = [root];
    if (stage === 'children') {
      root.flush({ data: [comment('root-1'), comment('root-2')] });
      pending = [expectGet(childUrl('root-1')), expectGet(childUrl('root-2'))];
    }
    subscription.unsubscribe();
    expect(pending.every(request => request.cancelled)).toBe(true);
    expect(next).not.toHaveBeenCalled();
  });
});
