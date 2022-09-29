import { Inject, Injectable } from '@angular/core';
import type { ICoreConfig } from '@core/mobx/IAppConfig';
import { CORE_CONFIG } from '@core/token/token-providers';
import { forkJoin, interval, Observable, of } from 'rxjs';
import { NodeService } from '@core/service/node.service';
import { catchError, take, switchMap } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { UserState } from '@core/mobx/user/UserState';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    private nodeService: NodeService,
    private toastr: ToastrService,
    private userState: UserState,
    private router: Router
  ) {}

  watchNotify(): void {
    const apis = this.coreConfig?.notify?.api;
    if (apis) {
      const source = interval(
        this.coreConfig?.notify?.params.interval || 2 * 60 * 1000
      );
      // https://ngx-toastr.vercel.app/
      source.subscribe((time) => {
        this.getWatchList(time)
          .pipe(
            catchError((error: any) => {
              return of(null);
            })
          )
          .subscribe((res) => {
            if (!isEmpty(res)) {
              Object.keys(res).forEach((index: any) => {
                if (res[index].rows.length) {
                  const lists = res[index].rows;
                  lists.forEach((item: any) => {
                    const config = apis[index];
                    const toastr = this.toastr.show(
                      item[config.bodyField] || item.title,
                      config.title,
                      config.options,
                      config.type || 'success'
                    );

                    toastr.onTap
                      .pipe(
                        take(1),
                        switchMap(() => {
                          return this.nodeService.deleteFlagging(
                            config.action,
                            [item],
                            this.userState.csrfToken
                          );
                        })
                      )
                      .subscribe(() => {
                        console.log(toastr);
                        this.toastr.remove(toastr.toastId);
                        if (item.url) {
                          this.router.navigate([item.url]);
                        }
                      });
                  });
                }
              });
            }
          });
      });
    }
  }

  getWatchList(time: number): Observable<any> {
    const obj: any = {};
    const params = `noCache=${time}`;
    const apiList = this.coreConfig?.notify?.api;
    const finalList = apiList?.filter((api) => {
      if (!api.reqRoles || api.reqRoles.length === 0) {
        return true;
      }
      return this.userState.isMatchCurrentRole(api.reqRoles || []);
    });
    if (finalList && finalList?.length > 0) {
      finalList.forEach((list: any, index: number) => {
        obj[index] = this.nodeService.getNodes(list.get, '', params);
      });
    }

    return forkJoin(obj);
  }
}
