import {
  buildCommentsParams,
  buildCommentsPidParams,
  getCommentRelEntityId,
  getCommentType,
  mapComment,
} from './node-comment.util';

const content = {
  params: {
    comment: {
      attributes: { field_name: 'comment_body' },
      relationships: { entity_id: { data: { id: 'node-1' } } },
    },
  },
};

describe('node comment utilities', () => {
  it('reads comment type and related entity IDs with empty fallbacks', () => {
    expect(getCommentType(content)).toBe('comment_body');
    expect(getCommentRelEntityId(content)).toBe('node-1');
    expect(getCommentType(undefined)).toBe('');
    expect(getCommentRelEntityId({})).toBe('');
  });

  it('builds the parent and child comment query parameters', () => {
    const parent = buildCommentsParams(content, 3, '/api/v1/comment');

    expect(parent.path).toBe('/api/v1/comment');
    expect(parent.type).toBe('comment_body');
    expect(parent.params).toContain('filter[entity_id.id]=node-1');
    expect(parent.params).toContain('jsonapi_include=1');
    expect(parent.params).toContain('timeStamp=3');
    expect(buildCommentsPidParams('comment-1', 4)).toContain('filter[pid.id]=comment-1');
    expect(buildCommentsPidParams('comment-1', 4)).toContain('timeStamp=4');
  });

  it('maps API comments to the public comment DTO and uses the avatar fallback', () => {
    const mapped = mapComment(
      {
        uid: { id: 'user-1', name: 'Ada' },
        id: 'comment-1',
        changed: '2026-01-02T03:04:05Z',
        comment_body: { processed: '<p>Hello</p>' },
      },
      2,
      '/avatar.png'
    );

    expect(mapped).toMatchObject({
      id: 'comment-1',
      content: '<p>Hello</p>',
      level: 2,
      child: [],
      author: {
        id: 'user-1',
        title: 'Ada',
        subTitle: expect.stringContaining('2026-01-02'),
        img: { src: '/avatar.png', alt: 'Ada', width: 40, height: 40 },
      },
    });
  });
});
