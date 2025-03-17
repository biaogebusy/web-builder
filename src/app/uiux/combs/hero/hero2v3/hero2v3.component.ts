import { Component, Input, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScreenState } from '@core/state/screen/ScreenState';
import { BaseComponent } from '@uiux/base/base.widget';
import { PAGE_CONTENT } from '@core/token/token-providers';
import type { IPage } from '@core/interface/IAppConfig';
import { Observable } from 'rxjs';
import type { IHero2v3 } from '@core/interface/combs/IHero';

@Component({
    selector: 'app-hero-2v3',
    templateUrl: './hero2v3.component.html',
    styleUrls: ['./hero2v3.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class Hero2v3Component extends BaseComponent implements OnInit {
  screen = inject(ScreenState);
  pageContent$ = inject<Observable<IPage>>(PAGE_CONTENT);

  @Input() content: IHero2v3;

  ngOnInit(): void {}
}
