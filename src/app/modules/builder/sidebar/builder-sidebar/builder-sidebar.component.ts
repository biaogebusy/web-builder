import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { BrandingModule } from '@core/branding/branding.module';
import { IBranding } from '@core/interface/branding/IBranding';
import { BuilderState } from '@core/state/BuilderState';
import { BRANDING, BUILDER_CONFIG } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ManageService } from '@core/service/manage.service';
import { IBuilderConfig } from '@core/interface/IBuilder';
import { MatDrawer } from '@angular/material/sidenav';
import { IDialog } from '@core/interface/IDialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-builder-sidebar',
  templateUrl: './builder-sidebar.component.html',
  styleUrls: ['./builder-sidebar.component.scss'],
  imports: [ShareModule, WidgetsModule, BrandingModule],
})
export class BuilderSidebarComponent {
  public branding$ = inject<Observable<IBranding>>(BRANDING);
  public builderConfig$ = inject<Observable<IBuilderConfig>>(BUILDER_CONFIG);

  @Input() sidebarDrawer: MatDrawer;
  @Input() drawerContentRef: any;
  public builder = inject(BuilderState);
  private dialog = inject(MatDialog);
  private manageService = inject(ManageService);


  onSelectAssets(): void {
    const config: IDialog = {
      disableActions: true,
      inputData: {
        content: {
          type: 'manage-media',
          fullWidth: true,
          mode: 'manage',
        },
      },
    };
    this.dialog.open(DialogComponent, {
      width: '85vw',
      panelClass: this.manageService.mediaDialogClass,
      data: config,
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
    const {
      elementRef: { nativeElement },
    } = this.drawerContentRef;
    if (this.sidebarDrawer.opened) {
      nativeElement.classList.remove('opened');
    } else {
      nativeElement.classList.add('opened');
    }
    this.sidebarDrawer.toggle();
  }

  onHiddeRightDrawer(): void {
    this.builder.closeRightDrawer$.next(true);
  }
}
