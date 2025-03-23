import { Component, inject } from '@angular/core';
import { pageContentFactory } from '@core/factory/factory';
import { IPage } from '@core/interface/IAppConfig';
import { PAGE_CONTENT } from '@core/token/token-providers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrl: './manage-page.component.scss',
  providers: [
    {
      provide: PAGE_CONTENT,
      useFactory: pageContentFactory,
    },
  ],
  standalone: false,
})
export class ManagePageComponent {
  pageContent$ = inject<Observable<IPage>>(PAGE_CONTENT);
}
