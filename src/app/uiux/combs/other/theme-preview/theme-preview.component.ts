import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-preview',
  templateUrl: './theme-preview.component.html',
  styleUrls: ['./theme-preview.component.scss'],
})
export class ThemePreviewComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
