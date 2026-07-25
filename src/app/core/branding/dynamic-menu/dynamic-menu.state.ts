import { Injectable, inject, signal, untracked, WritableSignal } from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { catchError, of, take } from 'rxjs';

interface ComponentNodeAttributes {
  data: {
    attributes: {
      body: {
        value: string;
      };
    };
  };
}

@Injectable({ providedIn: 'root' })
export class DynamicMenuState {
  private nodeService = inject(NodeService);
  private cache = new Map<string, WritableSignal<any>>();

  getContent(uuid: string): WritableSignal<any> {
    const existing = this.cache.get(uuid);
    if (existing) {
      return existing;
    }
    const sig = signal<any>({});
    this.cache.set(uuid, sig);
    // getContent 会在组件的 computed 中首次调用;水合时 HttpTransferCache 同步回放响应,
    // 订阅需用 untracked 隔离,否则 sig.set 落在 computed 求值期,抛 NG0600。
    untracked(() => {
      this.nodeService
        .fetch(`/api/v1/node/component/${uuid}`, '')
        .pipe(
          take(1),
          catchError(() => of(null))
        )
        .subscribe(node => {
          if (!node) {
            return;
          }
          const {
            data: {
              attributes: {
                body: { value },
              },
            },
          } = node as ComponentNodeAttributes;
          sig.set(JSON.parse(value));
        });
    });
    return sig;
  }
}
