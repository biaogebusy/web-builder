import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPage } from '@core/interface/IAppConfig';
import { PAGE_CONTENT } from '@core/token/token-providers';
import { ActivatedRoute } from '@angular/router';
import { pageContentFactory } from '@core/factory/factory';
import { ContentService } from '@core/service/content.service';
import { ContentState } from '@core/mobx/ContentState';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  providers: [
    {
      provide: PAGE_CONTENT,
      useFactory: pageContentFactory,
      deps: [ActivatedRoute, ContentService, ContentState],
    },
  ],
})
export class BlockComponent implements OnInit {
  constructor(@Inject(PAGE_CONTENT) public pageContent$: Observable<IPage>) {}

  ngOnInit(): void {}

  trackByFn(index: number, item: any): number {
    return index;
  }
}
