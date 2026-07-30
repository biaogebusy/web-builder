import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
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
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS],
})
export class ManagePageComponent {
  pageContent = inject(PAGE_CONTENT);
}
