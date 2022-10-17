import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import type { IComment, IQuestion } from '@core/interface/node/INode';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { NodeComponent } from '@uiux/base/node.widget';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import { ContentState } from '@core/mobx/ContentState';
import type { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent
  extends NodeComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() content: IQuestion;
  comments: IComment[];
  showEditor = false;
  isAsked = false;
  myCommentId = '';
  dialogRef: MatDialogRef<any>;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public nodeService: NodeService,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    public contentState: ContentState,
    @Inject(USER) public user: IUser
  ) {
    super();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.checkIsAsked();
    this.getComments();
    if (this.screenService.isPlatformBrowser()) {
      this.contentState.commentChange$
        .pipe(takeUntil(this.destroy$))
        .subscribe((state) => {
          if (state) {
            this.checkIsAsked();
            this.getComments(+new Date());
          }
        });
    }
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
    const entityId = this.nodeService.getCommentRelEntityId(this.content);
    const entityType = this.nodeService.getCommentType(this.content);
    const params = [
      `filter[uid.id]=${this.user.id}`,
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
    this.nodeService
      .getCommentsWitchChild(this.content, this.user.csrf_token, timeStamp)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.comments = res;
        this.cd.detectChanges();
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
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
  }
}
