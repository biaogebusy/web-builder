import { HttpClient } from '@angular/common/http';
import { DOCUMENT, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BuilderState } from '@core/state/BuilderState';
import { API_URL, USER } from '@core/token/token-providers';
import { of } from 'rxjs';
import { CommentService } from './comment.service';
import { NodeService } from './node.service';
import { UtilitiesService } from './utilities.service';

describe('NodeService comment façade', () => {
  it('forwards the legacy comment API to CommentService', () => {
    const commentService = {
      addComment: vi.fn(() => of({ id: 'comment-1' })),
      updateComment: vi.fn(() => of({})),
      replyComment: vi.fn(() => of({})),
      getCommentType: vi.fn(() => 'comment_body'),
      getCommentRelEntityId: vi.fn(() => 'node-1'),
      getCommentsParams: vi.fn(() => ({ path: '/api/v1/comment', params: 'timeStamp=2' })),
      getCommentsPidParams: vi.fn(() => 'filter[pid.id]=comment-1'),
      handleComment: vi.fn(() => ({ id: 'comment-1' })),
      getCommentsWitchChild: vi.fn(() => of([])),
      getCustomApiComment: vi.fn(() => of([])),
    };

    TestBed.configureTestingModule({
      providers: [
        NodeService,
        { provide: API_URL, useValue: 'https://example.com' },
        { provide: DOCUMENT, useValue: document },
        { provide: HttpClient, useValue: {} },
        { provide: USER, useValue: signal(false) },
        { provide: UtilitiesService, useValue: {} },
        { provide: BuilderState, useValue: { currentPage: {} } },
        { provide: CommentService, useValue: commentService },
      ],
    });

    const service = TestBed.inject(NodeService);
    const content = { params: { comment: {} } };

    service.addComment('comment_body', { id: 'comment-1' }, 'token').subscribe();
    service.getCommentsWitchChild(content, 2).subscribe();

    expect(commentService.addComment).toHaveBeenCalledWith(
      'comment_body',
      { id: 'comment-1' },
      'token'
    );
    expect(service.getCommentType(content)).toBe('comment_body');
    expect(service.getCommentRelEntityId(content)).toBe('node-1');
    expect(commentService.getCommentsWitchChild).toHaveBeenCalledWith(content, 2);
  });
});
