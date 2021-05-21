import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { ScreenState } from '../../mobx/screen/ScreenState';
import { BrandingState } from '../../mobx/BrandingStare';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  sticky = false;

  @ViewChild('header', { read: ElementRef }) header: ElementRef;
  @ViewChild('menu', { read: ElementRef }) menu: ElementRef;
  constructor(
    private screen: ScreenService,
    private screenState: ScreenState,
    public branding: BrandingState
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.screenState.scroll$.subscribe(() => {
      this.sticky = this.screen.isElementOutTopViewport(
        this.menu.nativeElement
      );
      // this.windowScroll();
    });
  }

  windowScroll(): void {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      this.header.nativeElement.classList.add('header-sticky');
    } else {
      this.header.nativeElement.classList.remove('header-sticky');
    }
  }
}
