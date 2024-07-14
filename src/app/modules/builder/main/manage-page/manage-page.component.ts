import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
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
  ngOnInit(): void {
    const url = this.activateRoute.snapshot.url
      .map((segment) => segment.path)
      .join('/');
    this.page$ = this.contentService.loadBuilderPage(url);
  }
}
