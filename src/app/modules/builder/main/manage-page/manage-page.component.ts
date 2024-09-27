import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ContentService } from '@core/service/content.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrl: './manage-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagePageComponent implements OnInit {
  page$: Observable<any[]>;
  loading: boolean;
  contentService = inject(ContentService);
  activateRoute = inject(ActivatedRoute);
  router = inject(Router);
  cd = inject(ChangeDetectorRef);
  ngOnInit(): void {
    const url = this.activateRoute.snapshot.url
      .map((segment) => segment.path)
      .join('/');
    this.page$ = this.contentService.loadJSON(`/${url}`);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.activateRoute.snapshot.url
          .map((segment) => segment.path)
          .join('/');
        this.page$ = this.contentService.loadJSON(`/${url}`);
        this.cd.detectChanges();
      }
    });
  }
}
