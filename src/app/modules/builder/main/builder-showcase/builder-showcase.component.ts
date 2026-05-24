import { Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import type { IBuilderComponentElement, IBuilderShowcase } from '@core/interface/IBuilder';
import { IDialog } from '@core/interface/IDialog';
import { IUser } from '@core/interface/IUser';
import { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { USER } from '@core/token/token-providers';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-builder-showcase',
  templateUrl: './builder-showcase.component.html',
  styleUrls: ['./builder-showcase.component.scss'],
  imports: [ShareModule, WidgetsModule],
})
export class BuilderShowcaseComponent implements OnInit {
  @Input() content: IBuilderShowcase;
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private dialog = inject(MatDialog);
  private screenService = inject(ScreenService);
  private storage = inject(LocalStorageService);
  private translate = inject(TranslateService);
  public user$ = inject<Observable<IUser>>(USER);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
    }
  }

  onClose(): void {
    this.builder.showcase$.next(false);
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
      data: component.content,
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
