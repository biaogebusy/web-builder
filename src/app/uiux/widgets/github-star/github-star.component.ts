import { Component, OnInit, inject } from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ContentService } from '@core/service/content.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-github-star',
    templateUrl: './github-star.component.html',
    styleUrls: ['./github-star.component.scss'],
    standalone: false
})
export class GithubStarComponent implements OnInit {
  private contentService = inject(ContentService);
  coreConfig = inject<ICoreConfig>(CORE_CONFIG);

  repo$: Observable<any> = new BehaviorSubject<any>('0');

  ngOnInit(): void {
    if (this.coreConfig.github && environment.production) {
      const { owner, repo, token, enable } = this.coreConfig.github;
      if (enable) {
        this.repo$ = this.contentService.getRepository(owner, repo, token);
      }
    }
  }
}
