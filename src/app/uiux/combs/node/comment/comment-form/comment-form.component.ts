import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { UserState } from '@core/mobx/user/UserState';
import { ScreenService } from '@core/service/screen.service';
import { of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent implements OnInit, OnDestroy {
  @Input() content: any;
  @Input() commentContent: any;
  @Input() commentId: string;
  @Output() submitComment = new EventEmitter();
  @Output() cancel = new EventEmitter();

  loading = false;
  htmlData = '';
  destroy$: Subject<boolean> = new Subject<boolean>();
  public Editor: any;

  constructor(
    private cd: ChangeDetectorRef,
    private nodeService: NodeService,
    public screenService: ScreenService,
    private utilitiesService: UtilitiesService,
    private userState: UserState
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.commentContent) {
        this.htmlData = this.commentContent;
        this.cd.detectChanges();
      }
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSubmit(value: any): void {
    this.loading = true;
    const params = this.content.params.comment;
    if (!this.commentContent) {
      params.attributes.content = {
        value,
        format: 'full_html',
      };
      this.nodeService
        .addComment(
          params.attributes.field_name,
          params,
          this.userState.csrfToken
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => {
            this.loading = false;
            this.utilitiesService.openSnackbar(
              this.content.editor.succes.label
            );
            this.submitComment.emit(true);
          },
          () => {
            this.loading = false;
            this.utilitiesService.openSnackbar('Please check user state.');
          }
        );
    } else {
      const entity = {
        type: params.type,
        id: this.commentId,
        attributes: {
          content: {
            value,
            format: 'full_html',
          },
        },
        relationships: {
          uid: {
            data: {
              type: 'user--user',
              id: this.userState.currentUser.id,
            },
          },
        },
      };
      this.nodeService
        .updateComment(
          params.type,
          entity,
          this.commentId,
          this.userState.csrfToken
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => {
            this.loading = false;
            this.utilitiesService.openSnackbar(this.content.succes.label);
            this.submitComment.emit(true);
          },
          (error) => {
            this.loading = false;
            console.log(error);
          }
        );
    }
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
