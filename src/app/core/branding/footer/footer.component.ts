import { AsyncPipe } from '@angular/common';
import { Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ScreenState } from '../../state/screen/ScreenState';
import { BRANDING } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import type { IBranding } from '@core/interface/branding/IBranding';
import { GotopComponent } from '@uiux/widgets/actions/gotop/gotop.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { LightComponent } from './light/light.component';
import { InverseComponent } from './inverse/inverse.component';
import { FixBarComponent } from './fix-bar/fix-bar.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    GotopComponent,
    DynamicComponentComponent,
    LightComponent,
    InverseComponent,
    FixBarComponent,
  ],
})
export class FooterComponent {
  screen = inject(ScreenState);
  branding$ = inject<Observable<IBranding>>(BRANDING);

  panelOpenState = false;

  @ViewChild(MatAccordion) accordion: MatAccordion;
}
