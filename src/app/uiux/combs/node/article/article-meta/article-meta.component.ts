import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
    selector: 'app-article-meta',
    templateUrl: './article-meta.component.html',
    styleUrls: ['./article-meta.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ArticleMetaComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
