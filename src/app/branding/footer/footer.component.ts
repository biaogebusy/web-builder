import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UtilitiesService } from '../../service/utilities.service';
import { MatAccordion } from '@angular/material/expansion';
import { BrandingState } from '../../mobx/BrandingStare';
import { ScreenState } from '../../mobx/screen/ScreenState';
import { ScreenService } from 'src/app/service/screen.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit {
  content: any;
  panelOpenState = false;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('goTop') goTop: ElementRef;
  constructor(
    public utilities: UtilitiesService,
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
    this.screen.scroll$.subscribe(() => {
      if (this.document.body.getBoundingClientRect().top < -100) {
        this.goTop.nativeElement.style.bottom = '2rem';
      } else {
        this.goTop.nativeElement.style.bottom = '-10rem';
      }
    });
  }

  ngAfterViewInit(): void {
    this.onScroll();
  }
}
