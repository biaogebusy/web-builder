import { Component, Input, OnInit } from '@angular/core';
import { UserState } from 'src/app/mobx/user/UserState';
import { NodeService } from 'src/app/service/node.service';
import { ScreenService } from 'src/app/service/screen.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() content: any;
  comments: any;
  showEditor = false;
  isAsked = false;
  myCommentId = '';
  myCommentContent = '';
  constructor(
    private nodeService: NodeService,
    private userState: UserState,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    this.checkIsAsked();
    this.getComments();
  }

  onShowEditor(): void {
    this.showEditor = true;
  }

  get entityId(): string {
    return this.content?.params?.relationships?.entity_id?.data?.id || '';
  }

  get entityType(): string {
    return this.content?.params?.attributes?.field_name || '';
  }

  onSubmit(state: boolean): void {
    console.log(state);
    // if success
    if (state) {
      this.checkIsAsked();
      this.getComments();
    }
  }

  checkIsAsked(): void {
    const params = [
      `filter[uid.id]=${this.userState.currentUser.id}`,
      `filter[entity_id.id]=${this.entityId}`,
      `sort=-created`,
      `page[limit]=1`,
    ].join('&');

    this.nodeService
      .getNodes(this.entityType, params, 'comment')
      .subscribe((res) => {
        console.log(res);
        if (res.data.length) {
          this.isAsked = true;
          this.showEditor = false;
          this.myCommentId = res.data[0].id;
          this.myCommentContent = res.data[0].attributes.content.processed;
        }
      });
  }

  checkQuestion(id: string): void {
    console.log('check question!');
    this.screenService.scrollToAnchor(`q-${id}`);
  }

  getComments(): void {
    const params = [
      `filter[entity_id.id]=${this.entityId}`,
      `include=uid,uid.user_picture`,
      `fields[user--user]=name,user_picture`,
      `fields[file--file]=uri,url`,
      `sort=-created`,
      `jsonapi_include=1`,
    ].join('&');
    this.nodeService
      .getNodes(this.entityType, params, 'comment')
      .subscribe((res) => {
        console.log(res);
        this.comments = res.data.map((comment: any) => {
          return {
            author: {
              img: {
                src: comment.uid.user_picture.uri.url,
                style: {
                  width: '45px',
                  height: '45px',
                  borderRadius: '3px',
                },
                alt: comment.uid.name,
              },
              title: comment.uid.name,
              subTitle: '用户暂无签名',
            },
            id: comment.id,
            content: comment.content.processed,
          };
        });
      });
  }
}
