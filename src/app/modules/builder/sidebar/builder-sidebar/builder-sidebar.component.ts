import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { IBranding } from '@core/interface/branding/IBranding';
import { BuilderState } from '@core/state/BuilderState';
import { BRANDING } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from '@core/service/manage.service';
import { IBuilderConfig } from '@core/interface/IBuilder';
import { ContentService } from '@core/service/content.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-builder-sidebar',
  templateUrl: './builder-sidebar.component.html',
  styleUrls: ['./builder-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSidebarComponent implements OnInit {
  @Input() sidebarDrawer: MatDrawer;
  builderConfig$: Observable<IBuilderConfig> =
    inject(ContentService).loadBuilderConfig();
  builder = inject(BuilderState);
  dialog = inject(MatDialog);
  manageService = inject(ManageService);
  constructor(@Inject(BRANDING) public branding$: Observable<IBranding>) {}

  ngOnInit(): void {}

  onSelectAssets(): void {
    this.dialog.open(DialogComponent, {
      width: '85vw',
      panelClass: this.manageService.mediaDialogClass,
      data: {
        disableCloseButton: true,
        inputData: {
          content: {
            type: 'manage-media',
          },
        },
      },
    });
  }

  onToggleBuilderTheme(mode: 'light' | 'dark'): void {
    let style: 'light' | 'dark';
    if (mode === 'light') {
      style = 'dark';
    } else {
      style = 'light';
    }
    this.builder.themeMode.next(style);
  }

  onToggle(): void {
    this.sidebarDrawer.toggle();
  }
}
