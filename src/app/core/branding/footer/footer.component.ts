import { Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ScreenState } from '../../state/screen/ScreenState';
import { BRANDING } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import type { IBranding } from '@core/interface/branding/IBranding';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FooterComponent {
  screen = inject(ScreenState);
  branding$ = inject<Observable<IBranding>>(BRANDING);

  panelOpenState = false;

  @ViewChild(MatAccordion) accordion: MatAccordion;
}
