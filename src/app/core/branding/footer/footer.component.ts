import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatAccordion } from '@angular/material/expansion';
import { ScreenState } from '../../state/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { BRANDING } from '@core/token/token-providers';
import { Observable } from 'rxjs';
import type { IBranding } from '@core/interface/branding/IBranding';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit, AfterViewInit, OnDestroy {
  panelOpenState = false;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('goTop') goTop: ElementRef;

  constructor(
    public screen: ScreenState,
    private screenService: ScreenService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(BRANDING) public branding$: Observable<IBranding>
  ) {}

  ngOnInit(): void {}

  gotoTop(): void {
    this.screenService.gotoTop();
  }

  onScroll(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.scroll$.subscribe(() => {
        if (this.goTop) {
          if (this.document.body.getBoundingClientRect().top < -100) {
            this.goTop.nativeElement.style.bottom = '7rem';
          } else {
            this.goTop.nativeElement.style.bottom = '-10rem';
          }
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.onScroll();
  }

  ngOnDestroy(): void {}
}
