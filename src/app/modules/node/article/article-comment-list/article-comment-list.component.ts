import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-article-comment-list',
  templateUrl: './article-comment-list.component.html',
  styleUrls: ['./article-comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentListComponent implements OnInit {
  @Input() content: any[];
  @Input() currentUserId: any;

  loading: boolean;
  constructor() {}

  ngOnInit(): void {}

  onDeleteMyQuestion(id: string): void {
    console.log(id);
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
