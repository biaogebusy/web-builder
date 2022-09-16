import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import type { ICoreConfig } from '@core/mobx/IAppConfig';
import { CORE_CONFIG } from '@core/token/core.config';
@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchThemeComponent implements OnInit {
  constructor(
    public appState: AppState,
    @Inject(CORE_CONFIG) public coreConfig: ICoreConfig
  ) {}

  ngOnInit(): void {}

  trackByFn(index: number, item: any): number {
    return index;
  }

  onSwitchTheme(theme: string): void {
    this.appState.switchTheme(theme);
  }
}
