import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import type { IHeaderParams, IMainMenu } from '@core/interface/branding/IBranding';
import { NodeService } from '@core/service/node.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ItemMenuComponent implements OnInit {
  private screenService = inject(ScreenService);
  private nodeService = inject(NodeService);
  private destroyRef = inject(DestroyRef);

  @Input() content: IMainMenu;
  @Input() params: IHeaderParams;
  public dynamicContent = signal<any>({});
  public isMegaMenu = signal<boolean>(false);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.isMegaMenu.set(!!this.params?.isMegaMenu);
    }
    if (this.content?.dynamicMenu && this.content.uuid) {
      this.getDynamicContent(this.content.uuid);
    }
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
