import { HttpClient } from '@angular/common/http';
import { DOCUMENT, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { API_URL, CORE_CONFIG, USER } from '@core/token/token-providers';
import { firstValueFrom, of } from 'rxjs';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  function createService(get = vi.fn(() => of({ data: [] }))) {
    const http = {
      get,
      post: vi.fn(() => of({})),
      patch: vi.fn(() => of({})),
    };

    TestBed.configureTestingModule({
      providers: [
        CommentService,
        { provide: API_URL, useValue: 'https://example.com' },
        { provide: DOCUMENT, useValue: document },
        { provide: HttpClient, useValue: http },
        { provide: CORE_CONFIG, useValue: { defaultAvatar: '/default-avatar.png' } },
        { provide: USER, useValue: signal(false) },
      ],
    });

    return {
      service: TestBed.inject(CommentService),
      http,
    };
  }

  it('keeps the existing create, update, and reply request shapes', () => {
    const { service, http } = createService();
    const entityData = { id: 'comment-1', attributes: { subject: 'Hello' } };

    service.addComment('comment_body', entityData, 'token').subscribe();
    service.updateComment('comment_body', entityData, 'uuid-1', 'token').subscribe();
    service.replyComment('comment_body', entityData, 'token').subscribe();

    const body = JSON.stringify({ data: entityData });
    expect(http.post).toHaveBeenNthCalledWith(
      1,
      'https://example.com/api/v1/comment/comment_body',
      body,
      expect.any(Object)
    );
    expect(http.patch).toHaveBeenCalledWith(
      'https://example.com/api/v1/comment/comment_body/uuid-1',
      body,
      expect.any(Object)
    );
    expect(http.post).toHaveBeenNthCalledWith(
      2,
      'https://example.com/api/v1/comment/comment_body',
      body,
      expect.any(Object)
    );
  });

  it('loads root comments followed by their children and preserves the mapped tree', async () => {
    const root = {
      pid: { id: null },
      uid: { id: 'user-1', name: 'Root user' },
      id: 'root-1',
      changed: '2026-01-02T03:04:05Z',
      content: { processed: '<p>Root</p>' },
    };
    const child = {
      pid: { id: 'root-1' },
      uid: { id: 'user-2', name: 'Child user' },
      id: 'child-1',
      changed: '2026-01-02T04:05:06Z',
      comment_body: { processed: '<p>Child</p>' },
    };
    const get = vi.fn((url: string) => {
      if (url.includes('filter[entity_id.id]=node-1')) {
        return of({ data: [root] });
      }
      if (url.includes('filter[pid.id]=root-1')) {
        return of({ data: [child] });
      }
      return of({ data: [] });
    });
    const { service } = createService(get);
    const content = {
      params: {
        comment: {
          attributes: { field_name: 'comment_body' },
          relationships: { entity_id: { data: { id: 'node-1' } } },
        },
      },
    };

    const result = await firstValueFrom(service.getCommentsWitchChild(content, 5));

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: 'root-1',
      content: '<p>Root</p>',
      level: 1,
      author: { img: { src: '/default-avatar.png' } },
      child: [
        {
          id: 'child-1',
          content: '<p>Child</p>',
          level: 2,
        },
      ],
    });
    expect(get).toHaveBeenCalledTimes(2);
    expect(get.mock.calls[0][0]).toContain('timeStamp=5');
    expect(get.mock.calls[1][0]).toContain('filter[pid.id]=root-1');
  });
});
