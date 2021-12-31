import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppState } from '../../../../mobx/AppState';
@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchThemeComponent implements OnInit {
  constructor(public appState: AppState) {}

  ngOnInit(): void {}

  onSwitchTheme(theme: string): void {
    this.appState.switchTheme(theme);
  }
}
