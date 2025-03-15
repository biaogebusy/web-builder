import { Component, OnInit, inject } from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderService } from '@core/service/builder.service';
import { ScreenService } from '@core/service/screen.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-theme-preview',
    templateUrl: './theme-preview.component.html',
    styleUrls: ['./theme-preview.component.scss'],
    standalone: false
})
export class ThemePreviewComponent implements OnInit {
  public page$: Observable<IPage>;
  private builderService = inject(BuilderService);
  private screenSerivce = inject(ScreenService);

  ngOnInit(): void {
    if (this.screenSerivce.isPlatformBrowser()) {
      this.page$ = this.builderService.getDefaultPage('/builder/theme-preview');
    }
  }
}
