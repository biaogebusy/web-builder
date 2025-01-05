import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseComponent } from '@uiux/base/base.widget';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import type { IShowcase1v1 } from '@core/interface/combs/IShowcase';
import { ContentState } from '@core/state/ContentState';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-showcase-1v1',
  templateUrl: './showcase1v1.component.html',
  styleUrls: ['./showcase1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase1v1Component extends BaseComponent implements OnInit {
  @Input() content: IShowcase1v1;
  @ViewChild('title', { read: ElementRef }) title: ElementRef;
  disableAnimate = false;

  ngOnInit(): void {}
}
