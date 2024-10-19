import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  DestroyRef,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { Observable, of } from 'rxjs';
import { ContentService } from '../../../../core/service/content.service';
import { catchError, map, tap } from 'rxjs/operators';
import { isArray } from 'lodash-es';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderService } from '@core/service/builder.service';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrl: './default-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageComponent implements OnInit {
  content$: Observable<IPage>;
  builderService = inject(BuilderService);
  ngOnInit(): void {
    this.content$ = this.builderService.getDefaultPage();
  }
}
