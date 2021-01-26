import { Component, OnInit } from '@angular/core';
import { ThemeState } from 'src/app/mobx/screen/ThemeState';

@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.scss'],
})
export class SwitchThemeComponent implements OnInit {
  constructor(public themeState: ThemeState) {}

  ngOnInit(): void {}

  onSwitchTheme(theme: string): void {
    this.themeState.switchTheme(theme);
  }
}
