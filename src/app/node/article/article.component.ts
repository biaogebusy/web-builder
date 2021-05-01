import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { TitleService } from '../../service/title.service';
import hljs from 'highlight.js';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  constructor(private titelService: TitleService) {}

  ngOnInit(): void {
    if (this.content.title) {
      this.titelService.setTitle(this.content.title);
    }
  }

  ngAfterViewInit(): void {
    document.querySelectorAll('code').forEach((block) => {
      // then highlight each
      hljs.highlightBlock(block);
    });
  }
}
