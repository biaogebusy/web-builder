import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
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
  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    if (this.content.title) {
      this.tagsService.setTitle(this.content.title);
    }
  }

  ngAfterViewInit(): void {
    document.querySelectorAll('code').forEach((block) => {
      // then highlight each
      hljs.highlightBlock(block);
    });
  }
}
