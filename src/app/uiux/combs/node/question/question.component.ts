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
import { IQuestion } from '@core/interface/node/INode';
import { UserState } from '@core/mobx/user/UserState';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { NodeComponent } from '@uiux/base/node.widget';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginComponent } from '../../../../modules/user/login/login.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent
  extends NodeComponent
  implements OnInit, OnDestroy
{
  @Input() content: IQuestion;
  comments: any;
  showEditor = false;
  isAsked = false;
  myCommentId = '';
  dialogRef: MatDialogRef<any>;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public nodeService: NodeService,
    public userState: UserState,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog
  ) {
    super(userState, nodeService);
  }

  ngOnInit(): void {
    this.checkIsAsked();
    this.getComments();
  }

  onShowEditor(): void {
    this.showEditor = true;
    this.cd.detectChanges();
  }

  onChange(state: boolean): void {
    // if success
    if (state) {
      this.checkIsAsked();
      this.getComments(+new Date());
    }
  }

  checkIsAsked(): void {
    // TODO: 使用node查询是否有评论即可
    const entityId = this.getCommentRelEntityId(this.content);
    const entityType = this.getCommentType(this.content);
    const params = [
      `filter[uid.id]=${this.userState.currentUser.id}`,
      `filter[entity_id.id]=${entityId}`,
      `sort=-created`,
      'filter[status]=1',
      `page[limit]=1`,
    ].join('&');
    const path = this.nodeService.apiUrlConfig.commentGetPath;
    this.nodeService
      .getNodes(path, entityType, params)
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
    const { path, type, params } = this.getCommentsParams(
      this.content,
      timeStamp
    );
    this.nodeService
      .getNodes(path, type, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.comments = res.data.map((comment: any) => {
          return this.handleComment(comment);
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
