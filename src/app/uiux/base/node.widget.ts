import { Injectable } from '@angular/core';
import { ICommentContent } from '@core/interface/node/INode';
import { UserState } from '@core/mobx/user/UserState';
import { NodeService } from '@core/service/node.service';
import { formatDate } from '@angular/common';
@Injectable()
export abstract class NodeComponent {
  abstract content: any;

  constructor(public userState: UserState, public nodeService: NodeService) {}

  getCommentType(content: any): string {
    return content?.params?.comment?.attributes?.field_name || '';
  }

  getCommentRelEntityId(content: any): string {
    return content?.params?.comment?.relationships?.entity_id?.data?.id || '';
  }

  getNodeParams(content: any, timeStamp: number): any {
    const type = this.getCommentType(content);
    return {
      path: this.nodeService.apiUrlConfig.commentGetPath,
      type,
      params: [
        `filter[entity_id.id]=${this.getCommentRelEntityId(content)}`,
        `include=uid,uid.user_picture`,
        `fields[user--user]=name,user_picture`,
        `fields[file--file]=uri,url`,
        `sort=-created`,
        'filter[status]=1',
        `jsonapi_include=1`,
        `timeStamp=${timeStamp}`,
      ].join('&'),
    };
  }

  handleComment(comment: any): ICommentContent {
    return {
      author: {
        img: {
          src:
            comment.uid?.user_picture?.uri?.url || this.userState.defaultAvatar,
          style: {
            width: '45px',
            height: '45px',
            borderRadius: '3px',
          },
          alt: comment.uid.name,
        },
        id: comment.uid.id,
        title: comment.uid.name,
        subTitle: formatDate(
          comment.changed || comment.created,
          'yyyy-MM-dd h:mm:ss',
          'en-US'
        ),
      },
      time: comment.changed,
      id: comment.id,
      content: comment?.content?.processed || comment?.comment_body?.processed,
    };
  }
}
