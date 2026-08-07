import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { IShowcase4v1 } from '@core/interface/combs/IShowcase';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { DialogService } from '@core/service/dialog.service';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { NumberAnimateComponent } from '@uiux/widgets/number-animate/number-animate.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  selector: 'app-showcase-4v1',
  templateUrl: './showcase4v1.component.html',
  styleUrls: ['./showcase4v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReqRolesDirective,
    TextComponent,
    IconComponent,
    ImgComponent,
    NumberAnimateComponent,
    ContenteditDirective,
  ],
})
export class Showcase4v1Component extends BaseComponent implements OnInit {
  private nodeService = inject(NodeService);
  private dialogService = inject(DialogService);
  private destroyRef = inject(DestroyRef);

  readonly content = input.required<IShowcase4v1>();

  private statsRes = this.nodeService.fetchResource(() => {
    const api = this.getParams(this.content(), 'api');
    return api ? { api } : undefined;
  });

  elements = computed<any[]>(() => {
    const api = this.getParams(this.content(), 'api');
    if (!api) {
      return this.content().elements ?? [];
    }
    const res = this.statsRes.error() ? { rows: [] } : this.statsRes.value();
    if (!res) {
      return [];
    }
    return res.rows.map((item: any) => {
      return {
        icon: item.icon,
        digit: {
          value: item.value,
          from: item.from || 0,
          duration: item.duration || 4,
        },
        title: item.title,
      };
    });
  });

  ngOnInit(): void {
    const api = this.getParams(this.content(), 'api');
    if (api) {
      this.handleDialogClosed();
    }
  }

  handleDialogClosed(): void {
    if (this.dialogService.dialogState$) {
      this.dialogService.dialogState$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(state => {
          if (!state) {
            this.statsRes.reload();
          }
        });
    }
  }
}
