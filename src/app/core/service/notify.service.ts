import { Inject, Injectable } from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import { forkJoin, interval, Observable, of } from 'rxjs';
import { NodeService } from '@core/service/node.service';
import { catchError, take, switchMap, map } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    private nodeService: NodeService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    @Inject(USER) private user: IUser
  ) {}

  // TODO: remove
  watchNotify(): Observable<any> {
    const apis = this.coreConfig?.notify?.api;
    return this.getWatchList().pipe(
      catchError((error: any) => {
        return of(null);
      })
    );
    if (apis) {
      const source = interval(
        this.coreConfig?.notify?.params.interval || 2 * 60 * 1000
      );
      // https://ngx-toastr.vercel.app/
      // .subscribe((res) => {
      //   if (!isEmpty(res)) {
      //     Object.keys(res).forEach((index: any) => {
      //       if (res[index].rows.length) {
      //         const lists = res[index].rows;
      //         lists.forEach((item: any) => {
      //           const config = apis[index];
      //           const toastr = this.toastr.show(
      //             item[config.bodyField] || item.title,
      //             config.title,
      //             config.options,
      //             config.type || 'success'
      //           );

      //           toastr.onTap
      //             .pipe(
      //               take(1),
      //               switchMap(() => {
      //                 return this.nodeService.deleteFlagging(
      //                   config.action,
      //                   [item],
      //                   this.user.csrf_token
      //                 );
      //               })
      //             )
      //             .subscribe(() => {
      //               console.log(toastr);
      //               this.toastr.remove(toastr.toastId);
      //               if (item.url) {
      //                 this.router.navigate([item.url]);
      //               }
      //             });
      //         });
      //       }
      //     });
      //   }
      // });
      source.subscribe((time) => {});
    }
  }

  getWatchList(): Observable<any> {
    const obj: any = {};
    const params = `noCache=1`;
    const apiList = this.coreConfig?.notify?.api;
    const finalList = apiList?.filter((api) => {
      if (!api.reqRoles || api.reqRoles.length === 0) {
        return true;
      }
      return this.userService.isMatchCurrentRole(
        api.reqRoles || [],
        this.user.current_user.roles
      );
    });
    if (finalList && finalList?.length > 0) {
      finalList.forEach((list: any, index: number) => {
        obj[index] = this.nodeService.getNodes(list.get, '', params);
      });
    }

    return forkJoin(obj);
  }

  showSuccess(message: string, title: string): void {
    this.toastr.show(message, title, undefined, 'success');
  }

  showError(message: string, title: string): void {
    this.toastr.show(message, title, undefined, 'error');
  }
}
