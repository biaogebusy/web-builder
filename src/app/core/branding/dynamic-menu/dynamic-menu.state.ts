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
    // getContent is first called inside a component computed; during hydration
    // HttpTransferCache replays the response synchronously, so the subscription
    // must be isolated with untracked, otherwise sig.set runs during computed
    // evaluation and throws NG0600.
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
