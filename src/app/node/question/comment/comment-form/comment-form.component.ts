import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { NodeService } from 'src/app/service/node.service';
import { UtilitiesService } from '../../../../service/utilities.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() content: any;
  loading = false;
  public Editor = ClassicEditor;
  public htmlData = '';
  @Output() submitComment = new EventEmitter();
  constructor(
    private nodeService: NodeService,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {
    console.log(this.content.params);
  }

  onSubmit(ckeditor: any, params: any, value: any): void {
    this.loading = true;
    const data = {
      attributes: {
        content: {
          value,
          format: 'plain_text',
        },
      },
    };
    const entity = Object.assign({}, params, data);
    console.log(entity);
    this.nodeService.addComment(ckeditor.type, entity).subscribe(
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
