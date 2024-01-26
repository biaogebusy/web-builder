import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import type { ITitle } from '@core/interface/widgets/ITitle';
import Typed from 'typed.js';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent implements OnInit, AfterViewInit {
  @Input() content: ITitle;
  @ViewChild('title', { static: false }) title: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.content.typed?.enable) {
      const typedEle = this.title.nativeElement.querySelectorAll('strong')[0];
      new Typed(typedEle, {
        strings: this.content.typed.strings.map((item) => item.label),
        ...this.content.typed.config,
      });
    }
  }
}
