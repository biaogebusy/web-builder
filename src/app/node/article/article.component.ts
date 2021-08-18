import { DOCUMENT } from '@angular/common';
import { Component, Input, OnInit, AfterViewInit, Inject } from '@angular/core';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import { TagsService } from 'src/app/service/tags.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  constructor(
    private tagsService: TagsService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (this.content.title) {
      this.tagsService.setTitle(this.content.title);
    }
  }

  ngAfterViewInit(): void {
    this.document.querySelectorAll('code').forEach((block) => {
      // then highlight each
      hljs.highlightBlock(block);
    });
  }
}
