import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import { CORE_CONFIG } from '@core/token/token-providers';

@Component({
  selector: 'app-builder-empty',
  templateUrl: './builder-empty.component.html',
  styleUrls: ['./builder-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderEmptyComponent implements OnInit {
  constructor(@Inject(CORE_CONFIG) public coreConfig: ICoreConfig) {}

  ngOnInit(): void {}
}
