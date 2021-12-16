import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { UserState } from '@core/mobx/user/UserState';
import { ScreenService } from '@core/service/screen.service';
@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() content: any;
  loading = false;
  htmlData = '';
  public Editor: any;
  @Input() myCommentContent: any;
  @Input() myCommentId: string;
  @Output() submitComment = new EventEmitter();
  @Output() cancel = new EventEmitter();
  constructor(
    private nodeService: NodeService,
    private utilitiesService: UtilitiesService,
    private userState: UserState,
    public screenService: ScreenService
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.myCommentContent) {
        this.htmlData = this.myCommentContent;
      }
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSubmit(editor: any, value: any): void {
    console.log(value);
    this.loading = true;
    if (!this.myCommentContent) {
      const params = this.content.params;
      params.attributes.content = {
        value,
        format: 'full_html',
      };
      this.nodeService.addComment(editor.type, params).subscribe(
        (res) => {
          this.loading = false;
          this.utilitiesService.openSnackbar(editor.succes.label);
          this.submitComment.emit(true);
        },
        () => {
          this.loading = false;
          this.utilitiesService.openSnackbar('Please check user state.');
        }
      );
    } else {
      const entity = {
        type: 'comment--answer',
        id: this.myCommentId,
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
        .updateComment(editor.type, entity, this.myCommentId)
        .subscribe(
          (res) => {
            this.loading = false;
            this.utilitiesService.openSnackbar(editor.succes.label);
            this.submitComment.emit(true);
          },
          (error) => {
            this.loading = false;
            console.log(error);
          }
        );
    }
  }
}
