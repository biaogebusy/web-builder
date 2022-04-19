import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserState } from '@core/mobx/user/UserState';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginComponent } from '../../../../modules/user/login/login.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit, OnDestroy {
  @Input() content: any;
  comments: any;
  showEditor = false;
  isAsked = false;
  myCommentId = '';
  dialogRef: MatDialogRef<any>;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private nodeService: NodeService,
    public userState: UserState,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkIsAsked();
    this.getComments();
  }

  get entityId(): string {
    return (
      this.content?.params?.comment?.relationships?.entity_id?.data?.id || ''
    );
  }

  get entityType(): string {
    return this.content?.params?.comment?.attributes?.field_name || '';
  }

  onShowEditor(): void {
    this.showEditor = true;
    this.cd.detectChanges();
  }

  onSubmit(state: boolean): void {
    // if success
    if (state) {
      this.checkIsAsked();
      this.getComments(+new Date());
    }
  }

  checkIsAsked(): void {
    const params = [
      `filter[uid.id]=${this.userState.currentUser.id}`,
      `filter[entity_id.id]=${this.entityId}`,
      `sort=-created`,
      'filter[status]=1',
      `page[limit]=1`,
    ].join('&');
    const path = this.nodeService.apiUrlConfig.commentGetPath;
    this.nodeService
      .getNodes(path, this.entityType, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res.data.length) {
          this.isAsked = true;
          this.showEditor = false;
          this.myCommentId = res.data[0].id;
        } else {
          this.isAsked = false;
          this.showEditor = false;
          this.myCommentId = '';
        }
        this.cd.detectChanges();
      });
  }

  checkQuestion(id: string): void {
    this.screenService.scrollToAnchor(`q-${id}`);
  }

  getComments(timeStamp = 1): void {
    const params = [
      `filter[entity_id.id]=${this.entityId}`,
      `include=uid,uid.user_picture`,
      `fields[user--user]=name,user_picture`,
      `fields[file--file]=uri,url`,
      `sort=-created`,
      'filter[status]=1',
      `jsonapi_include=1`,
      `timeStamp=${timeStamp}`,
    ].join('&');
    const path = this.nodeService.apiUrlConfig.commentGetPath;
    this.nodeService
      .getNodes(path, this.entityType, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
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
              id: comment.uid.id,
              title: comment.uid.name,
              subTitle: '用户暂无签名',
            },
            time: comment.changed,
            id: comment.id,
            content: comment.content.processed,
          };
        });
        this.cd.markForCheck();
      });
  }

  openLogin(): void {
    const returnUrl = window.location.pathname;
    this.router.navigate([], {
      queryParams: { returnUrl },
    });
    this.dialogRef = this.dialog.open(LoginComponent);
    this.dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cd.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
