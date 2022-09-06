import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { interval } from 'rxjs';
import { CORE_CONFIG } from '@core/token/core.config';
import { ICoreConfig } from '@core/mobx/IAppConfig';

@Component({
  selector: 'app-autoclose',
  templateUrl: './autoclose.component.html',
  styleUrls: ['./autoclose.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocloseComponent implements OnInit {
  @Input() content: any;
  constructor(@Inject(CORE_CONFIG) private coreConfig: ICoreConfig) {}

  ngOnInit(): void {
    const source = interval(2 * 1000);
    source.subscribe(() => {
      window.parent.postMessage('closeDialog', '*');
    });
  }
}
