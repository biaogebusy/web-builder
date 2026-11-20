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
      type: 'comment--discussion',
      attributes: { field_name: 'comment_body' },
      relationships: { entity_id: { data: { id: 'node-1' } } },
    },
  },
};

describe('node comment utilities', () => {
  it('reads comment type and related entity IDs with empty fallbacks', () => {
    expect(getCommentType(content)).toBe('discussion');
    expect(getCommentRelEntityId(content)).toBe('node-1');
    expect(getCommentType(undefined)).toBe('');
    expect(getCommentRelEntityId({})).toBe('');
  });

  it.each([
    ['node-1', 'node-1', 3],
    ['n/中文 +&?=', 'n%2F%E4%B8%AD%E6%96%87%20%2B%26%3F%3D', 0],
    ['', '', -1],
  ] as const)('preserves complete root and child queries for ID %j', (id, encodedId, timeStamp) => {
    const requestContent = { params: { comment: {
      ...content.params.comment,
      relationships: { entity_id: { data: { id } } },
    } } };
    const fields = 'include=uid%2Cuid.user_picture%2Cpid' +
      '&fields[user--user]=name%2Cuser_picture&fields[file--file]=uri%2Curl' +
      `&sort=-created&jsonapi_include=1&timeStamp=${timeStamp}`;

    expect(buildCommentsParams(requestContent, timeStamp, '/api/v1/comment')).toEqual({
      path: '/api/v1/comment',
      type: 'discussion',
      params: (id ? `filter[entity_id.id]=${encodedId}&` : '') + fields,
    });
    expect(buildCommentsPidParams(id, timeStamp)).toBe(
      (id ? `filter[pid.id]=${encodedId}&` : '') + fields
    );
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
