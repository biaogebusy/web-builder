import { Component, DestroyRef, Input, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NodeService } from '@core/service/node.service';

@Component({
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.scss'],
  standalone: false,
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(node => {
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
