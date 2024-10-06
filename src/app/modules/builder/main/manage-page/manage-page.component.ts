import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
import { PAGE_CONTENT } from '@core/token/token-providers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrl: './manage-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagePageComponent {
  constructor(@Inject(PAGE_CONTENT) public pageContent$: Observable<IPage>) {}
}
