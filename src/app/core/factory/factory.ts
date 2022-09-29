import { ActivatedRoute } from '@angular/router';
import { IPage } from '@core/mobx/IAppConfig';
import { ContentService } from '@core/service/content.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContentState } from '@core/mobx/ContentState';

export function pageContentFactory(
  activateRoute: ActivatedRoute,
  contentService: ContentService,
  contentState: ContentState
): Observable<IPage | object | boolean> {
  const $pageContent = new BehaviorSubject<IPage | object | boolean>(false);
  activateRoute.url.subscribe(async (url) => {
    const page = await contentService.loadPageContent().toPromise();
    $pageContent.next(page);
    contentState.pageConfig$.next(page);
  });
  return $pageContent;
}

export const apiUrlFactory = () => {
  // can use front url to query backend api, ngxin will proxy
  return environment.apiUrl;
};
