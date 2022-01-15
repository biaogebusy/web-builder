import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
  @Input() content: any;
  @Input() form: FormGroup;
  loading: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  submit = new EventEmitter();

  constructor(
    private nodeService: NodeService,
    private utility: UtilitiesService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.form.value);
    const data = this.nodeService.getCommentRequestDate(this.content.meta);
    data.attributes.comment_body = {
      value: this.form.value.comment_body,
      format: 'plain_text',
    };
    this.nodeService
      .addComment(this.content.meta.type, data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          console.log(res);
          this.utility.openSnackbar(this.content.success);
          this.form.reset();
          this.submit.emit('submit');
        },
        (error) => {
          this.utility.openSnackbar(this.content.fail);
        }
      );
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
