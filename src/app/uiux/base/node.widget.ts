import { Injectable } from '@angular/core';
import { ICommentContent } from '@core/interface/node/IComment';
import { UserState } from '@core/mobx/user/UserState';
@Injectable()
export abstract class NodeComponent {
  abstract content: any;

  constructor(public userState: UserState) {}

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
        subTitle: '用户暂无签名',
      },
      time: comment.changed,
      id: comment.id,
      content: comment?.content?.processed || comment?.comment_body?.processed,
    };
  }
}
