import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { IPage } from '@core/interface/IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class ContentState {
  public commentChange = signal(true);
  public commentQuote$ = new Subject<unknown>();
  public pageConfig = signal<IPage['config'] | undefined | false>(false);
  public drawerOpened = signal(false);
  public drawerLoading = signal(false);
  public drawerContent = signal<IPage | undefined>(undefined);
  public mediaAssetsFormChange$ = new Subject<object>();
}
