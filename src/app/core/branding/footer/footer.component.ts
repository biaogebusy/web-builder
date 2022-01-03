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
import { BrandingState } from '../../mobx/BrandingStare';
import { ScreenState } from '../../mobx/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit, AfterViewInit, OnDestroy {
  content: any;
  panelOpenState = false;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('goTop') goTop: ElementRef;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public screen: ScreenState,
    private screenService: ScreenService,
    public branding: BrandingState,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {}

  gotoTop(): void {
    this.screenService.gotoTop();
  }

  onScroll(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.scroll$.pipe(takeUntil(this.destroy$)).subscribe(() => {
        if (this.document.body.getBoundingClientRect().top < -100) {
          this.goTop.nativeElement.style.bottom = '4rem';
        } else {
          this.goTop.nativeElement.style.bottom = '-10rem';
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.onScroll();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
