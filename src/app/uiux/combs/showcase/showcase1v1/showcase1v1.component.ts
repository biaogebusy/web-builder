import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@uiux/base/base.widget';
import type { IShowcase1v1 } from '@core/interface/combs/IShowcase';

@Component({
  selector: 'app-showcase-1v1',
  templateUrl: './showcase1v1.component.html',
  styleUrls: ['./showcase1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase1v1Component extends BaseComponent implements OnInit {
  @Input() content: IShowcase1v1;
  ngOnInit(): void {}
}
