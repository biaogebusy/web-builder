import { Inject, Injectable } from '@angular/core';
import { ICoreConfig } from '@core/mobx/IAppConfig';
import { CORE_CONFIG } from '@core/token/core.config';
import { forkJoin, interval, Observable, of } from 'rxjs';
import { NodeService } from '@core/service/node.service';
import { catchError } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    private nodeService: NodeService,
    private toastr: ToastrService
  ) {}

  watchNotify(): void {
    const apis = this.coreConfig?.notify?.api;
    if (apis) {
      const source = interval(
        this.coreConfig?.notify?.params.interval || 2 * 60 * 1000
      );
      // https://ngx-toastr.vercel.app/
      source.subscribe(() => {
        this.getWatchList()
          .pipe(
            catchError((error: any) => {
              console.log(error);
              return of(null);
            })
          )
          .subscribe((res) => {
            if (!isEmpty(res)) {
              Object.keys(res).forEach((index: any) => {
                if (res[index].rows.length) {
                  const lists = res[index].rows;
                  console.log(res[index].rows);
                  lists.forEach((item: any) => {
                    const config = apis[index];
                    this.toastr
                      .show(
                        item.label,
                        config.title,
                        config.options,
                        config.type || 'success'
                      )
                      .onHidden.subscribe(() => {
                        console.log('closed!');
                      });
                  });
                }
              });
            }
          });
      });
    }
  }

  getWatchList(): Observable<any> {
    const obj: any = {};
    const apiList = this.coreConfig?.notify?.api;
    if (apiList && apiList?.length > 0) {
      apiList.forEach((list: any, index: number) => {
        obj[index] = this.nodeService.getNodes(list.get, '');
      });
    }

    return forkJoin(obj);
  }
}
