import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { IUiux } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { UIUX } from '@core/token/token-providers';

@Component({
  selector: 'app-builder-uiux',
  templateUrl: './builder-uiux.component.html',
  styleUrls: ['./builder-uiux.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderUiuxComponent implements OnInit {
  constructor(
    public builder: BuilderState,
    @Inject(UIUX) readonly uiux: IUiux[]
  ) {}

  ngOnInit(): void {}

  onTabChange(): void {
    this.builder.cancelFixedShowcase();
  }
}
