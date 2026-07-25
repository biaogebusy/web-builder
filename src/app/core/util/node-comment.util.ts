import { formatDate } from '@angular/common';
import type { IComment } from '@core/interface/node/INode';
import { buildQueryString } from '@core/util/http-params.util';

export interface CommentContentShape {
  params?: {
    comment?: {
      attributes?: {
        field_name?: string;
      };
      relationships?: {
        entity_id?: {
          data?: {
            id?: string;
          };
        };
      };
    };
  };
}

export interface CommentQueryParams {
  path: string;
  type: string;
  params: string;
}

interface RawComment {
  uid: {
    id: string;
    name: string;
    user_picture?: {
      uri?: {
        url?: string;
      };
    };
  };
  id: string;
  changed?: string;
  created?: string;
  content?: {
    processed?: string;
  };
  comment_body?: {
    processed?: string;
  };
}

export function getCommentType(content: CommentContentShape | null | undefined): string {
  return content?.params?.comment?.attributes?.field_name || '';
}

export function getCommentRelEntityId(content: CommentContentShape | null | undefined): string {
  return content?.params?.comment?.relationships?.entity_id?.data?.id || '';
}

export function buildCommentsParams(
  content: CommentContentShape | null | undefined,
  timeStamp: number,
  path: string
): CommentQueryParams {
  return {
    path,
    type: getCommentType(content),
    params: buildQueryString(
      {
        'filter[entity_id.id]': getCommentRelEntityId(content),
        include: 'uid,uid.user_picture,pid',
        'fields[user--user]': 'name,user_picture',
        'fields[file--file]': 'uri,url',
        sort: '-created',
        jsonapi_include: 1,
        timeStamp,
      },
      { encodeKeys: false }
    ),
  };
}

export function buildCommentsPidParams(pid: string, timeStamp: number): string {
  return buildQueryString(
    {
      'filter[pid.id]': pid,
      include: 'uid,uid.user_picture,pid',
      'fields[user--user]': 'name,user_picture',
      'fields[file--file]': 'uri,url',
      sort: '-created',
      jsonapi_include: 1,
      timeStamp,
    },
    { encodeKeys: false }
  );
}

export function mapComment(comment: RawComment, level: number, defaultAvatar?: string): IComment {
  return {
    author: {
      img: {
        src: comment.uid?.user_picture?.uri?.url || defaultAvatar,
        style: {
          borderRadius: '50%',
        },
        width: 40,
        height: 40,
        alt: comment.uid.name,
      },
      align: 'center start',
      id: comment.uid.id,
      title: comment.uid.name,
      subTitle: formatDate(
        (comment.changed || comment.created) as string,
        'yyyy-MM-dd HH:mm:ss',
        'en-US'
      ),
    },
    time: comment.changed,
    id: comment.id,
    content: comment?.content?.processed || comment?.comment_body?.processed,
    child: [],
    level,
  } as IComment;
}
