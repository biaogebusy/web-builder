import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import type { IComment, IQuestion } from '@core/interface/node/INode';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { NodeComponent } from '@uiux/base/node.widget';
import { Observable } from 'rxjs';
import { ContentState } from '@core/state/ContentState';
import type { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '@core/service/user.service';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class QuestionComponent extends NodeComponent implements OnInit, AfterViewInit {
  public user$ = inject<Observable<IUser>>(USER);

  @Input() content: IQuestion;
  public comments: IComment[];
  public showEditor = false;
  public isAsked = false;
  public myCommentId = '';
  private dialogRef: MatDialogRef<any>;
  private user: IUser;
  private nodeService = inject(NodeService);
  private screenService = inject(ScreenService);
  private cd = inject(ChangeDetectorRef);
  private contentState = inject(ContentState);
  private destroyRef = inject(DestroyRef);
  private userService = inject(UserService);

  constructor() {
    super();
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.contentState.commentChange$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(state => {
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
    if (!environment.production) {
      return;
    }
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
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
    if (!environment.production) {
      return;
    }
    this.nodeService
      .getCommentsWitchChild(this.content, this.user.csrf_token, timeStamp)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.comments = res;
        this.cd.detectChanges();
      });
  }

  openLogin(): void {
    const returnUrl = window.location.pathname;
    const queryParams = {
      returnUrl,
    };
    this.dialogRef = this.userService.openLoginDialog(queryParams);
    this.dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.cd.detectChanges();
      });
  }
}
