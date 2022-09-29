import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IPage } from '@core/mobx/IAppConfig';
import { API_URL } from '@core/token/token-providers';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { isArray } from 'lodash-es';
import { TagsService } from '@core/service/tags.service';
import { ScreenState } from '@core/mobx/screen/ScreenState';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(
    private http: HttpClient,
    private tagsService: TagsService,
    private screenState: ScreenState,
    @Inject(API_URL) private apiUrl: string,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updatePage(pageValue: IPage): void {
    if (isArray(pageValue)) {
      return;
    }
    this.tagsService.updateTages(pageValue);
    this.screenState.scroll$.next();
  }

  get pageUrl(): string {
    const location = this.document.location;
    const path = location.pathname;
    const search = location.search;
    const allowKey = ['version', 'origin', 'category', 'preview'];
    if (
      allowKey.some((key) => {
        return search.indexOf(key) > 0;
      })
    ) {
      const params = search.split('?')[1];
      return `${path}&${params}`;
    } else {
      return path;
    }
  }

  loadPageContent(): Observable<IPage> {
    if (environment.production) {
      const landingPath = '/api/v1/landingPage?content=';
      return this.http
        .get<any>(`${this.apiUrl}${landingPath}${this.pageUrl}`)
        .pipe(
          tap((page) => {
            this.updatePage(page);
          }),
          catchError(() => {
            return this.http.get<any>(`${this.apiUrl}${landingPath}404`);
          })
        );
    } else {
      return this.http
        .get<any>(`${this.apiUrl}/assets/app${this.pageUrl}.json`)
        .pipe(
          tap((page) => {
            this.updatePage(page);
          }),
          catchError(() => {
            this.tagsService.setTitle('404 not found!');
            return this.http.get<any>(`${this.apiUrl}/assets/app/404.json`);
          })
        );
    }
  }
}
