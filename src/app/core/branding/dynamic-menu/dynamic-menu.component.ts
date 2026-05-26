import { Component, DestroyRef, Input, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NodeService } from '@core/service/node.service';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { catchError, of } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.scss'],
  imports: [DynamicComponentComponent],
})
export class DynamicMenuComponent implements OnInit {
  @Input() uuid: string;
  private nodeService = inject(NodeService);
  private destroyRef = inject(DestroyRef);
  public dynamicContent = signal<any>({});
  ngOnInit(): void {
    this.getDynamicContent(this.uuid);
  }

  getDynamicContent(uuid: string): void {
    this.nodeService
      .fetch(`/api/v1/node/component/${uuid}`, '')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
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
        } = node;
        this.dynamicContent.set(JSON.parse(value));
      });
  }
}
