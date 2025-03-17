import { Component, Input, OnInit } from '@angular/core';
import type { IText } from '@core/interface/widgets/IText';

@Component({
    selector: 'app-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
    standalone: false
})
export class TextComponent implements OnInit {
  @Input() content: IText;

  ngOnInit(): void {}
}
