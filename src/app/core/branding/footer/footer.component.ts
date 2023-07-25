import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ScreenState } from '../../state/screen/ScreenState';
import { BRANDING, ENABLE_BUILDER_TOOLBAR } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import type { IBranding } from '@core/interface/branding/IBranding';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit, OnDestroy {
  panelOpenState = false;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    public screen: ScreenState,
    @Inject(BRANDING) public branding$: Observable<IBranding>,
    @Inject(ENABLE_BUILDER_TOOLBAR)
    public enabelBuilderToolbar$: Observable<boolean>
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
