import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '@core/mobx/AppState';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPage } from '@core/mobx/IAppConfig';
import { ContentService } from '@core/service/content.service';
import { PAGE_CONTENT } from '@core/token/token-providers';
export function pageContentFactory(
  activateRoute: ActivatedRoute,
  contentService: ContentService
): Observable<IPage | object | boolean> {
  const $pageContent = new BehaviorSubject<IPage | object | boolean>(false);
  activateRoute.url.subscribe(async (url) => {
    const page = await contentService.loadPageContent().toPromise();
    $pageContent.next(page);
  });
  return $pageContent;
}
@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  providers: [
    {
      provide: PAGE_CONTENT,
      useFactory: pageContentFactory,
      deps: [ActivatedRoute, ContentService],
    },
  ],
})

// TODO: providers 还需要移动到root,不然优先级太高，其他无法覆盖
export class BlockComponent implements OnInit {
  constructor(
    public appState: AppState,
    @Inject(PAGE_CONTENT) public $pageContent: Observable<IPage>
  ) {}

  ngOnInit(): void {}

  trackByFn(index: number, item: any): number {
    return index;
  }
}
