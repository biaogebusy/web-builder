import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ContentService, type GithubRepository } from '@core/service/content.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { BehaviorSubject, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IconComponent } from '../icon/icon.component';

const EMPTY_REPO: GithubRepository = {
  html_url: '',
  stargazers_count: 0,
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-github-star',
  templateUrl: './github-star.component.html',
  styleUrls: ['./github-star.component.scss'],
  imports: [AsyncPipe, IconComponent],
})
export class GithubStarComponent implements OnInit {
  private contentService = inject(ContentService);
  coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  repo$: Observable<GithubRepository> = new BehaviorSubject<GithubRepository>(EMPTY_REPO);

  ngOnInit(): void {
    if (this.coreConfig.github && environment.production) {
      const { owner, repo, token, enable } = this.coreConfig.github;
      if (enable) {
        // startWith keeps the pill mounted while the browser refetches (the
        // authorized request is excluded from the SSR transfer cache); without
        // it the pill unmounts during hydration and pops back in, shifting the
        // header row.
        this.repo$ = this.contentService.getRepository(owner, repo, token).pipe(
          startWith(EMPTY_REPO)
        );
      }
    }
  }
}
