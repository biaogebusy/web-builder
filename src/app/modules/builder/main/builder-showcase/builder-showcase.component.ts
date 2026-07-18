import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import type { IBuilderComponentElement, IBuilderShowcase } from '@core/interface/IBuilder';
import { IDialog } from '@core/interface/IDialog';
import { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { USER } from '@core/token/token-providers';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-builder-showcase',
  templateUrl: './builder-showcase.component.html',
  styleUrls: ['./builder-showcase.component.scss'],
  imports: [ShareModule, WidgetsModule],
})
export class BuilderShowcaseComponent implements OnInit {
  readonly content = input.required<IBuilderShowcase>();
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private dialog = inject(MatDialog);
  private screenService = inject(ScreenService);
  private storage = inject(LocalStorageService);
  private translate = inject(TranslateService);
  private nodeService = inject(NodeService);
  private destroyRef = inject(DestroyRef);
  public user = inject(USER);
  public deleting = signal(false);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      // SSR-safe no-op
    }
  }

  onClose(): void {
    this.builder.currentShowcase.set(false);
  }
  onCopy(component: any): void {
    this.util.copy(JSON.stringify(component));
    this.util.openSnackbar(
      this.translate.instant('BUILDER.SHOWCASE.COPIED', { type: component.type }),
      'ok'
    );
    this.storage.store(this.builder.COPYCOMPONENTKEY, component);
  }

  showCode(component: IBuilderComponentElement): void {
    const { uuid } = component;
    const jsonWidget: IJsoneditor = {
      type: 'jsoneditor',
      data: component.content ?? {},
      fullWidth: true,
      schemaType: component.type || '',
      isShowcase: true,
      actions: [
        {
          type: 'update',
          label: this.translate.instant('BUILDER.SHOWCASE.UPDATE_WIDGET'),
          params: {
            uuid,
            api: '/api/v1/node/component',
          },
        },
      ],
    };
    const config: IDialog = {
      disableActions: true,
      inputData: {
        content: jsonWidget,
      },
    };
    this.dialog.open(DialogComponent, {
      width: '800px',
      data: config,
    });
  }

  onDelete(component: IBuilderComponentElement): void {
    const { uuid } = component;
    if (!uuid) {
      return;
    }
    const type = component.content?.type || component.type || '';
    const config: IDialog = {
      title: this.translate.instant('BUILDER.SHOWCASE.DELETE_TITLE'),
      titleClasses: 'text-red-500',
      noLabel: this.translate.instant('BUILDER.COMMON.CANCEL'),
      yesLabel: this.translate.instant('BUILDER.SHOWCASE.DELETE_CONFIRM'),
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: this.translate.instant('BUILDER.SHOWCASE.DELETE_BODY', { type }),
        },
      },
    };

    this.dialog
      .open(DialogComponent, { width: '340px', data: config })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(confirmed => {
        if (!confirmed) {
          return;
        }
        this.deleting.set(true);
        this.nodeService
          .deleteEntity('/api/v1/node/component', uuid)
          .pipe(
            finalize(() => this.deleting.set(false)),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe({
            next: () => {
              this.util.openSnackbar(
                this.translate.instant('BUILDER.SHOWCASE.DELETED', { type }),
                'ok'
              );
              this.builder.cancelFixedShowcase();
            },
            error: () => {
              this.util.openSnackbar(
                this.translate.instant('BUILDER.SHOWCASE.DELETE_FAILED'),
                'ok'
              );
            },
          });
      });
  }

  insert(component: any): void {
    this.builder.pushComponent(component);
    setTimeout(() => {
      const length = this.builder.currentPage.body.length;
      this.screenService.scrollToAnchor(`item-${length - 1}`);
      this.builder.cancelFixedShowcase();
      this.onClose();
    }, 200);
  }
}
