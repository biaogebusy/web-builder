import { Component, Input, OnInit } from '@angular/core';
import { TitleService } from '../../service/title.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() content: any;
  constructor(private titelService: TitleService) {}

  ngOnInit(): void {
    if (this.content.title) {
      this.titelService.setTitle(this.content.title);
    }
  }
}
