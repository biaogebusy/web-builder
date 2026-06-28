import { Injectable, inject } from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { forkJoin, Observable, of } from 'rxjs';
import { NodeService } from '@core/service/node.service';
import { isMatchCurrentRole } from '@core/util/auth-token.util';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private user = inject(USER);
  private nodeService = inject(NodeService);

  getWatchList(): Observable<any> {
    const userVal = this.user();
    if (!userVal || typeof userVal !== 'object') {
      return of(false);
    }
    const obj: any = {};
    const params = { noCache: 1 };
    const apiList = this.coreConfig?.notify?.api;
    const finalList = apiList?.filter(api => {
      if (!api.reqRoles || api.reqRoles.length === 0) {
        return true;
      }
      return isMatchCurrentRole(api.reqRoles || [], userVal.current_user.roles);
    });
    if (finalList && finalList?.length > 0) {
      finalList.forEach((list: any, index: number) => {
        obj[index] = this.nodeService.getNodes(list.get, '', params);
      });
    }

    return forkJoin(obj);
  }
}
