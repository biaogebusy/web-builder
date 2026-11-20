import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { API_URL, CORE_CONFIG } from '@core/token/token-providers';
import { firstValueFrom, of, throwError, Observable } from 'rxjs';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  function createService(get: (url: string) => Observable<unknown> = vi.fn(() => of({ key: 'comment_body', textFormat: 'basic_html', editor: 'rich_text' }))) {
    const http = {
      get,
      post: vi.fn<(url: string, body: string, options: unknown) => Observable<unknown>>(() => of({})),
      patch: vi.fn<(url: string, body: string, options: unknown) => Observable<unknown>>(() => of({})),
    };

    TestBed.configureTestingModule({
      providers: [
        CommentService,
        { provide: API_URL, useValue: 'https://example.com' },
        { provide: DOCUMENT, useValue: document },
        { provide: HttpClient, useValue: http },
        { provide: CORE_CONFIG, useValue: { defaultAvatar: '/default-avatar.png' } },
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

    service.addComment('comment_body', entityData).subscribe();
    service.updateComment('comment_body', entityData, 'uuid-1').subscribe();
    service.replyComment('comment_body', entityData).subscribe();

    const body = JSON.stringify({ data: { ...entityData, relationships: {} } });
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

  it('resolves the allowed format and omits author reassignment for comment edits', async () => {
    const get = vi.fn(() => of({ key: 'body', textFormat: 'basic_html', editor: 'rich_text' }));
    const { service, http } = createService(get);
    await firstValueFrom(service.updateComment('blog_comment', {
      type: 'comment--blog_comment', attributes: { comment_body: { value: '<p>Hi</p>', format: 'full_html' } },
      relationships: { uid: { data: { type: 'user--user', id: 'other' } } },
    }, 'comment-id'));
    expect(get).toHaveBeenCalledWith('https://example.com/api/v3/comment-form/blog_comment/comment-id', expect.any(Object));
    expect(JSON.parse(http.patch.mock.calls[0][1]).data).toEqual({
      type: 'comment--blog_comment', attributes: { body: { value: '<p>Hi</p>', format: 'basic_html' } },
      relationships: {},
    });
  });

  it('converts rich editor markup when only a plain-text format is available', async () => {
    const { service, http } = createService(vi.fn(() => of({ key: 'comment_body', textFormat: 'plain_text', editor: 'plain_text' })));
    await firstValueFrom(service.addComment('blog_comment', {
      attributes: { comment_body: { value: '<p>Hello &amp; welcome</p><p>Again</p>' } },
    }));
    expect(JSON.parse(http.post.mock.calls[0][1]).data.attributes.comment_body).toEqual({
      value: 'Hello & welcome\nAgain', format: 'plain_text',
    });
  });

  it('stops comment writes if the format description is denied or unavailable', async () => {
    const { service, http } = createService(vi.fn(() => throwError(() => ({ status: 403 }))));
    await expect(firstValueFrom(service.addComment('blog_comment', {
      attributes: { comment_body: { value: '<p>Hi</p>' } },
    }))).rejects.toMatchObject({ status: 403 });
    expect(http.post).not.toHaveBeenCalled();
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
          type: 'comment--discussion',
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
    expect(get.mock.calls[0][0]).toContain('/comment/discussion?');
    expect(get.mock.calls[0][0]).toContain('timeStamp=5');
    expect(get.mock.calls[1][0]).toContain('filter[pid.id]=root-1');
  });
});
