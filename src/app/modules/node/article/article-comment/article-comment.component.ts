import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss'],
})
export class ArticleCommentComponent implements OnInit {
  @Input() content: any;
  @Input() form: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
