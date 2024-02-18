import { Component, Input, OnInit } from '@angular/core';
import type { IThemePreview } from '@core/interface/combs/IThemePreview';

@Component({
  selector: 'app-theme-preview',
  templateUrl: './theme-preview.component.html',
  styleUrls: ['./theme-preview.component.scss'],
})
export class ThemePreviewComponent implements OnInit {
  @Input() content: IThemePreview;
  constructor() {}

  ngOnInit(): void {}
}
