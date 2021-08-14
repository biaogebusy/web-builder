import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { NodeService } from 'src/app/service/node.service';
import { UtilitiesService } from '../../../../service/utilities.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserState } from 'src/app/mobx/user/UserState';
@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() content: any;
  loading = false;
  public Editor = ClassicEditor;
  @Input() myCommentContent: any;
  @Input() myCommentId: string;
  @Output() submitComment = new EventEmitter();
  constructor(
    private nodeService: NodeService,
    private utilitiesService: UtilitiesService,
    private userState: UserState
  ) {}

  ngOnInit(): void {
    console.log(this.content.params);
  }

  onSubmit(ckeditor: any, value: any): void {
    this.loading = true;
    if (!this.myCommentContent) {
      const params = this.content.params;
      params.attributes.content = {
        value,
        format: 'full_html',
      };
      console.log(params);
      this.nodeService.addComment(ckeditor.type, params).subscribe(
        (res) => {
          console.log('success!', res);
          this.loading = false;
          this.utilitiesService.openSnackbar(ckeditor.succes.label);
          this.submitComment.emit(true);
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
    } else {
      const entity = {
        type: 'comment--answer',
        id: this.myCommentId,
        attributes: {
          entity_type: 'node',
          field_name: 'answer',
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
        .updateComment(ckeditor.type, entity, this.myCommentId)
        .subscribe(
          (res) => {
            console.log('success!', res);
            this.loading = false;
            this.utilitiesService.openSnackbar(ckeditor.succes.label);
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
