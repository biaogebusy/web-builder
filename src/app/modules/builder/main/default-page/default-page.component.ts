import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { Observable } from 'rxjs';
import { BuilderService } from '@core/service/builder.service';
import { ScreenService } from '@core/service/screen.service';

@Component({
    selector: 'app-default-page',
    templateUrl: './default-page.component.html',
    styleUrl: './default-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DefaultPageComponent implements OnInit {
  public content$: Observable<IPage>;
  private builderService = inject(BuilderService);
  private screenSerivce = inject(ScreenService);
  ngOnInit(): void {
    if (this.screenSerivce.isPlatformBrowser()) {
      this.content$ = this.builderService.getDefaultPage('/builder/default-page');
    }
  }
}
