import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { IBranding } from '@core/interface/branding/IBranding';
import { BuilderState } from '@core/state/BuilderState';
import { BRANDING } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-builder-sidebar',
  templateUrl: './builder-sidebar.component.html',
  styleUrls: ['./builder-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSidebarComponent implements OnInit {
  @Input() builderRightDrawer: MatDrawer;
  showBranding = false;

  constructor(
    public builder: BuilderState,
    private dialog: MatDialog,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
  ) {}

  ngOnInit(): void {}

  onShowBranding(): void {
    this.showBranding = !this.showBranding;
    this.builder.showBranding$.next(this.showBranding);
  }

  onSelectAssets(): void {
    this.dialog.open(DialogComponent, {
      width: '85vw',
      panelClass: ['close-outside', 'close-icon-white', 'manage-media-dialog'],
      data: {
        title: '媒体库',
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
}
