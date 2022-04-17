import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent implements OnInit {
  @Input() content: any[];
  @Input() currentUserId: any;
  @Output() deleted = new EventEmitter();
  loading: boolean;
  constructor() {}

  ngOnInit(): void {}

  onDeleteMyQuestion(id: string): void {
    this.deleted.emit(id);
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
