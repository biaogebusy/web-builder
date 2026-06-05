import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { pageContentFactory } from '@core/factory/factory';
import { IPage } from '@core/interface/IAppConfig';
import { PAGE_CONTENT } from '@core/token/token-providers';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrl: './manage-page.component.scss',
  providers: [
    {
      provide: PAGE_CONTENT,
      useFactory: pageContentFactory,
    },
  ],
  imports: [ShareModule, WidgetsModule],
})
export class ManagePageComponent {
  pageContent$ = inject<Observable<IPage>>(PAGE_CONTENT);
}
