import { Component, Inject, OnInit } from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ContentService } from '@core/service/content.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-github-star',
  templateUrl: './github-star.component.html',
  styleUrls: ['./github-star.component.scss'],
})
export class GithubStarComponent implements OnInit {
  repo$: Observable<any> = new BehaviorSubject<any>('0');

  constructor(
    private contentService: ContentService,
    @Inject(CORE_CONFIG) private core_config: ICoreConfig
  ) {}

  ngOnInit(): void {
    if (this.core_config.github) {
      const { owner, repo, token, enable } = this.core_config.github;
      if (enable) {
        this.repo$ = this.contentService.getRepository(owner, repo, token);
      }
    }
  }
}
