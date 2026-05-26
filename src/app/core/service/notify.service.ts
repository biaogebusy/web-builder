import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { forkJoin, Observable, of } from 'rxjs';
import { NodeService } from '@core/service/node.service';
import type { IUser } from '@core/interface/IUser';
import { isMatchCurrentRole } from '@core/util/auth-token.util';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private user$ = inject<Observable<IUser>>(USER);
  private destroyRef = inject(DestroyRef);

  private nodeService = inject(NodeService);
  private user: IUser;

  constructor() {
    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => {
      this.user = user;
    });
  }

  getWatchList(): Observable<any> {
    if (!this.user) {
      return of(false);
    }
    const obj: any = {};
    const params = `noCache=1`;
    const apiList = this.coreConfig?.notify?.api;
    const finalList = apiList?.filter(api => {
      if (!api.reqRoles || api.reqRoles.length === 0) {
        return true;
      }
      return isMatchCurrentRole(api.reqRoles || [], this.user.current_user.roles);
    });
    if (finalList && finalList?.length > 0) {
      finalList.forEach((list: any, index: number) => {
        obj[index] = this.nodeService.getNodes(list.get, '', params);
      });
    }

    return forkJoin(obj);
  }
}
